"use client";
import useStore from "@/store";
import Filters from "@/components/Results/Filters";
import Item from "@/components/Results/Item";
type CompProps = {};
export default function Results({}: CompProps) {
  const matches = useStore((state) => state.matches);
  const selectedLabel = useStore((state) => state.selectedLabel);
  return (
    <>
      <Filters />
      <div className="flex flex-wrap">
        {matches.map((item) => (
          <Item key={item.key} item={item} selected={selectedLabel} />
        ))}
      </div>
    </>
  );
}
