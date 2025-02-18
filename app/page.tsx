import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";

const HomePage = async () => {
  const openCount = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closedCount = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <div>
      <IssueSummary
        open={openCount}
        inProgress={inProgressCount}
        closed={closedCount}
      />
    </div>
  );
};

export default HomePage;
