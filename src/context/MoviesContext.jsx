import { createContext , useState, useEffect, useContext, useRef } from "react";

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

    const [selectedGenre, setSelectedGenre] = useState(null); // Selected genre
    const [currentPage, setCurrentPage] = useState(1);
    const [currentMediaList, setCurrentMediaList] = useState([]); // List of movies or TV shows for the current page
    const [currentGenreList, setCurrentGenreList] = useState([]); // List of movies or TV shows for the current page
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const [mode, setMode] = useState('trending'); // 'search' | 'genre' | 'trending'
    
    const prevMode = useRef(''); // 'search' | 'genre' | 'trending'
    const prevGenre = useRef(null); // Selected genre
    const prevSearchQuery = useRef('');

    const [filter, setFilter] = useState({}); // Object to hold filter criteria for media

    const toggleMediaType = () => {
        setSelectedMediaType(prevType => (prevType === 'movie' ? 'tv' : 'movie'));
    };

    const fetchTrendingContent = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/trending/${selectedMediaType}/day?api_key=${apikey}&page=${currentPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (selectedMediaType === 'movie') {
                setTrendingMovies(data.results || []);
            } else if (selectedMediaType === 'tv') {
                setTrendingTvShows(data.results || []);
            }
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
            setCurrentMediaList(data.results || []); // Set current media list to trending Movies/TV shows
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
            setCurrentGenreList(data.genres || []);
            // console.log(currentGenreList);
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
        const query = searchQuery.trim();
        if (!query) {
            setSearchResults([]);
            return;
        }
        setLoading(true); // Need to implement skeleton loading
        // Fetch search results from TMDB API
        try {
            const response = await fetch(`${apiUrl}/search/${selectedMediaType}?api_key=${apikey}&page=${currentPage}&query=${encodeURIComponent(query)}&include_adult=false`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchResults(data.results || []);
            setCurrentMediaList(data.results || []); // Setting search results to current media list
            setTotalResults(data.total_results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Failed to search media:", error);
        } finally {
            // Resetting pagination,genre, total results and pages
            
            setSelectedGenre(null);
            setLoading(false);
        }

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

    // Mode management
    useEffect(() => {
        setCurrentPage(1); // Reset to first page when mode changes
        prevMode.current = mode; // Update previous mode 
    }, [mode])

    // Search media when search query or page changes
    useEffect(() => {
        if (mode !== 'search') return;
        const page = prevSearchQuery.current === searchQuery ? currentPage : 1;
        setCurrentPage(page);
        searchMedia();
        prevSearchQuery.current = searchQuery; // Update previous search query
    }, [mode, selectedMediaType, searchQuery, currentPage])

    // Fetch media content when genre or page changes
    useEffect(() => {
        // console.log("clicked!", selectedGenre);
        if (mode !== 'genre') return;
        const page = prevGenre.current === selectedGenre ? currentPage : 1;
        setCurrentPage(page);
        fetchMediaByGenre();
        prevGenre.current = selectedGenre; // Update previous genre
    }, [mode, selectedMediaType, selectedGenre, currentPage])

    // Fetch trending content and genres when media type changes
    useEffect(() => {
        if (mode !== 'trending') return;
        const needsGenres = selectedMediaType === 'movie' ? !movieGenres.length : !tvGenres.length;
        const needsTrending = selectedMediaType === 'movie' ? !trendingMovies.length : !trendingTvShows.length;
        if (needsGenres || needsTrending) {
            Promise.all([fetchTrendingContent(), fetchGenres()]);
        }
    }, [mode, currentPage, selectedMediaType]);


    // useEffect(() => {
    //     console.log("Updated currentGenreList:", currentGenreList);
    // }, [currentGenreList]);


    return (
        <MediaContext.Provider value={{ toggleMediaType, trendingMovies, movieGenres, 
                                        trendingTvShows, tvGenres, selectedMediaType, 
                                        loading, currentMediaList, currentGenreList, totalResults, totalPages, 
                                        selectedGenre, setSelectedGenre, changePage, 
                                        setSearchQueryHandler, searchQuery,
                                        searchResults, setMode, mode }}>
            {children}
        </MediaContext.Provider>
    );
}

export default MediaProvider;
