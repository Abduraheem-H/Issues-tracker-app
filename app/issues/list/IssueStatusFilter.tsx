"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
] as const;

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (status: string) => {
    console.log("Selected status:", status);
    const params = new URLSearchParams(searchParams.toString());

    if (status === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    console.log("Updated search params:", params.toString());

    router.push(`/issues/list?${params.toString()}`);
  };

  return (
    <Select.Root
      onValueChange={handleChange}
      defaultValue={searchParams.get("status") || "ALL"}
    >
      <Select.Trigger placeholder="Select Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((s) => (
            <Select.Item key={s.value} value={s.value}>
              {s.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
