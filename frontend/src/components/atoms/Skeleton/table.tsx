import Skeleton from './';

export default function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="p-4">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
