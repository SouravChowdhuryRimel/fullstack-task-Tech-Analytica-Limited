"use client";

import React from "react";
import TaskTable from "@/components/Dashboard/TaskTable";
import CreateTaskModal from "@/components/Dashboard/CreateTaskModal";

const AdminTasksPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Task Management</h3>
        <CreateTaskModal />
      </div>
      <TaskTable isAdmin={true} />
    </div>
  );
};

export default AdminTasksPage;
