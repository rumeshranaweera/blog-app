"use server";

import prisma from "@/lib/prisma";

export const getBlogPosts = async (page: number, limit: number = 10) => {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit || 10,
    select: {
      id: true,
      title: true,
      slug: true,
      authorId: true,
      imageUrl: true,
    },
  });
  const total = await prisma.post.count();
  return { posts, total };
};
export const getBlogPostBySlug = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  return post;
};

export const createBlogPost = async (data: {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  authorId: string;
}) => {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      slug: data.slug,
      authorId: data.authorId,
      imageUrl: data.imageUrl,
    },
  });
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
