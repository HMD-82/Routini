import { getSettings } from './actions';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { DataManagement } from '@/components/settings/DataManagement';
import { Settings, Database, Info, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-2xl text-gray-600">
                    <Settings size={28} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
                    <p className="text-gray-500">خصص التطبيق حسب تفضيلاتك</p>
                </div>
            </div>

            {/* Settings Form */}
            <SettingsForm settings={settings} />

            {/* Data Management */}
            <DataManagement />

            {/* App Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Info size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">حول التطبيق</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <span className="text-gray-500 text-sm font-medium">الاسم</span>
                        <span className="font-bold text-emerald-600">روتيني</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <span className="text-gray-500 text-sm font-medium">الإصدار</span>
                        <span className="font-semibold text-gray-900">1.0.0</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <span className="text-gray-500 text-sm font-medium">قاعدة البيانات</span>
                        <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                            <Database size={16} className="text-blue-500" />
                            SQLite (محلية)
                        </span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50">
                    <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-2xl text-blue-700">
                        <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed">
                            جميع بياناتك محفوظة محلياً على جهازك ولا يتم مشاركتها مع أي جهة. خصوصيتك هي أولويتنا.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
