import { Box , Typography, IconButton , Grid} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector , useDispatch } from 'react-redux';
import { setTransaction, removeTransaction, reset } from '../slices/transactions/transactionSlice';
import { useGetTransactionMutation, useDeleteTransactionMutation } from '../slices/transactions/transactionApiSlice';

export default function TransactionsList( ) {

  const dispatch = useDispatch();
  const { transaction } = useSelector((state) => state.transaction)
  const { userInfo } = useSelector((state) => state.auth); 

  // const [transactions, setTransactions] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [balance, setBalance] = useState(0);

  const [ get , {isLoading }] = useGetTransactionMutation();
  const [ del , {isLoadinghapp}] = useDeleteTransactionMutation();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await get({_id : userInfo._id})
        console.log(res)
        // setTransactions(response.data);
        dispatch(setTransaction(res.data));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [dispatch, userInfo ]); // Empty dependency array ensures this effect runs only once on mount.

  useEffect(() => {
    // Recalculate total credit and total debit whenever transactions change
    const calculateTotals = () => {
      const creditTotal = transaction
        .filter((transaction) => transaction.expenseType === 'credit')
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      const debitTotal = transaction
        .filter((transaction) => transaction.expenseType === 'debit')
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      setTotalCredit(creditTotal);
      setTotalDebit(debitTotal);
      setBalance(creditTotal - debitTotal);
    };

    calculateTotals();
  }, [transaction]); // Recalculate totals when transactions change

  const handleDelete = async(id) => {
    try{
      console.log(id)
      const res = await del(id);
      console.log(res.data.id)
      dispatch(removeTransaction(res.data.id))
    }catch(err){
      console.log(err);
    }
  }

  const formatDate = () => {
    const today = new Date();

    // Format the date as DD/MM/YYYY
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    // console.log(formattedDate)
    return formattedDate;
  }

  return (
    <Box my={5} mx={4}> 
      <Box>
        <Typography variant='h4'>Transactions</Typography><br />
        <Typography variant='body1' color='text'>Date : {formatDate()}</Typography>
      </Box>

      <Box sx={{ display : 'flex' , justifyContent : 'space-around' , mt : 2}}>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} >
            <Box width='33%'   p={3} >
              <Typography>Credit</Typography>
              <Typography variant='h4' sx={{ color : '#43a047'}}>&#8377;{totalCredit}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4} >
            <Box width='33%'   p={3} >
              <Typography>Debit</Typography>
              <Typography variant='h4'sx={{ color : '#e53935'}}>&#8377;{totalDebit}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4} >
            <Box width='33%'   p={3} >
              <Typography>Balance</Typography>
              <Typography variant='h4'sx={{ color : '#3949ab'}}>&#8377;{balance}</Typography>
            </Box>
          </Grid>
        </Grid> 
      </Box>
      <Box mt={2}>
        <List >
        {transaction.map((item) => {
          if(item.createdAt === formatDate()){
            return(
              <ListItem
                sx={{ my : 1}}
                className={`${item.expenseType}`}
                secondaryAction={
                  <IconButton edge='end' onClick={() => handleDelete(item._id)}>
                    <DeleteIcon sx={{ color : 'white'}}/>
                  </IconButton>
                }
                key={item.id}
              >
                <ListItemText>
                  <Typography variant='h6' >{item.description}</Typography>
                  <Typography variant='h5' sx={{ fontWeight : 'bold'}} >&#8377;{item.amount}</Typography>
                </ListItemText>
                
              </ListItem>
            );
          }
          
        })}
    </List>
       
        
      </Box>
    </Box>
  )
}