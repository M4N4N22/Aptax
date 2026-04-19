// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AptaxRegistry {
    error SubjectAlreadyRegistered(bytes32 subjectId);
    error SubjectNotFound(bytes32 subjectId);
    error NotSubjectOwner(bytes32 subjectId, address account);

    struct SubjectRecord {
        address owner;
        string metadataURI;
        uint64 registeredAt;
    }

    mapping(bytes32 => SubjectRecord) private _subjects;
    bytes32[] private _subjectIds;

    event SubjectRegistered(
        bytes32 indexed subjectId,
        address indexed owner,
        string metadataURI
    );
    event SubjectMetadataUpdated(bytes32 indexed subjectId, string metadataURI);

    function registerSubject(
        bytes32 subjectId,
        string calldata metadataURI
    ) external {
        SubjectRecord storage existing = _subjects[subjectId];
        if (existing.owner != address(0)) {
            revert SubjectAlreadyRegistered(subjectId);
        }

        _subjects[subjectId] = SubjectRecord({
            owner: msg.sender,
            metadataURI: metadataURI,
            registeredAt: uint64(block.timestamp)
        });
        _subjectIds.push(subjectId);

        emit SubjectRegistered(subjectId, msg.sender, metadataURI);
    }

    function updateSubjectMetadata(
        bytes32 subjectId,
        string calldata metadataURI
    ) external onlySubjectOwner(subjectId) {
        _subjects[subjectId].metadataURI = metadataURI;
        emit SubjectMetadataUpdated(subjectId, metadataURI);
    }

    function ownerOf(bytes32 subjectId) external view returns (address) {
        SubjectRecord storage subject = _requireSubject(subjectId);
        return subject.owner;
    }

    function getSubject(
        bytes32 subjectId
    ) external view returns (SubjectRecord memory) {
        return _requireSubject(subjectId);
    }

    function isOwner(
        bytes32 subjectId,
        address account
    ) external view returns (bool) {
        SubjectRecord storage subject = _subjects[subjectId];
        return subject.owner != address(0) && subject.owner == account;
    }

    function listSubjectIds() external view returns (bytes32[] memory) {
        return _subjectIds;
    }

    function subjectCount() external view returns (uint256) {
        return _subjectIds.length;
    }

    modifier onlySubjectOwner(bytes32 subjectId) {
        SubjectRecord storage subject = _requireSubject(subjectId);
        if (subject.owner != msg.sender) {
            revert NotSubjectOwner(subjectId, msg.sender);
        }
        _;
    }

    function _requireSubject(
        bytes32 subjectId
    ) internal view returns (SubjectRecord storage subject) {
        subject = _subjects[subjectId];
        if (subject.owner == address(0)) {
            revert SubjectNotFound(subjectId);
        }
    }
}
