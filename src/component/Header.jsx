import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "../css/Header.css";
import { useMediaContext } from '../context/MoviesContext.jsx';


function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [reset, setReset] = useState(false);
    const { loading, mode, setMode, currentMediaList} = useMediaContext();

    const handleLogoClick = () => {
        setReset(prev => !prev);
    }

    useEffect(()=>{
        setMode('trending');
        console.log("Logo clicked!")
    }, [reset])


    return(
        <>
        <div className="header">
            <Link to="/" className="no-style-link" onClick={() => handleLogoClick()}>
                <div className="logo">
                    <img src="./icons8-clapperboard-white-50.png" alt="Logo"/>
                    <div className="logo-text">ReelVerse</div>
                </div>
            </Link>
            <SearchBar />
            <div className="User-Portal">
                {!loggedIn ? (
                    <>
                        <div className="signup">
                            <Link to="/signup" className="no-style-link">Sign up</Link>
                        </div>
                        <div className="login">
                            <Link to="/login" className="no-style-link">Log in</Link>
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
