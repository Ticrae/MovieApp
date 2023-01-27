import React, { useState, useEffect } from "react";
import CustomPagination from "../components/pagination/CustomPagination";
import SingleMovie from "../components/SingleMovie";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;

  // Function to get trending movies from the API and store it in movies variable
  const getMovies = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="py-4">
      <div className="grid md:grid-cols-4 gap-8 mx-auto w-4/5 py-20">
        {movies &&
          movies.map((movie) => (
            // Single Movie Card
            <SingleMovie
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type={movie.media_type}
            />
          ))}
      </div>
      {/* For Pagination */}
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Home;
