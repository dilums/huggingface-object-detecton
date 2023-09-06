import type { MatchItem } from "@/types";
import useStore from "@/store";
import { useCallback } from "react";
import clsx from "clsx";
type CompProps = {
  item: MatchItem;
  selected: string;
};
export default function Item({ item, selected }: CompProps) {
  const toggleIsolate = useStore((state) => state.toggleIsolate);
  const isolate = useStore((state) => state.isolate);
  const onClick = useCallback(() => {
    toggleIsolate(item.key);
  }, [toggleIsolate, item]);
  if (selected !== "all" && selected !== item.label) {
    return null;
  }

  return (
    <button className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" onClick={onClick}>
      <div
        className={clsx(
          "border rounded-md overflow-hidden",
          isolate === item.key &&
            "dark:border-green-800 dark:bg-green-800/10 border-green-300 bg-green-200/20"
        )}
      >
        <div className="border-b py-1 px-2 text-center font-semibold capitalize">
          {item.label}
        </div>
        <div className="p-2">
          <div className="relative overflow-hidden aspect-square">
            <img
              src={`data:image/png;base64,${item.extract}`}
              className="absolute left-0 top-0 w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="px-2 border-t pt-2">
          <div className="bg-zinc-200  dark:bg-zinc-800 h-1 rounded-md">
            <div
              className="h-1 score-fg rounded-md"
              style={{ width: `${Math.round(item.score * 100)}%` }}
            />
          </div>
        </div>
        <div className="py-1 px-2 text-center">
          Score : {item.score.toFixed(4)}
        </div>
      </div>
    </button>
  );
}
