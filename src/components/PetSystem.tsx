import React, { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star,
  Zap,
  Shield,
  Heart,
  Coins,
  Gem,
  Sprout,
  TreePine,
  Wheat,
  Pickaxe,
  Gift,
  Crown,
  Sparkles,
  Target,
  Sword,
  Plus,
  Clock,
  Package,
  Users
} from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  type: 'seedling' | 'fighter' | 'ant' | 'chick';
  stars: number;
  level: number;
  exp: number;
  maxExp: number;
  happiness: number;
  attack: number;
  defense: number;
  agility: number;
  luck: number;
  isActive: boolean;
  skills: PetSkill[];
  evolutionLevel: number;
  equipment?: {
    armor?: string;
    weapon?: string;
    hat?: string;
  };
}

interface PetSkill {
  id: string;
  name: string;
  type: 'passive' | 'active';
  level: number;
  description: string;
  unlockLevel: number;
}

interface Material {
  id: string;
  name: string;
  quantity: number;
  type: 'food' | 'evolution' | 'upgrade' | 'equipment';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface TreasureMap {
  level: number;
  position: number;
  dailyRolls: number;
  freeRolls: number;
}

const PetSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState<'pets' | 'treasure' | 'training'>('pets');
  
  const [pets, setPets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Mầm Xanh',
      type: 'seedling',
      stars: 3,
      level: 15,
      exp: 50,
      maxExp: 100,
      happiness: 85,
      attack: 120,
      defense: 80,
      agility: 95,
      luck: 75,
      isActive: true,
      evolutionLevel: 2,
      skills: [
        {
          id: 's1',
          name: 'Hấp Thụ',
          type: 'passive',
          level: 2,
          description: 'Tăng 10% exp nhận được',
          unlockLevel: 1
        },
        {
          id: 's2',
          name: 'Tái Sinh',
          type: 'active',
          level: 1,
          description: 'Hồi phục 30% HP',
          unlockLevel: 10
        },
        {
          id: 's3',
          name: 'Hỗ Trợ Nông Trại',
          type: 'passive',
          level: 3,
          description: 'Tăng 20% năng suất nông trại',
          unlockLevel: 5
        }
      ]
    }
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'Thức Ăn Pet', quantity: 25, type: 'food', rarity: 'common' },
    { id: '2', name: 'Linh Lộ Đơn', quantity: 5, type: 'upgrade', rarity: 'rare' },
    { id: '3', name: 'Cỏ Thiên Diệp', quantity: 8, type: 'evolution', rarity: 'common' },
    { id: '4', name: 'Đá Huyền Thú', quantity: 12, type: 'equipment', rarity: 'epic' },
    { id: '5', name: 'Đá Tam Sinh', quantity: 2, type: 'upgrade', rarity: 'legendary' }
  ]);

  const [treasureMap, setTreasureMap] = useState<TreasureMap>({
    level: 1,
    position: 0,
    dailyRolls: 3,
    freeRolls: 3
  });

  const [selectedPet, setSelectedPet] = useState<Pet | null>(pets[0]);

  const feedPet = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    const food = materials.find(m => m.name === 'Thức Ăn Pet');
    
    if (pet && food && food.quantity > 0) {
      setPets(prev => prev.map(p => 
        p.id === petId 
          ? { ...p, happiness: Math.min(p.happiness + 15, 100) }
          : p
      ));
      
      setMaterials(prev => prev.map(m => 
        m.name === 'Thức Ăn Pet' 
          ? { ...m, quantity: m.quantity - 1 }
          : m
      ));
      
      addNotification('Pet đã được cho ăn! +15 Vui vẻ', 'success');
    }
  };

  const upgradePetStars = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    const material = materials.find(m => m.name === 'Linh Lộ Đơn');
    
    if (pet && material && material.quantity >= 10 && pet.stars < 5) {
      setPets(prev => prev.map(p => 
        p.id === petId 
          ? { 
              ...p, 
              stars: p.stars + 1,
              attack: p.attack + 20,
              defense: p.defense + 15,
              agility: p.agility + 10,
              luck: p.luck + 5
            }
          : p
      ));
      
      setMaterials(prev => prev.map(m => 
        m.name === 'Linh Lộ Đơn' 
          ? { ...m, quantity: m.quantity - 10 }
          : m
      ));
      
      addNotification(`${pet.name} đã thăng cấp sao!`, 'success');
    }
  };

  const evolvePet = () => {
    const material = materials.find(m => m.name === 'Cỏ Thiên Diệp');
    
    if (material && material.quantity >= 5) {
      setPets(prev => prev.map(p => ({
        ...p,
        evolutionLevel: p.evolutionLevel + 1,
        attack: p.attack + 5,
        defense: p.defense + 5,
        agility: p.agility + 5,
        luck: p.luck + 5
      })));
      
      setMaterials(prev => prev.map(m => 
        m.name === 'Cỏ Thiên Diệp' 
          ? { ...m, quantity: m.quantity - 5 }
          : m
      ));
      
      addNotification('Tất cả Pet đã tiến hóa! +5 tất cả thuộc tính', 'success');
    }
  };

  const rollTreasureMap = () => {
    if (treasureMap.freeRolls > 0 || gameState.player.silver >= 20) {
      const roll = Math.floor(Math.random() * 6) + 1;
      const newPosition = Math.min(treasureMap.position + roll, 20);
      
      setTreasureMap(prev => ({
        ...prev,
        position: newPosition,
        freeRolls: prev.freeRolls > 0 ? prev.freeRolls - 1 : prev.freeRolls
      }));
      
      if (treasureMap.freeRolls === 0) {
        // Deduct silver cost
      }
      
      if (newPosition === 20) {
        addNotification('Đã đến đích! Nhận được Bảo Rương!', 'success');
        setMaterials(prev => prev.map(m => 
          m.name === 'Đá Huyền Thú' 
            ? { ...m, quantity: m.quantity + 5 }
            : m
        ));
      }
      
      addNotification(`Đổ xí ngầu: ${roll}. Tiến ${roll} bước.`, 'info');
    }
  };

  const getPetTypeIcon = (type: string) => {
    switch (type) {
      case 'seedling': return <Sprout className="w-4 h-4 text-green-400" />;
      case 'fighter': return <Sword className="w-4 h-4 text-red-400" />;
      case 'ant': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'chick': return <Heart className="w-4 h-4 text-yellow-400" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const tabs = [
    { id: 'pets', label: 'Pet', icon: Heart },
    { id: 'treasure', label: 'Kho Báu', icon: Gem },
    { id: 'training', label: 'Đào Tạo', icon: Target }
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-3 h-3" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Pets Tab */}
      {activeTab === 'pets' && (
        <div className="space-y-3">
          {/* Pet List */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Danh Sách Pet</h3>
            <div className="space-y-3">
              {pets.map((pet) => (
                <div 
                  key={pet.id} 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPet?.id === pet.id 
                      ? 'bg-cultivator-gold/10 border-cultivator-gold/30' 
                      : 'bg-muted/20 border-border/30'
                  }`}
                  onClick={() => setSelectedPet(pet)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPetTypeIcon(pet.type)}
                      <span className="font-medium text-sm">{pet.name}</span>
                      <div className="flex">
                        {Array.from({ length: pet.stars }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    {pet.isActive && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Xuất Trận
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Lv.{pet.level} ({pet.exp}/{pet.maxExp})</div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      <span>{pet.happiness}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
                    <div className="text-center">
                      <div className="text-red-400">{pet.attack}</div>
                      <div className="text-muted-foreground">Công</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400">{pet.defense}</div>
                      <div className="text-muted-foreground">Thủ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400">{pet.agility}</div>
                      <div className="text-muted-foreground">Nhanh</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-400">{pet.luck}</div>
                      <div className="text-muted-foreground">May</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pet Actions */}
          {selectedPet && (
            <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Chăm Sóc Pet</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">Độ vui vẻ: {selectedPet.happiness}%</span>
                  <Button size="sm" onClick={() => feedPet(selectedPet.id)}>
                    <Heart className="w-3 h-3 mr-1" />
                    Cho Ăn
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">Cấp sao: {selectedPet.stars}/5</span>
                  <Button 
                    size="sm" 
                    onClick={() => upgradePetStars(selectedPet.id)}
                    disabled={selectedPet.stars >= 5}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Thăng Sao
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground p-2 bg-muted/10 rounded">
                  Pet vui vẻ trên 80% sẽ hỗ trợ nông trại tốt nhất. Dưới 50% sẽ giảm hiệu quả hỗ trợ.
                </div>
              </div>
            </Card>
          )}

          {/* Pet Skills */}
          {selectedPet && (
            <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Kỹ Năng Pet</h3>
              <div className="space-y-2">
                {selectedPet.skills.map((skill) => (
                  <div key={skill.id} className="p-2 bg-muted/20 rounded border border-border/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <Badge variant="outline" className={skill.type === 'active' ? 'text-blue-400' : 'text-green-400'}>
                        {skill.type === 'active' ? 'Chủ động' : 'Bị động'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{skill.description}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Treasure Map Tab */}
      {activeTab === 'treasure' && (
        <div className="space-y-3">
          {/* Map Progress */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Bản Đồ Kho Báu</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span>Vị trí: {treasureMap.position}/20</span>
                <span>Cấp: {treasureMap.level} sao</span>
              </div>
              <Progress value={(treasureMap.position / 20) * 100} className="h-3" />
            </div>

            {/* Dice Roll */}
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-sm mb-2">Lượt đổ miễn phí: {treasureMap.freeRolls}</div>
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  onClick={rollTreasureMap}
                  disabled={treasureMap.freeRolls === 0 && gameState.player.silver < 20}
                >
                  <Package className="w-3 h-3 mr-2" />
                  Đổ Xí Ngầu {treasureMap.freeRolls === 0 ? '(20 Bạc)' : '(Miễn phí)'}
                </Button>
              </div>
              
              {treasureMap.position === 20 && (
                <div className="text-center p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                  <Gift className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-yellow-400">Đã đến đích! Nhận Bảo Rương!</div>
                </div>
              )}
            </div>
          </Card>

          {/* Equipment Shop */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Cửa Hàng Đá</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                <div>
                  <div className="text-sm">Giáp Linh Thú (Thường)</div>
                  <div className="text-xs text-muted-foreground">15 ngày - 50 Đá Huyền Thú</div>
                </div>
                <Button size="sm" variant="outline">Đổi</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                <div>
                  <div className="text-sm">Giáp Linh Thú (S)</div>
                  <div className="text-xs text-muted-foreground">10 ngày - 100 Đá Huyền Thú</div>
                </div>
                <Button size="sm" variant="outline">Đổi</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Training Tab */}
      {activeTab === 'training' && (
        <div className="space-y-3">
          {/* Star Upgrade */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Tăng Sao Pet</h3>
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">
                Sử dụng Linh Lộ Đơn để tăng cấp sao cho Pet (1-5 sao)
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                <div>
                  <div className="text-sm">Linh Lộ Đơn</div>
                  <div className="text-xs text-muted-foreground">Cần 10 viên để thăng 1 sao</div>
                </div>
                <div className="text-sm">{materials.find(m => m.name === 'Linh Lộ Đơn')?.quantity || 0}</div>
              </div>
            </div>
          </Card>

          {/* Evolution */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Tiến Hóa Pet</h3>
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">
                Tiến hóa áp dụng cho tất cả Pet (Level 0-50)
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                <div>
                  <div className="text-sm">Cỏ Thiên Diệp</div>
                  <div className="text-xs text-muted-foreground">Cần 5 cỏ để tiến hóa 1 level</div>
                </div>
                <div className="text-sm">{materials.find(m => m.name === 'Cỏ Thiên Diệp')?.quantity || 0}</div>
              </div>
              <Button className="w-full" onClick={evolvePet}>
                <Sparkles className="w-3 h-3 mr-2" />
                Tiến Hóa (Level {pets[0]?.evolutionLevel || 0})
              </Button>
            </div>
          </Card>

          {/* Breakthrough */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Đột Phá Pet</h3>
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">
                Mở giới hạn Level từ 60 lên 70 (4 cấp độ đột phá)
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Cấp 1: Level 63</span>
                  <span>4 Đá Tam Sinh + Pet 4★ Lv50</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Cấp 2: Level 65</span>
                  <span>6 Đá Tam Sinh + Pet 4★ Lv55</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Cấp 3: Level 67</span>
                  <span>8 Đá Tam Sinh + Pet 5★ Lv60</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Cấp 4: Level 70</span>
                  <span>10 Đá Tam Sinh + Pet 5★ Lv65</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <Crown className="w-3 h-3 mr-2" />
                Đột Phá Pet
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Materials Inventory */}
      <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Kho Nguyên Liệu</h3>
        <div className="grid grid-cols-2 gap-2">
          {materials.map((material) => (
            <div key={material.id} className="p-2 bg-muted/20 rounded border border-border/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{material.name}</span>
                <Badge variant="outline" className={`text-xs ${getRarityColor(material.rarity)}`}>
                  x{material.quantity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PetSystem;
