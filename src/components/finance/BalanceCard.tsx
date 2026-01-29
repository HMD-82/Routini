import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
    balance: number;
    totalIncome: number;
    totalExpense: number;
    monthlyIncome: number;
    monthlyExpense: number;
}

function formatAmount(amount: number): string {
    return new Intl.NumberFormat('ar-DZ').format(Math.abs(amount));
}

export function BalanceCard({
    balance,
    totalIncome,
    totalExpense,
    monthlyIncome,
    monthlyExpense,
}: BalanceCardProps) {
    const isPositive = balance >= 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Balance */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                        <Wallet size={24} />
                    </div>
                    <span className="text-sm text-gray-500">الرصيد الحالي</span>
                </div>
                <h3 className={cn(
                    "text-3xl font-bold",
                    isPositive ? "text-emerald-600" : "text-rose-600"
                )}>
                    {formatAmount(balance)} د.ج
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                    {isPositive ? '✓ رصيد إيجابي' : '⚠ رصيد سلبي'}
                </p>
            </div>

            {/* Total Income */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                        <TrendingUp size={24} />
                    </div>
                    <span className="text-sm text-gray-500">إجمالي الدخل</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-600">
                    +{formatAmount(totalIncome)} د.ج
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                    هذا الشهر: <span className="text-emerald-600">+{formatAmount(monthlyIncome)}</span>
                </p>
            </div>

            {/* Total Expenses */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-rose-100 rounded-xl text-rose-600">
                        <TrendingDown size={24} />
                    </div>
                    <span className="text-sm text-gray-500">إجمالي المصاريف</span>
                </div>
                <h3 className="text-2xl font-bold text-rose-600">
                    -{formatAmount(totalExpense)} د.ج
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                    هذا الشهر: <span className="text-rose-600">-{formatAmount(monthlyExpense)}</span>
                </p>
            </div>
        </div>
    );
}
