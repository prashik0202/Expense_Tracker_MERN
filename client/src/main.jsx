import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {theme}  from './theme.js';
import { ThemeProvider } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <ThemeProvider theme={theme}> 
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
