import useStore from "@/store";
type CompProps = {
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
};

function getPos(ref: React.MutableRefObject<HTMLDivElement | null>) {
  if (!ref.current) {
    return [0, 0];
  }
  const rect = ref.current.getBoundingClientRect();
  return [rect.x + rect.width + 24, rect.top + 24];
}

export default function Highlight({ parentRef }: CompProps) {
  const item = useStore((state) => state.hovering);

  if (item === null) {
    return null;
  }

  const [left, top] = getPos(parentRef);
  return (
    <div
      className="fixed z-50 w-52 bg-white shadow-md dark:bg-zinc-950"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div className="border rounded-md overflow-hidden">
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
    </div>
  );
}
