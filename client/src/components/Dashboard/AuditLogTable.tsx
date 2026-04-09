"use client";

import React, { useState } from "react";
import { useGetAuditLogsQuery } from "@/redux/features/audit-log/auditLogApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader, ChevronLeft, ChevronRight } from "lucide-react";

const AuditLogTable = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAuditLogsQuery({ page, limit: 10 });

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader className="animate-spin text-[#3B71CA]" />
      </div>
    );

  return (
    <div className="overflow-hidden">
      <Table className="border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="bg-[#f8f9fb] border-b border-gray-200">
            <TableHead className="font-bold text-[#4a5568] px-6 py-4 border-r border-gray-200">
              Timestamp
            </TableHead>
            <TableHead className="font-bold text-[#4a5568] px-6 py-4 border-r border-gray-200">
              User
            </TableHead>
            <TableHead className="font-bold text-[#4a5568] px-6 py-4 border-r border-gray-200">
              Action
            </TableHead>
            <TableHead className="font-bold text-[#4a5568] px-6 py-4">
              Details
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((log: any) => (
            <TableRow
              key={log.id}
              className="hover:bg-gray-50/50 transition-colors border-b border-gray-200"
            >
              <TableCell className="text-[#2d3748] px-6 py-5 border-r border-gray-200 text-[14px]">
                {new Date(log.createdAt).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </TableCell>
              <TableCell className="font-bold text-[#2d3748] px-6 border-r border-gray-200 text-[14px]">
                {log.actor?.name || "admin"}
              </TableCell>
              <TableCell className="text-[#2d3748] px-6 border-r border-gray-200 text-[14px]">
                {log.actionType}
              </TableCell>
              <TableCell className="text-[#4a5568] px-6 text-[14px]">
                {log.summary}
              </TableCell>
            </TableRow>
          ))}
          {!data?.data?.length && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-gray-500 font-medium"
              >
                No audit logs recorded yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100 mt-2">
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {data?.meta?.page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">
            {data?.meta?.totalPages}
          </span>{" "}
          pages
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!data?.meta?.hasPreviousPage}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            onClick={() => setPage((p) => p + 1)}
            disabled={!data?.meta?.hasNextPage}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogTable;
