import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { useGetMoviesQuery } from "../services/api/tmdbApi";

const MoviesPage = () => {
  const IMG_BASE = "https://image.tmdb.org/t/p/w300";
  const [year, setYear] = useState(2010);
  const [sortBy, setSortBy] = useState("title.asc");
  //---Genre Id's----//
  //  action:28, adventure:12, animation:16, comedy:35, crime:80, docum:99, drama:18, family:10751
  // fantasy:14, history:36, horror:27, music:10404, mystery:9648, romance:10749, scifi:878, trhiller:53
  // war:10752, western:37
  const [genre, setGenre] = useState("");

  //--Platform Id's ---//
  // Netflix: 8, AppleTv: 2, Disney+ 337: HBO Max:49,  Amazon Video:10, Hulu:15, GooglePlayMovies:3, MicrosoftStore:68
  const [rating, setRating] = useState(7);

  const [platform, setPlatform] = useState(8);
  const [page, setPage] = useState(1);
  const {
    data: movieData,
    error,
    isLoading,
  } = useGetMoviesQuery({ year, sortBy, genre, rating, platform, page });
  const [search, setSearch] = useState("");

  if (error) return <div>Error on Page</div>;
  if (isLoading) return <div>Loding Movies...</div>;
  console.log(movieData);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black mx-auto px-6 py-10 pt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Movies</h1>
          <p className="text-gray-400">
            Discover amazing movies across all platforms •
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border bg-slate-900 !border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Section */}
        <div className="bg-gray-400 dark:bg-gray-800 p-4 rounded-xl mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-2 rounded-lg border border-gray-300"
          >
            <option value="">All Genres</option>
            <option value={28}>Action</option>
            <option value={878}>Sci-Fi</option>
            <option value={18}>Drama</option>
            <option value={35}>Comedy</option>
            <option value={53}>Thriller</option>
            <option value={10752}>War</option>
          </select>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="p-2 rounded-lg border border-gray-300"
          >
            <option value="">All Platforms</option>
            <option value={8}>Netflix</option>
            <option value={15}>Hulu</option>
            <option value={337}>Disney+</option>
            <option value={49}>HBO Max</option>
            <option value={2}>Apple TV+</option>
          </select>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-2 rounded-lg border border-gray-300"
          >
            <option value="">All Ratings</option>
            <option value={9}>9+</option>
            <option value={8}>8+</option>
            <option value={7}>7+</option>
            <option value={6}>6+</option>
          </select>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="p-2 rounded-lg border border-gray-300"
          >
            <option value="">All Years</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-lg border border-gray-300"
          >
            <option value="">Sort by Title</option>
            <option value="title.asc">A → Z</option>
            <option value="title.desc">Z → A</option>
          </select>
        </div>

        {/* Movies Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movieData.results.length > 0 ? (
            movieData.results.map((movie) =>
              movie.popularity > 1 ? (
                <Link to={`/movies/${movie.id}`}>
                  <div
                    key={movie.id}
                    className="bg-white w-72 h-96 border-amber-50 border dark:bg-gray-900  rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
                  >
                    <img
                      src={`${IMG_BASE}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-72 h-96 "
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{movie.title}</h3>
                      <p className="text-sm text-gray-500">
                        {movie.genre_ids && (
                          <>
                            {/* ---Genre Id's----// // action:28, adventure:12,
                        animation:16, comedy:35, crime:80, docum:99, drama:18,
                        family:10751 // fantasy:14, history:36, horror:27,
                        music:10404, mystery:9648, romance:10749, scifi:878,
                        trhiller:53 // war:10752, western:37*/}
                            {movie.genre_ids.includes(28) && (
                              <span>Action </span>
                            )}
                            {movie.genre_ids.includes(18) && (
                              <span>Drama </span>
                            )}
                            {movie.genre_ids.includes(27) && (
                              <span>Horror </span>
                            )}
                            {movie.genre_ids.includes(35) && (
                              <span>Comedy </span>
                            )}
                            {movie.genre_ids.includes(16) && (
                              <span>Animation </span>
                            )}
                            {movie.genre_ids.includes(878) && (
                              <span>Sci-fi </span>
                            )}
                            {movie.genre_ids.includes(53) && (
                              <span>Thriller</span>
                            )}
                            {movie.genre_ids.includes(10752) && (
                              <span>War</span>
                            )}
                            {/* Add more as needed */}
                          </>
                        )}
                        • {movie.year}
                      </p>

                      <p className="text-sm">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : null
            )
          ) : (
            <p className="text-gray-500 col-span-full py-40 text-center">
              No movies found.
            </p>
          )}
        </div>
        {/* Pagination Section*/}
        <div className="flex mt-5 text-2xl">Page</div>
        <div className="flex flex-wrap gap-2 mt-5">
          {movieData &&
            Array.from({ length: movieData.total_pages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={page === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
