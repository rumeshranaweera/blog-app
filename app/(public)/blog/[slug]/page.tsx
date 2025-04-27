import { deleteBlogPost, getBlogPostBySlug } from "@/actions/blog";
import { getCurrentUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader, Trash } from "lucide-react";
import Image from "next/image";
import CreateComment from "./createComment";
import CommentList from "./commentList";
import { Suspense } from "react";
import { LikeSaveSection } from "./likeSaveSection";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  const user = await getCurrentUser();
  const hasAccessToChangeData =
    user?.role === "ADMIN" || user?.id === post?.authorId;

  console.log("Post data:", post);
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold mb-2 uppercase">{post!.title}</h1>
          <div className="flex justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Avatar>
                <AvatarImage
                  src={post!.author.imageUrl}
                  alt={post!.author?.name ?? "Author"}
                />
                <AvatarFallback>
                  {post!.author?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{post?.author?.name ?? "Unknown Author"}</span>
              <span>•</span>
              <span>{new Date(post!.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post?.tags.map((tag) => `#${tag.name}`).join(", ")}</span>
            </div>
            {hasAccessToChangeData && (
              <form
                action={async () => {
                  "use server";
                  await deleteBlogPost(post!.id);
                }}
              >
                <Button
                  variant={"ghost"}
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash />
                </Button>
              </form>
            )}
          </div>
        </CardHeader>
        {post?.imageUrl && (
          <div className="w-full h-64 object-cover rounded-md mb-4 relative">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <CardContent>
          <div className="prose prose-neutral max-w-none">
            {post?.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-muted-foreground">No content available.</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Last updated:{" "}
            {new Date(post!.updatedAt).toLocaleDateString() || "N/A"}
          </span>
          <Suspense
            fallback={
              <div className="animate-spin">
                <Loader />
              </div>
            }
          >
            <LikeSaveSection postId={post!.id} slug={slug} />
          </Suspense>
        </CardFooter>
      </Card>
      {/* Comments Section */}
      {user && <CreateComment slug={slug} />}

      {/* comment list */}
      <CommentList comments={post!.comments} slug={slug} />
    </div>
  );
}
