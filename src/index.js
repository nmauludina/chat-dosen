import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import { Button, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
}


ReactDOM.render(
    <SnackbarProvider
        maxSnack={1}
        ref={notistackRef}
        action={(key) => (
            <Button onClick={onClickDismiss(key)} style={{ color: 'white', fontWeight: 'bold' }}>
                Dismiss
            </Button>
        )}
    >

        <AppBar position="static" style={{ padding: 0 }}>
            <Toolbar>
                <Typography variant="h4">
                    Chat Dosen App
                    </Typography>
            </Toolbar>
        </AppBar>
        <App />


    </SnackbarProvider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
