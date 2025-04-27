import { deleteComment } from "@/actions/comments";
import { getCurrentUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function CommentList({
  comments,
  slug,
}: {
  comments: any[];
  slug: string;
}) {
  const user = await getCurrentUser();

  const isAdmin = user?.role === "ADMIN";

  if (!comments || comments.length === 0) {
    return <p className="text-sm text-gray-400">No comments yet</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mt-8">Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-4 border rounded-md flex justify-between"
        >
          <div>
            <h3 className="text-sm text-gray-400">{comment.user.name}</h3>
            <p>{comment.content}</p>
          </div>
          {isAdmin || comment.user?.id === user?.id ? (
            <form
              action={async () => {
                "use server";
                await deleteComment(comment.id);
                revalidatePath(`/blog/${slug}`);
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
              >
                <Trash />
              </Button>
            </form>
          ) : null}
        </div>
      ))}
    </div>
  );
}
