import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../slices/auth/userApiSlice";
import { logout } from "../slices/auth/authSlice";
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useLogoutMutation();

  const logoutHandler = async() => {
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    }catch(err){
      console.log(err);
    }
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Money Tracker
      </Typography>
        {userInfo ? (<Typography variant='body1'>{userInfo.name}</Typography>) : (null) }
      <Divider />
      
      <List>
      {
        userInfo ? (
          <ListItem  disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={logoutHandler}>
            <ListItemText primary='logout' />
          </ListItemButton>
          
        </ListItem>
        ) : (
          <ListItem  disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/login')}>
            <ListItemText primary='Login' />
          </ListItemButton>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/register')}>
            <ListItemText primary='Register' />
          </ListItemButton>
        </ListItem>
        )
      }
        
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color='background' elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to='/'
            sx={{ flexGrow: 1, display: { sm: 'block' } , textDecoration : 'none', color : 'white' }}
          >
            Money Track
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {
              userInfo ? (
                <Box sx={{ display : 'flex'}}>
                  <Typography variant='h5'>Welcome! {userInfo.name}</Typography>
                  <Button variant='contained' onClick={logoutHandler} color='error' sx={{ ml : 2}}>Logout</Button>
                </Box>
                
              ) : (
                <>
                  <Button   sx={{ mx : 0.5 , color : 'white'}}  component={Link} to='/login'>
                    Login
                  </Button>
                  <Button   sx={{ mx : 0.5 , color : 'black'}} variant='contained' component={Link} to='/register'>
                    Regiser
                  </Button>
                </>
              )
            }
              
            {/* <IconButton color='secondary' >
              <CallIcon />
            </IconButton> */}
            
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}


export default Header;