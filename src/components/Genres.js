import React, { useEffect } from "react";
import { Chip } from "@mui/material";

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
}) => {
  const fetchGenres = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const data = await res.json();
    setGenres(data.genres);
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mb-10">
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{
              background: "blue",
              margin: "10px",
              fontWeight: "bolder",
              fontSize: "20px",
              color: "white",
              padding: "15px",
            }}
            label={genre.name}
            clickable
            key={genre.id}
            onClick={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{
              background: "gray",
              fontWeight: "bolder",
              fontSize: "20px",
              color: "white",
              margin: "10px",
            }}
            label={genre.name}
            clickable
            key={genre.id}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
