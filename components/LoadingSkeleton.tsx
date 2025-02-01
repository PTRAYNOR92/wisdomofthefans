export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-emerald-700/30 rounded-md w-3/4" />
      <div className="h-4 bg-emerald-700/30 rounded-md w-1/2" />
      <div className="h-4 bg-emerald-700/30 rounded-md w-5/6" />
      <div className="h-4 bg-emerald-700/30 rounded-md w-2/3" />
    </div>
  )
}

