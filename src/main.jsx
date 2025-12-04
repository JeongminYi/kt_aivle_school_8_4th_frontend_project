import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Test from './components/Test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
    <Test/>
  </StrictMode>,
)
