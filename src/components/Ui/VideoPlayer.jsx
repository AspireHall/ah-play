// VideoPlayer.jsx
import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  videoKey,
  onClick,
  width = "100%",
  height = "100%",
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  return (
    <div className="flex flex-col mt-20 items-center space-y-4 p-4 bg-gradient-to-b from-red-950 via-purple-950 to-black rounded-2xl shadow-md w-7xl h-full mx-auto">
      {/* React Player */}
      <div className="w-full h-full flex">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${videoKey}`}
          width={width}
          height={height}
          playing={playing}
          volume={volume}
          muted={muted}
          controls={true} // native controls
          className="rounded-lg overflow-hidden"
        />
      </div>

      {/* Custom Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setPlaying(!playing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          {playing ? "Pause" : "Play"}
        </button>

        <button
          onClick={() => setMuted(!muted)}
          className="px-4 py-2 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700 transition"
        >
          {muted ? "Unmute" : "Mute"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32"
        />
        <button onClick={onClick}>Exit</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
