"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("design-studio");

  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Image Upload Handler
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "raw" | "laminate") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "raw") {
      setRawPhoto(url);
    } else if (type === "laminate") {
      if (laminates.length >= 5) return alert("Max 5 laminates allowed");
      setLaminates([...laminates, url]);
    }
  };

  // AI Generate Function (placeholder for now)
  const generateDesignStudio = async () => {
    setLoading(true);

    // Abhi AI nahi — hum preview me raw image dikha rahe
    // later: SAM + laminate overlay + blend
    setTimeout(() => {
      setPreview(rawPhoto || null);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 text-gray-900">

      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow">Home Decor AI</h1>
        <p className="text-lg mt-2 text-gray-600 font-medium">
          Upload furniture → Apply Laminates → AI Preview
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-6 mb-10">
        <button
          onClick={() => setActiveTab("inspiration")}
          className={`px-6 py-2 font-semibold rounded-xl transition-all ${
            activeTab === "inspiration" ? "bg-indigo-600 text-white shadow-lg" : "bg-white"
          }`}
        >
          Instant Inspiration
        </button>

        <button
          onClick={() => setActiveTab("quick")}
          className={`px-6 py-2 font-semibold rounded-xl transition-all ${
            activeTab === "quick" ? "bg-indigo-600 text-white shadow-lg" : "bg-white"
          }`}
        >
          Quick Preview
        </button>

        <button
          onClick={() => setActiveTab("design-studio")}
          className={`px-6 py-2 font-bold rounded-xl shadow transition-all ${
            activeTab === "design-studio" ? "bg-purple-700 text-white shadow-2xl scale-105" : "bg-white"
          }`}
        >
          Design Studio
        </button>
      </div>

      {/* 📌 TAB SCREENS */}

      {activeTab === "design-studio" && (
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-indigo-900 text-center mb-8">Design Studio – Workspace</h2>

          <div className="grid grid-cols-12 gap-6">

            {/* LEFT - Upload */}
            <div className="col-span-12 md:col-span-3 space-y-6 border-r pr-6">
              <h3 className="font-bold text-xl">Upload Section</h3>

              <div>
                <p className="font-semibold">Furniture Photo</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e,"raw")}
                  className="w-full mt-2 file:bg-indigo-600 file:text-white file:px-4 file:py-2 rounded-lg"
                />
                {rawPhoto && <img src={rawPhoto} className="rounded-lg shadow mt-3" />}
              </div>

              <div>
                <p className="font-semibold">Laminates (Max 5)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e,"laminate")}
                  className="w-full mt-2 file:bg-purple-600 file:text-white file:px-4 file:py-2 rounded-lg"
                />
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {laminates.map((l, i) => (
                    <img key={i} src={l} className="rounded shadow h-16 object-cover" />
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER - Main Preview */}
            <div className="col-span-12 md:col-span-6 flex items-center justify-center bg-gray-50 rounded-xl shadow p-4">
              {preview
                ? <img src={preview} className="max-h-[70vh] rounded-xl shadow-lg"/>
                : <p className="text-gray-500 text-lg">Preview will appear here</p>
              }
            </div>

            {/* RIGHT - AI Control */}
            <div className="col-span-12 md:col-span-3 space-y-6 border-l pl-6">
              <h3 className="font-bold text-xl">AI Control</h3>

              <textarea
                placeholder="Prompt: Dark walnut on doors, glossy white drawers..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full border rounded-xl p-3 h-32"
              />

              <button
                onClick={generateDesignStudio}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
              >
                {loading ? "Processing..." : "Apply Laminate"}
              </button>

              {preview && (
                <button className="w-full bg-black text-white py-2 rounded-xl font-semibold">
                  Download Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
