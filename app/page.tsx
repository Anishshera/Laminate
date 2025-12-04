'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("design-studio");

  // Design Studio States
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Instant Inspiration States
  const [inspirePrompt, setInspirePrompt] = useState("");
  const [inspireResult, setInspireResult] = useState<string | null>(null);
  const [inspireLoading, setInspireLoading] = useState(false);

  // Quick Preview States
  const [quickPhoto, setQuickPhoto] = useState<string | null>(null);
  const [quickPreview, setQuickPreview] = useState<string | null>(null);
  const [quickLoading, setQuickLoading] = useState(false);

  // Common Upload Handler
  const handleUpload = async (e: any, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (type === 'raw') setRawPhoto(data.url);
    else if (type === 'laminate') setLaminates(prev => [...prev, data.url].slice(0, 5));
    else if (type === 'quick') setQuickPhoto(data.url);
  };

  // Design Studio Generate
  const generateDesign = () => {
    if (!rawPhoto || laminates.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      setPreview("https://res.cloudinary.com/djzmfpmmv/image/upload/v1737070000/laminate-preview-sample.jpg");
      setLoading(false);
    }, 3000);
  };

  // Instant Inspiration Generate
  const generateInspiration = () => {
    if (!inspirePrompt) return;
    setInspireLoading(true);
    setTimeout(() => {
      setInspireResult("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80");
      setInspireLoading(false);
    }, 2000);
  };

  // Quick Preview Generate
  const generateQuick = () => {
    if (!quickPhoto) return;
    setQuickLoading(true);
    setTimeout(() => {
      setQuickPreview("https://res.cloudinary.com/djzmfpmmv/image/upload/v1737070000/laminate-preview-sample.jpg");
      setQuickLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-6 text-center text-3xl font-bold">
          LaminateAI – Free AI Laminate Tool
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            LaminateAI
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-medium mb-6">
            Free AI Laminate Try-On Tool – 5 Second Mein Perfect Preview!
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Apna plywood ka kaam hua photo upload karo → Laminate lagaao → Client ko turant dikhao!
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-center gap-6 mb-16 flex-wrap">
            <button onClick={() => setActiveTab("instant")} className={`px-10 py-5 rounded-2xl text-xl font-bold transition ${activeTab === "instant" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl" : "bg-white text-gray-700 shadow-lg"}`}>Instant Inspiration</button>
            <button onClick={() => setActiveTab("quick")} className={`px-10 py-5 rounded-2xl text-xl font-bold transition ${activeTab === "quick" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl" : "bg-white text-gray-700 shadow-lg"}`}>Quick Preview</button>
            <button onClick={() => setActiveTab("design-studio")} className={`px-12 py-6 rounded-2xl text-2xl font-black transition shadow-2xl ${activeTab === "design-studio" ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white" : "bg-white text-indigo-700"}`}>Design Studio (Main)</button>
            <button disabled className="px-10 py-5 rounded-2xl bg-gray-300 text-gray-600 text-xl">Brand Catalog (Soon)</button>
          </div>

          {/* Instant Inspiration Tab */}
          {activeTab === "instant" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-4xl font-bold text-center mb-6 text-indigo-900">Instant Inspiration – Quick Ideas</h2>
              <textarea
                placeholder="Type your idea: 'Dark walnut doors, white drawers...'"
                value={inspirePrompt}
                onChange={(e) => setInspirePrompt(e.target.value)}
                className="w-full p-6 border-4 border-indigo-200 rounded-3xl text-xl focus:border-indigo-600 outline-none h-32 resize-none mb-6"
              />
              <button
                onClick={generateInspiration}
                disabled={inspireLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-3xl text-2xl font-black hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 transition shadow-2xl mb-6"
              >
                {inspireLoading ? "Generating..." : "Get Inspiration"}
              </button>
              {inspireResult && (
                <img src={inspireResult} alt="Inspiration" className="w-full rounded-3xl shadow-2xl mt-6" />
              )}
            </div>
          )}

          {/* Quick Preview Tab */}
          {activeTab === "quick" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-4xl font-bold text-center mb-6 text-indigo-900">Quick Preview – Fast Check</h2>
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'quick')} className="w-full file:mr-6 file:py-5 file:px-10 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white text-xl cursor-pointer mb-6" />
              <button
                onClick={generateQuick}
                disabled={quickLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-3xl text-2xl font-black hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 transition shadow-2xl"
              >
                {quickLoading ? "Generating..." : "Generate Preview"}
              </button>
              {quickPreview && (
                <img src={quickPreview} alt="Quick Preview" className="w-full rounded-3xl shadow-2xl mt-6" />
              )}
            </div>
          )}

          {/* Design Studio Tab */}
          {activeTab === "design-studio" && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
                <h2 className="text-4xl font-bold">Design Studio – Sabse Powerful Feature</h2>
                <p className="text-xl mt-2 opacity-90">Apna plywood ka kaam aur laminate ka control yahan milega</p>
              </div>

              <div className="p-10">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left Side */}
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-3xl font-bold mb-5 text-indigo-900">1. Raw Plywood Photo</h3>
                      <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'raw')} className="w-full file:mr-6 file:py-5 file:px-10 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white text-xl cursor-pointer" />
                      {rawPhoto && <img src={rawPhoto} alt="Raw" className="mt-6 rounded-3xl shadow-2xl w-full border-4 border-indigo-100" />}
                      <p className="mt-2 text-gray-600">Apna plywood ka kaam hua photo yahan dikh raha hai</p>
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold mb-5 text-indigo-900">2. Up to 5 Laminates</h3>
                      <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'laminate')} className="w-full file:mr-6 file:py-5 file:px-10 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white text-xl cursor-pointer" />
                      <div className="grid grid-cols-3 gap-6 mt-8">
                        {laminates.map((url, i) => (
                          <div key={i} className="group relative">
                            <img src={url} className="rounded-2xl shadow-xl h-40 object-cover border-4 border-indigo-200 group-hover:border-indigo-600 transition" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl flex items-center justify-center">
                              <p className="text-white font-bold text-xl">Laminate {i+1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-gray-600">Yahan upload kiye laminate dikh rahe hai, maximum 5</p>
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold mb-5 text-indigo-900">3. Prompt (Optional)</h3>
                      <textarea
                        placeholder="Example: Dark walnut on doors, glossy white on drawers, natural teak on sides..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-8 border-4 border-indigo-200 rounded-3xl text-xl focus:border-indigo-600 outline-none h-48 resize-none"
                      />
                      <p className="mt-2 text-gray-600">Prompt se AI ko batao kaunsa laminate kaha lagana hai</p>
                    </div>

                    <button
                      onClick={generateDesign}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 rounded-3xl text-3xl font-black hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 transition shadow-2xl"
                    >
                      {loading ? "AI Magic Chal Raha Hai... (3s)" : "Generate Preview"}
                    </button>
                  </div>

                  {/* Right Side - Preview */}
                  <div>
                    <h3 className="text-4xl font-bold text-center mb-8 text-indigo-900">Your Final Masterpiece</h3>
                    {preview ? (
                      <div className="space-y-8">
                        <img src={preview} alt="Final Preview" className="w-full rounded-3xl shadow-2xl border-8 border-indigo-100" />
                        <div className="grid grid-cols-2 gap-8">
                          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-8 rounded-3xl text-2xl font-bold hover:from-green-600 hover:to-emerald-700 shadow-2xl">
                            Download HD
                          </button>
                          <button className="border-8 border-indigo-600 text-indigo-600 py-8 rounded-3xl text-2xl font-bold hover:bg-indigo-50 shadow-2xl">
                            Share with Client
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-dashed border-gray-400 rounded-3xl w-full h-96 md:h-full min-h-96 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-5xl text-gray-500 font-bold mb-4">Preview Yahan Aayega</p>
                          <p className="text-2xl text-gray-600">Upload karo → Generate dabao → Magic dekho!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-lg">
          © 2025 LaminateAI. All rights reserved. | Made with ❤️ by Anish Shera
        </div>
      </footer>
    </>
  );
}
