'use client';

import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { createTransaction } from '@/app/finance/actions';
import { useTransition, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/lib/alerts';

interface Category {
    id: string;
    name: string;
    type: string;
    color?: string | null;
}

interface NewTransactionFormProps {
    incomeCategories: Category[];
    expenseCategories: Category[];
}

export function NewTransactionForm({ incomeCategories, expenseCategories }: NewTransactionFormProps) {
    const [isPending, startTransition] = useTransition();
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const formRef = useRef<HTMLFormElement>(null);

    const categories = type === 'income' ? incomeCategories : expenseCategories;

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await createTransaction(formData);
            formRef.current?.reset();
            showSuccess(type === 'income' ? 'تم إضافة الدخل بنجاح! 💸' : 'تم تسجيل المصروف بنجاح! 💰');
        });
    };

    return (
        <div className="glass-card p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Plus size={20} className="text-emerald-600" />
                إضافة معاملة جديدة
            </h2>

            <form ref={formRef} action={handleSubmit} className="space-y-4">
                {/* Type Toggle */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border-2",
                            type === 'expense'
                                ? "bg-rose-50 border-rose-500 text-rose-600"
                                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                        )}
                    >
                        <ArrowDownRight size={20} />
                        مصروف
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('income')}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border-2",
                            type === 'income'
                                ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                        )}
                    >
                        <ArrowUpRight size={20} />
                        دخل
                    </button>
                </div>
                <input type="hidden" name="type" value={type} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-2">المبلغ (د.ج)</label>
                        <input
                            type="number"
                            name="amount"
                            required
                            min="0"
                            step="0.01"
                            placeholder="0.00"
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

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium mb-2">التاريخ</label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-2">وصف (اختياري)</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="مثال: فاتورة الكهرباء..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                        "w-full md:w-auto px-8 py-3 text-white rounded-xl font-medium shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                        type === 'income'
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "bg-rose-600 hover:bg-rose-700"
                    )}
                >
                    <Plus size={18} />
                    {isPending ? 'جارٍ الإضافة...' : 'إضافة'}
                </button>
            </form>
        </div>
    );
}
