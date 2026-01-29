'use client';

import { Play } from 'lucide-react';
import { createActivity } from '@/app/activities/actions';
import { useTransition, useRef } from 'react';
import { showSuccess } from '@/lib/alerts';

interface Category {
    id: string;
    name: string;
    color?: string | null;
}

interface NewActivityFormProps {
    categories: Category[];
    hasActiveActivity: boolean;
}

export function NewActivityForm({ categories, hasActiveActivity }: NewActivityFormProps) {
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await createActivity(formData);
            formRef.current?.reset();
            showSuccess('تم بدء النشاط بنجاح! ⏱️');
        });
    };

    return (
        <div className="glass-card p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Play size={20} className="text-emerald-600" />
                {hasActiveActivity ? 'بدء نشاط جديد (سيتم إيقاف النشاط الحالي)' : 'بدء نشاط جديد'}
            </h2>

            <form ref={formRef} action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">عنوان النشاط</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="مثال: جلسة عمل عميق..."
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-2">الفئة</label>
                        <select
                            name="categoryId"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                        >
                            <option value="">اختر الفئة...</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-2">وصف (اختياري)</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="وصف مختصر للنشاط..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium shadow-lg hover:bg-emerald-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Play size={18} fill="currentColor" />
                    {isPending ? 'جارٍ البدء...' : 'ابدأ الآن'}
                </button>
            </form>
        </div>
    );
}
