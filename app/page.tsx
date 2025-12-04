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
    <>
      {/* Hero + Title */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            LaminateAI
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-medium mb-6">
            Free AI Laminate Try-On Tool – 5 Second Mein Perfect Preview!
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plywood photo daalo → Laminate lagaao → Client ko turant dikhao! No login • No watermark • Unlimited free
          </p>
        </div>

        {/* How to Use Section */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20 -mt-10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-12">3 Steps Mein Ho Gaya!</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 hover:scale-105 transition">
                <div className="text-7xl mb-6">1</div>
                <h3 className="text-3xl font-bold mb-4">Raw Photo Upload</h3>
                <p className="text-xl opacity-90">Wardrobe, kitchen, table – jo bhi bana rahe ho</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 hover:scale-105 transition">
                <div className="text-7xl mb-6">2</div>
                <h3 className="text-3xl font-bold mb-4">Laminate Daalo ya Likho</h3>
                <p className="text-xl opacity-90">5 photos ya prompt likho: "Dark walnut doors, white drawers"</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 hover:scale-105 transition">
                <div className="text-7xl mb-6">3</div>
                <h3 className="text-3xl font-bold mb-4">Generate & Show Client</h3>
                <p className="text-xl opacity-90">5 second mein HD preview → Download → Client bolega "Wah bhai!"</p>
              </div>
            </div>
            <p className="text-2xl mt-12 font-semibold opacity-90">100% Free • No Login • Unlimited Use</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-center gap-6 mb-16 flex-wrap">
            <button onClick={() => setActiveTab("instant")} className={`px-10 py-5 rounded-2xl text-xl font-bold transition ${activeTab === "instant" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl" : "bg-white text-gray-700 shadow-lg"}`}>Instant Inspiration</button>
            <button onClick={() => setActiveTab("quick")} className={`px-10 py-5 rounded-2xl text-xl font-bold transition ${activeTab === "quick" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl" : "bg-white text-gray-700 shadow-lg"}`}>Quick Preview</button>
            <button onClick={() => setActiveTab("design-studio")} className={`px-12 py-6 rounded-2xl text-2xl font-black transition shadow-2xl ${activeTab === "design-studio" ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white" : "bg-white text-indigo-700"}`}>Design Studio (Main)</button>
            <button disabled className="px-10 py-5 rounded-2xl bg-gray-300 text-gray-600 text-xl">Brand Catalog (Soon)</button>
          </div>

          {/* Design Studio */}
          {activeTab === "design-studio" && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
                <h2 className="text-4xl font-bold">Design Studio – Sabse Powerful Feature</h2>
                <p className="text-xl mt-2 opacity-90">Yahan aap pura control mein ho!</p>
              </div>

              <div className="p-10">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left Side */}
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-3xl font-bold mb-5 text-indigo-900">1. Raw Plywood Photo</h3>
                      <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'raw')} className="w-full file:mr-6 file:py-5 file:px-10 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white text-xl cursor-pointer" />
                      {rawPhoto && <img src={rawPhoto} alt="Raw" className="mt-6 rounded-3xl shadow-2xl w-full border-4 border-indigo-100" />}
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
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold mb-5 text-indigo-900">3. Prompt (Optional)</h3>
                      <textarea
                        placeholder="Example: Dark walnut on doors, glossy white on drawers, natural teak on sides..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-8 border-4 border-indigo-200 rounded-3xl text-xl focus:border-indigo-600 outline-none h-48 resize-none"
                      />
                    </div>

                    <button
                      onClick={generate}
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
    </>
  );
}
