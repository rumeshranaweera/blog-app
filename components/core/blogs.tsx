import { getBlogPosts } from "@/actions/blog";

export default async function Blogs() {
  const blogs = await getBlogPosts(1);
  console.log("blogs", blogs);
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Blogs</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 w-full max-w-2xl mt-8 gap-2">
        {blogs.posts.map((blog) => (
          <div
            key={blog.id}
            className="w-full p-4 mb-4 border rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
