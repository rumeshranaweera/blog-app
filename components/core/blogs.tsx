import { getBlogPosts } from "@/actions/blog";
import BlogCard from "./blogCard";

export default async function Blogs({ filterTag }: { filterTag: string }) {
  const blogs = await getBlogPosts(1, 10, filterTag);
  console.log("blogs", blogs);
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <div className="grid grid-cols-2 md:grid-cols-3 w-full container mt-8 gap-2">
        {blogs.posts.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
