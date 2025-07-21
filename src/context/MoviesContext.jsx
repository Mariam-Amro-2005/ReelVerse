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

    const [selectedMedia, setSelectedMedia] = useState(null);   // selected movie or TV show
    // const [selectedMediaId, setSelectedMediaId] = useState(null); // ID of the selected movie or TV show
    // const [selectedMediaDetails, setSelectedMediaDetails] = useState(null); // Details of the selected movie or TV show
    const [selectedGenre, setSelectedGenre] = useState(null); // Selected genre
    const [currentPage, setCurrentPage] = useState(1);
    const [currentMediaList, setCurrentMediaList] = useState([]); // List of movies or TV shows for the current page
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
    
    const fetchMediaByGenre = async () => {
        const genreId = selectedGenre?.id;
        if (!genreId) return;
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/discover/${selectedMediaType}?api_key=${apikey}&include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_genres=${genreId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
            setCurrentMediaList(data.results || []);
        } catch (error) {
            console.error("Failed to fetch media by genre:", error);
        } finally {
            setLoading(false);
        }
    }

    // Set search query
    const setSearchQueryHandler = (query) => {
        setSearchQuery(query);
    }

    // Search media by query
    const searchMedia = async () => {
        query = searchQuery.trim();
        if (!query) {
            setSearchResults([]);
            return;
        }
        setLoading(true); // Need to implement skeleton loading
        // Fetch search results from TMDB API
        try {
            const response = await fetch(`${apiUrl}/search/${selectedMediaType}?api_key=${apikey}&query=${encodeURIComponent(query)}&include_adult=false`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error("Failed to search media:", error);
        } finally {
            setLoading(false);
        }

        // Setting search results to current media list
        setCurrentMediaList(searchResults);
    };

    const filterMedia = () => {
        // use discover method from TMDB API to filter media by genre, release date, etc.
        // Receive object with filters and apply them to the current media list
        // This function will be implemented later
    }

    // Change page for pagination + or -
    const changePage = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }

    // Fetch trending content and genres on initial load
    useEffect(() => {
        Promise.all([fetchTrendingContent(), fetchGenres()]);
    }, []);
    
    // Fetch trending content and genres when media type changes
    useEffect(() => {
        if ((selectedMediaType === 'movie' && !movieGenres.length) || (selectedMediaType === 'tv' && !tvGenres.length)) {
            Promise.all([fetchTrendingContent(), fetchGenres()]);
        }
    }, [selectedMediaType]);

    // Fetch media by genre when selected genre changes
    useEffect(() => {
        if (selectedGenre) {
            fetchMediaByGenre();
        }
    }, [selectedGenre]);

    // Fetch search results when search query changes
    useEffect(() => {
        if (searchQuery) {
            searchMedia();
        }
        else {
            setSearchResults([]);
            setCurrentMediaList([]);
        }
    }, [searchQuery]);

    return (
        <MediaContext.Provider value={{ toggleMediaType, trendingMovies, movieGenres, trendingTvShows, tvGenres, selectedMediaType, loading, currentMediaList, totalResults, totalPages, selectedGenre, changePage, setSearchQueryHandler }}>
            {children}
        </MediaContext.Provider>
    );
}


// To do list:
// 1. implement useEffect for when media list changes
// 3. Implement media details fetching
// 4. Implement media selection and details display
// 5. Implement genre selection functionality

// Finished:
// 1. Implement search functionality *
// 2. Implement pagination for media lists
// 3. Implement trigger for searchMedia fn
