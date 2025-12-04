'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('design-studio');
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Multi-prompt session history
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  const handleUpload = async (e: any, type: 'raw' | 'laminate') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (type === 'raw') setRawPhoto(data.url);
    else setLaminates((prev) => [...prev, data.url].slice(0, 5));
  };

  const generate = async () => {
    if (!rawPhoto) return;
    setLoading(true);

    // Add prompt to history
    setPromptHistory((prev) => [...prev, prompt]);

    // Dummy AI generation logic for now
    setTimeout(() => {
      // Generate a sample preview (replace with real AI call)
      setPreview(
        'https://res.cloudinary.com/djzmfpmmv/image/upload/v1737070000/laminate-preview-sample.jpg'
      );
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('instant')}
            className={`px-10 py-4 rounded-2xl font-bold transition ${
              activeTab === 'instant'
                ? 'bg-indigo-600 text-white shadow-2xl'
                : 'bg-white text-gray-700 shadow-lg'
            }`}
          >
            Instant Inspiration
          </button>
          <button
            onClick={() => setActiveTab('quick')}
            className={`px-10 py-4 rounded-2xl font-bold transition ${
              activeTab === 'quick'
                ? 'bg-indigo-600 text-white shadow-2xl'
                : 'bg-white text-gray-700 shadow-lg'
            }`}
          >
            Quick Preview
          </button>
          <button
            onClick={() => setActiveTab('design-studio')}
            className={`px-12 py-6 rounded-2xl text-2xl font-black transition shadow-2xl ${
              activeTab === 'design-studio'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white'
                : 'bg-white text-indigo-700'
            }`}
          >
            Design Studio
          </button>
        </div>

        {/* Tool Panels */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Instant Inspiration */}
          {activeTab === 'instant' && (
            <div>
              <h2 className="text-3xl font-bold text-center mb-6">Instant AI Furniture + Laminate Ideas</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p>Upload wall / cement / base structure photo to get random furniture + laminate preview.</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, 'raw')}
                    className="w-full file:py-3 file:px-6 file:rounded-full file:bg-indigo-600 file:text-white"
                  />
                  <textarea
                    placeholder="Type prompt for specific style..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 border rounded-xl h-32"
                  />
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold"
                  >
                    {loading ? 'AI Magic...' : 'Generate Preview'}
                  </button>
                </div>
                <div>
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full rounded-xl shadow" />
                  ) : (
                    <div className="w-full h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500">
                      Preview Yahan Aayega
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Preview */}
          {activeTab === 'quick' && (
            <div>
              <h2 className="text-3xl font-bold text-center mb-6">Quick AI Laminate Preview</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p>Upload raw plywood / unfinished furniture photo and see random laminate applied.</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, 'raw')}
                    className="w-full file:py-3 file:px-6 file:rounded-full file:bg-indigo-600 file:text-white"
                  />
                  <textarea
                    placeholder="Type prompt to adjust style..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 border rounded-xl h-32"
                  />
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold"
                  >
                    {loading ? 'AI Magic...' : 'Generate Preview'}
                  </button>
                </div>
                <div>
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full rounded-xl shadow" />
                  ) : (
                    <div className="w-full h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500">
                      Preview Yahan Aayega
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Design Studio */}
          {activeTab === 'design-studio' && (
            <div>
              <h2 className="text-3xl font-bold text-center mb-6">Design Studio – Full Control</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p>Upload raw furniture / plywood photo once. Then use multiple prompts to tweak laminate results.</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, 'raw')}
                    className="w-full file:py-3 file:px-6 file:rounded-full file:bg-indigo-600 file:text-white"
                  />
                  <div>
                    <h3 className="font-bold mb-2">Upload Laminates (Up to 5)</h3>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUpload(e, 'laminate')}
                      className="w-full file:py-3 file:px-6 file:rounded-full file:bg-indigo-600 file:text-white"
                    />
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {laminates.map((l, i) => (
                        <img key={i} src={l} className="rounded-lg h-24 object-cover border" />
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Type prompt: Dark walnut on doors, white drawers, etc."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 border rounded-xl h-32"
                  />
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold"
                  >
                    {loading ? 'AI Magic...' : 'Generate Preview'}
                  </button>
                  {promptHistory.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-bold">Prompt History:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {promptHistory.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full rounded-xl shadow" />
                  ) : (
                    <div className="w-full h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500">
                      Preview Yahan Aayega
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
