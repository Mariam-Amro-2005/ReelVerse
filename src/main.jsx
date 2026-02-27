import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { MediaProvider } from './context/MoviesContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MediaProvider>
      <BrowserRouter basename="/ReelVerse">
        <App />
      </BrowserRouter>
    </MediaProvider>
  </StrictMode>,
)
