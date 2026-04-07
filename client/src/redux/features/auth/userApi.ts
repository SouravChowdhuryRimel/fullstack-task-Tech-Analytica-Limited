// src/redux/features/auth/userApi.ts
import { baseApi } from "@/redux/hooks/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // ✅ Add update role mutation
    updateUserRole: build.mutation({
      query: ({ id, role }: { id: string; role: "USER" | "ADMIN" }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation, // ✅ Export mutation
} = userApi;



// import { baseApi } from "@/redux/hooks/baseApi";

// export const userApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     getUsers: build.query({
//       query: () => ({
//         url: "/user",
//         method: "GET",
//       }),
//       providesTags: ["User"],
//     }),

//     deleteUser: build.mutation({
//       query: (id: string) => ({
//         url: `/user/delete/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["User"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
