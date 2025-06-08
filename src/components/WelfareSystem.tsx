import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Sparkles,
  Check
} from 'lucide-react';

const WelfareSystem = () => {
  const { gameState, claimReward, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState('daily');
  const [giftCode, setGiftCode] = useState('');
  const [usedCodes, setUsedCodes] = useState<string[]>(['NEWBIE2024', 'WELCOME100']);

  // Gift code data từ GiftCodeSystem
  const availableGiftCodes = [
    {
      code: 'NEWBIE2024',
      description: 'Quà tặng tân thủ',
      rewards: ['5000 Bạc', '100 Kim Nguyên Bảo', '10 Linh Thạch'],
      expiry: '2024-12-31',
      used: true
    },
    {
      code: 'WELCOME100',
      description: 'Chào mừng 100K người chơi',
      rewards: ['10000 Bạc', '200 Kim Nguyên Bảo', 'Trang bị Epic'],
      expiry: '2024-06-30',
      used: true
    },
    {
      code: 'SUMMER2024',
      description: 'Sự kiện mùa hè',
      rewards: ['15000 Bạc', '300 Kim Nguyên Bảo', '20 Linh Thạch', 'Skin mùa hè'],
      expiry: '2024-08-31',
      used: false
    },
    {
      code: 'BIRTHDAY2024',
      description: 'Sinh nhật server 1 năm',
      rewards: ['20000 Bạc', '500 Kim Nguyên Bảo', '50 Linh Thạch', 'Pet sinh nhật'],
      expiry: '2024-07-15',
      used: false
    }
  ];

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

  const handleSubmitCode = () => {
    if (!giftCode.trim()) {
      addNotification('Vui lòng nhập mã quà tặng!', 'warning');
      return;
    }

    const code = availableGiftCodes.find(c => c.code === giftCode.toUpperCase());
    
    if (!code) {
      addNotification('Mã quà tặng không hợp lệ!', 'warning');
      return;
    }

    if (usedCodes.includes(code.code)) {
      addNotification('Mã quà tặng đã được sử dụng!', 'warning');
      return;
    }

    // Check expiry
    const now = new Date();
    const expiry = new Date(code.expiry);
    if (now > expiry) {
      addNotification('Mã quà tặng đã hết hạn!', 'warning');
      return;
    }

    setUsedCodes([...usedCodes, code.code]);
    
    code.rewards.forEach(reward => {
      if (reward.includes('Bạc')) {
        const amount = parseInt(reward.replace(/\D/g, ''));
        claimReward('silver', amount);
      } else if (reward.includes('Kim Nguyên Bảo')) {
        const amount = parseInt(reward.replace(/\D/g, ''));
        claimReward('goldIngots', amount);
      } else if (reward.includes('Linh Thạch')) {
        const amount = parseInt(reward.replace(/\D/g, ''));
        claimReward('rechargeSpiritStones', amount);
      }
    });

    addNotification(`Đã nhận quà từ mã: ${code.code}!`, 'success');
    setGiftCode('');
  };

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="daily" className="text-xs">Hàng Ngày</TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs">Hàng Tuần</TabsTrigger>
            <TabsTrigger value="vip" className="text-xs">VIP</TabsTrigger>
            <TabsTrigger value="level" className="text-xs">Cấp Độ</TabsTrigger>
            <TabsTrigger value="giftcode" className="text-xs">Code Quà</TabsTrigger>
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

          {/* Gift Code Tab */}
          <TabsContent value="giftcode" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Nhập Mã Quà Tặng</h3>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Nhập mã code tại đây..."
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSubmitCode} className="bg-spirit-jade hover:bg-spirit-jade/80">
                  Nhận Quà
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                * Mỗi mã chỉ có thể sử dụng 1 lần duy nhất
              </p>
            </Card>

            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Danh Sách Mã Quà Tặng</h3>
              <div className="space-y-3">
                {availableGiftCodes.map((code, index) => (
                  <Card key={index} className={`p-4 ${usedCodes.includes(code.code) ? 'bg-muted/30 opacity-60' : 'bg-muted/20'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{code.code}</h4>
                          {usedCodes.includes(code.code) ? (
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              <Check className="w-3 h-3 mr-1" />
                              Đã sử dụng
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                              Có thể sử dụng
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{code.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {code.rewards.map((reward, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                              {reward}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Hết hạn: {code.expiry}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
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
