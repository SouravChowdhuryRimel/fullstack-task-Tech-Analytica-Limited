"use client";

import React from "react";
import SharedLayout from "@/components/Dashboard/SharedLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <SharedLayout>{children}</SharedLayout>;
}
