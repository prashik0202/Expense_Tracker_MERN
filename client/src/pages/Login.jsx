import React, { useState } from 'react';
import {
    Box ,  
    Button , 
    TextField , 
    FormControl , 
    useMediaQuery, 
    Typography,
    OutlinedInput, 
    IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import {  toast } from 'react-toastify';
import validator from 'validator'
import { Link } from 'react-router-dom';

export default function Login() {

    const isNonMobile = useMediaQuery('(min-width : 600px)');

    const [ showPassword , setShowPassword ] = React.useState(false);

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ loading , setLoading ] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validator.isEmail(email)){
            toast.error('Please Enter valid email Id')
        }
        else if(password.length < 8){
            toast.error('Enter strong password')
        }
        else {
            toast.success('Submitted Successfully!')
            const data = {
                email,password
            }
            console.log(data);
            setEmail('');
            setPassword('');
            setLoading(true);
        }
    }   
    
    
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
                        <TextField 
                            variant='outlined' 
                            label="Email" 
                            margin='normal' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* <TextField variant='outlined' label="Password" margin='normal'></TextField> */}
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            placeholder='Password'
                            margin='normal'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button 
                            variant='contained' 
                            color='primary' 
                            sx={{ borderRadius : 0 , mt:2}} 
                            size='large'
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Login' }
                        </Button>
                    </FormControl>
                </Box>

                <Box mt={1} textAlign='center'>
                    <Typography variant='body1'>Don't have account? <Link to='/register'>SignUp</Link></Typography>
                </Box>
            </Box>
        </div>
    )
}
