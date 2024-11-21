"use client";

import { Bell } from "lucide-react";
import { UserAvatar } from "../user/UserAvatar";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = sessionStorage.getItem("user")?.replace(/"/g, "") || null;
      setUser(value);
    }
  }, []);

  return (
    <div className="max-w-screen-2xl p-4">
      <div className="flex gap-x-2 w-full items-center justify-center">
        <div id="notification" className="relative">
          <div className="size-3 bg-blue-500 rounded-full absolute top-0 right-0" />
          <Bell />
        </div>
        <UserAvatar user={user} />
      </div>
    </div>
  );
};
