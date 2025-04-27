import { getBlogPosts } from "@/actions/blog";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Pen } from "lucide-react";
import Link from "next/link";

export default async function Blogs() {
  const blogs = await getBlogPosts(1);
  console.log("blogs", blogs);
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Blogs</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 w-full max-w-4xl mt-8 gap-2">
        {blogs.posts.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog.id}>
            <Card key={blog.id} className="h-96">
              <CardContent className="w-full h-full">
                <div className="w-full  relative h-1/2">
                  <Image
                    src={
                      blog.imageUrl ||
                      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    }
                    alt={blog.title}
                    fill
                    quality={60}
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2
                  className="text-2xl font-semibold line-clamp-4"
                  title={blog.title}
                >
                  {blog.title}
                </h2>
              </CardContent>
              <CardFooter>
                <div>
                  <Pen />
                </div>
                <p className="ml-1 font-bold mt-1">{blog.author.name}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
