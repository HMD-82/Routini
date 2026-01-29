'use client';

import { deleteEntry } from '@/app/diary/actions';
import { Trash2, Smile, Frown, Meh, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { showConfirm, showSuccess } from '@/lib/alerts';

const moodIcons: Record<string, any> = {
    happy: Smile,
    neutral: Meh,
    sad: Frown,
    productive: Zap,
};

const moodColors: Record<string, string> = {
    happy: 'text-emerald-500 bg-emerald-100',
    neutral: 'text-amber-500 bg-amber-100',
    sad: 'text-rose-500 bg-rose-100',
    productive: 'text-purple-500 bg-purple-100',
};

interface DiaryEntryProps {
    id: string;
    content: string;
    mood: string | null;
    createdAt: Date;
}

export function DiaryEntryCard({ id, content, mood, createdAt }: DiaryEntryProps) {
    const [isPending, startTransition] = useTransition();

    const moodKey = mood || 'neutral';
    const Icon = moodIcons[moodKey] || Meh;
    const colorClass = moodColors[moodKey] || moodColors.neutral;

    const handleDelete = async () => {
        const confirmed = await showConfirm(
            'حذف المذكرة',
            'هل أنت متأكد من حذف هذه المذكرة؟ لا يمكن التراجع عن هذا الإجراء.',
            'نعم، احذف',
            'إلغاء',
            true
        );
        if (confirmed) {
            startTransition(() => {
                deleteEntry(id);
                showSuccess('تم حذف المذكرة بنجاح!');
            });
        }
    };

    return (
        <div className={cn("glass-card p-6 group transition-all duration-300 hover:bg-white/90", isPending && "opacity-50 scale-95")}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", colorClass)}>
                        <Icon size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground">
                            {new Date(createdAt).toLocaleDateString('ar-DZ', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(createdAt).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleDelete}
                    className="text-muted-foreground/50 hover:text-rose-500 transition-colors p-2 rounded-full hover:bg-rose-50 opacity-0 group-hover:opacity-100"
                    disabled={isPending}
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap font-medium">
                {content}
            </p>
        </div>
    );
}
