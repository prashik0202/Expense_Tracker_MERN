import { Box , Typography, IconButton , Grid} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector , useDispatch } from 'react-redux';
import { setTransaction, removeTransaction } from '../slices/transactions/transactionSlice';

export default function TransactionsList( ) {

  const dispatch = useDispatch();
  const { transaction } = useSelector((state) => state.transaction)

  // const [transactions, setTransactions] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3003/transactions');
        // setTransactions(response.data);
        dispatch(setTransaction(response.data));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  useEffect(() => {
    // Recalculate total credit and total debit whenever transactions change
    const calculateTotals = () => {
      const creditTotal = transaction
        .filter((transaction) => transaction.transactionType === 'credit')
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      const debitTotal = transaction
        .filter((transaction) => transaction.transactionType === 'debit')
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      setTotalCredit(creditTotal);
      setTotalDebit(debitTotal);
      setBalance(creditTotal - debitTotal);
    };

    calculateTotals();
  }, [transaction]); // Recalculate totals when transactions change

  const handleDelete = async(id) => {
    try{
      await axios.delete(`http://localhost:3003/transactions/${id}`);
      // setTransactions(transactions.filter((transaction) => transaction.id !== id));
      dispatch(removeTransaction(id))
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Box my={5} mx={4}> 
      <Box>
        <Typography variant='h4'>Transactions</Typography><br />
        <Typography variant='body1' color='text'>Date : 10-11-2023</Typography>
      </Box>

      <Box sx={{ display : 'flex' , justifyContent : 'space-around' , mt : 2}}>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} >
            <Box width='33%'   p={3} >
              <Typography>Credit</Typography>
              <Typography variant='h4' sx={{ color : '#43a047'}}>${totalCredit}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4} >
            <Box width='33%'   p={3} >
              <Typography>Debit</Typography>
              <Typography variant='h4'sx={{ color : '#e53935'}}>${totalDebit}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4} >
            <Box width='33%'   p={3} >
              <Typography>Balance</Typography>
              <Typography variant='h4'sx={{ color : '#3949ab'}}>${balance}</Typography>
            </Box>
          </Grid>
        </Grid> 
      </Box>
      <Box mt={2}>

        {
          transaction.length === 0 ? (
            <Box>
              <Typography variant='h4' textAlign='center'>
                You Currently have no transactions!
              </Typography>
            </Box>
          ) : (
            <List >
          {transaction.map((item) => (
            <ListItem
              sx={{ my : 1 }}
              className={`${item.transactionType}`}
              secondaryAction={
                <IconButton edge='end' onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              key={item.id}
            >
              <ListItemText >
                <Typography variant='h6'>{item.description}</Typography>
                <Typography variant='h5' sx={{ fontWeight : 'bold'}}>${item.amount}</Typography>
              </ListItemText>
              
            </ListItem>
          ))}
        </List>
          )
        }
        
      </Box>
    </Box>
  )
}
