"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { SiSimpleanalytics } from "react-icons/si";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import logo from "../../../assets/icon/logo1.png";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AdminNavBar from "./AdminNavBar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
  {
    title: "Course Management",
    href: "/admin/course-management",
    icon: FaRegUser,
  },
  {
    title: "Venue Management",
    href: "/admin/user-management",
    icon: PiBuildingApartmentFill,
  },
  {
    title: "All Payment",
    href: "/admin/all-payment",
    icon: SlCalender,
  },
  {
    title: "Reports & Analytics",
    href: "/admin/report-analysis",
    icon: SiSimpleanalytics,
  },

  {
    title: "Platform Settings",
    href: "/admin/platform-settings",
    icon: IoSettingsOutline,
  },
];

const AdminSideBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F4]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside
          className={cn(
            "transition-all duration-300 h-screen flex flex-col bg-white dark:bg-gray-900 shadow-md p-4",
            collapsed ? "w-[300px]" : "w-302"
          )}
        >
          <div className="flex items-center justify-between mb-6 mt-16">
            <div className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt="Logo"
                width={42}
                height={42}
                className="min-w-[42px]"
              />
              {!collapsed && (
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#003366] to-[#518BEC] text-transparent bg-clip-text font-['Sansita_Swashed']">
                  Chayon
                </h1>
              )}
            </div>
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="text-xl text-gray-500"
            >
              {collapsed ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
            </button>
          </div>

          {!collapsed && (
            <div className="text-[var(--color-textThree)] mb-2">Menu</div>
          )}
          <nav className="flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded transition mb-1",
                  pathname === item.href
                    ? "bg-[var(--color-accent)] text-white dark:bg-red-500"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Button
              variant="destructive"
              className={cn(
                "w-full justify-start gap-3 text-black",
                collapsed
                  ? "bg-white hover:bg-gray-100 px-2 py-2"
                  : "bg-white hover:bg-gray-100"
              )}
              onClick={() => alert("Logout function here")}
            >
              <TbLogout className="h-5 w-5 text-red-600" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </aside>

        <main className="h-full flex-1 overflow bg-base-200 mt-10 md:mt-0">
          <div className="hidden lg:block w-full">
            <AdminNavBar />
          </div>

          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminSideBar;
