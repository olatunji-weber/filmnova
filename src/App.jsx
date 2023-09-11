import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=7aa5806d';

const App = () => {
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        searchMovies("Batman");
    },[]);

    return (
        <div>
            <div className="app"><h1>FilmNova</h1></div>
            <div className="search">
                <input
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies.length > 0
                ?(
                    <div className="container">
                        {movies.map((movie) => (<MovieCard movie={movie} />))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found....</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;