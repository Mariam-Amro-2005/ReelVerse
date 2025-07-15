import React from "react";
import '../css/GenreAside.css';

async function fetchGenres() {
    // Replace
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY");
    const data = await response.json();
    console.log(data);
}

function GenreAside() {
    return(
        <div className="genre-aside">
        <h2 className="genre-title">Genres</h2>
        <ul className="genre-list">
            <li onClick={() => fetchGenres("Action")}>Action</li>
            <li onClick={() => fetchGenres("Comedy")}>Comedy</li>
            <li onClick={() => fetchGenres("Drama")}>Drama</li>
            <li onClick={() => fetchGenres("Fantasy")}>Fantasy</li>
            <li onClick={() => fetchGenres("Horror")}>Horror</li>
            <li onClick={() => fetchGenres("Romance")}>Romance</li>
        </ul>
        </div>
    )
}

export default GenreAside;