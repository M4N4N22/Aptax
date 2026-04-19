import { isHexString } from "ethers";

import { listSubjectRequests } from "@/server/aptax/queries";
import { prepareCreateVerificationRequestTransaction } from "@/server/aptax/transactions";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    subjectId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { subjectId } = await context.params;
  if (!isHexString(subjectId, 32)) {
    return Response.json(
      { requests: [], error: "subjectId must be a 32-byte hex string." },
      { status: 400 }
    );
  }

  try {
    const requests = await listSubjectRequests(subjectId);
    return Response.json({ requests });
  } catch (error) {
    return Response.json(
      {
        requests: [],
        error: error instanceof Error ? error.message : "Requests could not be loaded.",
      },
      { status: 503 }
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { subjectId } = await context.params;
  if (!isHexString(subjectId, 32)) {
    return Response.json({ error: "subjectId must be a 32-byte hex string." }, { status: 400 });
  }

  try {
    const body = await request.json();
    return Response.json(
      prepareCreateVerificationRequestTransaction({
        subjectId,
        metricKey: body?.metricKey,
        threshold: body?.threshold,
        operatorKind: body?.operatorKind,
      })
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Verification request transaction could not be prepared.",
      },
      { status: 400 }
    );
  }
}
