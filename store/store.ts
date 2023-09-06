import { create } from "zustand";
import { ChangeEvent } from "react";
import type { DetectResponse, MatchItem } from "@/types";
import loadData from "./loadData";

export interface State extends DetectResponse {
  file?: File;
  loading: boolean;
  error: boolean;
  success: boolean;
  previewURL: string;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  setHovering: (key: number) => void;
  clearHovering: (key: number) => void;
  setSelectedLabel: (label: string) => void;
  toggleIsolate: (key: number) => void;
  hovering: null | MatchItem;
  selectedLabel: string;
  isolate: null | number;
  model: string;
  setModel: (value: string) => void;
  retry: () => void;
}

export type Set = (
  partial: State | Partial<State> | ((state: State) => State | Partial<State>),
  replace?: boolean | undefined
) => void;

const useStore = create<State>((set, get) => ({
  loading: false,
  error: false,
  success: false,
  previewURL: "",
  width: 0,
  height: 0,
  matches: [],
  labels: [],
  hovering: null,
  selectedLabel: "all",
  isolate: null,
  model: "facebook/detr-resnet-50",
  handleImageChange: async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      set(() => ({
        loading: true,
        file: selectedFile,
        error: false,
        success: false,
        previewURL,
      }));
      const model = get().model;

      loadData(set, selectedFile, model);
    }
  },
  setHovering: (key: number) => {
    set((state) => {
      const item = state.matches.find((i) => i.key === key);
      return { hovering: item || null };
    });
  },
  clearHovering: (key: number) => {
    const hovering = get().hovering;
    if (hovering && hovering.key === key) {
      set({ hovering: null });
    }
  },
  setSelectedLabel: (label: string) => {
    set({ selectedLabel: label, isolate: null });
  },
  toggleIsolate: (key: number) => {
    set((state) => {
      if (state.isolate === key) {
        return { isolate: null };
      }
      return { isolate: key };
    });
  },
  setModel: (value: string) => {
    set({
      model: value,
      loading: true,
      error: false,
      success: false,
    });
    const selectedFile = get().file;
    if (selectedFile) {
      loadData(set, selectedFile, value);
    }
  },
  retry: () => {
    set({
      loading: true,
      error: false,
      success: false,
    });
    const { file, model } = get();
    if (file) {
      loadData(set, file, model);
    }
  },
}));

export default useStore;
