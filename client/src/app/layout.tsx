import type { Metadata } from "next";
import "./globals.css";
import ReduxProviderWrapper from "@/redux/redux-provider/reduxProviderWrapper";
import { DashboardToaster } from "@/components/ui/Toster";

export const metadata: Metadata = {
  title: "Task Management System",
  description: "Task Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
        <DashboardToaster />
      </body>
    </html>
  );
}
