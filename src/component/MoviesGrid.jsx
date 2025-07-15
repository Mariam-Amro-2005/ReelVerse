import React from "react";
import MovieCard from "./MovieCard";
import { useMovies } from "../context/MoviesContext";

function MoviesGrid() {
    const { movies } = useMovies();

    return(
        <div className="movies-grid">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MoviesGrid;