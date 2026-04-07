import Wrapper from "@/components/wrapper/wrapper";

const Loader = () => {
  return (
    <Wrapper>
      <div className="flex items-center justify-center h-screen w-full bg-[#1D1521]">
        <div className="relative w-20 h-20">
          {/* Outer Pulse Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#F5D66B] opacity-50 animate-ping"></div>

          {/* Inner Static Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#441A58]"></div>

          {/* Center Dot */}
          <div className="absolute inset-4 w-8 h-8 bg-[#F5D66B] rounded-full shadow-lg shadow-[#F5D66B]/30 m-auto"></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Loader;
