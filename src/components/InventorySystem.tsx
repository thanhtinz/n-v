import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shirt, 
  Package,
  Zap,
  Plus,
  Minus,
  Info
} from 'lucide-react';

interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'pants' | 'hair' | 'hat' | 'chest' | 'treasure' | 'ring' | 'bracelet' | 'necklace' | 'set' | 'pill' | 'material';
  quality: 'common' | 'rare' | 'epic' | 'legendary';
  stats?: {
    attack?: number;
    defense?: number;
    luck?: number;
    agility?: number;
  };
  quantity: number;
  description: string;
  equipped?: boolean;
  setName?: string;
  imageUrl?: string;
  gender?: 'male' | 'female' | 'unisex';
  class?: 'sword' | 'magic' | 'defense' | 'all';
  weaponType?: 'sword' | 'staff' | 'shield' | 'bow';
}

interface EquipmentSlot {
  type: string;
  name: string;
  item?: Item;
}

interface InventorySystemProps {
  playerGender: 'male' | 'female';
  playerClass: 'sword' | 'magic' | 'defense';
}

const InventorySystem = ({ playerGender, playerClass }: InventorySystemProps) => {
  const [activeTab, setActiveTab] = useState('equipment');
  
  const [equipmentSlots, setEquipmentSlots] = useState<EquipmentSlot[]>([
    { 
      type: 'weapon', 
      name: 'Vũ Khí', 
      item: { 
        id: 'eq1', 
        name: playerClass === 'sword' ? 'Kiếm Sắt' : playerClass === 'magic' ? 'Trượng Pháp Cơ Bản' : 'Khiên Sắt', 
        type: 'weapon', 
        quality: 'common', 
        stats: { attack: 10, agility: -2 }, 
        quantity: 1, 
        description: playerClass === 'sword' ? 'Kiếm sắt cơ bản, +10 Công Kích, -2 Nhanh Nhẹn' : 
                    playerClass === 'magic' ? 'Trượng pháp cơ bản, +10 Công Kích, -2 Nhanh Nhẹn' :
                    'Khiên sắt cơ bản, +10 Công Kích, -2 Nhanh Nhẹn', 
        equipped: true, 
        imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop',
        gender: 'unisex',
        class: playerClass,
        weaponType: playerClass === 'sword' ? 'sword' : playerClass === 'magic' ? 'staff' : 'shield'
      } 
    },
    { 
      type: 'armor', 
      name: 'Áo Giáp', 
      item: { 
        id: 'eq2', 
        name: playerGender === 'male' ? 'Áo Vải Thô Nam' : 'Áo Vải Thô Nữ', 
        type: 'armor', 
        quality: 'common', 
        stats: { defense: 5, agility: -1 }, 
        quantity: 1, 
        description: 'Áo vải thô, +5 Phòng Thủ, -1 Nhanh Nhẹn', 
        equipped: true, 
        imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop',
        gender: playerGender
      } 
    },
    { type: 'pants', name: 'Quần' },
    { type: 'hair', name: 'Tóc' },
    { type: 'hat', name: 'Nón' },
    { type: 'chest', name: 'Giáp Ngực' },
    { type: 'treasure', name: 'Pháp Bảo' },
    { type: 'ring', name: 'Nhẫn' },
    { type: 'bracelet', name: 'Vòng Tay' },
    { type: 'necklace', name: 'Dây Chuyền' },
    { type: 'set', name: 'Bộ Đồ' }
  ]);

  const [inventory] = useState<Item[]>([
    {
      id: 'inv1',
      name: 'Hồi Linh Đan',
      type: 'pill',
      quality: 'common',
      quantity: 5,
      description: 'Phục hồi 100 HP',
      imageUrl: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=64&h=64&fit=crop',
      gender: 'unisex',
      class: 'all'
    },
    {
      id: 'inv2',
      name: 'Linh Thạch',
      type: 'material',
      quality: 'common',
      quantity: 50,
      description: 'Nguyên liệu tu luyện cơ bản',
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop',
      gender: 'unisex',
      class: 'all'
    },
    // Weapons for Sword class
    {
      id: 'inv3',
      name: 'Kiếm Phong Lôi',
      type: 'weapon',
      quality: 'epic',
      stats: { attack: 25, luck: 5, agility: -3 },
      quantity: 1,
      description: 'Kiếm với sức mạnh phong lôi, +25 Công Kích, +5 May Mắn, -3 Nhanh Nhẹn',
      imageUrl: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop',
      gender: 'unisex',
      class: 'sword',
      weaponType: 'sword'
    },
    // Weapons for Magic class  
    {
      id: 'inv4',
      name: 'Trượng Phong Hỏa',
      type: 'weapon',
      quality: 'rare',
      stats: { attack: 20, luck: 8, defense: -2 },
      quantity: 1,
      description: 'Trượng pháp với sức mạnh phong hỏa, +20 Công Kích, +8 May Mắn, -2 Phòng Thủ',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop',
      gender: 'unisex',
      class: 'magic',
      weaponType: 'staff'
    },
    // Weapons for Defense class
    {
      id: 'inv5',
      name: 'Khiên Thiên Long',
      type: 'weapon',
      quality: 'epic',
      stats: { defense: 30, attack: -5, luck: 10 },
      quantity: 1,
      description: 'Khiên với sức mạnh thiên long, +30 Phòng Thủ, +10 May Mắn, -5 Công Kích',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop',
      gender: 'unisex',
      class: 'defense',
      weaponType: 'shield'
    },
    // Female clothing
    {
      id: 'inv6',
      name: 'Áo Dài Lụa Nữ',
      type: 'armor',
      quality: 'rare',
      stats: { defense: 15, agility: 5 },
      quantity: 1,
      description: 'Áo dài lụa nữ thanh lịch, +15 Phòng Thủ, +5 Nhanh Nhẹn',
      imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop',
      gender: 'female',
      class: 'all'
    },
    // Male clothing
    {
      id: 'inv7',
      name: 'Áo Giáp Chiến Binh Nam',
      type: 'armor',
      quality: 'rare',
      stats: { defense: 20, attack: 5, agility: -3 },
      quantity: 1,
      description: 'Áo giáp chiến binh nam mạnh mẽ, +20 Phòng Thủ, +5 Công Kích, -3 Nhanh Nhẹn',
      imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop',
      gender: 'male',
      class: 'all'
    },
    {
      id: 'inv8',
      name: 'Bộ Đồ Kiếm Khách',
      type: 'set',
      quality: 'legendary',
      stats: { attack: 15, defense: 15, agility: 10 },
      quantity: 1,
      description: 'Bộ đồ huyền thoại dành cho kiếm khách, +15 Công Kích, +15 Phòng Thủ, +10 Nhanh Nhẹn',
      setName: 'Kiếm Khách',
      imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop',
      gender: 'unisex',
      class: 'sword'
    }
  ]);

  // Filter inventory based on player's gender and class
  const getFilteredInventory = () => {
    return inventory.filter(item => {
      // Check gender compatibility
      const genderMatch = item.gender === 'unisex' || item.gender === playerGender;
      
      // Check class compatibility
      const classMatch = item.class === 'all' || item.class === playerClass;
      
      // For weapons, also check weapon type compatibility
      if (item.type === 'weapon' && item.weaponType) {
        const weaponMatch = 
          (playerClass === 'sword' && item.weaponType === 'sword') ||
          (playerClass === 'magic' && item.weaponType === 'staff') ||
          (playerClass === 'defense' && item.weaponType === 'shield');
        return genderMatch && weaponMatch;
      }
      
      return genderMatch && classMatch;
    });
  };

  const filteredInventory = getFilteredInventory();

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getDefaultItemImage = (type: string) => {
    switch (type) {
      case 'weapon': return 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop';
      case 'armor':
      case 'pants':
      case 'chest': return 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop';
      case 'hat':
      case 'hair': return 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop';
      case 'ring':
      case 'bracelet':
      case 'necklace':
      case 'treasure': return 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop';
      case 'set': return 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop';
      case 'pill': return 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=64&h=64&fit=crop';
      case 'material': return 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop';
      default: return 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop';
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

  // Calculate total stats from equipped items
  const calculateTotalStats = () => {
    let totalStats = { attack: 0, defense: 0, luck: 0, agility: 0 };
    
    equipmentSlots.forEach(slot => {
      if (slot.item?.stats) {
        totalStats.attack += slot.item.stats.attack || 0;
        totalStats.defense += slot.item.stats.defense || 0;
        totalStats.luck += slot.item.stats.luck || 0;
        totalStats.agility += slot.item.stats.agility || 0;
      }
    });
    
    return totalStats;
  };

  const totalStats = calculateTotalStats();

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-cultivator-gold">Hành Trang</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs border-spirit-jade text-spirit-jade">
              {playerGender === 'male' ? 'Nam' : 'Nữ'}
            </Badge>
            <Badge variant="outline" className="text-xs border-mystical-purple text-mystical-purple">
              {playerClass === 'sword' ? 'Kiếm Khách' : 
               playerClass === 'magic' ? 'Pháp Sư' : 'Hộ Vệ'}
            </Badge>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="equipment" className="flex items-center gap-2">
              <Shirt className="w-4 h-4" />
              Trang Bị
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Kho Đồ ({filteredInventory.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="equipment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Equipment Slots */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Trang Bị Hiện Tại</h3>
                <div className="grid grid-cols-2 gap-2">
                  {equipmentSlots.map((slot) => {
                    return (
                      <div key={slot.type} className="p-2 bg-card/50 rounded-lg border border-border/30 min-h-[80px]">
                        <div className="text-xs text-muted-foreground mb-1">{slot.name}</div>
                        {slot.item ? (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <img 
                                src={slot.item.imageUrl || getDefaultItemImage(slot.item.type)} 
                                alt={slot.item.name}
                                className="w-6 h-6 rounded object-cover border border-border/50"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = getDefaultItemImage(slot.item?.type || 'material');
                                }}
                              />
                              <span className="text-sm font-medium truncate">{slot.item.name}</span>
                            </div>
                            <Badge variant="outline" className={`text-xs ${getQualityColor(slot.item.quality)}`}>
                              {slot.item.quality}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => unequipItem(slot.item!)}
                              className="w-full mt-2 h-6 text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="w-8 h-8 bg-muted/50 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground/50">?</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Stats Summary */}
              <Card className="p-4 bg-muted/20">
                <h3 className="font-semibold mb-3 text-spirit-jade">Tổng Kết Chỉ Số</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Công Kích:</span>
                    <span className="text-red-400 font-bold">{totalStats.attack}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phòng Thủ:</span>
                    <span className="text-blue-400 font-bold">{totalStats.defense}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>May Mắn:</span>
                    <span className="text-yellow-400 font-bold">{totalStats.luck}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nhanh Nhẹn:</span>
                    <span className="text-green-400 font-bold">{totalStats.agility}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2 text-mystical-purple">Hiệu Ứng Chỉ Số:</h4>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div>• Công Kích: Làm chậm tốc độ công kích</div>
                    <div>• Phòng Thủ: Giảm sát thương nhận, làm chậm nhanh nhẹn</div>
                    <div>• May Mắn: Phá giáp đối thủ, làm yếu phòng thủ bản thân</div>
                    <div>• Nhanh Nhẹn: Chống phá giáp, làm yếu may mắn đối thủ</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-3">
              Hiển thị vật phẩm phù hợp với giới tính và class của bạn
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredInventory.map((item) => {
                return (
                  <Card key={item.id} className="p-3 bg-card/50 hover:bg-card/70 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={item.imageUrl || getDefaultItemImage(item.type)} 
                          alt={item.name}
                          className="w-8 h-8 rounded object-cover border border-border/50"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getDefaultItemImage(item.type);
                          }}
                        />
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      {item.quantity > 1 && (
                        <Badge variant="outline" className="text-xs">
                          x{item.quantity}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`text-xs ${getQualityColor(item.quality)}`}>
                        {item.quality}
                      </Badge>
                      {item.setName && (
                        <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-400">
                          {item.setName}
                        </Badge>
                      )}
                    </div>

                    {item.stats && (
                      <div className="text-xs mb-2 space-y-1">
                        {item.stats.attack && (
                          <div className="text-red-400">+{item.stats.attack} Công Kích</div>
                        )}
                        {item.stats.defense && (
                          <div className="text-blue-400">+{item.stats.defense} Phòng Thủ</div>
                        )}
                        {item.stats.luck && (
                          <div className="text-yellow-400">+{item.stats.luck} May Mắn</div>
                        )}
                        {item.stats.agility && (
                          <div className={item.stats.agility > 0 ? "text-green-400" : "text-red-400"}>
                            {item.stats.agility > 0 ? "+" : ""}{item.stats.agility} Nhanh Nhẹn
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mb-3">
                      {item.description}
                    </div>

                    <div className="flex gap-2">
                      {['weapon', 'armor', 'pants', 'hair', 'hat', 'chest', 'treasure', 'ring', 'bracelet', 'necklace', 'set'].includes(item.type) ? (
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
              {filteredInventory.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  Không có vật phẩm phù hợp với class và giới tính của bạn
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default InventorySystem;
