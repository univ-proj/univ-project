import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { theme } from '@univ-project/ui';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { UserProvider } from './app/context/userContext';

ReactDOM.render(
  <IonApp>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </IonApp>,
  document.getElementById('root')
);
