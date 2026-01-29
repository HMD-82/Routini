import { getFinanceStats, getActivityStats, getDiaryStats } from './actions';
import { StatCard } from '@/components/reports/StatCard';
import { CategoryBreakdown } from '@/components/reports/CategoryBreakdown';
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Clock,
    Zap,
    Star,
    BookOpen,
    Flame,
    Sparkles,
    PieChart
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatAmount(amount: number): string {
    return new Intl.NumberFormat('ar-DZ').format(Math.abs(amount));
}

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
        return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
}

const moodEmojis: Record<string, string> = {
    happy: '😊 سعيد',
    neutral: '😐 محايد',
    sad: '😔 حزين',
    productive: '💪 منتج',
};

export default async function ReportsPage() {
    const [financeStats, activityStats, diaryStats] = await Promise.all([
        getFinanceStats(),
        getActivityStats(),
        getDiaryStats(),
    ]);

    const expenseBreakdownItems = financeStats.expenseBreakdown.map(item => ({
        name: item.name,
        color: item.color,
        value: item.amount,
        formatted: `${formatAmount(item.amount)} د.ج`,
    }));

    const timeBreakdownItems = activityStats.timeBreakdown.map(item => ({
        name: item.name,
        color: item.color,
        value: item.minutes,
        formatted: formatDuration(item.minutes),
    }));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                    <PieChart size={28} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">التقارير والتحليلات</h1>
                    <p className="text-muted-foreground">نظرة شاملة على أدائك المالي والإنتاجي</p>
                </div>
            </div>

            {/* Finance Section */}
            <section className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Wallet size={22} className="text-emerald-600" />
                    الإحصائيات المالية
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="الرصيد الحالي"
                        value={`${formatAmount(financeStats.balance)} د.ج`}
                        icon={Wallet}
                        color={financeStats.balance >= 0 ? 'emerald' : 'rose'}
                    />
                    <StatCard
                        title="إجمالي الدخل"
                        value={`${formatAmount(financeStats.totalIncome)} د.ج`}
                        subtitle={`هذا الشهر: ${formatAmount(financeStats.monthlyIncome)} د.ج`}
                        icon={TrendingUp}
                        color="emerald"
                    />
                    <StatCard
                        title="إجمالي المصاريف"
                        value={`${formatAmount(financeStats.totalExpense)} د.ج`}
                        subtitle={`هذا الشهر: ${formatAmount(financeStats.monthlyExpense)} د.ج`}
                        icon={TrendingDown}
                        color="rose"
                    />
                    <StatCard
                        title="عدد المعاملات"
                        value={financeStats.transactionCount}
                        icon={Sparkles}
                        color="purple"
                    />
                </div>

                {expenseBreakdownItems.length > 0 && (
                    <div className="mt-6">
                        <CategoryBreakdown
                            title="توزيع المصاريف حسب الفئة"
                            items={expenseBreakdownItems}
                        />
                    </div>
                )}
            </section>

            {/* Activity Section */}
            <section className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock size={22} className="text-blue-600" />
                    إحصائيات النشاطات
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="إجمالي الوقت"
                        value={`${activityStats.totalHours}س`}
                        subtitle={`${activityStats.totalMinutes} دقيقة`}
                        icon={Clock}
                        color="primary"
                    />
                    <StatCard
                        title="وقت اليوم"
                        value={formatDuration(activityStats.todayMinutes)}
                        icon={Zap}
                        color="amber"
                    />
                    <StatCard
                        title="وقت هذا الأسبوع"
                        value={formatDuration(activityStats.weekMinutes)}
                        icon={Flame}
                        color="rose"
                    />
                    <StatCard
                        title="متوسط التقييم"
                        value={activityStats.avgRating > 0 ? `${activityStats.avgRating} / 5` : '-'}
                        subtitle={`من ${activityStats.activityCount} نشاط`}
                        icon={Star}
                        color="amber"
                    />
                </div>

                {timeBreakdownItems.length > 0 && (
                    <div className="mt-6">
                        <CategoryBreakdown
                            title="توزيع الوقت حسب الفئة"
                            items={timeBreakdownItems}
                        />
                    </div>
                )}
            </section>

            {/* Diary Section */}
            <section className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen size={22} className="text-amber-600" />
                    إحصائيات اليوميات
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="إجمالي التدوينات"
                        value={diaryStats.entryCount}
                        icon={BookOpen}
                        color="amber"
                    />
                    <StatCard
                        title="تدوينات هذا الشهر"
                        value={diaryStats.monthlyEntryCount}
                        icon={Sparkles}
                        color="purple"
                    />
                    <StatCard
                        title="سلسلة الأيام المتتالية"
                        value={`${diaryStats.streak} يوم`}
                        subtitle="استمر في الكتابة!"
                        icon={Flame}
                        color="rose"
                    />
                    <div className="bg-white/50 p-5 rounded-xl border border-white/20">
                        <h4 className="text-muted-foreground text-sm font-medium mb-3">توزيع المزاج</h4>
                        {Object.keys(diaryStats.moodCounts).length > 0 ? (
                            <div className="space-y-2">
                                {Object.entries(diaryStats.moodCounts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 3)
                                    .map(([mood, count]) => (
                                        <div key={mood} className="flex items-center justify-between text-sm">
                                            <span>{moodEmojis[mood] || mood}</span>
                                            <span className="font-bold">{count}</span>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">لا توجد بيانات</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
