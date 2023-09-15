import React, { useState } from 'react';
import {
    Box , Container , Button , TextField , FormControl , useMediaQuery, Typography, OutlinedInput, IconButton
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';

// importing Spinner:
import Spinner from '../components/Spinner';

export default function Register() {

    // for mobile responsive design
    const isNonMobile = useMediaQuery('(min-width : 600px)');

    // for showpassword and hide password functionality
    const [ showPassword , setShowPassword ] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    // form data state:
    const  [ formData , setFormData ] = useState({
        name : '',
        email : '',
        password : ''
    })

    const { name , email ,password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const [ Loading , setLoading ] = useState(false);

    if(Loading){
        return <Spinner/>
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
                            // state part:
                            name='name'
                            value={name}
                            onChange={onChange}
                        />
                        
                        <TextField 
                            variant='outlined' 
                            label="Email"
                            // state part:
                            name = 'email'
                            value={email}
                            onChange={onChange}
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
                            onChange={onChange}
                        />
                        <Button variant='contained' color='primary' sx={{ borderRadius : 0 , mt:2}} size='large'
                            
                        >Register</Button>
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
