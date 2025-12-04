import Replicate from "replicate";

// Initialize Replicate client with environment variable
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "", // fallback empty string
});

/**
 * Detect furniture sections in an image using SAM2 model
 * @param imageUrl - URL of the input image
 * @returns - Promise of the segmentation output (any type for flexibility)
 */
export async function segmentImage(imageUrl: string): Promise<any> {
  const output = await replicate.run(
    "facebook/sam2-hiera-large:2c0175ce987311b35df9a4d4e5e53e6d6c3e1d5b4c9a5f1e5e5e5e5e5e5e5e",
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
 * @param rawImageUrl - URL of the original image
 * @param laminateUrl - URL of the laminate texture image
 * @param prompt - Additional prompt instructions
 * @param masks - Masks from segmentImage function
 * @returns - Promise of the processed image URL as string
 */
export async function applyLaminate(
  rawImageUrl: string,
  laminateUrl: string,
  prompt: string,
  masks: any
): Promise<string> {
  const output: string[] = await replicate.run(
    "black-forest-labs/flux-schnell:2a4f2a4f2a4f2a4f2a4f2a4f2a4f",
    {
      input: {
        prompt: `Apply laminate texture from ${laminateUrl} to detected furniture sections in ${rawImageUrl}. Use masks: ${JSON.stringify(
          masks
        )}. ${prompt}`,
        image: rawImageUrl,
      },
    }
  );

  return output[0];
}
