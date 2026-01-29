'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ChartItem {
    name: string;
    value: number;
    color: string;
    formatted: string;
}

interface SpendingMultiChartProps {
    title: string;
    items: ChartItem[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-right">
                <p className="font-bold text-gray-800">{payload[0].name}</p>
                <p className="text-emerald-600 font-medium">{payload[0].payload.formatted}</p>
            </div>
        );
    }
    return null;
};

export function SpendingMultiChart({ title, items }: SpendingMultiChartProps) {
    if (items.length === 0) {
        return (
            <div className="glass-card p-6 min-h-[300px] flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold mb-4 w-full text-right">{title}</h3>
                <p className="text-gray-400">لا توجد بيانات كافية للتحليل</p>
            </div>
        );
    }

    // Ensure we have colors for all items
    const COLORS = items.map(item => item.color || '#10b981');

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-6">{title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="h-[300px] relative">
                    <p className="text-center text-sm text-gray-500 mb-2">نسبة التوزيع</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={items}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {items.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value) => <span className="text-sm text-gray-600 ml-2">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="h-[300px]">
                    <p className="text-center text-sm text-gray-500 mb-2">مقارنة القيم</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={items}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {items.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
