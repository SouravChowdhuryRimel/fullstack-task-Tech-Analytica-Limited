"use client";

import { Toaster } from "sonner";

export function DashboardToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#003366",
          color: "#f9fafb", //
          border: "1px solid #334155",
          padding: "14px 16px",
          borderRadius: "10px",
        },
        className: "shadow-lg font-medium",
      }}
    />
  );
}
