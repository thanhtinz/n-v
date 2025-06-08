
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  DollarSign, 
  TrendingUp,
  ArrowUp,
  ArrowDown 
} from 'lucide-react';

const AdminOverview = () => {
  const stats = {
    totalPlayers: 45234,
    onlinePlayers: 8756,
    totalRevenue: 156780000,
    monthlyRevenue: 23450000,
    newPlayersToday: 234,
    activeEvents: 3,
    totalQuests: 156,
    completedQuests: 12456,
    yesterdayPlayers: 8234,
    lastMonthRevenue: 21200000
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getGrowthPercentage = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, className = "" }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    trend?: 'up' | 'down';
    trendValue?: string;
    className?: string;
  }) => (
    <Card className={`p-3 md:p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="text-lg md:text-2xl font-bold mb-1">{value}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground">{subtitle}</div>
          )}
        </div>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {trendValue}%
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Tổng Người Chơi"
          value={stats.totalPlayers.toLocaleString()}
          subtitle={`+${stats.newPlayersToday} hôm nay`}
          icon={Users}
          trend="up"
          trendValue="12.5"
          className="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        
        <StatCard
          title="Đang Online"
          value={stats.onlinePlayers.toLocaleString()}
          subtitle={`${Math.round((stats.onlinePlayers / stats.totalPlayers) * 100)}% tổng`}
          icon={Activity}
          trend={stats.onlinePlayers > stats.yesterdayPlayers ? 'up' : 'down'}
          trendValue={getGrowthPercentage(stats.onlinePlayers, stats.yesterdayPlayers)}
          className="bg-gradient-to-br from-green-50 to-green-100"
        />
        
        <StatCard
          title="Doanh Thu Tháng"
          value={formatCurrency(stats.monthlyRevenue)}
          subtitle={formatCurrency(stats.totalRevenue) + " tổng"}
          icon={DollarSign}
          trend={stats.monthlyRevenue > stats.lastMonthRevenue ? 'up' : 'down'}
          trendValue={getGrowthPercentage(stats.monthlyRevenue, stats.lastMonthRevenue)}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100"
        />
        
        <StatCard
          title="Sự Kiện Hoạt Động"
          value={stats.activeEvents}
          subtitle={`${stats.totalQuests} nhiệm vụ`}
          icon={TrendingUp}
          className="bg-gradient-to-br from-purple-50 to-purple-100"
        />
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-sm md:text-base">Hành Động Nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Tạo Sự Kiện', color: 'bg-blue-500' },
            { label: 'Quản Lý Shop', color: 'bg-green-500' },
            { label: 'Gift Code', color: 'bg-purple-500' },
            { label: 'Thống Kê', color: 'bg-orange-500' }
          ].map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white p-2 md:p-3 rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-sm md:text-base">Hoạt Động Gần Đây</h3>
        <div className="space-y-3">
          {[
            { type: 'user', message: '234 người chơi mới đăng ký', time: '5 phút trước', color: 'bg-green-500' },
            { type: 'purchase', message: 'Gói VIP Tháng được mua (199.000đ)', time: '10 phút trước', color: 'bg-blue-500' },
            { type: 'code', message: 'SUMMER2024 được sử dụng 45 lần', time: '15 phút trước', color: 'bg-yellow-500' },
            { type: 'event', message: 'Event Boss được kích hoạt', time: '30 phút trước', color: 'bg-purple-500' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-2 md:p-3 bg-muted/20 rounded-lg">
              <div className={`w-2 h-2 md:w-3 md:h-3 ${activity.color} rounded-full mt-1.5 md:mt-2`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs md:text-sm font-medium truncate">{activity.message}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-sm md:text-base">Biểu Đồ Hiệu Suất</h3>
        <div className="h-32 md:h-48 bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <p className="text-xs md:text-sm">Biểu đồ thống kê sẽ hiển thị ở đây</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminOverview;
