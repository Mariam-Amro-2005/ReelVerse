import { useState, useEffect } from 'react'
import '../css/MoviesGrid.css';
import { Link } from 'react-router-dom';

function MovieCard({movie, type}) {
    const [liked, setLiked] = useState(false);
    // const [likedPicUrl, setLikedPicUrl] = useState(`${import.meta.env.BASE_URL}/icons8-heart-50.png`);
    const [likedPicUrl, setLikedPicUrl] = useState("/icons8-heart-50.png");

    const handleLike = () => {
        setLiked(prev => !prev);
        setLikedPicUrl(liked === true ? "/icons8-heart-yellow-50.png" : "/icons8-heart-50.png")
    }


    useEffect(() => {
        setLikedPicUrl(liked === true ? "/icons8-heart-yellow-50.png" : "/icons8-heart-50.png")
    }, [liked]);


    return(
        <Link to={`/${type}/${movie.id}`}>
            <div className="movie-card">
                <div className="card-image">
                    <img 
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                        alt={movie?.title || movie?.name} 
                    />
                </div>
                <div className="card-info">
                    <h3 className="media-title">{movie?.title || movie?.name}</h3>
                    <div className="card-bottom">
                        <p className="media-vote">⭐ {movie.vote_average}</p>
                        <img className="like-button" src={likedPicUrl} onClick={handleLike}></img>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;