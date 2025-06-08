
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
  Target
} from 'lucide-react';

const EnhancementSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [enhanceLevel, setEnhanceLevel] = useState(0);

  // Elemental stones for crafting
  const elementalStones = [
    { 
      id: 'fire', 
      name: 'Hỏa Linh Thạch', 
      icon: Flame, 
      color: 'text-red-500',
      count: 45,
      description: 'Tăng sát thương lửa +15%'
    },
    { 
      id: 'water', 
      name: 'Thủy Linh Thạch', 
      icon: Droplets, 
      color: 'text-blue-500',
      count: 32,
      description: 'Tăng khôi phục +20%'
    },
    { 
      id: 'wind', 
      name: 'Phong Linh Thạch', 
      icon: Wind, 
      color: 'text-green-500',
      count: 28,
      description: 'Tăng tốc độ +25%'
    },
    { 
      id: 'earth', 
      name: 'Thổ Linh Thạch', 
      icon: Mountain, 
      color: 'text-yellow-600',
      count: 38,
      description: 'Tăng phòng thủ +30%'
    },
    { 
      id: 'thunder', 
      name: 'Lôi Linh Thạch', 
      icon: Zap, 
      color: 'text-purple-500',
      count: 15,
      description: 'Tăng tỷ lệ bạo kích +10%'
    }
  ];

  // Equipment that can be enhanced
  const enhanceableItems = [
    {
      id: 'weapon1',
      name: 'Kiếm Phong Lôi',
      type: 'weapon',
      currentLevel: 3,
      maxLevel: 10,
      baseAttack: 100,
      enhancedAttack: 130,
      element: 'fire',
      rarity: 'epic',
      cost: { silver: 5000, rechargeSpiritStones: 3 }
    },
    {
      id: 'armor1',
      name: 'Giáp Thiên Long',
      type: 'armor',
      currentLevel: 2,
      maxLevel: 8,
      baseDefense: 80,
      enhancedDefense: 104,
      element: 'earth',
      rarity: 'rare',
      cost: { silver: 3000, rechargeSpiritStones: 2 }
    },
    {
      id: 'ring1',
      name: 'Nhẫn Linh Thạch',
      type: 'accessory',
      currentLevel: 1,
      maxLevel: 5,
      baseLuck: 50,
      enhancedLuck: 60,
      element: 'water',
      rarity: 'legendary',
      cost: { silver: 2000, rechargeSpiritStones: 1 }
    }
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

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'text-red-500';
      case 'water': return 'text-blue-500';
      case 'wind': return 'text-green-500';
      case 'earth': return 'text-yellow-600';
      case 'thunder': return 'text-purple-500';
      default: return 'text-gray-400';
    }
  };

  const getSuccessRate = (currentLevel: number) => {
    if (currentLevel < 3) return 90;
    if (currentLevel < 6) return 70;
    if (currentLevel < 8) return 50;
    return 30;
  };

  const handleEnhance = (item: any) => {
    const successRate = getSuccessRate(item.currentLevel);
    const success = Math.random() * 100 < successRate;
    
    if (success) {
      addNotification(`Cường hóa ${item.name} thành công! Lên cấp ${item.currentLevel + 1}`, 'success');
    } else {
      addNotification(`Cường hóa ${item.name} thất bại!`, 'warning');
    }
  };

  const handleElementalCraft = (stone: any) => {
    if (stone.count > 0) {
      addNotification(`Chế tạo với ${stone.name} thành công!`, 'success');
    } else {
      addNotification(`Không đủ ${stone.name}!`, 'warning');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <Hammer className="w-5 h-5" />
          Cường Hóa & Chế Tạo
        </h2>

        <Tabs defaultValue="enhance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="enhance" className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4" />
              Cường Hóa
            </TabsTrigger>
            <TabsTrigger value="craft" className="flex items-center gap-2">
              <Hammer className="w-4 h-4" />
              Chế Tạo
            </TabsTrigger>
            <TabsTrigger value="elements" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Nguyên Tố
            </TabsTrigger>
          </TabsList>

          {/* Enhancement Tab */}
          <TabsContent value="enhance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item List */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Trang Bị Có Thể Cường Hóa</h3>
                <div className="space-y-3">
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
                          {item.rarity}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">+{item.currentLevel}</span>
                        <Progress 
                          value={(item.currentLevel / item.maxLevel) * 100} 
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-muted-foreground">{item.currentLevel}/{item.maxLevel}</span>
                      </div>

                      <div className="text-xs space-y-1">
                        {item.type === 'weapon' && (
                          <div className="text-red-400">Công Kích: {item.baseAttack} → {item.enhancedAttack}</div>
                        )}
                        {item.type === 'armor' && (
                          <div className="text-blue-400">Phòng Thủ: {item.baseDefense} → {item.enhancedDefense}</div>
                        )}
                        {item.type === 'accessory' && (
                          <div className="text-yellow-400">May Mắn: {item.baseLuck} → {item.enhancedLuck}</div>
                        )}
                        <div className={`${getElementColor(item.element)} flex items-center gap-1`}>
                          <Sparkles className="w-3 h-3" />
                          Nguyên tố: {item.element}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Enhancement Panel */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Chi Tiết Cường Hóa</h3>
                {selectedItem ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-medium text-lg">{selectedItem.name}</h4>
                      <p className="text-sm text-muted-foreground">Cấp hiện tại: +{selectedItem.currentLevel}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Tỷ lệ thành công:</span>
                        <span className="text-green-400">{getSuccessRate(selectedItem.currentLevel)}%</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Chi phí Bạc:</span>
                          <span className="text-yellow-400">{selectedItem.cost.silver.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chi phí Linh Thạch:</span>
                          <span className="text-mystical-purple">{selectedItem.cost.rechargeSpiritStones}</span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">
                        <p>• Cường hóa thất bại không làm hỏng trang bị</p>
                        <p>• Cấp càng cao tỷ lệ thành công càng thấp</p>
                        <p>• Sử dụng Bùa May Mắn để tăng tỷ lệ thành công</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => handleEnhance(selectedItem)}
                      disabled={gameState?.player?.silver < selectedItem.cost.silver || gameState?.player?.rechargeSpiritStones < selectedItem.cost.rechargeSpiritStones}
                    >
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Cường Hóa
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Chọn một trang bị để cường hóa
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Crafting Tab */}
          <TabsContent value="craft" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Chế Tạo Trang Bị</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Craft recipes */}
                <div className="p-3 bg-card/50 rounded-lg border border-border/30">
                  <h4 className="font-medium mb-2">Kiếm Linh Hỏa</h4>
                  <div className="text-xs space-y-1 mb-3">
                    <div>• 10x Hỏa Linh Thạch</div>
                    <div>• 5000 Bạc</div>
                    <div>• 3x Linh Thạch (Nạp)</div>
                  </div>
                  <Button size="sm" className="w-full">
                    <Hammer className="w-3 h-3 mr-1" />
                    Chế Tạo
                  </Button>
                </div>

                <div className="p-3 bg-card/50 rounded-lg border border-border/30">
                  <h4 className="font-medium mb-2">Giáp Thủy Tinh</h4>
                  <div className="text-xs space-y-1 mb-3">
                    <div>• 8x Thủy Linh Thạch</div>
                    <div>• 4000 Bạc</div>
                    <div>• 2x Linh Thạch (Nạp)</div>
                  </div>
                  <Button size="sm" className="w-full">
                    <Hammer className="w-3 h-3 mr-1" />
                    Chế Tạo
                  </Button>
                </div>

                <div className="p-3 bg-card/50 rounded-lg border border-border/30">
                  <h4 className="font-medium mb-2">Nhẫn Phong Lôi</h4>
                  <div className="text-xs space-y-1 mb-3">
                    <div>• 5x Phong Linh Thạch</div>
                    <div>• 5x Lôi Linh Thạch</div>
                    <div>• 3000 Bạc</div>
                  </div>
                  <Button size="sm" className="w-full">
                    <Hammer className="w-3 h-3 mr-1" />
                    Chế Tạo
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Elements Tab */}
          <TabsContent value="elements" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Kho Nguyên Tố</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {elementalStones.map((stone) => {
                  const StoneIcon = stone.icon;
                  return (
                    <div key={stone.id} className="p-4 bg-card/50 rounded-lg border border-border/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center ${stone.color}`}>
                          <StoneIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{stone.name}</h4>
                          <p className="text-sm text-muted-foreground">x{stone.count}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3">{stone.description}</p>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleElementalCraft(stone)}
                        >
                          <Target className="w-3 h-3 mr-1" />
                          Sử Dụng
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Elemental Fusion */}
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Hợp Thành Nguyên Tố</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-card/50 rounded-lg">
                  <h4 className="font-medium mb-2">Hỏa + Phong = Bạo Phong Hỏa</h4>
                  <div className="text-xs text-muted-foreground mb-2">
                    Cần: 5x Hỏa Linh Thạch + 5x Phong Linh Thạch
                  </div>
                  <Button size="sm" className="w-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Hợp Thành
                  </Button>
                </div>

                <div className="p-3 bg-card/50 rounded-lg">
                  <h4 className="font-medium mb-2">Thủy + Thổ = Băng Giáp</h4>
                  <div className="text-xs text-muted-foreground mb-2">
                    Cần: 5x Thủy Linh Thạch + 5x Thổ Linh Thạch
                  </div>
                  <Button size="sm" className="w-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Hợp Thành
                  </Button>
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
