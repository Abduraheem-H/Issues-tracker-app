"use client";
import Spinner from "@/app/components/Spinner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);



  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list?deleted=true");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      console.error("Failed to delete the issue:", error);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
            {isDeleting ? <Spinner /> : null}
          </Button>
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
      <AlertDialog.Root open={error} onOpenChange={setError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error Deleting Issue</AlertDialog.Title>
          <AlertDialog.Description>
            There was an error deleting the issue. Please try again.
          </AlertDialog.Description>
          <Flex justify="center" className="mt-4">
            <AlertDialog.Cancel>
              <Button
                onClick={() => setError(false)}
                color="gray"
                variant="soft"
              >
                Close
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
