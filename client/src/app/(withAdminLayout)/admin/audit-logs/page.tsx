"use client";

import React from "react";
import AuditLogTable from "@/components/Dashboard/AuditLogTable";

const AuditLogsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#2d3748] tracking-tight">
          Audit Log
        </h1>
        <div className="h-[1px] bg-gray-200 w-full mt-4"></div>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <AuditLogTable />
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
