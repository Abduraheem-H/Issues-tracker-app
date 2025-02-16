import prisma from "@/prisma/client";
import { IssueStatus } from "@prisma/client";

interface FetchIssuesParams {
  status: IssueStatus | "ALL";
  orderBy: Record<string, "asc" | "desc">;
  skip: number;
  take: number;
}

export async function fetchIssues({
  status,
  orderBy,
  skip,
  take,
}: FetchIssuesParams) {
  return prisma.issue.findMany({
    where: status !== "ALL" ? { status } : {},
    orderBy,
    skip,
    take,
  });
}

export async function countIssues(status: IssueStatus | "ALL") {
  return prisma.issue.count({
    where: status !== "ALL" ? { status } : {},
  });
}
