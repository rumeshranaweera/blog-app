import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Pen } from "lucide-react";

export default function BlogCard({
  blog,
}: {
  blog: {
    id: string;
    title: string;
    slug: string;
    imageUrl: string | null;
    authorId: string;
    author: {
      id: string;
      name: string | null;
      email: string | null;
    };
  };
}) {
  return (
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
              fetchPriority="low"
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
  );
}
