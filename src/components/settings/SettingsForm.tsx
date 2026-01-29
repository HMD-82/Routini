'use client';

import { Save } from 'lucide-react';
import { updateSettings } from '@/app/settings/actions';
import { useTransition } from 'react';
import { showSuccess } from '@/lib/alerts';

interface Settings {
    id: number;
    username: string;
    language: string;
    theme: string;
    currency: string;
    monthlyBudget: number;
}

interface SettingsFormProps {
    settings: Settings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await updateSettings(formData);
            showSuccess('تم حفظ الإعدادات بنجاح! ⚙️');
        });
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Personal Settings */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">الإعدادات الشخصية</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
                        <input
                            type="text"
                            name="username"
                            defaultValue={settings.username}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium mb-2">اللغة</label>
                        <select
                            name="language"
                            defaultValue={settings.language}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                        >
                            <option value="ar">العربية</option>
                            <option value="fr">الفرنسية</option>
                            <option value="en">الإنجليزية</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">المظهر</h2>

                <div>
                    <label className="block text-sm font-medium mb-3">نظام الألوان</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { value: 'light', label: '☀️ فاتح' },
                            { value: 'dark', label: '🌙 مظلم' },
                            { value: 'system', label: '💻 النظام' },
                        ].map((option) => (
                            <label
                                key={option.value}
                                className="relative cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    value={option.value}
                                    defaultChecked={settings.theme === option.value}
                                    className="peer sr-only"
                                />
                                <div className="p-4 text-center rounded-xl border-2 border-gray-200 bg-white peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all hover:border-gray-300">
                                    {option.label}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Finance Settings */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">الإعدادات المالية</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Currency */}
                    <div>
                        <label className="block text-sm font-medium mb-2">العملة</label>
                        <select
                            name="currency"
                            defaultValue={settings.currency}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                        >
                            <option value="DZD">دينار جزائري (د.ج)</option>
                            <option value="USD">دولار أمريكي ($)</option>
                            <option value="EUR">يورو (€)</option>
                            <option value="SAR">ريال سعودي (﷼)</option>
                            <option value="AED">درهم إماراتي (د.إ)</option>
                        </select>
                    </div>

                    {/* Monthly Budget */}
                    <div>
                        <label className="block text-sm font-medium mb-2">الميزانية الشهرية</label>
                        <input
                            type="number"
                            name="monthlyBudget"
                            min="0"
                            step="100"
                            defaultValue={settings.monthlyBudget}
                            placeholder="0"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium shadow-lg hover:bg-emerald-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <Save size={18} />
                {isPending ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
            </button>
        </form>
    );
}
