'use client';

import Link from 'next/link';
import { TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Wallet, Clock, BookOpen, Plus, PenLine } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Home() {
  const today = new Date().toLocaleDateString('ar-DZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">صباح الخير، صديقي 👋</h1>
          <p className="text-muted-foreground text-lg">إليك ملخص سريع لنشاطاتك اليوم.</p>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-emerald-700 bg-emerald-100 px-4 py-2 rounded-full inline-block">
            {today}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
              <Wallet size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
              +12% <ArrowUpRight size={14} className="mr-1" />
            </span>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">الرصيد الحالي</p>
            <h3 className="text-3xl font-bold text-emerald-700">124,500 د.ج</h3>
          </div>
        </div>

        {/* Time Card */}
        <div className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <Clock size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
              4س 30د
            </span>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">الإنتاجية اليوم</p>
            <h3 className="text-3xl font-bold text-blue-700">3 نشاطات</h3>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <BookOpen size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
              هذا الأسبوع
            </span>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">مذكرات اليوميات</p>
            <h3 className="text-3xl font-bold text-amber-700">5 مذكرات</h3>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">نشاطاتك الأخيرة</h3>
            <Link href="/activities" className="text-emerald-600 text-sm font-medium hover:underline">
              عرض الكل
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { icon: Wallet, title: 'راتب شهري', time: 'منذ ساعتين', type: 'مالية', color: 'emerald', amount: '+ 45,000 د.ج' },
              { icon: BookOpen, title: 'كتابة مذكرات', time: 'منذ 4 ساعات', type: 'يوميات', color: 'amber', amount: '' },
              { icon: Clock, title: 'جلسة عمل عميق', time: 'منذ 6 ساعات', type: 'نشاط', color: 'blue', amount: '2س 15د' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/50 hover:bg-white/80 rounded-xl transition-colors">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  item.color === 'emerald' ? "bg-emerald-100 text-emerald-600" :
                    item.color === 'amber' ? "bg-amber-100 text-amber-600" :
                      "bg-blue-100 text-blue-600"
                )}>
                  <item.icon size={22} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.time} • {item.type}</p>
                </div>
                {item.amount && (
                  <div className="text-left">
                    <span className={cn(
                      "font-bold",
                      item.color === 'emerald' ? "text-emerald-600" : "text-foreground"
                    )}>
                      {item.amount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4">إجراءات سريعة</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            ابدأ بتسجيل نشاطاتك اليومية أو إضافة معاملة مالية جديدة.
          </p>

          <div className="space-y-3">
            <Link
              href="/activities"
              className="w-full py-3 px-4 bg-emerald-600 text-white rounded-xl shadow-lg hover:bg-emerald-700 hover:-translate-y-0.5 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Clock size={20} />
              تسجيل نشاط جديد
            </Link>
            <Link
              href="/finance"
              className="w-full py-3 px-4 bg-white text-foreground border-2 border-gray-200 hover:border-emerald-500 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              إضافة معاملة مالية
            </Link>
            <Link
              href="/diary"
              className="w-full py-3 px-4 bg-white text-foreground border-2 border-gray-200 hover:border-emerald-500 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2"
            >
              <PenLine size={20} />
              كتابة مذكرة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
