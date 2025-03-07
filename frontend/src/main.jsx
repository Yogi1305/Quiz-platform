import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


// export const Baseurl='http://localhost:8000';
export const Baseurl='https://quiz-platform-rju6.onrender.com';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
