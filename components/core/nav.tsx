import { getCurrentUser } from "@/actions/user";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "@/auth";
import { Heart, LayoutDashboard, LogOut, Rss } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "./modeToggle";

export default async function Nav() {
  const user = await getCurrentUser();
  console.log("user", user);
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold">
        My App
      </Link>
      <ul className="flex space-x-4">
        <li>
          <ModeToggle />
        </li>
        <li>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-lg cursor-pointer">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.role === "ADMIN" && (
                  <DropdownMenuItem>
                    <LayoutDashboard />
                    <Link href="/admin">Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Heart />
                  <Link href="/blog/saved">Saved Blogs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Rss />
                  <Link href="/blog/create">Create Blog</Link>
                </DropdownMenuItem>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button type="submit" className="w-full">
                    <DropdownMenuItem>
                      <LogOut />
                      Logout
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex">
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/api/auth/signin"
              >
                Sign Up
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
