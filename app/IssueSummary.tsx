"use client";

import Link from "next/link";
import { Card, Flex, Text } from "@radix-ui/themes";
import { AlertCircle, Loader, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}

// Small hook for count-up animation
const useCountUp = (target: number, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / target), 1);
    const interval = setInterval(() => {
      start += 1;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
};

const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const openCount = useCountUp(open);
  const inProgressCount = useCountUp(inProgress);
  const closedCount = useCountUp(closed);

  const summaryItems = [
    {
      label: "Open Issues",
      value: openCount,
      status: "OPEN",
      icon: <AlertCircle size={24} strokeWidth={2} color="#f44336" />,
      color: "#f44336",
    },
    {
      label: "In-Progress Issues",
      value: inProgressCount,
      status: "IN_PROGRESS",
      icon: <Loader size={24} strokeWidth={2} color="#ff9800" />,
      color: "#ff9800",
    },
    {
      label: "Closed Issues",
      value: closedCount,
      status: "CLOSED",
      icon: <CheckCircle size={24} strokeWidth={2} color="#4caf50" />,
      color: "#4caf50",
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
          asChild
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          className="transition-transform duration-300 hover:scale-[1.03]"
        >
          <Link
            href={`/issues/list?status=${item.status}`}
            style={{ textDecoration: "none" }}
          >
            <Flex align="center" gap="3">
              {item.icon}
              <Flex direction="column" align="start">
                <Text size="6" weight="bold" style={{ color: item.color }}>
                  {item.value}
                </Text>
                <Text
                  size="3"
                  weight="medium"
                  color="gray"
                  style={{ marginTop: "6px" }}
                >
                  {item.label}
                </Text>
              </Flex>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
