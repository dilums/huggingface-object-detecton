"use client";
import useStore from "@/store";
import Preview from "@/components/ImageInput/Preview";

type CompProps = {};
export default function ImageInput({}: CompProps) {
  const handleImageChange = useStore((state) => state.handleImageChange);
  return (
    <>
      <label
        className="grow bg-zinc-100 dark:bg-zinc-900 rounded-md overflow-hidden grid place-items-center py-2"
        htmlFor="picture"
      >
        <Preview />
        <input
          className="hidden"
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
    </>
  );
}
