import { getActivities, getActivityCategories, getCurrentActivity, ensureDefaultCategories } from './actions';
import { NewActivityForm } from '@/components/activities/NewActivityForm';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { Clock, Zap, Timer } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ActivitiesPage() {
    await ensureDefaultCategories();

    const [activities, categories, currentActivity] = await Promise.all([
        getActivities(),
        getActivityCategories(),
        getCurrentActivity(),
    ]);

    const completedActivities = activities.filter(a => a.endTime !== null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayActivities = completedActivities.filter(
        a => new Date(a.startTime) >= today
    );
    const todayTotalMinutes = todayActivities.reduce((sum, a) => sum + (a.duration || 0), 0);
    const todayHours = Math.floor(todayTotalMinutes / 60);
    const todayMins = todayTotalMinutes % 60;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                        <Timer size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">تتبع النشاطات</h1>
                        <p className="text-muted-foreground">سجّل أنشطتك وحسّن إنتاجيتك يوماً بعد يوم</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <span className="text-lg font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
                        {activities.length} نشاط
                    </span>
                </div>
            </div>

            {/* Today's Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-5 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">وقت اليوم</p>
                        <p className="text-2xl font-bold text-blue-700">{todayHours}س {todayMins}د</p>
                    </div>
                </div>
                <div className="glass-card p-5 flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                        <Zap size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">أنشطة اليوم</p>
                        <p className="text-2xl font-bold text-emerald-700">{todayActivities.length}</p>
                    </div>
                </div>
                <div className="glass-card p-5 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${currentActivity ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Timer size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">الحالة</p>
                        <p className={`text-lg font-bold ${currentActivity ? 'text-green-600' : 'text-gray-500'}`}>
                            {currentActivity ? '🟢 نشاط جارٍ' : '⚪ لا يوجد نشاط'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Current Activity */}
            {currentActivity && (
                <div className="glass-card p-4 border-2 border-emerald-500 bg-emerald-50/50">
                    <h2 className="text-lg font-bold mb-3 text-emerald-700">🟢 النشاط الجاري حالياً</h2>
                    <ActivityCard
                        id={currentActivity.id}
                        title={currentActivity.title}
                        description={currentActivity.description}
                        startTime={currentActivity.startTime}
                        endTime={currentActivity.endTime}
                        duration={currentActivity.duration}
                        rating={currentActivity.rating}
                        category={currentActivity.category}
                        isActive={true}
                    />
                </div>
            )}

            {/* New Activity Form */}
            <NewActivityForm
                categories={categories}
                hasActiveActivity={!!currentActivity}
            />

            {/* Activity History */}
            <div>
                <h2 className="text-lg font-bold mb-4">سجل النشاطات</h2>
                {completedActivities.length === 0 ? (
                    <div className="glass-card text-center py-16">
                        <p className="text-xl text-muted-foreground">لا توجد أنشطة مسجلة بعد...</p>
                        <p className="text-sm text-muted-foreground mt-2">ابدأ بتسجيل أول نشاط لك!</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {completedActivities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                id={activity.id}
                                title={activity.title}
                                description={activity.description}
                                startTime={activity.startTime}
                                endTime={activity.endTime}
                                duration={activity.duration}
                                rating={activity.rating}
                                category={activity.category}
                                isActive={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
