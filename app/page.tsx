import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import LatestIssues from "./LatestIssues";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="8">
      <Flex direction="column" gap="8">
        <IssueSummary
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
        <IssueChart
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
