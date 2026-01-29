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
                    text-decoration: none !important;
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
                        rgba(255, 255, 255, 0.4),
                        transparent
                    );
                    transition: left 0.5s ease;
                }
                .nav-btn:hover::before {
                    left: 100%;
                }
                a {
                    text-decoration: none;
                }
            `}</style>

            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center h-16 relative">
                        {/* Logo - Absolute Left (Right in RTL) */}
                        <div className="flex items-center gap-3 absolute right-0">
                            <Link href="/" className="flex items-center gap-3 no-underline group">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-emerald-200 shadow-md group-hover:scale-110 transition-transform">
                                    ر
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                                        روتيني
                                    </h1>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation - Centered */}
                        <div className="hidden md:flex flex-1 justify-center items-center">
                            <nav className="flex items-center gap-1 p-1 bg-gray-50/80 rounded-full border border-gray-100 shadow-inner">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "nav-btn flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 no-underline",
                                                isActive
                                                    ? "bg-emerald-500 text-white shadow-md transform scale-105"
                                                    : "text-gray-600 hover:text-emerald-700 hover:bg-white"
                                            )}
                                        >
                                            <Icon size={18} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Mobile Menu Button - Absolute Left */}
                        <div className="md:hidden absolute left-0">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
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
                                            "nav-btn flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium no-underline",
                                            isActive
                                                ? "bg-emerald-500 text-white shadow-md"
                                                : "bg-gray-50 text-gray-700 hover:bg-emerald-50"
                                        )}
                                    >
                                        <Icon size={20} />
                                        <span>{item.label}</span>
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
