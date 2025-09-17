import React from "react";
import { Link } from "react-router";

// Example platform data
const platforms = [
  {
    id: 1,
    name: "Netflix",
    description: "Unlimited movies, TV shows, and originals. Watch anywhere.",
    color: "bg-red-600",
    path: "/platforms/netflix",
  },
  {
    id: 2,
    name: "Hulu",
    description: "Stream TV shows, movies, and exclusive Hulu Originals.",
    color: "bg-green-600",
    path: "/platforms/hulu",
  },
  {
    id: 3,
    name: "Disney+",
    description:
      "Disney, Pixar, Marvel, Star Wars & National Geographic in one place.",
    color: "bg-blue-600",
    path: "/platforms/disney-plus",
  },
  {
    id: 4,
    name: "HBO Max",
    description: "Blockbusters, HBO Originals, and exclusive content.",
    color: "bg-purple-700",
    path: "/platforms/hbo-max",
  },
  {
    id: 5,
    name: "Amazon Prime Video",
    description: "Watch popular movies, TV shows, and Amazon Originals.",
    color: "bg-yellow-600",
    path: "/platforms/prime-video",
  },
  {
    id: 6,
    name: "Paramount+",
    description: "Originals, movies, sports, and live TV from Paramount.",
    color: "bg-sky-600",
    path: "/platforms/paramount-plus",
  },
  {
    id: 7,
    name: "Apple TV+",
    description: "Award-winning Apple Originals, only on Apple TV+.",
    color: "bg-gray-800",
    path: "/platforms/apple-tv-plus",
  },
];

const PlatformRow = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Streaming Platforms
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {platforms.map((platform) => (
          <Link
            key={platform.id}
            to={platform.path}
            className={`${platform.color} rounded-2xl p-5 shadow-lg !text-white hover:scale-105 transform transition duration-300 block`}
          >
            <h3 className="text-lg font-semibold mb-2">{platform.name}</h3>
            <p className="text-sm opacity-90">{platform.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PlatformRow;
