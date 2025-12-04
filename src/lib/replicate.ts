import Replicate from "replicate";

// Ensure environment variable is set, else throw at runtime
const replicateToken = process.env.REPLICATE_API_TOKEN;
if (!replicateToken) throw new Error("REPLICATE_API_TOKEN is not set in environment!");

const replicate = new Replicate({
  auth: replicateToken,
});

/**
 * Detect furniture sections in an image using SAM2 model
 */
export async function segmentImage(imageUrl: string): Promise<any | null> {
  try {
    const output: any = await replicate.run(
      "facebook/sam2-hiera-large:2c0175ce987311b35df9a4d4e5e53e6d6c3e1d5b4c9a5f1e5e5e5e5e5e5e5e",
      {
        input: {
          image: imageUrl,
          prompt: "Detect furniture sections like doors, drawers, top, sides",
        },
      }
    );

    return output ?? null;
  } catch (err) {
    console.error("Segment image error:", err);
    return null;
  }
}

/**
 * Apply laminate texture to detected furniture sections
 */
export async function applyLaminate(
  rawImageUrl: string,
  laminateUrl: string,
  prompt: string,
  masks: any
): Promise<string | null> {
  try {
    const output: any = await replicate.run(
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

    if (Array.isArray(output) && output.length > 0) return output[0] as string;
    if (typeof output === "string") return output;
    
    console.warn("Unexpected output from Replicate:", output);
    return null;
  } catch (err) {
    console.error("Apply laminate error:", err);
    return null;
  }
}
