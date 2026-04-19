import { getVerificationRequestById } from "@/server/aptax/queries";
import { parseRequestId } from "@/server/aptax/transactions";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    requestId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { requestId } = await context.params;

  try {
    const parsedRequestId = parseRequestId(requestId);
    const verificationRequest = await getVerificationRequestById(parsedRequestId);
    return Response.json(verificationRequest);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Verification request could not be loaded.",
      },
      { status: 400 }
    );
  }
}
