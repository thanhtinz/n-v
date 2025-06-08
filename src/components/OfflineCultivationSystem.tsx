
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Clock, 
  Star, 
  Gift, 
  Play, 
  Pause, 
  Settings,
  TrendingUp,
  Gem,
  Coins,
  BookOpen,
  Timer
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

const OfflineCultivationSystem = () => {
  const { gameState, claimReward, addNotification } = useGameState();
  const [isOfflineCultivating, setIsOfflineCultivating] = useState(false);
  const [offlineStartTime, setOfflineStartTime] = useState<Date | null>(null);
  const [offlineRewards, setOfflineRewards] = useState<any>(null);
  const [cultivationSpeed, setCultivationSpeed] = useState(100); // Base 100%

  useEffect(() => {
    // Check if returning from offline cultivation
    const savedOfflineData = localStorage.getItem('offlineCultivation');
    if (savedOfflineData) {
      const data = JSON.parse(savedOfflineData);
      const startTime = new Date(data.startTime);
      const now = new Date();
      const offlineHours = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      
      if (offlineHours > 0.1) { // Minimum 6 minutes offline
        calculateOfflineRewards(offlineHours);
        localStorage.removeItem('offlineCultivation');
      }
    }
  }, []);

  const calculateOfflineRewards = (hours: number) => {
    const baseExpPerHour = 50;
    const baseSpiritStones = 5;
    const baseGold = 20;
    
    // Apply cultivation speed bonus
    const multiplier = cultivationSpeed / 100;
    
    const rewards = {
      exp: Math.floor(hours * baseExpPerHour * multiplier),
      spiritStones: Math.floor(hours * baseSpiritStones * multiplier),
      gold: Math.floor(hours * baseGold * multiplier),
      hours: Math.floor(hours * 10) / 10,
      treasures: hours > 8 ? ['Thiên Cấp Đan Dược', 'Linh Khí Tinh Thể'] : hours > 4 ? ['Địa Cấp Đan Dược'] : []
    };
    
    setOfflineRewards(rewards);
  };

  const startOfflineCultivation = () => {
    const now = new Date();
    setOfflineStartTime(now);
    setIsOfflineCultivating(true);
    
    localStorage.setItem('offlineCultivation', JSON.stringify({
      startTime: now.toISOString(),
      speed: cultivationSpeed
    }));
    
    addNotification('Bắt đầu tu hành tự động!', 'info');
  };

  const stopOfflineCultivation = () => {
    if (offlineStartTime) {
      const now = new Date();
      const hours = (now.getTime() - offlineStartTime.getTime()) / (1000 * 60 * 60);
      calculateOfflineRewards(hours);
    }
    
    setIsOfflineCultivating(false);
    setOfflineStartTime(null);
    localStorage.removeItem('offlineCultivation');
  };

  const claimOfflineRewards = () => {
    if (offlineRewards) {
      claimReward('exp', offlineRewards.exp);
      claimReward('rechargeSpiritStones', offlineRewards.spiritStones);
      claimReward('silver', offlineRewards.gold);
      
      addNotification(`Tu hành ${offlineRewards.hours}h - Nhận được phần thưởng!`, 'success');
      setOfflineRewards(null);
    }
  };

  const getCurrentCultivationTime = () => {
    if (!offlineStartTime) return 0;
    const now = new Date();
    return (now.getTime() - offlineStartTime.getTime()) / (1000 * 60 * 60);
  };

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.floor(hours * 60)}p`;
    return `${Math.floor(hours)}h${Math.floor((hours % 1) * 60)}p`;
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-divine-blue/10 to-mystical-purple/10 border-divine-blue/30">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-divine-blue" />
          <h3 className="font-semibold text-divine-blue">Tu Hành Tự Động</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Để nhân vật tu luyện khi offline, thu thập linh thạch và kinh nghiệm.
        </p>
      </Card>

      {/* Offline Rewards Modal */}
      {offlineRewards && (
        <Card className="p-6 bg-gradient-to-r from-cultivator-gold/20 to-spirit-jade/20 border-cultivator-gold/50">
          <div className="text-center mb-4">
            <Gift className="w-12 h-12 text-cultivator-gold mx-auto mb-2" />
            <h3 className="text-xl font-bold text-cultivator-gold">Chào Mừng Trở Lại!</h3>
            <p className="text-sm text-muted-foreground">
              Ngươi đã tu hành offline {offlineRewards.hours} giờ
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-card/50 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <div className="font-medium">+{offlineRewards.exp}</div>
              <div className="text-xs text-muted-foreground">Kinh Nghiệm</div>
            </div>
            <div className="text-center p-3 bg-card/50 rounded-lg">
              <Gem className="w-6 h-6 text-mystical-purple mx-auto mb-1" />
              <div className="font-medium">+{offlineRewards.spiritStones}</div>
              <div className="text-xs text-muted-foreground">Linh Thạch</div>
            </div>
            <div className="text-center p-3 bg-card/50 rounded-lg">
              <Coins className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <div className="font-medium">+{offlineRewards.gold}</div>
              <div className="text-xs text-muted-foreground">Bạc</div>
            </div>
            <div className="text-center p-3 bg-card/50 rounded-lg">
              <Star className="w-6 h-6 text-spirit-jade mx-auto mb-1" />
              <div className="font-medium">{offlineRewards.treasures.length}</div>
              <div className="text-xs text-muted-foreground">Bảo Vật</div>
            </div>
          </div>

          {offlineRewards.treasures.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Bảo vật nhận được:</p>
              <div className="flex flex-wrap gap-2">
                {offlineRewards.treasures.map((treasure: string, index: number) => (
                  <Badge key={index} variant="outline" className="border-spirit-jade text-spirit-jade">
                    {treasure}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button onClick={claimOfflineRewards} className="w-full bg-cultivator-gold hover:bg-cultivator-gold/80">
            <Gift className="w-4 h-4 mr-2" />
            Nhận Phần Thưởng
          </Button>
        </Card>
      )}

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="status">Trạng Thái</TabsTrigger>
          <TabsTrigger value="settings">Cài Đặt</TabsTrigger>
          <TabsTrigger value="buffs">Buff</TabsTrigger>
        </TabsList>

        <TabsContent value="status">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isOfflineCultivating ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                  <span className="font-medium">
                    {isOfflineCultivating ? 'Đang Tu Hành Tự Động' : 'Chưa Bắt Đầu'}
                  </span>
                </div>
                <Badge variant="outline" className="border-divine-blue text-divine-blue">
                  Tốc độ: {cultivationSpeed}%
                </Badge>
              </div>

              {isOfflineCultivating && offlineStartTime && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Thời gian tu hành</span>
                    <span>{formatTime(getCurrentCultivationTime())}</span>
                  </div>
                  <Progress value={Math.min((getCurrentCultivationTime() / 12) * 100, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hiệu quả tối đa sau 12 giờ
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="text-sm font-medium">~50 EXP/h</div>
                  <div className="text-xs text-muted-foreground">Kinh Nghiệm</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Gem className="w-5 h-5 text-mystical-purple mx-auto mb-1" />
                  <div className="text-sm font-medium">~5/h</div>
                  <div className="text-xs text-muted-foreground">Linh Thạch</div>
                </div>
              </div>

              <div className="flex gap-2">
                {!isOfflineCultivating ? (
                  <Button onClick={startOfflineCultivation} className="flex-1 bg-divine-blue hover:bg-divine-blue/80">
                    <Play className="w-4 h-4 mr-2" />
                    Bắt Đầu Tu Hành
                  </Button>
                ) : (
                  <Button onClick={stopOfflineCultivation} variant="outline" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Dừng Tu Hành
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Cài Đặt Tu Hành</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto thu thập phần thưởng</span>
                    <Badge variant="outline" className="border-green-500 text-green-500">BẬT</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Thông báo khi đầy</span>
                    <Badge variant="outline" className="border-green-500 text-green-500">BẬT</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tối đa 24h offline</span>
                    <Badge variant="outline">Mặc định</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Thống Kê</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-lg font-bold text-cultivator-gold">247h</div>
                    <div className="text-xs text-muted-foreground">Tổng thời gian</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-lg font-bold text-spirit-jade">12,350</div>
                    <div className="text-xs text-muted-foreground">Tổng EXP</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="buffs">
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Buff Tăng Hiệu Quả</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium text-sm">Tu Luyện Đan</div>
                      <div className="text-xs text-muted-foreground">+20% EXP (2h)</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Sử Dụng
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-mystical-purple" />
                    <div>
                      <div className="font-medium text-sm">Linh Khí Phù</div>
                      <div className="text-xs text-muted-foreground">+30% tất cả (1h)</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Sử Dụng
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-divine-blue" />
                    <div>
                      <div className="font-medium text-sm">VIP Buff</div>
                      <div className="text-xs text-muted-foreground">+50% thường trực</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                    VIP 2
                  </Badge>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 rounded-lg border border-cultivator-gold/30">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-4 h-4 text-cultivator-gold" />
                  <span className="font-medium text-cultivator-gold">Hiệu Quả Hiện Tại</span>
                </div>
                <div className="text-2xl font-bold text-cultivator-gold mb-1">{cultivationSpeed}%</div>
                <div className="text-xs text-muted-foreground">
                  Base 100% + VIP 20% = 120%
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfflineCultivationSystem;
