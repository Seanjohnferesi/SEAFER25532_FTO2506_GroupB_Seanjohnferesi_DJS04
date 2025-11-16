import { useCallback, useEffect, useState } from "react";
import PodcastCard from "./components/PodcastCard";
import "./styles/App.css";
import "./styles/LoadingState.css"
import "./styles/styles.css"
import Header from "./components/Header";
import Filter from "./components/Filter";
import PodcastModal from "./components/PodcastModal";
import Pagination from "./components/Pagination";
import { genres } from "./data.js";
import { getGenreTitle } from "./utils/getGenreTitle.js";
import { fetchPodcastsAPI } from "./api/fetchPodcast.js";
import LoadingState from "./components/LoadingState.jsx";
import { filterPodcasts } from "./utils/filterPodcasts.js";
import { sortPodcasts } from "./utils/sortPodcast.js";
import { searchPodcast } from "./utils/search.js";


export default function App() {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 6;
    const [sort, setSort] = useState("");
    const [selectedGenre , setSelectedGenre] = useState("");
    const [searchInput, setSearchInput] = useState("");
    


    const openModal = (podcast) => {setSelectedPodcast(podcast)};
    const closeModal = () => { setSelectedPodcast(null) }

const fetchPodcasts = useCallback(async (signal) => { 
        setLoading(true);
        setError(null);

        try {
            const data = await fetchPodcastsAPI(signal);
            setPodcasts(data)

        } catch (err) {
            // if fetch was aborted or cancelled, do nothing
            if (err.name === "AbortError") return;
            setError(err.message || "Unknown error while fetching podcasts.");
            setPodcasts([]);

        } finally {
            setLoading(false);
        }
    }, []);
    


/**
 * Fetches podcasts when component mounts and cleans up on unmount.
 * Uses AbortController to cancel fetch requests if component unmounts early.
 */
    useEffect(() => {
        const controller = new AbortController();
        fetchPodcasts(controller.signal);
        return () => controller.abort();
    }, [fetchPodcasts]);

    if(loading) return <LoadingState/>

    // GENRE FILTER
    const filtered = filterPodcasts(podcasts, selectedGenre, genres, getGenreTitle)
    // SORTING
    const sortedItems = sortPodcasts(filtered, sort)
    // SEARCH
    const searchFiltered = searchPodcast(sortedItems, searchInput)

    // PAGINATION
    const indexOfLastPodcast = currentPage * itemsPerpage; //multiplies the page number and how many podcast cards there are
    const indexOfFirstPodcast = indexOfLastPodcast - itemsPerpage;// subtracts the last podcast index and the podcast cards rendered on page (6)
    const currentPodcast = searchFiltered.slice(indexOfFirstPodcast, indexOfLastPodcast);

    

    return (
        <main className="app-root">
            <Header 
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setCurrentPage={setCurrentPage}
            />
            <Filter 
                selectedGenre = {selectedGenre}
                setSelectedGenre = {setSelectedGenre}
                genres = {genres}
                sort={sort}
                setSort={setSort}
            />

            <section className="podcast-grid">
            {currentPodcast.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} openModal={openModal} />
            ))}
            </section>

            <Pagination 
                totalItems = {podcasts.length}
                itemsPerpage = {itemsPerpage}
                currentPage = {currentPage}
                setCurrentPage = {setCurrentPage}
            />

             {selectedPodcast && (
            <PodcastModal 
                podcast={selectedPodcast} 
                closeModal={() => setSelectedPodcast(null)} 
            />
        )}
        </main>
    )
}

