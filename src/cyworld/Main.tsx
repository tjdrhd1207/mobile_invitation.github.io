import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './cyworld.css'
import CyworldApp from './CyworldApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CyworldApp />
  </StrictMode>
)
