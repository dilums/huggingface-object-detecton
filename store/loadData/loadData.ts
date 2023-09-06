import type { Set } from "@/store";
import type { DetectResponse } from "@/types";

export default async function loadData(
  set: Set,
  selectedFile: File,
  model: string
) {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("model", model);
    const response = await fetch("/api/detect", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result: DetectResponse = await response.json();
      set({
        ...result,
        loading: false,
        success: true,
        hovering: null,
        selectedLabel: "all",
        isolate: null,
      });
    } else {
      set({ error: true, loading: false, success: false });
    }
  } catch (error) {
    set({ error: true, loading: false, success: false });
  }
}
