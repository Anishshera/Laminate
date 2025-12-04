import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function segmentImage(imageUrl: string) {
  const output = await replicate.run(
    "facebook/sam2-hiera-large:2c0175ce987311b35df9a4d4e5e53e6d6c3e1d5b4c9a5f1e5e5e5e5e5e5e5e5e", // SAM2 model ID
    {
      input: {
        image: imageUrl,
        prompt: "Detect furniture sections like doors, drawers, top, sides",
      },
    }
  );
  return output;
}

export async function applyLaminate(rawImageUrl: string, laminateUrl: string, prompt: string, masks: any) {
  const output = await replicate.run(
    "black-forest-labs/flux-schnell:2a4f2a4f2a4f2a4f2a4f2a4f2a4f2a4f", // Flux model ID
    {
      input: {
        prompt: `Apply laminate texture from ${laminateUrl} to detected furniture sections in ${rawImageUrl}. Use masks: ${JSON.stringify(masks)}. ${prompt}`,
        image: rawImageUrl,
      },
    }
  );
  return output[0] as string;
}
