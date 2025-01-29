// app/issues/list/IssueNotification.tsx
"use client";

import { Callout } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IssueNotification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDeleted = searchParams.get("deleted") === "true";

  const [showNotification, setShowNotification] = useState(initialDeleted);

  useEffect(() => {
    if (initialDeleted) {
      const timer = setTimeout(() => {
        setShowNotification(false);
        const url = new URL(window.location.href);
        url.searchParams.delete("deleted");
        router.replace(url.pathname, { scroll: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [initialDeleted, router]);

  if (showNotification) {
    return (
      <Callout.Root color="green" variant="soft" className="mb-4">
        <Callout.Text>Issue deleted successfully.</Callout.Text>
      </Callout.Root>
    );
  }

  return null;
};

export default IssueNotification;
