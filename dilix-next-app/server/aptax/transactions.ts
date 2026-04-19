import "server-only";

import { id } from "ethers";
import { z } from "zod";

import {
  getAptaxAddresses,
  metricStoreInterface,
  registryInterface,
  verifierInterface,
} from "@/server/aptax/contracts";

const bytes32Value = z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Expected a 32-byte hex string.");
const bigintString = z
  .string()
  .regex(/^(0x[a-fA-F0-9]+|[0-9]+)$/, "Expected an unsigned integer string.");
const hexBytes = z.string().regex(/^0x[a-fA-F0-9]*$/, "Expected a hex string.");

const createSubjectSchema = z.object({
  subjectId: bytes32Value,
  metadataUri: z.string().trim().min(1, "metadataUri is required."),
});

const encryptedUint64Schema = z.object({
  ctHash: bigintString,
  securityZone: z.number().int().min(0).max(255),
  utype: z.number().int().min(0).max(255),
  signature: hexBytes,
});

const storeMetricSchema = z.object({
  subjectId: bytes32Value,
  metricKey: bytes32Value.optional(),
  encryptedValue: encryptedUint64Schema.optional(),
  encryptedMrr: encryptedUint64Schema.optional(),
});

const createVerificationRequestSchema = z.object({
  subjectId: bytes32Value,
  metricKey: bytes32Value.optional(),
  threshold: bigintString,
  operatorKind: z.enum(["gte", "lte"]).optional(),
});

const requestIdSchema = z.string().regex(/^[0-9]+$/, "Expected a numeric request id.");
const UINT64_MAX = (BigInt(1) << BigInt(64)) - BigInt(1);
const DEFAULT_MRR_METRIC_KEY = id("mrr");

function makePreparedTransaction(to: string, data: string) {
  return {
    to,
    data,
    value: "0x0",
  };
}

function parsePositiveUint64(value: string, label: string) {
  const parsed = BigInt(value);
  if (parsed <= BigInt(0)) {
    throw new Error(`${label} must be greater than zero.`);
  }

  if (parsed > UINT64_MAX) {
    throw new Error(`${label} must fit inside uint64.`);
  }

  return parsed;
}

function resolveMetricKey(metricKey?: string) {
  return metricKey ?? DEFAULT_MRR_METRIC_KEY;
}

function resolveOperatorKind(operatorKind?: "gte" | "lte") {
  return operatorKind === "lte" ? 1 : 0;
}

export function parseSubjectId(value: string) {
  return bytes32Value.parse(value);
}

export function parseRequestId(value: string) {
  return BigInt(requestIdSchema.parse(value));
}

export function prepareCreateSubjectTransaction(payload: unknown) {
  const input = createSubjectSchema.parse(payload);
  const { registryAddress } = getAptaxAddresses();
  const data = registryInterface.encodeFunctionData("registerSubject", [
    input.subjectId,
    input.metadataUri,
  ]);

  return {
    subjectId: input.subjectId,
    metadataUri: input.metadataUri,
    transaction: makePreparedTransaction(registryAddress, data),
  };
}

export function prepareStoreEncryptedMrrTransaction(payload: unknown) {
  const input = storeMetricSchema.parse(payload);
  const encryptedValue = input.encryptedValue ?? input.encryptedMrr;
  if (!encryptedValue) {
    throw new Error("encryptedValue is required.");
  }

  const metricKey = resolveMetricKey(input.metricKey);
  const { metricStoreAddress } = getAptaxAddresses();
  const data = metricStoreInterface.encodeFunctionData("storeEncryptedMetric", [
    input.subjectId,
    metricKey,
    {
      ctHash: BigInt(encryptedValue.ctHash),
      securityZone: encryptedValue.securityZone,
      utype: encryptedValue.utype,
      signature: encryptedValue.signature,
    },
  ]);

  return {
    subjectId: input.subjectId,
    metricKey,
    transaction: makePreparedTransaction(metricStoreAddress, data),
  };
}

export function prepareCreateVerificationRequestTransaction(payload: unknown) {
  const input = createVerificationRequestSchema.parse(payload);
  const threshold = parsePositiveUint64(input.threshold, "threshold");
  const metricKey = resolveMetricKey(input.metricKey);
  const operatorKind = input.operatorKind ?? "gte";
  const { verifierAddress } = getAptaxAddresses();
  const data = verifierInterface.encodeFunctionData("createThresholdRequest", [
    input.subjectId,
    metricKey,
    threshold,
    resolveOperatorKind(operatorKind),
  ]);

  return {
    subjectId: input.subjectId,
    metricKey,
    threshold: threshold.toString(),
    operatorKind,
    transaction: makePreparedTransaction(verifierAddress, data),
  };
}
