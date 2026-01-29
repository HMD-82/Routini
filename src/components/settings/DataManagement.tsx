'use client';

import { Download, Trash2 } from 'lucide-react';
import { exportData, clearAllData } from '@/app/settings/actions';
import { useTransition } from 'react';
import { showConfirm, showSuccess, showError } from '@/lib/alerts';

export function DataManagement() {
    const [isPending, startTransition] = useTransition();

    const handleExport = async () => {
        startTransition(async () => {
            try {
                const data = await exportData();
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `hayati-backup-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showSuccess('تم تصدير البيانات بنجاح!');
            } catch {
                showError('حدث خطأ أثناء تصدير البيانات');
            }
        });
    };

    const handleClearData = async () => {
        const confirmed = await showConfirm(
            '⚠️ تحذير: حذف جميع البيانات',
            'هذا الإجراء سيحذف جميع بياناتك نهائياً بما في ذلك المذكرات، النشاطات، والمعاملات المالية. لا يمكن التراجع عن هذا الإجراء!',
            'نعم، احذف الكل',
            'إلغاء',
            true
        );

        if (confirmed) {
            startTransition(async () => {
                await clearAllData();
                showSuccess('تم حذف جميع البيانات بنجاح!');
            });
        }
    };

    return (
        <div className="glass-card p-6">
            <h2 className="text-lg font-bold mb-4">إدارة البيانات</h2>

            <div className="space-y-4">
                {/* Export */}
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200">
                    <div>
                        <h3 className="font-medium">تصدير البيانات</h3>
                        <p className="text-sm text-muted-foreground">قم بتنزيل نسخة احتياطية من جميع بياناتك</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleExport}
                        disabled={isPending}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        <Download size={16} />
                        تصدير
                    </button>
                </div>

                {/* Clear Data */}
                <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl border border-rose-200">
                    <div>
                        <h3 className="font-medium text-rose-700">حذف جميع البيانات</h3>
                        <p className="text-sm text-rose-600/70">احذف جميع بياناتك بشكل دائم (لا يمكن التراجع)</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClearData}
                        disabled={isPending}
                        className="px-4 py-2 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        <Trash2 size={16} />
                        حذف
                    </button>
                </div>
            </div>
        </div>
    );
}
