import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6247AA',
      contrastText: 'white',
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
      disabled: 'white',
    },
    background: {
      default: '#FBFAFF',
      paper: '#ECE6F7',
    },
  },
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        height: '40px',
        borderRadius: '4px',
      },
      sizeLarge: {
        width: '382px',
      },
      sizeMedium: {
        width: '160px',
      },
    },
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          color: `${theme.palette.primary.main}`,
          borderColor: `${theme.palette.primary.main}`,
        },
      },
      {
        props: { variant: 'outlined', disabled: true },
        style: {
          color: `${theme.palette.text.secondary}!important`,
          borderColor: `${theme.palette.text.secondary}!important`,
        },
      },
      {
        props: { variant: 'contained', disabled: true },
        style: {
          backgroundColor: `${theme.palette.text.secondary}!important`,
          color: `${theme.palette.text.disabled}!important`,
        },
      },
    ],
  },
};
