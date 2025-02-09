"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading users...</div>;
  }
  if (error) return <div>Error loading users</div>;

  const assignIssue = (value: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: value === "none" ? null : value,
      })
      .catch(() => {
        toast.error("Failed to update assignee");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
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

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data as User[];
    },
    staleTime: 3600 * 1000, // 1 hour,
    retry: 3,
  });


export default AssigneeSelect;
