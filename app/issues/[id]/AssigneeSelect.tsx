'use client";';
import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign</Select.Label>
          <Select.Item value="user1">User 1</Select.Item>
          <Select.Item value="user2">User 2</Select.Item>
          <Select.Item value="user3">User 3</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
