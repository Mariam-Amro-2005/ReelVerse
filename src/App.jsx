import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import {Link} from "react-router-dom";
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>Movies App</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </>
  )
}

export default App
