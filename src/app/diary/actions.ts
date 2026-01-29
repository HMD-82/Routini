'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createEntry(formData: FormData) {
    const content = formData.get('content') as string;
    const mood = formData.get('mood') as string;

    if (!content) return;

    await prisma.diaryEntry.create({
        data: {
            content,
            mood,
        },
    });

    revalidatePath('/diary');
}

export async function getEntries() {
    return await prisma.diaryEntry.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function deleteEntry(id: string) {
    await prisma.diaryEntry.delete({
        where: { id },
    });
    revalidatePath('/diary');
}
