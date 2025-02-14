import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueToolbar from "./IssueToolbar";
import IssueNotification from "./IssueNotification";
import { IssueStatus } from "@prisma/client";

interface Props {
  searchParams: Promise<{ status?: IssueStatus | undefined | "ALL" }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = (await searchParams).status || "ALL";
  console.log("Filtering issues with status:", status);
  console.log("Search Params:", (await searchParams).status);

  const issues = await prisma.issue.findMany({
    where: status !== "ALL" ? { status } : {},
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <IssueNotification />
      <div className="mb-4">
        <IssueToolbar />
      </div>
      <Table.Root variant="surface" className="mt-4 w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {issue.title}
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Link>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                {new Date(issue.createdAt).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
