"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue | null;
}

const DynamicIssueFormWrapper = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default DynamicIssueFormWrapper;
