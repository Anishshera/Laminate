"use client";
import React, { useState } from "react";

export default function LaminateVisualizer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [texturePreview, setTexturePreview] = useState<string>("");

  const handleMainImageUpload = (file: File | null) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTextureUpload = (file: File | null) => {
    if (file) {
      setTexturePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Laminate Visualizer</h1>

      {/* Upload Main Room Image */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Upload Room Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleMainImageUpload(e.target.files?.[0] ?? null)}
          className="file:px-5 file:py-2 file:bg-indigo-600 file:text-white rounded block mx-auto cursor-pointer"
        />

        {preview && (
          <img
            src={preview}
            alt="Room Preview"
            className="mt-4 rounded-lg shadow w-full"
          />
        )}
      </div>

      {/* Upload Laminate Texture */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Upload Laminate Texture</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleTextureUpload(e.target.files?.[0] ?? null)}
          className="file:px-5 file:py-2 file:bg-green-600 file:text-white rounded block mx-auto cursor-pointer"
        />

        {texturePreview && (
          <img
            src={texturePreview}
            alt="Laminate Texture"
            className="mt-4 rounded-lg shadow w-full object-cover"
          />
        )}
      </div>

      {/* Preview Side-by-Side */}
      {preview && texturePreview && (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-4">Comparison Preview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold mb-2">Original Image</p>
              <img src={preview} className="rounded-lg shadow w-full" />
            </div>

            <div>
              <p className="font-semibold mb-2">Laminate Texture</p>
              <img src={texturePreview} className="rounded-lg shadow w-full" />
            </div>
          </div>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Apply Laminate (Next Step)
          </button>
        </div>
      )}
    </div>
  );
}
