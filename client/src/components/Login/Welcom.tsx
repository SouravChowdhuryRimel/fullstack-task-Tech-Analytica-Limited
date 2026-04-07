"use client";

const Welcome = () => {
  return (
    <div className="h-screen flex">
      <div className="relative w-full h-screen  overflow-hidden">
        {/* Welcome Message + Logo */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-yellow-300">
          {/* Logo */}
          {/* <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="mb-4"
          /> */}

          <h1 className="text-4xl font-DM-sans text-white sm:text-5xl font-semibold  mb-2">
            Admin!
          </h1>
          <p className="text-[16px] text-[#FDFCEE] text-center max-w-xs font-Montserrat tracking-widest leading-[20px]">
            Please log in with your admin info to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
