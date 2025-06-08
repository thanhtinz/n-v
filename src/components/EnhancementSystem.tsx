import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useGameState } from '@/hooks/useGameState';
import { 
  Hammer, 
  Zap, 
  Star,
  Plus,
  Sparkles,
  Target,
  Shield,
  Sword,
  ArrowUp,
  TrendingUp
} from 'lucide-react';

interface EnhancementStone {
  id: string;
  name: string;
  type: 'enhancement' | 'synthesis' | 'upgrade';
  grade: number;
  expValue: number;
  successRate: number;
  description: string;
  quantity: number;
  imageUrl: string;
  upgradeLevel?: number; // Cho đá tăng cấp: 1, 2, 3 hoặc 0 (tím - dùng chung)
}

interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  quality: string;
  enhancementLevel: number;
  enhancementExp: number;
  maxEnhancementExp: number;
  synthesisLevel: number;
  synthesisPoints: number;
  upgradeLevel: number; // Cấp tăng cấp: 0, 1, 2, 3
  luckPoints: number; // Điểm may mắn
  stats: {
    attack?: number;
    defense?: number;
    luck?: number;
    agility?: number;
  };
  originalImageUrl?: string; // Hình ảnh gốc
  upgradedImageUrl?: string; // Hình ảnh sau khi tăng cấp
}

