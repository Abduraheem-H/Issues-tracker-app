"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
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
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(value) => {
          axios
            .patch(`/api/issues/${issue.id}`, {
              assignedToUserId: value === "none" ? null : value,
            })
            .catch(() => {
              toast.error("Failed to update assignee");
            });
        }}
      >
        <Select.Trigger placeholder="Select Assignee" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assign</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>

            {users?.map((u) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
