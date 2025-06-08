
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGameState } from '@/hooks/useGameState';
import { 
  Hammer, 
  Gem, 
  Star, 
  Zap, 
  Plus,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Sparkles,
  ArrowUp,
  Target,
  Sun,
  Moon,
  Snowflake,
  Leaf,
  Crown,
  Shield,
  Shirt,
  CircleDot
} from 'lucide-react';

const EnhancementSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedStone, setSelectedStone] = useState<any>(null);
  const [selectedCharm, setSelectedCharm] = useState<any>(null);
  const [luckPoints, setLuckPoints] = useState(0);

  // Equipment that can be enhanced (Nón, Áo, Vũ khí, Thiên sứ ban phúc, Khiên)
  const enhanceableItems = [
    {
      id: 'hat1',
      name: 'Nón Thiên Thần',
      type: 'hat',
      currentLevel: 2,
      maxLevel: 12,
      baseDefense: 50,
      enhancedDefense: 70,
      upgradeLevel: 0, // For Tăng Cấp (0-3)
      rarity: 'epic',
      cost: { silver: 3000, rechargeSpiritStones: 2 }
    },
    {
      id: 'armor1',
      name: 'Áo Giáp Rồng',
      type: 'armor',
      currentLevel: 5,
      maxLevel: 12,
      baseDefense: 120,
      enhancedDefense: 180,
      upgradeLevel: 0,
      rarity: 'legendary',
      cost: { silver: 5000, rechargeSpiritStones: 3 }
    },
    {
      id: 'weapon1',
      name: 'Kiếm Phong Lôi',
      type: 'weapon',
      currentLevel: 8,
      maxLevel: 12,
      baseAttack: 200,
      enhancedAttack: 320,
      upgradeLevel: 0,
      rarity: 'legendary',
      cost: { silver: 8000, rechargeSpiritStones: 5 }
    },
    {
      id: 'blessing1',
      name: 'Thiên Sứ Ban Phúc',
      type: 'blessing',
      currentLevel: 1,
      maxLevel: 12,
      baseLuck: 30,
      enhancedLuck: 40,
      upgradeLevel: 0,
      rarity: 'rare',
      cost: { silver: 4000, rechargeSpiritStones: 3 }
    },
    {
      id: 'shield1',
      name: 'Khiên Bolobala',
      type: 'shield',
      currentLevel: 3,
      maxLevel: 12,
      baseDefense: 80,
      enhancedDefense: 110,
      upgradeLevel: 0,
      rarity: 'epic',
      cost: { silver: 3500, rechargeSpiritStones: 2 }
    }
  ];

  // Enhancement stones
  const enhancementStones = [
    { id: 'basic', name: 'Đá Cường Hóa Cơ Bản', count: 25, level: 1 },
    { id: 'advanced', name: 'Đá Cường Hóa Cao Cấp', count: 12, level: 2 },
    { id: 'perfect', name: 'Đá Cường Hóa Hoàn Hảo', count: 5, level: 3 }
  ];

  // Synthesis stones  
  const synthesisStones = [
    { id: 'synthesis1', name: 'Đá Hợp Thành Cấp 1', count: 15, successRate: 80 },
    { id: 'synthesis2', name: 'Đá Hợp Thành Cấp 2', count: 8, successRate: 60 },
    { id: 'synthesis3', name: 'Đá Hợp Thành Cấp 3', count: 3, successRate: 40 }
  ];

  // Upgrade stones (for Tăng Cấp after level 12)
  const upgradeStones = [
    { id: 'upgrade1', name: 'Đá Tăng Cấp Cấp 1', count: 3, forLevel: 1, color: 'text-blue-400' },
    { id: 'upgrade2', name: 'Đá Tăng Cấp Cấp 2', count: 2, forLevel: 2, color: 'text-purple-400' },
    { id: 'upgrade3', name: 'Đá Tăng Cấp Cấp 3', count: 1, forLevel: 3, color: 'text-yellow-400' },
    { id: 'upgradeUniversal', name: 'Đá Tăng Cấp (Tím)', count: 2, forLevel: 'all', color: 'text-purple-600' }
  ];

  // Lucky charms
  const luckyCharms = [
    { id: 'charm1', name: 'Bùa May Mắn', count: 5, bonus: 10 },
    { id: 'charm2', name: 'Bùa Thần Thánh', count: 2, bonus: 25 }
  ];

  // Element seals (Phù Hiệu Nguyên Tố)
  const elementSeals = [
    { id: 'fire', name: 'Phù Hiệu Lửa', element: 'fire', count: 8, quality: 'thường', icon: Flame, color: 'text-red-500' },
    { id: 'water', name: 'Phù Hiệu Nước', element: 'water', count: 6, quality: 'ưu tú', icon: Droplets, color: 'text-blue-500' },
    { id: 'wind', name: 'Phù Hiệu Gió', element: 'wind', count: 4, quality: 'hoàn mỹ', icon: Wind, color: 'text-green-500' },
    { id: 'earth', name: 'Phù Hiệu Đất', element: 'earth', count: 5, quality: 'thô', icon: Mountain, color: 'text-yellow-600' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getSuccessRate = (currentLevel: number, stoneLevel: number = 1) => {
    let baseRate = 90;
    if (currentLevel >= 9) baseRate = 30;
    else if (currentLevel >= 6) baseRate = 50;
    else if (currentLevel >= 3) baseRate = 70;
    
    // Higher level stones increase success rate
    return Math.min(baseRate + (stoneLevel - 1) * 10, 95);
  };

  const handleEnhancement = (item: any) => {
    if (!selectedStone) {
      addNotification('Vui lòng chọn đá cường hóa!', 'warning');
      return;
    }

    if (item.currentLevel >= 12) {
      addNotification('Trang bị đã đạt cấp tối đa! Sử dụng Tăng Cấp để tiếp tục.', 'info');
      return;
    }

    const successRate = getSuccessRate(item.currentLevel, selectedStone.level);
    const charmBonus = selectedCharm ? selectedCharm.bonus : 0;
    const finalRate = Math.min(successRate + charmBonus, 95);
    
    const success = Math.random() * 100 < finalRate;
    
    if (success) {
      addNotification(`Cường hóa ${item.name} thành công! Lên cấp ${item.currentLevel + 1}`, 'success');
    } else {
      addNotification(`Cường hóa ${item.name} thất bại!`, 'warning');
    }
  };

  const handleSynthesis = (item: any) => {
    if (!selectedStone) {
      addNotification('Vui lòng chọn đá hợp thành!', 'warning');
      return;
    }

    const stone = synthesisStones.find(s => s.id === selectedStone.id);
    if (!stone) return;

    const charmBonus = selectedCharm ? selectedCharm.bonus : 0;
    const finalRate = Math.min(stone.successRate + charmBonus, 95);
    
    const success = Math.random() * 100 < finalRate;
    
    if (success) {
      addNotification(`Hợp thành ${item.name} thành công! Tăng chỉ số trang bị.`, 'success');
    } else {
      addNotification(`Hợp thành ${item.name} thất bại!`, 'warning');
    }
  };

  const handleUpgrade = (item: any) => {
    if (item.currentLevel < 12) {
      addNotification('Trang bị cần đạt cấp 12 mới có thể Tăng Cấp!', 'warning');
      return;
    }

    if (!selectedStone) {
      addNotification('Vui lòng chọn đá tăng cấp!', 'warning');
      return;
    }

    const stone = upgradeStones.find(s => s.id === selectedStone.id);
    if (!stone) return;

    // Check if stone matches required level
    if (stone.forLevel !== 'all' && stone.forLevel !== (item.upgradeLevel + 1)) {
      addNotification(`Cần sử dụng đúng loại đá cho cấp ${item.upgradeLevel + 1}!`, 'warning');
      return;
    }

    // Base success rate decreases with upgrade level
    let baseRate = 70 - (item.upgradeLevel * 15);
    baseRate = Math.max(baseRate + luckPoints, 20); // Luck points help
    
    const success = Math.random() * 100 < baseRate;
    
    if (success) {
      addNotification(`Tăng cấp ${item.name} thành công! Lên cấp ${item.upgradeLevel + 1}`, 'success');
      if (item.type === 'weapon' && item.upgradeLevel + 1 === 3) {
        addNotification('Vũ khí đã thay đổi hình dạng!', 'success');
      }
      setLuckPoints(0); // Reset luck points on success
    } else {
      addNotification(`Tăng cấp ${item.name} thất bại! +50 điểm may mắn`, 'warning');
      setLuckPoints(prev => prev + 50);
    }
  };

  const handleElementSeal = (item: any, seal: any) => {
    if (item.type !== 'weapon' && item.type !== 'armor' && item.type !== 'hat') {
      addNotification('Chỉ có thể khảm phù hiệu vào Vũ Khí, Áo, Nón!', 'warning');
      return;
    }

    addNotification(`Khảm ${seal.name} vào ${item.name} thành công!`, 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <Hammer className="w-5 h-5" />
          Tiệm Rèn - Cường Hóa Trang Bị
        </h2>

        <Tabs defaultValue="enhance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="enhance">Cường Hóa</TabsTrigger>
            <TabsTrigger value="synthesis">Hợp Thành</TabsTrigger>
            <TabsTrigger value="upgrade">Tăng Cấp</TabsTrigger>
            <TabsTrigger value="seals">Phù Hiệu</TabsTrigger>
            <TabsTrigger value="energy">Năng Lượng</TabsTrigger>
          </TabsList>

          {/* Enhancement Tab */}
          <TabsContent value="enhance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Equipment Selection */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chọn Trang Bị</h3>
                <div className="space-y-2">
                  {enhanceableItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-3 bg-card/50 rounded-lg border cursor-pointer transition-colors ${
                        selectedItem?.id === item.id ? 'border-cultivator-gold bg-cultivator-gold/10' : 'border-border/30 hover:border-border/50'
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="outline" className={getRarityColor(item.rarity)}>
                          +{item.currentLevel}
                        </Badge>
                      </div>
                      <Progress value={(item.currentLevel / item.maxLevel) * 100} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        Cấp {item.currentLevel}/{item.maxLevel}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Enhancement Panel */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Cường Hóa</h3>
                {selectedItem ? (
                  <div className="space-y-4">
                    {/* Selected item display */}
                    <div className="text-center p-3 bg-card/50 rounded-lg">
                      <h4 className="font-medium">{selectedItem.name}</h4>
                      <p className="text-sm text-muted-foreground">Cấp hiện tại: +{selectedItem.currentLevel}</p>
                    </div>

                    {/* Stone selection */}
                    <div>
                      <h5 className="text-sm font-medium mb-2">Chọn Đá Cường Hóa:</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {enhancementStones.map((stone) => (
                          <Button
                            key={stone.id}
                            variant={selectedStone?.id === stone.id ? "default" : "outline"}
                            size="sm"
                            className="justify-between"
                            onClick={() => setSelectedStone(stone)}
                            disabled={stone.count === 0}
                          >
                            <span>{stone.name}</span>
                            <span className="text-xs">x{stone.count}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Charm selection */}
                    <div>
                      <h5 className="text-sm font-medium mb-2">Bùa May Mắn (Tùy chọn):</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {luckyCharms.map((charm) => (
                          <Button
                            key={charm.id}
                            variant={selectedCharm?.id === charm.id ? "default" : "outline"}
                            size="sm"
                            className="justify-between"
                            onClick={() => setSelectedCharm(selectedCharm?.id === charm.id ? null : charm)}
                            disabled={charm.count === 0}
                          >
                            <span>{charm.name} (+{charm.bonus}%)</span>
                            <span className="text-xs">x{charm.count}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Success rate */}
                    {selectedStone && (
                      <div className="text-center">
                        <p className="text-sm">Tỷ lệ thành công: 
                          <span className="text-green-400 font-medium ml-1">
                            {Math.min(getSuccessRate(selectedItem.currentLevel, selectedStone.level) + (selectedCharm?.bonus || 0), 95)}%
                          </span>
                        </p>
                      </div>
                    )}

                    <Button 
                      className="w-full bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                      onClick={() => handleEnhancement(selectedItem)}
                      disabled={!selectedStone}
                    >
                      <Hammer className="w-4 h-4 mr-2" />
                      Cường Hóa
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Chọn trang bị để cường hóa
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Synthesis Tab */}
          <TabsContent value="synthesis" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Hợp Thành Trang Bị</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Chọn Đá Hợp Thành:</h5>
                  <div className="space-y-2">
                    {synthesisStones.map((stone) => (
                      <Button
                        key={stone.id}
                        variant={selectedStone?.id === stone.id ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-between"
                        onClick={() => setSelectedStone(stone)}
                        disabled={stone.count === 0}
                      >
                        <span>{stone.name}</span>
                        <span className="text-xs">{stone.successRate}% | x{stone.count}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedItem && selectedStone && (
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-card/50 rounded-lg">
                      <h4 className="font-medium">{selectedItem.name}</h4>
                      <p className="text-sm text-cultivator-gold">
                        Tỷ lệ: {Math.min(selectedStone.successRate + (selectedCharm?.bonus || 0), 95)}%
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-spirit-jade hover:bg-spirit-jade/80"
                      onClick={() => handleSynthesis(selectedItem)}
                    >
                      <Gem className="w-4 h-4 mr-2" />
                      Hợp Thành
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Upgrade Tab */}
          <TabsContent value="upgrade" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Tăng Cấp Trang Bị</h3>
              
              {/* Luck points display */}
              <div className="mb-4 p-3 bg-card/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Điểm May Mắn:</span>
                  <span className="text-yellow-400 font-medium">{luckPoints}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tự động reset sau 24h | Tăng tỷ lệ thành công
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Đá Tăng Cấp:</h5>
                  <div className="space-y-2">
                    {upgradeStones.map((stone) => (
                      <Button
                        key={stone.id}
                        variant={selectedStone?.id === stone.id ? "default" : "outline"}
                        size="sm"
                        className={`w-full justify-between ${stone.color}`}
                        onClick={() => setSelectedStone(stone)}
                        disabled={stone.count === 0}
                      >
                        <span>{stone.name}</span>
                        <span className="text-xs">x{stone.count}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedItem && (
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-card/50 rounded-lg">
                      <h4 className="font-medium">{selectedItem.name}</h4>
                      <p className="text-sm">Cấp Cường Hóa: +{selectedItem.currentLevel}</p>
                      <p className="text-sm text-cultivator-gold">Cấp Tăng: {selectedItem.upgradeLevel}/3</p>
                      {selectedItem.currentLevel < 12 && (
                        <p className="text-xs text-red-400">Cần cường hóa +12 trước</p>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-mystical-purple hover:bg-mystical-purple/80"
                      onClick={() => handleUpgrade(selectedItem)}
                      disabled={selectedItem.currentLevel < 12 || !selectedStone}
                    >
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Tăng Cấp
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Element Seals Tab */}
          <TabsContent value="seals" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Phù Hiệu Nguyên Tố</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Yêu cầu: Cấp 30+ | Khảm vào Vũ Khí, Áo, Nón (Tối đa 3 phù hiệu/vị trí)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {elementSeals.map((seal) => {
                  const SealIcon = seal.icon;
                  return (
                    <div key={seal.id} className="p-3 bg-card/50 rounded-lg border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <SealIcon className={`w-6 h-6 ${seal.color}`} />
                        <div>
                          <h4 className="font-medium">{seal.name}</h4>
                          <p className="text-xs text-muted-foreground">Phẩm chất: {seal.quality}</p>
                        </div>
                        <span className="ml-auto text-sm">x{seal.count}</span>
                      </div>
                      
                      <div className="text-xs space-y-1 mb-3">
                        {seal.element === 'fire' && (
                          <>
                            <div>• Công Lửa: 15% thiêu đốt, 1% sát thương/turn (3 turn)</div>
                            <div>• Kháng Lửa: Hấp thụ 10 sát thương/turn</div>
                          </>
                        )}
                        {seal.element === 'water' && (
                          <>
                            <div>• Công Nước: 3% đóng băng 2 turn</div>
                            <div>• Kháng Nước: Hồi 10 HP/turn</div>
                          </>
                        )}
                        {seal.element === 'wind' && (
                          <>
                            <div>• Công Gió: 15% sấm sét, 1% sát thương phạm vi 300</div>
                            <div>• Kháng Gió: Tăng 1% né</div>
                          </>
                        )}
                        {seal.element === 'earth' && (
                          <>
                            <div>• Công Đất: +1% sát thương mỗi 100 pixel cao hơn</div>
                            <div>• Kháng Đất: Giảm 10 sát thương mỗi 100 pixel</div>
                          </>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => selectedItem && handleElementSeal(selectedItem, seal)}
                        disabled={!selectedItem || seal.count === 0}
                      >
                        <Target className="w-3 h-3 mr-1" />
                        Khảm Phù Hiệu
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Energy Tab */}
          <TabsContent value="energy" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Năng Lượng Siêu Gà</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Chỉ nâng cấp: Tóc, Mặt, Mắt, Set Avatar, Cánh | Tăng cả 4 thuộc tính
              </p>
              
              <div className="space-y-4">
                <div className="p-3 bg-card/50 rounded-lg">
                  <h4 className="font-medium mb-2">Đá Năng Lượng</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-sm font-medium">Thấp</div>
                      <div className="text-xs">Max: 40 điểm</div>
                      <div className="text-xs text-cultivator-gold">x3</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-sm font-medium">Cao</div>
                      <div className="text-xs">Max: 80 điểm</div>
                      <div className="text-xs text-cultivator-gold">x1</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-sm font-medium">Tối Thượng</div>
                      <div className="text-xs">Max: 120 điểm</div>
                      <div className="text-xs text-cultivator-gold">x0</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-divine-blue hover:bg-divine-blue/80">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Kích Hoạt Tiềm Năng
                  </Button>
                </div>

                <div className="text-xs text-yellow-400 text-center">
                  Hiệu lực: 7 ngày | Mua Đá Năng Lượng tại Cửa Hàng Mê Cung
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EnhancementSystem;
