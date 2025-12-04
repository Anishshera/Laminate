'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, Share2, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("design-studio");
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any, type: 'raw' | 'laminate') => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    
    if (type === 'raw') setRawPhoto(data.url);
    else setLaminates(prev => [...prev, data.url].slice(0, 5));
  };

  const generate = async () => {
    if (!rawPhoto || laminates.length === 0) return;
    setLoading(true);
    // Yahan tera Replicate AI call aayega – abhi dummy preview daal raha hoon
    setTimeout(() => {
      setPreview("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80");
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-5xl font-bold text-center my-8 text-indigo-900">LaminateAI</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="instant-inspiration">Instant Inspiration</TabsTrigger>
            <TabsTrigger value="quick-preview">Quick Preview</TabsTrigger>
            <TabsTrigger value="design-studio" className="text-lg font-bold">
              Design Studio ← Sabse Zyada Use
            </TabsTrigger>
            <TabsTrigger value="brand-catalog" disabled>Brand Catalog (Soon)</TabsTrigger>
          </TabsList>

          <TabsContent value="design-studio">
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-2">1 Raw Plywood Photo</label>
                    <Input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'raw')} />
                    {rawPhoto && <img src={rawPhoto} className="mt-4 rounded-lg shadow-lg max-h-64" />}
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-2">Up to 5 Laminates</label>
                    <Input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'laminate')} />
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {laminates.map((l, i) => (
                        <img key={i} src={l} className="rounded-lg shadow h-24 object-cover" />
                      ))}
                    </div>
                  </div>

                  <Textarea
                    placeholder="Ya yahan type karo: Dark walnut on doors, white on drawers..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-32 text-lg"
                  />

                  <Button onClick={generate} size="lg" className="w-full" disabled={loading}>
                    {loading ? "AI bana raha hai..." : "Generate Magic Preview"}
                  </Button>
                </div>

                {/* Right Side - Preview */}
                <div>
                  {preview ? (
                    <div className="space-y-4">
                      <img src={preview} className="w-full rounded-xl shadow-2xl" />
                      <div className="flex gap-4">
                        <Button className="flex-1"><Download className="mr-2" /> Download</Button>
                        <Button variant="outline" className="flex-1"><Share2 className="mr-2" /> Share</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500">
                      Preview yahan aayega...
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
