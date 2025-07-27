import '../css/MoviesGrid.css';
import { Link } from 'react-router-dom';

function RecommendationCard({movie, type}) {

    return(
        <Link to={`/${type}/${movie.id}`}>
            <div className="movie-card">
                <div className="card-image">
                    <img 
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                        alt={movie?.title || movie?.name} 
                    />
                </div>
                <div className="media-title">
                    {movie?.title || movie?.name}
                </div>
            </div>
        </Link>
    )
}

export default RecommendationCard;