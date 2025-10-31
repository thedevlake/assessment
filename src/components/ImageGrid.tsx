import React from "react";

type Image = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
};

type Props = {
  images: Image[];
  onSelect: (img: Image) => void;
};

export default function ImageGrid({ images, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {images.map((img) => (
        <button
          key={img.id}
          onClick={() => onSelect(img)}
          className="rounded overflow-hidden"
        >
          <img
            src={img.urls.small}
            alt={img.alt_description ?? "img"}
            className="w-full h-40 object-cover"
          />
        </button>
      ))}
    </div>
  );
}
