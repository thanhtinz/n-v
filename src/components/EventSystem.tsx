
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, Trophy, Users, Sword, Zap, Star } from 'lucide-react';

const EventSystem = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dailyEvents = [
    {
      id: 1,
      name: 'Boss Thế Giới',
      description: 'Đại Boss xuất hiện tại Thung Lũng Tử Vong',
      time: '12:00',
      duration: '30 phút',
      rewards: ['Trang bị hiếm', '1000 EXP', '500 Vàng'],
      status: 'upcoming',
      icon: <Sword className="w-4 h-4" />
    },
    {
      id: 2,
      name: 'Chiến Trường Liên Server',
      description: 'PvP quy mô lớn với người chơi từ server khác',
      time: '18:00',
      duration: '1 giờ',
      rewards: ['Điểm danh vọng', 'Trang bị PvP', '2000 EXP'],
      status: 'upcoming',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 3,
      name: 'Giờ Vàng Tu Luyện',
      description: 'Tu luyện nhận x2 EXP',
      time: '21:00',
      duration: '1 giờ',
      rewards: ['2x EXP', 'Bonus linh khí'],
      status: 'upcoming',
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const weeklyEvents = [
    {
      id: 1,
      name: 'Liên Đấu Bang Hội',
      description: 'Các bang hội tranh đấu danh vọng',
      day: 'Thứ 7',
      time: '20:00',
      rewards: ['Điểm bang hội', 'Trang bị độc quyền'],
      participants: 156,
      icon: <Trophy className="w-4 h-4" />
    },
    {
      id: 2,
      name: 'Săn Boss Liên Server',
      description: 'Boss khổng lồ cần nhiều người hợp tác',
      day: 'Chủ nhật',
      time: '19:00',
      rewards: ['Trang bị huyền thoại', '5000 EXP'],
      participants: 892,
      icon: <Sword className="w-4 h-4" />
    }
  ];

  const specialEvents = [
    {
      id: 1,
      name: 'Lễ Hội Mùa Xuân',
      description: 'Sự kiện đặc biệt chào mừng năm mới',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      progress: 65,
      rewards: ['Thời trang độc quyền', 'Pet hiếm', '10000 Kim cương'],
      tasks: [
        { name: 'Đăng nhập 7 ngày', completed: true },
        { name: 'Đánh bại 50 boss', completed: true },
        { name: 'Tham gia 20 trận PvP', completed: false },
        { name: 'Đạt level 25', completed: false }
      ]
    }
  ];

  const getEventStatus = (time: string) => {
    const now = currentTime;
    const [hours, minutes] = time.split(':').map(Number);
    const eventTime = new Date(now);
    eventTime.setHours(hours, minutes, 0, 0);
    
    const timeDiff = eventTime.getTime() - now.getTime();
    
    if (timeDiff < 0 && timeDiff > -3600000) { // Within last hour
      return { status: 'active', label: 'Đang diễn ra', color: 'bg-green-500' };
    } else if (timeDiff > 0 && timeDiff <= 3600000) { // Within next hour
      return { status: 'soon', label: 'Sắp diễn ra', color: 'bg-yellow-500' };
    } else if (timeDiff > 0) {
      return { status: 'upcoming', label: 'Sắp tới', color: 'bg-blue-500' };
    } else {
      return { status: 'ended', label: 'Đã kết thúc', color: 'bg-gray-500' };
    }
  };

  const formatTimeLeft = (time: string) => {
    const now = currentTime;
    const [hours, minutes] = time.split(':').map(Number);
    const eventTime = new Date(now);
    eventTime.setHours(hours, minutes, 0, 0);
    
    if (eventTime.getTime() < now.getTime()) {
      eventTime.setDate(eventTime.getDate() + 1);
    }
    
    const timeDiff = eventTime.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hoursLeft}h ${minutesLeft}m`;
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-divine-blue/10 to-mystical-purple/10 border-divine-blue/30">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-divine-blue" />
          <h3 className="font-semibold text-divine-blue">Hệ Thống Sự Kiện</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Tham gia các hoạt động và sự kiện để nhận phần thưởng hấp dẫn.
        </p>
      </Card>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Hàng Ngày</TabsTrigger>
          <TabsTrigger value="weekly">Hàng Tuần</TabsTrigger>
          <TabsTrigger value="special">Đặc Biệt</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-3">
          {dailyEvents.map(event => {
            const status = getEventStatus(event.time);
            return (
              <Card key={event.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {event.icon}
                    <h4 className="font-medium">{event.name}</h4>
                    <Badge variant="outline" className={`text-xs ${status.color} text-white border-none`}>
                      {status.label}
                    </Badge>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{event.time}</div>
                    <div className="text-muted-foreground">{formatTimeLeft(event.time)}</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {event.rewards.map((reward, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{event.duration}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-3">
          {weeklyEvents.map(event => (
            <Card key={event.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {event.icon}
                  <h4 className="font-medium">{event.name}</h4>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{event.day}</div>
                  <div className="text-muted-foreground">{event.time}</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {event.rewards.map((reward, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-mystical-purple text-mystical-purple">
                      {reward}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{event.participants} người tham gia</span>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          {specialEvents.map(event => (
            <Card key={event.id} className="p-6 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 border-cultivator-gold/30">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-cultivator-gold" />
                <h4 className="font-semibold text-cultivator-gold">{event.name}</h4>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Tiến độ sự kiện</span>
                  <span>{event.progress}%</span>
                </div>
                <Progress value={event.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium mb-2">Nhiệm vụ</h5>
                  <div className="space-y-1">
                    {event.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className={`text-sm ${task.completed ? 'text-green-400' : 'text-muted-foreground'}`}>
                          {task.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Phần thưởng</h5>
                  <div className="space-y-1">
                    {event.rewards.map((reward, index) => (
                      <div key={index} className="text-sm flex items-center gap-2">
                        <Star className="w-3 h-3 text-cultivator-gold" />
                        {reward}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {event.startDate} - {event.endDate}
                </div>
                <Button>Tham Gia Ngay</Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventSystem;
