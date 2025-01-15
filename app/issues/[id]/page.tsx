import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{issue?.title}</h1>
      <p className="mb-2">
        <strong>Status:</strong> {issue?.status}
      </p>
      <p className="mb-2">
        <strong>Created At:</strong>{" "}
        {new Date(issue!.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Description:</strong>
      </p>
      <p>{issue?.description}</p>
    </div>
  );
};

export default IssueDetailPage;
