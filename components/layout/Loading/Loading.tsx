"use client";
import { range } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useStore from "@/store";
type CompProps = {};

export default function Loading({}: CompProps) {
  const loading = useStore((state) => state.loading);

  if (!loading) {
    return null;
  }
  return (
    <div className="flex flex-wrap">
      {range(8).map((i) => (
        <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={i}>
          <Skeleton className="aspect-square" />
        </div>
      ))}
    </div>
  );
}
