'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getActivities() {
    return await prisma.activity.findMany({
        include: {
            category: true,
        },
        orderBy: {
            startTime: 'desc',
        },
    });
}

export async function getActivityCategories() {
    return await prisma.category.findMany({
        where: {
            type: 'activity',
        },
    });
}

export async function getCurrentActivity() {
    return await prisma.activity.findFirst({
        where: {
            endTime: null,
        },
        include: {
            category: true,
        },
    });
}

export async function createActivity(formData: FormData) {
    const title = formData.get('title') as string;
    const categoryId = formData.get('categoryId') as string;
    const description = formData.get('description') as string;

    if (!title || !categoryId) return;

    // Check if there's an ongoing activity
    const currentActivity = await getCurrentActivity();
    if (currentActivity) {
        // Stop the current activity first
        await stopActivity(currentActivity.id);
    }

    await prisma.activity.create({
        data: {
            title,
            categoryId,
            description: description || null,
            startTime: new Date(),
        },
    });

    revalidatePath('/activities');
    revalidatePath('/');
}

export async function stopActivity(id: string) {
    const activity = await prisma.activity.findUnique({
        where: { id },
    });

    if (!activity) return;

    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - activity.startTime.getTime()) / 60000); // Duration in minutes

    await prisma.activity.update({
        where: { id },
        data: {
            endTime,
            duration,
        },
    });

    revalidatePath('/activities');
    revalidatePath('/');
}

export async function deleteActivity(id: string) {
    await prisma.activity.delete({
        where: { id },
    });
    revalidatePath('/activities');
    revalidatePath('/');
}

export async function rateActivity(id: string, rating: number) {
    await prisma.activity.update({
        where: { id },
        data: { rating },
    });
    revalidatePath('/activities');
}

// Ensure default activity categories exist
export async function ensureDefaultCategories() {
    const categories = [
        { name: 'عمل', type: 'activity', icon: 'Briefcase', color: '#6366f1', isSystem: true },
        { name: 'دراسة', type: 'activity', icon: 'BookOpen', color: '#8b5cf6', isSystem: true },
        { name: 'رياضة', type: 'activity', icon: 'Dumbbell', color: '#22c55e', isSystem: true },
        { name: 'قراءة', type: 'activity', icon: 'Book', color: '#f59e0b', isSystem: true },
        { name: 'استراحة', type: 'activity', icon: 'Coffee', color: '#ec4899', isSystem: true },
        { name: 'أخرى', type: 'activity', icon: 'MoreHorizontal', color: '#64748b', isSystem: true },
    ];

    for (const category of categories) {
        const exists = await prisma.category.findFirst({
            where: { name: category.name, type: 'activity' },
        });
        if (!exists) {
            await prisma.category.create({ data: category });
        }
    }
}
