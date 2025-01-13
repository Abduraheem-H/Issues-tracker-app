import React from "react";
import { Badge } from "@radix-ui/themes";
import { IssueStatus } from "@prisma/client";

interface Props {
  status: IssueStatus;
}

const statusColorMap: Record<
  IssueStatus,
  { label: string; color: "red" | "green" | "violet" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};
function IssueStatusBadge({ status }: Props) {
  return (
    <Badge color={statusColorMap[status].color}>
      {statusColorMap[status].label}
    </Badge>
  );
}

export default IssueStatusBadge;
