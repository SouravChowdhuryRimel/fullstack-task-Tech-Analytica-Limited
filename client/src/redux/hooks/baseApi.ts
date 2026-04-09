import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "omit",
  prepareHeaders: (headers) => {
    const token = typeof window !== "undefined" ? Cookies.get("token") : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandler: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // Global error handler
  if (result.error?.status === 401) {
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: ["User", "Payment", "Task", "AuditLog"],
  endpoints: () => ({}),
});
