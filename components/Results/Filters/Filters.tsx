import useStore from "@/store";
import { useCallback } from "react";
import clsx from "clsx";

export default function Filters() {
  const labels = useStore((state) => state.labels);
  const selectedLabel = useStore((state) => state.selectedLabel);
  const setSelectedLabel = useStore((state) => state.setSelectedLabel);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setSelectedLabel(e.currentTarget.id);
    },
    [setSelectedLabel]
  );
  return (
    <div className="flex flex-wrap">
      {["all", ...labels].map((i) => (
        <div className="p-2" key={i}>
          <button
            className={clsx(
              "capitalize px-6 py-1 rounded-full border",
              selectedLabel === i
                ? "bg-zinc-300 dark:bg-zinc-700"
                : "bg-transperant"
            )}
            id={i}
            onClick={onClick}
          >
            {i}
          </button>
        </div>
      ))}
    </div>
  );
}
