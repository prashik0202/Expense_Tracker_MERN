import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  transaction : []
}

const transactionSlice = createSlice({
  name : 'transaction',
  initialState,
  reducers : {
    reset : (state) => initialState,
    addTransaction : (state , action) => {
      state.transaction = [...state.transaction , action.payload]
    },
    setTransaction : (state,action) => {
      state.transaction = action.payload;
    },
    removeTransaction : (state,action) => {
      state.transaction = state.transaction.filter((item) => item._id !== action.payload);
    }
  }
});

export const {
  addTransaction,
  setTransaction,
  removeTransaction,
  reset
} = transactionSlice.actions;

export default transactionSlice.reducer;