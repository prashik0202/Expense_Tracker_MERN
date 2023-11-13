import { apiSlice } from "../apiSlice";

const TRANSACTION_URL = '/api/transaction';


export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    addTransaction : builder.mutation({
      query : (data) => ({
        url : `${TRANSACTION_URL}/add`,
        method : 'POST',
        body : data
      })
    }),
    getTransaction : builder.mutation({
      query : (data) => ({
        url : `${TRANSACTION_URL}`,
        method : 'GET',
        headers : data
      })
    }),
    deleteTransaction : builder.mutation({
      query : (id) => ({
        url : `${TRANSACTION_URL}/` + id,
        method : 'DELETE'
      })
    })
  })
})

const { addTransaction, getTransaction, deleteTransaction } = transactionApiSlice.endpoints;

export const transactionApi = {
  addTransaction,
  getTransaction,
  deleteTransaction,
};

export const { useAddTransactionMutation, useGetTransactionMutation, useDeleteTransactionMutation } = transactionApiSlice;
