import React from "react";

const Status = () => {
  return (
    <div className="space-y-7 font-Robot">
      <h1 className="text-sm sm:text-[20px]">Account Status</h1>
      <div className="flex justify-between ">
        <div>
          <h1 className="text-[var(--color-accent)] font-semibold text-sm sm:text-[16px]">
            Active
          </h1>
          <p className="text-xs sm:text-sm">Toggle user status</p>
        </div>
        <label
          htmlFor="Toggle1"
          className="inline-flex items-center space-x-4 cursor-pointer"
        >
          <span className="relative">
            <input id="Toggle1" type="checkbox" className="hidden peer" />

            {/* conditional Track */}
            <div className="w-10 h-6 rounded-full shadow-inner bg-[#333333] peer-checked:bg-[#333333]"></div>

            {/* Knob */}
            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow bg-white peer-checked:right-0 peer-checked:left-auto"></div>
          </span>
        </label>
      </div>
      <div className="flex justify-between ">
        <div>
          <h1 className="text-[var(--color-accent)] font-semibold text-sm sm:text-[16px]">
            Suspended
          </h1>
          <p className="text-xs sm:text-sm">Toggle user status</p>
        </div>
        <label
          htmlFor="Toggle1"
          className="inline-flex items-center space-x-4 cursor-pointer"
        >
          <span className="relative">
            <input id="Toggle1" type="checkbox" className="hidden peer" />

            {/* conditional Track */}
            <div className="w-10 h-6 rounded-full shadow-inner bg-[#333333] peer-checked:bg-[#333333]"></div>

            {/* Knob */}
            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow bg-white peer-checked:right-0 peer-checked:left-auto"></div>
          </span>
        </label>
      </div>
      <div className="flex justify-between ">
        <div>
          <h1 className="text-[var(--color-accent)] font-semibold text-sm sm:text-[16px]">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm">Toggle user status</p>
        </div>
        <label
          htmlFor="Toggle1"
          className="inline-flex items-center space-x-4 cursor-pointer"
        >
          <span className="relative">
            <input id="Toggle1" type="checkbox" className="hidden peer" />

            {/* conditional Track */}
            <div className="w-10 h-6 rounded-full shadow-inner bg-[#333333] peer-checked:bg-[#333333]"></div>

            {/* Knob */}
            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow bg-white peer-checked:right-0 peer-checked:left-auto"></div>
          </span>
        </label>
      </div>
      <div className="flex justify-between ">
        <div>
          <h1 className="text-[var(--color-accent)] font-semibold text-sm sm:text-[16px]">
            View Booking History
          </h1>
          <p className="text-xs sm:text-sm">Toggle user status</p>
        </div>
        <label
          htmlFor="Toggle1"
          className="inline-flex items-center space-x-4 cursor-pointer"
        >
          <span className="relative">
            <input id="Toggle1" type="checkbox" className="hidden peer" />

            {/* conditional Track */}
            <div className="w-10 h-6 rounded-full shadow-inner bg-[#333333] peer-checked:bg-[#333333]"></div>

            {/* Knob */}
            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow bg-white peer-checked:right-0 peer-checked:left-auto"></div>
          </span>
        </label>
      </div>
    </div>
  );
};

export default Status;
