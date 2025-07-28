import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useMediaDetailsContext} from "../context/MediaDetailsContext";
import { Link } from 'react-router-dom';

function RecommendedMovies() {
    const { id, type } = useParams();
    const { changeMediaID, changeSelectedMediaType, recommendations } = useMediaDetailsContext();
    useEffect(() => {
            if (id && type) {
                changeMediaID(Number(id));
                changeSelectedMediaType(type);
            }
        }, [id, type]);

    return(
        <div className="recommendation">
            <h3 className="rec-title">Recommended for You:</h3>
            <div className="recommendations-panel">
                {recommendations.map((recommendation) => (
                <Link to={`/${type}/${recommendation.id}`} key={recommendation.id}>
                    <div className="rec-card">
                        <div className="card-image">
                            <img
                                loading="lazy" 
                                src={`https://image.tmdb.org/t/p/w342${recommendation.poster_path}`} 
                                alt={recommendation?.title || recommendation?.name || "No Title"} 
                            />
                        </div>
                        <div className="media-title">
                            {recommendation?.title || recommendation?.name || "No Title"}
                        </div>
                    </div>
                </Link>
            ))}

            </div>
        </div>
    )
}

export default RecommendedMovies;
