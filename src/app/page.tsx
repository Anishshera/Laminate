'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { segmentImage, applyLaminate } from '@/lib/replicate';

export default function Home() {
  const [activeTab, setActiveTab] = useState('design-studio');
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [laminates, setLaminates] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'raw' | 'laminate') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const { url } = await res.json();

    if (type === 'raw') setRawPhoto(url);
    else setLaminates(prev => [...prev, url]);
  };

  const generatePreview = async () => {
    if (!rawPhoto || laminates.length === 0) return;

    const masks = await segmentImage(rawPhoto);
    const outputs = await Promise.all(
      laminates.map(lam => applyLaminate(rawPhoto, lam, prompt, masks))
    );
    setPreview(outputs[0]);
    setHistory(prev => [...prev, prompt]);

    await supabase.from('sessions').upsert({
      photo_url: rawPhoto,
      laminate_urls: laminates,
      prompt_history: history,
    });
  };

  const downloadPreview = () => {
    if (preview) {
      const a = document.createElement('a');
      a.href = preview;
      a.download = 'laminate-preview.png';
      a.click();
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8">LaminateAI</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="instant-inspiration">Instant Inspiration</TabsTrigger>
          <TabsTrigger value="quick-preview">Quick Preview</TabsTrigger>
          <TabsTrigger value="design-studio">Design Studio</TabsTrigger>
          <TabsTrigger value="brand-catalog" disabled>Brand Catalog (Coming Soon)</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Input type="file" onChange={(e) => handleUpload(e, 'raw')} accept="image/*" />
              {activeTab === 'design-studio' && (
                <Input type="file" multiple onChange={(e) => handleUpload(e, 'laminate')} accept="image/*" />
              )}
              <Textarea
                placeholder="Prompt e.g., 'Dark walnut on doors, white on drawers'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-20"
              />
              <Button onClick={generatePreview} className="w-full">Generate Preview</Button>
              {preview && (
                <div className="space-y-2">
                  <img src={preview} alt="Preview" className="w-full h-auto rounded-lg shadow-lg" />
                  <div className="flex gap-2">
                    <Button onClick={downloadPreview} variant="outline">Download</Button>
                    <Button onClick={() => navigator.share({ url: preview })}>Share</Button>
                  </div>
                </div>
              )}
              {history.length > 0 && (
                <div className="text-sm text-gray-600">
                  History: {history.slice(-3).join(' | ')}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
