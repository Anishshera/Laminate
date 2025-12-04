'use client';
import { useState } from 'react';

export default function Home() {
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handlePromptEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!rawPhoto) return;
      setLoading(true);
      setPromptHistory((prev) => [...prev, prompt]);
      setTimeout(() => {
        // Replace with your AI call
        setPreview('https://res.cloudinary.com/djzmfpmmv/image/upload/v1737070000/laminate-preview-sample.jpg');
        setLoading(false);
      }, 2000);
      setPrompt('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Upload Raw Plywood Photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e, 'raw')}
              className="w-full file:py-3 file:px-6 file:rounded-full file:bg-indigo-600 file:text-white"
            />
            {rawPhoto && <img src={rawPhoto} className="mt-4 rounded-xl shadow w-full" />}
          </div>
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
        </div>

        {/* Preview + Prompt */}
        <div className="mt-6">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full rounded-xl shadow" />
          ) : (
            <div className="w-full h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500">
              Preview Yahan Aayega
            </div>
          )}

          <textarea
            placeholder="Type prompt & press Enter → Dark walnut on doors, white drawers..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handlePromptEnter}
            className="mt-4 w-full p-4 border rounded-xl h-24 focus:outline-none"
          />
          {loading && <p className="mt-2 text-gray-600">AI Magic Ho Raha Hai...</p>}

          {promptHistory.length > 0 && (
            <div className="mt-4">
              <h4 className="font-bold mb-2">Prompt History:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {promptHistory.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
