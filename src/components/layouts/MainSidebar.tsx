"use client";

import {
  ChartNoAxesCombined,
  GraduationCap,
  LogOut,
  StickyNote,
  UserRoundPen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Attendance",
    url: "#",
    icon: StickyNote,
  },
  {
    title: "Absent Application",
    url: "/absent",
    icon: UserRoundPen,
  },
  {
    title: "Student",
    url: "/student",
    icon: GraduationCap,
  },
  {
    title: "Logout",
    url: "/login",
    icon: LogOut,
  },
];

export const MainSidebar = () => {
  const router = useRouter();

  const handleLogout = (label: string) => {
    if (label === "Logout") {
      Cookies.remove("user");
      sessionStorage.removeItem("user");
      router.refresh();

      toast.success("Logged Out");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold text-[#002971] text-center">
        Attendify
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      onClick={() => handleLogout(item.title)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
