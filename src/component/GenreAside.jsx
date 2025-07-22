import '../css/GenreAside.css';
import { useState, useEffect } from 'react';
import { useMediaContext } from '../context/MoviesContext.jsx';

function GenreAside() {
    const {currentGenreList, loading, setSelectedGenre, setMode} = useMediaContext();
    const [genreList, setGenreList] = useState(currentGenreList);

    useEffect(()=> {
        setGenreList(currentGenreList);
    }, [currentGenreList])

    if (loading) {
        return null;
    }

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        setMode('genre');
    };


    return(
        <div className="genre-aside">
        <h2 className="genre-title">Genres</h2>
        <ul className="genre-list">
            {genreList.map((genre) => (
                <li key={genre.id} onClick={() => handleGenreClick(genre)}> {genre.name} </li>
            ))}
        </ul>
        </div>
    )
}

export default GenreAside;