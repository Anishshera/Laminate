'use client';
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [tab, setTab] = useState("studio");

  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [chat, setChat] = useState<{role:"user"|"ai",text:string}[]>([]);
  const [input,setInput]=useState("");
  const [preview,setPreview]=useState<string|null>(null);
  const inputRef = useRef<HTMLTextAreaElement|null>(null);
  const chatEndRef = useRef<HTMLDivElement|null>(null);

  /** Upload Handler **/
  const handleUpload = (e:any,type:'photo'|'laminate')=>{
    const file=e.target.files?.[0];
    if(!file) return;
    const url=URL.createObjectURL(file);

    if(type==="photo") setRawPhoto(url);
    if(type==="laminate"){
      if(laminates.length>=5) return alert("Max 5 laminates allowed");
      setLaminates([...laminates,url]);
    }
  };

  /** ChatGPT style send **/
  const sendPrompt = ()=>{
    if(!input.trim()) return;
    setChat(c=>[...c,{role:"user",text:input}]);

    setTimeout(()=>{
      setChat(c=>[...c,{role:"ai",text:"Applying laminate as per your instruction..."}]);
      setPreview(rawPhoto); // placeholder, later replace with AI-generated result
    },800);

    setInput("");
  };

  /** ENTER submit **/
  const keyPress=(e:any)=>{
    if(e.key==="Enter" && !e.shiftKey){
      e.preventDefault();
      sendPrompt();
    }
  };

  /** Download **/
  const downloadImg = ()=>{
    if(!preview) return;
    const link=document.createElement("a");
    link.href=preview;
    link.download="design-preview.jpg";
    link.click();
  };

  /** Share **/
  const shareImg=()=>{
    if(navigator.share && preview){
      navigator.share({
        title:"Laminate AI Result",
        text:"Check my design preview",
        url:preview
      });
    } else alert("Sharing not supported in this browser");
  };

  /** Scroll chat to bottom **/
  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:'smooth'});
  },[chat]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-6">
        Home Decor AI Studio
      </h1>

      {/* TABS */}
      <div className="flex gap-4 justify-center mb-10">
        {[
          {id:"instant",label:"⚡ Instant Inspiration"},
          {id:"quick",label:"🖼 Quick Preview"},
          {id:"studio",label:"🎨 Design Studio"}
        ].map(t=>(
          <button key={t.id}
            onClick={()=>setTab(t.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
                tab===t.id?"bg-indigo-600 text-white shadow-lg":"bg-white shadow"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TOOL - 1 : Instant Inspiration */}
      {tab==="instant" &&(
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-3">Instant Inspiration 🔥</h2>
          <p className="text-gray-600 mb-6">AI randomly generates laminate ideas for your furniture.</p>

          <button className="px-8 py-4 text-xl bg-purple-600 text-white rounded-xl font-bold">
            Generate Ideas (Placeholder)
          </button>

          <p className="text-sm text-gray-400 mt-3">Later we will connect AI moodboard generator.</p>
        </div>
      )}

      {/* TOOL - 2 : Quick Preview */}
      {tab==="quick" &&(
        <div className="bg-white p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-5 text-center">Quick Preview 🖼</h2>

          <input type="file" accept="image/*"
            onChange={(e)=>setPreview(URL.createObjectURL(e.target.files?.[0]||null))}
            className="file:px-5 file:py-2 file:bg-indigo-600 file:text-white rounded mb-6 block mx-auto"/>

          {preview?
            <img src={preview} className="mx-auto rounded-xl shadow-lg max-h-[70vh]"/>:
            <p className="text-center text-gray-500">Upload image to preview</p>
          }
        </div>
      )}

      {/* TOOL - 3 : Design Studio AI */}
      {tab==="studio" &&(
        <div className="bg-white shadow-2xl rounded-3xl p-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Design Studio</h2>

          <div className="grid grid-cols-12 gap-6">

            {/* LEFT Upload */}
            <div className="col-span-12 md:col-span-3 space-y-5">
              <p className="font-bold">Upload Furniture</p>
              <input type="file" accept="image/*"
                onChange={(e)=>handleUpload(e,"photo")}
                className="file:bg-indigo-600 file:text-white file:px-4 file:py-2 rounded w-full"/>

              {rawPhoto && <img src={rawPhoto} className="rounded shadow mt-2"/>}

              <p className="font-bold mt-5">Add Laminates (5 max)</p>
              <input type="file" accept="image/*"
                onChange={(e)=>handleUpload(e,"laminate")}
                className="file:bg-purple-600 file:text-white file:px-4 file:py-2 rounded w-full"/>

              <div className="grid grid-cols-3 gap-2">
                {laminates.map((l,i)=><img key={i} src={l} className="rounded shadow h-16"/>)}
              </div>
            </div>

            {/* CENTER Preview */}
            <div className="col-span-12 md:col-span-6 flex items-center justify-center bg-gray-50 rounded-xl p-4">
              {preview?<img src={preview} className="rounded-xl shadow max-h-[70vh]"/>:
                <p className="text-gray-400">Preview will appear here</p>}
            </div>

            {/* RIGHT Chat-Prompt */}
            <div className="col-span-12 md:col-span-3 flex flex-col">
              <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-3 space-y-2 mb-4">
                {chat.map((m,i)=>(
                  <p key={i} className={`${m.role==="user"?"text-blue-600":"text-gray-800"} text-sm`}>
                    <b>{m.role==="user"?"You":"AI"}:</b> {m.text}
                  </p>
                ))}
                <div ref={chatEndRef}></div>
              </div>

              <textarea ref={inputRef}
                value={input} onChange={(e)=>setInput(e.target.value)}
                onKeyDown={keyPress}
                placeholder="Type laminate instruction and press Enter..."
                className="flex-1 p-3 rounded-xl border h-20 resize-none mb-2"/>

              {preview &&(
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button onClick={downloadImg} className="bg-black text-white py-2 rounded-lg">Download</button>
                  <button onClick={shareImg} className="bg-indigo-600 text-white py-2 rounded-lg">Share</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
