import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Heading, Text, Flex } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
      <Heading className="text-2xl font-bold mb-8">{issue?.title}</Heading>
      <Flex direction="row" align="center" gap="2" className="mb-4 mt-4">
        <Text className="font-medium">Status:</Text>
        <IssueStatusBadge status={issue!.status} />
        <Text className="font-medium">Created:</Text>
        <Text className="mb-2">
          {new Date(issue!.createdAt).toDateString()}
        </Text>
      </Flex>
      <Card className="mb-4">
        <Text>{issue?.description}</Text>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
