import { useState, useEffect } from "react";
import { useMediaContext } from '../context/MoviesContext.jsx';
import MoviesGrid from "./MoviesGrid";
import Pagination from "./Pagination.jsx"
import '../css/MovieArea.css'

function MovieArea() {
    const {loading, mode, currentMediaList, selectedMediaType, toggleMediaType, changePage} = useMediaContext();

    const [mediaSelected, setMediaSelected] = useState(selectedMediaType === 'movie' ? 'Movies': 'TV Shows');
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(prev => !prev);
        toggleMediaType();
        console.log(isActive);
    };

    useEffect(() => {
        setMediaSelected(selectedMediaType === 'movie' ? 'Movies': 'TV Shows');
    }, [selectedMediaType, mode, currentMediaList]);

    return(
        <div className="movie-area">
            <div className="movie-header">
                <div className="title">{mediaSelected}</div>
                <div className="toggle-wrapper">
                    <div className="labels">
                        <div>Movies</div>
                        <div>Tvs</div>
                    </div>
                    <div className="toggle">
                        <div className={`toggle-button ${isActive ? "toggle-active" : ""}`}  onClick={()=> handleToggle()} ></div>
                    </div>
                </div>
            </div>
            <div className="filters">Filters
            </div>
            
            <MoviesGrid />
            <Pagination />

        </div>
    )
}

export default MovieArea;
