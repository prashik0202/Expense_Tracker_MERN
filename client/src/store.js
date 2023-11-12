import { configureStore} from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactions/transactionSlice";
import authReducer from './slices/auth/authSlice';

import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    transaction : transactionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
