import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useMediaDetailsContext} from "../context/MediaDetailsContext";

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

    return(
        <div className="movie-details">
            <a href={`${homePage}`}></a>
            <div className="movie-info">
                <div className="text">
                    <div className="title">{title}</div>
                    <div className="extra-info">
                        <div className="popularity">{popularity}</div>
                        <div className="release-date">{releaseDate}</div>
                        <div className="runtime">{runtime}</div>
                        <div className="genres">
                            {genres.map((genre) => (
                                <div key={genre.id}>{genre.name}</div>
                            ))}
                        </div> {/*need to deal with list*/}
                    </div>
                    <div className="overview">{overview}</div>
                </div>

                <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w342${poster}`} alt={`${capType} Poster`} />
                    <div className="tagline">{tagline}</div>
                </div>
                
            </div>
            <div className="movie-backdrop">
                <img src={`https://image.tmdb.org/t/p/w342${backdrop}`} alt={`${capType} Backdrop`} />
            </div>

        </div>
    )
}

export default MovieDetails;