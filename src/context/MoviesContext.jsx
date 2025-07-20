import { createContext , useContext} from "react";

const MediaContext = createContext();
export const useMediaContext = () => useContext(MediaContext);

const apikey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;