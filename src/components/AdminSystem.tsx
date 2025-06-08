import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGameState } from '@/hooks/useGameState';
import AdminItemManager from './AdminItemManager';
import AdminNPCManager from './AdminNPCManager';
import AdminQuestManager from './AdminQuestManager';
import { 
  Settings, 
  ShoppingCart, 
  BookOpen, 
  Gift, 
  Calendar, 
  CreditCard,
  BarChart3,
  Users,
  Package,
  Edit,
  Trash2,
  Plus,
  Eye,
  DollarSign,
  TrendingUp,
  Activity,
  Star,
  Crown,
  Sword,
  Shield,
  Zap
} from 'lucide-react';

const AdminSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Mock admin data
  const [adminData, setAdminData] = useState({
    shops: [
      { id: 1, name: 'Shop Vũ Khí', category: 'weapon', items: 150, revenue: 2500000, status: 'active' },
      { id: 2, name: 'Shop Trang Phục', category: 'armor', items: 200, revenue: 1800000, status: 'active' },
      { id: 3, name: 'Shop Linh Thạch', category: 'currency', items: 50, revenue: 5000000, status: 'active' }
    ],
    quests: [
      { id: 1, name: 'Nhiệm Vụ Tân Thủ', type: 'newbie', reward: '1000 Bạc', completion: 95, status: 'active' },
      { id: 2, name: 'Đánh Boss Hàng Ngày', type: 'daily', reward: '500 KNB', completion: 78, status: 'active' },
      { id: 3, name: 'Tu Luyện 30 Phút', type: 'cultivation', reward: '200 EXP', completion: 82, status: 'active' }
    ],
    events: [
      { id: 1, name: 'Lễ Hội Mùa Hè 2024', startDate: '2024-06-01', endDate: '2024-08-31', participants: 15420, status: 'active' },
      { id: 2, name: 'Đua Top Boss', startDate: '2024-06-15', endDate: '2024-06-22', participants: 8756, status: 'active' },
      { id: 3, name: 'Event Nạp Thẻ', startDate: '2024-05-01', endDate: '2024-05-31', participants: 12340, status: 'ended' }
    ],
    giftCodes: [
      { id: 1, code: 'SUMMER2024', uses: 1542, maxUses: 10000, rewards: '15000 Bạc, 300 KNB', status: 'active', expiry: '2024-08-31' },
      { id: 2, code: 'NEWBIE100', uses: 8756, maxUses: 10000, rewards: '5000 Bạc, 100 KNB', status: 'active', expiry: '2024-12-31' },
      { id: 3, code: 'WEEKEND50', uses: 9890, maxUses: 10000, rewards: '3000 Bạc, 50 KNB', status: 'active', expiry: '2024-06-30' }
    ],
    packages: [
      { id: 1, name: 'Gói Tân Thủ', price: 50000, sales: 234, revenue: 11700000, items: 'Vũ khí + Giáp + 1000 KNB', status: 'active' },
      { id: 2, name: 'Gói VIP Tháng', price: 199000, sales: 156, revenue: 31044000, items: 'VIP 30 ngày + Pet + Trang phục', status: 'active' },
      { id: 3, name: 'Gói Linh Thạch', price: 100000, sales: 445, revenue: 44500000, items: '5000 Linh Thạch + Bonus', status: 'active' }
    ],
    players: [
      { id: 1, name: 'Tu Tiên Giả', level: 45, vip: 5, lastLogin: '2024-06-08', totalSpent: 1500000, status: 'online' },
      { id: 2, name: 'Kiếm Thần', level: 52, vip: 8, lastLogin: '2024-06-08', totalSpent: 2800000, status: 'online' },
      { id: 3, name: 'Phong Thần', level: 38, vip: 3, lastLogin: '2024-06-07', totalSpent: 890000, status: 'offline' }
    ]
  });

  const stats = {
    totalPlayers: 45234,
    onlinePlayers: 8756,
    totalRevenue: 156780000,
    monthlyRevenue: 23450000,
    newPlayersToday: 234,
    activeEvents: 3,
    totalQuests: 156,
    completedQuests: 12456
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAddItem = (category) => {
    addNotification(`Đã thêm ${category} mới thành công!`, 'success');
    setShowAddModal(false);
  };

  const handleEditItem = (item, category) => {
    setEditingItem({ ...item, category });
    addNotification(`Chỉnh sửa ${category} thành công!`, 'success');
  };

  const handleDeleteItem = (id, category) => {
    addNotification(`Đã xóa ${category} thành công!`, 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Hệ Thống Quản Trị Game
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="items">Vật Phẩm</TabsTrigger>
            <TabsTrigger value="npcs">NPC</TabsTrigger>
            <TabsTrigger value="quests">Nhiệm Vụ</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
            <TabsTrigger value="events">Sự Kiện</TabsTrigger>
            <TabsTrigger value="giftcodes">Gift Code</TabsTrigger>
            <TabsTrigger value="packages">Gói Nạp</TabsTrigger>
            <TabsTrigger value="players">Người Chơi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">{stats.totalPlayers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Tổng Người Chơi</div>
                    <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                      +{stats.newPlayersToday} hôm nay
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{stats.onlinePlayers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Đang Online</div>
                    <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                      {Math.round((stats.onlinePlayers / stats.totalPlayers) * 100)}% online
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                    <div className="text-sm text-muted-foreground">Tổng Doanh Thu</div>
                    <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                      {formatCurrency(stats.monthlyRevenue)} tháng này
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold">{stats.activeEvents}</div>
                    <div className="text-sm text-muted-foreground">Sự Kiện Đang Chạy</div>
                    <Badge variant="outline" className="text-xs border-blue-500 text-blue-500">
                      {stats.totalQuests} nhiệm vụ
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Hoạt Động Gần Đây</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Người chơi mới đăng ký</div>
                    <div className="text-xs text-muted-foreground">234 người chơi mới hôm nay</div>
                  </div>
                  <div className="text-xs text-muted-foreground">5 phút trước</div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Gói nạp được mua</div>
                    <div className="text-xs text-muted-foreground">Gói VIP Tháng - 199.000đ</div>
                  </div>
                  <div className="text-xs text-muted-foreground">10 phút trước</div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Gift code được sử dụng</div>
                    <div className="text-xs text-muted-foreground">SUMMER2024 - 45 lần sử dụng</div>
                  </div>
                  <div className="text-xs text-muted-foreground">15 phút trước</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <AdminItemManager />
          </TabsContent>

          <TabsContent value="npcs" className="space-y-4">
            <AdminNPCManager />
          </TabsContent>

          <TabsContent value="quests" className="space-y-4">
            <AdminQuestManager />
          </TabsContent>

          <TabsContent value="shop" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Quản Lý Shop</h3>
              <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-1" />
                Thêm Shop
              </Button>
            </div>

            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên Shop</TableHead>
                    <TableHead>Danh Mục</TableHead>
                    <TableHead>Số Vật Phẩm</TableHead>
                    <TableHead>Doanh Thu</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.shops.map((shop) => (
                    <TableRow key={shop.id}>
                      <TableCell className="font-medium">{shop.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{shop.category}</Badge>
                      </TableCell>
                      <TableCell>{shop.items}</TableCell>
                      <TableCell>{formatCurrency(shop.revenue)}</TableCell>
                      <TableCell>
                        <Badge className={shop.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                          {shop.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEditItem(shop, 'shop')}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteItem(shop.id, 'shop')}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Quản Lý Sự Kiện</h3>
              <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-1" />
                Tạo Sự Kiện
              </Button>
            </div>

            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên Sự Kiện</TableHead>
                    <TableHead>Ngày Bắt Đầu</TableHead>
                    <TableHead>Ngày Kết Thúc</TableHead>
                    <TableHead>Người Tham Gia</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.startDate}</TableCell>
                      <TableCell>{event.endDate}</TableCell>
                      <TableCell>{event.participants.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={
                          event.status === 'active' ? 'bg-green-500' : 
                          event.status === 'ended' ? 'bg-gray-500' : 'bg-blue-500'
                        }>
                          {event.status === 'active' ? 'Đang chạy' : 
                           event.status === 'ended' ? 'Đã kết thúc' : 'Sắp diễn ra'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEditItem(event, 'event')}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteItem(event.id, 'event')}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="giftcodes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Quản Lý Gift Code</h3>
              <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-1" />
                Tạo Gift Code
              </Button>
            </div>

            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã Code</TableHead>
                    <TableHead>Đã Sử Dụng</TableHead>
                    <TableHead>Giới Hạn</TableHead>
                    <TableHead>Phần Thưởng</TableHead>
                    <TableHead>Hết Hạn</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.giftCodes.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell className="font-medium font-mono">{code.code}</TableCell>
                      <TableCell>{code.uses.toLocaleString()}</TableCell>
                      <TableCell>{code.maxUses.toLocaleString()}</TableCell>
                      <TableCell>{code.rewards}</TableCell>
                      <TableCell>{code.expiry}</TableCell>
                      <TableCell>
                        <Badge className={code.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                          {code.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEditItem(code, 'giftcode')}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteItem(code.id, 'giftcode')}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Quản Lý Gói Nạp</h3>
              <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-1" />
                Tạo Gói Nạp
              </Button>
            </div>

            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên Gói</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Đã Bán</TableHead>
                    <TableHead>Doanh Thu</TableHead>
                    <TableHead>Nội Dung</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>{formatCurrency(pkg.price)}</TableCell>
                      <TableCell>{pkg.sales}</TableCell>
                      <TableCell>{formatCurrency(pkg.revenue)}</TableCell>
                      <TableCell>{pkg.items}</TableCell>
                      <TableCell>
                        <Badge className={pkg.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                          {pkg.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEditItem(pkg, 'package')}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteItem(pkg.id, 'package')}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="players" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Quản Lý Người Chơi</h3>
              <div className="flex gap-2">
                <Input placeholder="Tìm người chơi..." className="w-48" />
                <Button variant="outline">Tìm Kiếm</Button>
              </div>
            </div>

            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên Nhân Vật</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>VIP</TableHead>
                    <TableHead>Đăng Nhập Cuối</TableHead>
                    <TableHead>Tổng Nạp</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Lv.{player.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500">
                          <Crown className="w-3 h-3 mr-1" />
                          VIP{player.vip}
                        </Badge>
                      </TableCell>
                      <TableCell>{player.lastLogin}</TableCell>
                      <TableCell>{formatCurrency(player.totalSpent)}</TableCell>
                      <TableCell>
                        <Badge className={player.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}>
                          {player.status === 'online' ? 'Online' : 'Offline'}
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
      </Card>
    </div>
  );
};

export default AdminSystem;
