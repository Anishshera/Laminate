import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-indigo-900 mb-6">
          LaminateAI
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          Free AI Laminate Try-On Tool
        </p>
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <p className="text-3xl font-semibold text-green-600 mb-4">
            100% LIVE HO GAYA BHAI!!! 
          </p>
          <p className="text-xl text-gray-600">
            Ab baaki features (Design Studio, multi-laminate, prompt, download) ek-ek karke add kar denge.<br />
            Pehle tu khud dekh le site chal rahi hai!
          </p>
        </div>
      </div>
    </div>
  );
}
