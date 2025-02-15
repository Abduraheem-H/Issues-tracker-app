"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemsCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex justify="center" mt="4">
      <Text size="2" mr="4">
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage <= 1}
        aria-label="Go to first page"
        onClick={() => handlePageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage >= pageCount}
        aria-label="Go to next page"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage >= pageCount}
        aria-label="Go to last page"
        onClick={() => handlePageChange(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
