import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../context/MoviesContext";
import Header from "../component/Header.jsx";
import GenreAside from "../component/GenreAside";
import MovieArea from "../component/MovieArea";
import "../css/Header.css";


function Home() {
    // const { movies, fetchMovies } = useContext(MovieContext);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const loadMovies = async () => {
    //     await fetchMovies();
    //     setLoading(false);
    //     };
    //     loadMovies();
    //     }, [fetchMovies]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
    <div className="home">
        <Header />
        <div className="content">
            <GenreAside />
            <MovieArea />
        </div>
    </div>
    );

}

export default Home;