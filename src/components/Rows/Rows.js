import React, { useState, useEffect } from "react";
import "./Rows.css";

import axios from "../../axios";

function Rows({ title, fetchUrl, isLargeRow = false }) {
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovieRows() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);

      return request;
    }

    fetchMovieRows();
  }, [fetchUrl]);
  // console.log(movies);

  return (
    <div className="row">
      <h1>{title}</h1>
      <div
        className={`row__movie-list ${isLargeRow ? "row__movie-large" : ""}`}
      >
        {movies.map(
          (movie) =>
            movie.poster_path && (
              <img
                className="row__poster"
                key={movie.id}
                src={`${baseUrl}${movie.poster_path}`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Rows;
