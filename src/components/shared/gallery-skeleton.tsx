import { Skeleton } from "@/components/ui/skeleton";

export function GallerySkeleton() {
  const heights = ["h-96", "h-64", "h-80", "h-48", "h-96", "h-72"];

  return (
    <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
      {heights.map((height, i) => (
        <div key={i} className="mb-3 break-inside-avoid">
          <Skeleton
            className={`w-full rounded-sm ${height} bg-[#1a1a1a]`}
          />
        </div>
      ))}
    </div>
  );
}
