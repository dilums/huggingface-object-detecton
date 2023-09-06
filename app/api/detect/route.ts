import { NextResponse } from "next/server";
import { extractPart, getImageDimensions, isImageValid } from "./utils";
import { processData } from "./data";
import constants from "@/constants";
import type { DetectResponse } from "@/types";

async function query(file: File, model: string) {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      method: "POST",
      body: file,
    }
  );
  const result = await response.json();
  return result;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("file");
  const model = formData.get("model") as string;

  if (image instanceof Blob) {
    const buffer = await image.arrayBuffer();
    const isValidImage = await isImageValid(buffer);
    if (isValidImage) {
      const { width, height } = await getImageDimensions(buffer);
      const matches = [];
      const labels: string[] = [];

      const result = await query(image, model);
      if (Array.isArray(result)) {
        const processed = processData(result);
        for (let i = 0; i < processed.length; i++) {
          const item = processed[i];
          const extract = await extractPart(buffer, item);
          const labelIndex = labels.findIndex((i) => i === item.label);
          let colorIndex;
          if (labelIndex !== -1) {
            colorIndex = labelIndex % constants.INDICATOR_COLORS.length;
          } else {
            colorIndex = labels.length % constants.INDICATOR_COLORS.length;
            labels.push(item.label);
          }
          matches.push({ ...item, extract, colorIndex });
        }

        const res: DetectResponse = { width, height, matches, labels };
        return NextResponse.json(res);
      }
    }
  }
  return NextResponse.json({ error: true });
}
