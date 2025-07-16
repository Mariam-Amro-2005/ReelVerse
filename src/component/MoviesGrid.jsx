import React from "react";
import MovieCard from "./MovieCard";
// import { useMedia } from "../context/MoviesContext";

function MoviesGrid() {
    // const { state } = useMedia();
    // const { movies } = state;

    return(
        <div className="movies-grid">
            {/* {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))} */}
        </div>
    )
}

export default MoviesGrid;