import React, { useRef } from "react";
import { downloadElementAsImage } from "../utils/download";

type Image = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
};

type Props = {
  image: Image;
  name: string;
  setName: (s: string) => void;
  fontFamily: string;
  setFontFamily: (s: string) => void;
  fontColor: string;
  setFontColor: (s: string) => void;
};

export default function CardEditor({
  image,
  name,
  setName,
  fontFamily,
  setFontFamily,
  fontColor,
  setFontColor,
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="space-y-4">
      <div
        id="card"
        ref={cardRef}
        className="mx-auto aspect-[4/5] w-80 sm:w-96 relative rounded-lg overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url(${image.urls.regular})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute top-4 left-0 right-0 text-center text-2xl font-bold"
          style={{ fontFamily: fontFamily, color: fontColor }}
        >
          Thank You
        </div>

        <div
          className="absolute bottom-4 left-0 right-0 text-center text-xl font-semibold"
          style={{ fontFamily: fontFamily, color: fontColor }}
        >
          {name || "Your Name Here"}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          placeholder="Enter your name"
        />

        <div className="flex gap-2">
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Inter, system-ui">Inter (default)</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Brush Script MT', cursive">Brush Script</option>
            <option value="'Courier New', monospace">Courier</option>
          </select>

          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-12 h-12 p-0"
          />

          <button
            onClick={() =>
              downloadElementAsImage(
                cardRef.current,
                `thank-you-${name || "card"}.png`
              )
            }
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
