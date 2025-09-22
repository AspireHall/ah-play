import { useState } from "react";
import { useParams } from "react-router";
import VideoPlayer from "../components/Ui/VideoPlayer";
import { CirclePlay, ArrowBigRight } from "lucide-react";
import {
  useGetMovieByIdQuery,
  useGetWatchProvidersQuery,
} from "../services/api/tmdbApi";
import ModalVideo from "../components/Ui/ModalVideo";

const IMG_BASE = "https://image.tmdb.org/t/p/original";
const ProviderLogo_BASE = "https://image.tmdb.org/t/p/w92/";

const MovieDetails = () => {
  const [open, setOpen] = useState(false);
  const MinuteHour = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}min`;
  };

  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);
  const {
    data: providers,
    error: providerError,
    isLoading: providerIsLoading,
  } = useGetWatchProvidersQuery(id);

  if (isLoading || providerIsLoading)
    return <p className="p-4 text-center">Loading...</p>;
  if (error || providerError)
    return <p className="p-4 text-center">Error loading movie</p>;

  // Extract director & writer
  const crew = movie.credits?.crew || [];
  const director = crew.find((person) => person.job === "Director");
  const writer = crew.find(
    (person) => person.job === "Writer" || person.job === "Screenplay"
  );

  console.log(movie);
  console.log(providers);
  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(${IMG_BASE}${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {/* Overlay (darker + taller on large screens) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 lg:via-black/90 to-black/70"></div>

      <div className="relative z-10 min-h-screen p-4 sm:p-6 md:p-12 flex flex-col justify-center">
        {/* Poster + Info */}
        <div className="flex flex-col mt-12 lg:mt-5 lg:flex-row gap-30 items-start lg:items-center">
          {/* Poster (larger on lg+) */}
          <div class="p-[1px] rounded-xl bg-gradient-to-r from-rose-700/60 via-purple-500/10 to-cyan-300/90 inline-block">
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] rounded-2xl shadow-4xl border-2 border-gray-500/10 "
            />
          </div>

          <div className="w-full max-w-4xl p-6 md:p-10 bg-black/70 rounded-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              {movie.title}{" "}
              <span className="text-gray-300 font-light">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            </h1>

            {/* Box Office */}
            <p className="text-sm md:text-base text-gray-300 italic mb-4">
              Budget:{" "}
              {movie.budget
                ? "$" + movie.budget.toLocaleString("en-us")
                : "N/A"}{" "}
              - Revenue: ${movie.revenue.toLocaleString("en-us")}
            </p>

            {/* Genres */}
            <p className="text-sm md:text-base text-gray-300 italic mb-4">
              {movie.genres.map((g) => g.name).join(", ")}
            </p>

            {/* Runtime */}
            <p className="text-sm md:text-base text-gray-300 italic mb-4">
              {MinuteHour(movie.runtime)}
            </p>

            {/* Description */}
            <p className="text-gray-200 leading-relaxed mb-6">
              {movie.overview}
            </p>

            {/* Crew */}
            <div className="space-y-2 text-gray-300 mb-6">
              {director && (
                <p>
                  <span className="font-semibold text-white">Director:</span>{" "}
                  {director.name}
                </p>
              )}
              {writer && (
                <p>
                  <span className="font-semibold text-white">Writer:</span>{" "}
                  {writer.name}
                </p>
              )}
            </div>

            {/* Videos (trailers) */}
            {movie.videos?.results?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">🎬 Trailers</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.videos.results
                    .filter((v) => v.type === "Trailer")
                    .slice(0, 3)
                    .map((video) => (
                      <div key={video.id}>
                        <button onClick={() => setOpen(true)}>
                          <span className="flex justify-center items-center gap-2">
                            <CirclePlay className="w-4 h-4" /> Play Trailer
                          </span>
                        </button>
                        <ModalVideo
                          isOpen={open}
                          onClose={() => setOpen(false)}
                          key={video.key}
                          videoKey={video.key}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Providers */}
            {providers?.flatrate && (
              <div className="flex flex-wrap gap-6 mt-10 items-center">
                <div className="flex items-center gap-2 text-gray-300 text-xl">
                  Now Streaming <ArrowBigRight className="w-6 h-6" />
                </div>

                {providers.flatrate
                  .filter(
                    (provider) =>
                      provider.provider_name !== "HBO Max Amazon Channel" &&
                      provider.provider_name !== "Netflix Standard with Ads" &&
                      provider.provider_name !== "AMC+ Amazon Channel" &&
                      provider.provider_name !==
                        "Amazon Prime Video with Ads" &&
                      provider.provider_name !==
                        "Shout! Factory Amazon Channel" &&
                      provider.provider_name !== "Peacock Premium Plus" &&
                      provider.provider_name !== "MGM+ Amazon Channel" &&
                      provider.provider_name !==
                        "MGM Plus Roku Premium Channel" &&
                      provider.provider_name !== "Paramount+ Amazon Channel" &&
                      provider.provider_name !==
                        "Paramount+ Roku Premium Channel" &&
                      provider.provider_name !== "AMC+ Roku Premium Channel" &&
                      provider.provider_name !== "AMC Plus Apple TV Channel "
                  )
                  .map((provider) => (
                    <div
                      key={provider.provider_id}
                      className="hover:cursor-pointer flex flex-col items-center hover:scale-105 transition"
                    >
                      <img
                        className="w-12 h-12 rounded-lg shadow-md"
                        src={ProviderLogo_BASE + provider.logo_path}
                        alt={provider.provider_name}
                      />
                      <p className="mt-1 text-xs font-medium text-gray-300">
                        {provider.provider_name}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
            Cast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-7">
            {movie.credits?.cast.slice(0, 12).map((actor) => (
              <div
                key={actor.cast_id}
                className="bg-gray-900/70 w-45 h-85 backdrop-blur rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition"
              >
                <img
                  src={
                    actor.profile_path
                      ? `${IMG_BASE}${actor.profile_path}`
                      : "https://via.placeholder.com/150x225?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-45 h-auto "
                />
                <div className="p-3 text-center">
                  <p className="text-sm font-semibold">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
