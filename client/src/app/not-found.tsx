"use client";
import React from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E60] px-6">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="h-20 w-20 text-red-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-white">Access Denied</h1>
        <p className="text-lg text-gray-300 mt-4">
          You do not have permission to access this page.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Incorrect admin email or password.
        </p>
        <Link href="/admin/login">
          <button className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded transition duration-200 cursor-pointer">
            Return to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
