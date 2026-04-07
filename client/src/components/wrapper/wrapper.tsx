import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full  mx-auto h-full">{children}</div>;
};

export default Wrapper;
