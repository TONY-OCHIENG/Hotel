import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AutomaticScroll from './components/AutomaticScroll.tsx'
import TitleUpdater from './components/TitleUpdater.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <TitleUpdater/>
    <AutomaticScroll/>
     <App/>
    </BrowserRouter>
  </StrictMode>,
)
