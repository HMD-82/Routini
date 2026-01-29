'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartItem {
    name: string;
    value: number; // minutes
    color: string;
    formatted: string;
}

interface ActivityChartProps {
    items: ChartItem[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-right">
                <p className="font-bold text-gray-800">{label}</p>
                <p className="text-blue-600 font-medium">{payload[0].payload.formatted}</p>
            </div>
        );
    }
    return null;
};

export function ActivityChart({ items }: ActivityChartProps) {
    if (items.length === 0) {
        return (
            <div className="glass-card p-6 min-h-[300px] flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold mb-4 w-full text-right">توزيع الوقت على الأنشطة</h3>
                <p className="text-gray-400">لا توجد بيانات كافية للتحليل</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-6">توزيع الوقت على الأنشطة</h3>
            
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={items}
                        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#6b7280', fontSize: 12 }} 
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            angle={-10}
                            textAnchor="end"
                        />
                        <YAxis hide />
                        <Tooltip cursor={{fill: '#f3f4f6', opacity: 0.4}} content={<CustomTooltip />} />
                        <Bar 
                            dataKey="value" 
                            radius={[8, 8, 0, 0]}
                            barSize={50}
                        >
                            {items.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
