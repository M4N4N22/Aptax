export type AptaxPublicConfig = {
  configured: boolean;
  networkChainId: number;
  registryAddress: string;
  metricStoreAddress: string;
  verifierAddress: string;
  error?: string;
};

export type AptaxMetricOperator = "gte" | "lte";
export type AptaxMetricSlug =
  | "mrr"
  | "runway_months"
  | "cash_balance"
  | "gross_margin_bps"
  | "customer_concentration_bps";

export type PreparedTransactionRequest = {
  to: string;
  data: string;
  value: string;
};

export type SerializedEncryptedUint64 = {
  ctHash: string;
  securityZone: number;
  utype: number;
  signature: `0x${string}`;
};

export type SubjectSummary = {
  subjectId: string;
  owner: string;
  metadataUri: string;
  registeredAt: number;
};

export type VerificationRequestSummary = {
  id: string;
  subjectId: string;
  metricKey: string;
  requester: string;
  threshold: string;
  operatorKind: AptaxMetricOperator;
  resultHandle: string;
  status: "submitted" | "computed";
  createdAt: number;
};

export type PreparedSubjectResponse = {
  subjectId: string;
  metadataUri: string;
  transaction: PreparedTransactionRequest;
};

export type PreparedMetricResponse = {
  subjectId: string;
  metricKey: string;
  transaction: PreparedTransactionRequest;
};

export type PreparedVerificationRequestResponse = {
  subjectId: string;
  metricKey: string;
  threshold: string;
  operatorKind: AptaxMetricOperator;
  transaction: PreparedTransactionRequest;
};
