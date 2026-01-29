'use server';

import { prisma } from '@/lib/db';

export async function getFinanceStats() {
    const transactions = await prisma.transaction.findMany();

    let totalIncome = 0;
    let totalExpense = 0;
    let transactionCount = transactions.length;

    for (const t of transactions) {
        if (t.type === 'income') {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    }

    // Get monthly data for current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyTransactions = transactions.filter(
        t => new Date(t.date) >= startOfMonth
    );

    let monthlyIncome = 0;
    let monthlyExpense = 0;

    for (const t of monthlyTransactions) {
        if (t.type === 'income') {
            monthlyIncome += t.amount;
        } else {
            monthlyExpense += t.amount;
        }
    }

    // Get expense breakdown by category
    const expenseByCategory = await prisma.transaction.groupBy({
        by: ['categoryId'],
        where: { type: 'expense' },
        _sum: { amount: true },
    });

    const categories = await prisma.category.findMany({
        where: { type: 'expense' },
    });

    const expenseBreakdown = expenseByCategory.map(item => {
        const category = categories.find(c => c.id === item.categoryId);
        return {
            name: category?.name || 'أخرى',
            color: category?.color || '#64748b',
            amount: item._sum.amount || 0,
        };
    }).sort((a, b) => b.amount - a.amount);

    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        transactionCount,
        monthlyIncome,
        monthlyExpense,
        monthlyBalance: monthlyIncome - monthlyExpense,
        expenseBreakdown,
    };
}

export async function getActivityStats() {
    const activities = await prisma.activity.findMany({
        where: {
            endTime: { not: null },
        },
        include: {
            category: true,
        },
    });

    const totalMinutes = activities.reduce((sum, a) => sum + (a.duration || 0), 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const activityCount = activities.length;

    // Average rating
    const ratedActivities = activities.filter(a => a.rating !== null);
    const avgRating = ratedActivities.length > 0
        ? ratedActivities.reduce((sum, a) => sum + (a.rating || 0), 0) / ratedActivities.length
        : 0;

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayActivities = activities.filter(
        a => new Date(a.startTime) >= today
    );
    const todayMinutes = todayActivities.reduce((sum, a) => sum + (a.duration || 0), 0);

    // Get this week's stats
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const weekActivities = activities.filter(
        a => new Date(a.startTime) >= startOfWeek
    );
    const weekMinutes = weekActivities.reduce((sum, a) => sum + (a.duration || 0), 0);

    // Time breakdown by category
    const timeByCategory = await prisma.activity.groupBy({
        by: ['categoryId'],
        where: { endTime: { not: null } },
        _sum: { duration: true },
    });

    const categories = await prisma.category.findMany({
        where: { type: 'activity' },
    });

    const timeBreakdown = timeByCategory.map(item => {
        const category = categories.find(c => c.id === item.categoryId);
        return {
            name: category?.name || 'أخرى',
            color: category?.color || '#64748b',
            minutes: item._sum.duration || 0,
        };
    }).sort((a, b) => b.minutes - a.minutes);

    return {
        totalHours,
        totalMinutes,
        activityCount,
        avgRating: Math.round(avgRating * 10) / 10,
        todayMinutes,
        weekMinutes,
        timeBreakdown,
    };
}

export async function getDiaryStats() {
    const entries = await prisma.diaryEntry.findMany();

    const entryCount = entries.length;

    // Get this month's entries
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyEntries = entries.filter(
        e => new Date(e.createdAt) >= startOfMonth
    );

    // Count by mood
    const moodCounts: Record<string, number> = {};
    for (const entry of entries) {
        if (entry.mood) {
            moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        }
    }

    // Get streak (consecutive days with entries)
    const sortedEntries = entries.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
        const hasEntry = sortedEntries.some(e => {
            const entryDate = new Date(e.createdAt);
            entryDate.setHours(0, 0, 0, 0);
            return entryDate.getTime() === currentDate.getTime();
        });

        if (hasEntry) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (i === 0) {
            // Today might not have an entry yet
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return {
        entryCount,
        monthlyEntryCount: monthlyEntries.length,
        moodCounts,
        streak,
    };
}
