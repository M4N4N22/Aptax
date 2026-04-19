// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@fhenixprotocol/cofhe-contracts/FHE.sol";

import "./AptaxRegistry.sol";
import "./AptaxMetricStore.sol";

contract AptaxVerifier {
    error InvalidMetricKey(bytes32 metricKey);
    error MetricNotStored(bytes32 subjectId, bytes32 metricKey);
    error InvalidThreshold(uint64 threshold);
    error UnknownRequest(uint256 requestId);

    bytes32 public constant MRR_METRIC_KEY = keccak256("mrr");

    enum OperatorKind {
        Gte,
        Lte
    }

    enum VerificationStatus {
        None,
        Submitted,
        Computed
    }

    struct VerificationRequest {
        uint256 id;
        bytes32 subjectId;
        bytes32 metricKey;
        address requester;
        uint64 threshold;
        OperatorKind operatorKind;
        bytes32 resultHandle;
        VerificationStatus status;
        uint64 createdAt;
    }

    AptaxRegistry public immutable registry;
    AptaxMetricStore public immutable metricStore;
    uint256 public nextRequestId = 1;
    mapping(uint256 => VerificationRequest) private _requests;
    mapping(bytes32 => uint256[]) private _requestIdsBySubject;
    mapping(address => uint256[]) private _requestIdsByRequester;

    event VerificationRequested(
        uint256 indexed requestId,
        bytes32 indexed subjectId,
        bytes32 indexed metricKey,
        address requester,
        uint64 threshold,
        OperatorKind operatorKind
    );
    event VerificationComputed(
        uint256 indexed requestId,
        bytes32 indexed subjectId,
        bytes32 indexed metricKey,
        address requester,
        bytes32 resultHandle
    );

    constructor(address registryAddress, address metricStoreAddress) {
        registry = AptaxRegistry(registryAddress);
        metricStore = AptaxMetricStore(metricStoreAddress);
    }

    function createMrrThresholdRequest(
        bytes32 subjectId,
        uint64 threshold
    ) external returns (uint256 requestId, bytes32 resultHandle) {
        return
            createThresholdRequest(
                subjectId,
                MRR_METRIC_KEY,
                threshold,
                OperatorKind.Gte
            );
    }

    function createThresholdRequest(
        bytes32 subjectId,
        bytes32 metricKey,
        uint64 threshold,
        OperatorKind operatorKind
    ) public returns (uint256 requestId, bytes32 resultHandle) {
        if (threshold == 0) {
            revert InvalidThreshold(threshold);
        }

        if (metricKey == bytes32(0)) {
            revert InvalidMetricKey(metricKey);
        }

        AptaxMetricStore.MetricRecord memory metricRecord = metricStore
            .getMetricRecord(subjectId, metricKey);
        if (!metricRecord.isSet) {
            revert MetricNotStored(subjectId, metricKey);
        }

        requestId = nextRequestId++;

        euint64 encryptedThreshold = FHE.asEuint64(threshold);
        FHE.allowThis(encryptedThreshold);

        euint64 encryptedMetric = euint64.wrap(metricRecord.handle);
        ebool result = operatorKind == OperatorKind.Lte
            ? FHE.lte(encryptedMetric, encryptedThreshold)
            : FHE.gte(encryptedMetric, encryptedThreshold);
        FHE.allowThis(result);
        FHE.allowSender(result);

        resultHandle = ebool.unwrap(result);

        _requests[requestId] = VerificationRequest({
            id: requestId,
            subjectId: subjectId,
            metricKey: metricKey,
            requester: msg.sender,
            threshold: threshold,
            operatorKind: operatorKind,
            resultHandle: resultHandle,
            status: VerificationStatus.Computed,
            createdAt: uint64(block.timestamp)
        });

        _requestIdsBySubject[subjectId].push(requestId);
        _requestIdsByRequester[msg.sender].push(requestId);

        emit VerificationRequested(
            requestId,
            subjectId,
            metricKey,
            msg.sender,
            threshold,
            operatorKind
        );
        emit VerificationComputed(
            requestId,
            subjectId,
            metricKey,
            msg.sender,
            resultHandle
        );
    }

    function getMetricRecord(
        bytes32 subjectId
    ) external view returns (AptaxMetricStore.MetricRecord memory) {
        return metricStore.getMetricRecord(subjectId, MRR_METRIC_KEY);
    }

    function getMetricRecordForKey(
        bytes32 subjectId,
        bytes32 metricKey
    ) external view returns (AptaxMetricStore.MetricRecord memory) {
        return metricStore.getMetricRecord(subjectId, metricKey);
    }

    function getVerificationRequest(
        uint256 requestId
    ) external view returns (VerificationRequest memory) {
        VerificationRequest memory request = _requests[requestId];
        if (request.status == VerificationStatus.None) {
            revert UnknownRequest(requestId);
        }
        return request;
    }

    function listRequestIdsForSubject(
        bytes32 subjectId
    ) external view returns (uint256[] memory) {
        return _requestIdsBySubject[subjectId];
    }

    function listRequestIdsForRequester(
        address requester
    ) external view returns (uint256[] memory) {
        return _requestIdsByRequester[requester];
    }

}
