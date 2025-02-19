"use client";

import Link from "next/link";
import { Card, Flex, Text } from "@radix-ui/themes";
import { AlertCircle, Loader, CheckCircle } from "lucide-react";

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const summaryItems = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
      icon: <AlertCircle size={24} strokeWidth={2} color="#6b7280" />,
    },
    {
      label: "In-Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      icon: <Loader size={24} strokeWidth={2} color="#6b7280" />,
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      icon: <CheckCircle size={24} strokeWidth={2} color="#6b7280" />,
    },
  ];

  return (
    <Flex
      gap="4"
      justify="between"
      direction={{ initial: "column", sm: "row" }}
    >
      {summaryItems.map((item) => (
        <Card
          key={item.status}
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <Flex align="center" gap="3">
            {item.icon}

            <Flex direction="column" align="start">
              <Text size="6" weight="bold">
                {item.value}
              </Text>

              <Link
                href={`/issues/list?status=${item.status}`}
                style={{
                  marginTop: "6px",
                  fontSize: "16px",
                  color: "#1a73e8",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
