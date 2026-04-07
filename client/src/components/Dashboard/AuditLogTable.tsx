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
import { Badge } from "@/components/ui/badge";
import { Loader, ChevronLeft, ChevronRight } from "lucide-react";

const AuditLogTable = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAuditLogsQuery({ page, limit: 10 });

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader className="animate-spin" />
      </div>
    );

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-800 border-green-200";
      case "UPDATE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "DELETE":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((log: any) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.actor?.name}</TableCell>
                <TableCell>
                  <Badge className={getActionColor(log.actionType)}>
                    {log.actionType}
                  </Badge>
                </TableCell>
                <TableCell>{log.targetEntity}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {log.summary}
                </TableCell>
                <TableCell>
                  {new Date(log.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {!data?.data?.length && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No audit logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          Page {data?.meta?.page} of {data?.meta?.totalPages} (
          {data?.meta?.total} total items)
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!data?.meta?.hasPreviousPage}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={!data?.meta?.hasNextPage}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogTable;
