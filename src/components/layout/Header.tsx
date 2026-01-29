'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Clock, PieChart, Settings, Wallet, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/diary', label: 'يومياتي', icon: BookOpen },
    { href: '/activities', label: 'النشاطات', icon: Clock },
    { href: '/finance', label: 'المالية', icon: Wallet },
    { href: '/reports', label: 'التقارير', icon: PieChart },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <style jsx global>{`
                .nav-btn {
                    position: relative;
                    overflow: hidden;
                }
                .nav-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.5),
                        transparent
                    );
                    transition: left 0.5s ease;
                }
                .nav-btn:hover::before {
                    left: 100%;
                }
            `}</style>

            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                                ر
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                    روتيني
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "nav-btn flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200",
                                            isActive
                                                ? "bg-emerald-500 text-white shadow-md"
                                                : "bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
                                        )}
                                    >
                                        <Icon size={18} />
                                        <span className="underline underline-offset-2">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <nav className="px-4 py-3 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "nav-btn flex items-center gap-3 px-4 py-3 rounded-full transition-all font-medium",
                                            isActive
                                                ? "bg-emerald-500 text-white shadow-md"
                                                : "bg-gray-100 text-gray-700 hover:bg-emerald-100"
                                        )}
                                    >
                                        <Icon size={20} />
                                        <span className="underline underline-offset-2">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
