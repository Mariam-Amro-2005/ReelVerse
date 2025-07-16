import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { MediaProvider } from './context/MoviesContext.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MediaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MediaProvider>
  </StrictMode>,
)
