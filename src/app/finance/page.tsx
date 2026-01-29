import {
    getTransactions,
    getBalance,
    getMonthlyStats,
    getIncomeCategories,
    getExpenseCategories,
    ensureDefaultFinanceCategories
} from './actions';
import { NewTransactionForm } from '@/components/finance/NewTransactionForm';
import { TransactionCard } from '@/components/finance/TransactionCard';
import { BalanceCard } from '@/components/finance/BalanceCard';
import { Wallet } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function FinancePage() {
    await ensureDefaultFinanceCategories();

    const [transactions, balanceData, monthlyStats, incomeCategories, expenseCategories] = await Promise.all([
        getTransactions(),
        getBalance(),
        getMonthlyStats(),
        getIncomeCategories(),
        getExpenseCategories(),
    ]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                        <Wallet size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">الإدارة المالية</h1>
                        <p className="text-muted-foreground">تحكم في ميزانيتك وتتبع مداخيلك ومصاريفك</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <span className="text-lg font-bold text-emerald-600 bg-emerald-100 px-4 py-2 rounded-full">
                        {transactions.length} معاملة
                    </span>
                </div>
            </div>

            {/* Balance Overview */}
            <BalanceCard
                balance={balanceData.balance}
                totalIncome={balanceData.totalIncome}
                totalExpense={balanceData.totalExpense}
                monthlyIncome={monthlyStats.monthlyIncome}
                monthlyExpense={monthlyStats.monthlyExpense}
            />

            {/* New Transaction Form */}
            <NewTransactionForm
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
            />

            {/* Transactions List */}
            <div>
                <h2 className="text-lg font-bold mb-4">آخر المعاملات</h2>
                {transactions.length === 0 ? (
                    <div className="glass-card text-center py-16">
                        <p className="text-xl text-muted-foreground">لا توجد معاملات مسجلة بعد...</p>
                        <p className="text-sm text-muted-foreground mt-2">ابدأ بتسجيل أول معاملة لك!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {transactions.map((transaction) => (
                            <TransactionCard
                                key={transaction.id}
                                id={transaction.id}
                                amount={transaction.amount}
                                type={transaction.type}
                                description={transaction.description}
                                date={transaction.date}
                                category={transaction.category}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
