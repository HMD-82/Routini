'use client';

import { Save, User, Globe, Palette, Wallet, DollarSign, Target } from 'lucide-react';
import { updateSettings } from '@/app/settings/actions';
import { useTransition, useState, useEffect } from 'react';
import { showSuccess } from '@/lib/alerts';
import { cn } from '@/lib/utils';

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
    const [currentTheme, setCurrentTheme] = useState(settings.theme);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await updateSettings(formData);
            showSuccess('تم حفظ الإعدادات بنجاح! ⚙️');
        });
    };

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            root.removeAttribute('data-theme');
        } else {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            if (systemTheme === 'dark') {
                root.setAttribute('data-theme', 'dark');
            } else {
                root.removeAttribute('data-theme');
            }
        }
    };

    // Sync theme on mount to match server settings
    useEffect(() => {
        handleThemeChange(settings.theme);
    }, [settings.theme]);

    return (
        <form action={handleSubmit} className="space-y-8">
            {/* Personal Settings */}
            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <User size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">الإعدادات الشخصية</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                defaultValue={settings.username}
                                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-gray-400"
                            />
                            <User size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                        <div className="relative">
                            <select
                                name="language"
                                defaultValue={settings.language}
                                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all cursor-pointer appearance-none"
                            >
                                <option value="ar">العربية</option>
                                <option value="fr">الفرنسية (French)</option>
                                <option value="en">الإنجليزية (English)</option>
                            </select>
                            <Globe size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Appearance */}
            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                        <Palette size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">المظهر</h2>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">نظام الألوان</label>
                    <div className="grid grid-cols-3 gap-4" suppressHydrationWarning>
                        {[
                            { value: 'light', label: 'فاتح', icon: '☀️' },
                            { value: 'dark', label: 'مظلم', icon: '🌙' },
                            { value: 'system', label: 'النظام', icon: '💻' },
                        ].map((option) => (
                            <label key={option.value} className="relative cursor-pointer group">
                                <input
                                    type="radio"
                                    name="theme"
                                    value={option.value}
                                    checked={currentTheme === option.value}
                                    onChange={() => handleThemeChange(option.value)}
                                    className="peer sr-only"
                                    suppressHydrationWarning
                                />
                                <div className={cn(
                                    "p-3 rounded-xl border border-gray-100 bg-gray-50 transition-all text-center group-hover:bg-gray-100 group-hover:border-gray-200",
                                    currentTheme === option.value && "bg-purple-50 border-purple-500 text-purple-700 ring-1 ring-purple-200"
                                )} suppressHydrationWarning>
                                    <span className="text-xl mb-1 block">{option.icon}</span>
                                    <span className="text-xs font-bold">{option.label}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* Finance Settings */}
            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Wallet size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">الإعدادات المالية</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                        <div className="relative">
                            <select
                                name="currency"
                                defaultValue={settings.currency}
                                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all cursor-pointer appearance-none"
                            >
                                <option value="DZD">دينار جزائري (د.ج)</option>
                                <option value="USD">دولار أمريكي ($)</option>
                                <option value="EUR">يورو (€)</option>
                                <option value="SAR">ريال سعودي (﷼)</option>
                                <option value="AED">درهم إماراتي (د.إ)</option>
                            </select>
                            <DollarSign size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الميزانية الشهرية</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="monthlyBudget"
                                min="0"
                                step="100"
                                defaultValue={settings.monthlyBudget}
                                placeholder="0"
                                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                            />
                            <Target size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Save Button */}
            <div className="sticky bottom-4 z-10">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto md:min-w-[240px] px-8 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto border-2 border-emerald-500/20"
                >
                    <Save size={20} />
                    {isPending ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </form>
    );
}
