import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma/client";
import { createIssuesSchema } from "../../validationSchema";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateBody = createIssuesSchema.safeParse(body);

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
