"use client";

import React from "react";

import { useGetUsersQuery } from "@/redux/features/auth/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UsersPage = () => {
  const { data: userData, isLoading } = useGetUsersQuery({});

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#2d3748] tracking-tight">
          User Management
        </h1>
        <div className="h-[1px] bg-gray-200 w-full mt-4"></div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader className="animate-spin text-[#3174CD]" />
          </div>
        ) : (
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="bg-[#f8f9fb] border-b border-gray-200">
                <TableHead className="font-bold text-[#4a5568] px-6 py-4">
                  Name
                </TableHead>
                <TableHead className="font-bold text-[#4a5568] px-6 py-4">
                  Email
                </TableHead>
                <TableHead className="font-bold text-[#4a5568] px-6 py-4">
                  Role
                </TableHead>
                <TableHead className="font-bold text-[#4a5568] px-6 py-4">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData?.data?.map((user: any) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                >
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      className={
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-100 border-0"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="flex items-center text-green-600 text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Active
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
