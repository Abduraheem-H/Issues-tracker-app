import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueToolbar from "./IssueToolbar";
import IssueNotification from "./IssueNotification";
import { IssueStatus } from "@prisma/client";

interface Props {
  searchParams: Promise<{
    status?: IssueStatus | "ALL";
    sort?: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const status = params.status || "ALL";
  const sort = params.sort || "createdAt_desc";

  let orderBy: { [key: string]: "asc" | "desc" } = { createdAt: "desc" };

  if (sort === "createdAt_asc") orderBy = { createdAt: "asc" };
  if (sort === "createdAt_desc") orderBy = { createdAt: "desc" };
  if (sort === "title_asc") orderBy = { title: "asc" };
  if (sort === "title_desc") orderBy = { title: "desc" };
  if (sort === "status_asc") orderBy = { status: "asc" };
  if (sort === "status_desc") orderBy = { status: "desc" };

  const issues = await prisma.issue.findMany({
    where: status !== "ALL" ? { status } : {},
    orderBy,
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
