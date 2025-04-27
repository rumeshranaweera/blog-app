import { getSavedBlogs } from "@/actions/blog";
import { getCurrentUser } from "@/actions/user";
import BlogCard from "@/components/core/blogCard";
import prisma from "@/lib/prisma";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function SavedPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Please log in to see your saved blogs.</div>;
  }

  const savedBlogs = await getSavedBlogs(user.id);

  console.log("Saved blogs", savedBlogs);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        <Heart className="inline mb-2" /> Saved Blogs
      </h1>
      {savedBlogs.length === 0 ? (
        <p>You have no saved blogs.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 w-full max-w-4xl mt-8 gap-2">
          {savedBlogs.map((savedBlog) => (
            <li key={savedBlog.id} className="mb-2">
              <BlogCard key={savedBlog.id} blog={savedBlog.post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
