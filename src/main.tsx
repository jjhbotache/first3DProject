import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles.css"
import Footer from './components/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <h1 className='title'>Popular Microcontrollers</h1>
    <App />
    <Footer />
  </>,
)
