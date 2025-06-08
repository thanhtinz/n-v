
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ItemSelector from '@/components/ItemSelector';
import { useItemData, GameItem } from '@/hooks/useItemData';
import { 
  Gift, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X,
  Copy,
  Eye,
  Users,
  Calendar,
  Star
} from 'lucide-react';

interface GiftCode {
  id: number;
  code: string;
  type: 'single' | 'multi';
  usageLimit: number;
  usedCount: number;
  items: Array<{
    item: GameItem;
    quantity: number;
  }>;
  expiryDate: string;
  isActive: boolean;
  description: string;
  createdDate: string;
  createdBy: string;
}

const AdminGiftCodeManager = () => {
  const { items } = useItemData();
  
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>([
    {
      id: 1,
      code: 'WELCOME2024',
      type: 'multi',
      usageLimit: 1000,
      usedCount: 245,
      items: [
        {
          item: items[0] || {
            id: 1,
            name: 'Kiếm Thần Long',
            description: 'Thanh kiếm huyền thoại',
            type: 'weapon',
            rarity: 'legendary',
            icon: '/images/items/sword_dragon.png',
            iconType: 'image',
            level: 50
          },
          quantity: 1
        }
      ],
      expiryDate: '2024-12-31',
      isActive: true,
      description: 'Gift code chào mừng người chơi mới',
      createdDate: '2024-06-01',
      createdBy: 'Admin'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<Array<{ item: GameItem; quantity: number }>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'single' as 'single' | 'multi',
    usageLimit: 1,
    expiryDate: '',
    description: ''
  });

  const handleAddItem = (item: GameItem) => {
    const existingIndex = selectedItems.findIndex(i => i.item.id === item.id);
    if (existingIndex >= 0) {
      setSelectedItems(prev => prev.map((selected, index) => 
        index === existingIndex 
          ? { ...selected, quantity: selected.quantity + 1 }
          : selected
      ));
    } else {
      setSelectedItems(prev => [...prev, { item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(prev => prev.filter(selected => selected.item.id !== itemId));
  };

  const handleQuantityChange = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setSelectedItems(prev => prev.map(selected => 
      selected.item.id === itemId 
        ? { ...selected, quantity }
        : selected
    ));
  };

  const handleSave = () => {
    if (!formData.code || selectedItems.length === 0) return;

    const newGiftCode: GiftCode = {
      id: editingId || Date.now(),
      code: formData.code,
      type: formData.type,
      usageLimit: formData.usageLimit,
      usedCount: editingId ? giftCodes.find(g => g.id === editingId)?.usedCount || 0 : 0,
      items: selectedItems,
      expiryDate: formData.expiryDate,
      isActive: true,
      description: formData.description,
      createdDate: editingId ? giftCodes.find(g => g.id === editingId)?.createdDate || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      createdBy: 'Admin'
    };

    if (editingId) {
      setGiftCodes(prev => prev.map(g => g.id === editingId ? newGiftCode : g));
    } else {
      setGiftCodes(prev => [...prev, newGiftCode]);
    }

    handleCancel();
  };

  const handleEdit = (giftCode: GiftCode) => {
    setEditingId(giftCode.id);
    setFormData({
      code: giftCode.code,
      type: giftCode.type,
      usageLimit: giftCode.usageLimit,
      expiryDate: giftCode.expiryDate,
      description: giftCode.description
    });
    setSelectedItems(giftCode.items);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      code: '',
      type: 'single',
      usageLimit: 1,
      expiryDate: '',
      description: ''
    });
    setSelectedItems([]);
  };

  const handleDelete = (id: number) => {
    setGiftCodes(prev => prev.filter(g => g.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setGiftCodes(prev => prev.map(g => 
      g.id === id ? { ...g, isActive: !g.isActive } : g
    ));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 text-gray-400';
      case 'rare': return 'border-blue-400 text-blue-400';
      case 'epic': return 'border-purple-400 text-purple-400';
      case 'legendary': return 'border-yellow-400 text-yellow-400';
      default: return 'border-gray-400 text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-cultivator-gold flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Quản Lý Gift Code
          </h3>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo Gift Code
          </Button>
        </div>

        {isCreating && (
          <Card className="p-4 mb-4 bg-muted/20">
            <h4 className="font-medium mb-3">
              {editingId ? 'Chỉnh Sửa Gift Code' : 'Tạo Gift Code Mới'}
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="code">Mã Gift Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="VD: WELCOME2024"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Loại</Label>
                <Select value={formData.type} onValueChange={(value: 'single' | 'multi') => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Sử dụng 1 lần</SelectItem>
                    <SelectItem value="multi">Sử dụng nhiều lần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="usageLimit">Giới hạn sử dụng</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: parseInt(e.target.value) || 1 }))}
                  min="1"
                />
              </div>
              
              <div>
                <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả gift code..."
              />
            </div>
            
            <div className="mb-4">
              <Label>Vật phẩm đã chọn ({selectedItems.length})</Label>
              {selectedItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {selectedItems.map((selected) => (
                    <div key={selected.item.id} className="flex items-center justify-between p-2 bg-card rounded border">
                      <div className="flex items-center gap-2">
                        <img 
                          src={selected.item.icon} 
                          alt={selected.item.name}
                          className="w-6 h-6 rounded object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-item.png';
                          }}
                        />
                        <span className="text-sm">{selected.item.name}</span>
                        <Badge variant="outline" className={getRarityColor(selected.item.rarity)}>
                          {selected.item.rarity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={selected.quantity}
                          onChange={(e) => handleQuantityChange(selected.item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-6 text-xs"
                          min="1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveItem(selected.item.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <ItemSelector onSelectItem={handleAddItem} />
            
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSave} disabled={!formData.code || selectedItems.length === 0}>
                <Check className="w-4 h-4 mr-2" />
                {editingId ? 'Cập Nhật' : 'Tạo'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
            </div>
          </Card>
        )}

        <div className="space-y-2">
          {giftCodes.map((giftCode) => (
            <Card key={giftCode.id} className="p-3 bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <code className="bg-card px-2 py-1 rounded text-sm font-mono">
                    {giftCode.code}
                  </code>
                  <Badge variant={giftCode.isActive ? "default" : "secondary"}>
                    {giftCode.isActive ? 'Hoạt động' : 'Tạm dừng'}
                  </Badge>
                  <Badge variant="outline">
                    {giftCode.type === 'single' ? '1 lần' : 'Nhiều lần'}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(giftCode)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleToggleActive(giftCode.id)}
                  >
                    {giftCode.isActive ? <Eye className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDelete(giftCode.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">
                {giftCode.description}
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {giftCode.usedCount}/{giftCode.usageLimit}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  HSD: {giftCode.expiryDate}
                </span>
                <span>{giftCode.items.length} vật phẩm</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {giftCode.items.slice(0, 3).map((selected, index) => (
                  <div key={index} className="flex items-center gap-1 bg-card px-2 py-1 rounded text-xs">
                    <img 
                      src={selected.item.icon} 
                      alt={selected.item.name}
                      className="w-4 h-4 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-item.png';
                      }}
                    />
                    <span>{selected.item.name}</span>
                    <span className="text-muted-foreground">x{selected.quantity}</span>
                  </div>
                ))}
                {giftCode.items.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{giftCode.items.length - 3} khác</span>
                )}
              </div>
            </Card>
          ))}
          
          {giftCodes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có gift code nào</p>
              <p className="text-sm">Nhấn "Tạo Gift Code" để bắt đầu</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminGiftCodeManager;
