import { createTheme } from '@mui/material';

export const theme = createTheme({
    listItemText:{
        fontSize:'2em',//Insert your required size
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#eeeeee',
        },
        secondary: {
            main: '#03a9f4',
        },
        divider: 'rgba(228,222,222,0.12)',
        background: {
            default: '#212121',
        },
        text: {
            primary: '#fafafa',
        },
    },
    typography : {
        fontFamily : [
            'IBM Plex Sans'
        ].join(',')
    }
});