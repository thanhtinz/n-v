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
  Save,
  X,
  Sword,
  Shield,
  Heart,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';

interface GameItem {
  id: number;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material' | 'pet' | 'plant' | 'event' | 'food';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  iconType: 'image';
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
  price?: number;
  sellPrice?: number;
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
      icon: '/images/items/sword_dragon.png',
      iconType: 'image',
      level: 50,
      stats: { attack: 500, speed: 20 },
      effects: ['Hỏa Long Kiếm', 'Tăng 10% sát thương chí mạng'],
      price: 50000,
      sellPrice: 25000
    },
    {
      id: 2,
      name: 'Giáp Thiên Long',
      description: 'Bộ giáp được rèn từ vảy rồng thiêng',
      type: 'armor',
      rarity: 'epic',
      icon: '/images/items/armor_dragon.png',
      iconType: 'image',
      level: 45,
      stats: { defense: 300, hp: 1000 },
      effects: ['Phản đòn 5%', 'Giảm sát thương 15%'],
      price: 30000,
      sellPrice: 15000
    },
    {
      id: 3,
      name: 'Thú Cưng Mèo Linh',
      description: 'Chú mèo linh thiêng có thể hỗ trợ chiến đấu',
      type: 'pet',
      rarity: 'rare',
      icon: '/images/items/pet_cat.png',
      iconType: 'image',
      level: 25,
      stats: { luck: 50, speed: 30 },
      effects: ['Tăng may mắn', 'Tự động thu thập vật phẩm'],
      price: 10000,
      sellPrice: 5000
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GameItem | null>(null);
  const [formData, setFormData] = useState<Partial<GameItem>>({
    name: '',
    description: '',
    type: 'weapon',
    rarity: 'common',
    icon: '',
    iconType: 'image',
    level: 1,
    stats: {},
    effects: [],
    price: 0,
    sellPrice: 0
  });

  const itemTypes = [
    { value: 'weapon', label: 'Vũ Khí' },
    { value: 'armor', label: 'Giáp' },
    { value: 'accessory', label: 'Phụ Kiện' },
    { value: 'consumable', label: 'Tiêu Hao' },
    { value: 'material', label: 'Nguyên Liệu' },
    { value: 'pet', label: 'Thú Cưng' },
    { value: 'plant', label: 'Cây Cối' },
    { value: 'event', label: 'Sự Kiện' },
    { value: 'food', label: 'Thức Ăn' }
  ];

  const rarityColors = {
    common: 'bg-gray-500',
    uncommon: 'bg-green-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500'
  };

  const statIcons = {
    attack: Sword,
    defense: Shield,
    hp: Heart,
    mp: Zap,
    speed: TrendingUp,
    luck: Star
  };

  const getItemIcon = (item: GameItem) => {
    return (
      <img 
        src={item.icon} 
        alt={item.name}
        className="w-4 h-4 rounded object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/images/placeholder-item.png';
        }}
      />
    );
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      addNotification('Vui lòng điền đầy đủ thông tin!', 'warning');
      return;
    }

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
    
    resetForm();
  };

  const resetForm = () => {
    setShowAddModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      type: 'weapon',
      rarity: 'common',
      icon: '',
      iconType: 'image',
      level: 1,
      stats: {},
      effects: [],
      price: 0,
      sellPrice: 0
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

  const updateStat = (statName: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statName]: value || undefined
      }
    }));
  };

  const updateEffect = (index: number, value: string) => {
    const newEffects = [...(formData.effects || [])];
    if (value.trim()) {
      newEffects[index] = value;
    } else {
      newEffects.splice(index, 1);
    }
    setFormData(prev => ({ ...prev, effects: newEffects }));
  };

  const addEffect = () => {
    setFormData(prev => ({
      ...prev,
      effects: [...(prev.effects || []), '']
    }));
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
                  <TableCell>
                    {item.price ? `${item.price.toLocaleString()} Bạc` : 'N/A'}
                  </TableCell>
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
          <div className="bg-background p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'Chỉnh Sửa' : 'Thêm'} Vật Phẩm
              </h3>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
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
                    rows={3}
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

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Level</label>
                    <Input
                      type="number"
                      value={formData.level}
                      onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Giá Mua</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Giá Bán</label>
                    <Input
                      type="number"
                      value={formData.sellPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, sellPrice: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Effects */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Chỉ Số (Stats)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(statIcons).map(([statName, IconComponent]) => (
                      <div key={statName} className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm min-w-12 capitalize">{statName}:</span>
                        <Input
                          type="number"
                          value={formData.stats?.[statName as keyof typeof formData.stats] || ''}
                          onChange={(e) => updateStat(statName, parseInt(e.target.value))}
                          placeholder="0"
                          className="h-8"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Hiệu Ứng Đặc Biệt</label>
                  <div className="space-y-2">
                    {(formData.effects || []).map((effect, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={effect}
                          onChange={(e) => updateEffect(index, e.target.value)}
                          placeholder={`Hiệu ứng ${index + 1}...`}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateEffect(index, '')}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addEffect}
                      className="w-full"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Thêm Hiệu Ứng
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Icon URL</label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="URL hình ảnh icon..."
                  />
                  {formData.icon && (
                    <div className="mt-2">
                      <img src={formData.icon} alt="Preview" className="w-16 h-16 rounded border" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={resetForm}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-1" />
                {editingItem ? 'Cập Nhật' : 'Thêm'}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminItemManager;
