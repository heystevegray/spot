import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#e9e9e9',
        },
        background: {
            default: '#000',
            paper: '#050505',
        },
    },
});

export default theme;
