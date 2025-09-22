import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/Layout/HeroSection";
import MoviesRow from "../components/Layout/MoviesRow";
import ShowsRow from "../components/Layout/ShowsRow";
import PlatformRow from "../components/Layout/PlatformRow";
import {
  useGetTopRatedMoviesQuery,
  useGetTopRatedShowsQuery,
} from "../services/api/tmdbApi";
import { Clapperboard, Tv } from "lucide-react";

const HomePage = () => {
  const [movieCount, setMovieCount] = useState(0);
  const { data: movie, error, isLoading } = useGetTopRatedMoviesQuery();
  const {
    data: show,
    error: showError,
    isLoading: showIsLoading,
  } = useGetTopRatedShowsQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      setMovieCount((prev) => (prev >= 19 ? 0 : prev + 1));
    }, 6000); // change every 6 second

    return () => clearInterval(interval); // cleanup on unmount
  }, [movieCount]);

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
    <div className="bg-gradient-to-b from-gray-900 via-black to-red-950 text-white">
      {/* Hero Section */}

      {movie?.results && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-full"
        >
          <HeroSection movie={movie.results[movieCount]} />
        </motion.div>
      )}

      {/* Top Rated Movies Row */}
      {movie?.results && (
        <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4 text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex  items-center gap-5">
              <Clapperboard className="w-[30px] h-auto" /> Top Rated Movies
            </span>
          </motion.h2>
          <MoviesRow movies={movie.results} />
        </section>
      )}

      {/* Top Rated Shows Row */}
      {show?.results && (
        <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4 text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="flex  items-center gap-5">
              <Tv className="w-[30px] h-auto" /> Top Rated Shows
            </span>
          </motion.h2>
          <ShowsRow shows={show.results} />
        </section>
      )}
      {/* Platforms */}
      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PlatformRow />
      </div>
    </div>
  );
};

export default HomePage;
