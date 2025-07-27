import "../css/Header.css";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="">&copy; {year} ReelVerse. All rights reserved.</div>
            <div className="disclaimer">
                {/* <p> This product uses the TMDB API but is not endorsed or certified by TMDB.</p> */}
                <img src="/PrimaryLongBlueTMDB.svg" alt="TMDB Logo"className="tmdb-logo"/>
            </div>
    </footer>
    );
}

export default Footer;