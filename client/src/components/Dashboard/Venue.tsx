import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Venue = () => {
  return (
    <div className="flex items-center gap-x-8 w-full">
      {/* content section */}
      {/* vanue */}
      <div className="space-y-4 w-full">
        <h1 className="text-sm px-2 py-0.5 rounded-sm inline-block  bg-white">
          Total Venue 3
        </h1>
        <div className="bg-white px-14 py-3 flex flex-1 items-center justify-between rounded-lg">
          <div className="flex items-center space-x-5">
            <Avatar className="w-12 h-12 rounded-md">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-sm sm:text-lg font-semibold ">
              The Grand Hall
            </h1>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-amber-300 rounded-full" />
            <p>active</p>
          </div>
          <h1>New york</h1>
          <Link href="#" className="underline font-semibold text-sm ">
            Details
          </Link>
        </div>
        <div className="bg-white px-14 py-3 flex items-center justify-between rounded-lg">
          <div className="flex items-center space-x-5">
            <Avatar className="w-12 h-12 rounded-md">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-sm sm:text-lg font-semibold ">
              The Grand Hall
            </h1>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-amber-300 rounded-full" />
            <p>active</p>
          </div>
          <h1>New york</h1>
          <Link href="#" className="underline font-semibold text-sm ">
            Details
          </Link>
        </div>
        <div className="bg-white px-14 py-3 flex items-center justify-between rounded-lg">
          <div className="flex items-center space-x-5">
            <Avatar className="w-12 h-12 rounded-md">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-sm sm:text-lg font-semibold ">
              The Grand Hall
            </h1>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-amber-300 rounded-full" />
            <p>active</p>
          </div>
          <h1>New york</h1>
          <Link href="#" className="underline font-semibold text-sm ">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Venue;
