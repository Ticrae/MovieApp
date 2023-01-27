import React, { useEffect, useState } from "react";
import Genres from "../components/Genres";
import CustomPagination from "../components/pagination/CustomPagination";
import SingleMovie from "../components/SingleMovie";
import useGenres from "../hooks/useGenres";

const MoviesSection = () => {
  const [movieCategory, setMovieCategory] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState();
  const genreforURL = useGenres(selectedGenres);

  // To get Movies from the API and store it in movieCategory variable
  const fetchMovies = async () => {
    const res = await fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    const data = await res.json();
    setMovieCategory(data.results);
    setNumOfPage(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div className="py-[80px]">
      {/* Genres Categories */}
      <Genres
        type={"movie"}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
      />
      {/* UI of Genre selected */}
      <div className="grid md:grid-cols-4 gap-8 mx-auto w-4/5 mb-10">
        {movieCategory &&
          movieCategory.map((movie) => (
            // Single Movie Card
            <SingleMovie
              key={movie.id}
              setPage={setPage}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type="movie"
            />
          ))}
      </div>
      {/* To show pagination if no. of pages is greater than 1 */}
      {numOfPage > 1 && <CustomPagination setPage={setPage} />}
    </div>
  );
};

export default MoviesSection;
