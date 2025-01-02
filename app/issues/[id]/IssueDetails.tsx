import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";

interface Props {
  issue: Issue | null;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Heading className="text-2xl font-bold mb-8">{issue?.title}</Heading>
      <Flex direction="row" align="center" gap="2" className="mb-4 mt-4">
        <Text className="font-medium">Status:</Text>
        <IssueStatusBadge status={issue!.status} />
        <Text className="font-medium">Created:</Text>
        <Text className="mb-2">
          {new Date(issue!.createdAt).toDateString()}
        </Text>
      </Flex>

      <Card className="prose ">
        <ReactMarkDown>{issue?.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
