import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Paso 1. Importar el BrowserRouter de react-router-dom
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import RoutesIndex from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  // Paso 2. Envolvemos la App con el BrowserRouter. Indicando que se usara react-router
  <BrowserRouter>
    <StrictMode>
      <RoutesIndex />
    </StrictMode>,
  </BrowserRouter>,
)
