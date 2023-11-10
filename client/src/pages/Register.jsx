import React, { useState } from 'react';
import {
    Box , TextField , Button, FormControl , useMediaQuery, Typography, OutlinedInput, IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import validator from 'validator'

export default function Register() {

    // for mobile responsive design
    const isNonMobile = useMediaQuery('(min-width : 600px)');

    // for showpassword and hide password functionality
    const [ showPassword , setShowPassword ] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const [ loading , setLoading ] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name.length > 10){
            toast.error('Please enter short name')
        }
        else if(!validator.isEmail(email)){
            toast.error('Please Enter valid email Id')
        }
        else if(password.length < 8){
            toast.error('Enter strong password')
        }
        else {
            toast.success('Submitted Successfully!')
            const data = {
                name,email,password
            }
            console.log(data);
            setName('');
            setEmail('');
            setPassword('');
            setLoading(true);
        }
        
    }


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
                    <form >
                    <FormControl fullWidth>
                        <TextField 
                            variant='outlined' 
                            label='Name' 
                            margin='normal'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        
                        <TextField 
                            variant='outlined' 
                            label="Email"
                            name = 'email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
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
                            // label="Password"
                            placeholder='Password'
                            sx={{ mt : 1}}
                            name='password'
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
                            {loading ? 'Loading...': 'Register' } 
                        </Button>
                    </FormControl>
                    </form>
                </Box>

                <Box mt={1} textAlign='center'>
                    <Typography variant='body1'>Already have account? <Link to='/login'>SignIn</Link></Typography>
                </Box>
            </Box>
        </div>
    )
}
