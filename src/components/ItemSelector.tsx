
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Package,
  Search,
  Plus,
  Check,
  Sword,
  Shield,
  Gem,
  Gift,
  TreeDeciduous,
  TreePalm,
  Flower,
  Flower2,
  Shrub,
  Carrot,
  Banana,
  Apple,
  Egg,
  Fish,
  Cat,
  Dog
} from 'lucide-react';

interface GameItem {
  id: number;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material' | 'pet' | 'plant' | 'event' | 'food';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  iconType: 'lucide' | 'image';
  price: number;
  level: number;
}

interface ItemSelectorProps {
  onSelect: (item: GameItem) => void;
  selectedItems?: GameItem[];
  multiSelect?: boolean;
  trigger?: React.ReactNode;
  title?: string;
}

const ItemSelector = ({ 
  onSelect, 
  selectedItems = [], 
  multiSelect = false, 
  trigger,
  title = "Chọn Vật Phẩm"
}: ItemSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Sample items from the inventory system
  const availableItems: GameItem[] = [
    {
      id: 1,
      name: 'Kiếm Thần Long',
      description: 'Thanh kiếm huyền thoại với sức mạnh của rồng thần',
      type: 'weapon',
      rarity: 'legendary',
      icon: 'Sword',
      iconType: 'lucide',
      price: 50000,
      level: 50
    },
    {
      id: 2,
      name: 'Giáp Thiên Long',
      description: 'Bộ giáp được rèn từ vảy rồng thiêng',
      type: 'armor',
      rarity: 'epic',
      icon: 'Shield',
      iconType: 'lucide',
      price: 30000,
      level: 45
    },
    {
      id: 3,
      name: 'Thú Cưng Mèo Linh',
      description: 'Chú mèo linh thiêng có thể hỗ trợ chiến đấu',
      type: 'pet',
      rarity: 'rare',
      icon: 'Cat',
      iconType: 'lucide',
      price: 15000,
      level: 25
    },
    {
      id: 4,
      name: 'Cây Linh Chi Thiên Niên',
      description: 'Cây linh chi quý hiếm mọc trong thiên niên',
      type: 'plant',
      rarity: 'legendary',
      icon: 'TreeDeciduous',
      iconType: 'lucide',
      price: 100000,
      level: 60
    },
    {
      id: 5,
      name: 'Quả Táo Thần Kỳ',
      description: 'Quả táo từ vườn thiên đường, có thể hồi phục toàn bộ HP',
      type: 'food',
      rarity: 'epic',
      icon: 'Apple',
      iconType: 'lucide',
      price: 5000,
      level: 10
    },
    {
      id: 6,
      name: 'Hoa Sen Bạch Ngọc',
      description: 'Hoa sen quý hiếm từ ao thiêng, dùng để luyện đan',
      type: 'material',
      rarity: 'rare',
      icon: 'Flower',
      iconType: 'lucide',
      price: 8000,
      level: 30
    },
    {
      id: 7,
      name: 'Rồng Mini Sự Kiện',
      description: 'Thú cưng đặc biệt từ sự kiện Tết Nguyên Đán',
      type: 'event',
      rarity: 'legendary',
      icon: 'Gift',
      iconType: 'lucide',
      price: 0,
      level: 1
    },
    {
      id: 8,
      name: 'Chuối Vàng Thiên Đường',
      description: 'Chuối từ thiên đường tăng EXP',
      type: 'food',
      rarity: 'rare',
      icon: 'Banana',
      iconType: 'lucide',
      price: 3000,
      level: 5
    },
    {
      id: 9,
      name: 'Chó Thần Canh Gác',
      description: 'Chú chó thần bảo vệ chủ nhân',
      type: 'pet',
      rarity: 'epic',
      icon: 'Dog',
      iconType: 'lucide',
      price: 25000,
      level: 35
    },
    {
      id: 10,
      name: 'Cây Dừa Linh Thần',
      description: 'Cây dừa từ đảo thiêng',
      type: 'plant',
      rarity: 'epic',
      icon: 'TreePalm',
      iconType: 'lucide',
      price: 40000,
      level: 40
    }
  ];

  const lucideIcons = {
    Sword, Shield, Gem, Gift, Package, Cat, Dog, TreeDeciduous, TreePalm, 
    Flower, Flower2, Shrub, Apple, Banana, Carrot, Egg, Fish
  };

  const rarityColors = {
    common: 'bg-gray-500',
    uncommon: 'bg-green-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500'
  };

  const itemTypes = [
    { value: 'all', label: 'Tất Cả' },
    { value: 'weapon', label: 'Vũ Khí' },
    { value: 'armor', label: 'Giáp' },
    { value: 'pet', label: 'Thú Cưng' },
    { value: 'plant', label: 'Cây Cối' },
    { value: 'food', label: 'Thức Ăn' },
    { value: 'material', label: 'Nguyên Liệu' },
    { value: 'event', label: 'Sự Kiện' }
  ];

  const getItemIcon = (item: GameItem) => {
    if (item.iconType === 'lucide') {
      const IconComponent = lucideIcons[item.icon as keyof typeof lucideIcons] || Package;
      return <IconComponent className="w-4 h-4" />;
    } else {
      return (
        <img 
          src={item.icon} 
          alt={item.name}
          className="w-4 h-4 rounded object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      );
    }
  };

  const filteredItems = availableItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const isSelected = (item: GameItem) => {
    return selectedItems.some(selected => selected.id === item.id);
  };

  const handleSelect = (item: GameItem) => {
    onSelect(item);
    if (!multiSelect) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Chọn Vật Phẩm
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95%] max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm vật phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 border rounded md:w-48"
            >
              {itemTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <Card className="p-3">
              <h4 className="font-medium mb-2">Đã Chọn ({selectedItems.length})</h4>
              <div className="flex flex-wrap gap-2">
                {selectedItems.map(item => (
                  <Badge key={item.id} variant="outline" className="flex items-center gap-1">
                    {getItemIcon(item)}
                    {item.name}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {filteredItems.map(item => (
              <Card 
                key={item.id} 
                className={`p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                  isSelected(item) ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                      {getItemIcon(item)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Lv.{item.level}</div>
                    </div>
                  </div>
                  {isSelected(item) && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`text-xs ${rarityColors[item.rarity]}`}>
                    {item.rarity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground mb-2">
                  {item.description}
                </div>

                <div className="text-xs font-medium">
                  {item.price.toLocaleString()} Bạc
                </div>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Không tìm thấy vật phẩm nào
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemSelector;
