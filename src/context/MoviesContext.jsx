import { createContext , useState, useEffect, useContext } from "react";

const MediaContext = createContext();
export const useMediaContext = () => useContext(MediaContext);

const apikey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;

export const MediaProvider = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [selectedMediaType, setSelectedMediaType] = useState('movie');
    const [loading, setLoading] = useState(true);

    const toggleMediaType = () => {
        setSelectedMediaType(prevType => (prevType === 'movie' ? 'tv' : 'movie'));
    };


    const fetchTrendingContent = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/trending/${selectedMediaType}/day?api_key=${apikey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (selectedMediaType === 'movie') {
                setTrendingMovies(data.results || []);
            } else if (selectedMediaType === 'tv') {
                setTrendingTvShows(data.results || []);
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchGenres = async () => {
        try {
            const response = await fetch(`${apiUrl}/genre/${selectedMediaType}/list?api_key=${apikey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (selectedMediaType === 'movie') {
                setMovieGenres(data.genres || []);
            } else if (selectedMediaType === 'tv') {
                setTvGenres(data.genres || []);
            }
        } catch (error) {
            console.error("Failed to fetch genres:", error);
        }
    };

    // Fetch trending content and genres on initial load
    useEffect(() => {
        Promise.all([fetchTrendingContent(), fetchGenres()]);
    }, []);
    
    useEffect(() => {
        if ((selectedMediaType === 'movie' && !movieGenres.length) || (selectedMediaType === 'tv' && !tvGenres.length)) {
            Promise.all([fetchTrendingContent(), fetchGenres()]);
        }
    }, [selectedMediaType]);

    return (
        <MediaContext.Provider value={{ trendingMovies, movieGenres, trendingTvShows, tvGenres, selectedMediaType, loading }}>
            {children}
        </MediaContext.Provider>
    );
}