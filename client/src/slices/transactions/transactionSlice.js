import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  transaction : []
}

const transactionSlice = createSlice({
  name : 'transaction',
  initialState,
  reducers : {
    addTransaction : (state , action) => {
      state.transaction = [...state.transaction , action.payload]
    },
    setTransaction : (state,action) => {
      state.transaction = action.payload;
    },
    removeTransaction : (state,action) => {
      state.transaction = state.transaction.filter((item) => item.id !== action.payload);
    }
  }
});

export const {
  addTransaction,
  setTransaction,
  removeTransaction
} = transactionSlice.actions;

export default transactionSlice.reducer;