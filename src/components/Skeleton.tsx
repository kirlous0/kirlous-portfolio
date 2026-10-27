export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-border/50 ${className}`} />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="border border-border p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
    </div>
  );
}

export function ProjectsListSkeleton() {
  return (
    <div className="grid gap-4">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  );
}
