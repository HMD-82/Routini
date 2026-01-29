'use client';

import { useState } from 'react';
import { createEntry } from '@/app/diary/actions';
import { Send, Smile, Frown, Meh, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/lib/alerts';

const moods = [
    { value: 'happy', label: 'سعيد', icon: Smile, color: 'text-emerald-600', bg: 'bg-emerald-100', ring: 'ring-emerald-300' },
    { value: 'neutral', label: 'محايد', icon: Meh, color: 'text-amber-600', bg: 'bg-amber-100', ring: 'ring-amber-300' },
    { value: 'sad', label: 'حزين', icon: Frown, color: 'text-rose-600', bg: 'bg-rose-100', ring: 'ring-rose-300' },
    { value: 'productive', label: 'منتج', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100', ring: 'ring-purple-300' },
];

export function NewEntryForm() {
    const [selectedMood, setSelectedMood] = useState('neutral');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData: FormData) {
        if (!content.trim()) return;

        setIsSubmitting(true);
        formData.append('mood', selectedMood);

        await createEntry(formData);

        setContent('');
        setIsSubmitting(false);
        showSuccess('تم حفظ المذكرة بنجاح! 📖');
    }

    return (
        <form action={handleSubmit} className="glass-card p-6">
            <h2 className="text-lg font-bold mb-4">كيف تشعر اليوم؟</h2>

            <div className="flex gap-3 mb-4 flex-wrap">
                {moods.map((m) => {
                    const Icon = m.icon;
                    const isSelected = selectedMood === m.value;
                    return (
                        <button
                            key={m.value}
                            type="button"
                            onClick={() => setSelectedMood(m.value)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full transition-all border-2",
                                isSelected
                                    ? `${m.bg} ${m.color} border-current font-bold`
                                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                            )}
                        >
                            <Icon size={18} />
                            <span className="text-sm">{m.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="relative">
                <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="بم تفكر اليوم؟ اكتب أفكارك ومشاعرك..."
                    className="w-full h-32 p-4 rounded-xl bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-none outline-none text-lg"
                    required
                />

                <button
                    type="submit"
                    disabled={!content.trim() || isSubmitting}
                    className="absolute bottom-4 left-4 p-3 bg-amber-500 text-white rounded-xl shadow-lg hover:bg-amber-600 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                >
                    <Send size={20} className={cn(isSubmitting && "animate-pulse")} />
                </button>
            </div>
        </form>
    );
}
