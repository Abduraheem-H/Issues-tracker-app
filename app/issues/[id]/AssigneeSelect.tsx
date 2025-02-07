"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data as User[];
    },
    staleTime: 60 * 1000, // 1 minute,
    retry: 3,
  });
  if (isLoading) {
    return <div>Loading users...</div>;
  }
  if (error) return <div>Error loading users</div>;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Select Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign</Select.Label>

          {users?.map((u) => (
            <Select.Item key={u.id} value={u.id}>
              {u.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
