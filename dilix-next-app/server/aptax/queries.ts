import "server-only";

import type { SubjectSummary, VerificationRequestSummary } from "@/lib/aptax/types";
import { getRegistryContract, getVerifierContract } from "@/server/aptax/contracts";

function formatOperatorKind(
  operatorKind: number
): VerificationRequestSummary["operatorKind"] {
  return operatorKind === 1 ? "lte" : "gte";
}

export async function listSubjects(): Promise<SubjectSummary[]> {
  const registry = getRegistryContract();
  const subjectIds = (await registry.listSubjectIds()) as string[];

  const subjects = await Promise.all(
    subjectIds.map(async (subjectId) => {
      const subject = await registry.getSubject(subjectId);

      return {
        subjectId,
        owner: subject.owner as string,
        metadataUri: subject.metadataURI as string,
        registeredAt: Number(subject.registeredAt),
      } satisfies SubjectSummary;
    })
  );

  return subjects.sort((left, right) => right.registeredAt - left.registeredAt);
}

export async function listSubjectRequests(
  subjectId: string
): Promise<VerificationRequestSummary[]> {
  const verifier = getVerifierContract();
  const requestIds = (await verifier.listRequestIdsForSubject(subjectId)) as bigint[];

  const requests = await Promise.all(
    requestIds.map(async (requestId) => {
      const request = await verifier.getVerificationRequest(requestId);

      return {
        id: request.id.toString(),
        subjectId: request.subjectId as string,
        metricKey: request.metricKey as string,
        requester: request.requester as string,
        threshold: request.threshold.toString(),
        operatorKind: formatOperatorKind(Number(request.operatorKind)),
        resultHandle: request.resultHandle as string,
        status: Number(request.status) === 2 ? "computed" : "submitted",
        createdAt: Number(request.createdAt),
      } satisfies VerificationRequestSummary;
    })
  );

  return requests.sort((left, right) => right.createdAt - left.createdAt);
}

export async function getVerificationRequestById(
  requestId: bigint | string
): Promise<VerificationRequestSummary> {
  const verifier = getVerifierContract();
  const request = await verifier.getVerificationRequest(requestId);

  return {
    id: request.id.toString(),
    subjectId: request.subjectId as string,
    metricKey: request.metricKey as string,
    requester: request.requester as string,
    threshold: request.threshold.toString(),
    operatorKind: formatOperatorKind(Number(request.operatorKind)),
    resultHandle: request.resultHandle as string,
    status: Number(request.status) === 2 ? "computed" : "submitted",
    createdAt: Number(request.createdAt),
  } satisfies VerificationRequestSummary;
}
