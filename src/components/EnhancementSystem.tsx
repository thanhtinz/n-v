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
  Leaf
} from 'lucide-react';

const EnhancementSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Elemental stones for crafting - expanded with more elements
  const elementalStones = [
    { 
      id: 'fire', 
      name: 'Hỏa Linh Thạch', 
      icon: Flame, 
      color: 'text-red-500',
      count: 45,
      description: 'Tăng sát thương lửa +15%',
      grade: 'basic'
    },
    { 
      id: 'water', 
      name: 'Thủy Linh Thạch', 
      icon: Droplets, 
      color: 'text-blue-500',
      count: 32,
      description: 'Tăng khôi phục +20%',
      grade: 'basic'
    },
    { 
      id: 'wind', 
      name: 'Phong Linh Thạch', 
      icon: Wind, 
      color: 'text-green-500',
      count: 28,
      description: 'Tăng tốc độ +25%',
      grade: 'basic'
    },
    { 
      id: 'earth', 
      name: 'Thổ Linh Thạch', 
      icon: Mountain, 
      color: 'text-yellow-600',
      count: 38,
      description: 'Tăng phòng thủ +30%',
      grade: 'basic'
    },
    { 
      id: 'thunder', 
      name: 'Lôi Linh Thạch', 
      icon: Zap, 
      color: 'text-purple-500',
      count: 15,
      description: 'Tăng tỷ lệ bạo kích +10%',
      grade: 'basic'
    },
    { 
      id: 'light', 
      name: 'Quang Minh Thạch', 
      icon: Sun, 
      color: 'text-yellow-300',
      count: 8,
      description: 'Tăng sát thương chí mạng +40%',
      grade: 'advanced'
    },
    { 
      id: 'dark', 
      name: 'Hắc Ám Thạch', 
      icon: Moon, 
      color: 'text-gray-700',
      count: 12,
      description: 'Tăng hút máu +25%',
      grade: 'advanced'
    },
    { 
      id: 'ice', 
      name: 'Băng Tinh Thạch', 
      icon: Snowflake, 
      color: 'text-cyan-400',
      count: 6,
      description: 'Tăng hiệu ứng làm chậm +35%',
      grade: 'advanced'
    },
    { 
      id: 'nature', 
      name: 'Mộc Linh Thạch', 
      icon: Leaf, 
      color: 'text-green-600',
      count: 18,
      description: 'Tăng hồi phục tự động +30%',
      grade: 'advanced'
    }
  ];

  // Equipment that can be enhanced with different elemental affinities
  const enhanceableItems = [
    {
      id: 'weapon1',
      name: 'Kiếm Phong Lôi',
      type: 'weapon',
      currentLevel: 3,
      maxLevel: 10,
      baseAttack: 100,
      enhancedAttack: 130,
      elements: ['wind', 'thunder'],
      primaryElement: 'wind',
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
      elements: ['earth', 'fire'],
      primaryElement: 'earth',
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
      elements: ['water', 'light'],
      primaryElement: 'water',
      rarity: 'legendary',
      cost: { silver: 2000, rechargeSpiritStones: 1 }
    },
    {
      id: 'weapon2',
      name: 'Trượng Hắc Ám',
      type: 'weapon',
      currentLevel: 0,
      maxLevel: 12,
      baseAttack: 120,
      enhancedAttack: 120,
      elements: ['dark', 'ice'],
      primaryElement: 'dark',
      rarity: 'legendary',
      cost: { silver: 8000, rechargeSpiritStones: 5 }
    }
  ];

  // Elemental fusion recipes
  const fusionRecipes = [
    {
      id: 'storm',
      name: 'Bão Tố Thạch',
      ingredients: [
        { element: 'wind', count: 5 },
        { element: 'thunder', count: 5 }
      ],
      result: { name: 'Bão Tố Thạch', description: 'Tăng sát thương AoE +50%' },
      icon: Zap,
      color: 'text-purple-400'
    },
    {
      id: 'magma',
      name: 'Nham Thạch',
      ingredients: [
        { element: 'fire', count: 8 },
        { element: 'earth', count: 3 }
      ],
      result: { name: 'Nham Thạch', description: 'Gây bỏng địch trong 3 giây' },
      icon: Flame,
      color: 'text-orange-500'
    },
    {
      id: 'steam',
      name: 'Hơi Nước Thạch',
      ingredients: [
        { element: 'fire', count: 3 },
        { element: 'water', count: 6 }
      ],
      result: { name: 'Hơi Nước Thạch', description: 'Tạo màn sương che tầm nhìn' },
      icon: Droplets,
      color: 'text-blue-300'
    },
    {
      id: 'eclipse',
      name: 'Nhật Thực Thạch',
      ingredients: [
        { element: 'light', count: 2 },
        { element: 'dark', count: 2 }
      ],
      result: { name: 'Nhật Thực Thạch', description: 'Kỹ năng tối thượng +100%' },
      icon: Moon,
      color: 'text-indigo-500'
    },
    {
      id: 'blizzard',
      name: 'Bão Tuyết Thạch',
      ingredients: [
        { element: 'ice', count: 4 },
        { element: 'wind', count: 4 }
      ],
      result: { name: 'Bão Tuyết Thạch', description: 'Đóng băng kẻ thù 5 giây' },
      icon: Snowflake,
      color: 'text-cyan-300'
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

  const handleEnhanceWithElement = (item: any, selectedElement: string) => {
    const elementStone = elementalStones.find(stone => stone.id === selectedElement);
    if (!elementStone || elementStone.count <= 0) {
      addNotification(`Không đủ ${elementStone?.name}!`, 'warning');
      return;
    }

    const successRate = getSuccessRate(item.currentLevel);
    const elementBonus = item.elements.includes(selectedElement) ? 15 : 0; // Bonus if element matches
    const finalSuccessRate = Math.min(successRate + elementBonus, 95);
    
    const success = Math.random() * 100 < finalSuccessRate;
    
    if (success) {
      addNotification(`Cường hóa ${item.name} với ${elementStone.name} thành công! Lên cấp ${item.currentLevel + 1}`, 'success');
    } else {
      addNotification(`Cường hóa ${item.name} với ${elementStone.name} thất bại!`, 'warning');
    }
  };

  const handleElementalFusion = (recipe: any) => {
    const canCraft = recipe.ingredients.every((ingredient: any) => {
      const stone = elementalStones.find(s => s.id === ingredient.element);
      return stone && stone.count >= ingredient.count;
    });

    if (canCraft) {
      addNotification(`Hợp thành ${recipe.name} thành công!`, 'success');
    } else {
      addNotification(`Không đủ nguyên liệu để hợp thành ${recipe.name}!`, 'warning');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <Hammer className="w-5 h-5" />
          Cường Hóa & Chế Tạo Nguyên Tố
        </h2>

        <Tabs defaultValue="enhance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enhance" className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4" />
              Cường Hóa
            </TabsTrigger>
            <TabsTrigger value="elements" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Nguyên Tố
            </TabsTrigger>
            <TabsTrigger value="fusion" className="flex items-center gap-2">
              <Gem className="w-4 h-4" />
              Hợp Thành
            </TabsTrigger>
            <TabsTrigger value="craft" className="flex items-center gap-2">
              <Hammer className="w-4 h-4" />
              Chế Tạo
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Enhancement Tab */}
          <TabsContent value="enhance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item List with elemental info */}
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

                      {/* Elemental affinities */}
                      <div className="flex items-center gap-1 mb-2">
                        {item.elements.map((element: string) => {
                          const elementData = elementalStones.find(s => s.id === element);
                          const ElementIcon = elementData?.icon || Sparkles;
                          return (
                            <div 
                              key={element}
                              className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                                element === item.primaryElement ? 'bg-cultivator-gold/20' : 'bg-muted/30'
                              }`}
                            >
                              <ElementIcon className={`w-3 h-3 ${elementData?.color}`} />
                              <span className="text-xs">{elementData?.name.split(' ')[0]}</span>
                            </div>
                          );
                        })}
                      </div>

                      // ... keep existing code (stats display)
                    </div>
                  ))}
                </div>
              </Card>

              {/* Enhanced Enhancement Panel */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Cường Hóa Nguyên Tố</h3>
                {selectedItem ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-medium text-lg">{selectedItem.name}</h4>
                      <p className="text-sm text-muted-foreground">Cấp hiện tại: +{selectedItem.currentLevel}</p>
                    </div>

                    {/* Element selection */}
                    <div>
                      <h5 className="text-sm font-medium mb-2">Chọn nguyên tố cường hóa:</h5>
                      <div className="grid grid-cols-3 gap-2">
                        {elementalStones.filter(stone => stone.count > 0).map((stone) => {
                          const StoneIcon = stone.icon;
                          const isCompatible = selectedItem.elements.includes(stone.id);
                          return (
                            <Button
                              key={stone.id}
                              variant={isCompatible ? "default" : "outline"}
                              size="sm"
                              className={`flex flex-col items-center gap-1 h-auto py-2 ${stone.color}`}
                              onClick={() => handleEnhanceWithElement(selectedItem, stone.id)}
                            >
                              <StoneIcon className="w-4 h-4" />
                              <span className="text-xs">{stone.count}</span>
                              {isCompatible && <Star className="w-2 h-2" />}
                            </Button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        ⭐ = Nguyên tố tương thích (+15% tỷ lệ thành công)
                      </p>
                    </div>

                    // ... keep existing code (success rate and cost display)
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Chọn một trang bị để cường hóa
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Elements Tab - Enhanced */}
          <TabsContent value="elements" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Kho Nguyên Tố</h3>
              
              {/* Basic Elements */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3 text-cultivator-gold">Nguyên Tố Cơ Bản</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {elementalStones.filter(stone => stone.grade === 'basic').map((stone) => {
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
              </div>

              {/* Advanced Elements */}
              <div>
                <h4 className="text-sm font-medium mb-3 text-spirit-jade">Nguyên Tố Cao Cấp</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {elementalStones.filter(stone => stone.grade === 'advanced').map((stone) => {
                    const StoneIcon = stone.icon;
                    return (
                      <div key={stone.id} className="p-4 bg-card/50 rounded-lg border border-mystical-purple/30">
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
              </div>
            </Card>
          </TabsContent>

          {/* Fusion Tab - New */}
          <TabsContent value="fusion" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Hợp Thành Nguyên Tố</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fusionRecipes.map((recipe) => {
                  const RecipeIcon = recipe.icon;
                  const canCraft = recipe.ingredients.every((ingredient: any) => {
                    const stone = elementalStones.find(s => s.id === ingredient.element);
                    return stone && stone.count >= ingredient.count;
                  });

                  return (
                    <div key={recipe.id} className="p-4 bg-card/50 rounded-lg border border-border/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-muted/50 to-muted/80 flex items-center justify-center ${recipe.color}`}>
                          <RecipeIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">{recipe.name}</h4>
                          <p className="text-xs text-muted-foreground">{recipe.result.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <h5 className="text-xs font-medium">Nguyên liệu cần:</h5>
                        {recipe.ingredients.map((ingredient: any, index: number) => {
                          const stone = elementalStones.find(s => s.id === ingredient.element);
                          const StoneIcon = stone?.icon || Sparkles;
                          const hasEnough = stone && stone.count >= ingredient.count;
                          
                          return (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <StoneIcon className={`w-3 h-3 ${stone?.color}`} />
                                <span>{stone?.name}</span>
                              </div>
                              <span className={hasEnough ? 'text-green-400' : 'text-red-400'}>
                                {stone?.count || 0}/{ingredient.count}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full" 
                        disabled={!canCraft}
                        onClick={() => handleElementalFusion(recipe)}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Hợp Thành
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
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
        </Tabs>
      </Card>
    </div>
  );
};

export default EnhancementSystem;
