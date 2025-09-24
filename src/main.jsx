import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartContextProvider } from './Context/cartContext.jsx'
import { AuthContextProvider } from './Context/auth.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
     
    </CartContextProvider>
   
  </StrictMode>,
)
