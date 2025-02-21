"use client";

import { Flex, Card, Text } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const DashboardLeft = ({ open, inProgress, closed }: Props) => {
  return (
    <Flex direction="column" gap="8">
      {/* KPI Cards */}
      <Card
        style={{
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
        className="transition-transform duration-300 hover:scale-[1.02]"
      >
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      </Card>

      {/* Chart Card */}
      <Card
        style={{
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
        className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-5"
      >
        <Text size="4" weight="bold" style={{ marginBottom: "12px" }}>
          Issue Status Overview
        </Text>
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Card>
    </Flex>
  );
};

export default DashboardLeft;
