"use client";

import React from "react";
import TaskTable from "@/components/Dashboard/TaskTable";

const UserDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-normal text-[#2D3748]">User Dashboard</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#2D3748]">My Tasks</h2>
        </div>
        <TaskTable isAdmin={false} />
      </div>
    </div>
  );
};

export default UserDashboardPage;
