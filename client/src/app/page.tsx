import LoginForm from "@/components/Login/Form";
import Welcome from "@/components/Login/Welcom";
import React from "react";

const Page = () => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("janina");
  //   }, 2000);
  // }); // just see loader use-case only

  return (
    <div className="bg-[var(--color-bgPrimary)] ">
      <div className="flex flex-col md:flex-row ">
        <div className="w-full h-screen lg:block hidden">
          <Welcome />
        </div>
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
