"use client";

import CalculateCard from "@/components/reuseabelComponents/calculateCard";
import Title from "@/components/reuseabelComponents/Title";
import Wrapper from "@/components/wrapper/wrapper";

const DashboardPage = () => {
  return (
    <Wrapper>
      <div className="w-full  min-h-screen space-y-4 ">
        <Title title="Admin Dashboard" />
        <div className="space-y-5">
          <CalculateCard />
        </div>
      </div>
    </Wrapper>
  );
};

export default DashboardPage;
