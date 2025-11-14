import { useState}  from "react"
import { genres } from "../data.js";

export default function Filter() {
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState("");

    return(
        <div className="filter">
            <h2>Filter by:</h2>

            <select 
                name="genres"
                value={genre}
                onChange = {(gen) => setGenre(gen.target.value)}
            >
                <option value={genre.title}>All Genres</option>
                {genres.map(g => (
                    <option key={g.id} value={g.title}>
                        {g.title}
                    </option>
                ))}
            </select>

            <select name="updates" id="">
                <option value="">Recently Updated</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    )
}