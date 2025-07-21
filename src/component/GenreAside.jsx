import { useContext } from "react";
import '../css/GenreAside.css';
import { MediaProvider, useMediaContext } from '../context/MoviesContext.jsx';

function GenreAside() {
    const {currentGenreList, loading, setSelectedGenre} = useMediaContext();

    if (loading) {
        return null;
    }

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        console.log("clicked!", genre.name);
    };

    return(
        <div className="genre-aside">
        <h2 className="genre-title">Genres</h2>
        <ul className="genre-list">
            {currentGenreList.map((genre) => (
                <li key={genre.id} onClick={() => handleGenreClick(genre)}> {genre.name} </li>
            ))}
        </ul>
        </div>
    )
}

export default GenreAside;