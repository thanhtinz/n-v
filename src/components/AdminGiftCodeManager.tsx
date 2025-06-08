
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
  Gift,
  Clock,
  Users,
  Check,
  X
} from 'lucide-react';

const AdminGiftCodeManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const giftCodes = [
    { 
      id: 1, 
      code: 'NEWBIE2024', 
      description: 'Quà tặng tân thủ', 
      rewards: '5000 Bạc + 100 Kim Nguyên Bảo',
      usageLimit: 1000,
      usageCount: 856,
      expiry: '2024-12-31',
      status: 'active',
      createdAt: '2024-01-01'
    },
    { 
      id: 2, 
      code: 'SUMMER2024', 
      description: 'Sự kiện mùa hè', 
      rewards: '15000 Bạc + 300 Kim Nguyên Bảo + Skin',
      usageLimit: 500,
      usageCount: 234,
      expiry: '2024-08-31',
      status: 'active',
      createdAt: '2024-06-01'
    },
    { 
      id: 3, 
      code: 'BIRTHDAY2024', 
      description: 'Sinh nhật server', 
      rewards: '20000 Bạc + 500 Kim Nguyên Bảo + Pet',
      usageLimit: 100,
      usageCount: 100,
      expiry: '2024-07-15',
      status: 'expired',
      createdAt: '2024-07-01'
    },
    { 
      id: 4, 
      code: 'WELCOME100K', 
      description: 'Chào mừng 100K người chơi', 
      rewards: '10000 Bạc + 200 Kim Nguyên Bảo',
      usageLimit: 2000,
      usageCount: 45,
      expiry: '2024-12-31',
      status: 'paused',
      createdAt: '2024-05-15'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      expired: 'bg-red-100 text-red-700',
      paused: 'bg-yellow-100 text-yellow-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Check className="w-3 h-3" />;
      case 'expired': return <X className="w-3 h-3" />;
      case 'paused': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const filteredCodes = giftCodes.filter(code => 
    code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-600" />
            Quản Lý Gift Code
          </h2>
          <p className="text-sm text-muted-foreground">Tạo và quản lý mã quà tặng cho người chơi</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Tạo Gift Code
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-lg">
            <DialogHeader>
              <DialogTitle>Tạo Gift Code Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium">Mã Code</label>
                <Input placeholder="VD: SUMMER2024" />
              </div>
              <div>
                <label className="text-sm font-medium">Mô tả</label>
                <Input placeholder="Mô tả gift code..." />
              </div>
              <div>
                <label className="text-sm font-medium">Phần thưởng</label>
                <Textarea placeholder="Mô tả chi tiết phần thưởng..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Giới hạn sử dụng</label>
                  <Input type="number" placeholder="1000" />
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày hết hạn</label>
                  <Input type="date" />
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Tạo Gift Code</Button>
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
              placeholder="Tìm kiếm gift code..."
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
            <div className="text-lg md:text-2xl font-bold text-purple-600">{giftCodes.filter(c => c.status === 'active').length}</div>
            <div className="text-xs text-muted-foreground">Đang Hoạt Động</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-blue-600">{giftCodes.reduce((acc, code) => acc + code.usageCount, 0)}</div>
            <div className="text-xs text-muted-foreground">Lượt Sử Dụng</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-green-600">{giftCodes.reduce((acc, code) => acc + code.usageLimit, 0)}</div>
            <div className="text-xs text-muted-foreground">Tổng Giới Hạn</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-red-600">{giftCodes.filter(c => c.status === 'expired').length}</div>
            <div className="text-xs text-muted-foreground">Đã Hết Hạn</div>
          </div>
        </Card>
      </div>

      {/* Mobile Cards View */}
      <div className="block md:hidden space-y-3">
        {filteredCodes.map((code) => (
          <Card key={code.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{code.code}</h3>
                <p className="text-xs text-muted-foreground mt-1">{code.description}</p>
                <Badge className={`text-xs mt-2 ${getStatusColor(code.status)}`}>
                  {getStatusIcon(code.status)}
                  <span className="ml-1">
                    {code.status === 'active' ? 'Hoạt động' :
                     code.status === 'expired' ? 'Hết hạn' : 'Tạm dừng'}
                  </span>
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <span className="text-muted-foreground">Sử dụng:</span>
                <span className="ml-1 font-medium">{code.usageCount}/{code.usageLimit}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Hết hạn:</span>
                <span className="ml-1 font-medium">{code.expiry}</span>
              </div>
            </div>
            
            <div className="text-xs mb-3">
              <span className="text-muted-foreground">Phần thưởng:</span>
              <span className="ml-1 font-medium">{code.rewards}</span>
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
              <TableHead>Mã Code</TableHead>
              <TableHead>Mô Tả</TableHead>
              <TableHead>Phần Thưởng</TableHead>
              <TableHead>Sử Dụng</TableHead>
              <TableHead>Hết Hạn</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCodes.map((code) => (
              <TableRow key={code.id}>
                <TableCell className="font-medium">{code.code}</TableCell>
                <TableCell>{code.description}</TableCell>
                <TableCell className="max-w-xs truncate">{code.rewards}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{code.usageCount}/{code.usageLimit}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(code.usageCount / code.usageLimit) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{code.expiry}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(code.status)}>
                    {getStatusIcon(code.status)}
                    <span className="ml-1">
                      {code.status === 'active' ? 'Hoạt động' :
                       code.status === 'expired' ? 'Hết hạn' : 'Tạm dừng'}
                    </span>
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

export default AdminGiftCodeManager;
