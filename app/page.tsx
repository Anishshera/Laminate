'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("design-studio");
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [randomPreview, setRandomPreview] = useState<string | null>(null);

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

  const generateDesignStudio = () => {
    if (!rawPhoto || laminates.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      setPreview("https://res.cloudinary.com/djzmfpmmv/image/upload/v1737070000/laminate-preview-sample.jpg");
      setLoading(false);
    }, 3000);
  };

  const generateRandomPreview = () => {
    setLoading(true);
    setTimeout(() => {
      setRandomPreview("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold">LaminateAI</h1>
          <nav className="space-x-6 text-lg">
            <button onClick={() => setActiveTab("instant")}>Instant Inspiration</button>
            <button onClick={() => setActiveTab("quick")}>Quick Preview</button>
            <button onClick={() => setActiveTab("design-studio")}>Design Studio</button>
            <button disabled className="opacity-50 cursor-not-allowed">Brand Catalog</button>
          </nav>
        </div>
      </header>

      {/* Tabs Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Instant Inspiration */}
        {activeTab === "instant" && (
          <div className="space-y-8 text-center">
            <h2 className="text-5xl font-bold text-indigo-900 mb-6">Instant Inspiration</h2>
            <p className="text-xl text-gray-700 mb-4">Upload wall / base structure photo → AI gives random furniture + laminate idea!</p>
            <input type="file" accept="image/*" onChange={generateRandomPreview} className="mb-6 file:py-3 file:px-6 file:bg-indigo-600 file:text-white file:rounded-full cursor-pointer"/>
            {loading ? <p className="text-lg font-semibold text-gray-600">AI generating preview...</p> : randomPreview && <img src={randomPreview} className="mx-auto rounded-3xl shadow-2xl w-full max-w-lg"/>}
          </div>
        )}

        {/* Quick Preview */}
        {activeTab === "quick" && (
          <div className="space-y-8 text-center">
            <h2 className="text-5xl font-bold text-indigo-900 mb-6">Quick Preview</h2>
            <p className="text-xl text-gray-700 mb-4">Upload raw plywood / unfinished furniture → AI applies random laminate preview!</p>
            <input type="file" accept="image/*" onChange={generateRandomPreview} className="mb-6 file:py-3 file:px-6 file:bg-purple-600 file:text-white file:rounded-full cursor-pointer"/>
            {loading ? <p className="text-lg font-semibold text-gray-600">AI generating preview...</p> : randomPreview && <img src={randomPreview} className="mx-auto rounded-3xl shadow-2xl w-full max-w-lg"/>}
          </div>
        )}

        {/* Design Studio */}
        {activeTab === "design-studio" && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-10">
            <h2 className="text-5xl font-bold text-indigo-900 text-center">Design Studio – Full Control</h2>
            <p className="text-xl text-gray-700 text-center">Upload raw plywood + multiple laminate photos → AI generates multi-section preview!</p>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">1. Raw Plywood Photo</h3>
                  <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'raw')} className="w-full file:py-3 file:px-6 file:bg-indigo-600 file:text-white file:rounded-full"/>
                  {rawPhoto && <img src={rawPhoto} className="mt-4 rounded-2xl shadow-md w-full"/>}
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">2. Laminates (Max 5)</h3>
                  <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'laminate')} className="w-full file:py-3 file:px-6 file:bg-purple-600 file:text-white file:rounded-full"/>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {laminates.map((url, i) => <img key={i} src={url} className="rounded-xl shadow-md h-32 object-cover"/>)}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">3. Prompt (Optional)</h3>
                  <textarea
                    placeholder="Example: Dark walnut on doors, white drawers..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button onClick={generateDesignStudio} disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl text-2xl font-bold hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                  {loading ? "AI Magic Chal Raha Hai..." : "Generate Preview"}
                </button>
              </div>

              {/* Right - Preview */}
              <div className="space-y-6 text-center">
                <h3 className="text-3xl font-bold text-indigo-900 mb-4">Your Preview</h3>
                {preview ? <img src={preview} className="mx-auto rounded-2xl shadow-2xl w-full"/> : <p className="text-gray-500 text-xl">Upload raw plywood + laminate → Generate Preview</p>}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <p className="text-xl">© 2025 LaminateAI – Free AI Tool for Furniture & Plywood Design</p>
          <p className="text-lg text-gray-200">Made with ❤️ by Anish Shera</p>
        </div>
      </footer>
    </div>
  );
}
