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
        <Route path="/:type/:id" element={<MovieDetailsWrapper />} />
      </Routes>
    </>
  )
}

function MovieDetailsWrapper() {
  // const { id } = useParams(); // import useParams from react-router-dom

  return (
    <MediaDetailsProvider>
      <MoviePage />
    </MediaDetailsProvider>
  );
}

export default App

// <MediaDetailsProvider><MoviePage /></MediaDetailsProvider>