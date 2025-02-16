import IssueNotification from "./IssueNotification";
import IssueToolbar from "./IssueToolbar";
import IssuesTable from "./_components/IssueTable";
import Pagination from "../_components/Pagination";
import { parseSortParam } from "./_components/useSortParams";
import { fetchIssues, countIssues } from "./_components/issueService";
import { IssueStatus } from "@prisma/client";

interface Props {
  searchParams: Promise<{
    status?: IssueStatus | "ALL";
    sort?: string;
    page?: string;
  }>;
}

const pageSize = 10;

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const status = params.status || "ALL";
  const sort = params.sort || "createdAt_desc";
  const page = params.page ? parseInt(params.page) : 1;

  const { field: sortField, isAscending } = parseSortParam(sort);

  const orderBy: Record<string, "asc" | "desc"> = {};
  orderBy[sortField] = isAscending ? "asc" : "desc";

  const skip = (page - 1) * pageSize;

  const issues = await fetchIssues({ status, orderBy, skip, take: pageSize });
  const totalIssues = await countIssues(status);

  return (
    <div>
      <IssueNotification />
      <div className="mb-4">
        <IssueToolbar />
      </div>

      <IssuesTable issues={issues} sort={sort} status={status} />

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
