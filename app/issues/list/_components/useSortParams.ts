export function parseSortParam(sort: string | undefined) {
  const defaultSort = "createdAt_desc";

  const value = sort || defaultSort;
  const [field, direction] = value.split("_");

  return {
    field,
    direction,
    isAscending: direction === "asc",
  };
}
