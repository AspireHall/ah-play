import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Link } from "react-router";
import ReactPlayer from "react-player";
import React from "react";

const IMG_BASE = "https://image.tmdb.org/t/p/original";

const HeroSection = ({ movie }) => {
  if (!movie) return null;

  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    runtime,
    release_date,
    genres,
    vote_average,
  } = movie;

  return (
    <section className="relative w-full h-full py-[100px] text-white">
      {/* Background Backdrop */}
      <div className="absolute inset-0">
        <img
          src={`${IMG_BASE}${backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex items-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row mt-[100px] items-center md:items-start gap-8"
        >
          {/* Poster */}
          <img
            src={`${IMG_BASE}${poster_path}`}
            alt={title}
            className="w-48 md:w-64 rounded-2xl  shadow-lg"
          />

          {/* Info */}
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
            <p className="text-gray-300 text-sm md:text-base line-clamp-4">
              {overview}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                {runtime ? `${runtime} min` : "N/A"}
              </span>
              <span>{release_date ? release_date.split("-")[0] : "N/A"}</span>
              {genres?.length > 0 && (
                <span>{genres.map((g) => g.name).join(", ")}</span>
              )}
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="w-5 h-5 fill-yellow-400" />
                {vote_average?.toFixed(1)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-4">
              <Link to={`/movies/${movie.id}`}>
                <button className="px-5 py-2 hover:!border-amber-50 border rounded-lg font-medium transition">
                  ▶ Watch Now
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
