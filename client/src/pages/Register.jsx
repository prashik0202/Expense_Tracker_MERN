import React from 'react';
import {
    Box , Container , Button , TextField , FormControl , useMediaQuery, Typography, Grid
} from '@mui/material';

export default function Register() {

    const isNonMobile = useMediaQuery('(min-width : 600px)');
    
    return (
        <div>
            {/* <Typography variant='h2'>Register</Typography> */}
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
                    <Typography variant='h4'>Register</Typography>
                </Box>


                <Box p={2}>
                    <FormControl fullWidth>
                        <TextField variant='outlined' label='Name' margin='normal'></TextField>
                        <TextField variant='outlined' label="Email" margin='normal'></TextField>
                        <TextField variant='outlined' label="Password" margin='normal' type='password'></TextField>
                        <Button variant='contained' color='primary' sx={{ borderRadius : 0 , mt:2}} size='large'>Register</Button>
                    </FormControl>
                </Box>

                <Box mt={1} textAlign='center'>
                    <Typography variant='body1'>Already have account? SignIn</Typography>
                </Box>
            </Box>
        </div>
    )
}
