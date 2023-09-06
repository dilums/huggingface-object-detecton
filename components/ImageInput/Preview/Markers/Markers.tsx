import useStore from "@/store";
import constants from "@/constants";
import type { MatchItem } from "@/types";
type CompProps = {};
export default function Markers({}: CompProps) {
  const { matches, width, height } = useStore(({ matches, width, height }) => ({
    matches,
    width,
    height,
  }));

  return (
    <>
      <svg
        className="absolute inset-x-0 top-0"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {matches.map((i) => (
          <Marker item={i} key={i.key} />
        ))}
      </svg>
    </>
  );
}

type MarkerProps = {
  item: MatchItem;
};
function Marker({ item }: MarkerProps) {
  const { setHovering, clearHovering } = useStore(
    ({ setHovering, clearHovering }) => ({ setHovering, clearHovering })
  );
  const selectedLabel = useStore((state) => state.selectedLabel);
  const isolate = useStore((state) => state.isolate);
  if (selectedLabel !== "all" && selectedLabel !== item.label) {
    return null;
  }
  if (isolate !== null && isolate !== item.key) {
    return null;
  }

  return (
    <rect
      x={item.x}
      y={item.y}
      width={item.width}
      height={item.height}
      className={constants.INDICATOR_COLORS[item.colorIndex]}
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="3"
      key={item.key}
      onMouseEnter={() => setHovering(item.key)}
      onMouseLeave={() => clearHovering(item.key)}
    />
  );
}