const EnhancementSystem = () => {
  const { gameState, addNotification, claimReward } = useGameState();
  const [activeTab, setActiveTab] = useState('enhancement');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [selectedStone, setSelectedStone] = useState<EnhancementStone | null>(null);
  const [selectedLuckCharm, setSelectedLuckCharm] = useState<boolean>(false);

  // Sample equipment items
  const [equipmentItems] = useState<EquipmentItem[]>([
    {
      id: 'eq1',
      name: 'Kiếm Sắt',
      type: 'weapon',
      quality: 'common',
      enhancementLevel: 12,
      enhancementExp: 0,
      maxEnhancementExp: 100,
      synthesisLevel: 0,
      synthesisPoints: 0,
      upgradeLevel: 0,
      luckPoints: 25,
      stats: { attack: 50, agility: -2 },
      originalImageUrl: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop',
      upgradedImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=64&h=64&fit=crop'
    },
    {
      id: 'eq2',
      name: 'Áo Vải Thô',
      type: 'armor',
      quality: 'common',
      enhancementLevel: 8,
      enhancementExp: 0,
      maxEnhancementExp: 100,
      synthesisLevel: 0,
      synthesisPoints: 0,
      upgradeLevel: 0,
      luckPoints: 0,
      stats: { defense: 25, agility: -1 }
    },
    {
      id: 'eq3',
      name: 'Ná Thần',
      type: 'weapon',
      quality: 'legendary',
      enhancementLevel: 12,
      enhancementExp: 0,
      maxEnhancementExp: 100,
      synthesisLevel: 5,
      synthesisPoints: 150,
      upgradeLevel: 3,
      luckPoints: 0,
      stats: { attack: 180, luck: 25, agility: 15 },
      originalImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=64&h=64&fit=crop',
      upgradedImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop'
    }
  ]);

  // Enhancement stones bao gồm cả đá tăng cấp
  const [enhancementStones] = useState<EnhancementStone[]>([
    {
      id: 'stone1',
      name: 'Đá Cường Hóa Cấp 1',
      type: 'enhancement',
      grade: 1,
      expValue: 10,
      successRate: 100,
      description: 'Đá cường hóa cơ bản, 100% thành công',
      quantity: 50,
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop'
    },
    {
      id: 'stone2',
      name: 'Đá Cường Hóa Cấp 2',
      type: 'enhancement',
      grade: 2,
      expValue: 25,
      successRate: 90,
      description: 'Đá cường hóa nâng cao, 90% thành công',
      quantity: 20,
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop'
    },
    {
      id: 'stone3',
      name: 'Đá Hợp Thành Cấp 1',
      type: 'synthesis',
      grade: 1,
      expValue: 15,
      successRate: 80,
      description: 'Đá hợp thành cơ bản, tăng chỉ số trang bị',
      quantity: 15,
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop'
    },
    {
      id: 'stone4',
      name: 'Đá Hợp Thành Cấp 2',
      type: 'synthesis',
      grade: 2,
      expValue: 35,
      successRate: 60,
      description: 'Đá hợp thành cao cấp, tăng nhiều chỉ số',
      quantity: 8,
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop'
    },
    // Đá Tăng Cấp
    {
      id: 'upgrade1',
      name: 'Đá Tăng Cấp LV1',
      type: 'upgrade',
      grade: 1,
      expValue: 0,
      successRate: 30,
      description: 'Dùng cho trang bị tăng cấp 0→1',
      quantity: 12,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=64&h=64&fit=crop',
      upgradeLevel: 1
    },
    {
      id: 'upgrade2',
      name: 'Đá Tăng Cấp LV2',
      type: 'upgrade',
      grade: 2,
      expValue: 0,
      successRate: 20,
      description: 'Dùng cho trang bị tăng cấp 1→2',
      quantity: 8,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=64&h=64&fit=crop',
      upgradeLevel: 2
    },
    {
      id: 'upgrade3',
      name: 'Đá Tăng Cấp LV3',
      type: 'upgrade',
      grade: 3,
      expValue: 0,
      successRate: 15,
      description: 'Dùng cho trang bị tăng cấp 2→3',
      quantity: 5,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=64&h=64&fit=crop',
      upgradeLevel: 3
    },
    {
      id: 'upgrade_purple',
      name: 'Đá Tăng Cấp Tím',
      type: 'upgrade',
      grade: 4,
      expValue: 0,
      successRate: 25,
      description: 'Có thể sử dụng cho tất cả cấp độ tăng cấp',
      quantity: 3,
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
      upgradeLevel: 0 // 0 = dùng chung
    },
    {
      id: 'upgrade_fragment',
      name: 'Mảnh Đá Tăng Cấp',
      type: 'upgrade',
      grade: 0,
      expValue: 0,
      successRate: 0,
      description: 'Dùng 4 mảnh để tạo thành 1 Đá Tăng Cấp',
      quantity: 15,
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop'
    }
  ]);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getEnhancementColor = (level: number) => {
    if (level >= 10) return 'text-yellow-400';
    if (level >= 7) return 'text-purple-400';
    if (level >= 4) return 'text-blue-400';
    if (level >= 1) return 'text-green-400';
    return 'text-gray-400';
  };

  const getUpgradeColor = (level: number) => {
    switch (level) {
      case 0: return 'text-gray-400';
      case 1: return 'text-blue-400';
      case 2: return 'text-purple-400';
      case 3: return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const calculateEnhancementCost = (level: number) => {
    return Math.floor(10 * Math.pow(1.5, level));
  };

  const calculateUpgradeCost = (upgradeLevel: number) => {
    return Math.floor(50 * Math.pow(2, upgradeLevel));
  };

  const calculateSuccessRate = (equipment: EquipmentItem, stone: EnhancementStone) => {
    let baseRate = stone.successRate;
    
    if (stone.type === 'upgrade') {
      // Điểm may mắn tăng tỷ lệ thành công
      const luckBonus = Math.min(70, equipment.luckPoints * 0.5);
      baseRate += luckBonus;
    } else {
      // Logic cũ cho cường hóa và hợp thành
      if (equipment.enhancementLevel >= 7) {
        baseRate *= 0.5;
      } else if (equipment.enhancementLevel >= 4) {
        baseRate *= 0.7;
      }
    }

    // Bùa may mắn tăng 10% tỷ lệ thành công
    if (selectedLuckCharm) {
      baseRate = Math.min(100, baseRate + 10);
    }

    return Math.floor(baseRate);
  };

  const canUpgrade = (equipment: EquipmentItem, stone: EnhancementStone) => {
    if (stone.type !== 'upgrade') return false;
    if (equipment.enhancementLevel < 12) return false;
    if (equipment.upgradeLevel >= 3) return false;
    
    // Kiểm tra đá có phù hợp với cấp không
    if (stone.upgradeLevel === 0) return true; // Đá tím dùng chung
    return stone.upgradeLevel === equipment.upgradeLevel + 1;
  };

  const handleEnhancement = () => {
    if (!selectedEquipment || !selectedStone) {
      addNotification('Vui lòng chọn trang bị và đá cường hóa!', 'warning');
      return;
    }

    if (selectedStone.type !== 'enhancement') {
      addNotification('Vui lòng chọn đá cường hóa!', 'warning');
      return;
    }

    const cost = calculateEnhancementCost(selectedEquipment.enhancementLevel);
    if (gameState.player.spiritStones < cost) {
      addNotification(`Không đủ Linh Thạch! Cần ${cost} Linh Thạch.`, 'warning');
      return;
    }

    const successRate = calculateSuccessRate(selectedEquipment, selectedStone);
    const isSuccess = Math.random() * 100 < successRate;

    // Trừ Linh Thạch
    claimReward('spiritStones', -cost);

    if (isSuccess) {
      const newExp = selectedEquipment.enhancementExp + selectedStone.expValue;
      
      if (newExp >= selectedEquipment.maxEnhancementExp && selectedEquipment.enhancementLevel < 12) {
        // Level up
        const newLevel = selectedEquipment.enhancementLevel + 1;
        addNotification(`Cường hóa thành công! ${selectedEquipment.name} đạt cấp +${newLevel}`, 'success');
        
        // Tăng stats theo cấp
        const statBonus = Math.floor(newLevel * 1.2);
        addNotification(`Tăng ${statBonus} điểm sức mạnh!`, 'success');
      } else {
        addNotification(`Cường hóa thành công! Nhận ${selectedStone.expValue} EXP`, 'success');
      }
    } else {
      addNotification('Cường hóa thất bại! Thử lại lần sau.', 'warning');
    }
  };

  const handleSynthesis = () => {
    if (!selectedEquipment || !selectedStone) {
      addNotification('Vui lòng chọn trang bị và đá hợp thành!', 'warning');
      return;
    }

    if (selectedStone.type !== 'synthesis') {
      addNotification('Vui lòng chọn đá hợp thành!', 'warning');
      return;
    }

    const cost = calculateEnhancementCost(selectedEquipment.synthesisLevel) * 2;
    if (gameState.player.spiritStones < cost) {
      addNotification(`Không đủ Linh Thạch! Cần ${cost} Linh Thạch.`, 'warning');
      return;
    }

    const successRate = calculateSuccessRate(selectedEquipment, selectedStone);
    const isSuccess = Math.random() * 100 < successRate;

    // Trừ Linh Thạch
    claimReward('spiritStones', -cost);

    if (isSuccess) {
      const bonusPoints = selectedStone.expValue;
      addNotification(`Hợp thành thành công! Tăng ${bonusPoints} điểm chỉ số`, 'success');
    } else {
      addNotification('Hợp thành thất bại! Thử lại lần sau.', 'warning');
    }
  };

  const handleUpgrade = () => {
    if (!selectedEquipment || !selectedStone) {
      addNotification('Vui lòng chọn trang bị và đá tăng cấp!', 'warning');
      return;
    }

    if (!canUpgrade(selectedEquipment, selectedStone)) {
      addNotification('Không thể tăng cấp! Kiểm tra điều kiện.', 'warning');
      return;
    }

    const cost = calculateUpgradeCost(selectedEquipment.upgradeLevel);
    if (gameState.player.spiritStones < cost) {
      addNotification(`Không đủ Linh Thạch! Cần ${cost} Linh Thạch.`, 'warning');
      return;
    }

    const successRate = calculateSuccessRate(selectedEquipment, selectedStone);
    const isSuccess = Math.random() * 100 < successRate;

    // Trừ Linh Thạch
    claimReward('spiritStones', -cost);

    if (isSuccess) {
      const newUpgradeLevel = selectedEquipment.upgradeLevel + 1;
      addNotification(`Tăng cấp thành công! ${selectedEquipment.name} đạt cấp ${newUpgradeLevel}`, 'success');
      
      if (selectedEquipment.type === 'weapon' && newUpgradeLevel === 3) {
        addNotification('🎉 Vũ khí đã thay đổi hình dạng!', 'success');
      }
      
      // Reset điểm may mắn
      selectedEquipment.luckPoints = 0;
    } else {
      // Tăng điểm may mắn
      selectedEquipment.luckPoints += 50;
      addNotification(`Tăng cấp thất bại! Nhận 50 điểm may mắn (${selectedEquipment.luckPoints}/350)`, 'warning');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Hammer className="w-6 h-6 text-cultivator-gold" />
          <h2 className="text-xl font-semibold text-cultivator-gold">Tiệm Rèn</h2>
          <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
            Cường Hóa Trang Bị
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="enhancement" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Cường Hóa
            </TabsTrigger>
            <TabsTrigger value="synthesis" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Hợp Thành
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tăng Cấp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enhancement" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Equipment Selection */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chọn Trang Bị</h3>
                <div className="space-y-2">
                  {equipmentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedEquipment?.id === item.id
                          ? 'border-spirit-jade bg-spirit-jade/10'
                          : 'border-border/50 hover:border-border'
                      }`}
                      onClick={() => setSelectedEquipment(item)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="outline" className={getQualityColor(item.quality)}>
                          {item.quality}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-sm font-bold ${getEnhancementColor(item.enhancementLevel)}`}>
                          +{item.enhancementLevel}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          EXP: {item.enhancementExp}/{item.maxEnhancementExp}
                        </span>
                      </div>
                      <Progress 
                        value={(item.enhancementExp / item.maxEnhancementExp) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Stone Selection */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chọn Đá Cường Hóa</h3>
                <div className="space-y-2">
                  {enhancementStones
                    .filter(stone => stone.type === 'enhancement')
                    .map((stone) => (
                    <div
                      key={stone.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStone?.id === stone.id
                          ? 'border-spirit-jade bg-spirit-jade/10'
                          : 'border-border/50 hover:border-border'
                      }`}
                      onClick={() => setSelectedStone(stone)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <img 
                          src={stone.imageUrl} 
                          alt={stone.name}
                          className="w-6 h-6 rounded object-cover"
                        />
                        <span className="font-medium text-sm">{stone.name}</span>
                        <Badge variant="outline" className="text-xs">
                          x{stone.quantity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        EXP: +{stone.expValue} | Tỷ lệ: {stone.successRate}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Luck Charm */}
                <div className="mt-4 p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedLuckCharm}
                      onChange={(e) => setSelectedLuckCharm(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Bùa May Mắn (+10% tỷ lệ)</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Có: 5 | Chi phí: 1 Linh Thạch nạp
                  </div>
                </div>
              </Card>

              {/* Enhancement Result */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Kết Quả Cường Hóa</h3>
                {selectedEquipment && selectedStone ? (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-cultivator-gold">
                        {selectedEquipment.name}
                      </div>
                      <div className={`text-xl font-bold ${getEnhancementColor(selectedEquipment.enhancementLevel)}`}>
                        +{selectedEquipment.enhancementLevel} → +{selectedEquipment.enhancementLevel + (selectedEquipment.enhancementExp + selectedStone.expValue >= selectedEquipment.maxEnhancementExp ? 1 : 0)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tỷ lệ thành công:</span>
                        <span className="text-green-400 font-bold">
                          {calculateSuccessRate(selectedEquipment, selectedStone)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chi phí:</span>
                        <span className="text-spirit-jade font-bold">
                          {calculateEnhancementCost(selectedEquipment.enhancementLevel)} Linh Thạch
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>EXP nhận được:</span>
                        <span className="text-blue-400 font-bold">
                          +{selectedStone.expValue}
                        </span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleEnhancement}
                      className="w-full"
                      disabled={!selectedEquipment || !selectedStone}
                    >
                      <Hammer className="w-4 h-4 mr-2" />
                      Cường Hóa
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Chọn trang bị và đá cường hóa để xem kết quả
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="synthesis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Equipment Selection */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chọn Trang Bị</h3>
                <div className="space-y-2">
                  {equipmentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedEquipment?.id === item.id
                          ? 'border-spirit-jade bg-spirit-jade/10'
                          : 'border-border/50 hover:border-border'
                      }`}
                      onClick={() => setSelectedEquipment(item)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="outline" className={getQualityColor(item.quality)}>
                          {item.quality}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Hợp thành:</span>
                        <span className="text-mystical-purple font-bold">
                          {item.synthesisPoints} điểm
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Synthesis Stone Selection */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chọn Đá Hợp Thành</h3>
                <div className="space-y-2">
                  {enhancementStones
                    .filter(stone => stone.type === 'synthesis')
                    .map((stone) => (
                    <div
                      key={stone.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStone?.id === stone.id
                          ? 'border-spirit-jade bg-spirit-jade/10'
                          : 'border-border/50 hover:border-border'
                      }`}
                      onClick={() => setSelectedStone(stone)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <img 
                          src={stone.imageUrl} 
                          alt={stone.name}
                          className="w-6 h-6 rounded object-cover"
                        />
                        <span className="font-medium text-sm">{stone.name}</span>
                        <Badge variant="outline" className="text-xs">
                          x{stone.quantity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Chỉ số: +{stone.expValue} | Tỷ lệ: {stone.successRate}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Luck Charm */}
                <div className="mt-4 p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedLuckCharm}
                      onChange={(e) => setSelectedLuckCharm(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Bùa May Mắn (+10% tỷ lệ)</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Có: 5 | Chi phí: 1 Linh Thạch nạp
                  </div>
                </div>
              </Card>

              {/* Synthesis Result */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Kết Quả Hợp Thành</h3>
                {selectedEquipment && selectedStone ? (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-cultivator-gold">
                        {selectedEquipment.name}
                      </div>
                      <div className="text-mystical-purple font-bold">
                        {selectedEquipment.synthesisPoints} → {selectedEquipment.synthesisPoints + selectedStone.expValue} điểm
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tỷ lệ thành công:</span>
                        <span className="text-green-400 font-bold">
                          {calculateSuccessRate(selectedEquipment, selectedStone)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chi phí:</span>
                        <span className="text-spirit-jade font-bold">
                          {calculateEnhancementCost(selectedEquipment.synthesisLevel) * 2} Linh Thạch
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chỉ số tăng:</span>
                        <span className="text-mystical-purple font-bold">
                          +{selectedStone.expValue}
                        </span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSynthesis}
                      className="w-full"
                      disabled={!selectedEquipment || !selectedStone}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Hợp Thành
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Chọn trang bị và đá hợp thành để xem kết quả
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upgrade" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Equipment Selection */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chọn Trang Bị (+12)</h3>
                <div className="space-y-2">
                  {equipmentItems
                    .filter(item => item.enhancementLevel >= 12)
                    .map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedEquipment?.id === item.id
                          ? 'border-spirit-jade bg-spirit-jade/10'
                          : 'border-border/50 hover:border-border'
                      }`}
                      onClick={() => setSelectedEquipment(item)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.upgradedImageUrl && item.upgradeLevel === 3 ? (
                            <img 
                              src={item.upgradedImageUrl} 
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover border-2 border-yellow-400"
                            />
                          ) : (
                            <img 
                              src={item.originalImageUrl || 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=32&h=32&fit=crop'} 
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <Badge variant="outline" className={getQualityColor(item.quality)}>
                          {item.quality}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-bold ${getEnhancementColor(item.enhancementLevel)}`}>
                          +{item.enhancementLevel}
                        </span>
                        <span className={`text-sm font-bold ${getUpgradeColor(item.upgradeLevel)}`}>
                          Cấp {item.upgradeLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">May mắn:</span>
                        <span className="text-yellow-400 font-bold text-xs">
                          {item.luckPoints}/350
                        </span>
                      </div>
                      <Progress 
                        value={(item.luckPoints / 350) * 100} 
                        className="h-2 mt-1"
                      />
                    </div>
                  ))}
                  {equipmentItems.filter(item => item.enhancementLevel >= 12).length === 0 && (
                    <div className="text-center text-muted-foreground p-4">
                      Không có trang bị +12 nào để tăng cấp
                    </div>
                  )}
                </div>
              </Card>

              {/* Upgrade Stone Selection */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chọn Đá Tăng Cấp</h3>
                <div className="space-y-2">
                  {enhancementStones
                    .filter(stone => stone.type === 'upgrade')
                    .map((stone) => {
                      const isValid = selectedEquipment ? canUpgrade(selectedEquipment, stone) : true;
                      return (
                        <div
                          key={stone.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedStone?.id === stone.id
                              ? 'border-spirit-jade bg-spirit-jade/10'
                              : isValid 
                                ? 'border-border/50 hover:border-border'
                                : 'border-red-500/30 bg-red-500/5 opacity-50'
                          }`}
                          onClick={() => isValid && setSelectedStone(stone)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <img 
                              src={stone.imageUrl} 
                              alt={stone.name}
                              className="w-6 h-6 rounded object-cover"
                            />
                            <span className="font-medium text-sm">{stone.name}</span>
                            <Badge variant="outline" className="text-xs">
                              x{stone.quantity}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {stone.upgradeLevel === 0 ? 'Dùng chung' : `LV${stone.upgradeLevel}`} | 
                            Tỷ lệ: {stone.successRate}%
                          </div>
                          {!isValid && selectedEquipment && (
                            <div className="text-xs text-red-400 mt-1">
                              Không phù hợp với cấp hiện tại
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>

                {/* Luck Charm */}
                <div className="mt-4 p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedLuckCharm}
                      onChange={(e) => setSelectedLuckCharm(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Bùa May Mắn (+10% tỷ lệ)</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Có: 5 | Chi phí: 1 Linh Thạch nạp
                  </div>
                </div>
              </Card>

              {/* Upgrade Result */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Kết Quả Tăng Cấp</h3>
                {selectedEquipment && selectedStone && canUpgrade(selectedEquipment, selectedStone) ? (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-cultivator-gold">
                        {selectedEquipment.name}
                      </div>
                      <div className={`text-xl font-bold ${getUpgradeColor(selectedEquipment.upgradeLevel)}`}>
                        Cấp {selectedEquipment.upgradeLevel} → Cấp {selectedEquipment.upgradeLevel + 1}
                      </div>
                      {selectedEquipment.type === 'weapon' && selectedEquipment.upgradeLevel + 1 === 3 && (
                        <div className="text-yellow-400 text-sm mt-1">
                          ✨ Sẽ thay đổi hình dạng!
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tỷ lệ thành công:</span>
                        <span className="text-green-400 font-bold">
                          {calculateSuccessRate(selectedEquipment, selectedStone)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chi phí:</span>
                        <span className="text-spirit-jade font-bold">
                          {calculateUpgradeCost(selectedEquipment.upgradeLevel)} Linh Thạch
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Điểm may mắn:</span>
                        <span className="text-yellow-400 font-bold">
                          {selectedEquipment.luckPoints} (+{Math.min(70, selectedEquipment.luckPoints * 0.5).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Thất bại sẽ nhận +50 điểm may mắn
                      </div>
                    </div>

                    <Button 
                      onClick={handleUpgrade}
                      className="w-full"
                      disabled={!selectedEquipment || !selectedStone}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Tăng Cấp
                    </Button>
                  </div>
                ) : selectedEquipment && selectedStone ? (
                  <div className="text-center text-red-400">
                    Không thể tăng cấp với đá này
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Chọn trang bị và đá tăng cấp để xem kết quả
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhancement Tips */}
        <Card className="mt-4 p-4 bg-muted/10">
          <h4 className="font-semibold text-cultivator-gold mb-2">Mẹo Nâng Cấp:</h4>
          <div className="text-sm space-y-1 text-muted-foreground">
            <div>• <strong>Cường hóa:</strong> Cấp càng cao thì tỷ lệ thành công càng thấp</div>
            <div>• <strong>Hợp thành:</strong> Tăng chỉ số mà không tăng cấp cường hóa</div>
            <div>• <strong>Tăng cấp:</strong> Chỉ dành cho trang bị +12, có thể thất bại</div>
            <div>• <strong>Điểm may mắn:</strong> Tích lũy khi thất bại, tăng tỷ lệ thành công</div>
            <div>• <strong>Đá tím:</strong> Có thể dùng cho tất cả cấp tăng cấp</div>
            <div>• <strong>Vũ khí cấp 3:</strong> Sẽ thay đổi hình dạng đẹp hơn</div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default EnhancementSystem;
