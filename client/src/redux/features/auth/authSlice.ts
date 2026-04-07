import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRootState } from "@/redux/store";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface TAuth {
  user: User | null;
  token: string | null;
}

const initialState: TAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: AppRootState) => state.auth.token;
export const useCurrentUser = (state: AppRootState) => state.auth.user;

// import { AppRootState } from "@/redux/store";
// import { TAuth, User } from "@/redux/types/venue.type";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: TAuth = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     logOut: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, logOut } = authSlice.actions;
// export default authSlice.reducer;

// export const useCurrentToken = (state: AppRootState) => state.auth.token;
// export const useCurrentUser = (state: AppRootState) => state.auth.user;
