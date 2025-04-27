"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@/src/app/generated/prisma";

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

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};

export async function updateUserRole(userId: string, role: any) {
  return await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
}
