import { Box , Typography, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TransactionsList() {

  const [ data, setData ] = useState([]);


  useEffect(() => {
    async function fetchData(){
      try{
        const res = await fetch('http://localhost:3003/transactions');
        const tdata = await res.json();
        console.log(tdata);
        setData(tdata);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[])

  
  
  return (
    <Box my={5} mx={4}> 
      <Box>
        <Typography variant='h4'>Transactions</Typography><br />
        <Typography variant='body1' color='text'>Date : 10-11-2023</Typography>
      </Box>
      <Box mt={2}>
        {
          data.length !== 0 ? (
            data.map((item) => (
              <Box 
                p={1} mt={1} 
                sx={{ display : 'flex' , justifyContent : 'space-around', borderRadius : '10px'}}
                key={item.id}
              >
                <Box width={15} height={50} className={`${item.transactionType}`}/>
                <Typography variant='h6' >{item.description}</Typography>
                <Typography variant='h6' sx={{ fontWeight : 'bold'}}>${item.amount}</Typography>
                <Box>
                  <IconButton><DeleteIcon /></IconButton>
                </Box>
              </Box>
            ))
          ) : (
            <Box mt={10}>
              <Typography variant='h4' textAlign='center'>You currently have no transactions!!</Typography>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}
