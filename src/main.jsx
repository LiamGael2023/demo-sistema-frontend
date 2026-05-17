import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. Primero cargamos Tabler (Obligatorio para que los inputs y botones se vean bien)
import '@tabler/core/dist/css/tabler.min.css';
import '@tabler/icons-webfont/dist/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

// 2. Luego cargamos tus estilos personalizados
import './login.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)