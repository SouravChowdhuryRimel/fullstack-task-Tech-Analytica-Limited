import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Totals {
  totalUser: number;
  totalSubscribeUser: number;
  totalUnSubscribeUser: number;
  totalAffiliate: number;
  totalRevenue: number;
}

interface Growth {
  userGrowth: number;
  subscriberGrowth: number;
  revenueGrowth: number;
}

interface CardState {
  totals: Totals | null;
  growth: Growth | null;
  loading: boolean;
}

const initialState: CardState = {
  totals: null,
  growth: null,
  loading: false,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setDashboardData: (
      state,
      action: PayloadAction<{ totals: Totals; growth: Growth }>
    ) => {
      state.totals = action.payload.totals;
      state.growth = action.payload.growth;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setDashboardData, setLoading } = cardSlice.actions;
export default cardSlice.reducer;
