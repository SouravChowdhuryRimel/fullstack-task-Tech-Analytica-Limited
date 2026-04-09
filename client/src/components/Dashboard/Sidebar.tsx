"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  History,
  Users,
  UserCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { logOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { baseApi } from "@/redux/hooks/baseApi";

interface SidebarProps {
  role: "ADMIN" | "USER";
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(baseApi.util.resetApiState());
    router.push("/login");
  };

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: History },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Profile", href: "/admin/admin-profile", icon: UserCircle },
  ];

  const userLinks = [
    { name: "My Tasks", href: "/user/dashboard", icon: ClipboardList },
    { name: "Profile", href: "/user/profile", icon: UserCircle },
  ];

  const links = role === "ADMIN" ? adminLinks : userLinks;
  const bgColor = role === "ADMIN" ? "bg-[#1E3A8A]" : "bg-[#3174CD]";
  const activeColor = role === "ADMIN" ? "bg-[#152e72]" : "bg-[#2A62DF]";

  return (
    <div
      className={cn(
        "w-full text-white h-full flex flex-col pt-0 transition-colors duration-300",
        bgColor,
      )}
    >
      <div className="px-6 py-8 border-b border-white/10">
        <h1 className="text-xl font-extrabold tracking-tight uppercase">
          TASK MGMT
        </h1>
        <p className="text-[10px] text-white/50 mt-1 uppercase tracking-widest">
          {role} PANEL
        </p>
      </div>
      <nav className="flex-1 px-3 py-6">
        <div className="space-y-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center px-4 py-3 text-[14px] font-medium transition-all duration-200 rounded-lg group",
                  isActive
                    ? cn(
                        activeColor,
                        "shadow-sm border-l-4 border-white rounded-l-none",
                      )
                    : "hover:bg-white/10",
                )}
              >
                <link.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-transform",
                    isActive ? "scale-110" : "group-hover:translate-x-1",
                  )}
                />
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-[14px] font-bold text-white bg-red-600/20 hover:bg-red-600 border border-red-600/30 rounded-lg transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
