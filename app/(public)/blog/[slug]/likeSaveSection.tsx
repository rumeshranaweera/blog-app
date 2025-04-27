import {
  CreateLikeBlogPost,
  getBlogPostLikeCount,
  getBlogPostLikes,
  getSavedBlogs,
  saveBlogPost,
  unlikeBlogPost,
} from "@/actions/blog";
import { getCurrentUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ThumbsUp } from "lucide-react";
import { revalidatePath } from "next/cache";

export async function LikeSaveSection({
  postId,
  slug,
}: {
  postId: string;
  slug: string;
}) {
  const likesCount = await getBlogPostLikeCount(postId);
  const user = await getCurrentUser();

  const likes = await getBlogPostLikes(postId);
  const userSaveBlogPost = await getSavedBlogs(user.id);

  const hasUserLiked = likes.find((like) => like.userId === user?.id);
  console.log("Likes data:", likes);
  console.log("Save data:", userSaveBlogPost);

  //await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate loading delay
  return (
    <div className="flex items-center gap-2">
      <form
        action={async () => {
          "use server";
          if (hasUserLiked) {
            await unlikeBlogPost(hasUserLiked.id);
            revalidatePath(`/blog/${slug}`);
          }
          await CreateLikeBlogPost(postId, user.id, slug);
        }}
      >
        <Button
          variant="outline"
          size="sm"
          className={cn("text-blue-500", hasUserLiked && "bg-blue-200")}
          title="Like"
        >
          <span className="mr-1">{likesCount}</span>
          <ThumbsUp />
        </Button>
      </form>
      <form
        action={async () => {
          "use server";
          await saveBlogPost(postId, user.id);
          revalidatePath(`/blog/${slug}`);
        }}
      >
        <Button
          variant="outline"
          type="submit"
          size="sm"
          className={cn(
            "text-rose-500",
            !!userSaveBlogPost.length && "bg-rose-200"
          )}
          title="Save for Later"
        >
          <Heart />
        </Button>
      </form>
    </div>
  );
}
