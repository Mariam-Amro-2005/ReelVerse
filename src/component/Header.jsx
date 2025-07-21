import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "../css/Header.css";
import { useMediaContext } from '../context/MoviesContext.jsx';


function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const { loading, mode, setMode, currentMediaList} = useMediaContext();

    const handleLogoClick = () => {
        setMode('trending');
    }

    // useEffect(()=>{

    // }, [])


    return(
        <>
        <div className="header">
            <div className="logo">
                <img src="./icons8-clapperboard-white-50.png" alt="Logo"  onClick={() => handleLogoClick()}/>
                <div className="logo-text">ReelVerse</div>
            </div>
            <SearchBar />
            <div className="User-Portal">
                {!loggedIn ? (
                    <>
                        <div className="signup">
                            <Link to="/signup">Sign up</Link>
                        </div>
                        <div className="login">
                            <Link to="/login">Log in</Link>
                        </div> 
                    </>
                ) : (
                    <div className="logout">
                        <Link to="/logout">Log out</Link>
                    </div>
                )}

            </div>
        </div>
        </>
    )
}

export default Header;
