import { baseApi } from "@/redux/hooks/baseApi";

export const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<any, any>({
            query: (params) => ({
                url: "tasks",
                method: "GET",
                params,
            }),
            providesTags: ["Task" as any],
        }),
        createTask: builder.mutation<any, any>({
            query: (body) => ({
                url: "tasks",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Task" as any],
        }),
        updateTaskStatus: builder.mutation<any, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `tasks/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Task" as any],
        }),
        assignTask: builder.mutation<any, { id: string; userId: string }>({
            query: ({ id, userId }) => ({
                url: `tasks/${id}/assign`,
                method: "PATCH",
                body: { userId },
            }),
            invalidatesTags: ["Task" as any],
        }),
        deleteTask: builder.mutation<any, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task" as any],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useAssignTaskMutation,
    useDeleteTaskMutation,
} = taskApi;
