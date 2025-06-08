
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  Sword, 
  Users, 
  Trophy, 
  Clock, 
  Star, 
  Zap,
  Shield,
  Target,
  Fish,
  Gem,
  Crown
} from 'lucide-react';

const DailyActivitiesSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dailyActivities = [
    {
      id: 'worldboss',
      name: 'Boss Thế Giới',
      description: 'Tiêu diệt boss để nhận trang bị hiếm',
      times: ['12:00', '18:00', '21:00'],
      progress: 2,
      maxProgress: 3,
      rewards: ['Trang bị Epic', '5000 EXP', '2000 Bạc'],
      icon: Sword,
      status: 'available'
    },
    {
      id: 'fishing',
      name: 'Câu Cá',
      description: 'Thu thập nguyên liệu quý hiếm',
      progress: 15,
      maxProgress: 50,
      rewards: ['Nguyên liệu', '1000 EXP'],
      icon: Fish,
      status: 'inProgress'
    },
    {
      id: 'cultivation',
      name: 'Treo Máy Tu Luyện',
      description: 'Tự động luyện công khi offline',
      progress: 480,
      maxProgress: 600,
      rewards: ['EXP tự động', 'Linh khí'],
      icon: Zap,
      status: 'inProgress'
    },
    {
      id: 'escort',
      name: 'Vận Tiêu',
      description: 'Hộ tống NPC an toàn đến đích',
      progress: 1,
      maxProgress: 3,
      rewards: ['3000 Bạc', '1500 EXP'],
      icon: Shield,
      status: 'available'
    },
    {
      id: 'bounty',
      name: 'Truy Nã',
      description: 'Săn thưởng các mục tiêu nguy hiểm',
      progress: 0,
      maxProgress: 5,
      rewards: ['Điểm danh vọng', '2000 EXP'],
      icon: Target,
      status: 'available'
    }
  ];

  const timeBasedActivities = [
    {
      id: 'battlefield',
      name: 'Chiến Trường Liên Server',
      description: 'PvP quy mô lớn',
      time: '20:00',
      duration: '1 giờ',
      rewards: ['Điểm PvP', 'Trang bị PvP'],
      participants: 156,
      icon: Users
    },
    {
      id: 'powerRace',
      name: 'Đua Top Lực Chiến',
      description: 'Thi đấu lực chiến thời gian thực',
      time: '19:00',
      duration: '2 giờ',
      rewards: ['Danh hiệu', '10000 EXP'],
      participants: 89,
      icon: Trophy
    }
  ];

  const weeklyActivities = [
    {
      id: 'crossServer',
      name: 'Liên Đấu Liên Server',
      description: 'Thi đấu với các server khác',
      day: 'Thứ 7',
      time: '20:00',
      rewards: ['Trang bị Legendary', 'Danh hiệu độc quyền'],
      season: 'Mùa 3',
      icon: Crown
    },
    {
      id: 'guildWar',
      name: 'Bang Chiến',
      description: 'Các bang hội tranh đấu lãnh địa',
      day: 'Chủ nhật',
      time: '19:00',
      rewards: ['Điểm bang hội', 'Tài nguyên lãnh địa'],
      season: 'Tuần 12',
      icon: Shield
    }
  ];

  const handleJoinActivity = (activity: any) => {
    addNotification(`Đã tham gia ${activity.name}!`, 'success');
  };

  const getTimeLeft = (time: string) => {
    const now = currentTime;
    const [hours, minutes] = time.split(':').map(Number);
    const targetTime = new Date(now);
    targetTime.setHours(hours, minutes, 0, 0);
    
    if (targetTime.getTime() < now.getTime()) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const timeDiff = targetTime.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hoursLeft}h ${minutesLeft}m`;
  };

  const getActivityStatus = (activity: any) => {
    if (activity.progress >= activity.maxProgress) return 'completed';
    if (activity.progress > 0) return 'inProgress';
    return 'available';
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 border-cultivator-gold/30">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Hoạt Động Hàng Ngày
        </h2>
        <p className="text-sm text-muted-foreground">
          Tham gia các hoạt động để nhận phần thưởng và nâng cao sức mạnh.
        </p>
      </Card>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Hàng Ngày</TabsTrigger>
          <TabsTrigger value="timed">Theo Giờ</TabsTrigger>
          <TabsTrigger value="weekly">Hàng Tuần</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-3">
          {dailyActivities.map((activity) => {
            const ActivityIcon = activity.icon;
            const status = getActivityStatus(activity);
            
            return (
              <Card key={activity.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cultivator-gold/20 to-spirit-jade/20 flex items-center justify-center">
                    <ActivityIcon className="w-6 h-6 text-cultivator-gold" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{activity.name}</h3>
                      <Badge variant="outline" className={
                        status === 'completed' ? 'border-green-500 text-green-500' :
                        status === 'inProgress' ? 'border-yellow-500 text-yellow-500' :
                        'border-blue-500 text-blue-500'
                      }>
                        {status === 'completed' ? 'Hoàn thành' :
                         status === 'inProgress' ? 'Đang thực hiện' : 'Có thể tham gia'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                    
                    {activity.times && (
                      <div className="flex items-center gap-1 mb-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Thời gian: {activity.times.join(', ')}</span>
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Tiến độ</span>
                        <span>{activity.progress}/{activity.maxProgress}</span>
                      </div>
                      <Progress value={(activity.progress / activity.maxProgress) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {activity.rewards.map((reward, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-spirit-jade text-spirit-jade">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleJoinActivity(activity)}
                        disabled={status === 'completed'}
                      >
                        {status === 'completed' ? 'Đã hoàn thành' : 'Tham gia'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="timed" className="space-y-3">
          {timeBasedActivities.map((activity) => {
            const ActivityIcon = activity.icon;
            
            return (
              <Card key={activity.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-divine-blue/20 to-mystical-purple/20 flex items-center justify-center">
                    <ActivityIcon className="w-6 h-6 text-divine-blue" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{activity.name}</h3>
                      <div className="text-right text-sm">
                        <div className="font-medium">{activity.time}</div>
                        <div className="text-muted-foreground">{getTimeLeft(activity.time)}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {activity.rewards.map((reward, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-divine-blue text-divine-blue">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{activity.participants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-3">
          {weeklyActivities.map((activity) => {
            const ActivityIcon = activity.icon;
            
            return (
              <Card key={activity.id} className="p-4 bg-gradient-to-r from-mystical-purple/10 to-cultivator-gold/10 border-mystical-purple/30">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-mystical-purple/20 to-cultivator-gold/20 flex items-center justify-center">
                    <ActivityIcon className="w-6 h-6 text-mystical-purple" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{activity.name}</h3>
                        <div className="text-xs text-mystical-purple">{activity.season}</div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">{activity.day}</div>
                        <div className="text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {activity.rewards.map((reward, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-mystical-purple text-mystical-purple">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="bg-mystical-purple hover:bg-mystical-purple/80">
                        Đăng Ký
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyActivitiesSystem;
