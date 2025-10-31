import { motion } from "framer-motion";

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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 ">
      {images.map((img) => (
        <motion.button
          key={img.id}
          onClick={() => onSelect(img)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative rounded-xl  hover:shadow-2xl transition overflow-hidden border-4 border-transparent hover:border-pink-300 backdrop-blur-sm"
        >
          <img
            src={img.urls.small}
            alt={img.alt_description ?? "img"}
            className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
          />
        </motion.button>
      ))}
    </div>
  );
}
