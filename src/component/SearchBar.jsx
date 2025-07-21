import { useState, useEffect } from 'react';
import "../css/Header.css";
import { useMediaContext } from '../context/MoviesContext.jsx';


function SearchBar() {
    const { loading, setSearchQueryHandler, searchQuery, mode} = useMediaContext();
    const [query, setQuery] = useState('');

    useEffect (() => {
        if(mode !== 'search'){
            setQuery('');
        }
    }, [searchQuery, mode])

    return (
    <div className="search-bar">
        <form onSubmit={(e) => {
                e.preventDefault();
                setSearchQueryHandler(query);
            }}>
            <input
                type="text"
                placeholder=" Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
                <img src="icons8-search-50.png" alt="Search" />
            </button>
        </form>
    </div>
    );
}

export default SearchBar;
