import type { Abi } from "viem";

export const aptaxRegistryAbi = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "NotSubjectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "SubjectAlreadyRegistered",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "SubjectNotFound",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "name": "SubjectMetadataUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "name": "SubjectRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "getSubject",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "metadataURI",
            "type": "string"
          },
          {
            "internalType": "uint64",
            "name": "registeredAt",
            "type": "uint64"
          }
        ],
        "internalType": "struct AptaxRegistry.SubjectRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "listSubjectIds",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "name": "registerSubject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "subjectCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "name": "updateSubjectMetadata",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const satisfies Abi;

export const aptaxMetricStoreAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "registryAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "got",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "expected",
        "type": "uint8"
      }
    ],
    "name": "InvalidEncryptedInput",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      }
    ],
    "name": "InvalidMetricKey",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      }
    ],
    "name": "InvalidVerifier",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "NotOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "NotSubjectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      }
    ],
    "name": "VerifierAlreadyConfigured",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VerifierNotConfigured",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      }
    ],
    "name": "AuthorizedVerifierSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "metricHandle",
        "type": "bytes32"
      }
    ],
    "name": "MetricStored",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MRR_METRIC_KEY",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "authorizedVerifier",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      }
    ],
    "name": "getMetricRecord",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "handle",
            "type": "bytes32"
          },
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "updatedAt",
            "type": "uint64"
          }
        ],
        "internalType": "struct AptaxMetricStore.MetricRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      }
    ],
    "name": "hasMetric",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "listMetricKeysForSubject",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "metricCountForSubject",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registry",
    "outputs": [
      {
        "internalType": "contract AptaxRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      }
    ],
    "name": "setAuthorizedVerifier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ctHash",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "securityZone",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "utype",
            "type": "uint8"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct InEuint64",
        "name": "encryptedValue",
        "type": "tuple"
      }
    ],
    "name": "storeEncryptedMetric",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ctHash",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "securityZone",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "utype",
            "type": "uint8"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct InEuint64",
        "name": "encryptedMrr",
        "type": "tuple"
      }
    ],
    "name": "storeEncryptedMrr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const satisfies Abi;

export const aptaxVerifierAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "registryAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "metricStoreAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      }
    ],
    "name": "InvalidMetricKey",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "threshold",
        "type": "uint64"
      }
    ],
    "name": "InvalidThreshold",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      }
    ],
    "name": "MetricNotStored",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "int32",
        "name": "value",
        "type": "int32"
      }
    ],
    "name": "SecurityZoneOutOfBounds",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "UnknownRequest",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "resultHandle",
        "type": "bytes32"
      }
    ],
    "name": "VerificationComputed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "threshold",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "enum AptaxVerifier.OperatorKind",
        "name": "operatorKind",
        "type": "uint8"
      }
    ],
    "name": "VerificationRequested",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MRR_METRIC_KEY",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "uint64",
        "name": "threshold",
        "type": "uint64"
      }
    ],
    "name": "createMrrThresholdRequest",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "resultHandle",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      },
      {
        "internalType": "uint64",
        "name": "threshold",
        "type": "uint64"
      },
      {
        "internalType": "enum AptaxVerifier.OperatorKind",
        "name": "operatorKind",
        "type": "uint8"
      }
    ],
    "name": "createThresholdRequest",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "resultHandle",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "getMetricRecord",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "handle",
            "type": "bytes32"
          },
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "updatedAt",
            "type": "uint64"
          }
        ],
        "internalType": "struct AptaxMetricStore.MetricRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "metricKey",
        "type": "bytes32"
      }
    ],
    "name": "getMetricRecordForKey",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "handle",
            "type": "bytes32"
          },
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "updatedAt",
            "type": "uint64"
          }
        ],
        "internalType": "struct AptaxMetricStore.MetricRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "getVerificationRequest",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "subjectId",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "metricKey",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "requester",
            "type": "address"
          },
          {
            "internalType": "uint64",
            "name": "threshold",
            "type": "uint64"
          },
          {
            "internalType": "enum AptaxVerifier.OperatorKind",
            "name": "operatorKind",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "resultHandle",
            "type": "bytes32"
          },
          {
            "internalType": "enum AptaxVerifier.VerificationStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint64",
            "name": "createdAt",
            "type": "uint64"
          }
        ],
        "internalType": "struct AptaxVerifier.VerificationRequest",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "requester",
        "type": "address"
      }
    ],
    "name": "listRequestIdsForRequester",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "subjectId",
        "type": "bytes32"
      }
    ],
    "name": "listRequestIdsForSubject",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "metricStore",
    "outputs": [
      {
        "internalType": "contract AptaxMetricStore",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextRequestId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registry",
    "outputs": [
      {
        "internalType": "contract AptaxRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const satisfies Abi;

export const aptaxRegistryViemAbi = aptaxRegistryAbi;
export const aptaxMetricStoreViemAbi = aptaxMetricStoreAbi;
export const aptaxVerifierViemAbi = aptaxVerifierAbi;
