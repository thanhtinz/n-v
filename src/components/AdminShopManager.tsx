
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGameState } from '@/hooks/useGameState';
import ItemSelector from './ItemSelector';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  MoreVertical,
  ShoppingCart,
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

interface ShopItem {
  item: GameItem;
  quantity: number;
  discountPrice?: number;
}

interface Shop {
  id: number;
  name: string;
  category: string;
  items: ShopItem[];
  revenue: number;
  status: 'active' | 'inactive';
  lastUpdate: string;
}

const AdminShopManager = () => {
  const { addNotification } = useGameState();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'weapon',
    items: [] as ShopItem[]
  });

  const [shops, setShops] = useState<Shop[]>([
    { 
      id: 1, 
      name: 'Shop Vũ Khí', 
      category: 'weapon', 
      items: [], 
      revenue: 2500000, 
      status: 'active', 
      lastUpdate: '2024-06-08' 
    },
    { 
      id: 2, 
      name: 'Shop Trang Phục', 
      category: 'armor', 
      items: [], 
      revenue: 1800000, 
      status: 'active', 
      lastUpdate: '2024-06-07' 
    },
    { 
      id: 3, 
      name: 'Shop Linh Thạch', 
      category: 'currency', 
      items: [], 
      revenue: 5000000, 
      status: 'active', 
      lastUpdate: '2024-06-08' 
    },
    { 
      id: 4, 
      name: 'Shop Event', 
      category: 'special', 
      items: [], 
      revenue: 800000, 
      status: 'inactive', 
      lastUpdate: '2024-06-05' 
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
    addNotification(`Đã thêm ${item.name} vào shop`, 'success');
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

  const handleItemPriceChange = (itemId: number, discountPrice: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(i => 
        i.item.id === itemId 
          ? { ...i, discountPrice: discountPrice || undefined }
          : i
      )
    }));
  };

  const handleSubmit = () => {
    const newShop: Shop = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      items: formData.items,
      revenue: 0,
      status: 'active',
      lastUpdate: new Date().toISOString().split('T')[0]
    };
    
    setShops(prev => [...prev, newShop]);
    addNotification('Đã tạo shop mới thành công!', 'success');
    setShowAddDialog(false);
    setFormData({
      name: '',
      category: 'weapon',
      items: []
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      weapon: 'bg-red-100 text-red-700',
      armor: 'bg-blue-100 text-blue-700',
      currency: 'bg-yellow-100 text-yellow-700',
      special: 'bg-purple-100 text-purple-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Quản Lý Shop
          </h2>
          <p className="text-sm text-muted-foreground">Quản lý tất cả các cửa hàng trong game</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Shop Mới
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo Shop Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tên Shop</label>
                  <Input 
                    placeholder="Tên shop..." 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Danh Mục</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="weapon">Vũ Khí</option>
                    <option value="armor">Trang Phục</option>
                    <option value="consumable">Tiêu Hao</option>
                    <option value="material">Nguyên Liệu</option>
                    <option value="pet">Thú Cưng</option>
                    <option value="plant">Cây Cối</option>
                    <option value="special">Đặc Biệt</option>
                  </select>
                </div>
              </div>

              {/* Items Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Vật Phẩm Trong Shop</label>
                  <ItemSelector 
                    onSelect={handleAddItem}
                    multiSelect={true}
                    title="Chọn Vật Phẩm Cho Shop"
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
                    <div className="space-y-3">
                      {formData.items.map(({ item, quantity, discountPrice }) => (
                        <div key={item.id} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                                <Package className="w-3 h-3" />
                              </div>
                              <div>
                                <span className="text-sm font-medium">{item.name}</span>
                                <div className="text-xs text-muted-foreground">
                                  Giá gốc: {item.price.toLocaleString()} Bạc
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-muted-foreground">Số Lượng</label>
                              <Input
                                type="number"
                                value={quantity}
                                onChange={(e) => handleItemQuantityChange(item.id, parseInt(e.target.value) || 0)}
                                className="h-8 text-xs"
                                min="0"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Giá Bán (để trống = giá gốc)</label>
                              <Input
                                type="number"
                                value={discountPrice || ''}
                                onChange={(e) => handleItemPriceChange(item.id, parseInt(e.target.value) || 0)}
                                className="h-8 text-xs"
                                placeholder={item.price.toString()}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit}>
                  Tạo Shop
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm shop..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Bộ Lọc
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-green-600">{shops.filter(s => s.status === 'active').length}</div>
            <div className="text-xs text-muted-foreground">Shop Hoạt Động</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-blue-600">{shops.reduce((acc, shop) => acc + shop.items.length, 0)}</div>
            <div className="text-xs text-muted-foreground">Tổng Vật Phẩm</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-yellow-600">{formatCurrency(shops.reduce((acc, shop) => acc + shop.revenue, 0))}</div>
            <div className="text-xs text-muted-foreground">Tổng Doanh Thu</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-purple-600">{new Set(shops.map(s => s.category)).size}</div>
            <div className="text-xs text-muted-foreground">Danh Mục</div>
          </div>
        </Card>
      </div>

      {/* Mobile Cards View */}
      <div className="block md:hidden space-y-3">
        {filteredShops.map((shop) => (
          <Card key={shop.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{shop.name}</h3>
                <Badge className={`text-xs mt-1 ${getCategoryColor(shop.category)}`}>
                  {shop.category}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Vật phẩm:</span>
                <span className="ml-1 font-medium">{shop.items.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Doanh thu:</span>
                <span className="ml-1 font-medium">{formatCurrency(shop.revenue)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Trạng thái:</span>
                <Badge className={`ml-1 text-xs ${shop.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {shop.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Cập nhật:</span>
                <span className="ml-1 font-medium">{shop.lastUpdate}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-3 h-3 mr-1" />
                Xem
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="w-3 h-3 mr-1" />
                Sửa
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên Shop</TableHead>
              <TableHead>Danh Mục</TableHead>
              <TableHead>Vật Phẩm</TableHead>
              <TableHead>Doanh Thu</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Cập Nhật</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell className="font-medium">{shop.name}</TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(shop.category)}>
                    {shop.category}
                  </Badge>
                </TableCell>
                <TableCell>{shop.items.length}</TableCell>
                <TableCell>{formatCurrency(shop.revenue)}</TableCell>
                <TableCell>
                  <Badge className={shop.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                    {shop.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                  </Badge>
                </TableCell>
                <TableCell>{shop.lastUpdate}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3" />
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

export default AdminShopManager;
