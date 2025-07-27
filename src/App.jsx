import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'
import {MediaDetailsProvider} from "./context/MediaDetailsContext.jsx";
import { useParams } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:type/:id" element={<MediaDetailsProvider><MoviePage /></MediaDetailsProvider>} />
      </Routes>
    </>
  )
}


export default App
