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
        <h1 className="text-4xl font-extrabold text-white">Page Not Found</h1>
        <p className="text-lg text-gray-300 mt-4">
          The page you are looking for does not exist or you do not have
          permission to access it.
        </p>
        <Link href="/">
          <button className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded transition duration-200 cursor-pointer">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
