"use client";

import Title from "@/components/reuseabelComponents/Title";
import Wrapper from "@/components/wrapper/wrapper";
import TaskTable from "@/components/Dashboard/TaskTable";

const UserDashboardPage = () => {
  return (
    <Wrapper>
      <div className="w-full min-h-screen space-y-6">
        <Title title="My Tasks" />
        <div className="space-y-4">
          <TaskTable isAdmin={false} />
        </div>
      </div>
    </Wrapper>
  );
};

export default UserDashboardPage;
