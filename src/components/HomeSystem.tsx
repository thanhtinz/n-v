import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  Home, 
  Hammer, 
  Sparkles, 
  Coins, 
  Clock, 
  Star,
  TreePine,
  Heart,
  Zap,
  Gift,
  ArrowUp
} from 'lucide-react';

const HomeSystem = () => {
  const { gameState, addNotification, claimReward } = useGameState();
  const [activeRoom, setActiveRoom] = useState('living');
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [isPlanting, setIsPlanting] = useState(false);

  const roomData = {
    living: {
      name: 'Phòng Khách',
      level: 3,
      comfort: 85,
      maxComfort: 100,
      furniture: [
        { name: 'Sofa Cao Cấp', comfort: 25, price: 50000 },
        { name: 'Bàn Trà Gỗ', comfort: 15, price: 30000 },
        { name: 'Tivi 4K', comfort: 30, price: 80000 }
      ]
    },
    bedroom: {
      name: 'Phòng Ngủ',
      level: 2,
      comfort: 70,
      maxComfort: 100,
      furniture: [
        { name: 'Giường Đôi', comfort: 40, price: 70000 },
        { name: 'Tủ Quần Áo', comfort: 20, price: 45000 }
      ]
    },
    kitchen: {
      name: 'Nhà Bếp',
      level: 1,
      comfort: 45,
      maxComfort: 100,
      furniture: [
        { name: 'Bếp Gas Cao Cấp', comfort: 35, price: 60000 },
        { name: 'Tủ Lạnh', comfort: 25, price: 55000 }
      ]
    }
  };

  const cropData = {
    carrot: { name: 'Cà Rốt', growTime: 30, sellPrice: 50, buyPrice: 10 },
    tomato: { name: 'Cà Chua', growTime: 60, sellPrice: 100, buyPrice: 20 },
    corn: { name: 'Ngô', growTime: 120, sellPrice: 200, buyPrice: 50 },
    wheat: { name: 'Lúa Mì', growTime: 180, sellPrice: 300, buyPrice: 80 }
  };

  const farmPlots = [
    { id: 1, crop: 'carrot', planted: Date.now() - 25000, status: 'growing' },
    { id: 2, crop: 'tomato', planted: Date.now() - 55000, status: 'ready' },
    { id: 3, crop: null, planted: null, status: 'empty' },
    { id: 4, crop: 'corn', planted: Date.now() - 100000, status: 'growing' },
    { id: 5, crop: null, planted: null, status: 'empty' },
    { id: 6, crop: 'wheat', planted: Date.now() - 150000, status: 'growing' }
  ];

  // Boss Nông Trại Vợ Chồng data
  const [butterflyBoss, setButterflyBoss] = useState({
    level: 1,
    hunger: 75,
    maxHunger: 100,
    isReady: false,
    lastFed: Date.now() - 45000,
    eggState: 'hatched', // 'egg', 'hatched', 'ready'
    lovePoints: 125
  });

  const [sacredTree, setSacredTree] = useState({
    level: 5,
    exp: 180,
    maxExp: 250,
    canSummon: true
  });

  const handlePlantCrop = (plotId: number, cropType: string) => {
    if (gameState.player.silver < cropData[cropType].buyPrice) {
      addNotification('Không đủ bạc để mua hạt giống!', 'warning');
      return;
    }

    setIsPlanting(true);
    setTimeout(() => {
      addNotification(`Đã gieo ${cropData[cropType].name} thành công!`, 'success');
      setIsPlanting(false);
      setSelectedCrop(null);
    }, 1000);
  };

  const handleHarvestCrop = (plotId: number, cropType: string) => {
    const reward = cropData[cropType].sellPrice;
    claimReward('silver', reward);
    addNotification(`Thu hoạch ${cropData[cropType].name} và nhận được ${reward} bạc!`, 'success');
  };

  const handleFeedButterfly = () => {
    const now = Date.now();
    const timeSinceLastFed = now - butterflyBoss.lastFed;
    
    if (timeSinceLastFed < 60000) { // 1 minute cooldown
      addNotification('Phải chờ 60 phút mới có thể cho ăn tiếp!', 'warning');
      return;
    }

    setButterflyBoss(prev => ({
      ...prev,
      hunger: Math.min(prev.hunger + 25, prev.maxHunger),
      lastFed: now,
      lovePoints: prev.lovePoints + 2
    }));

    addNotification('Đã cho Bướm Ma ăn! +2 Điểm Yêu Thương', 'success');
  };

  const handleFightButterflyBoss = () => {
    if (butterflyBoss.hunger < 80) {
      addNotification('Bướm Ma chưa đủ no để chiến đấu!', 'warning');
      return;
    }

    // Simulate boss fight
    const rewards = ['50 Bạc', '10 Kim Nguyên Bảo', 'Túi Quà Bướm Ma'];
    rewards.forEach(reward => {
      if (reward.includes('Bạc')) {
        claimReward('silver', 50);
      } else if (reward.includes('Kim Nguyên Bảo')) {
        claimReward('goldIngots', 10);
      }
    });

    setButterflyBoss(prev => ({
      ...prev,
      hunger: 0,
      isReady: false
    }));

    addNotification('Đánh thắng Bướm Ma! Nhận được nhiều phần thưởng!', 'success');
  };

  const handleSummonEgg = () => {
    if (!sacredTree.canSummon) {
      addNotification('Cây Thần chưa thể triệu hồi trứng mới!', 'warning');
      return;
    }

    setButterflyBoss(prev => ({
      ...prev,
      eggState: 'egg',
      hunger: 0
    }));

    setSacredTree(prev => ({
      ...prev,
      canSummon: false
    }));

    addNotification('Đã triệu hồi Trứng Bướm Ma từ Cây Thần!', 'success');
  };

  const handleWaterTree = () => {
    if (butterflyBoss.lovePoints < 1) {
      addNotification('Không đủ Điểm Yêu Thương để tưới cây!', 'warning');
      return;
    }

    setSacredTree(prev => {
      const newExp = prev.exp + 1;
      let newLevel = prev.level;
      let newMaxExp = prev.maxExp;

      if (newExp >= prev.maxExp) {
        newLevel += 1;
        newMaxExp = Math.floor(prev.maxExp * 1.5);
        addNotification(`Cây Thần lên cấp ${newLevel}!`, 'success');
      }

      return {
        ...prev,
        exp: newExp >= prev.maxExp ? newExp - prev.maxExp : newExp,
        level: newLevel,
        maxExp: newMaxExp
      };
    });

    setButterflyBoss(prev => ({
      ...prev,
      lovePoints: prev.lovePoints - 1
    }));
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
        <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
          <Home className="w-5 h-5" />
          Hệ Thống Động Phủ & Nông Trại
        </h2>

        <Tabs defaultValue="cave" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cave">Động Phủ</TabsTrigger>
            <TabsTrigger value="farm">Nông Trại</TabsTrigger>
            <TabsTrigger value="butterfly">Boss Vợ Chồng</TabsTrigger>
          </TabsList>

          <TabsContent value="cave" className="space-y-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(roomData).map(([key, room]) => (
                <Button
                  key={key}
                  variant={activeRoom === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveRoom(key)}
                  className="text-xs"
                >
                  {room.name}
                </Button>
              ))}
            </div>

            <Card className="p-4 bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{roomData[activeRoom].name}</h3>
                <Badge variant="outline">Cấp {roomData[activeRoom].level}</Badge>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Độ Thoải Mái</span>
                  <span>{roomData[activeRoom].comfort}/{roomData[activeRoom].maxComfort}</span>
                </div>
                <Progress value={(roomData[activeRoom].comfort / roomData[activeRoom].maxComfort) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Nội Thất:</h4>
                {roomData[activeRoom].furniture.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-card rounded text-xs">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">+{item.comfort}</span>
                      <Button size="sm" variant="outline" className="h-6 px-2">
                        Nâng Cấp
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="farm" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TreePine className="w-4 h-4" />
                Nông Trại Pet
              </h3>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {farmPlots.map((plot) => (
                  <Card key={plot.id} className="p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Ô {plot.id}</div>
                    {plot.crop ? (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">{cropData[plot.crop].name}</div>
                        {plot.status === 'ready' ? (
                          <Button 
                            size="sm" 
                            onClick={() => handleHarvestCrop(plot.id, plot.crop)}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            Thu Hoạch
                          </Button>
                        ) : (
                          <div>
                            <Progress value={75} className="h-1 mb-1" />
                            <div className="text-xs text-muted-foreground">Đang lớn...</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Trống</div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedCrop(selectedCrop === `plot-${plot.id}` ? null : `plot-${plot.id}`)}
                          className="w-full"
                        >
                          Trồng
                        </Button>
                        {selectedCrop === `plot-${plot.id}` && (
                          <div className="grid grid-cols-2 gap-1 mt-2">
                            {Object.entries(cropData).map(([key, crop]) => (
                              <Button
                                key={key}
                                size="sm"
                                variant="outline"
                                onClick={() => handlePlantCrop(plot.id, key)}
                                disabled={isPlanting}
                                className="text-xs p-1"
                              >
                                {crop.name}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="text-xs text-muted-foreground">
                * Thu hoạch thức ăn để nuôi Pet. Pet càng no càng mạnh!
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="butterfly" className="space-y-4">
            <Card className="p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-green-600" />
                Cây Thần
              </h3>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Cấp {sacredTree.level}</span>
                <Button 
                  size="sm" 
                  onClick={handleSummonEgg}
                  disabled={!sacredTree.canSummon}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Triệu Hồi Trứng
                </Button>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Kinh nghiệm</span>
                  <span>{sacredTree.exp}/{sacredTree.maxExp}</span>
                </div>
                <Progress value={(sacredTree.exp / sacredTree.maxExp) * 100} className="h-2" />
              </div>

              <Button 
                size="sm" 
                onClick={handleWaterTree}
                disabled={butterflyBoss.lovePoints < 1}
                className="w-full"
              >
                Tưới Cây (-1 Điểm Yêu Thương)
              </Button>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                Bướm Ma Cấp {butterflyBoss.level}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Độ No</span>
                    <span>{butterflyBoss.hunger}/{butterflyBoss.maxHunger}</span>
                  </div>
                  <Progress value={butterflyBoss.hunger} className="h-2" />
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Điểm Yêu Thương</div>
                  <div className="text-lg font-bold text-pink-500">{butterflyBoss.lovePoints}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm" 
                  onClick={handleFeedButterfly}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  Cho Ăn
                </Button>
                
                <Button 
                  size="sm" 
                  onClick={handleFightButterflyBoss}
                  disabled={butterflyBoss.hunger < 80}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Đánh Boss
                </Button>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                * Cần vợ/chồng cùng online để đánh boss. Cho ăn mỗi 60 phút.
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default HomeSystem;
