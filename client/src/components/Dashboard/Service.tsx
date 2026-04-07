"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Reviews from "./Reviews";
import GridImage from "./GridImage";

const Service = () => {
  const [tabsChange, setTabsChange] = useState<boolean>(false);
  return (
    <div>
      <div className="flex items-center gap-4 my-4">
        <button
          onClick={() => setTabsChange(!tabsChange)}
          className={cn(
            "text-[var(--color-boldText)] text-sm sm:text-[16px] cursor-pointer",
            tabsChange &&
              "text-[var(--color-secondary)]  border-b-[1px] border-[var(--color-secondary)] text-sm sm:text-lg"
          )}
        >
          Work
        </button>
        <button
          onClick={() => setTabsChange(!tabsChange)}
          className={cn(
            "text-[var(--color-boldText)] text-sm sm:text-[16px] cursor-pointer",
            !tabsChange &&
              "text-[var(--color-secondary)]  border-b-[1px] border-[var(--color-secondary)] text-sm sm:text-lg"
          )}
        >
          Review
        </button>
      </div>
      {tabsChange ? <GridImage /> : <Reviews />}
    </div>
  );
};

export default Service;
