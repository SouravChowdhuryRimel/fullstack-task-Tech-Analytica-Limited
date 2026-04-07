"use client";
import React from "react";
import { Button } from "../ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form as any).email.value;
    const password = (form as any).password.value;

    try {
      const response = await login({ email, password }).unwrap();

      if (response?.data?.accessToken && response?.data?.user) {
        // ✅ Store token in cookies
        Cookies.set("token", response.data.accessToken, { expires: 1 });

        // ✅ Update redux store
        dispatch(
          setUser({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );

        toast.success(response.message || "Login successful");

        // ✅ Redirect to admin dashboard
        router.push("/admin/dashboard");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error: any) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full bg-white text-black font-Robot">
      <div className="flex items-center justify-center h-screen p-3">
        <div className="w-full max-w-md space-y-10">
          <h1 className="text-4xl sm:text-5xl font-semibold text-center">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="flex flex-col space-y-3">
              <label className="text-sm sm:text-[17px]">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="py-2 px-5 sm:py-2.5 sm:px-6 rounded-[12px] border-2 border-gray-300 focus:border-blue-400 focus:outline-none transition bg-gray-100 text-gray-800"
                required
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label className="text-sm sm:text-[17px]">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="py-2 px-5 sm:py-2.5 sm:px-6 rounded-[12px] border-2 border-gray-300 focus:border-blue-400 focus:outline-none transition bg-gray-100 text-gray-800"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full py-5 px-5 sm:px-6 text-[16px] sm:text-lg bg-[var(--color-blueOne)] hover:bg-[var(--color-accent)] text-white rounded-lg flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// "use client";
// import React from "react";
// import { Button } from "../ui/button";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/features/auth/authSlice";
// import { Loader } from "lucide-react";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// const LoginForm = () => {
//   const router = useRouter();
//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.target as HTMLFormElement;
//     const email = form.email.value;
//     const password = form.password.value;

//     const loginData = { email, password };

//     try {
//       const response = await login(loginData).unwrap();

//       if (response?.user && response?.accessToken) {
//         // Set token in cookies
//         Cookies.set("token", response.accessToken, { expires: 1 }); // expires in 1 day

//         // Dispatch user data to Redux store
//         dispatch(
//           setUser({
//             user: response.user,
//             token: response.accessToken,
//           })
//         );

//         // Redirect to dashboard
//         router.push("/admin/dashboard");
//         toast.success("Login Successful");
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div className="w-full bg-white text-[#FDFCEE] font-Robot">
//       {" "}
//       {/* bg-[#331843] text-[#FDFCEE] */}
//       <div className="flex items-center justify-center h-screen p-3">
//         <div className="w-full max-w-md space-y-10">
//           <h1 className="text-4xl sm:text-5xl font-semibold text-center text-black">
//             Login
//           </h1>
//           <form className="space-y-6" onSubmit={handleLogin}>
//             <div className="flex flex-col space-y-3">
//               <label className="text-sm sm:text-[17px] text-black">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your mail"
//                 className="py-2 px-5 sm:py-2.5 sm:px-6 rounded-[12px] border-2  border-gray-300 focus:border-blue-400 focus:outline-none transition bg-gray-100 text-gray-800"
//                 required
//               />
//             </div>

//             <div className="flex flex-col space-y-3">
//               <label className="text-sm sm:text-[17px] text-black">
//                 Password
//               </label>
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 className="py-2 px-5 sm:py-2.5 sm:px-6 rounded-[12px] border-2  border-gray-300 focus:border-blue-400 focus:outline-none transition bg-gray-100 text-gray-800"
//                 required
//                 minLength={6}
//               />
//             </div>

//             <div className="space-y-3">
//               <Button
//                 type="submit"
//                 className="w-full py-5.5 px-5 sm:px-6 text-[16px] sm:text-lg cursor-pointer bg-[var(--color-blueOne)] hover:bg-[var(--color-accent)] text-white transition-colors duration-200 rounded-lg flex justify-center items-center"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <Loader className="animate-spin w-5 h-5" />
//                 ) : (
//                   "Login"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
