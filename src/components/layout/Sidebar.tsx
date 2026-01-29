'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Clock, Users, PieChart, Settings, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/diary', label: 'يومياتي', icon: BookOpen },
    { href: '/activities', label: 'تتبع الوقت', icon: Clock },
    { href: '/finance', label: 'المالية', icon: Wallet },
    { href: '/reports', label: 'التقارير', icon: PieChart },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed right-0 top-0 h-screen w-[280px] border-l border-white/10 glass flex flex-col pt-8 pb-4 px-4 z-50 transition-all duration-300">
            <div className="mb-10 px-2">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    مدير الحياة
                </h1>
                <p className="text-xs text-muted-foreground mt-1">نسختك الشخصية</p>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary/10 text-primary font-medium shadow-sm"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            {isActive && (
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-l-full" />
                            )}
                            <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive && "text-primary")} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto px-4 py-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">
                        م
                    </div>
                    <div>
                        <p className="text-sm font-medium">المستخدم</p>
                        <p className="text-xs text-muted-foreground">خطة مجانية</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
