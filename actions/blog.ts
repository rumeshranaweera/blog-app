"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getBlogPosts = async (
  page: number,
  limit: number = 10,
  tag: string
) => {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        ...(tag !== "ALL" && {
          // Only apply tag filter if not "ALL"
          some: {
            name: tag,
          },
        }),
      },
    },
    skip: (page - 1) * limit,
    take: limit || 10,
    select: {
      id: true,
      title: true,
      slug: true,
      authorId: true,
      imageUrl: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  const total = await prisma.post.count();
  return { posts, total };
};

export const getBlogPostBySlug = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return post;
};

export const createBlogPost = async (data: {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  authorId: string;
  tags?: string[];
}) => {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      slug: data.slug,
      authorId: data.authorId,
      imageUrl: data.imageUrl,
      tags: {
        connectOrCreate: data.tags?.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return post;
};

export const updateBlogPost = async (data: {
  id: string;
  title: string;
  content: string;
  slug: string;
  authorId: string;
}) => {
  const post = await prisma.post.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content,
      slug: data.slug,
      authorId: data.authorId,
    },
  });
  return post;
};

export const deleteBlogPost = async (id: string) => {
  await prisma.post.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
};

// blog likes

export const getBlogPostLikes = async (postId: string) => {
  const likes = await prisma.like.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return likes;
};
export const getBlogPostLikeCount = async (postId: string) => {
  const count = await prisma.like.count({
    where: {
      postId,
    },
  });
  return count;
};
export const getUserLike = async (postId: string, userId: string) => {
  const like = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });
  return like;
};

export const CreateLikeBlogPost = async (
  id: string,
  userId: string,
  slug?: string
) => {
  const like = await prisma.like.create({
    data: {
      postId: id,
      userId,
    },
  });
  revalidatePath(`/blog/${slug}`);
  return like;
};

export const unlikeBlogPost = async (id: string) => {
  console.log("unlikeBlogPost", id);
  const like = await prisma.like.delete({
    where: {
      id,
    },
  });
  console.log("unlikeBlogPost", like);
  return like;
};

// save blogs

export const getSavedBlogs = async (userId: string) => {
  const savedBlogs = await prisma.savedPost.findMany({
    where: {
      userId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
          authorId: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return savedBlogs;
};

export const saveBlogPost = async (postId: string, userId: string) => {
  const savedPost = await prisma.savedPost.create({
    data: {
      postId,
      userId,
    },
  });
  return savedPost;
};
export const unsaveBlogPost = async (id: string) => {
  const savedPost = await prisma.savedPost.delete({
    where: {
      id,
    },
  });
  return savedPost;
};
export const getSavedBlogPost = async (postId: string, userId: string) => {
  const savedPost = await prisma.savedPost.findFirst({
    where: {
      postId,
      userId,
    },
  });
  return savedPost;
};
