import { createContext , useState, useEffect, useContext, useRef } from "react";

const MediaDetailsContext = createContext();
export const useMediaDetailsContext = () => useContext(MediaDetailsContext);

const apikey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;

export const MediaDetailsProvider = ({ children }) => {
    const recommendations = "";
    return (
        <MediaDetailsContext.Provider value={{ recommendations }}>
            {children}
        </MediaDetailsContext.Provider>
    );
}