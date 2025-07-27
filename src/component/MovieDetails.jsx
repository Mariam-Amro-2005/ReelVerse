import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useMediaDetailsContext} from "../context/MediaDetailsContext";
import RecommendedMovies from "../component/RecommendedMovies.jsx";


function MovieDetails() {
    const { id, type } = useParams();
    const { changeMediaID, changeSelectedMediaType, title, tagline, genres, 
            popularity, releaseDate, runtime, overview, homePage,
            backdrop, poster} = useMediaDetailsContext();

    useEffect(() => {
        if (id && type) {
            changeMediaID(Number(id));
            changeSelectedMediaType(type);
        }
    }, [id, type]);
    const capType = type.charAt(0).toUpperCase() + type.slice(1) ;

    const imgStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
};


    return(
        <div className="movie-items">
            <div className="movie-details">
                <div className="movie-backdrop">
                    <img src={`https://image.tmdb.org/t/p/w500${backdrop}`} alt={`${capType} Backdrop`} />
                </div>
                
                <div className="movie-info">
                    <div className="text">
                        <h2 className="title">{title}</h2>
                        <div className="extra-info">
                            <div className="popularity">Popularity: {popularity}</div>
                            <div className="release-date">Release Date: {releaseDate}</div>
                            <div className="runtime">Runtime: {runtime} mins</div>
                            <div className="genres">
                                Genres:
                                {genres.map((genre) => (
                                    <div className="genre" key={genre.id}>{genre.name}</div>
                                ))}
                            </div> {/*need to deal with list*/}
                        </div>
                        <div className="overview">{overview}</div>
                    </div>
                    
                    <a href={`${homePage}`}>
                        <div className="poster">
                            <img src={`https://image.tmdb.org/t/p/w342${poster}`} alt={`${capType} Poster`} />
                            <div className="tagline">{tagline}</div>
                        </div>
                    </a>
                </div>
            </div>
            <RecommendedMovies />
        </div>
    )
}

export default MovieDetails;