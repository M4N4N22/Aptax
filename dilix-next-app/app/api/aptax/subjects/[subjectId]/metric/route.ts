import { isHexString } from "ethers";

import { prepareStoreEncryptedMrrTransaction } from "@/server/aptax/transactions";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    subjectId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { subjectId } = await context.params;
  if (!isHexString(subjectId, 32)) {
    return Response.json({ error: "subjectId must be a 32-byte hex string." }, { status: 400 });
  }

  try {
    const body = await request.json();
    return Response.json(
      prepareStoreEncryptedMrrTransaction({
        subjectId,
        metricKey: body?.metricKey,
        encryptedValue: body?.encryptedValue,
        encryptedMrr: body?.encryptedMrr,
      })
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Metric transaction could not be prepared.",
      },
      { status: 400 }
    );
  }
}
