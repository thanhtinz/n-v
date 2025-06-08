
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  MoreVertical,
  Package,
  DollarSign,
  Star,
  TrendingUp
} from 'lucide-react';

const AdminPackageManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const packages = [
    { 
      id: 1, 
      name: 'Gói Tân Thủ', 
      price: 29000,
      originalPrice: 50000,
      type: 'starter',
      items: ['1000 Kim Nguyên Bảo', 'Trang bị Rare', '10 Linh Thạch'],
      sales: 1250,
      revenue: 36250000,
      discount: 42,
      status: 'active',
      featured: true,
      validDays: 30
    },
    { 
      id: 2, 
      name: 'VIP Tháng', 
      price: 199000,
      originalPrice: 299000,
      type: 'vip',
      items: ['5000 Kim Nguyên Bảo', 'VIP 30 ngày', 'Pet đặc biệt', '50 Linh Thạch'],
      sales: 856,
      revenue: 170344000,
      discount: 33,
      status: 'active',
      featured: true,
      validDays: 30
    },
    { 
      id: 3, 
      name: 'Mega Pack', 
      price: 499000,
      originalPrice: 799000,
      type: 'premium',
      items: ['15000 Kim Nguyên Bảo', 'Trang bị Legendary', 'Skin độc quyền', '200 Linh Thạch'],
      sales: 234,
      revenue: 116766000,
      discount: 38,
      status: 'active',
      featured: false,
      validDays: 60
    },
    { 
      id: 4, 
      name: 'Gói Lễ Hội', 
      price: 99000,
      originalPrice: 149000,
      type: 'event',
      items: ['2000 Kim Nguyên Bảo', 'Trang phục lễ hội', '20 Linh Thạch'],
      sales: 67,
      revenue: 6633000,
      discount: 34,
      status: 'inactive',
      featured: false,
      validDays: 7
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      starter: 'bg-green-100 text-green-700',
      vip: 'bg-purple-100 text-purple-700',
      premium: 'bg-yellow-100 text-yellow-700',
      event: 'bg-red-100 text-red-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      starter: 'Tân Thủ',
      vip: 'VIP',
      premium: 'Cao Cấp',
      event: 'Sự Kiện'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Quản Lý Gói Nạp
          </h2>
          <p className="text-sm text-muted-foreground">Tạo và quản lý các gói nạp tiền trong game</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Tạo Gói Nạp
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-lg">
            <DialogHeader>
              <DialogTitle>Tạo Gói Nạp Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium">Tên Gói</label>
                <Input placeholder="VD: Gói VIP Tháng" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Giá (VNĐ)</label>
                  <Input type="number" placeholder="199000" />
                </div>
                <div>
                  <label className="text-sm font-medium">Giá Gốc (VNĐ)</label>
                  <Input type="number" placeholder="299000" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Loại Gói</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="starter">Tân Thủ</option>
                  <option value="vip">VIP</option>
                  <option value="premium">Cao Cấp</option>
                  <option value="event">Sự Kiện</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Nội dung gói</label>
                <Textarea placeholder="Mô tả chi tiết các vật phẩm trong gói..." />
              </div>
              <div>
                <label className="text-sm font-medium">Thời hạn (ngày)</label>
                <Input type="number" placeholder="30" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" className="rounded" />
                <label htmlFor="featured" className="text-sm">Đánh dấu nổi bật</label>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Tạo Gói Nạp</Button>
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
              placeholder="Tìm kiếm gói nạp..."
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
            <div className="text-lg md:text-2xl font-bold text-blue-600">{packages.filter(p => p.status === 'active').length}</div>
            <div className="text-xs text-muted-foreground">Gói Hoạt Động</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-green-600">{packages.reduce((acc, pkg) => acc + pkg.sales, 0)}</div>
            <div className="text-xs text-muted-foreground">Tổng Bán</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-yellow-600">{formatCurrency(packages.reduce((acc, pkg) => acc + pkg.revenue, 0))}</div>
            <div className="text-xs text-muted-foreground">Doanh Thu</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-purple-600">{packages.filter(p => p.featured).length}</div>
            <div className="text-xs text-muted-foreground">Nổi Bật</div>
          </div>
        </Card>
      </div>

      {/* Mobile Cards View */}
      <div className="block md:hidden space-y-3">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm">{pkg.name}</h3>
                  {pkg.featured && <Star className="w-4 h-4 text-yellow-500" />}
                </div>
                <Badge className={`text-xs ${getTypeColor(pkg.type)}`}>
                  {getTypeLabel(pkg.type)}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <span className="text-muted-foreground">Giá:</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-green-600">{formatCurrency(pkg.price)}</span>
                  {pkg.discount > 0 && (
                    <Badge className="bg-red-100 text-red-700 text-xs">-{pkg.discount}%</Badge>
                  )}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Đã bán:</span>
                <span className="ml-1 font-medium">{pkg.sales}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Doanh thu:</span>
                <span className="ml-1 font-medium">{formatCurrency(pkg.revenue)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Trạng thái:</span>
                <Badge className={`ml-1 text-xs ${pkg.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {pkg.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                </Badge>
              </div>
            </div>
            
            <div className="text-xs mb-3">
              <span className="text-muted-foreground">Nội dung:</span>
              <div className="mt-1">
                {pkg.items.map((item, idx) => (
                  <span key={idx} className="inline-block bg-muted/50 px-2 py-1 rounded mr-1 mb-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
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
              <TableHead>Tên Gói</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Đã Bán</TableHead>
              <TableHead>Doanh Thu</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{pkg.name}</span>
                    {pkg.featured && <Star className="w-4 h-4 text-yellow-500" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(pkg.type)}>
                    {getTypeLabel(pkg.type)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-600">{formatCurrency(pkg.price)}</span>
                    {pkg.discount > 0 && (
                      <Badge className="bg-red-100 text-red-700">-{pkg.discount}%</Badge>
                    )}
                  </div>
                  {pkg.originalPrice > pkg.price && (
                    <div className="text-xs text-muted-foreground line-through">
                      {formatCurrency(pkg.originalPrice)}
                    </div>
                  )}
                </TableCell>
                <TableCell>{pkg.sales}</TableCell>
                <TableCell>{formatCurrency(pkg.revenue)}</TableCell>
                <TableCell>
                  <Badge className={pkg.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                    {pkg.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                  </Badge>
                </TableCell>
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

export default AdminPackageManager;
