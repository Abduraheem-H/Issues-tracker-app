import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function HomePage() {
  const openCount = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closedCount = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <IssueChart
      open={openCount}
      inProgress={inProgressCount}
      closed={closedCount}
    />
  );
}
