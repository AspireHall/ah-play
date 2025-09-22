import React from "react";
import VideoPlayer from "./VideoPlayer";

const ModalVideo = ({ isOpen, onClose, videoKey }) => {
  if (!isOpen) return null; // don't render if closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      {/* Video container */}
      <div className="w-full h-[80%] flex items-center justify-center">
        <VideoPlayer videoKey={videoKey} onClick={onClose} />
      </div>
    </div>
  );
};

export default ModalVideo;
