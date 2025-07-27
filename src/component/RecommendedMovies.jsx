import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useMediaDetailsContext} from "../context/MediaDetailsContext";
import { Link } from 'react-router-dom';
// import RecommendationCard from "./RecommendationCard.jsx"
// import '../css/MoviesGrid.css';

function RecommendedMovies() {
    const { id, type } = useParams();
    const { changeMediaID, changeSelectedMediaType, recommendations } = useMediaDetailsContext();
    useEffect(() => {
            if (id && type) {
                changeMediaID(Number(id));
                changeSelectedMediaType(type);
                console.log("check: ",recommendations);

            }
        }, [id, type]);

    return(
        <div className="recommendations-panel">
            {recommendations.map((recommendation) => (
                <Link to={`/${type}/${recommendation.id}`} key={recommendation.id}>
                    <div className="movie-card">
                        <div className="card-image">
                            <img 
                                src={`https://image.tmdb.org/t/p/w342${recommendation.poster_path}`} 
                                alt={recommendation?.title || recommendation?.name} 
                            />
                        </div>
                        <div className="media-title">
                            {recommendation?.title || recommendation?.name}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RecommendedMovies;

// {recommendations.map((recommendation) => {
//                <RecommendationCard movie={recommendation} type={type} />
//            })}

// no need for pagination, just make panel slide. overflow hidden, overflow y= scroll