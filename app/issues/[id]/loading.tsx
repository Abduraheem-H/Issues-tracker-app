import { Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailLoading = () => {
  return (
    <div>
      <Skeleton height={32} width={300} className="mb-8" />
      <Flex direction="row" align="center" gap="2" className="mb-4 mt-4">
        <Skeleton width={60} />
        <Skeleton width={80} />
        <Skeleton width={70} />
        <Skeleton width={50} />
      </Flex>
      <Card className="mt-4 prose">
        <Skeleton count={5} />
      </Card>
    </div>
  );
};

export default IssueDetailLoading;
