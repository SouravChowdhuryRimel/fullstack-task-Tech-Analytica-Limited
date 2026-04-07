"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MdDashboard, MdOutlinePayments } from "react-icons/md";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import profile from "../../../assets/images/profile.png";
import { cn } from "@/lib/utils";
import AdminNavBar from "@/components/AdminPage/Shared/AdminNavBar";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { logOut } from "@/redux/features/auth/authSlice";
import cookies from "js-cookie";
import { toast } from "sonner";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
  { title: "All Payment", href: "/admin/all-payment", icon: MdOutlinePayments },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setIsMobile] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logoutApi] = useLogoutMutation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    cookies.remove("token");
    dispatch(logOut());
    toast.success("Admin logged out successfully!");
    router.push("/");
  };

  const hideNavBar =
    pathname === "/admin/active-user-details" ||
    pathname === "/admin/user-payment" ||
    pathname === "/admin/memnoy-refund/" ||
    pathname.startsWith("/admin/all-payment/") ||
    pathname.startsWith("/admin/memnoy-refund") ||
    pathname.startsWith("/admin/user-management/");

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f4] font-Robot">
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* 🟧 Sidebar (Desktop) */}
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 80 : 296 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-20 bg-[#f47b03] shadow-md p-4"
        >
          <div className="flex items-center justify-between h-[48px]">
            {!collapsed && (
              <h1 className="text-[26px] font-bold text-white font-DM-sans">
                Cahyon
              </h1>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="bg-white/20 hover:bg-white/30 text-white text-3xl p-1 rounded-full transition"
            >
              {collapsed ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
            </button>
          </div>

          <hr className="border-t border-[#f8a24a] mb-4 mt-2" />

          <nav className="flex-grow space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-medium text-white",
                    isActive
                      ? "bg-[#b85c02] shadow-inner"
                      : "hover:bg-[#d46b02]"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0 text-white" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white font-medium"
            >
              <TbLogout className="h-5 w-5 text-red-300" />
              {!collapsed && <span>Log Out</span>}
            </button>
          </div>
        </motion.aside>

        {/* 🟧 Mobile Top Bar */}
        <header className="md:hidden sticky top-0 z-20 bg-[#f47b03] shadow-sm flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 rounded-md hover:bg-[#d46b02] text-white"
            >
              <HiOutlineMenuAlt2 className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">Cahyon</h1>
          </div>

          <button className="p-1">
            <Image
              src={profile}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full border-2 border-white"
            />
          </button>
        </header>

        {/* 🟧 Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-40 w-72 bg-[#f47b03] shadow-xl overflow-y-auto"
              >
                <div className="flex flex-col h-full p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white font-DM-sans">
                      Cahyon
                    </h1>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1 rounded-full hover:bg-[#d46b02] text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-[#f8a24a]">
                    <Image
                      src={profile}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white"
                    />
                    <div>
                      <p className="font-medium text-white">Admin Panel</p>
                      <p className="text-sm text-white/70">Administrator</p>
                    </div>
                  </div>

                  <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-white font-medium",
                          pathname.startsWith(item.href)
                            ? "bg-[#b85c02]"
                            : "hover:bg-[#d46b02]"
                        )}
                      >
                        <item.icon className="h-5 w-5 text-white" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-3 mt-4 rounded-lg bg-red-700 hover:bg-red-800 text-white font-medium"
                  >
                    <TbLogout className="h-5 w-5 text-red-300" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* 🟧 Main Content */}
        <main
          className={cn(
            "flex-1 bg-[#f4f4f4] overflow-y-auto transition-all duration-300",
            collapsed ? "md:ml-[80px]" : "md:ml-[296px]"
          )}
        >
          {!hideNavBar && (
            <div className="hidden md:block sticky top-0 z-10">
              <AdminNavBar />
            </div>
          )}
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { BsSubstack } from "react-icons/bs";

// import { MdDashboard, MdOutlinePayments, MdContactMail } from "react-icons/md";
// import { FaExchangeAlt } from "react-icons/fa";
// import { CiMedicalClipboard } from "react-icons/ci";

// import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
// import { TbLogout } from "react-icons/tb";
// import { HiOutlineMenuAlt2 } from "react-icons/hi";
// import { LuBadgePlus } from "react-icons/lu";

// import profile from "../../../assets/images/profile.png";

// import { cn } from "@/lib/utils";
// import AdminNavBar from "@/components/AdminPage/Shared/AdminNavBar";
// import { useAppDispatch } from "@/redux/hooks/redux-hook";
// import { logOut } from "@/redux/features/auth/authSlice";
// import cookies from "js-cookie";
// import { toast } from "sonner";
// import { FaTableCellsRowUnlock } from "react-icons/fa6";
// import { useLogoutMutation } from "@/redux/features/auth/authApi";

// interface NavItem {
//   title: string;
//   href: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// const navItems: NavItem[] = [
//   { title: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
//   {
//     title: "All Payment",
//     href: "/admin/all-payment",
//     icon: MdOutlinePayments,
//   },
//   {
//     title: "Home Exchange",
//     href: "/admin/home-exchange",
//     icon: FaExchangeAlt,
//   },
//   {
//     title: "Subscription Plans",
//     href: "/admin/subscription-plan",
//     icon: FaTableCellsRowUnlock,
//   },
//   {
//     title: "Contact Messages",
//     href: "/admin/contact-messages",
//     icon: MdContactMail,
//   },
//   {
//     title: "Amenities",
//     href: "/admin/onboarding-exchange",
//     icon: CiMedicalClipboard,
//   },
//   {
//     title: "Add Badges",
//     href: "/admin/badge",
//     icon: LuBadgePlus,
//   },
//   {
//     title: "Subscribe",
//     href: "/admin/subscribe",
//     icon: BsSubstack,
//   },
// ];

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [, setIsMobile] = useState(false);

//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [logoutApi] = useLogoutMutation();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // const handleLogout = () => {
//   //   cookies.remove("token");
//   //   dispatch(logOut());
//   //   toast.success("Admin Logged out successfully!");
//   //   router.push("/");
//   // };

//   const handleLogout = async () => {
//     try {
//       await logoutApi().unwrap(); // Call API logout
//       cookies.remove("token"); // Remove cookie
//       localStorage.removeItem("token"); // Optional: remove local storage token
//       dispatch(logOut()); // Update redux state
//       toast.success("Admin logged out successfully!");
//       router.push("/"); // Redirect to home
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to log out");
//     }
//   };

//   const hideNavBar =
//     pathname === "/admin/active-user-details" ||
//     pathname === "/admin/user-payment" ||
//     pathname === "/admin/memnoy-refund/" ||
//     pathname.startsWith("/admin/all-payment/") ||
//     pathname.startsWith("/admin/memnoy-refund") ||
//     pathname.startsWith("/admin/user-management/");

//   return (
//     <div className="flex flex-col min-h-screen bg-[#F4F4F4] font-Robot">
//       <div className="flex flex-col md:flex-row h-screen overflow-hidden">
//         {/* Sidebar for Desktop */}
//         <motion.aside
//           initial={false}
//           animate={{ width: collapsed ? 80 : 296 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//           className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-20 bg-[#3174CD] dark:bg-[#045dd1] shadow-md p-4"
//         >
//           <div className="flex items-center justify-between  h-[48px]">
//             <div className="flex items-center gap-2">
//               {/* <div className="w-[52px] h-[56px] mt-9">
//                 <Image src={logo} alt="Logo" width={62} height={62} />
//               </div> */}

//               {!collapsed && (
//                 <h1 className="text-[28px] font-bold leading-normal font-DM-sans bg-gradient-to-b from-[#408DF0] to-[#0E579E] text-transparent bg-clip-text">
//                   <span className="text-[#FEE985] font-DM-sans">Vacanza</span>{" "}
//                 </h1>
//               )}
//             </div>

//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="bg-[#2A62DF] text-3xl text-white hover:bg-[#2A62DF]  p-1 rounded-full transition-colors cursor-pointer"
//               aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//             >
//               {collapsed ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
//             </button>
//           </div>
//           <hr className="border-t border-[#8e96a1] mb-4 mt-1.5" />

//           <nav className="flex-grow space-y-2">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   "group flex items-center gap-4 px-[14px] py-3 rounded-lg transition-all font-DM-sans",
//                   pathname.startsWith(item.href)
//                     ? "bg-[#2A62DF] text-white shadow-sm"
//                     : "hover:bg-[#25569E] text-white"
//                 )}
//               >
//                 <item.icon
//                   className={cn(
//                     "h-5 w-5 shrink-0 transition-colors",
//                     pathname.startsWith(item.href) ? "text-white" : "text-white"
//                   )}
//                 />
//                 {!collapsed && (
//                   <span
//                     className={cn(
//                       "font-medium text-base transition-colors",
//                       pathname.startsWith(item.href)
//                         ? "text-white"
//                         : "text-white"
//                     )}
//                   >
//                     {item.title}
//                   </span>
//                 )}
//               </Link>
//             ))}
//           </nav>

//           <div className="mt-auto mb-4">
//             {/* <button
//               onClick={handleLogout}
//               className={cn(
//                 "bg-red-700 group flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-red-800 text-white  cursor-pointer",
//                 collapsed ? "justify-center" : "justify-start"
//               )}
//             >
//               <TbLogout className="h-5 w-5 text-red-400" />
//               {!collapsed && (
//                 <span className="text-base font-medium text-white">
//                   Log Out
//                 </span>
//               )}
//             </button> */}
//             <button
//               onClick={handleLogout}
//               className="bg-red-700 flex items-center w-full gap-3 px-3 py-2 rounded-lg hover:bg-red-800 text-white"
//             >
//               <TbLogout className="h-5 w-5 text-red-400" />
//               <span>Log Out</span>
//             </button>
//           </div>
//         </motion.aside>

//         {/* Mobile Topbar */}
//         <header className="md:hidden sticky top-0 z-20 bg-[#3174CD] shadow-sm flex justify-between items-center px-4 py-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="p-1 rounded-md hover:bg-[#25569E] cursor-pointer"
//               aria-label="Open menu"
//             >
//               <HiOutlineMenuAlt2 className="h-6 w-6 text-white" />
//             </button>
//             <div className="flex items-center gap-2">
//               {/* <Image src={logo} alt="Logo" width={32} height={32} /> */}
//               <h1 className="text-xl font-bold font-DM-sans text-primary-blue  bg-gradient-to-b from-[#408DF0] to-[#0E579E]  bg-clip-text text-white">
//                 Vacanza
//               </h1>
//             </div>
//           </div>

//           <button className="p-1" onClick={() => setMobileMenuOpen(true)}>
//             <Image
//               src={profile}
//               alt="Profile"
//               width={36}
//               height={36}
//               className="rounded-full border-2 border-[#3A1A6A]"
//             />
//           </button>
//         </header>

//         {/* Mobile Drawer */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
//                 onClick={() => setMobileMenuOpen(false)}
//               />

//               <motion.aside
//                 initial={{ x: "-100%" }}
//                 animate={{ x: 0 }}
//                 exit={{ x: "-100%" }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 className="fixed inset-y-0 left-0 z-40 w-72 bg-[#3174CD] shadow-xl overflow-y-auto"
//               >
//                 <div className="flex flex-col h-full p-4">
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-2">
//                       {/* <Image src={logo} alt="Logo" width={40} height={40} /> */}
//                       <h1 className="text-2xl font-DM-sans bg-gradient-to-b from-[#408DF0] to-[#0E579E]  bg-clip-text text-white">
//                         Vacanza
//                       </h1>
//                     </div>
//                     <button
//                       onClick={() => setMobileMenuOpen(false)}
//                       className="p-1 rounded-full hover:bg-[#25569E] cursor-pointer"
//                       aria-label="Close menu"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>

//                   <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-gray-400">
//                     <Image
//                       src={profile}
//                       alt="Profile"
//                       width={48}
//                       height={48}
//                       className="rounded-full border-2 border-[#3A1A6A]"
//                     />
//                     <div>
//                       <p className="font-medium text-white">Admin Panel</p>
//                       <p className="text-sm text-gray-300">Administrator</p>
//                     </div>
//                   </div>

//                   <nav className="flex-1 space-y-1">
//                     {navItems.map((item) => (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={cn(
//                           "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-DM-sans",
//                           pathname.startsWith(item.href)
//                             ? "bg-[#2A62DF] text-white"
//                             : "hover:bg-[#25569E] text-white"
//                         )}
//                       >
//                         <item.icon className="h-5 w-5 text-white" />
//                         <span className="font-medium">{item.title}</span>
//                       </Link>
//                     ))}
//                   </nav>

//                   {/* <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="flex items-center bg-red-600 gap-3 px-3 py-3 mt-4 rounded-lg hover:bg-red-800 text-white cursor-pointer"
//                   >
//                     <TbLogout className="h-5 w-5 text-red-400" />
//                     <span className="font-medium text-base">Log Out</span>
//                   </button> */}
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false); // close drawer
//                     }}
//                     className="flex items-center bg-red-600 gap-3 px-3 py-3 mt-4 rounded-lg hover:bg-red-800 text-white cursor-pointer"
//                   >
//                     <TbLogout className="h-5 w-5 text-red-400" />
//                     <span>Log Out</span>
//                   </button>
//                 </div>
//               </motion.aside>
//             </>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main
//           className={cn(
//             "flex-1 bg-[#F4F4F4] overflow-y-auto transition-all duration-300",
//             collapsed ? "md:ml-[80px]" : "md:ml-[296px]"
//           )}
//         >
//           {!hideNavBar && (
//             <div className="hidden md:block sticky top-0 z-10">
//               <AdminNavBar />
//             </div>
//           )}
//           <div className="p-4 md:p-6">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
