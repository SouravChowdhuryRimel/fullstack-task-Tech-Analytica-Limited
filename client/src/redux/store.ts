import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth/authSlice";
import cardReducer from "@/redux/features/card/cardSlice";

import { baseApi } from "./hooks/baseApi";
import {
  PERSIST,
  REHYDRATE,
  PAUSE,
  FLUSH,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// PERSIST USER CONFIG
const persistConfig = {
  key: "user",
  storage,
};

const persiterReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persiterReducer,
    card: cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, PAUSE, FLUSH, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Persistor for the store
export const persistor = persistStore(store);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
