import { useState  } from 'react';
import {
  Button, TextField,  FormControl , MenuItem, Select, InputLabel
} from '@mui/material';
import { useDispatch , useSelector} from 'react-redux';
import { addTransaction } from '../slices/transactions/transactionSlice';
import { useAddTransactionMutation } from '../slices/transactions/transactionApiSlice';

export default function TransactionForm() {

  const dispatch = useDispatch();

  const [ description , setDescription ] = useState('');
  const [ amount , setAmount ] = useState('');
  const [ expenseType , setExpenseType ] = useState('debit')
  const [ category , setCategory ] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [ add , {isLoading}] = useAddTransactionMutation()
  
  const handleSubmit = async(e) => {

    e.preventDefault();
    try{
      const res = await add({
        _id : userInfo._id,
        description,
        amount,
        expenseType,
        category
      }).unwrap();
      console.log(res)
      dispatch(addTransaction(res));
      setDescription('');
      setAmount('');
      setCategory('');
    }catch(err){
      console.error('Error adding transaction:', err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField 
            type='text'
            value={description}
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            sx={{ my : 3}}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField 
            type='number'
            value={amount}
            placeholder='Enter Amount'
            onChange={(e) => setAmount(e.target.value)}
            sx={{ my : 3}}
          />
        </FormControl>

        <FormControl fullWidth>
          <Select
            type='text'
            value={expenseType}
            placeholder='Enter Transaction Type'
            sx={{ my : 3}}
            onChange={(e) => setExpenseType(e.target.value)}
          >
            <MenuItem value='credit' >Credit</MenuItem>
            <MenuItem value='debit'>Debit</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Select
            type='text'
            value={category}
            placeholder='Enter Category'
            sx={{ my : 3}}
            onChange={(e) => setCategory(e.target.value)}
          >
            
            <MenuItem value='housing' disabled={expenseType === 'credit'}>Housing</MenuItem>
            <MenuItem value='transportation' disabled={expenseType === 'credit'}>Transportation</MenuItem>
            <MenuItem value='food' disabled={expenseType === 'credit'}>Food</MenuItem>
            <MenuItem value='Health' disabled={expenseType === 'credit'}>Health</MenuItem>
            <MenuItem value='personal' disabled={expenseType === 'credit'}>Personal</MenuItem>
            <MenuItem value='entertainment' disabled={expenseType === 'credit'}>Entertainment</MenuItem>

            <MenuItem value='salary' disabled={expenseType === 'debit'}>Salary</MenuItem>
            <MenuItem value='payment' disabled={expenseType === 'debit'}>Payment</MenuItem>
            <MenuItem value='return' disabled={expenseType === 'debit'}>Return</MenuItem>
            
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Button
            variant='contained'
            type='submit'
            size='large'
            sx={{ borderRadius : 0 , my: 3}}
          >
            Add Transaction
          </Button>
        </FormControl>
      </form>
    </div>
  )
}
