import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "../css/Header.css"; // Assuming you have a CSS file for styling

function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    return(
        <>
        <div className="header">
            <div className="logo">
                <img src="./icons8-clapperboard-white-50.png" alt="Logo" />
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
