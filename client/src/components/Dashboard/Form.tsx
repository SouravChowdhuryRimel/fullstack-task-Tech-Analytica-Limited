import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Form = () => {
  return (
    <div className="w-full font-Robot">
      <h1 className="text-sm sm:text-[20px]">User Information</h1>
      <div className="space-y-3 my-4">
        <div className="w-full flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col w-full space-y-3">
            <label htmlFor="email" className="text-sm sm:text-[15px]">Email</label>
            <input
              type="email"
              placeholder="Enter your mail"
              className="bg-white py-2 px-4 w-full rounded-lg text-xs sm:text-sm "
            />
          </div>
          <div className="flex flex-col w-full  space-y-3">
            <label htmlFor="email" className="text-sm sm:text-[15px] ">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone"
              className="bg-white py-2 px-4 w-full rounded-lg text-xs sm:text-sm "
            />
          </div>
        </div>
        <div className="flex flex-col w-full space-y-3">
          <label htmlFor="email" className="text-sm sm:text-[15px]">Role</label>
          <Select>
            <SelectTrigger className="w-full bg-white py-5 ">
              <SelectValue placeholder="Role" className="text-xs sm:text-sm " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col w-full space-y-3">
          <label htmlFor="email" className="text-sm sm:text-[15px]">Email</label>
          <textarea
            placeholder="Additional info"
            rows={4}
            cols={50}
            className="bg-white py-2 px-4 w-full rounded-lg text-xs sm:text-sm "
          />
        </div>

        {/* button section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center  my-4 pb-4">
          <Button
            variant="outline"
            className="flex bg-none items-center space-x-2 py-3 px-5 border border-[var(--color-accent)] hover:bg-[var(--color-accent)] w-full sm:w-fit cursor-pointer group"
          >
            <span className="text-[var(--color-accent)] group-hover:text-white">
              Delete Account
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex bg-none items-center space-x-2 py-3 px-5 border border-[var(--color-accent)] hover:bg-[var(--color-accent)] w-full sm:w-fit cursor-pointer group"
          >
            <span className="text-[var(--color-accent)] group-hover:text-white">
              Suspend Profile
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
