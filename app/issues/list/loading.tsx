import { Table } from "@radix-ui/themes";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
// @ts-expect-error Skeleton CSS import
import "react-loading-skeleton/dist/skeleton.css";
import IssueToolbar from "./IssueToolbar";

const IssueLoadingPage = () => {
  const issues = Array.from({ length: 5 }, (_, i) => `loading-${i}`);
  return (
    <div>
      <IssueToolbar />
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
            <Table.Row key={issue}>
              <Table.Cell>
                <Link
                  href={`/issues/${issue}`}
                  className="text-blue-600 hover:underline"
                >
                  <Skeleton />
                  <div className="block md:hidden">
                    <Skeleton />
                  </div>
                </Link>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueLoadingPage;
