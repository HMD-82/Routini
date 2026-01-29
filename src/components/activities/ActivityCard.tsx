'use client';

import { Clock, Square, Trash2, Star } from 'lucide-react';
import { stopActivity, deleteActivity, rateActivity } from '@/app/activities/actions';
import { cn } from '@/lib/utils';
import { useTransition, useState, useEffect } from 'react';
import { showConfirm, showSuccess } from '@/lib/alerts';

interface ActivityCardProps {
    id: string;
    title: string;
    description?: string | null;
    startTime: Date;
    endTime?: Date | null;
    duration?: number | null;
    rating?: number | null;
    category: {
        name: string;
        color?: string | null;
        icon?: string | null;
    };
    isActive?: boolean;
}

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
        return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
}

function formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('ar-DZ', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

function LiveDuration({ startTime }: { startTime: Date }) {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const updateDuration = () => {
            const now = new Date();
            const start = new Date(startTime);
            const diffMinutes = Math.floor((now.getTime() - start.getTime()) / 60000);
            setDuration(diffMinutes);
        };

        updateDuration();
        const interval = setInterval(updateDuration, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <span className="text-2xl font-bold text-blue-600 animate-pulse">
            {formatDuration(duration)}
        </span>
    );
}

export function ActivityCard({
    id,
    title,
    description,
    startTime,
    endTime,
    duration,
    rating,
    category,
    isActive = false,
}: ActivityCardProps) {
    const [isPending, startTransition] = useTransition();
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    const handleStop = () => {
        startTransition(async () => {
            await stopActivity(id);
            showSuccess('تم إيقاف النشاط بنجاح!');
        });
    };

    const handleDelete = async () => {
        const confirmed = await showConfirm(
            'حذف النشاط',
            'هل تريد حذف هذا النشاط؟ لا يمكن التراجع عن هذا الإجراء.',
            'نعم، احذف',
            'إلغاء',
            true
        );
        if (confirmed) {
            startTransition(async () => {
                await deleteActivity(id);
                showSuccess('تم حذف النشاط بنجاح!');
            });
        }
    };

    const handleRate = (stars: number) => {
        startTransition(async () => {
            await rateActivity(id, stars);
        });
    };

    return (
        <div
            className={cn(
                "bg-white p-5 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 relative overflow-hidden group",
                "hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-offset-0 hover:border-transparent",
                isActive ? "ring-2 ring-blue-400 bg-blue-50/30 border-blue-200" : "hover:ring-gray-300"
            )}
        >
            {/* Active Indicator */}
            {isActive && (
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500" />
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full border"
                    style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color || '#4b5563',
                        borderColor: `${category.color}30`,
                    }}
                >
                    {category.name}
                </span>

                <div className="flex items-center gap-2">
                    {isActive ? (
                        <button
                            onClick={handleStop}
                            disabled={isPending}
                            className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
                            title="إيقاف النشاط"
                        >
                            <Square size={16} fill="currentColor" />
                        </button>
                    ) : (
                        <button
                            onClick={handleDelete}
                            disabled={isPending}
                            className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                            title="حذف النشاط"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 mb-1">المدة</span>
                    {isActive ? (
                        <LiveDuration startTime={startTime} />
                    ) : (
                        <span className="text-lg font-bold text-gray-700">
                            {duration ? formatDuration(duration) : '-'}
                        </span>
                    )}
                </div>

                {/* Rating or Time */}
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 mb-1">
                        {isActive ? 'بدأ في' : 'التقييم'}
                    </span>
                    {isActive ? (
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-1" suppressHydrationWarning>
                            <Clock size={14} />
                            {formatTime(startTime)}
                        </span>
                    ) : (
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRate(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(null)}
                                    disabled={isPending}
                                    className="p-0.5 transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={16}
                                        className={cn(
                                            "transition-colors",
                                            (hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                                                ? "text-amber-400 fill-amber-400"
                                                : "text-gray-200 fill-gray-100"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
