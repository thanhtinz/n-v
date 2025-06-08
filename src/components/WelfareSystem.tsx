
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Calendar, Star, Zap, Users, Trophy } from 'lucide-react';

const WelfareSystem = () => {
  const [loginDays, setLoginDays] = useState(3);
  const [dailyRewards, setDailyRewards] = useState([
    { day: 1, reward: '50 Vàng', claimed: true, type: 'gold' },
    { day: 2, reward: '100 EXP', claimed: true, type: 'exp' },
    { day: 3, reward: '10 Linh Thạch', claimed: true, type: 'spirit' },
    { day: 4, reward: '1 Trang Bị', claimed: false, type: 'equipment' },
    { day: 5, reward: '200 Vàng', claimed: false, type: 'gold' },
    { day: 6, reward: '1 Đan Dược', claimed: false, type: 'pill' },
    { day: 7, reward: '500 Kim Cương', claimed: false, type: 'diamond' }
  ]);

  const [codeRedemption, setCodeRedemption] = useState('');
  const [levelRewards, setLevelRewards] = useState([
    { level: 5, reward: 'Kiếm Thép', claimed: false },
    { level: 10, reward: 'Áo Giáp Đồng', claimed: false },
    { level: 15, reward: '1000 Vàng', claimed: false },
    { level: 20, reward: 'Thú Cưng Cơ Bản', claimed: false }
  ]);

  const claimDailyReward = (day: number) => {
    if (day <= loginDays) {
      setDailyRewards(prev => prev.map(reward => 
        reward.day === day ? { ...reward, claimed: true } : reward
      ));
    }
  };

  const claimLevelReward = (level: number) => {
    setLevelRewards(prev => prev.map(reward => 
      reward.level === level ? { ...reward, claimed: true } : reward
    ));
  };

  const redeemCode = () => {
    if (codeRedemption.trim()) {
      // Simulate code redemption
      alert(`Đã sử dụng code: ${codeRedemption}`);
      setCodeRedemption('');
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'gold': return '💰';
      case 'exp': return '⭐';
      case 'spirit': return '💎';
      case 'equipment': return '⚔️';
      case 'pill': return '🧪';
      case 'diamond': return '💠';
      default: return '🎁';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-spirit-jade/10 to-mystical-purple/10 border-spirit-jade/30">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="w-5 h-5 text-spirit-jade" />
          <h3 className="font-semibold text-spirit-jade">Hệ Thống Phúc Lợi</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Nhận các phần thưởng miễn phí và ưu đãi đặc biệt.
        </p>
      </Card>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Điểm Danh</TabsTrigger>
          <TabsTrigger value="level">Mốc Cấp</TabsTrigger>
          <TabsTrigger value="code">Code Quà</TabsTrigger>
          <TabsTrigger value="events">Sự Kiện</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Điểm Danh 7 Ngày</h4>
              <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                Ngày {loginDays}/7
              </Badge>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {dailyRewards.map(reward => {
                const canClaim = reward.day <= loginDays && !reward.claimed;
                const isAvailable = reward.day <= loginDays;
                
                return (
                  <div 
                    key={reward.day}
                    className={`p-3 rounded-lg border text-center ${
                      reward.claimed ? 'bg-spirit-jade/20 border-spirit-jade/50' :
                      canClaim ? 'bg-cultivator-gold/20 border-cultivator-gold/50' :
                      'bg-muted/20 border-border/30'
                    }`}
                  >
                    <div className="text-lg mb-1">{getRewardIcon(reward.type)}</div>
                    <div className="text-xs font-medium mb-1">Ngày {reward.day}</div>
                    <div className="text-xs text-muted-foreground mb-2">{reward.reward}</div>
                    <Button 
                      size="sm" 
                      className="w-full text-xs h-6"
                      disabled={!canClaim}
                      onClick={() => claimDailyReward(reward.day)}
                    >
                      {reward.claimed ? 'Đã Nhận' : canClaim ? 'Nhận' : 'Khóa'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="level" className="space-y-3">
          {levelRewards.map(reward => (
            <Card key={reward.level} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-mystical-purple/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-mystical-purple" />
                  </div>
                  <div>
                    <div className="font-medium">Đạt Cấp {reward.level}</div>
                    <div className="text-sm text-muted-foreground">{reward.reward}</div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  disabled={reward.claimed}
                  onClick={() => claimLevelReward(reward.level)}
                >
                  {reward.claimed ? 'Đã Nhận' : 'Nhận Thưởng'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Nhập Code Quà Tặng</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập code quà tặng..."
                value={codeRedemption}
                onChange={(e) => setCodeRedemption(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-background"
              />
              <Button onClick={redeemCode}>Sử Dụng</Button>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium mb-3">Code Hiện Có</h4>
            <div className="space-y-2">
              <div className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">TUTIEN2024</div>
                    <div className="text-xs text-muted-foreground">500 Kim cương + 1000 EXP</div>
                  </div>
                  <Badge variant="outline" className="text-xs">Còn hạn</Badge>
                </div>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">NEWPLAYER</div>
                    <div className="text-xs text-muted-foreground">Trang bị khởi đầu + 2000 Vàng</div>
                  </div>
                  <Badge variant="outline" className="text-xs">Còn hạn</Badge>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-3">
          <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-blood-red/10 border-cultivator-gold/30">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-cultivator-gold" />
              <h4 className="font-medium text-cultivator-gold">Sự Kiện Đặc Biệt</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Sự kiện Tết Nguyên Đán - Nhận quà khủng
            </p>
            <Button size="sm" className="w-full">Tham Gia Ngay</Button>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-mystical-purple" />
              <h4 className="font-medium">Mời Bạn Bè</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Mời bạn bè chơi game nhận thưởng lớn
            </p>
            <Button size="sm" variant="outline" className="w-full">Chia Sẻ</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WelfareSystem;
