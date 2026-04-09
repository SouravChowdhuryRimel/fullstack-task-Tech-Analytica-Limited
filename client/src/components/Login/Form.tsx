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
        //  Store token in cookies
        Cookies.set("token", response.data.accessToken, { expires: 1 });

        // Update redux store
        dispatch(
          setUser({
            user: response.data.user,
            token: response.data.accessToken,
          }),
        );

        toast.success(response.message || "Login successful");

        // Redirect based on role
        if (response.data.user.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Login failed. Please check your credentials.",
      );
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-white rounded-md shadow-lg p-10 border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-[#2D3748] mb-10">
          Login
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2D3748]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full py-2.5 px-4 rounded-md border border-gray-250 focus:border-[#4A90E2] focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2D3748]">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••"
              className="w-full py-2.5 px-4 rounded-md border border-gray-250 focus:border-[#4A90E2] focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-4 text-lg bg-[#4A7EC1] hover:bg-[#3C69A2] text-white font-bold rounded-md shadow-md transition-all duration-200 flex justify-center items-center mt-4 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin w-5 h-5" /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
