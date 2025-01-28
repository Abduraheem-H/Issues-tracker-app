import prisma from "@/prisma/client";
import DynamicIssueFormWrapper from "./DynamicIssueFormWrapper";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(id) },
  });

  return <DynamicIssueFormWrapper issue={issue} />;
};

export default EditIssuePage;
