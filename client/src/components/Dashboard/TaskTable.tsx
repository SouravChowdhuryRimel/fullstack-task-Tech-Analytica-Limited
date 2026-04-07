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
import { Loader, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface TaskTableProps {
  isAdmin?: boolean;
}

const TaskTable = ({ isAdmin = false }: TaskTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTasksQuery({ page, limit: 10 });
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleStatusChange = async (id: string, status: string) => {
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

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((task: any) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.assignedTo?.name || "Unassigned"}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Select
                      defaultValue={task.status}
                      onValueChange={(val) => handleStatusChange(task.id, val)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TODO">TODO</SelectItem>
                        <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                        <SelectItem value="DONE">DONE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(task.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {!data?.data?.length && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No tasks found.
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

export default TaskTable;
