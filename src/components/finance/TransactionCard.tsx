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
        <div className="glass-card p-4 group">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                    isIncome ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                )}>
                    {isIncome ? <ArrowUpRight size={22} /> : <ArrowDownRight size={22} />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                        {description || (isIncome ? 'دخل' : 'مصروف')}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-0.5 rounded-full bg-gray-100">
                            {category.name}
                        </span>
                        <span>{formatDate(date)}</span>
                    </div>
                </div>

                {/* Amount */}
                <div className="text-left">
                    <p className={cn(
                        "text-lg font-bold",
                        isIncome ? "text-emerald-600" : "text-rose-600"
                    )}>
                        {isIncome ? '+' : '-'}{formatAmount(amount)} د.ج
                    </p>
                </div>

                {/* Delete Button */}
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
