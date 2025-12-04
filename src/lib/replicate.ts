import Replicate from "replicate";

// Directly use your API token
const replicate = new Replicate({
  auth: "6cc931f4a19ec156307f2ea4ef17c5ec36a5f5e3",
});

/**
 * Detect furniture sections in an image using SAM2 model
 * @param imageUrl - URL of the image to segment
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
  );

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
    "black-forest-labs/flux-schnell:2a4f2a4f2a4f2a4f2a4f2a4f2a4f2a4f",
    {
      input: {
        prompt: `Apply laminate texture from ${laminateUrl} to detected furniture sections in ${rawImageUrl}. Use masks: ${JSON.stringify(
          masks
        )}. ${prompt}`,
        image: rawImageUrl,
      },
    }
  );

  return output[0] as string;
}
