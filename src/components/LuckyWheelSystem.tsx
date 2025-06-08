
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGameState } from '@/hooks/useGameState';
import { 
  RotateCcw, 
  Star, 
  Gift, 
  Trophy,
  Gem,
  Crown,
  Zap,
  Shield
} from 'lucide-react';

const LuckyWheelSystem = () => {
  const { gameState, addNotification, claimReward } = useGameState();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [guaranteedProgress, setGuaranteedProgress] = useState(7);
  const [selectedWheel, setSelectedWheel] = useState('normal');

  const wheelTypes = [
    {
      id: 'normal',
      name: 'Vòng Quay Thường',
      cost: { type: 'goldIngots', amount: 100 },
      guaranteed: 10,
      description: 'Cơ hội nhận trang bị hiếm và vật phẩm quý'
    },
    {
      id: 'premium',
      name: 'Vòng Quay Cao Cấp',
      cost: { type: 'rechargeSpiritStones', amount: 10 },
      guaranteed: 8,
      description: 'Tỷ lệ cao hơn cho trang bị Legendary và Pet hiếm'
    },
    {
      id: 'event',
      name: 'Vòng Quay Sự Kiện',
      cost: { type: 'goldIngots', amount: 200 },
      guaranteed: 6,
      description: 'Độc quyền sự kiện - Skin và danh hiệu giới hạn'
    }
  ];

  const wheelRewards = {
    normal: [
      { name: 'Trang bị Epic', probability: 15, rarity: 'epic', icon: Shield },
      { name: '500 Kim Nguyên Bảo', probability: 20, rarity: 'rare', icon: Gem },
      { name: '5000 Bạc', probability: 25, rarity: 'common', icon: Gift },
      { name: 'Đá cường hóa x10', probability: 20, rarity: 'rare', icon: Star },
      { name: 'Pet Rare', probability: 10, rarity: 'epic', icon: Crown },
      { name: 'Skin thường', probability: 8, rarity: 'rare', icon: Zap },
      { name: 'Trang bị Legendary', probability: 2, rarity: 'legendary', icon: Trophy }
    ],
    premium: [
      { name: 'Trang bị Legendary', probability: 25, rarity: 'legendary', icon: Trophy },
      { name: 'Pet Legendary', probability: 15, rarity: 'legendary', icon: Crown },
      { name: '2000 Kim Nguyên Bảo', probability: 20, rarity: 'epic', icon: Gem },
      { name: 'Skin Epic', probability: 15, rarity: 'epic', icon: Zap },
      { name: 'Đá cường hóa x50', probability: 15, rarity: 'epic', icon: Star },
      { name: 'Danh hiệu Rare', probability: 8, rarity: 'rare', icon: Shield },
      { name: 'Trang bị Mythic', probability: 2, rarity: 'mythic', icon: Trophy }
    ],
    event: [
      { name: 'Skin Halloween 2024', probability: 20, rarity: 'legendary', icon: Zap },
      { name: 'Pet Ma Quái', probability: 15, rarity: 'legendary', icon: Crown },
      { name: 'Danh hiệu "Ma Vương"', probability: 12, rarity: 'legendary', icon: Shield },
      { name: '5000 Kim Nguyên Bảo', probability: 25, rarity: 'epic', icon: Gem },
      { name: 'Trang bị Halloween', probability: 20, rarity: 'epic', icon: Trophy },
      { name: 'Khung Avatar Ma Quái', probability: 6, rarity: 'mythic', icon: Star },
      { name: 'Combo Ma Vương', probability: 2, rarity: 'mythic', icon: Crown }
    ]
  };

  const spinHistory = [
    { reward: 'Trang bị Epic', time: '2 phút trước', player: 'Bạn' },
    { reward: 'Pet Legendary', time: '5 phút trước', player: 'Kiếm Thần' },
    { reward: 'Skin Epic', time: '8 phút trước', player: 'Hỏa Vương' },
    { reward: 'Trang bị Legendary', time: '12 phút trước', player: 'Băng Nữ' },
    { reward: 'Danh hiệu Rare', time: '15 phút trước', player: 'Lôi Đế' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      case 'mythic': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getCurrentWheel = () => wheelTypes.find(w => w.id === selectedWheel);
  const getCurrentRewards = () => wheelRewards[selectedWheel as keyof typeof wheelRewards];

  const handleSpin = () => {
    const wheel = getCurrentWheel();
    if (!wheel) return;

    // Check if player has enough currency
    const playerCurrency = gameState.player[wheel.cost.type as keyof typeof gameState.player] as number;
    if (playerCurrency < wheel.cost.amount) {
      addNotification('Không đủ tiền để quay!', 'warning');
      return;
    }

    setIsSpinning(true);
    
    // Simulate spinning animation
    setTimeout(() => {
      const rewards = getCurrentRewards();
      const random = Math.random() * 100;
      let accumulated = 0;
      let selectedReward = rewards[0];

      for (const reward of rewards) {
        accumulated += reward.probability;
        if (random <= accumulated) {
          selectedReward = reward;
          break;
        }
      }

      // Guaranteed system
      const newProgress = guaranteedProgress + 1;
      if (newProgress >= wheel.guaranteed) {
        // Force a rare reward
        const rareRewards = rewards.filter(r => r.rarity === 'legendary' || r.rarity === 'mythic');
        selectedReward = rareRewards[Math.floor(Math.random() * rareRewards.length)];
        setGuaranteedProgress(0);
        addNotification(`🎉 Bảo hiểm đã kích hoạt! Nhận được ${selectedReward.name}!`, 'success');
      } else {
        setGuaranteedProgress(newProgress);
        addNotification(`Chúc mừng! Bạn đã nhận được ${selectedReward.name}!`, 'success');
      }

      setSpinCount(spinCount + 1);
      setIsSpinning(false);
    }, 3000);
  };

  const handleMultiSpin = (times: number) => {
    addNotification(`Đã quay ${times} lần! Kiểm tra kết quả.`, 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-mystical-purple/10 border-cultivator-gold/30">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <RotateCcw className="w-5 h-5" />
          Vòng Quay May Mắn
        </h2>
        
        {/* Wheel Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {wheelTypes.map((wheel) => (
            <Card 
              key={wheel.id} 
              className={`p-3 cursor-pointer transition-all ${selectedWheel === wheel.id ? 'border-cultivator-gold bg-cultivator-gold/10' : 'bg-muted/20'}`}
              onClick={() => setSelectedWheel(wheel.id)}
            >
              <h3 className="font-medium mb-1">{wheel.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{wheel.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {wheel.cost.amount} {wheel.cost.type === 'goldIngots' ? 'KNYB' : 'LT'}
                </span>
                <Badge variant="outline" className="text-xs">
                  Bảo hiểm {wheel.guaranteed}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Guaranteed Progress */}
        <Card className="p-3 mb-4 bg-muted/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Bảo Hiểm Tích Lũy</span>
            <span className="text-sm text-cultivator-gold">
              {guaranteedProgress}/{getCurrentWheel()?.guaranteed}
            </span>
          </div>
          <Progress 
            value={(guaranteedProgress / (getCurrentWheel()?.guaranteed || 10)) * 100} 
            className="h-2 mb-2" 
          />
          <p className="text-xs text-muted-foreground">
            Quay {(getCurrentWheel()?.guaranteed || 10) - guaranteedProgress} lần nữa để đảm bảo nhận phần thưởng hiếm!
          </p>
        </Card>
      </Card>

      {/* Spinning Wheel */}
      <Card className="p-6">
        <div className="text-center mb-6">
          <div className={`w-32 h-32 mx-auto rounded-full border-4 border-cultivator-gold flex items-center justify-center ${isSpinning ? 'animate-spin' : ''}`}>
            <RotateCcw className={`w-16 h-16 text-cultivator-gold ${isSpinning ? 'animate-pulse' : ''}`} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {isSpinning ? 'Đang quay...' : 'Nhấn nút để quay!'}
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <Button 
            onClick={handleSpin} 
            disabled={isSpinning}
            className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
          >
            Quay 1 lần
          </Button>
          <Button 
            onClick={() => handleMultiSpin(10)} 
            disabled={isSpinning}
            variant="outline"
            className="border-cultivator-gold text-cultivator-gold"
          >
            Quay 10 lần
          </Button>
        </div>

        {/* Rewards Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {getCurrentRewards().map((reward, index) => {
            const RewardIcon = reward.icon;
            return (
              <Card key={index} className={`p-3 text-center border ${getRarityColor(reward.rarity)}`}>
                <div className="w-8 h-8 mx-auto mb-2 rounded bg-muted/20 flex items-center justify-center">
                  <RewardIcon className="w-4 h-4" />
                </div>
                <div className="text-xs font-medium mb-1">{reward.name}</div>
                <Badge variant="outline" className={`text-xs ${getRarityColor(reward.rarity)}`}>
                  {reward.probability}%
                </Badge>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Spin History */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-spirit-jade">Lịch Sử Quay Gần Đây</h3>
        <div className="space-y-2">
          {spinHistory.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-spirit-jade" />
                <span className="text-sm">{record.player}</span>
                <span className="text-sm text-muted-foreground">nhận được</span>
                <span className="text-sm font-medium text-cultivator-gold">{record.reward}</span>
              </div>
              <span className="text-xs text-muted-foreground">{record.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LuckyWheelSystem;
