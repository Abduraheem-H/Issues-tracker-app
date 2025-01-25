"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
const DeleteIssueButton = () => {
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
            <Button color="red">Yes, Delete</Button>
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
