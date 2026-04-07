"use client";

import CalculateCard from "@/components/reuseabelComponents/calculateCard";
import Title from "@/components/reuseabelComponents/Title";
import Wrapper from "@/components/wrapper/wrapper";
import TaskTable from "@/components/Dashboard/TaskTable";
import AuditLogTable from "@/components/Dashboard/AuditLogTable";
import CreateTaskModal from "@/components/Dashboard/CreateTaskModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardPage = () => {
  return (
    <Wrapper>
      <div className="w-full min-h-screen space-y-6">
        <div className="flex justify-between items-center">
          <Title title="Admin Dashboard" />
          <CreateTaskModal />
        </div>

        <div className="space-y-8">
          <CalculateCard />

          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="logs">Audit Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Task Management</h3>
                <TaskTable isAdmin={true} />
              </div>
            </TabsContent>
            <TabsContent value="logs" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">System Audit Logs</h3>
                <AuditLogTable />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Wrapper>
  );
};

export default DashboardPage;
