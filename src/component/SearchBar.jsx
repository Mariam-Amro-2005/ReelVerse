import React, { useState } from 'react';
import "../css/Header.css"; // Assuming you have a CSS file for styling

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const REACT_APP_TMDB_API_KEY="ad458c3b87d3f0cda75363e650b949d7";
    const apiKey = REACT_APP_TMDB_API_KEY;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            const response = await fetch(
            // `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
            `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            setResults(data.results.slice(0, 5)); // Optional: show top 5 matches
        } catch (err) {
            console.error("Search failed:", err);
        }

        setQuery(''); // Clear the input after search
    };

    return (
    <div className="search-bar">
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
                <img src="icons8-search-50.png" alt="Search" />
            </button>
        </form>

        
        {/* {results.length > 0 && (
            <ul className="search-results">
                {results.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} ({movie.release_date?.slice(0, 4)})
                    </li>
            ))}
            </ul>
        )} */}
    </div>
    );
}

export default SearchBar;
