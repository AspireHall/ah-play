import React from "react";
import { ChevronLeft } from "lucide-react";

const ButtonScrollLeft = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute h-[150px] left-2 mt-1 top-1/2 -translate-y-1/2 !bg-black/50 !border-gray-500 hover:!bg-black/70 hover:!border-white text-white p-2 rounded-full z-10"
    >
      <ChevronLeft className="w-auto h-auto" />
    </button>
  );
};

export default ButtonScrollLeft;
