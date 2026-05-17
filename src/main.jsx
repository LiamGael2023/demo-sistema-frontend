import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importaciones de Tabler obligatorias
import '@tabler/core/dist/css/tabler.min.css';
import '@tabler/icons-webfont/dist/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)