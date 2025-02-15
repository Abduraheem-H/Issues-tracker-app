import Pagination from "./issues/_components/Pagination";

export default function Home() {
  return (
    <main>
      <Pagination itemsCount={100} pageSize={10} currentPage={5} />
    </main>
  );
}
