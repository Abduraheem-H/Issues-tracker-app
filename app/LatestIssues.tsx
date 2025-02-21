import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./components/IssueStatusBadge";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center" width="100%">
                  <Flex direction="column" gap="2" align="start">
                    <Link
                      href={`/issues/${issue.id}`}
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textDecoration: "none",
                        color: "#1a73e8",
                      }}
                    >
                      {issue.title}
                    </Link>
                    <Flex gap="2" align="center">
                      <IssueStatusBadge status={issue.status} />
                      <span style={{ color: "#555", fontSize: "14px" }}>
                        Last updated:{" "}
                        {new Date(issue.updatedAt).toLocaleDateString()}
                      </span>
                    </Flex>
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image || undefined}
                      alt={issue.assignedToUser.name || "User Avatar"}
                      size="2"
                      radius="full"
                      fallback="?"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
