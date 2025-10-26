import React, { useState } from "react";
import { wardrobe } from "../data/wardrobe";
import Footer from "./footer";

// Semua ikon SVG sekarang menerima props stroke supaya bisa dinamis
const SvgAtasan = ({ stroke, ...props }) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h4l2 4 2-4h4v16H4V4z" />
  </svg>
);

const SvgBawahan = ({ stroke, ...props }) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4v12l-4 4v-16h4zM16 4v12l4 4v-16h-4z" />
  </svg>
);

const SvgOuterwear = ({ stroke, ...props }) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2h12l-3 20H9L6 2z" />
    <path d="M9 12h6" />
  </svg>
);

const SvgSepatu = ({ stroke, ...props }) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 15l4-3 8 2 4 1v3H3v-3z" />
    <path d="M7 12l2-5 4 1 2 5" />
  </svg>
);

const SvgPakaianResmi = ({ stroke, ...props }) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2l6 6 6-6v20H6V2z" />
    <path d="M9 12h6" />
  </svg>
);

const SvgAlatSholat = ({ stroke, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Tasbih / prayer beads: Lingkaran-lingkaran kecil berjajar */}
    <circle cx="7" cy="12" r="1.5" />
    <circle cx="10" cy="12" r="1.5" />
    <circle cx="13" cy="12" r="1.5" />
    <circle cx="16" cy="12" r="1.5" />

    {/* Tali tasbih */}
    <path d="M7 12h9" />
  </svg>
);

const SvgPakaianRumahTidur = ({ stroke, ...props }) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <path d="M6 10h12" />
  </svg>
);

const SvgAksesoris = ({ stroke, ...props }) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="7" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const SvgKaos = ({ stroke = "#2563EB", ...props }) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Leher kaos */}
    <path d="M9 4h6a2 2 0 012 2v3H7V6a2 2 0 012-2z" />
    {/* Badan kaos */}
    <path d="M7 9h10l-1 11H8L7 9z" />
    {/* Lengan kaos */}
    <path d="M7 9L3 12v3l4-3" />
    <path d="M17 9l4 3v3l-4-3" />
  </svg>
);

