import { listSubjects } from "@/server/aptax/queries";
import { prepareCreateSubjectTransaction } from "@/server/aptax/transactions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const subjects = await listSubjects();
    return Response.json({ subjects });
  } catch (error) {
    return Response.json(
      {
        subjects: [],
        error: error instanceof Error ? error.message : "Subjects could not be loaded.",
      },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    return Response.json(prepareCreateSubjectTransaction(payload));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Subject transaction could not be prepared.",
      },
      { status: 400 }
    );
  }
}
