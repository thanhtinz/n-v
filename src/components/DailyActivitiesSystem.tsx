import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import LuckyWheelSystem from './LuckyWheelSystem';
import { 
  Clock, 
  Flame, 
  Users, 
  Trophy, 
  Coins, 
  MapPin, 
  Swords, 
  Crown,
  Zap,
  Target,
  Calendar,
  Star,
  RotateCcw
} from 'lucide-react';

const DailyActivitiesSystem = () => {
  const { addNotification } = useGameState();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const worldBossEvents = [
    {
      id: 1,
      name: 'Long Vương Ao Thâm',
      time: '12:00',
      status: 'upcoming',
      level: '50+',
      rewards: ['Rồng Lân', 'Đá Cường Hóa', 'Kim Cương'],
      participants: 142,
      timeLeft: '2h 15m'
    },
    {
      id: 2,
      name: 'Hỏa Phượng Thiêu Nguyên',
      time: '18:00',
      status: 'active',
      level: '60+',
      rewards: ['Thiên Hỏa Ngọc', 'Linh Thạch', 'Trang Bị Epic'],
      participants: 89,
      timeLeft: '45m'
    },
    {
      id: 3,
      name: 'Băng Ma Hoàng',
      time: '21:00',
      status: 'upcoming',
      level: '70+',
      rewards: ['Băng Tinh', 'Đá Tăng Cấp', 'Pet Hiếm'],
      participants: 67,
      timeLeft: '6h 30m'
    }
  ];

  const limitedTimeEvents = [
    {
      id: 1,
      name: 'Chiến Trường Liên Server',
      description: 'PvP quy mô lớn 5v5',
      time: '19:00 - 20:00',
      status: 'upcoming',
      rewards: ['Danh Hiệu', 'Trang Bị PvP', 'Điểm Danh Vọng'],
      timeLeft: '4h 30m'
    },
    {
      id: 2,
      name: 'Đua Top Lực Chiến',
      description: 'Thời gian thực - Top 100',
      time: '20:00 - 22:00',
      status: 'active',
      rewards: ['Kim Cương', 'Buff Toàn Server', 'Title'],
      timeLeft: '1h 15m'
    },
    {
      id: 3,
      name: 'Tổ Đội Tranh Tài Nguyên',
      description: 'Thu thập vàng, ngọc, linh khí',
      time: '14:00 - 16:00',
      status: 'ended',
      rewards: ['Vàng', 'Ngọc', 'Linh Khí'],
      timeLeft: 'Đã kết thúc'
    }
  ];

  const weeklyEvents = [
    {
      id: 1,
      name: 'Liên Đấu Liên Server',
      description: 'PvP 1v1, 3v3 đỉnh cao',
      day: 'Thứ 7',
      rewards: ['Title Mùa', 'Trang Bị Legendary', 'Pet Độc Quyền'],
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Vương Giả Chiến',
      description: 'Boss liên server cực mạnh',
      day: 'Chủ Nhật',
      rewards: ['Vũ Khí Thần Thoại', 'Kim Cương x1000', 'Skin Độc Quyền'],
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'Bang Chiến Lãnh Địa',
      description: 'Tranh đoạt lãnh thổ',
      day: 'Thứ 6',
      rewards: ['Buff Bang Hội', 'Tài Nguyên Lãnh Địa', 'Danh Hiệu'],
      status: 'active'
    }
  ];

  const guildActivities = [
    {
      id: 1,
      name: 'Đạo Lữ Chiến',
      description: 'PvP cặp đôi romantic',
      requirements: 'Có bạn đời',
      rewards: ['Trang Phục Couple', 'Pet Đôi', 'Title Tình Nhân'],
      status: 'available'
    },
    {
      id: 2,
      name: 'Truyền Công Sư Đồ',
      description: 'Hệ thống mentor-student',
      requirements: 'Cấp 30+',
      rewards: ['EXP Bonus', 'Kỹ Năng Đặc Biệt', 'Điểm Sư Môn'],
      status: 'available'
    },
    {
      id: 3,
      name: 'Thành Chiến Quy Mô',
      description: 'Công thành liên bang hội',
      requirements: 'Bang Hội Cấp 3+',
      rewards: ['Quyền Cai Trị', 'Thuế Thành Phố', 'Buff Toàn Bang'],
      status: 'locked'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'upcoming': return 'text-blue-400 border-blue-400';
      case 'ended': return 'text-gray-400 border-gray-400';
      case 'locked': return 'text-red-400 border-red-400';
      default: return 'text-yellow-400 border-yellow-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang Diễn Ra';
      case 'upcoming': return 'Sắp Diễn Ra';
      case 'ended': return 'Đã Kết Thúc';
      case 'locked': return 'Chưa Mở';
      default: return 'Có Thể Tham Gia';
    }
  };

  const handleJoinActivity = (activityName: string) => {
    addNotification(`Đã tham gia ${activityName}!`, 'success');
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 border-cultivator-gold/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cultivator-gold" />
            <h2 className="text-xl font-semibold text-cultivator-gold">Hoạt Động Hàng Ngày</h2>
          </div>
          <div className="text-sm text-spirit-jade font-mono">
            {formatTime(currentTime)}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Tham gia các hoạt động để nhận phần thưởng hấp dẫn và nâng cao trình độ tu luyện.
        </p>
      </Card>

      <Tabs defaultValue="world-boss" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="world-boss" className="text-xs">Boss TG</TabsTrigger>
          <TabsTrigger value="limited" className="text-xs">Giới Hạn</TabsTrigger>
          <TabsTrigger value="weekly" className="text-xs">Hàng Tuần</TabsTrigger>
          <TabsTrigger value="lucky-wheel" className="text-xs">Vòng Quay</TabsTrigger>
        </TabsList>

        {/* World Boss Events */}
        <TabsContent value="world-boss" className="space-y-4">
          <Card className="p-4 bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-blood-red" />
              <h3 className="font-semibold text-blood-red">Boss Thế Giới</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Boss xuất hiện theo khung giờ cố định. Cả server cùng tham gia!
            </p>
            
            <div className="space-y-3">
              {worldBossEvents.map((boss) => (
                <Card key={boss.id} className="p-4 bg-card/50 border border-border/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-cultivator-gold" />
                      <h4 className="font-medium">{boss.name}</h4>
                    </div>
                    <Badge variant="outline" className={getStatusColor(boss.status)}>
                      {getStatusText(boss.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Thời gian: </span>
                      <span className="font-medium">{boss.time}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Yêu cầu: </span>
                      <span className="font-medium">Lv.{boss.level}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tham gia: </span>
                      <span className="font-medium">{boss.participants} người</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Còn lại: </span>
                      <span className="font-medium text-cultivator-gold">{boss.timeLeft}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Phần thưởng:</p>
                    <div className="flex flex-wrap gap-1">
                      {boss.rewards.map((reward, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleJoinActivity(boss.name)}
                    disabled={boss.status === 'ended'}
                  >
                    {boss.status === 'active' ? 'Tham Gia Ngay' : 
                     boss.status === 'upcoming' ? 'Đặt Lịch Nhắc' : 'Đã Kết Thúc'}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Limited Time Events */}
        <TabsContent value="limited" className="space-y-4">
          <Card className="p-4 bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-divine-blue" />
              <h3 className="font-semibold text-divine-blue">Hoạt Động Giới Hạn</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Các hoạt động theo khung giờ với phần thưởng đặc biệt.
            </p>
            
            <div className="space-y-3">
              {limitedTimeEvents.map((event) => (
                <Card key={event.id} className="p-4 bg-card/50 border border-border/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(event.status)}>
                      {getStatusText(event.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span>⏰ {event.time}</span>
                    <span className="text-cultivator-gold font-medium">{event.timeLeft}</span>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Phần thưởng:</p>
                    <div className="flex flex-wrap gap-1">
                      {event.rewards.map((reward, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-spirit-jade text-spirit-jade">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleJoinActivity(event.name)}
                    disabled={event.status === 'ended'}
                  >
                    {event.status === 'active' ? 'Tham Gia' : 
                     event.status === 'upcoming' ? 'Đăng Ký' : 'Đã Hết Hạn'}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Weekly Events */}
        <TabsContent value="weekly" className="space-y-4">
          <Card className="p-4 bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-mystical-purple" />
              <h3 className="font-semibold text-mystical-purple">Sự Kiện Hàng Tuần</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Các hoạt động lớn diễn ra theo tuần với phần thưởng cực khủng.
            </p>
            
            <div className="space-y-3">
              {weeklyEvents.map((event) => (
                <Card key={event.id} className="p-4 bg-card/50 border border-border/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(event.status)}>
                      {event.day}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Phần thưởng siêu khủng:</p>
                    <div className="flex flex-wrap gap-1">
                      {event.rewards.map((reward, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-mystical-purple text-mystical-purple">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleJoinActivity(event.name)}
                  >
                    Xem Chi Tiết
                  </Button>
                </Card>
              ))}
            </div>

            {/* Guild Activities */}
            <Card className="p-4 bg-card/50 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-spirit-jade" />
                <h4 className="font-medium text-spirit-jade">Hoạt Động Xã Hội</h4>
              </div>
              
              <div className="space-y-3">
                {guildActivities.map((activity) => (
                  <div key={activity.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm">{activity.name}</h5>
                      <Badge variant="outline" className={getStatusColor(activity.status)}>
                        {getStatusText(activity.status)}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
                    <p className="text-xs mb-2">
                      <span className="text-muted-foreground">Yêu cầu: </span>
                      <span className="font-medium">{activity.requirements}</span>
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {activity.rewards.map((reward, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-spirit-jade text-spirit-jade">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Card>
        </TabsContent>

        {/* Lucky Wheel Tab */}
        <TabsContent value="lucky-wheel" className="space-y-4">
          <LuckyWheelSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyActivitiesSystem;
