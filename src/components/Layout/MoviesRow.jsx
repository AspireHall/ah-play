import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const IMG_BASE = "https://image.tmdb.org/t/p/w300";

const MoviesRow = ({ movies }) => {
  const sliderRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 250; // adjust based on card width
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative px-6 py-8">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-white mb-4">
        ⭐ Top Rated Movies
      </h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Movie Row */}
      <div
        ref={sliderRef}
        className="flex py-2 space-x-4 overflow-x-hidden scrollbar-hide scroll-smooth"
      >
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`movies/${movie.id}`} // dynamic route
            className="min-w-[200px] bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex-shrink-0 hover:scale-105 transition-transform"
          >
            {/* Poster */}
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MoviesRow;
