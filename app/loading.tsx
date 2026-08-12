export default function Loading() {
  return (
    <main className="page-shell py-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-56 animate-pulse rounded-[32px] bg-white/70" />
        <div className="h-10 w-1/3 animate-pulse rounded-full bg-white/70" />
        <div className="h-32 animate-pulse rounded-3xl bg-white/70" />
        <div className="h-32 animate-pulse rounded-3xl bg-white/70" />
      </div>
    </main>
  );
}
