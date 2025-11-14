import { useCallback, useEffect, useState } from "react";
import PodcastCard from "./components/PodcastCard";
import "./styles/App.css";
import "./styles/LoadingState.css"
import "./styles/styles.css"
import Header from "./components/Header";
import Filter from "./components/Filter";
import PodcastModal from "./components/PodcastModal";
import Pagination from "./components/Pagination";


export default function App() {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 6;


    const openModal = (podcast) => {setSelectedPodcast(podcast)};
    const closeModal = () => { setSelectedPodcast(null) }

const fetchPodcasts = useCallback(async (signal) => { 
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://podcast-api.netlify.app/", { signal }, []);
            if(!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
            const data = await res.json();

            if(!Array.isArray(data)) {
                setPodcasts([]);
                setError("Unexpected response format from API.");
            } else {
                setPodcasts(data);
            }
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

    if(loading) {
        return(
            <main className="app-root">
                <header className="app-header">
                    <h1>Forger Talks</h1>
                </header>
                <div className="status">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </main>
        );
    }

    const indexOfLastPodcast = currentPage * itemsPerpage;
    const indexOfFirstPodcast = indexOfLastPodcast - itemsPerpage;
    const currentPodcast = podcasts.slice(indexOfFirstPodcast, indexOfLastPodcast);

    return (
        <main className="app-root">
            <Header />
            <Filter />
               
            <Pagination 
                totalItems = {podcasts.length}
                itemsPerpage = {itemsPerpage}
                currentPage = {currentPage}
                setCurrentPage = {setCurrentPage}
            />

            <section className="podcast-grid">
            {currentPodcast.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} openModal={openModal} />
            ))}
            </section>

             {selectedPodcast && (
            <PodcastModal 
                podcast={selectedPodcast} 
                closeModal={() => setSelectedPodcast(null)} 
            />
        )}
        </main>
    )
}

