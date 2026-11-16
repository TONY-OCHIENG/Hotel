import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AutomaticScroll from './components/AutomaticScroll.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AutomaticScroll/>
     <App/>
    </BrowserRouter>
  </StrictMode>,
)
