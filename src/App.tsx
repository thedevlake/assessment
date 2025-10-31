import { useEffect, useState } from "react";
import { getRandomImages, searchImages } from "./api/unsplash";
import ImageGrid from "./components/ImageGrid";
import CardEditor from "./components/CardEditor";
import SearchBar from "./components/SearchBar";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [images, setImages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [fontFamily, setFontFamily] = useState("Inter, system-ui");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const fetchRandomImages = async () => {
    try {
      setLoading(true);
      const data = await getRandomImages(4);
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) return;
      try {
        setLoading(true);
        const res = await searchImages(query, page, 8);
        setImages(res.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [query, page]);

  const handleRefresh = () => {
    setSelected(null);
    setName("");
    setQuery("");
    setPage(1);
    setFontFamily("Inter, system-ui");
    setFontColor("#ffffff");
    fetchRandomImages();
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-6xl backdrop-blur-lg bg-white/40 shadow-xl sm:border sm:border-white/45 py-12  px-20">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl text-center font-bold bg-clip-text text-transparent border bg-linear-to-r from-pink-600 to-purple-200 drop-shadow-sm">
            Thank You Card Generator
          </h1>
          <button
            onClick={handleRefresh}
            className="mx-auto sm:mx-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 border border-white/40 backdrop-blur-md text-gray-700 hover:bg-white/60 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </header>

        <div className="mb-6">
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
          />
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.section
            className="bg-white/30 rounded-2xl sm:p-6 sm:backdrop-blur-md sm:border sm:border-white/40 sm:shadow-inner my-auto px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="mb-4 font-semibold text-lg text-gray-700 text-center">
              Choose an Image
            </h2>
            {loading ? (
              <div className="p-6 text-center text-gray-500 italic flex justify-center items-center hover:border-amber-300 hover:border-4">
                <motion.div
                  className="w-8 h-8 border-4 border-t-pink-500 border-white rounded-full animate-spin"
                  aria-label="Loading spinner"
                />
                <span className="ml-3">Loading beautiful images...</span>
              </div>
            ) : (
              <ImageGrid images={images} onSelect={(img) => setSelected(img)} />
            )}

            {query && (
              <div className="mt-4 flex gap-2 justify-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 bg-white/40 border border-white/60 rounded-lg hover:bg-white/70 transition"
                >
                  Prev
                </button>
                <div className="px-3 py-1 border border-white/60 bg-white/30 rounded-lg text-gray-700">
                  Page {page}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 bg-white/40 border border-white/60 rounded-lg hover:bg-white/70 transition"
                >
                  Next
                </button>
              </div>
            )}
          </motion.section>

          <motion.aside
            className=" grid grid-cols-1 place-items-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-4 font-semibold text-lg text-gray-700 text-center">
              Customize Your Card
            </h2>
            {selected ? (
              <CardEditor
                image={selected}
                name={name}
                setName={setName}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                fontColor={fontColor}
                setFontColor={setFontColor}
              />
            ) : (
              <div className="p-6 border border-dashed border-gray-300 text-gray-500 text-center rounded-xl">
                Select an image to start designing your thank-you card ✨
              </div>
            )}
          </motion.aside>
        </main>
      </div>
    </motion.div>
  );
}
