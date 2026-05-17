import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Aquí pondremos la lógica para conectar con tu API en Contabo
    console.log("Enviando datos a Contabo:", { email, password })
    
    // Ejemplo de cómo sería la llamada (la afinaremos luego)
    // const response = await fetch('https://tu-api-en-contabo.com/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Gideon Studio</h1>
        <p>Inicia sesión en el sistema</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className="login-button">
            Entrar al Sistema
          </button>
        </form>
      </div>
    </div>
  )
}

export default App