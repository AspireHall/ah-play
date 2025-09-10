import React from "react";
import HeroSection from "../components/Layout/HeroSection";
import { useGetTopRatedMoviesQuery } from "../services/api/tmdbApi";

const HomePage = () => {
  const { data: movie, error, isLoading } = useGetTopRatedMoviesQuery(); // e.g. The Matrix (id=603)
  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p>..Something wrong happened</p>;

  console.log(movie);
  return (
    <div>
      <HeroSection movie={movie.results[0]} />
    </div>
  );
};

export default HomePage;
