import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import Logout from "../ui/logout-button";
import { verifyToken } from "@/lib/token";
import { cookies } from "next/headers";
export function ProfileDropDown() {
  const token = cookies().get("l-t-k")?.value;
  if (!token) {
    return null;
  }
  const user = verifyToken(token);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
            {user.username.charAt(1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <h2 className="text-xl font-semibold text-gray-700">
          Hi, {user.username}
        </h2>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-2">
          <Link className="hover:bg-gray-100" href="/profile">
            Profile
          </Link>
          <Link className="hover:bg-gray-100" href="/profile">
            My links
          </Link>
          <DropdownMenuSeparator />
          <Logout />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
