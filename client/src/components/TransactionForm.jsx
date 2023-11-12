import { useState  } from 'react';
import axios from 'axios';
import {
  Button, TextField,  FormControl , MenuItem, Select, InputLabel
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../slices/transactions/transactionSlice';

export default function TransactionForm() {

  const dispatch = useDispatch();

  const [ description , setDescription ] = useState('');
  const [ amount , setAmount ] = useState('');
  const [ transactionType , setTransactionType ] = useState('debit')
  const [ category , setCategory ] = useState('housing');

  
  const handleSubmit = async(e) => {

    e.preventDefault();
    const data = { id : Math.floor(Math.random() * 100) + 1 , description , amount , transactionType , category }
    try{
      await axios.post('http://localhost:3003/transactions', data);
      dispatch(addTransaction(data));
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
            value={transactionType}
            placeholder='Enter Transaction Type'
            sx={{ my : 3}}
            onChange={(e) => setTransactionType(e.target.value)}
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
            disabled={transactionType === 'credit'}
          >
            <MenuItem value='housing' >Housing</MenuItem>
            <MenuItem value='transportation'>Transportation</MenuItem>
            <MenuItem value='food'>Food</MenuItem>
            <MenuItem value='Health'>Health</MenuItem>
            <MenuItem value='entertainment'>Entertainment</MenuItem>
            <MenuItem value='personal'>Personal</MenuItem>
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
