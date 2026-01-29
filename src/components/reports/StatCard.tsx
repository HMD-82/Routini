import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    color: 'primary' | 'emerald' | 'rose' | 'amber' | 'purple' | 'blue';
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

const colorClasses = {
    primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        blur: 'bg-primary/10',
    },
    emerald: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-600',
        blur: 'bg-emerald-500/10',
    },
    rose: {
        bg: 'bg-rose-100',
        text: 'text-rose-500',
        blur: 'bg-rose-500/10',
    },
    amber: {
        bg: 'bg-amber-100',
        text: 'text-amber-600',
        blur: 'bg-amber-500/10',
    },
    purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        blur: 'bg-purple-500/10',
    },
    blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        blur: 'bg-blue-500/10',
    },
};

export function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
    const colors = colorClasses[color];

    return (
        <div className="glass-card p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className={cn("absolute top-0 left-0 w-24 h-24 rounded-full -translate-x-8 -translate-y-8 blur-2xl transition-all", colors.blur, "group-hover:scale-150")} />

            <div className="flex justify-between items-start mb-3 relative">
                <div className={cn("p-3 rounded-xl", colors.bg, colors.text)}>
                    <Icon size={22} />
                </div>
                {trend && (
                    <span
                        className={cn(
                            "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                            trend.isPositive
                                ? "text-emerald-600 bg-emerald-100"
                                : "text-rose-600 bg-rose-100"
                        )}
                    >
                        {trend.value}
                    </span>
                )}
            </div>

            <div className="relative">
                <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
                {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                )}
            </div>
        </div>
    );
}
