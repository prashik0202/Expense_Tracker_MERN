import {
  Grid , Box, Button, Typography, FormControl, useMediaQuery
} from '@mui/material';
import TransactionsList from '../components/TransactionsList';
import TransactionForm from '../components/TransactionForm';


export default function Tracker() {

  const isNonMobile = useMediaQuery('(min-width : 600px)');


  return (
    <Box mt={6} mx={isNonMobile ? 10 : 1}>
      <Grid container>
        <Grid item xs={12} sm={12} md={4}>
          <Box
            px={5}
            py={2}
            my={2}
          >
            <Typography variant='h4'>Add Transactions</Typography>
            <TransactionForm />
          </Box>

          <Box mx={5}>
            <Box textAlign='center' my={4}>
              <Typography variant='body1'>
                To get details history of transactions and analysis click the below button
              </Typography><br />
              <FormControl fullWidth>
                <Button 
                  type='submit'
                  variant='contained' 
                  sx={{ borderRadius : 0}}
                >
                  Click Here
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TransactionsList />
        </Grid>
      </Grid>
    </Box>
  )
}
