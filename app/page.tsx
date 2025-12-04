"use client";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const generate = async () => {
    if (!image || !prompt) return alert("Upload photo & write instruction");

    const form = new FormData();
    form.append("file", image);
    form.append("prompt", prompt);

    const res = await fetch("/upload", { method:"POST", body:form });
    const data = await res.json();

    alert("AI Response Coming Next Step");
    console.log(data);
  };

  return (
    <div className="p-6 flex flex-col gap-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Design Studio</h1>

      <label className="p-3 border rounded cursor-pointer text-center">
        Upload Furniture Image
        <input type="file" onChange={handleUpload} className="hidden" />
      </label>

      {preview && <img src={preview} className="rounded w-full mt-2" />}

      <textarea
        placeholder="Describe your laminate idea..."
        className="p-3 border rounded"
        onChange={(e)=>setPrompt(e.target.value)}
      />

      <button onClick={generate} className="bg-black text-white p-3 rounded">
        Generate Preview
      </button>
    </div>
  );
}
