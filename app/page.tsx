import Pagination from "./issues/_components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  return (
    <main>
      <Pagination
        itemsCount={100}
        pageSize={10}
        currentPage={searchParams?.page ? parseInt(searchParams.page) : 1}
      />
    </main>
  );
}
