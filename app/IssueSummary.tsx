"use client";

import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

interface IssueSummaryProps {
  openCount: number;
  inProgressCount: number;
  closedCount: number;
}

const IssueSummary = ({
  openCount,
  inProgressCount,
  closedCount,
}: IssueSummaryProps) => {
  return (
    <Flex gap="4" direction={{ initial: "column", sm: "row" }}>
      <Card>
        <Flex direction="column" align="start" gap="2">
          <Heading size="5">{openCount}</Heading>
          <Link href="/issues/list?status=OPEN">
            <Text size="3" weight="medium" color="blue">
              Open Issues
            </Text>
          </Link>
        </Flex>
      </Card>

      <Card>
        <Flex direction="column" align="start" gap="2">
          <Heading size="5">{inProgressCount}</Heading>
          <Link href="/issues/list?status=IN_PROGRESS">
            <Text size="3" weight="medium" color="blue">
              In-Progress Issues
            </Text>
          </Link>
        </Flex>
      </Card>

      <Card>
        <Flex direction="column" align="start" gap="2">
          <Heading size="5">{closedCount}</Heading>
          <Link href="/issues/list?status=CLOSED">
            <Text size="3" weight="medium" color="blue">
              Closed Issues
            </Text>
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
};

export default IssueSummary;
