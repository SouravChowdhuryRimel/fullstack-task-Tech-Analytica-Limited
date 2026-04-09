"use client";

import { useAppSelector } from "@/redux/hooks/redux-hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { Mail, ShieldCheck, User as UserIcon } from "lucide-react";

const UserProfile = () => {
  const user = useAppSelector(useCurrentUser);

  if (!user) {
    return (
      <div className="text-center p-10 font-bold text-red-500">
        User not found. Please log in again.
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm px-8 py-10 relative border border-gray-100 transition-all hover:shadow-md">
      <div className="flex flex-col items-center md:items-start gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-500/30">
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <UserIcon className="h-12 w-12 text-gray-500" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight capitalize">
              {user.name}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-semibold text-gray-500">
                Role: {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
            <div className="flex items-center space-x-2 mb-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                Email Address
              </h3>
            </div>
            <p className="text-lg font-medium text-gray-900">{user.email}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
            <div className="flex items-center space-x-2 mb-3">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                User ID
              </h3>
            </div>
            <p className="text-lg font-medium text-gray-900">{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
