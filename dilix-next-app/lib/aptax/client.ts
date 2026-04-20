"use client";

import { Encryptable, FheTypes } from "@cofhe/sdk";
import type { Address, Hex, PublicClient } from "viem";

import {
  createAptaxBrowserSession,
  formatVerificationLabel,
  makeMetricKey,
  normalizeOperatorKind,
  parseUnsignedBigInt,
  type AptaxBrowserSession,
  type AptaxWalletSessionInput,
} from "@/lib/aptax/browser";
import { aptaxRegistryViemAbi, aptaxVerifierViemAbi } from "@/lib/aptax/abis";
import type {
  AptaxMetricOperator,
  AptaxMetricSlug,
  AptaxPublicConfig,
  PreparedMetricResponse,
  PreparedSubjectResponse,
  PreparedTransactionRequest,
  PreparedVerificationRequestResponse,
  SerializedEncryptedUint64,
  SubjectSummary,
  VerificationRequestSummary,
} from "@/lib/aptax/types";

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const payload = (await response.json()) as T & { error?: string };

  if (!response.ok && payload.error) {
    throw new Error(payload.error);
  }

  return payload;
}

function serializeEncryptedUint64(input: {
  ctHash: bigint;
  securityZone: number;
  utype: number;
  signature: string;
}): SerializedEncryptedUint64 {
  return {
    ctHash: input.ctHash.toString(),
    securityZone: input.securityZone,
    utype: input.utype,
    signature: input.signature as `0x${string}`,
  };
}

export async function getAptaxConfig() {
  return fetchJson<AptaxPublicConfig>("/api/aptax/config");
}

export async function getSubjects() {
  const payload = await fetchJson<{ subjects: SubjectSummary[] }>("/api/aptax/subjects");
  return payload.subjects;
}

export async function getSubjectRequests(subjectId: string) {
  const payload = await fetchJson<{ requests: VerificationRequestSummary[] }>(
    `/api/aptax/subjects/${subjectId}/requests`
  );
  return payload.requests;
}

export async function getVerificationRequest(requestId: string) {
  return fetchJson<VerificationRequestSummary>(`/api/aptax/requests/${requestId}`);
}

export async function createBrowserSession(
  config: AptaxPublicConfig,
  walletSession: AptaxWalletSessionInput
) {
  return createAptaxBrowserSession(config, walletSession);
}

