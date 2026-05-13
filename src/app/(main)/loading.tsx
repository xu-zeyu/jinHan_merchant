export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-7 w-48 animate-pulse rounded-xl bg-muted" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded-xl bg-muted" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-card p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.24)]"
          >
            <div className="h-4 w-20 animate-pulse rounded-xl bg-muted" />
            <div className="mt-3 h-8 w-28 animate-pulse rounded-xl bg-muted" />
            <div className="mt-2 h-3 w-16 animate-pulse rounded-xl bg-muted" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <div className="rounded-2xl bg-card p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.24)]">
          <div className="h-5 w-24 animate-pulse rounded-xl bg-muted" />
          <div className="mt-1 h-4 w-40 animate-pulse rounded-xl bg-muted" />
          <div className="mt-6 h-48 animate-pulse rounded-xl bg-muted" />
        </div>
        <div className="rounded-2xl bg-card p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.24)]">
          <div className="h-5 w-24 animate-pulse rounded-xl bg-muted" />
          <div className="mt-1 h-4 w-32 animate-pulse rounded-xl bg-muted" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded-xl bg-muted" />
                  <div className="h-3 w-24 animate-pulse rounded-xl bg-muted" />
                </div>
                <div className="h-5 w-16 animate-pulse rounded-xl bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
