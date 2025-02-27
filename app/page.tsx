import { Grid, Flex, Card, Text, Button } from "@radix-ui/themes";
import DashboardLeft from "./DashboardLeft";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import Link from "next/link";
import { Metadata } from "next";

export default async function HomePage() {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="8">
      <DashboardLeft
        open={openCount}
        inProgress={inProgressCount}
        closed={closedCount}
      />

      <Card
        style={{
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxHeight: "600px",
          overflowY: "auto",
        }}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <Flex direction="column" gap="4">
          <Text size="4" weight="bold">
            Latest Issues
          </Text>
          <LatestIssues />
          <Button
            asChild
            size="2"
            style={{ marginTop: "12px", alignSelf: "flex-end" }}
          >
            <Link href="/issues/list">View All Issues</Link>
          </Button>
        </Flex>
      </Card>
    </Grid>
  );
}
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard - Issue Tracker",
  description: "Overview of issue statuses and latest issues",
};
