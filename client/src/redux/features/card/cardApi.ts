import { baseApi } from "@/redux/hooks/baseApi";

export const cardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<
      {
        status: number;
        message: string;
        data: {
          totals: {
            totalUser: number;
            totalSubscribeUser: number;
            totalUnSubscribeUser: number;
            totalAffiliate: number;
            totalRevenue: number;
          };
          growth: {
            userGrowth: number;
            subscriberGrowth: number;
            revenueGrowth: number;
          };
        };
      },
      void
    >({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["User", "Payment"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = cardApi;
