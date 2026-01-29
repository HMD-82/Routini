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
        <span className="text-2xl font-bold text-primary animate-pulse">
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
                "glass-card p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1",
                isActive && "ring-2 ring-primary/50 bg-primary/5"
            )}
        >
            {/* Active Indicator */}
            {isActive && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary to-accent" />
            )}

            {/* Category Badge */}
            <div className="flex items-center justify-between mb-3">
                <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                        backgroundColor: `${category.color}20`,
                        color: category.color || 'var(--primary)',
                    }}
                >
                    {category.name}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {isActive ? (
                        <button
                            onClick={handleStop}
                            disabled={isPending}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            title="إيقاف النشاط"
                        >
                            <Square size={16} fill="currentColor" />
                        </button>
                    ) : (
                        <button
                            onClick={handleDelete}
                            disabled={isPending}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                            title="حذف النشاط"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground mb-3">{description}</p>
            )}

            {/* Time Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{formatTime(startTime)}</span>
                    {endTime && (
                        <>
                            <span>-</span>
                            <span>{formatTime(endTime)}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between">
                {isActive ? (
                    <LiveDuration startTime={startTime} />
                ) : (
                    <span className="text-lg font-bold text-foreground">
                        {duration ? formatDuration(duration) : '-'}
                    </span>
                )}

                {/* Rating (only for completed activities) */}
                {!isActive && (
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRate(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(null)}
                                disabled={isPending}
                                className="p-0.5 transition-transform hover:scale-110 disabled:opacity-50"
                            >
                                <Star
                                    size={16}
                                    className={cn(
                                        "transition-colors",
                                        (hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                                            ? "text-amber-500 fill-amber-500"
                                            : "text-muted-foreground/30"
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
