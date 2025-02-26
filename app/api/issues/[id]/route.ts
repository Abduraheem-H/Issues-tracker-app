import authOptions from "@/app/auth/authOption";
import { updateIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const issueId = parseInt(id);
    if (isNaN(issueId)) {
      return NextResponse.json(
        { message: "Invalid issue ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validation = updateIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }
    const { title, description, status, assignedToUserId } = body;
    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });
      if (!user) {
        return NextResponse.json({ message: "Invalid User" }, { status: 400 });
      }
    }
    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!existingIssue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: issueId },
      data: {
        title,
        description,
        status,
        assignedToUserId,
      },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay for loading state testing
  try {
    const { id } = await params;
    const issueId = parseInt(id);
    if (isNaN(issueId)) {
      return NextResponse.json(
        { message: "Invalid issue ID" },
        { status: 400 }
      );
    }
    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId },
    });
    if (!existingIssue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }
    await prisma.issue.delete({
      where: { id: issueId },
    });
    return NextResponse.json(
      { message: "Issue deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
