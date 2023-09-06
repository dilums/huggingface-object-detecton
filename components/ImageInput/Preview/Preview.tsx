"use client";
import useStore from "@/store";
import SuccessWrapper from "@/components/layout/SuccessWrapper";
import Markers from "@/components/ImageInput/Preview/Markers";
import Highlight from "@/components/ImageInput/Highlight";
import { useRef } from "react";
type CompProps = {};
export default function Preview({}: CompProps) {
  const previewURL = useStore((state) => state.previewURL);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!previewURL) {
    return <Placeholder />;
  }
  return (
    <div className="relative inline-flex overflow-hidden max-w-lg" ref={ref}>
      <img alt="" className="object-contain" src={previewURL} />
      <SuccessWrapper>
        <Highlight parentRef={ref} />
        <Markers />
      </SuccessWrapper>
    </div>
  );
}

function Placeholder() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-60 h-60 text-zinc-200 dark:text-zinc-800"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}
