import { getEntries } from './actions';
import { NewEntryForm } from '@/components/diary/NewEntryForm';
import { DiaryEntryCard } from '@/components/diary/DiaryEntryCard';
import { BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DiaryPage() {
    const entries = await getEntries();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
                        <BookOpen size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">يومياتي</h1>
                        <p className="text-muted-foreground">سجّل أفكارك ومشاعرك وإنجازاتك اليومية</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <span className="text-lg font-bold text-amber-600 bg-amber-100 px-4 py-2 rounded-full">
                        {entries.length} تدوينة
                    </span>
                </div>
            </div>

            {/* New Entry Form */}
            <NewEntryForm />

            {/* Entries List */}
            <div className="space-y-4">
                {entries.length === 0 ? (
                    <div className="glass-card text-center py-16">
                        <p className="text-xl text-muted-foreground">لا توجد تدوينات بعد...</p>
                        <p className="text-sm text-muted-foreground mt-2">ابدأ بكتابة أول تدوينة لك اليوم!</p>
                    </div>
                ) : (
                    entries.map((entry) => (
                        <DiaryEntryCard
                            key={entry.id}
                            id={entry.id}
                            content={entry.content}
                            mood={entry.mood}
                            createdAt={entry.createdAt}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
