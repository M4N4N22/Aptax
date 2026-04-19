// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@fhenixprotocol/cofhe-contracts/FHE.sol";

import "./AptaxRegistry.sol";

contract AptaxMetricStore {
    error InvalidMetricKey(bytes32 metricKey);
    error InvalidVerifier(address verifier);
    error NotOwner(address account);
    error NotSubjectOwner(bytes32 subjectId, address account);
    error VerifierAlreadyConfigured(address verifier);
    error VerifierNotConfigured();

    bytes32 public constant MRR_METRIC_KEY = keccak256("mrr");

    struct MetricRecord {
        bytes32 handle;
        bool isSet;
        uint64 updatedAt;
    }

    AptaxRegistry public immutable registry;
    address public immutable owner;
    address public authorizedVerifier;

    mapping(bytes32 => mapping(bytes32 => euint64)) private _metricValues;
    mapping(bytes32 => mapping(bytes32 => MetricRecord)) private _metricRecords;
    mapping(bytes32 => bytes32[]) private _metricKeysBySubject;
    mapping(bytes32 => mapping(bytes32 => bool)) private _metricKeySeenBySubject;

    event AuthorizedVerifierSet(address indexed verifier);
    event MetricStored(
        bytes32 indexed subjectId,
        bytes32 indexed metricKey,
        address indexed owner,
        bytes32 metricHandle
    );

    constructor(address registryAddress) {
        registry = AptaxRegistry(registryAddress);
        owner = msg.sender;
    }

    function setAuthorizedVerifier(address verifier) external onlyOwner {
        if (verifier == address(0)) {
            revert InvalidVerifier(verifier);
        }

        if (authorizedVerifier != address(0)) {
            revert VerifierAlreadyConfigured(authorizedVerifier);
        }

        authorizedVerifier = verifier;
        emit AuthorizedVerifierSet(verifier);
    }

    function storeEncryptedMetric(
        bytes32 subjectId,
        bytes32 metricKey,
        InEuint64 calldata encryptedValue
    ) public onlySubjectOwner(subjectId) {
        if (metricKey == bytes32(0)) {
            revert InvalidMetricKey(metricKey);
        }

        if (authorizedVerifier == address(0)) {
            revert VerifierNotConfigured();
        }

        euint64 metric = FHE.asEuint64(encryptedValue);
        FHE.allowThis(metric);
        FHE.allowSender(metric);
        FHE.allow(metric, authorizedVerifier);

        _metricValues[subjectId][metricKey] = metric;
        _metricRecords[subjectId][metricKey] = MetricRecord({
            handle: euint64.unwrap(metric),
            isSet: true,
            updatedAt: uint64(block.timestamp)
        });

        if (!_metricKeySeenBySubject[subjectId][metricKey]) {
            _metricKeySeenBySubject[subjectId][metricKey] = true;
            _metricKeysBySubject[subjectId].push(metricKey);
        }

        emit MetricStored(
            subjectId,
            metricKey,
            msg.sender,
            euint64.unwrap(metric)
        );
    }

    function storeEncryptedMrr(
        bytes32 subjectId,
        InEuint64 calldata encryptedMrr
    ) external {
        storeEncryptedMetric(subjectId, MRR_METRIC_KEY, encryptedMrr);
    }

    function getMetricRecord(
        bytes32 subjectId,
        bytes32 metricKey
    ) external view returns (MetricRecord memory) {
        return _metricRecords[subjectId][metricKey];
    }

    function hasMetric(
        bytes32 subjectId,
        bytes32 metricKey
    ) external view returns (bool) {
        return _metricRecords[subjectId][metricKey].isSet;
    }

    function listMetricKeysForSubject(
        bytes32 subjectId
    ) external view returns (bytes32[] memory) {
        return _metricKeysBySubject[subjectId];
    }

    function metricCountForSubject(
        bytes32 subjectId
    ) external view returns (uint256) {
        return _metricKeysBySubject[subjectId].length;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotOwner(msg.sender);
        }
        _;
    }

    modifier onlySubjectOwner(bytes32 subjectId) {
        if (!registry.isOwner(subjectId, msg.sender)) {
            revert NotSubjectOwner(subjectId, msg.sender);
        }
        _;
    }
}
