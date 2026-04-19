import type { Abi } from "viem";

export const aptaxRegistryAbi = [
  "function registerSubject(bytes32 subjectId, string metadataURI)",
  "function getSubject(bytes32 subjectId) view returns (tuple(address owner, string metadataURI, uint64 registeredAt))",
  "function listSubjectIds() view returns (bytes32[])",
  "function subjectCount() view returns (uint256)",
  "function isOwner(bytes32 subjectId, address account) view returns (bool)",
] as const;

export const aptaxMetricStoreAbi = [
  "function storeEncryptedMetric(bytes32 subjectId, bytes32 metricKey, tuple(uint256 ctHash, uint8 securityZone, uint8 utype, bytes signature) encryptedValue)",
  "function storeEncryptedMrr(bytes32 subjectId, tuple(uint256 ctHash, uint8 securityZone, uint8 utype, bytes signature) encryptedMrr)",
  "function getMetricRecord(bytes32 subjectId, bytes32 metricKey) view returns (tuple(bytes32 handle, bool isSet, uint64 updatedAt))",
  "function listMetricKeysForSubject(bytes32 subjectId) view returns (bytes32[])",
] as const;

export const aptaxVerifierAbi = [
  "function createThresholdRequest(bytes32 subjectId, bytes32 metricKey, uint64 threshold, uint8 operatorKind) returns (uint256 requestId, bytes32 resultHandle)",
  "function createMrrThresholdRequest(bytes32 subjectId, uint64 threshold) returns (uint256 requestId, bytes32 resultHandle)",
  "function getMetricRecord(bytes32 subjectId) view returns (tuple(bytes32 handle, bool isSet, uint64 updatedAt))",
  "function getMetricRecordForKey(bytes32 subjectId, bytes32 metricKey) view returns (tuple(bytes32 handle, bool isSet, uint64 updatedAt))",
  "function getVerificationRequest(uint256 requestId) view returns (tuple(uint256 id, bytes32 subjectId, bytes32 metricKey, address requester, uint64 threshold, uint8 operatorKind, bytes32 resultHandle, uint8 status, uint64 createdAt))",
  "function listRequestIdsForSubject(bytes32 subjectId) view returns (uint256[])",
  "function listRequestIdsForRequester(address requester) view returns (uint256[])",
  "event VerificationComputed(uint256 indexed requestId, bytes32 indexed subjectId, bytes32 indexed metricKey, address requester, bytes32 resultHandle)",
] as const;

export const aptaxRegistryViemAbi = [
  {
    type: "function",
    name: "getSubject",
    stateMutability: "view",
    inputs: [{ name: "subjectId", type: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "owner", type: "address" },
          { name: "metadataURI", type: "string" },
          { name: "registeredAt", type: "uint64" },
        ],
      },
    ],
  },
] as const satisfies Abi;

export const aptaxVerifierViemAbi = [
  {
    type: "function",
    name: "getMetricRecord",
    stateMutability: "view",
    inputs: [{ name: "subjectId", type: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "handle", type: "bytes32" },
          { name: "isSet", type: "bool" },
          { name: "updatedAt", type: "uint64" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getMetricRecordForKey",
    stateMutability: "view",
    inputs: [
      { name: "subjectId", type: "bytes32" },
      { name: "metricKey", type: "bytes32" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "handle", type: "bytes32" },
          { name: "isSet", type: "bool" },
          { name: "updatedAt", type: "uint64" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "listRequestIdsForRequester",
    stateMutability: "view",
    inputs: [{ name: "requester", type: "address" }],
    outputs: [{ name: "", type: "uint256[]" }],
  },
] as const satisfies Abi;
