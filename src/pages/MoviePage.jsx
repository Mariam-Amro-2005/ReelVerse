import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {useMediaDetailsContext} from "../context/MediaDetailsContext";
import Header from "../component/Header.jsx";
import "../css/Header.css";


function MoviePage() {
    const { id, type } = useParams();

    return (
        <div className="movie-page">
            <Header />
            <div className="content">
                <div>{type} id: {id}</div>
            </div>
        </div>
    );
}

export default MoviePage;  