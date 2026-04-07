"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2022, 10));
  const [selectedDay, setSelectedDay] = useState(24);

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstWeekday = (date: Date) =>
    (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;

  const getMonthDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const startOffset = getFirstWeekday(currentMonth);
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const prevDays = getDaysInMonth(prevMonth);

    const days = [];
    for (let i = startOffset; i > 0; i--)
      days.push({ day: prevDays - i + 1, type: "prev" });
    for (let i = 1; i <= daysInMonth; i++)
      days.push({ day: i, type: "current" });
    while (days.length % 7 !== 0) days.push({ day: days.length, type: "next" });

    return days;
  };

  const changeMonth = (offset: number) => {
    const updated = new Date(currentMonth);
    updated.setMonth(updated.getMonth() + offset);
    setCurrentMonth(updated);
  };

  const formatMonth = (date: Date) =>
    date.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="w-full sm:w-[40%] h-[346px] bg-white  rounded-2xl p-8 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="text-gray-600 dark:text-gray-300 hover:text-black cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-[15px] font-bold text-[#615E83]">
            {formatMonth(currentMonth)}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="text-gray-600 dark:text-gray-300 hover:text-black  cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {getMonthDays().map(({ day, type }, idx) => (
            <div
              key={idx}
              onClick={() => type === "current" && setSelectedDay(day)}
              className={`py-1 text-center rounded-full cursor-pointer ${
                type === "prev" || type === "next"
                  ? "text-gray-300 dark:text-zinc-600"
                  : day === selectedDay
                  ? "bg-amber-500 text-white font-semibold w-6 h-6 flex items-center justify-center mx-auto"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
