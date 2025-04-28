"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RichEditor from "@/components/core/editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createBlogPost } from "@/actions/blog";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { getTags } from "@/actions/tag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word characters
    .replace(/\s+/g, "-"); // replace spaces with -

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tags = await getTags();
      setTags(tags);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSlug(slugify(name));
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <article className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold capitalize">
              Create Blog
            </CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async () => {
                setLoading(true);
                try {
                  const res = await createBlogPost({
                    title: name,
                    slug,
                    content,
                    imageUrl,
                    authorId: session?.user?.id,
                    tags: [tag],
                  });
                  router.replace(`/blog/${res.slug}`);
                  console.log("Blog post created:", res);
                } catch (error) {
                  console.error("Error creating blog post:", error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name of your project"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="slug"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tag">Tag</Label>

                  <select
                    className="w-full text-white p-2"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {tags.map((tag) => (
                      <option
                        key={tag.id}
                        value={tag.name}
                        className="text-black"
                      >
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="slug">Banner Image</Label>
                  {imageUrl && (
                    <div className="relative">
                      <Button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1"
                        onClick={() => setImageUrl("")}
                      >
                        X
                      </Button>
                      <CldImage
                        src={imageUrl}
                        alt="Uploaded Image"
                        width={500}
                        height={300}
                        className="rounded-lg w-full h-36 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {!imageUrl && (
                    <CldUploadWidget
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      onSuccess={(result) => {
                        const info = result?.info;
                        if (
                          typeof info === "object" &&
                          info !== null &&
                          "secure_url" in info
                        ) {
                          setImageUrl(
                            (info as { secure_url: string }).secure_url
                          );
                        } else {
                          console.warn(
                            "Cloudinary upload did not return expected info object:",
                            info
                          );
                        }
                      }}
                      options={
                        {
                          // singleUploadAutoClose: true,
                        }
                      }
                    >
                      {({ open }) => {
                        function handleOnClick() {
                          open();
                        }
                        return (
                          <div className="min-h-36 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4">
                            <button type="button" onClick={handleOnClick}>
                              Upload an Image
                            </button>
                          </div>
                        );
                      }}
                    </CldUploadWidget>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="content">Content</Label>
                  <RichEditor onChange={(value: string) => setContent(value)} />
                </div>
                <Button
                  type="submit"
                  disabled={!name || !slug || !content || loading}
                >
                  {loading ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
