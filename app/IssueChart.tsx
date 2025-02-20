"use client";

import { Card, Text } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", count: open, color: "#f44336" },
    { label: "In Progress", count: inProgress, color: "violet" },
    { label: "Closed", count: closed, color: "#4caf50" },
  ];

  return (
    <Card
      style={{ padding: 20, width: "100%", maxWidth: 700, margin: "0 auto" }}
    >
      <Text size="4" weight="bold" style={{ marginBottom: 16 }}>
        Issue Status Overview
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" barSize={50}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
