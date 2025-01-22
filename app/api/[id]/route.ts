import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const issueId = parseInt(id);
    if (isNaN(issueId)) {
      return NextResponse.json(
        { message: "Invalid issue ID" },
        { status: 400 }
      );
    }
    const body = await request.json();

    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!existingIssue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: issueId },
      data: validation.data,
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
