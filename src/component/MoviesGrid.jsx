import MovieCard from "./MovieCard";
import { useState, useEffect } from 'react'
import { useMediaContext } from '../context/MoviesContext.jsx';
import '../css/MoviesGrid.css';


function MoviesGrid() {
    const {loading, mode, currentMediaList, selectedMediaType, toggleMediaType} = useMediaContext();
    const [medialist, setMediaList] = useState(currentMediaList);

    useEffect(() => {
        setMediaList(currentMediaList);
    }, [currentMediaList, mode])

    return(
        <div className="movies-grid">
            {medialist.map((media) => (
                <MovieCard key={media.id} movie={media} />

            ))}
        </div>
    )
}

export default MoviesGrid;