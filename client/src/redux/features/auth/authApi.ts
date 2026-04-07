// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/hooks/baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      image?: string | null;
    };
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

// import { baseApi } from "@/redux/hooks/baseApi";
// import { LoginResponse } from "@/redux/types/venue.type";

// const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, { email: string; password: string }>(
//       {
//         query: (userInfo) => ({
//           url: "auth/login",
//           method: "POST",
//           body: userInfo,
//         }),
//       }
//     ),

//     logout: builder.mutation<{ message: string }, void>({
//       query: () => ({
//         url: "auth/logout",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${
//             typeof window !== "undefined"
//               ? localStorage.getItem("token") || ""
//               : ""
//           }`,
//         },
//         body: {},
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useLogoutMutation } = authApi;
