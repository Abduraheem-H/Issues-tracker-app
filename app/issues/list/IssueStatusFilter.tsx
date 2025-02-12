"use client";

import { Select } from "@radix-ui/themes";
import { IssueStatus } from "@prisma/client";

const statuses = [
  { label: "All", value: "ALL" }, // <-- special non-empty value
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
] as const;

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>

          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
