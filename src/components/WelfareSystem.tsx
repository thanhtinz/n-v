import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { Gift, Calendar, Star, Zap, Users, Trophy, Sparkles } from 'lucide-react';

const WelfareSystem = () => {
  const { gameState, claimReward, addNotification } = useGameState();
  const [codeRedemption, setCodeRedemption] = useState('');
  
  const [dailyRewards, setDailyRewards] = useState([
    { day: 1, reward: '50 Vàng', claimed: true, type: 'gold', amount: 50 },
    { day: 2, reward: '100 EXP', claimed: true, type: 'exp', amount: 100 },
    { day: 3, reward: '10 Linh Thạch', claimed: true, type: 'spiritStones', amount: 10 },
    { day: 4, reward: '1 Trang Bị', claimed: false, type: 'equipment', amount: 1 },
    { day: 5, reward: '200 Vàng', claimed: false, type: 'gold', amount: 200 },
    { day: 6, reward: '5 Linh Thạch Nạp', claimed: false, type: 'rechargeSpiritStones', amount: 5 },
    { day: 7, reward: '500 Kim Cương', claimed: false, type: 'diamonds', amount: 500 }
  ]);

  const [levelRewards, setLevelRewards] = useState([
    { level: 5, reward: 'Kiếm Thép + 50 Linh Thạch', claimed: false, type: 'equipment' },
    { level: 10, reward: 'Áo Giáp Đồng + 10 Linh Thạch Nạp', claimed: false, type: 'equipment' },
    { level: 15, reward: '1000 Vàng + 100 Linh Thạch', claimed: false, type: 'gold', amount: 1000 },
    { level: 20, reward: 'Thú Cưng + 20 Linh Thạch Nạp', claimed: false, type: 'pet' }
  ]);

  useEffect(() => {
    setDailyRewards(prev => prev.map(reward => ({
      ...reward,
      claimed: reward.day <= gameState.dailyActivities.loginDays ? reward.claimed : false
    })));
  }, [gameState.dailyActivities.loginDays]);

  useEffect(() => {
    setLevelRewards(prev => prev.map(reward => ({
      ...reward,
      claimed: gameState.player.level >= reward.level ? reward.claimed : false
    })));
  }, [gameState.player.level]);

  const claimDailyReward = (day: number) => {
    const reward = dailyRewards.find(r => r.day === day);
    if (day <= gameState.dailyActivities.loginDays && reward && !reward.claimed) {
      setDailyRewards(prev => prev.map(r => 
        r.day === day ? { ...r, claimed: true } : r
      ));
      
      if (reward.type === 'gold' || reward.type === 'exp' || reward.type === 'diamonds' || reward.type === 'spiritStones' || reward.type === 'rechargeSpiritStones') {
        claimReward(reward.type, reward.amount);
      } else {
        addNotification(`Nhận được ${reward.reward}`, 'success');
      }
    }
  };

  const claimLevelReward = (level: number) => {
    const reward = levelRewards.find(r => r.level === level);
    if (gameState.player.level >= level && reward && !reward.claimed) {
      setLevelRewards(prev => prev.map(r => 
        r.level === level ? { ...r, claimed: true } : r
      ));
      
      // Claim bonus spirit stones along with equipment
      if (level === 5) {
        claimReward('spiritStones', 50);
      } else if (level === 10) {
        claimReward('rechargeSpiritStones', 10);
      } else if (level === 15 && reward.amount) {
        claimReward('gold', reward.amount);
        claimReward('spiritStones', 100);
      } else if (level === 20) {
        claimReward('rechargeSpiritStones', 20);
      }
      
      addNotification(`Nhận được ${reward.reward}`, 'success');
    }
  };

  const redeemCode = () => {
    if (codeRedemption.trim()) {
      const validCodes: { [key: string]: { gold?: number; diamonds?: number; exp?: number; spiritStones?: number; rechargeSpiritStones?: number } } = {
        'TUTIEN2024': { diamonds: 500, exp: 1000, rechargeSpiritStones: 20 },
        'NEWPLAYER': { gold: 2000, spiritStones: 50, rechargeSpiritStones: 10 }
      };
      
      const rewards = validCodes[codeRedemption.toUpperCase()];
      if (rewards) {
        Object.entries(rewards).forEach(([type, amount]) => {
          claimReward(type, amount);
        });
        addNotification(`Code ${codeRedemption} đã được sử dụng thành công!`, 'success');
      } else {
        addNotification('Code không hợp lệ hoặc đã hết hạn', 'warning');
      }
      setCodeRedemption('');
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'gold': return '💰';
      case 'exp': return '⭐';
      case 'spiritStones': return '💎';
      case 'rechargeSpiritStones': return '✨';
      case 'equipment': return '⚔️';
      case 'pill': return '🧪';
      case 'diamonds': return '💠';
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
        <div className="mt-2 flex items-center gap-4 text-xs">
          <span className="text-cultivator-gold">
            Đăng nhập: {gameState.dailyActivities.loginDays}/7 ngày
          </span>
          <span className="text-spirit-jade">
            VIP{gameState.player.vipLevel}: Nhận thêm phần thưởng
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-spirit-jade" />
            <span>Linh Thạch Thường: {gameState.player.spiritStones}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-mystical-purple" />
            <span>Linh Thạch Nạp: {gameState.player.rechargeSpiritStones}</span>
          </div>
        </div>
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
                Ngày {gameState.dailyActivities.loginDays}/7
              </Badge>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {dailyRewards.map(reward => {
                const canClaim = reward.day <= gameState.dailyActivities.loginDays && !reward.claimed;
                const isAvailable = reward.day <= gameState.dailyActivities.loginDays;
                
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
          {levelRewards.map(reward => {
            const canClaim = gameState.player.level >= reward.level && !reward.claimed;
            
            return (
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
                  <div className="text-right">
                    {gameState.player.level < reward.level && (
                      <div className="text-xs text-muted-foreground mb-1">
                        Còn {reward.level - gameState.player.level} cấp
                      </div>
                    )}
                    <Button 
                      size="sm"
                      disabled={!canClaim}
                      onClick={() => claimLevelReward(reward.level)}
                    >
                      {reward.claimed ? 'Đã Nhận' : canClaim ? 'Nhận Thưởng' : 'Chưa Đạt'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
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
                    <div className="text-xs text-muted-foreground">500 Kim cương + 1000 EXP + 20 Linh Thạch Nạp</div>
                  </div>
                  <Badge variant="outline" className="text-xs">Còn hạn</Badge>
                </div>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">NEWPLAYER</div>
                    <div className="text-xs text-muted-foreground">2000 Vàng + 50 Linh Thạch + 10 Linh Thạch Nạp</div>
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
