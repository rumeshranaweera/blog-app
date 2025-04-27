import { getBlogPostBySlug } from "@/actions/blog";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);
  return (
    <div>
      My Post: {slug}
      <pre>{JSON.stringify(post)}</pre>
    </div>
  );
}