export async function sendPreparedTransaction(
  session: AptaxBrowserSession,
  transaction: PreparedTransactionRequest
) {
  const hash = await session.walletClient.sendTransaction({
    account: session.walletClient.account ?? session.account,
    chain: session.walletClient.chain,
    to: transaction.to as Address,
    data: transaction.data as Hex,
    value: BigInt(transaction.value),
  });

  await session.publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

async function getSubject(
  publicClient: PublicClient,
  registryAddress: Address,
  subjectId: string
) {
  return publicClient.readContract({
    address: registryAddress,
    abi: aptaxRegistryViemAbi,
    functionName: "getSubject",
    args: [subjectId as Hex],
  });
}

async function getMetricRecord(
  publicClient: PublicClient,
  verifierAddress: Address,
  subjectId: string
) {
  return publicClient.readContract({
    address: verifierAddress,
    abi: aptaxVerifierViemAbi,
    functionName: "getMetricRecord",
    args: [subjectId as Hex],
  }) as Promise<{ handle: Hex; isSet: boolean; updatedAt: bigint }>;
}

async function getMetricRecordForKey(
  publicClient: PublicClient,
  verifierAddress: Address,
  subjectId: string,
  metricKey: string
) {
  return publicClient.readContract({
    address: verifierAddress,
    abi: aptaxVerifierViemAbi,
    functionName: "getMetricRecordForKey",
    args: [subjectId as Hex, metricKey as Hex],
  }) as Promise<{ handle: Hex; isSet: boolean; updatedAt: bigint }>;
}

async function listRequestIdsForRequester(
  publicClient: PublicClient,
  verifierAddress: Address,
  requester: Address
) {
  return publicClient.readContract({
    address: verifierAddress,
    abi: aptaxVerifierViemAbi,
    functionName: "listRequestIdsForRequester",
    args: [requester],
  }) as Promise<bigint[]>;
}

export async function ensureSubjectRegistered(
  session: AptaxBrowserSession,
  subjectId: string,
  metadataUri: string
) {
  try {
    await getSubject(session.publicClient, session.registryAddress, subjectId);
    return false;
  } catch {
    const payload = await fetchJson<PreparedSubjectResponse>("/api/aptax/subjects", {
      method: "POST",
      body: JSON.stringify({ subjectId, metadataUri }),
    });
    await sendPreparedTransaction(session, payload.transaction);
    return true;
  }
}

export async function storeFounderMrr(
  session: AptaxBrowserSession,
  subjectId: string,
  mrrInput: string
) {
  const result = await storeFounderMetric(session, subjectId, "mrr", mrrInput);

  return {
    mrr: result.metricValue,
    founderOnlyValue: result.founderOnlyValue,
  };
}

export async function storeFounderMetric(
  session: AptaxBrowserSession,
  subjectId: string,
  metricSlug: AptaxMetricSlug,
  metricValueInput: string
) {
  const metricValue = parseUnsignedBigInt(metricValueInput, "Metric value");
  const metricKey = makeMetricKey(metricSlug);
  const [encryptedMrr] = await session.cofheClient
    .encryptInputs([Encryptable.uint64(metricValue)])
    .execute();

  const payload = await fetchJson<PreparedMetricResponse>(
    `/api/aptax/subjects/${subjectId}/metric`,
    {
      method: "POST",
      body: JSON.stringify({
        metricKey,
        encryptedValue: serializeEncryptedUint64(encryptedMrr),
      }),
    }
  );

  await sendPreparedTransaction(session, payload.transaction);

  const metricRecord =
    metricSlug === "mrr"
      ? await getMetricRecord(session.publicClient, session.verifierAddress, subjectId)
      : await getMetricRecordForKey(
          session.publicClient,
          session.verifierAddress,
          subjectId,
          metricKey
        );
  const founderOnlyValue = await session.cofheClient
    .decryptForView(metricRecord.handle, FheTypes.Uint64)
    .execute();

  return {
    metricKey,
    metricValue,
    founderOnlyValue,
  };
}

export async function decryptFounderMetricForView(
  session: AptaxBrowserSession,
  subjectId: string,
  metricSlug: AptaxMetricSlug
) {
  const metricKey = makeMetricKey(metricSlug);
  const metricRecord =
    metricSlug === "mrr"
      ? await getMetricRecord(session.publicClient, session.verifierAddress, subjectId)
      : await getMetricRecordForKey(
          session.publicClient,
          session.verifierAddress,
          subjectId,
          metricKey
        );

  if (!metricRecord.isSet) {
    throw new Error("This metric has not been uploaded yet.");
  }

  const founderOnlyValue = await session.cofheClient
    .decryptForView(metricRecord.handle, FheTypes.Uint64)
    .execute();

  return {
    metricKey,
    founderOnlyValue,
    updatedAt: metricRecord.updatedAt,
  };
}

export async function requestThresholdVerification(
  session: AptaxBrowserSession,
  subjectId: string,
  thresholdInput: string
) {
  return requestMetricThresholdVerification(
    session,
    subjectId,
    "mrr",
    thresholdInput,
    "gte"
  );
}

export async function requestMetricThresholdVerification(
  session: AptaxBrowserSession,
  subjectId: string,
  metricSlug: AptaxMetricSlug,
  thresholdInput: string,
  operatorKind: AptaxMetricOperator = "gte"
) {
  const threshold = parseUnsignedBigInt(thresholdInput, "Threshold");
  const metricKey = makeMetricKey(metricSlug);
  const normalizedOperatorKind = normalizeOperatorKind(operatorKind);
  const payload = await fetchJson<PreparedVerificationRequestResponse>(
    `/api/aptax/subjects/${subjectId}/requests`,
    {
      method: "POST",
      body: JSON.stringify({
        metricKey,
        threshold: threshold.toString(),
        operatorKind: normalizedOperatorKind,
      }),
    }
  );

  await sendPreparedTransaction(session, payload.transaction);

  const requestIds = await listRequestIdsForRequester(
    session.publicClient,
    session.verifierAddress,
    session.account
  );
  const requestId = requestIds.at(-1);
  if (requestId == null) {
    throw new Error("The new verification request could not be located.");
  }

  const request = await getVerificationRequest(requestId.toString());
  const rawVerdict = await session.cofheClient
    .decryptForView(request.resultHandle, FheTypes.Bool)
    .execute();

  return {
    metricKey,
    request,
    verdictLabel: formatVerificationLabel(rawVerdict),
  };
}
