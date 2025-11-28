import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/login'
import App from './components/login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
