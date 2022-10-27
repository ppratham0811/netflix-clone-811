import React from "react";
import "./HomeScreen.css";

import requests from "../../Requests";

import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import Rows from "../../components/Rows/Rows";

function HomeScreen() {
  return (
    <div className="homescreen">
      <Nav />

      <Banner />

      <Rows title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Rows title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Rows title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Rows title="Action Films" fetchUrl={requests.fetchActionMovies} />
      <Rows title="Comedy Films" fetchUrl={requests.fetchComedyMovies} />
      <Rows title="Horror Films" fetchUrl={requests.fetchHorrorMovies} />
      <Rows title="Romance Films" fetchUrl={requests.fetchRomanceMovies} />
      <Rows title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default HomeScreen;
