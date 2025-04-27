"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createComment = async (comment: {
  postId: string;
  userId: string;
  content: string;
  slug: string;
}) => {
  const { postId, userId, content, slug } = comment;
  const newComment = await prisma.comment.create({
    data: {
      postId,
      userId,
      content,
    },
  });
  revalidatePath(`/blog/${slug}`);
  return newComment;
};

export const getComments = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
  return comments;
};

export const deleteComment = async (id: string) => {
  const comment = await prisma.comment.delete({
    where: {
      id,
    },
  });

  return comment;
};
