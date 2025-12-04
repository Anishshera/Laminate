'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("design-studio");
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any, type: 'raw' | 'laminate') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (type === 'raw') setRawPhoto(data.url);
    else setLaminates(prev => [...prev, data.url].slice(0, 5));
  };

  const generate = () => {
    if (!rawPhoto || laminates.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      setPreview("https://res.cloudinary.com/djzmfpmmv/image/upload/v1737070000/laminate-preview-sample.jpg");
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-center text-indigo-900 mb-4">LaminateAI</h1>
        <p className="text-2xl text-center text-gray-700 mb-10">Free AI Laminate Try-On Tool</p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button onClick={() => setActiveTab("instant")} className={`px-8 py-4 rounded-xl text-lg font-semibold transition ${activeTab === "instant" ? "bg-indigo-600 text-white shadow-xl" : "bg-white text-gray-700"}`}>Instant Inspiration</button>
          <button onClick={() => setActiveTab("quick")} className={`px-8 py-4 rounded-xl text-lg font-semibold transition ${activeTab === "quick" ? "bg-indigo-600 text-white shadow-xl" : "bg-white text-gray-700"}`}>Quick Preview</button>
          <button onClick={() => setActiveTab("design-studio")} className={`px-10 py-5 rounded-xl text-xl font-bold transition shadow-2xl ${activeTab === "design-studio" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" : "bg-white text-indigo-700"}`}>Design Studio (Main)</button>
          <button disabled className="px-8 py-4 rounded-xl bg-gray-300 text-gray-600 text-lg">Brand Catalog (Soon)</button>
        </div>

        {/* Design Studio */}
        {activeTab === "design-studio" && (
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">1. Raw Plywood Photo</h3>
                  <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'raw')} className="w-full file:mr-6 file:py-4 file:px-8 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white text-lg" />
                  {rawPhoto && <img src={rawPhoto} alt="Raw" className="mt-6 rounded-2xl shadow-xl w-full" />}
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">2. Up to 5 Laminates</h3>
                  <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'laminate')} className="w-full file:mr-6 file:py-4 file:px-8 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white text-lg" />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {laminates.map((url, i) => (
                      <img key={i} src={url} className="rounded-xl shadow-lg h-32 object-cover" />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">3. Prompt (Optional)</h3>
                  <textarea
                    placeholder="Example: Dark walnut on doors, white gloss on drawers, teak on sides..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-6 border-2 border-gray-300 rounded-2xl text-lg focus:border-indigo-600 outline-none h-40"
                  />
                </div>

                <button
                  onClick={generate}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 rounded-2xl text-2xl font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 transition"
                >
                  {loading ? "AI Magic Bana Raha Hai... (3s)" : "Generate Preview"}
                </button>
              </div>

              {/* Right - Preview */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">Your Final Design</h3>
                {preview ? (
                  <div className="space-y-6">
                    <img src={preview} alt="Final Preview" className="w-full rounded-3xl shadow-2xl" />
                    <div className="grid grid-cols-2 gap-6">
                      <button className="bg-green-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-green-700">Download HD</button>
                      <button className="border-4 border-indigo-600 text-indigo-600 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50">Share</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 border-4 border-dashed border-gray-300 rounded-3xl w-full h-96 flex items-center justify-center">
                    <p className="text-3xl text-gray-500">Preview yahan aayega...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
