import Replicate from "replicate";

// Use your API token directly (or from env)
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "6cc931f4a19ec156307f2ea4ef17c5ec36a5f5e3",
});

/**
 * Detect furniture sections in an image using SAM2 model
 */
export async function segmentImage(imageUrl: string) {
  const output = await replicate.run(
    "facebook/sam2-hiera-large:2c0175ce987311b35df9a4d4e5e53e6d6c3e1d5b4c9a5f1e5e5e5e5e5e5e5e5e",
    {
      input: {
        image: imageUrl,
        prompt: "Detect furniture sections like doors, drawers, top, sides",
      },
    }
  ) as any[]; // <-- TypeScript ko bata diya ki output array hai

  return output;
}

/**
 * Apply laminate texture to detected furniture sections
 */
export async function applyLaminate(
  rawImageUrl: string,
  laminateUrl: string,
  prompt: string,
  masks: any
) {
  const output = await replicate.run(
    "black-forest-labs/flux-schnell:2a4f2a4f2a4f2a4f2a4f2a4f2a4f",
    {
      input: {
        prompt: `Apply laminate texture from ${laminateUrl} to detected furniture sections in ${rawImageUrl}. Use masks: ${JSON.stringify(
          masks
        )}. ${prompt}`,
        image: rawImageUrl,
      },
    }
  ) as string[]; // <-- TypeScript ko bata diya ki output string array hai

  return output[0]; // ab valid hai
}
