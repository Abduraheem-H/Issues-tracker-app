"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Newest First", value: "createdAt_desc" },
  { label: "Oldest First", value: "createdAt_asc" },
  { label: "Title A → Z", value: "title_asc" },
  { label: "Title Z → A", value: "title_desc" },
  { label: "Status Ascending", value: "status_desc" },
  { label: "Status Descending", value: "status_asc" },
] as const;

const IssueSortFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value); // update sort but keep status

    router.push(`/issues/list?${params.toString()}`);
  };

  return (
    <Select.Root
      onValueChange={handleSort}
      defaultValue={searchParams.get("sort") || "createdAt_desc"}
    >
      <Select.Trigger placeholder="Sort Issues..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Sort By</Select.Label>
          {sortOptions.map((opt) => (
            <Select.Item key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueSortFilter;
