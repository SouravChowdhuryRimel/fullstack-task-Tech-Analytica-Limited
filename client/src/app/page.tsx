import LoginForm from "@/components/Login/Form";
import React from "react";

const Page = () => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("janina");
  //   }, 2000);
  // }); // just see loader use-case only

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Page;
