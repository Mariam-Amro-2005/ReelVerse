import React, { createContext, useContext, useState, useEffect } from 'react';


const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const REACT_APP_TMDB_API_URL="https://api.themoviedb.org/3/";
    const REACT_APP_TMDB_API_KEY=process.env.REACT_APP_TMDB_API_KEY;

    const apiUrl = REACT_APP_TMDB_API_URL;
    const apiKey = REACT_APP_TMDB_API_KEY;
    const baseImageUrl = 'https://image.tmdb.org/t/p/original';

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);


    return (
      <MoviesContext.Provider value={{ movies, genres, baseImageUrl, apiUrl, apiKey }}>
        {children}
      </MoviesContext.Provider>
    );
};

export const useMovies = () => useContext(MoviesContext);
export default MoviesContext;
