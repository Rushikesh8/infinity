import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles/styles.scss";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <Toaster/>
    <App />
    </MantineProvider>
  </React.StrictMode>,
)
