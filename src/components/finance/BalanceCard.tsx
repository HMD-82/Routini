import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/reports/StatCard'; // Reusing the improved StatCard

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
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="الرصيد الحالي"
                value={`${formatAmount(balance)} د.ج`}
                icon={Wallet}
                color={balance >= 0 ? 'emerald' : 'rose'}
                subtitle={balance >= 0 ? '✓ رصيد إيجابي' : '⚠ رصيد سلبي'}
            />

            <StatCard
                title="إجمالي الدخل"
                value={`+${formatAmount(totalIncome)} د.ج`}
                icon={TrendingUp}
                color="emerald"
                subtitle={`هذا الشهر: +${formatAmount(monthlyIncome)} د.ج`}
            />

            <StatCard
                title="إجمالي المصاريف"
                value={`-${formatAmount(totalExpense)} د.ج`}
                icon={TrendingDown}
                color="rose"
                subtitle={`هذا الشهر: -${formatAmount(monthlyExpense)} د.ج`}
            />
        </div>
    );
}
