import { useRef } from "react";
import ButtonScrollRight from "../Ui/ButtonScrollRight";
import ButtonScrollLeft from "../Ui/ButtonScrollLeft";

const IMG_BASE = "https://image.tmdb.org/t/p/w300";

const ShowsRow = ({ shows }) => {
  const sliderRef = useRef(null);

  if (!shows || shows.length === 0) return null;

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
      {/*<h2 className="text-2xl font-bold text-white mb-4"> Top Rated shows</h2> */}

      {/* Left Arrow */}
      <ButtonScrollLeft onClick={() => scroll("left")} />

      {/* Right Arrow */}
      <ButtonScrollRight onClick={() => scroll("right")} />

      {/* show Row */}
      <div
        ref={sliderRef}
        className="flex py-2 space-x-4 overflow-x-hidden scrollbar-hide scroll-smooth"
      >
        {shows.map((show) => (
          <div
            key={show.id}
            className="min-w-[200px] bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex-shrink-0 hover:scale-105 transition-transform"
          >
            {/* Poster */}
            <img
              src={`${IMG_BASE}${show.poster_path}`}
              alt={show.title}
              className="w-full h-72 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowsRow;
