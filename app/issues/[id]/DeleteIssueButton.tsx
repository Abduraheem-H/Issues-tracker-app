"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete the issue:", error);
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>
          Are you sure you want to delete this issue?
        </AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone.
        </AlertDialog.Description>
        <Flex justify="center" gap="2" className="mt-4">
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button>Cancel</Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
