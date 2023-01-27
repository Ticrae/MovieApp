// Function to return genre joined id
const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const genreId = selectedGenres.map((g) => g.id);
  return genreId.reduce((acc, curr) => acc + "," + curr);
};

export default useGenres;
