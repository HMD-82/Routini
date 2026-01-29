'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
    // Try to get existing settings or create default
    let settings = await prisma.settings.findUnique({
        where: { id: 1 },
    });

    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                id: 1,
                username: 'المستخدم',
                language: 'ar',
                theme: 'system',
                currency: 'DZD',
                monthlyBudget: 0,
            },
        });
    }

    return settings;
}

export async function updateSettings(formData: FormData) {
    const username = formData.get('username') as string;
    const language = formData.get('language') as string;
    const theme = formData.get('theme') as string;
    const currency = formData.get('currency') as string;
    const monthlyBudget = parseFloat(formData.get('monthlyBudget') as string) || 0;

    await prisma.settings.upsert({
        where: { id: 1 },
        update: {
            username,
            language,
            theme,
            currency,
            monthlyBudget,
        },
        create: {
            id: 1,
            username,
            language,
            theme,
            currency,
            monthlyBudget,
        },
    });

    revalidatePath('/settings');
    revalidatePath('/');
}

export async function exportData() {
    const [settings, diaryEntries, activities, transactions, categories] = await Promise.all([
        prisma.settings.findUnique({ where: { id: 1 } }),
        prisma.diaryEntry.findMany(),
        prisma.activity.findMany({ include: { category: true } }),
        prisma.transaction.findMany({ include: { category: true } }),
        prisma.category.findMany(),
    ]);

    return {
        exportDate: new Date().toISOString(),
        settings,
        diaryEntries,
        activities,
        transactions,
        categories,
    };
}

export async function clearAllData() {
    // Delete all user data but keep system categories
    await prisma.activity.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.diaryEntry.deleteMany();
    await prisma.category.deleteMany({ where: { isSystem: false } });

    revalidatePath('/');
    revalidatePath('/diary');
    revalidatePath('/activities');
    revalidatePath('/finance');
    revalidatePath('/reports');
    revalidatePath('/settings');
}
