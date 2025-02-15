"use client";

import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SortableHeaderProps {
  field: string;
  label: string;
  className?: string;
}

const SortableHeader = ({
  field,
  label,
  className = "",
}: SortableHeaderProps) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "createdAt_desc";
  const [sortField, sortDirection] = sort.split("_");
  const isAsc = sortDirection === "asc";

  const getSortUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (sortField === field) {
      params.set("sort", `${field}_${isAsc ? "desc" : "asc"}`);
    } else {
      const defaultDirection = field === "status" ? "asc" : "desc";
      params.set("sort", `${field}_${defaultDirection}`);
    }

    return `/issues/list?${params.toString()}`;
  };

  const renderSortIcon = () => {
    if (sortField !== field) return null;

    return isAsc ? (
      <ChevronUpIcon className="inline ml-1" />
    ) : (
      <ChevronDownIcon className="inline ml-1" />
    );
  };

  return (
    <th className={`cursor-pointer hover:bg-gray-50 ${className}`}>
      <Link
        href={getSortUrl()}
        className="flex items-center hover:text-blue-600 transition-colors px-4 py-3"
      >
        {label}
        {renderSortIcon()}
      </Link>
    </th>
  );
};

export default SortableHeader;
