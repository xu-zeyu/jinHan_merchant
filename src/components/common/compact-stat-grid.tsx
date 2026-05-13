type CompactStatItem = {
    hint: string;
    label: string;
    value: string;
};

type CompactStatGridProps = {
    items: CompactStatItem[];
};

export function CompactStatGrid({ items }: CompactStatGridProps) {
    return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {items.map(({ label, value, hint }) => (
                <div
                    key={label}
                    className="rounded-2xl bg-card px-4 py-3 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.26)]"
                >
                    <div className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                        {label}
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-3">
                        <span className="text-xl font-semibold tracking-tight">{value}</span>
                        <span className="text-right text-xs text-muted-foreground">
              {hint}
            </span>
                    </div>
                </div>
            ))}
        </div>
    );
}