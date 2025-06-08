import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGameState } from '@/hooks/useGameState';
import { 
  Gift, 
  Calendar, 
  Crown,
  Star,
  Clock,
  Users,
  Target,
  Trophy,
  Coins,
  Gem,
  Sparkles
} from 'lucide-react';

const WelfareSystem = () => {
  const { gameState, claimReward, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState('daily');

  const dailyRewards = [
    { day: 1, reward: '1000 Bạc', claimed: true },
    { day: 2, reward: '50 Kim Nguyên Bảo', claimed: true },
    { day: 3, reward: '2 Linh Thạch', claimed: true },
    { day: 4, reward: '2000 Bạc', claimed: false },
    { day: 5, reward: '100 Kim Nguyên Bảo', claimed: false },
    { day: 6, reward: '5 Linh Thạch', claimed: false },
    { day: 7, reward: 'Hộp Quà Đặc Biệt', claimed: false }
  ];

  const weeklyRewards = [
    { 
      id: 'week1', 
      name: 'Hoàn thành 20 nhiệm vụ', 
      progress: 15, 
      max: 20, 
      reward: '5000 Bạc + 3 Linh Thạch', 
      claimed: false 
    },
    { 
      id: 'week2', 
      name: 'Đăng nhập 5 ngày', 
      progress: 3, 
      max: 5, 
      reward: '200 Kim Nguyên Bảo', 
      claimed: false 
    },
    { 
      id: 'week3', 
      name: 'Chiến thắng 10 trận PvP', 
      progress: 7, 
      max: 10, 
      reward: '10 Linh Thạch + Trang bị Epic', 
      claimed: false 
    }
  ];

  const monthlyRewards = [
    { 
      id: 'month1', 
      name: 'Tích lũy đăng nhập 25 ngày', 
      progress: 18, 
      max: 25, 
      reward: '50000 Bạc + 20 Linh Thạch', 
      claimed: false 
    },
    { 
      id: 'month2', 
      name: 'Hoàn thành 100 nhiệm vụ', 
      progress: 73, 
      max: 100, 
      reward: '1000 Kim Nguyên Bảo + Trang bị Legendary', 
      claimed: false 
    }
  ];

  const vipRewards = [
    { level: 1, dailyReward: '500 Bạc', claimed: false },
    { level: 2, dailyReward: '100 Kim Nguyên Bảo + 2 Linh Thạch', claimed: false },
    { level: 3, dailyReward: '200 Kim Nguyên Bảo + 5 Linh Thạch', claimed: false },
    { level: 4, dailyReward: '500 Kim Nguyên Bảo + 10 Linh Thạch', claimed: false },
    { level: 5, dailyReward: '1000 Kim Nguyên Bảo + 20 Linh Thạch', claimed: false }
  ];

  const levelRewards = [
    { level: 10, reward: '5000 Bạc + Trang bị Rare', claimed: true },
    { level: 20, reward: '10000 Bạc + 100 Kim Nguyên Bảo', claimed: true },
    { level: 30, reward: '20000 Bạc + 10 Linh Thạch', claimed: false },
    { level: 40, reward: '50000 Bạc + Trang bị Epic', claimed: false },
    { level: 50, reward: '100000 Bạc + Trang bị Legendary', claimed: false }
  ];

  const handleClaimDaily = (day: number) => {
    claimReward('silver', 1000);
    addNotification(`Đã nhận quà ngày ${day}!`, 'success');
  };

  const handleClaimWeekly = (reward: any) => {
    if (reward.progress >= reward.max) {
      addNotification(`Đã nhận thưởng: ${reward.reward}!`, 'success');
    } else {
      addNotification('Chưa đủ điều kiện nhận thưởng!', 'warning');
    }
  };

  const handleClaimVip = (level: number) => {
    if (gameState?.player?.vipLevel >= level) {
      addNotification(`Đã nhận quà VIP${level}!`, 'success');
    } else {
      addNotification(`Cần đạt VIP${level} để nhận quà!`, 'warning');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          Phúc Lợi & Quà Tặng
        </h2>

        {/* Player Resources Summary */}
        <Card className="p-3 mb-4 bg-muted/20">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-spirit-jade">Tài Nguyên Hiện Tại</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span>{formatNumber(gameState?.player?.silver || 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Gem className="w-4 h-4 text-blue-500" />
                <span>{formatNumber(gameState?.player?.goldIngots || 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-mystical-purple" />
                <span>{gameState?.player?.rechargeSpiritStones || 0}</span>
              </div>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Hàng Ngày
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Hàng Tuần
            </TabsTrigger>
            <TabsTrigger value="vip" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              VIP
            </TabsTrigger>
            <TabsTrigger value="level" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Cấp Độ
            </TabsTrigger>
          </TabsList>

          {/* Daily Rewards */}
          <TabsContent value="daily" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Điểm Danh Hàng Ngày</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {dailyRewards.map((dayReward, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${dayReward.claimed ? 'border-green-500 bg-green-100/50' : 'border-border/30 bg-card/50'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Ngày {dayReward.day}</span>
                      {dayReward.claimed && <Star className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Phần thưởng: {dayReward.reward}
                    </div>
                    {!dayReward.claimed ? (
                      <Button size="sm" className="w-full" onClick={() => handleClaimDaily(dayReward.day)}>
                        Nhận
                      </Button>
                    ) : (
                      <Badge variant="secondary" className="w-full">Đã Nhận</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Weekly Rewards */}
          <TabsContent value="weekly" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Nhiệm Vụ Hàng Tuần</h3>
              <div className="space-y-3">
                {weeklyRewards.map((reward) => (
                  <div key={reward.id} className="p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{reward.name}</span>
                      {reward.claimed && <Star className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <Progress value={(reward.progress / reward.max) * 100} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Tiến độ: {reward.progress}/{reward.max}</span>
                      <span>Phần thưởng: {reward.reward}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      onClick={() => handleClaimWeekly(reward)}
                      disabled={reward.claimed}
                    >
                      {reward.claimed ? 'Đã Nhận' : 'Nhận Thưởng'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* VIP Rewards */}
          <TabsContent value="vip" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Quà VIP Hàng Ngày</h3>
              <div className="space-y-3">
                {vipRewards.map((vipReward, index) => (
                  <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">VIP {vipReward.level}</span>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                        {gameState?.player?.vipLevel >= vipReward.level ? 'Đủ Điều Kiện' : 'Chưa Đạt'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Phần thưởng: {vipReward.dailyReward}
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      onClick={() => handleClaimVip(vipReward.level)}
                      disabled={gameState?.player?.vipLevel < vipReward.level}
                    >
                      Nhận Quà VIP {vipReward.level}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Level Rewards */}
          <TabsContent value="level" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Phần Thưởng Cấp Độ</h3>
              <div className="space-y-3">
                {levelRewards.map((levelReward, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${levelReward.claimed ? 'border-green-500 bg-green-100/50' : 'border-border/30 bg-card/50'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Cấp {levelReward.level}</span>
                      {levelReward.claimed && <Star className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Phần thưởng: {levelReward.reward}
                    </div>
                    {!levelReward.claimed ? (
                      <Button size="sm" className="w-full">
                        Nhận (Cấp {levelReward.level})
                      </Button>
                    ) : (
                      <Badge variant="secondary" className="w-full">Đã Nhận</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default WelfareSystem;
