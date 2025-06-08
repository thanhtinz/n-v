
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Crown,
  Eye,
  Edit,
  Gift,
  Ban,
  MessageSquare,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Activity
} from 'lucide-react';

const AdminPlayerManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const players = [
    { 
      id: 1, 
      name: 'Tu Tiên Giả', 
      level: 45, 
      vip: 5, 
      lastLogin: '2024-06-08 14:30', 
      totalSpent: 1500000, 
      status: 'online',
      realm: 'Kim Đan',
      guild: 'Thiên Đạo Môn',
      joinDate: '2024-01-15',
      playtime: '120h'
    },
    { 
      id: 2, 
      name: 'Kiếm Thần', 
      level: 52, 
      vip: 8, 
      lastLogin: '2024-06-08 15:45', 
      totalSpent: 2800000, 
      status: 'online',
      realm: 'Nguyên Anh',
      guild: 'Kiếm Tông',
      joinDate: '2024-01-10',
      playtime: '200h'
    },
    { 
      id: 3, 
      name: 'Phong Thần', 
      level: 38, 
      vip: 3, 
      lastLogin: '2024-06-07 22:15', 
      totalSpent: 890000, 
      status: 'offline',
      realm: 'Trúc Cơ',
      guild: 'Phong Vân Hội',
      joinDate: '2024-02-01',
      playtime: '80h'
    },
    { 
      id: 4, 
      name: 'Huyền Nữ', 
      level: 41, 
      vip: 6, 
      lastLogin: '2024-06-08 10:20', 
      totalSpent: 1200000, 
      status: 'away',
      realm: 'Kim Đan',
      guild: 'Hoa Sơn Phái',
      joinDate: '2024-01-20',
      playtime: '95h'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'bg-green-100 text-green-700',
      offline: 'bg-gray-100 text-gray-700',
      away: 'bg-yellow-100 text-yellow-700',
      banned: 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getVipColor = (vip: number) => {
    if (vip >= 8) return 'bg-purple-500 text-white';
    if (vip >= 5) return 'bg-yellow-500 text-white';
    if (vip >= 3) return 'bg-blue-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'online' && player.status === 'online') ||
                      (activeTab === 'vip' && player.vip >= 3) ||
                      (activeTab === 'high-spender' && player.totalSpent >= 1000000);
    return matchesSearch && matchesTab;
  });

  const PlayerCard = ({ player }: { player: any }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm">{player.name}</h3>
            <Badge className={`text-xs ${getVipColor(player.vip)}`}>
              <Crown className="w-3 h-3 mr-1" />
              VIP{player.vip}
            </Badge>
          </div>
          <div className="flex gap-2 mb-2">
            <Badge variant="outline" className="text-xs">Lv.{player.level}</Badge>
            <Badge className={`text-xs ${getStatusColor(player.status)}`}>
              {player.status}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-muted-foreground">Cảnh giới:</span>
            <span className="ml-1 font-medium">{player.realm}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Bang hội:</span>
            <span className="ml-1 font-medium">{player.guild}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Tổng nạp:</span>
            <span className="ml-1 font-medium">{formatCurrency(player.totalSpent)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Thời gian chơi:</span>
            <span className="ml-1 font-medium">{player.playtime}</span>
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Đăng nhập cuối:</span>
          <span className="ml-1 font-medium">{player.lastLogin}</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="outline" className="flex-1">
          <Eye className="w-3 h-3 mr-1" />
          Xem
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <Gift className="w-3 h-3 mr-1" />
          Thưởng
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Quản Lý Người Chơi</h2>
          <p className="text-sm text-muted-foreground">Theo dõi và quản lý người chơi</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Gift className="w-4 h-4 mr-2" />
                Gửi Thưởng
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95%] max-w-md">
              <DialogHeader>
                <DialogTitle>Gửi Thưởng Hàng Loạt</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input placeholder="Chọn người chơi..." />
                <Input placeholder="Loại thưởng..." />
                <Input placeholder="Số lượng..." />
                <Button className="w-full">Gửi Thưởng</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm người chơi..."
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-lg md:text-2xl font-bold">{players.length}</div>
            <div className="text-xs text-muted-foreground">Tổng Người Chơi</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <Activity className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-lg md:text-2xl font-bold">
              {players.filter(p => p.status === 'online').length}
            </div>
            <div className="text-xs text-muted-foreground">Đang Online</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-lg md:text-2xl font-bold">
              {players.filter(p => p.vip >= 3).length}
            </div>
            <div className="text-xs text-muted-foreground">VIP Players</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="text-lg md:text-2xl font-bold">
              {formatCurrency(players.reduce((acc, player) => acc + player.totalSpent, 0))}
            </div>
            <div className="text-xs text-muted-foreground">Tổng Doanh Thu</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="text-xs">Tất Cả</TabsTrigger>
          <TabsTrigger value="online" className="text-xs">Online</TabsTrigger>
          <TabsTrigger value="vip" className="text-xs">VIP</TabsTrigger>
          <TabsTrigger value="high-spender" className="text-xs">Nạp Cao</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {/* Mobile View */}
          <div className="block md:hidden space-y-3">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>

          {/* Desktop View */}
          <Card className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Nhân Vật</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>VIP</TableHead>
                  <TableHead>Cảnh Giới</TableHead>
                  <TableHead>Đăng Nhập Cuối</TableHead>
                  <TableHead>Tổng Nạp</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{player.name}</div>
                        <div className="text-xs text-muted-foreground">{player.guild}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Lv.{player.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getVipColor(player.vip)}>
                        <Crown className="w-3 h-3 mr-1" />
                        VIP{player.vip}
                      </Badge>
                    </TableCell>
                    <TableCell>{player.realm}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{player.lastLogin.split(' ')[0]}</div>
                        <div className="text-muted-foreground">{player.lastLogin.split(' ')[1]}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(player.totalSpent)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(player.status)}>
                        {player.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Gift className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPlayerManager;
