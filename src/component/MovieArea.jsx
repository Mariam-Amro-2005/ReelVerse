import React, { use } from "react";
import { useState, useEffect } from "react";
// import { useMovies } from "../context/MoviesContext";
import MoviesGrid from "./MoviesGrid";
import '../css/MovieArea.css'

function MovieArea() {
    const [mediaSelected, setMediaSelected] = useState('Movies');

    useEffect(() => {
        //Switch media type based on selection
    }, [mediaSelected]);

    return(
        <div className="movie-area">
            <div className="movie-header">{mediaSelected}</div>
            <div className="filters">
                <div className="order-by">
                    <label htmlFor="orderBy">Order by</label>
                    <select id="orderBy">
                        <option value="release_date">Release Date</option>
                        <option value="popularity">Popularity</option>
                </select>
                </div>

                <div className="language-filter">
                    <label htmlFor="languageFilter">Language filter</label>
                    <select id="languageFilter">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>
            </div>
            
            <MoviesGrid />
            
        </div>
    )
}

export default MovieArea;

// language filter done by checking if language is present
//  in the spoken_languages attribute of movie details using 
// .includes() method

// order by done by checking if the movie is in the
// movies array and then sorting it by release date or popularity

// need to populate the movies array with data from the API
// using the useMovies context to get the movies and genres