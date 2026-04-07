import { baseApi } from "@/redux/hooks/baseApi";

export const auditLogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAuditLogs: builder.query<any, any>({
            query: (params) => ({
                url: "audit-logs",
                method: "GET",
                params,
            }),
        }),
    }),
});

export const { useGetAuditLogsQuery } = auditLogApi;
