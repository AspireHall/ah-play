import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/Layout/HeroSection";
import MoviesRow from "../components/Layout/MoviesRow";
import ShowsRow from "../components/Layout/ShowsRow";
import {
  useGetTopRatedMoviesQuery,
  useGetTopRatedShowsQuery,
} from "../services/api/tmdbApi";

const HomePage = () => {
  const { data: movie, error, isLoading } = useGetTopRatedMoviesQuery();
  const {
    data: show,
    error: showError,
    isLoading: showIsLoading,
  } = useGetTopRatedShowsQuery();

  if (isLoading && showIsLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black to-gray-900">
        <p className="text-white text-xl font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );

  if (error && showError)
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-red-500 text-lg">Something went wrong 😢</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      {movie?.results[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSection movie={movie.results[0]} />
        </motion.div>
      )}

      {/* Top Rated Movies Row */}
      {movie?.results && (
        <section className="mt-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold px-6 mb-4 text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            🎬 Top Rated Movies
          </motion.h2>
          <MoviesRow movies={movie.results} />
        </section>
      )}

      {/* Top Rated Shows Row */}
      {show?.results && (
        <section className="mt-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold px-6 mb-4 text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            📺 Top Rated Shows
          </motion.h2>
          <ShowsRow shows={show.results} />
        </section>
      )}

      {/* Footer / Extra space */}
      <div className="h-24" />
    </div>
  );
};

export default HomePage;
