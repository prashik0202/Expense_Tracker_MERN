import { createTheme } from '@mui/material';

export const theme = createTheme({
    listItemText:{
        fontSize:'2em',//Insert your required size
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#161616',
        },
        secondary: {
            main: '#3fd4d7',
        },
        divider: 'rgba(228,222,222,0.12)',
        background: {
            default: '#eaeaea',
        },
        text: {
            primary: 'rgba(43,43,43,0.87)',
        },
    },
    typography : {
        fontFamily : [
            'IBM Plex Sans'
        ].join(',')
    }
});