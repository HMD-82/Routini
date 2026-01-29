interface CategoryBreakdownProps {
    title: string;
    items: {
        name: string;
        color: string;
        value: number;
        formatted: string;
    }[];
}

export function CategoryBreakdown({ title, items }: CategoryBreakdownProps) {
    if (items.length === 0) {
        return (
            <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <p className="text-sm text-muted-foreground/50 text-center py-8">
                    لا توجد بيانات بعد
                </p>
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">{title}</h3>

            {/* Progress Bar */}
            <div className="h-4 rounded-full overflow-hidden bg-white/50 flex mb-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="h-full transition-all duration-500"
                        style={{
                            width: `${(item.value / total) * 100}%`,
                            backgroundColor: item.color,
                        }}
                        title={`${item.name}: ${item.formatted}`}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div
                            className="w-4 h-4 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-sm font-medium">{item.formatted}</span>
                        <span className="text-xs text-muted-foreground w-12 text-left">
                            {Math.round((item.value / total) * 100)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
