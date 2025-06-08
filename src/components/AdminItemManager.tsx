import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGameState } from '@/hooks/useGameState';
import { 
  Package,
  Plus,
  Edit,
  Trash2,
  Upload,
  Star,
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
  stats: {
    attack?: number;
    defense?: number;
    hp?: number;
    mp?: number;
    speed?: number;
    luck?: number;
  };
  effects?: string[];
}

const AdminItemManager = () => {
  const { addNotification } = useGameState();
  const [items, setItems] = useState<GameItem[]>([
    {
      id: 1,
      name: 'Kiếm Thần Long',
      description: 'Thanh kiếm huyền thoại với sức mạnh của rồng thần',
      type: 'weapon',
      rarity: 'legendary',
      icon: 'Sword',
      iconType: 'lucide',
      price: 50000,
      level: 50,
      stats: { attack: 500, speed: 20 },
      effects: ['Hỏa Long Kiếm', 'Tăng 10% sát thương chí mạng']
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
      level: 45,
      stats: { defense: 300, hp: 1000 },
      effects: ['Phản đòn 5%', 'Giảm sát thương 15%']
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
      level: 25,
      stats: { luck: 50, speed: 30 },
      effects: ['Tăng may mắn', 'Tự động thu thập vật phẩm']
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
      level: 60,
      stats: { hp: 2000, mp: 1000 },
      effects: ['Hồi phục HP/MP theo thời gian', 'Tăng tốc độ tu luyện']
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
      level: 10,
      stats: { hp: 500 },
      effects: ['Hồi phục 100% HP', 'Tăng tạm thời phòng thủ']
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
      level: 30,
      stats: {},
      effects: ['Nguyên liệu luyện đan cấp cao', 'Tăng thành công luyện đan']
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
      level: 1,
      stats: { luck: 100, attack: 50 },
      effects: ['Chỉ có trong sự kiện', 'Tăng EXP thu được']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GameItem | null>(null);
  const [formData, setFormData] = useState<Partial<GameItem>>({
    name: '',
    description: '',
    type: 'weapon',
    rarity: 'common',
    icon: 'Package',
    iconType: 'lucide',
    price: 0,
    level: 1,
    stats: {},
    effects: []
  });

  const itemTypes = [
    { value: 'weapon', label: 'Vũ Khí', icon: Sword },
    { value: 'armor', label: 'Giáp', icon: Shield },
    { value: 'accessory', label: 'Phụ Kiện', icon: Gem },
    { value: 'consumable', label: 'Tiêu Hao', icon: Gift },
    { value: 'material', label: 'Nguyên Liệu', icon: Package },
    { value: 'pet', label: 'Thú Cưng', icon: Cat },
    { value: 'plant', label: 'Cây Cối', icon: TreeDeciduous },
    { value: 'event', label: 'Sự Kiện', icon: Gift },
    { value: 'food', label: 'Thức Ăn', icon: Apple }
  ];

  const lucideIcons = [
    { value: 'Sword', label: 'Kiếm', component: Sword },
    { value: 'Shield', label: 'Khiên', component: Shield },
    { value: 'Gem', label: 'Ngọc', component: Gem },
    { value: 'Gift', label: 'Quà', component: Gift },
    { value: 'Package', label: 'Hộp', component: Package },
    { value: 'Cat', label: 'Mèo', component: Cat },
    { value: 'Dog', label: 'Chó', component: Dog },
    { value: 'TreeDeciduous', label: 'Cây Lá', component: TreeDeciduous },
    { value: 'TreePalm', label: 'Cây Dừa', component: TreePalm },
    { value: 'Flower', label: 'Hoa', component: Flower },
    { value: 'Flower2', label: 'Hoa 2', component: Flower2 },
    { value: 'Shrub', label: 'Bụi Cây', component: Shrub },
    { value: 'Apple', label: 'Táo', component: Apple },
    { value: 'Banana', label: 'Chuối', component: Banana },
    { value: 'Carrot', label: 'Cà Rốt', component: Carrot },
    { value: 'Egg', label: 'Trứng', component: Egg },
    { value: 'Fish', label: 'Cá', component: Fish }
  ];

  const rarityColors = {
    common: 'bg-gray-500',
    uncommon: 'bg-green-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500'
  };

  const getItemIcon = (item: GameItem) => {
    if (item.iconType === 'lucide') {
      const IconComponent = lucideIcons.find(icon => icon.value === item.icon)?.component || Package;
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

  const handleSubmit = () => {
    if (editingItem) {
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...formData, id: editingItem.id } as GameItem : item
      ));
      addNotification('Đã cập nhật vật phẩm thành công!', 'success');
    } else {
      const newItem: GameItem = {
        ...formData,
        id: Date.now()
      } as GameItem;
      setItems(prev => [...prev, newItem]);
      addNotification('Đã thêm vật phẩm mới thành công!', 'success');
    }
    
    setShowAddModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      type: 'weapon',
      rarity: 'common',
      icon: 'Package',
      iconType: 'lucide',
      price: 0,
      level: 1,
      stats: {},
      effects: []
    });
  };

  const handleEdit = (item: GameItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    addNotification('Đã xóa vật phẩm thành công!', 'success');
  };

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          icon: e.target?.result as string,
          iconType: 'image'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Package className="w-5 h-5" />
          Quản Lý Vật Phẩm
        </h3>
        <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-1" />
          Thêm Vật Phẩm
        </Button>
      </div>

      <Card className="p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Độ Hiếm</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                      {getItemIcon(item)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {itemTypes.find(t => t.value === item.type)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={rarityColors[item.rarity]}>
                      {item.rarity}
                    </Badge>
                  </TableCell>
                  <TableCell>Lv.{item.level}</TableCell>
                  <TableCell>{item.price.toLocaleString()} Bạc</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {showAddModal && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Chỉnh Sửa' : 'Thêm'} Vật Phẩm
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên Vật Phẩm</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nhập tên vật phẩm..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mô Tả</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Loại</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    {itemTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Độ Hiếm</label>
                  <select
                    value={formData.rarity}
                    onChange={(e) => setFormData(prev => ({ ...prev, rarity: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Icon</label>
                <div className="space-y-2">
                  <select
                    value={formData.iconType}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      iconType: e.target.value as 'lucide' | 'image',
                      icon: e.target.value === 'lucide' ? 'Package' : ''
                    }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="lucide">Icon Có Sẵn</option>
                    <option value="image">Upload Hình Ảnh</option>
                  </select>
                  
                  {formData.iconType === 'lucide' ? (
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full p-2 border rounded"
                    >
                      {lucideIcons.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleIconUpload}
                      />
                      <Button size="sm" variant="outline">
                        <Upload className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Level Yêu Cầu</label>
                  <Input
                    type="number"
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Giá Bán</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit}>
                  {editingItem ? 'Cập Nhật' : 'Thêm'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminItemManager;
