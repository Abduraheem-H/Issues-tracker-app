import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueToolbar from "./IssueToolbar";
import IssueNotification from "./IssueNotification";
import { IssueStatus } from "@prisma/client";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import Pagination from "../_components/Pagination";

interface Props {
  searchParams: Promise<{
    status?: IssueStatus | "ALL";
    sort?: string;
    page?: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const status = params.status || "ALL";
  const sort = params.sort || "createdAt_desc";
  const page = params.page ? parseInt(params.page) : 1;

  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  // Sorting logic
  const [sortField, sortDirection] = sort.split("_");
  const isAsc = sortDirection === "asc";

  let orderBy: { [key: string]: "asc" | "desc" } = { createdAt: "desc" };

  if (sort === "createdAt_asc") orderBy = { createdAt: "asc" };
  if (sort === "createdAt_desc") orderBy = { createdAt: "desc" };
  if (sort === "title_asc") orderBy = { title: "asc" };
  if (sort === "title_desc") orderBy = { title: "desc" };
  if (sort === "status_asc") orderBy = { status: "asc" };
  if (sort === "status_desc") orderBy = { status: "desc" };

  // Count all issues for pagination
  const totalIssues = await prisma.issue.count({
    where: status !== "ALL" ? { status } : {},
  });

  // Fetch paginated issues
  const issues = await prisma.issue.findMany({
    where: status !== "ALL" ? { status } : {},
    orderBy,
    skip,
    take: pageSize,
  });

  const getSortUrl = (field: string) => {
    const params = new URLSearchParams();

    if (status && status !== "ALL") params.set("status", status);

    if (sortField === field) {
      params.set("sort", `${field}_${isAsc ? "desc" : "asc"}`);
    } else {
      const defaultDirection = field === "status" ? "asc" : "desc";
      params.set("sort", `${field}_${defaultDirection}`);
    }

    params.set("page", "1");

    return `/issues/list?${params.toString()}`;
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return isAsc ? (
      <ChevronUpIcon className="inline ml-1" />
    ) : (
      <ChevronDownIcon className="inline ml-1" />
    );
  };

  return (
    <div>
      <IssueNotification />
      <div className="mb-4">
        <IssueToolbar />
      </div>

      <Table.Root variant="surface" className="mt-4 w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Link href={getSortUrl("title")} className="flex items-center">
                Issue {renderSortIcon("title")}
              </Link>
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href={getSortUrl("status")} className="flex items-center">
                Status {renderSortIcon("status")}
              </Link>
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link
                href={getSortUrl("createdAt")}
                className="flex items-center"
              >
                Created {renderSortIcon("createdAt")}
              </Link>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} className="text-blue-600">
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

      <Pagination
        itemsCount={totalIssues}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
