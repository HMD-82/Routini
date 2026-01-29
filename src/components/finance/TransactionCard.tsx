'use client';

import { Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { deleteTransaction } from '@/app/finance/actions';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { showConfirm, showSuccess } from '@/lib/alerts';

interface TransactionCardProps {
    id: string;
    amount: number;
    type: string;
    description?: string | null;
    date: Date;
    category: {
        name: string;
        color?: string | null;
        icon?: string | null;
    };
}

function formatAmount(amount: number): string {
    return new Intl.NumberFormat('ar-DZ').format(amount);
}

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('ar-DZ', {
        day: 'numeric',
        month: 'short',
    });
}

export function TransactionCard({
    id,
    amount,
    type,
    description,
    date,
    category,
}: TransactionCardProps) {
    const [isPending, startTransition] = useTransition();
    const isIncome = type === 'income';

    const handleDelete = async () => {
        const confirmed = await showConfirm(
            'حذف المعاملة',
            'هل تريد حذف هذه المعاملة؟',
            'نعم، احذف',
            'إلغاء',
            true
        );
        if (confirmed) {
            startTransition(async () => {
                await deleteTransaction(id);
                showSuccess('تم حذف المعاملة بنجاح!');
            });
        }
    };

    return (
        <div className={cn(
            "bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 group",
            "hover:shadow-md hover:-translate-y-0.5"
        )}>
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                    {isIncome ? <ArrowUpRight size={22} strokeWidth={2.5} /> : <ArrowDownRight size={22} strokeWidth={2.5} />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate mb-1">
                        {category.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span suppressHydrationWarning>{formatDate(date)}</span>
                        {description && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="truncate max-w-[150px]">{description}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Amount */}
                <div className="text-left">
                    <p className={cn(
                        "text-lg font-bold tracking-tight",
                        isIncome ? "text-emerald-600" : "text-rose-600"
                    )}>
                        {isIncome ? '+' : '-'}{formatAmount(amount)} <span className="text-xs text-gray-400 font-medium">د.ج</span>
                    </p>
                </div>

                {/* Delete Button */}
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 -mr-2"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
