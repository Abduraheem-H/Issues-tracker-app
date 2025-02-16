export function buildSortUrl(
  field: string,
  currentSortField: string,
  isAscending: boolean,
  status: string | undefined
) {
  const params = new URLSearchParams();

  if (status && status !== "ALL") {
    params.set("status", status);
  }

  if (currentSortField === field) {
    params.set("sort", `${field}_${isAscending ? "desc" : "asc"}`);
  } else {
    const defaultDirection = field === "status" ? "asc" : "desc";
    params.set("sort", `${field}_${defaultDirection}`);
  }

  params.set("page", "1");

  return `/issues/list?${params.toString()}`;
}
