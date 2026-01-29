'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getTransactions() {
    return await prisma.transaction.findMany({
        include: {
            category: true,
        },
        orderBy: {
            date: 'desc',
        },
    });
}

export async function getFinanceCategories() {
    return await prisma.category.findMany({
        where: {
            OR: [
                { type: 'income' },
                { type: 'expense' },
            ],
        },
    });
}

export async function getIncomeCategories() {
    return await prisma.category.findMany({
        where: { type: 'income' },
    });
}

export async function getExpenseCategories() {
    return await prisma.category.findMany({
        where: { type: 'expense' },
    });
}

export async function getBalance() {
    const transactions = await prisma.transaction.findMany();

    let totalIncome = 0;
    let totalExpense = 0;

    for (const t of transactions) {
        if (t.type === 'income') {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    }

    return {
        balance: totalIncome - totalExpense,
        totalIncome,
        totalExpense,
    };
}

export async function getMonthlyStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const transactions = await prisma.transaction.findMany({
        where: {
            date: {
                gte: startOfMonth,
            },
        },
    });

    let monthlyIncome = 0;
    let monthlyExpense = 0;

    for (const t of transactions) {
        if (t.type === 'income') {
            monthlyIncome += t.amount;
        } else {
            monthlyExpense += t.amount;
        }
    }

    return {
        monthlyIncome,
        monthlyExpense,
        monthlyBalance: monthlyIncome - monthlyExpense,
    };
}

export async function createTransaction(formData: FormData) {
    const amount = parseFloat(formData.get('amount') as string);
    const type = formData.get('type') as string;
    const categoryId = formData.get('categoryId') as string;
    const description = formData.get('description') as string;
    const dateStr = formData.get('date') as string;

    if (!amount || !type || !categoryId) return;

    const date = dateStr ? new Date(dateStr) : new Date();

    await prisma.transaction.create({
        data: {
            amount,
            type,
            categoryId,
            description: description || null,
            date,
        },
    });

    revalidatePath('/finance');
    revalidatePath('/');
}

export async function deleteTransaction(id: string) {
    await prisma.transaction.delete({
        where: { id },
    });
    revalidatePath('/finance');
    revalidatePath('/');
}

// Ensure default finance categories exist
export async function ensureDefaultFinanceCategories() {
    const incomeCategories = [
        { name: 'راتب', type: 'income', icon: 'Banknote', color: '#22c55e', isSystem: true },
        { name: 'مكافأة', type: 'income', icon: 'Gift', color: '#10b981', isSystem: true },
        { name: 'استثمار', type: 'income', icon: 'TrendingUp', color: '#14b8a6', isSystem: true },
        { name: 'دخل آخر', type: 'income', icon: 'Wallet', color: '#06b6d4', isSystem: true },
    ];

    const expenseCategories = [
        { name: 'طعام', type: 'expense', icon: 'UtensilsCrossed', color: '#f59e0b', isSystem: true },
        { name: 'مواصلات', type: 'expense', icon: 'Car', color: '#ef4444', isSystem: true },
        { name: 'تسوق', type: 'expense', icon: 'ShoppingBag', color: '#ec4899', isSystem: true },
        { name: 'فواتير', type: 'expense', icon: 'Receipt', color: '#8b5cf6', isSystem: true },
        { name: 'ترفيه', type: 'expense', icon: 'Gamepad2', color: '#6366f1', isSystem: true },
        { name: 'صحة', type: 'expense', icon: 'Heart', color: '#f43f5e', isSystem: true },
        { name: 'تعليم', type: 'expense', icon: 'GraduationCap', color: '#0ea5e9', isSystem: true },
        { name: 'أخرى', type: 'expense', icon: 'MoreHorizontal', color: '#64748b', isSystem: true },
    ];

    const allCategories = [...incomeCategories, ...expenseCategories];

    for (const category of allCategories) {
        const exists = await prisma.category.findFirst({
            where: { name: category.name, type: category.type },
        });
        if (!exists) {
            await prisma.category.create({ data: category });
        }
    }
}
