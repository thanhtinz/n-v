
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sword, 
  Shield, 
  Shirt, 
  Crown,
  Package,
  Zap,
  Star,
  Plus,
  Minus,
  Info
} from 'lucide-react';

interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'pill' | 'material';
  quality: 'common' | 'rare' | 'epic' | 'legendary';
  stats?: {
    attack?: number;
    defense?: number;
    speed?: number;
    spiritual?: number;
  };
  quantity: number;
  description: string;
  equipped?: boolean;
}

const InventorySystem = () => {
  const [activeTab, setActiveTab] = useState('equipment');
  
  const [equipment] = useState<Item[]>([
    {
      id: 'eq1',
      name: 'Kiếm Sắt',
      type: 'weapon',
      quality: 'common',
      stats: { attack: 10 },
      quantity: 1,
      description: 'Kiếm sắt cơ bản, +10 Công Kích',
      equipped: true
    },
    {
      id: 'eq2',
      name: 'Áo Vải Thô',
      type: 'armor',
      quality: 'common',
      stats: { defense: 5 },
      quantity: 1,
      description: 'Áo vải thô, +5 Phòng Thủ',
      equipped: true
    }
  ]);

  const [inventory] = useState<Item[]>([
    {
      id: 'inv1',
      name: 'Hồi Linh Đan',
      type: 'pill',
      quality: 'common',
      quantity: 5,
      description: 'Phục hồi 100 HP'
    },
    {
      id: 'inv2',
      name: 'Linh Thạch',
      type: 'material',
      quality: 'common',
      quantity: 50,
      description: 'Nguyên liệu tu luyện cơ bản'
    },
    {
      id: 'inv3',
      name: 'Kiếm Phong Lôi',
      type: 'weapon',
      quality: 'epic',
      stats: { attack: 25, speed: 5 },
      quantity: 1,
      description: 'Kiếm với sức mạnh phong lôi, +25 Công Kích, +5 Tốc Độ'
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon': return Sword;
      case 'armor': return Shield;
      case 'accessory': return Crown;
      case 'pill': return Zap;
      case 'material': return Package;
      default: return Package;
    }
  };

  const equipItem = (item: Item) => {
    console.log(`Đã trang bị ${item.name}`);
  };

  const unequipItem = (item: Item) => {
    console.log(`Đã tháo ${item.name}`);
  };

  const useItem = (item: Item) => {
    if (item.type === 'pill') {
      console.log(`Đã sử dụng ${item.name}`);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Hành Trang</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="equipment" className="flex items-center gap-2">
              <Shirt className="w-4 h-4" />
              Trang Bị
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Kho Đồ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="equipment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Equipment Slots */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Trang Bị Hiện Tại</h3>
                <div className="space-y-3">
                  {equipment.map((item) => {
                    const Icon = getTypeIcon(item.type);
                    return (
                      <div key={item.id} className="p-3 bg-card/50 rounded-lg border border-border/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-cultivator-gold" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.name}</span>
                                <Badge variant="outline" className={`text-xs ${getQualityColor(item.quality)}`}>
                                  {item.quality}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => unequipItem(item)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Stats Summary */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Tổng Kết Chỉ Số</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Công Kích:</span>
                    <span className="text-cultivator-gold font-bold">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phòng Thủ:</span>
                    <span className="text-spirit-jade font-bold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tốc Độ:</span>
                    <span className="text-mystical-purple font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Linh Lực:</span>
                    <span className="text-divine-blue font-bold">0</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {inventory.map((item) => {
                const Icon = getTypeIcon(item.type);
                return (
                  <Card key={item.id} className="p-3 bg-card/50 hover:bg-card/70 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-cultivator-gold" />
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      {item.quantity > 1 && (
                        <Badge variant="outline" className="text-xs">
                          x{item.quantity}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={`text-xs ${getQualityColor(item.quality)}`}>
                        {item.quality}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground mb-3">
                      {item.description}
                    </div>

                    <div className="flex gap-2">
                      {item.type === 'weapon' || item.type === 'armor' || item.type === 'accessory' ? (
                        <Button
                          size="sm"
                          onClick={() => equipItem(item)}
                          className="flex-1"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Trang Bị
                        </Button>
                      ) : item.type === 'pill' ? (
                        <Button
                          size="sm"
                          onClick={() => useItem(item)}
                          className="flex-1"
                          variant="outline"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Sử Dụng
                        </Button>
                      ) : null}
                      <Button size="sm" variant="outline">
                        <Info className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default InventorySystem;
