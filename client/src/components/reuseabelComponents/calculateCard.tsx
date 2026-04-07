"use client";

import {
  FaArrowUp,
  FaCircleDollarToSlot,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { VscLayersActive } from "react-icons/vsc";
import { useGetDashboardDataQuery } from "@/redux/features/card/cardApi";

const CalculateCard = () => {
  const { data, isLoading, isError } = useGetDashboardDataQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <p>Loading dashboard data...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        <p>Failed to load dashboard data.</p>
      </div>
    );

  const totals = data?.data?.totals;
  const growth = data?.data?.growth;

  const statusData = [
    {
      title: "Total Users",
      amount: totals?.totalUser ?? 0,
      change: `${growth?.userGrowth ?? 0}%`,
      unit: "User Growth",
      icon: <FaUsers />,
    },
    {
      title: "Subscribed Users",
      amount: totals?.totalSubscribeUser ?? 0,
      change: `${growth?.subscriberGrowth ?? 0}%`,
      unit: "Subscriber Growth",
      icon: <FaRegCircleCheck />,
    },
    {
      title: "Unsubscribed Users",
      amount: totals?.totalUnSubscribeUser ?? 0,
      change: `${100 - (growth?.subscriberGrowth ?? 0)}%`,
      unit: "Inactive",
      icon: <VscLayersActive />,
    },
    {
      title: "Total Revenue",
      amount: `$${totals?.totalRevenue ?? 0}`,
      change: `${growth?.revenueGrowth ?? 0}%`,
      unit: "Revenue Growth",
      icon: <FaCircleDollarToSlot />,
    },
  ];

  const bgColors = ["#E0F7FA", "#FFF3E0", "#E8F5E9", "#F3E5F5"];
  const colors = ["#00ACC1", "#FB8C00", "#43A047", "#8E24AA"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 place-items-start w-full">
      {statusData.map((single, index) => {
        const changeValue = parseFloat(single.change.replace("%", ""));
        const isNegative = changeValue < 0;

        const iconElement = (
          <FaArrowUp
            style={{
              color: isNegative ? "#E35A5F" : "#12CC1E",
              transform: isNegative ? "rotate(180deg)" : "none",
            }}
          />
        );

        const changeColor = isNegative ? "#E35A5F" : "#12CC1E";

        return (
          <div
            key={single.title}
            className="w-full h-[187px] p-5 sm:p-6 bg-white rounded-[16px] border border-[#E0E0E0] flex flex-col justify-between mx-auto shadow-sm"
          >
            {/* Top Row */}
            <div className="flex items-center justify-start gap-5">
              <div
                className="w-12 h-[48px] rounded-[12px] p-[12px] flex items-center justify-center border border-[#C7CACF]"
                style={{ backgroundColor: bgColors[index] }}
              >
                <div
                  key={index}
                  className="w-6 h-6 ml-1 mt-2"
                  style={{ color: colors[index] }}
                >
                  {single.icon}
                </div>
              </div>
              <h1 className="text-[#484848] text-[18px] leading-[160%] font-[400] font-poppins">
                {single.title}
              </h1>
            </div>

            {/* Amount */}
            <div className="flex-1 flex flex-col items-start justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold font-Robot tracking-[-0.68px]">
                {single.amount}
              </h2>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-start gap-1 text-sm font-Robot">
              {iconElement}
              <span style={{ color: changeColor }}>{single.change}</span>
              <span className="text-[#666666]">{single.unit}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalculateCard;
