import { getTags } from "@/actions/tag";
import Blogs from "@/components/core/blogs";
import Filters from "./filters";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  console.log("query", query);
  const tags = await getTags();
  return (
    <div className="flex flex-col">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <Filters tags={tags} />
      </div>
      <Blogs filterTag={query} />
    </div>
  );
}
