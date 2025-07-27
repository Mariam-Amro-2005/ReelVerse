import { useParams } from "react-router-dom";
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import MovieDetails from "../component/MovieDetails.jsx";
// import RecommendedMovies from "../component/RecommendedMovies.jsx";
import "../css/Header.css";
import "../css/MediaPage.css";



function MoviePage() {
    const { id, type } = useParams();

    return (
        <div className="movie-page">
            <Header />
            <div className="content">
                <MovieDetails />
            </div>
            <Footer />

        </div>
    );
}

export default MoviePage;  