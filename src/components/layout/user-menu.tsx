export function UserMenu() {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
        JH
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">JinHan 店铺</p>
        <p className="truncate text-xs text-slate-500">merchant@jinhan.pet</p>
      </div>
    </div>
  );
}
