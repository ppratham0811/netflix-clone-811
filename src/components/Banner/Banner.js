import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../Requests";

import { play, plus } from "../../assets/index";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }

    fetchData();
  }, []);
  // console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {truncate(movie?.title, 20) ||
            truncate(movie?.name, 20) ||
            truncate(movie?.original_name, 20)}
        </h1>
        <h3 className="banner__description">
          {truncate(movie?.overview, 180)}
        </h3>
        <div className="banner__buttons">
          <div className="banner__button">
            <img src={play} alt="play-btn" />
            <button>Play</button>
          </div>
          <div className="banner__button">
            <img src={plus} alt="plus-btn" />
            <button>My List</button>
          </div>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