// defaultIcon untuk item yang tidak punya ikon kategori khusus (tidak digunakan tapi disimpan)
const defaultIcon = (
  <svg
    className="text-indigo-500 w-6 h-6 mr-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);

// Map kategori ke fungsi ikon dengan stroke dinamis
const iconsMap = {
  atasan: (stroke) => <SvgAtasan className="w-6 h-6 mr-2" stroke={stroke} />,
  bawahan: (stroke) => <SvgBawahan className="w-6 h-6 mr-2" stroke={stroke} />,
  outerwear: (stroke) => <SvgOuterwear className="w-6 h-6 mr-2" stroke={stroke} />,
  sepatu: (stroke) => <SvgSepatu className="w-6 h-6 mr-2" stroke={stroke} />,
  pakaian_resmi: (stroke) => <SvgPakaianResmi className="w-6 h-6 mr-2" stroke={stroke} />,
  alat_sholat: (stroke) => <SvgAlatSholat className="w-6 h-6 mr-2" stroke={stroke} />,
  pakaian_rumah_tidur: (stroke) => <SvgPakaianRumahTidur className="w-6 h-6 mr-2" stroke={stroke} />,
  aksesoris: (stroke) => <SvgAksesoris className="w-6 h-6 mr-2" stroke={stroke} />,
  kaos: (stroke) => <SvgKaos className="w-6 h-6 mr-2" stroke={stroke} />,
};

const ITEMS_PER_PAGE = 9;

// --- REKOMENDASI OUTFIT HARIAN ---
const dailyOutfits = {
  Senin: {
    atasan: ["Kemeja hitam"],
    bawahan: ["Museum pants (abu-abu)"],
    outerwear: ["Twill Jacket olive"],
    sepatu: ["Sepatu formal hitam"],
    aksesoris: [
      "Ikat pinggang hitam",
      "Jam tangan Eiger hijau army",
      "Kacamata minus hitam list merah",
    ],
  },
  Selasa: {
    atasan: ["Kemeja palette (abu-abu)"],
    bawahan: ["Jeans biru tua"],
    outerwear: [],
    sepatu: ["Loafers hitam"],
    aksesoris: [
      "Ikat pinggang hitam",
      "Jam tangan Eiger hijau army",
      "Kacamata minus hitam list merah",
    ],
  },
  Rabu: {
    atasan: ["Kemeja powder blue", "Kemeja strip abu-abu"],
    bawahan: ["Museum pants (navy)"],
    outerwear: ["Work Jacket hitam"],
    sepatu: ["Loafers hitam"],
    aksesoris: [
      "Ikat pinggang hitam",
      "Jam tangan Eiger hijau army",
      "Kacamata minus hitam list merah",
    ],
  },
  Kamis: {
    atasan: ["Kemeja cokelat"],
    bawahan: ["Celana cargo cream"],
    outerwear: [],
    sepatu: ["Nike putih"],
    aksesoris: [
      "Ikat pinggang cokelat",
      "Jam tangan Eiger hijau army",
      "Kacamata minus hitam list merah",
    ],
  },
  Jumat: {
    atasan: ["Batik biru", "Batik cokelat"],
    bawahan: ["Celana formal hitam"],
    outerwear: [],
    sepatu: ["Loafers hitam"],
    aksesoris: [
      "Ikat pinggang hitam",
      "Jam tangan Eiger hijau army",
      "Kacamata minus hitam list merah",
    ],
  },
  Sabtu: {
    atasan: ["Kaos (hitam/putih)"],
    bawahan: ["Jeans hitam"],
    outerwear: [],
    sepatu: ["Adidas cream"],
    aksesoris: [
      "Ikat pinggang hitam",
      "Jam tangan Eiger hijau army",
      "Kacamata minus hitam list merah",
    ],
  },
  Minggu: {
    atasan: ["Kaos (hitam/putih)"],
    bawahan: ["Sweetpants hitam", "Celana pendek hitam"],
    outerwear: [],
    sepatu: ["Adidas cream"],
    aksesoris: [
      "Jam tangan Eiger hijau army",
      "Kacamata minus hitam list merah",
    ],
  },
  AcaraResmi: {
    atasan: ["Kemeja formal putih"],
    bawahan: ["Celana formal hitam"],
    outerwear: ["Jas hitam"],
    sepatu: ["Sepatu formal hitam"],
    aksesoris: [
      "Ikat pinggang hitam",
      "Dasi strip merah-hitam",
      "Kacamata minus hitam list merah",
    ],
  },
};



const WardrobeList = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Senin"); // state baru untuk hari

  const allItems = Object.values(wardrobe).flat();

  const filteredItems = () => {
    const items = activeCategory === "all" ? allItems : wardrobe[activeCategory] || [];
    return items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const categories = ["all", ...Object.keys(wardrobe)];
  const paginatedItems = filteredItems().slice(0, ITEMS_PER_PAGE * page);
  const handleLoadMore = () => setPage((prev) => prev + 1);

  const strokeColors = darkMode
    ? {
        atasan: "#93C5FD",
        bawahan: "#6EE7B7",
        outerwear: "#C4B5FD",
        sepatu: "#F472B6",
        pakaian_resmi: "#FCA5A5",
        alat_sholat: "#FDBA74",
        pakaian_rumah_tidur: "#9CA3AF",
        aksesoris: "#60A5FA",
        kaos: "#2563EB",
      }
    : {
        atasan: "#2563EB",
        bawahan: "#16A34A",
        outerwear: "#7C3AED",
        sepatu: "#DB2777",
        pakaian_resmi: "#DC2626",
        alat_sholat: "#F97316",
        pakaian_rumah_tidur: "#4B5563",
        aksesoris: "#0891B2",
        kaos: "#2563EB",
      };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-500 ${
        darkMode ? "bg-gray-800 text-gray-300" : "bg-indigo-50 text-gray-900"
      }`}
    >
      <header
        className={`max-w-4xl mx-auto mb-6 rounded-xl shadow-lg p-6 sticky top-0 z-10 flex flex-col md:flex-row items-center justify-between ${
          darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center md:text-left text-indigo-700 dark:text-indigo-300 mb-4 md:mb-0">
          Wardrobe Final 2025
        </h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
          <input
            type="text"
            placeholder="Cari item pakaian..."
            className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-600"
            }`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className={`p-3 rounded-full flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
              darkMode
                ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 absolute inset-0 m-auto animate-fade-scale-rotate"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 absolute inset-0 m-auto animate-fade-scale-rotate"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Pilihan Hari untuk Rekomendasi Outfit */}
      <section className="max-w-4xl mx-auto mb-6 flex justify-center gap-2 flex-wrap">
        {Object.keys(dailyOutfits).map((day) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-full font-extrabold transition-colors duration-300 ${
              selectedDay === day
                ? darkMode
                  ? "bg-indigo-600 text-indigo-100 shadow-lg"
                  : "bg-indigo-700 text-white shadow-lg"
                : darkMode
                ? "bg-gray-800 text-gray-400 hover:bg-indigo-600 hover:text-indigo-100"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-700 hover:text-white"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </section>

      {/* Tampilkan Rekomendasi Outfit Harian */}
      <section
        className={`max-w-4xl mx-auto mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-extrabold mb-4 text-center text-indigo-700 dark:text-indigo-300">
          Rekomendasi Outfit untuk {selectedDay}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(dailyOutfits[selectedDay]).map(([category, items]) =>
            items.length === 0 ? null : (
              <div key={category} className="border rounded-lg p-3 flex flex-col">
                <div className="flex items-center mb-2 font-extrabold text-indigo-700 dark:text-indigo-400">
                  {iconsMap[category]
                    ? iconsMap[category](strokeColors[category] || "#2563EB")
                    : null}
                  <span className="capitalize ml-2">{category.replace(/_/g, " ")}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-black-700 dark:text-black-400">
                  {items.map((item) => (
                    <li key={item} className="font-semibold">{item}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </section>
      


      {/* Filter kategori */}
      <nav
        className={`max-w-4xl mx-auto mb-8 flex flex-wrap justify-center gap-3 ${
          darkMode ? "bg-gray-700 p-4 rounded-lg" : ""
        }`}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setPage(1);
            }}
            className={`px-5 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 ${
              activeCategory === category
                ? darkMode
                  ? "bg-indigo-500 text-indigo-50 shadow-lg"
                  : "bg-indigo-600 text-white shadow-lg"
                : darkMode
                ? "bg-gray-800 text-gray-400 hover:bg-indigo-600 hover:text-indigo-50"
                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            {category === "all" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke={strokeColors["kaos"]}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999"
                />
              </svg>
            ) : (
              iconsMap[category]?.(strokeColors[category])
            )}
            <span className="capitalize">{category.replace(/_/g, " ")}</span>
          </button>
        ))}
      </nav>

      {/* List item wardrobe */}
      <section
        className={`max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}
      >
        {paginatedItems.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            Tidak ada item yang cocok.
          </p>
        ) : (
          paginatedItems.map((item, idx) => {
            // Cari kategori item untuk ikon
            const kategoriItem = Object.entries(wardrobe).find(([key, arr]) =>
              arr.includes(item)
            )?.[0];
            return (
              <article
                key={idx}
                className={`p-4 rounded-xl shadow-md flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 ${
                  darkMode ? "bg-gray-600 text-gray-200" : "bg-white"
                }`}
              >
                {kategoriItem && iconsMap[kategoriItem]
                  ? iconsMap[kategoriItem](strokeColors[kategoriItem] || "#2563EB")
                  : null}
                <h3 className="text-lg font-semibold">{item}</h3>
              </article>
            );
          })
        )}
      </section>

      {paginatedItems.length < filteredItems().length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
              darkMode
                ? "bg-indigo-500 text-indigo-50 hover:bg-indigo-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Muat lebih banyak
          </button>
        </div>
      )}

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default WardrobeList;
