"use client";

import { getCurrentUser, getUsers, updateUserRole } from "@/actions/user";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchData() {
      const { users } = await getUsers(1, 10);
      setUsers(users);
      const initialRoles = users.reduce((acc: any, user: any) => {
        acc[user.id] = user.role;
        return acc;
      }, {});
      setRoles(initialRoles);
    }
    fetchData();
  }, []);

  const handleRoleChange = (userId: string, role: string) => {
    setRoles((prev) => ({ ...prev, [userId]: role }));
  };

  const handleSave = async (userId: string) => {
    await updateUserRole(userId, roles[userId]);
    // Optionally show toast or re-fetch data
  };

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen py-2">
      <h1 className="font-bold text-3xl mb-6">Admin Page</h1>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center border p-4 mb-4 w-full max-w-md rounded-lg shadow-sm"
        >
          <h2 className="text-2xl">{user.name}</h2>
          <p className="text-lg mb-2">{user.email}</p>
          <div className="w-full">
            <Select
              value={roles[user.id]}
              onValueChange={(val) => handleRoleChange(user.id, val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="READER">Reader</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleSave(user.id)} className="mt-2 w-full">
              Save Role
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
