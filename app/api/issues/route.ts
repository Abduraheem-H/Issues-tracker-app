import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "../../generated/prisma/client";
const prisma = new PrismaClient();

const createIssuesSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

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
