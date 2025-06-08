
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
  Sword
} from 'lucide-react';

interface EnhancementStone {
  id: string;
  name: string;
  type: 'enhancement' | 'synthesis';
  grade: number;
  expValue: number;
  successRate: number;
  description: string;
  quantity: number;
  imageUrl: string;
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
  stats: {
    attack?: number;
    defense?: number;
    luck?: number;
    agility?: number;
  };
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
      enhancementLevel: 0,
      enhancementExp: 0,
      maxEnhancementExp: 100,
      synthesisLevel: 0,
      synthesisPoints: 0,
      stats: { attack: 10, agility: -2 }
    },
    {
      id: 'eq2',
      name: 'Áo Vải Thô',
      type: 'armor',
      quality: 'common',
      enhancementLevel: 0,
      enhancementExp: 0,
      maxEnhancementExp: 100,
      synthesisLevel: 0,
      synthesisPoints: 0,
      stats: { defense: 5, agility: -1 }
    }
  ]);

  // Enhancement stones
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

  const calculateEnhancementCost = (level: number) => {
    return Math.floor(10 * Math.pow(1.5, level));
  };

  const calculateSuccessRate = (equipment: EquipmentItem, stone: EnhancementStone) => {
    let baseRate = stone.successRate;
    
    // Giảm tỷ lệ thành công theo cấp cường hóa
    if (equipment.enhancementLevel >= 7) {
      baseRate *= 0.5;
    } else if (equipment.enhancementLevel >= 4) {
      baseRate *= 0.7;
    }

    // Bùa may mắn tăng 10% tỷ lệ thành công
    if (selectedLuckCharm) {
      baseRate = Math.min(100, baseRate + 10);
    }

    return Math.floor(baseRate);
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enhancement" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Cường Hóa
            </TabsTrigger>
            <TabsTrigger value="synthesis" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Hợp Thành
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
        </Tabs>

        {/* Enhancement Tips */}
        <Card className="mt-4 p-4 bg-muted/10">
          <h4 className="font-semibold text-cultivator-gold mb-2">Mẹo Cường Hóa:</h4>
          <div className="text-sm space-y-1 text-muted-foreground">
            <div>• Cấp cường hóa càng cao thì tỷ lệ thành công càng thấp</div>
            <div>• Bùa may mắn giúp tăng 10% tỷ lệ thành công</div>
            <div>• Trang bị có thể cường hóa tối đa +12</div>
            <div>• Hợp thành giúp tăng chỉ số mà không tăng cấp</div>
            <div>• Đá cấp cao cho hiệu quả tốt hơn nhưng tỷ lệ thấp hơn</div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default EnhancementSystem;
