import "server-only";

import type { SubjectSummary, VerificationRequestSummary } from "@/lib/aptax/types";
import { getAptaxServerEnv } from "@/server/aptax/env";
import { listSubjectRequests, listSubjects } from "@/server/aptax/queries";

export type WorkspaceSnapshot = {
  configured: boolean;
  networkChainId: number | null;
  subjects: SubjectSummary[];
  requests: VerificationRequestSummary[];
  computedRequests: VerificationRequestSummary[];
  pendingRequests: VerificationRequestSummary[];
  error?: string;
};

export async function getWorkspaceSnapshot(): Promise<WorkspaceSnapshot> {
  try {
    const env = getAptaxServerEnv();
    const subjects = await listSubjects();
    const requestGroups = await Promise.all(
      subjects.map((subject) =>
        listSubjectRequests(subject.subjectId).catch(() => [] as VerificationRequestSummary[])
      )
    );
    const requests = requestGroups.flat().sort((left, right) => right.createdAt - left.createdAt);

    return {
      configured: true,
      networkChainId: env.NEXT_PUBLIC_NETWORK_CHAIN_ID,
      subjects,
      requests,
      computedRequests: requests.filter((request) => request.status === "computed"),
      pendingRequests: requests.filter((request) => request.status !== "computed"),
    };
  } catch (error) {
    return {
      configured: false,
      networkChainId: null,
      subjects: [],
      requests: [],
      computedRequests: [],
      pendingRequests: [],
      error: error instanceof Error ? error.message : "Workspace data could not be loaded.",
    };
  }
}
