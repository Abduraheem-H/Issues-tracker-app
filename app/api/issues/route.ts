import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const validateBody = issueSchema.safeParse(body);

  if (!validateBody.success) {
    return NextResponse.json(
      { errors: validateBody.error.issues }, // Wrap errors in an object (ZodError.issues)
      {
        status: 400,
      }
    );
  }

  const { title, description, status } = validateBody.data;

  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
      status: status || "OPEN",
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
