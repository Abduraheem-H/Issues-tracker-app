import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();
  // await new Promise((r) => setTimeout(r, 2000)); // Simulate delay for loading state

  return (
    <Grid columns={{ initial: "1", md: "2fr 2fr" }} gap="8">
      <Box>
        <Heading className="text-2xl font-bold mb-8">{issue?.title}</Heading>
        <Flex direction="row" align="center" gap="2" className="mb-4 mt-4">
          <Text className="font-medium">Status:</Text>
          <IssueStatusBadge status={issue!.status} />
          <Text className="font-medium">Created:</Text>
          <Text className="mb-2">
            {new Date(issue!.createdAt).toDateString()}
          </Text>
        </Flex>

        <Card className="prose" mt="4">
          <ReactMarkDown>{issue?.description}</ReactMarkDown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button>
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
