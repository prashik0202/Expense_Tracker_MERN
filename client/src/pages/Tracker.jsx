import { useState } from 'react';

import {
  Grid , Box, Button, Typography, TextField,  FormControl , MenuItem, Select
} from '@mui/material';
import TransactionsList from '../components/TransactionsList';

export default function Tracker() {

  const [ description , setDescription ] = useState('');
  const [ amount , setAmount ] = useState('');
  const [ transactionType , setTransactionType ] = useState('')


  return (
    <Box mt={5}>
      <Grid container>
        <Grid item xs={12} sm={12} md={3}>
          <Box
            px={5}
            py={2}
            my={2}
          >
            <Typography variant='h4'>Add Transactions</Typography>
          </Box>

          <Box mx={5}>
            <form>
              <FormControl fullWidth>
                <TextField 
                  type='text'
                  value={description}
                  placeholder='Description'
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ my : 3}}
                />

                <TextField 
                  type='number'
                  value={amount}
                  placeholder='Enter Amount'
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ my : 3}}
                />

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

            <Box textAlign='center' my={4}>
              <Typography variant='body1'>
                To get details history of transactions and analysis click the below button
              </Typography><br />
              <FormControl fullWidth>
                <Button 
                  variant='contained' 
                  sx={{ borderRadius : 0}}
                >
                  Click Here
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TransactionsList />
        </Grid>
      </Grid>
    </Box>
  )
}
