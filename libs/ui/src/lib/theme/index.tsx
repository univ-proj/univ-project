import { createTheme } from '@mui/material/styles';
// import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6247AA',
    },
    secondary: {
      main: '#EAC504',
    },
    error: {
      main: '#C10000',
      contrastText: '#F25B5B',
    },
    success: {
      main: '#4BAE4F',
      contrastText: '#C0FFC3',
    },
    text: {
      primary: '#6247AA',
      secondary: '#8372B4',
    },
    background: {
      default: '#FBFAFF',
      paper: '#ECE6F7',
    },
  },
});
