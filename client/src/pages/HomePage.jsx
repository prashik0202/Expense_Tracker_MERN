import React , { useEffect }from 'react'
import { Box , Button , Typography , useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function HomePage() {

    const isNonMobile = useMediaQuery('(min-width : 600px)');

    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleClick = () => {
        if(userInfo){
            navigate('/tracker');
        }else {
            navigate('/login')
        }
    }


    return (
    <div className='home'>
        <Box    
            textAlign='center'
            my={20}
            width={500}
            mx='auto'

        >
            <Box mt={1}>
                <Typography variant={isNonMobile ? 'h1' : 'h3'}>
                    MoneyTrack
                </Typography>
            </Box> 

            <Box mt={1}>   
                <Typography variant={ isNonMobile ? 'h6' : 'body1'}>
                    Master Your Finances with Our Intuitive Expense Tracker App Today!
                </Typography>
            </Box>

            <Box mt={2}>
                <Button 
                    variant='contained' 
                    color='primary' 
                    size='large' 
                    sx={{ borderRadius : 0}}
                    onClick={handleClick}
                >
                    Get Started
                </Button>
            </Box>
        </Box>
    </div>
  )
}
