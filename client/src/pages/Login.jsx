import React from 'react';
import {
    Box , Container , Button , TextField , FormControl , useMediaQuery, Typography, Grid
} from '@mui/material';

export default function Login() {

    const isNonMobile = useMediaQuery('(min-width : 600px)');
    
    return (
        <div>
            {/* <Typography variant='h2'>Login</Typography> */}
            <Box 
                marginTop={isNonMobile ? 25 : 20}
                py={2}
                px={1}
                maxWidth={500}
                mx={isNonMobile ? 'auto' : 1}
                sx={{ borderRadius : 1}}
                backgroundColor='rgba(238,238,238,0.4)'
            >
                <Box textAlign='center' p={1}>
                    <Typography variant='h4'>Login</Typography>
                </Box>


                <Box p={2}>
                    <FormControl fullWidth>
                        <TextField variant='outlined' label="Email" margin='normal'></TextField>
                        <TextField variant='outlined' label="Password" margin='normal'></TextField>
                        <Button variant='contained' color='primary' sx={{ borderRadius : 0 , mt:2}} size='large'>Login</Button>
                    </FormControl>
                </Box>

                <Box mt={1} textAlign='center'>
                    <Typography variant='body1'>Don't have account? SignUp</Typography>
                </Box>
            </Box>
        </div>
    )
}
