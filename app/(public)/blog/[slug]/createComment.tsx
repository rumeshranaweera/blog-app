import { getBlogPostBySlug } from "@/actions/blog";
import { createComment } from "@/actions/comments";
import { sendEmail } from "@/actions/email";
import { getCurrentUser } from "@/actions/user";
import { Button } from "@/components/ui/button";

export default async function CreateCommentComponent({
  slug,
}: {
  slug: string;
}) {
  const post = await getBlogPostBySlug(slug);

  const user = await getCurrentUser();
  // console.log("user", user);
  // console.log("posts", post);
  return (
    <div className="my-2">
      <h2 className="text-xl font-bold mt-8">Your Comment</h2>
      <form
        className="mt-4"
        action={async (e) => {
          "use server";
          const content = e.get("comment")?.toString();
          await sendEmail(
            post!.author!.email || process.env.EMAIL!,
            "New Comment - Blog App",
            `${user.name} commented ''${content}'' on your blog post ${post!.title}.`
          );
          if (!user || !user.id || !content) {
            console.log(user, content);
            return;
          }
          const commentRes = await createComment({
            content,
            postId: post!.id,
            userId: user?.id,
            slug: post!.slug,
          });
        }}
      >
        <textarea
          className="w-full h-24 p-2 border rounded-md"
          placeholder="Write a comment..."
          name="comment"
        ></textarea>
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
}
