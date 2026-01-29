import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number | React.ReactNode;
    subtitle?: string | React.ReactNode;
    icon: LucideIcon;
    color: 'primary' | 'emerald' | 'rose' | 'amber' | 'purple' | 'blue';
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

const colorStyles = {
    primary: {
        bg: 'bg-indigo-50 text-indigo-600',
        ring: 'hover:ring-indigo-300',
        shadow: 'hover:shadow-indigo-100',
    },
    emerald: {
        bg: 'bg-emerald-50 text-emerald-600',
        ring: 'hover:ring-emerald-300',
        shadow: 'hover:shadow-emerald-100',
    },
    rose: {
        bg: 'bg-rose-50 text-rose-600',
        ring: 'hover:ring-rose-300',
        shadow: 'hover:shadow-rose-100',
    },
    amber: {
        bg: 'bg-amber-50 text-amber-600',
        ring: 'hover:ring-amber-300',
        shadow: 'hover:shadow-amber-100',
    },
    purple: {
        bg: 'bg-purple-50 text-purple-600',
        ring: 'hover:ring-purple-300',
        shadow: 'hover:shadow-purple-100',
    },
    blue: {
        bg: 'bg-blue-50 text-blue-600',
        ring: 'hover:ring-blue-300',
        shadow: 'hover:shadow-blue-100',
    },
};

export function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
    const styles = colorStyles[color];

    return (
        <div className={cn(
            "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 cursor-default relative overflow-hidden",
            "hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-offset-0 hover:border-transparent",
            styles.ring,
            styles.shadow
        )}>
            <div className="flex items-center gap-5">
                <div className={cn("p-4 rounded-2xl shrink-0 transition-colors", styles.bg)}>
                    <Icon size={26} strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 leading-none tracking-tight" suppressHydrationWarning>{value}</h3>
                        {trend && (
                            <span className={cn(
                                "text-xs font-bold px-2 py-0.5 rounded-full",
                                trend.isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                            )}>
                                {trend.value}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {subtitle && (
                <div className="mt-4 pt-4 border-t border-gray-50 text-xs font-medium text-gray-400 flex items-center gap-1" suppressHydrationWarning>
                    {subtitle}
                </div>
            )}
        </div>
    );
}
