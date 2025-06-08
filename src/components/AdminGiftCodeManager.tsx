
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGameState } from '@/hooks/useGameState';
import ItemSelector from './ItemSelector';
import { 
  Gift,
  Plus,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Users,
  Package,
  X
} from 'lucide-react';

interface GameItem {
  id: number;
  name: string;
  description: string;
  type: string;
  rarity: string;
  icon: string;
  iconType: 'lucide' | 'image';
  price: number;
  level: number;
}

interface GiftCode {
  id: number;
  code: string;
  name: string;
  description: string;
  rewards: {
    silver?: number;
    exp?: number;
    items?: Array<{ item: GameItem; quantity: number }>;
  };
  usageLimit: number;
  usedCount: number;
  expireDate: string;
  status: 'active' | 'expired' | 'disabled';
  createdAt: string;
}

const AdminGiftCodeManager = () => {
  const { addNotification } = useGameState();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCode, setEditingCode] = useState<GiftCode | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    silver: 0,
    exp: 0,
    items: [] as Array<{ item: GameItem; quantity: number }>,
    usageLimit: 100,
    expireDate: ''
  });

  const [giftCodes] = useState<GiftCode[]>([
    {
      id: 1,
      code: 'WELCOME2024',
      name: 'Gift Code Chào Mừng',
      description: 'Quà tặng cho người chơi mới',
      rewards: {
        silver: 10000,
        exp: 5000,
        items: []
      },
      usageLimit: 1000,
      usedCount: 245,
      expireDate: '2024-12-31',
      status: 'active',
      createdAt: '2024-06-01'
    },
    {
      id: 2,
      code: 'EVENT2024',
      name: 'Sự Kiện Hè 2024',
      description: 'Gift code đặc biệt cho sự kiện hè',
      rewards: {
        silver: 50000,
        exp: 10000,
        items: []
      },
      usageLimit: 500,
      usedCount: 89,
      expireDate: '2024-08-31',
      status: 'active',
      createdAt: '2024-06-01'
    }
  ]);

  const handleAddItem = (item: GameItem) => {
    const existingItem = formData.items.find(i => i.item.id === item.id);
    if (existingItem) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(i => 
          i.item.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { item, quantity: 1 }]
      }));
    }
    addNotification(`Đã thêm ${item.name} vào phần thưởng`, 'success');
  };

  const handleRemoveItem = (itemId: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.item.id !== itemId)
    }));
  };

  const handleItemQuantityChange = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(i => 
        i.item.id === itemId 
          ? { ...i, quantity }
          : i
      )
    }));
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  const handleSubmit = () => {
    addNotification(
      editingCode ? 'Đã cập nhật gift code!' : 'Đã tạo gift code mới!', 
      'success'
    );
    setShowAddDialog(false);
    setEditingCode(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      silver: 0,
      exp: 0,
      items: [],
      usageLimit: 100,
      expireDate: ''
    });
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    addNotification(`Đã copy gift code: ${code}`, 'success');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Quản Lý Gift Code
          </h2>
          <p className="text-sm text-muted-foreground">Tạo và quản lý mã quà tặng</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Tạo Gift Code
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCode ? 'Chỉnh Sửa' : 'Tạo'} Gift Code
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Mã Gift Code</label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.code}
                      onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="Nhập mã..."
                    />
                    <Button onClick={generateRandomCode} variant="outline" size="sm">
                      Tạo
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tên Gift Code</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Tên gift code..."
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Mô Tả</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Mô tả gift code..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Bạc Thưởng</label>
                  <Input
                    type="number"
                    value={formData.silver}
                    onChange={(e) => setFormData(prev => ({ ...prev, silver: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">EXP Thưởng</label>
                  <Input
                    type="number"
                    value={formData.exp}
                    onChange={(e) => setFormData(prev => ({ ...prev, exp: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Giới Hạn Sử Dụng</label>
                  <Input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: parseInt(e.target.value) || 0 }))}
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Ngày Hết Hạn</label>
                <Input
                  type="date"
                  value={formData.expireDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expireDate: e.target.value }))}
                />
              </div>

              {/* Item Rewards Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Vật Phẩm Thưởng</label>
                  <ItemSelector 
                    onSelect={handleAddItem}
                    multiSelect={true}
                    title="Chọn Vật Phẩm Thưởng"
                    trigger={
                      <Button variant="outline" size="sm">
                        <Package className="w-4 h-4 mr-2" />
                        Thêm Vật Phẩm
                      </Button>
                    }
                  />
                </div>
                
                {formData.items.length > 0 && (
                  <Card className="p-3">
                    <div className="space-y-2">
                      {formData.items.map(({ item, quantity }) => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                              <Package className="w-3 h-3" />
                            </div>
                            <span className="text-sm font-medium">{item.name}</span>
                            <Badge variant="outline" className="text-xs">
                              Lv.{item.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={quantity}
                              onChange={(e) => handleItemQuantityChange(item.id, parseInt(e.target.value) || 0)}
                              className="w-16 h-8 text-xs"
                              min="1"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit}>
                  {editingCode ? 'Cập Nhật' : 'Tạo Gift Code'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-green-600">
              {giftCodes.filter(c => c.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground">Đang Hoạt Động</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-blue-600">
              {giftCodes.reduce((acc, code) => acc + code.usedCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Lượt Sử Dụng</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-yellow-600">
              {giftCodes.reduce((acc, code) => acc + code.usageLimit, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Tổng Giới Hạn</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-purple-600">
              {Math.round(giftCodes.reduce((acc, code) => acc + (code.usedCount / code.usageLimit * 100), 0) / giftCodes.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Tỷ Lệ Sử Dụng</div>
          </div>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-3">
        {giftCodes.map((code) => (
          <Card key={code.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{code.name}</h3>
                <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded mt-1">
                  {code.code}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(code.code)}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <span className="text-muted-foreground">Sử dụng:</span>
                <span className="ml-1 font-medium">{code.usedCount}/{code.usageLimit}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Hết hạn:</span>
                <span className="ml-1 font-medium">{code.expireDate}</span>
              </div>
            </div>
            
            <Badge className={code.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
              {code.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
            </Badge>
          </Card>
        ))}
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên & Mã</TableHead>
              <TableHead>Phần Thưởng</TableHead>
              <TableHead>Sử Dụng</TableHead>
              <TableHead>Hết Hạn</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {giftCodes.map((code) => (
              <TableRow key={code.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{code.name}</div>
                    <div className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded mt-1 inline-block">
                      {code.code}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1">
                    {code.rewards.silver && <div>💰 {code.rewards.silver.toLocaleString()} bạc</div>}
                    {code.rewards.exp && <div>⭐ {code.rewards.exp.toLocaleString()} EXP</div>}
                    {code.rewards.items?.length && <div>🎁 {code.rewards.items.length} vật phẩm</div>}
                  </div>
                </TableCell>
                <TableCell>{code.usedCount}/{code.usageLimit}</TableCell>
                <TableCell>{code.expireDate}</TableCell>
                <TableCell>
                  <Badge className={code.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                    {code.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(code.code)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminGiftCodeManager;
