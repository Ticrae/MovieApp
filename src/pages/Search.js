import React, { useState } from "react";
import CustomPagination from "../components/pagination/CustomPagination";
import SingleMovie from "../components/SingleMovie";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  // eslint-disable-next-line
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState();
  const API_SEARCH = `https://api.themoviedb.org/3/search/${
    type ? "tv" : "movie"
  }?api_key=${
    process.env.REACT_APP_API_KEY
  }&language=en-US&query=${searchText}&page=${page}&include_adult=false`;

  // Function to search for a movie or tv series title and store it in searchResult variable
  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_SEARCH);
      const data = await res.json();
      setSearchResult(data.results);
      setNumOfPage(data.total_pages);
    } catch (e) {
      console.log(e);
    }
  };

  // function to update searchText variable as input changes
  const changeHandler = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="py-20">
      <div className="">
        <div className="w-full mx-auto">
          {/* Input Form */}
          <form onSubmit={searchMovies} className={"mb-10"}>
            <input
              className="bg-[#161616] text-[white] py-2 px-5 rounded-md md:w-[500px] mr-3"
              type={"text"}
              placeholder={"type here"}
              onChange={changeHandler}
              value={searchText}
            />
            <button className="text-black bg-[#00ce79] py-2 px-4 rounded-md">
              Search
            </button>
          </form>
          {/* UI Search result */}
          <div className="container grid md:grid-cols-4 gap-8 mx-auto mb-10">
            {searchResult.map((mov) => (
              <SingleMovie
                key={mov.id}
                id={mov.id}
                poster={mov.poster_path}
                title={mov.title || mov.name}
                date={mov.first_air_date || mov.release_date}
                media_type={type ? "tv" : "movie"}
              />
            ))}
          </div>
          {searchResult.length < 1 && (
            <h1 className="text-white text-bold">No Results Found</h1>
          )}
          {/* To show pagination if no. of pages is greater than 1 */}
          {numOfPage > 1 && <CustomPagination setPage={setPage} />}
        </div>
      </div>
    </div>
  );
};

export default Search;
