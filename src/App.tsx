import React, { useEffect, useState } from "react";
import { getRandomImages, searchImages } from "./api/unsplash";
import ImageGrid from "./components/ImageGrid";
import CardEditor from "./components/CardEditor";
import SearchBar from "./components/SearchBar";
import { RefreshCw } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl backdrop-blur-lg bg-white/40 shadow-xl border border-white/30 rounded-3xl p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm">
            Thank You Card Generator
          </h1>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 border border-white/40 backdrop-blur-md text-gray-700 hover:bg-white/60 transition shadow-sm hover:shadow-md"
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
          <section className="bg-white/30 rounded-2xl p-6 backdrop-blur-md border border-white/40 shadow-inner">
            <h2 className="mb-4 font-semibold text-lg text-gray-700">
              Pick an Image
            </h2>
            {loading ? (
              <div className="p-6 text-center text-gray-500 italic">
                Loading beautiful images...
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
          </section>

          <aside className="bg-white/30 rounded-2xl p-6 backdrop-blur-md border border-white/40 shadow-inner">
            <h2 className="mb-4 font-semibold text-lg text-gray-700">
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
          </aside>
        </main>
      </div>
    </div>
  );
}
