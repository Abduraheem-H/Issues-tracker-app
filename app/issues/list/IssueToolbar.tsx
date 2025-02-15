import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueToolbar = () => {
  return (
    <Flex mb="5" justify="between" align="center">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueToolbar;
