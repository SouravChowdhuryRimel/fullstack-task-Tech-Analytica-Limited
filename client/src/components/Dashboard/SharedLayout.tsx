"use client";

import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { cn } from "@/lib/utils";

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout = ({ children }: SharedLayoutProps) => {
  const user = useAppSelector(useCurrentUser);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (!user) return <>{children}</>;

  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block lg:w-64 flex-shrink-0">
        <Sidebar role={user.role as "ADMIN" | "USER"} />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-[#3c72b5] transition-transform duration-300 ease-in-out lg:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar role={user.role as "ADMIN" | "USER"} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for all screens */}
        <header className="flex items-center justify-between h-16 px-8 bg-white border-b border-gray-100 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="hidden lg:block text-lg font-bold text-[#2D3748]">
              {user.role === "ADMIN" ? "Admin Panel" : "User Portal"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="hidden sm:inline font-bold text-sm text-[#2D3748]">
                {user.name}
              </span>
              <span className="hidden sm:inline text-[10px] text-gray-500 uppercase tracking-tighter">
                {user.role}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden">
              <Image
                src={
                  user.image ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default SharedLayout;
