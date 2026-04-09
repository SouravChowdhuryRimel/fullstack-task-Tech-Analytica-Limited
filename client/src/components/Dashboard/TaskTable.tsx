"use client";

import React, { useState } from "react";
import {
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} from "@/redux/features/task/taskApi";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader, Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import UpdateTaskModal from "./UpdateTaskModal";

interface TaskTableProps {
  isAdmin?: boolean;
}

const TaskTable = ({ isAdmin = false }: TaskTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTasksQuery({ page, limit: 10 });
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, string>
  >({});

  const handleStatusChange = (id: string, status: string) => {
    setSelectedStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleUpdate = async (id: string) => {
    const status = selectedStatuses[id];
    if (!status) return;
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id).unwrap();
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-[#FFF4E5] text-[#B7791F]";
      case "PROCESSING":
        return "bg-[#E6FFFA] text-[#2C7A7B]";
      case "DONE":
        return "bg-[#EBFFFF] text-[#2B6CB0]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader className="animate-spin text-[#3c72b5]" />
      </div>
    );

  return (
    <div className="overflow-hidden">
      <Table className="border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="bg-[#f8f9fb] border-b border-gray-200">
            <TableHead className="font-bold text-[#4a5568] px-6 py-4 border-r border-gray-200">
              Title
            </TableHead>
            <TableHead className="font-bold text-[#4a5568] px-6 py-4 border-r border-gray-200">
              Description
            </TableHead>
            <TableHead className="font-bold text-[#4a5568] px-6 py-4 border-r border-gray-200">
              Assignee
            </TableHead>
            <TableHead className="font-bold text-[#4a5568] px-6 py-4 border-r border-gray-200 text-left">
              Status
            </TableHead>
            <TableHead className="text-left font-bold text-[#4a5568] px-6 py-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((task: any) => (
            <TableRow
              key={task.id}
              className="hover:bg-gray-50/50 transition-colors border-b border-gray-200"
            >
              <TableCell className="text-[#2d3748] px-6 py-5 border-r border-gray-200">
                {task.title}
              </TableCell>
              <TableCell className="text-[#2d3748] px-6 py-5 border-r border-gray-200 max-w-[200px] truncate">
                {task.description}
              </TableCell>
              <TableCell className="text-[#2d3748] px-6 border-r border-gray-200">
                {task.assignedTo?.name || "admin"}
              </TableCell>
              <TableCell className="px-6 border-r border-gray-200">
                <div className="flex justify-start">
                  {isAdmin ? (
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-md text-[13px] font-medium shadow-none border-0",
                        getStatusBadge(task.status),
                      )}
                    >
                      {task.status === "PROCESSING"
                        ? "Processing"
                        : task.status.charAt(0) +
                          task.status.slice(1).toLowerCase()}
                    </Badge>
                  ) : (
                    <Select
                      defaultValue={task.status}
                      onValueChange={(val) => handleStatusChange(task.id, val)}
                    >
                      <SelectTrigger className="w-[120px] h-9 bg-white border-gray-200 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6">
                <div className="flex justify-start space-x-3">
                  {isAdmin ? (
                    <>
                      <UpdateTaskModal task={task} />
                      <button
                        className="text-[#e53e3e] border border-gray-200 px-3 py-1 rounded hover:bg-red-50 text-[13px] font-medium transition-colors"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors disabled:opacity-50"
                      disabled={!selectedStatuses[task.id] || isUpdating}
                      onClick={() => handleUpdate(task.id)}
                    >
                      {isUpdating ? "Updating..." : "Update"}
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {!data?.data?.length && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-gray-500 font-medium"
              >
                No tasks available at the moment.
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

export default TaskTable;
