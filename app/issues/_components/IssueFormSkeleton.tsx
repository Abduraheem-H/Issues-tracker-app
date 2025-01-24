import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
// @ts-expect-error Skeleton CSS import
import "react-loading-skeleton/dist/skeleton.css";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl p-8 space-y-6">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
