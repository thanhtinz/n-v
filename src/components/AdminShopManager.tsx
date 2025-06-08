
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

const AdminShopManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const shops = [
    { id: 1, name: 'Shop Vũ Khí', category: 'weapon', items: 150, revenue: 2500000, status: 'active', lastUpdate: '2024-06-08' },
    { id: 2, name: 'Shop Trang Phục', category: 'armor', items: 200, revenue: 1800000, status: 'active', lastUpdate: '2024-06-07' },
    { id: 3, name: 'Shop Linh Thạch', category: 'currency', items: 50, revenue: 5000000, status: 'active', lastUpdate: '2024-06-08' },
    { id: 4, name: 'Shop Event', category: 'special', items: 25, revenue: 800000, status: 'inactive', lastUpdate: '2024-06-05' }
  ];

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
          <h2 className="text-lg md:text-xl font-semibold">Quản Lý Shop</h2>
          <p className="text-sm text-muted-foreground">Quản lý tất cả các cửa hàng trong game</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Shop Mới
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo Shop Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input placeholder="Tên shop..." />
              <Input placeholder="Danh mục..." />
              <Button className="w-full">Tạo Shop</Button>
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
            <div className="text-lg md:text-2xl font-bold text-blue-600">{shops.reduce((acc, shop) => acc + shop.items, 0)}</div>
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
                <span className="ml-1 font-medium">{shop.items}</span>
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
                <TableCell>{shop.items}</TableCell>
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
