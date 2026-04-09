"use client";

import React, { useEffect } from "react";
import { useUpdateTaskMutation } from "@/redux/features/task/taskApi";
import { useGetUsersQuery } from "@/redux/features/auth/userApi";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader, Edit } from "lucide-react";

interface UpdateTaskModalProps {
  task: any;
}

const UpdateTaskModal = ({ task }: UpdateTaskModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const { data: userData } = useGetUsersQuery({});

  const form = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      userId: task.userId || "",
      status: task.status,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: task.title,
        description: task.description,
        userId: task.userId || "",
        status: task.status,
      });
    }
  }, [open, task, form]);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        userId: values.userId === "" ? null : values.userId,
      };
      await updateTask({ id: task.id, body: payload }).unwrap();
      toast.success("Task updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[#4a5568] border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 text-[13px] font-medium transition-colors">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Update Task
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Task title"
                      {...field}
                      required
                      className="rounded-lg border-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Task description"
                      {...field}
                      className="rounded-lg border-gray-200 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Assign To
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-gray-200">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {userData?.data && userData.data.length > 0 ? (
                        userData.data.map((user: any) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex flex-col text-left">
                              <span className="font-medium text-gray-900">
                                {user.name}
                              </span>
                              <span className="text-[11px] text-gray-500">
                                {user.email}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-gray-500 text-center italic">
                          No other users found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-gray-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PROCESSING">Processing</SelectItem>
                      <SelectItem value="DONE">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 h-11 rounded-lg font-bold transition-all shadow-md active:scale-95"
              >
                {isLoading ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  "Update Task"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskModal;
