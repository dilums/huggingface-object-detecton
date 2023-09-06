import sharp from "sharp";

export async function isImageValid(arrayBuffer: ArrayBuffer): Promise<boolean> {
  try {
    const metadata = await sharp(Buffer.from(arrayBuffer)).metadata();
    return metadata.format !== undefined;
  } catch (error) {
    return false;
  }
}

export async function getImageDimensions(
  arrayBuffer: ArrayBuffer
): Promise<{ width: number; height: number }> {
  const metadata = await sharp(Buffer.from(arrayBuffer)).metadata();
  return { width: metadata.width || 0, height: metadata.height || 0 };
}

export async function extractPart(
  arrayBuffer: ArrayBuffer,
  {
    x,
    y,
    width,
    height,
  }: { x: number; y: number; width: number; height: number }
) {
  const out = await sharp(arrayBuffer)
    .extract({ left: x, top: y, width, height })
    .toBuffer();
  const img = out.toString("base64");
  return img;
}
