"use server";
import prisma from "@/lib/prisma";

export async function getTags() {
  const res = await prisma.tag.findMany({
    include: {
      posts: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
  return res;
}
