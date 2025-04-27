"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

//get users with pagination
export const getUsers = async (page: number, limit: number) => {
  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit || 10,
  });
  const total = await prisma.user.count();
  return { users, total };
};
