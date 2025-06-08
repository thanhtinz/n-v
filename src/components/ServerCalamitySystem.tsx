
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Shield, 
  Skull, 
  Crown, 
  Users, 
  Clock, 
  Star, 
  Sword,
  AlertTriangle,
  Timer
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

const ServerCalamitySystem = () => {
  const { gameState, addNotification } = useGameState();
  const [calamityCountdown, setCalamityCountdown] = useState(13); // days
  const [currentCalamity, setCurrentCalamity] = useState(null);
  const [serverDefense, setServerDefense] = useState(65);
  const [playersJoined, setPlayersJoined] = useState(892);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCalamityCountdown(prev => prev > 0 ? prev - 0.001 : 15);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const calamityTypes = [
    {
      id: 1,
      name: 'Hỏa Kiếp Thiên Tai',
      description: 'Lửa thiêu đốt khắp đại lục, mọi sinh linh phải hợp lực',
      difficulty: 'Cực Khó',
      boss: 'Viêm Đế - Chúa Tể Lửa',
      rewards: ['Hỏa Kỳ Lân Pet', 'Thiên Hỏa Trang Bị', '50000 EXP'],
      duration: '3 ngày',
      participants: 15420,
      icon: <Zap className="w-5 h-5 text-red-500" />
    },
    {
      id: 2,
      name: 'Băng Hà Kiếp Nạn',
      description: 'Băng tuyết bao phủ thế giới, đóng băng mọi sinh mệnh',
      difficulty: 'Địa Ngục',
      boss: 'Băng Hoàng - Nữ Đế Băng Tuyết',
      rewards: ['Băng Phượng Pet', 'Băng Tinh Vũ Khí', '75000 EXP'],
      duration: '3 ngày',
      participants: 18650,
      icon: <Star className="w-5 h-5 text-blue-500" />
    }
  ];

  const defensiveStructures = [
    { name: 'Thiên Cơ Thành', hp: 1500000, maxHp: 2000000, level: 8 },
    { name: 'Minh Vương Pháo Đài', hp: 1200000, maxHp: 1500000, level: 7 },
    { name: 'Linh Thạch Kết Giới', hp: 800000, maxHp: 1000000, level: 6 },
    { name: 'Tu Sĩ Đại Trận', hp: 600000, maxHp: 800000, level: 5 }
  ];

  const joinDefense = () => {
    setPlayersJoined(prev => prev + 1);
    addNotification('Đã tham gia phòng thủ Thiên Kiếp!', 'success');
  };

  const formatTimeLeft = (days) => {
    const hours = Math.floor((days % 1) * 24);
    const minutes = Math.floor(((days % 1) * 24 % 1) * 60);
    return `${Math.floor(days)} ngày ${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-red-400">Thiên Kiếp Toàn Server</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Cứ 15 ngày một lần, Thiên Kiếp giáng xuống thử thách toàn bộ server.
        </p>
      </Card>

      <Tabs defaultValue="countdown" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="countdown">Đếm Ngược</TabsTrigger>
          <TabsTrigger value="defense">Phòng Thủ</TabsTrigger>
          <TabsTrigger value="history">Lịch Sử</TabsTrigger>
        </TabsList>

        <TabsContent value="countdown">
          <Card className="p-6 bg-gradient-to-r from-purple-900/20 to-red-900/20 border-purple-500/30">
            <div className="text-center mb-4">
              <Skull className="w-16 h-16 text-red-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-red-400 mb-2">Thiên Kiếp Sắp Tới</h3>
              <p className="text-muted-foreground">Hãy chuẩn bị tinh thần và sức mạnh!</p>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-red-400 mb-2">
                {formatTimeLeft(calamityCountdown)}
              </div>
              <Progress 
                value={((15 - calamityCountdown) / 15) * 100} 
                className="h-3 bg-muted/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-card/30 rounded-lg">
                <Users className="w-6 h-6 text-divine-blue mx-auto mb-1" />
                <div className="font-medium">{playersJoined.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Người tham gia</div>
              </div>
              <div className="text-center p-3 bg-card/30 rounded-lg">
                <Shield className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <div className="font-medium">{serverDefense}%</div>
                <div className="text-xs text-muted-foreground">Độ phòng thủ</div>
              </div>
            </div>

            <Button onClick={joinDefense} className="w-full bg-red-600 hover:bg-red-700">
              <Shield className="w-4 h-4 mr-2" />
              Tham Gia Phòng Thủ
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="defense">
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Công Trình Phòng Thủ
              </h4>
              <div className="space-y-3">
                {defensiveStructures.map((structure, index) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{structure.name}</span>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Cấp {structure.level}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>HP</span>
                      <span>{(structure.hp / 1000).toFixed(0)}K / {(structure.maxHp / 1000).toFixed(0)}K</span>
                    </div>
                    <Progress 
                      value={(structure.hp / structure.maxHp) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Nhiệm Vụ Phòng Thủ</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">Tu luyện tăng cường phòng thủ</span>
                  <Button size="sm" variant="outline">Thực hiện</Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">Quyên góp tài nguyên</span>
                  <Button size="sm" variant="outline">Quyên góp</Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">Tham gia tuần tra</span>
                  <Button size="sm" variant="outline">Tham gia</Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-3">
            {calamityTypes.map(calamity => (
              <Card key={calamity.id} className="p-4">
                <div className="flex items-start gap-3">
                  {calamity.icon}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{calamity.name}</h4>
                      <Badge variant="destructive" className="text-xs">
                        {calamity.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {calamity.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Skull className="w-3 h-3" />
                        {calamity.boss}
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {calamity.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {calamity.participants.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {calamity.rewards.map((reward, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServerCalamitySystem;
