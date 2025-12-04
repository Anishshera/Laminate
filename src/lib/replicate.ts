import Replicate from "replicate";

// Replicate API token from environment variables
// The '!' tells TypeScript that this will never be undefined
const replicate = new Replicate({
  auth: process.env.replicate_api_token!,
});

/**
 * Detect furniture sections in an image using SAM2 model
 * @param imageUrl - URL of the furniture image
 * @returns segmentation output from the model
 */
export async function segmentImage(imageUrl: string) {
  try {
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
  } catch (error) {
    console.error("Error in segmentImage:", error);
    throw error;
  }
}

/**
 * Apply laminate texture to detected furniture sections
 * @param rawImageUrl - Original furniture image
 * @param laminateUrl - Laminate texture image
 * @param prompt - Additional instructions
 * @param masks - Segmentation masks from segmentImage
 * @returns URL of final laminated image
 */
export async function applyLaminate(
  rawImageUrl: string,
  laminateUrl: string,
  prompt: string,
  masks: any
) {
  try {
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
    );

    return output[0] as string;
  } catch (error) {
    console.error("Error in applyLaminate:", error);
    throw error;
  }
}
