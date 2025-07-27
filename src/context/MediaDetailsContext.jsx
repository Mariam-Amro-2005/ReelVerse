import { createContext , useState, useEffect, useContext, useRef } from "react";

const MediaDetailsContext = createContext();
export const useMediaDetailsContext = () => useContext(MediaDetailsContext);

const apikey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;

export const MediaDetailsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [mediaID, setMediaID] = useState(552524); // make 0 later
    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [genres, setGenres] = useState([]);
    const [popularity, setPopularity] = useState(0);
    const [releaseDate, setReleaseDate] = useState(null);
    const [runtime, setRuntime] = useState(0);
    const [overview, setOverview] = useState("");
    const [homePage, setHomePage] = useState(null);
    const [backdrop, setBackdrop] = useState("");
    const [poster, setPoster] = useState("");
    const [mediaDetails, setMediaDetails] = useState();
    const [recommendations, setRecommendations] = useState([]);
    
    const [selectedMediaType, setSelectedMediaType] = useState("movie");

    const changeMediaID = (newId) => {
        setMediaID(newId);
    }

    const changeSelectedMediaType = (newType) => {
        setSelectedMediaType(newType);
    }
    
    const fetchMediaDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/${selectedMediaType}/${mediaID}?api_key=${apikey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("details: ", data);
            setMediaDetails(data);
            setTitle(data?.title || data?.name);
            setTagline(data.tagline);
            setGenres(data.genres);
            setPopularity(data.popularity);
            setReleaseDate(data.release_date);
            setRuntime(data?.runtime || data?.episode_runtime);
            setOverview(data.overview);
            setHomePage(data.homepage);
            setBackdrop(data.backdrop_path);
            setPoster(data.poster_path);
        } catch (error) {
            console.error("Failed to fetch media details:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/${selectedMediaType}/${mediaID}/recommendations?api_key=${apikey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecommendations(data.results);
            console.log("recs: ", data);
        } catch (error) {
            console.error("Failed to fetch media details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        Promise.all([fetchMediaDetails(), fetchRecommendations()]);
    }, [mediaID, selectedMediaType])

    return (
        <MediaDetailsContext.Provider value={{ loading, mediaID, selectedMediaType, recommendations, 
                                                changeMediaID, changeSelectedMediaType, 
                                                mediaDetails, setMediaDetails,title, 
                                                tagline, genres, popularity, releaseDate,
                                                runtime, overview, homePage, backdrop, poster }}>
            {children}
        </MediaDetailsContext.Provider>
    );
}