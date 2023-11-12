import { configureStore} from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactions/transactionSlice";

export const store = configureStore({
  reducer : {
    transaction : transactionsReducer
  }
})