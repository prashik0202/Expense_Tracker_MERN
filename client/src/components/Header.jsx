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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const drawerWidth = 240;
// const navItems = ['Login' , 'Register'];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MoneyTrack
      </Typography>
      <Divider />
      <List>
        
        <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Login' />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Register' />
            </ListItemButton>
        </ListItem>
     
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0} color='transparent'>
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
                component="div"
                sx={{ flexGrow: 1, display: {  sm: 'block' } , fontWeight : 'bold' }}
            >
                MoneyTrack
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                
                <Button color='primary' sx={{ fontWeight : 'bold' , borderRadius : 0}} elevation={0}>
                    Login
                </Button>
                
                <Button color='primary' variant='contained' sx={{ borderRadius : 0}} elevation={0}>
                    Register
                </Button>
                
            </Box>
        </Toolbar>
        </AppBar>
        <Box component="nav">
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
      </Box>
    </Box>
  );
}


export default Header;
