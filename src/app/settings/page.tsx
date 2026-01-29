import { getSettings } from './actions';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { DataManagement } from '@/components/settings/DataManagement';
import { Settings, Database, Info } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                    <Settings size={28} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">الإعدادات</h1>
                    <p className="text-muted-foreground">خصص التطبيق حسب تفضيلاتك</p>
                </div>
            </div>

            {/* Settings Form */}
            <SettingsForm settings={settings} />

            {/* Data Management */}
            <DataManagement />

            {/* App Info */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Info size={20} className="text-emerald-600" />
                    حول التطبيق
                </h2>

                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                        <span className="text-muted-foreground">الاسم</span>
                        <span className="font-bold text-emerald-600">حياتي</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                        <span className="text-muted-foreground">الإصدار</span>
                        <span className="font-medium">1.0.0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                        <span className="text-muted-foreground">قاعدة البيانات</span>
                        <span className="font-medium flex items-center gap-1">
                            <Database size={14} />
                            SQLite (محلية)
                        </span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-xs text-muted-foreground text-center">
                        جميع بياناتك محفوظة محلياً على جهازك ولا يتم مشاركتها مع أي جهة.
                    </p>
                </div>
            </div>
        </div>
    );
}
