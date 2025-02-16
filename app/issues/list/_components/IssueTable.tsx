import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue, IssueStatus } from "@prisma/client";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { parseSortParam } from "./useSortParams";
import { buildSortUrl } from "./getSortUrl";

interface Props {
  issues: Issue[];
  sort: string | undefined;
  status: IssueStatus | "ALL";
}

const IssuesTable = ({ issues, sort, status }: Props) => {
  const { field: sortField, isAscending } = parseSortParam(sort);

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;

    return isAscending ? (
      <ChevronUpIcon className="inline ml-1" />
    ) : (
      <ChevronDownIcon className="inline ml-1" />
    );
  };

  const getSortUrl = (field: string) =>
    buildSortUrl(field, sortField, isAscending, status);

  return (
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
            <Link href={getSortUrl("createdAt")} className="flex items-center">
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
  );
};

export default IssuesTable;
