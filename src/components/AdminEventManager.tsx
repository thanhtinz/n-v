
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Calendar,
  Users,
  Clock,
  Play,
  Pause,
  BarChart3
} from 'lucide-react';

const AdminEventManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const events = [
    { 
      id: 1, 
      name: 'Lễ Hội Mùa Hè 2024', 
      type: 'seasonal',
      startDate: '2024-06-01', 
      endDate: '2024-08-31', 
      participants: 15420, 
      status: 'active',
      rewards: 'Trang phục đặc biệt + 1000 KNB',
      progress: 65
    },
    { 
      id: 2, 
      name: 'Đua Top Boss', 
      type: 'competition',
      startDate: '2024-06-15', 
      endDate: '2024-06-22', 
      participants: 8756, 
      status: 'active',
      rewards: 'Title + Pet + 5000 KNB',
      progress: 80
    },
    { 
      id: 3, 
      name: 'Event Nạp Thẻ', 
      type: 'payment',
      startDate: '2024-05-01', 
      endDate: '2024-05-31', 
      participants: 12340, 
      status: 'ended',
      rewards: 'Bonus KNB + VIP points',
      progress: 100
    },
    { 
      id: 4, 
      name: 'Tu Luyện Marathon', 
      type: 'cultivation',
      startDate: '2024-06-20', 
      endDate: '2024-06-27', 
      participants: 0, 
      status: 'scheduled',
      rewards: 'Kinh nghiệm x2 + Linh thạch',
      progress: 0
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      ended: 'bg-gray-100 text-gray-700',
      scheduled: 'bg-blue-100 text-blue-700',
      paused: 'bg-yellow-100 text-yellow-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      seasonal: 'bg-orange-100 text-orange-700',
      competition: 'bg-red-100 text-red-700',
      payment: 'bg-green-100 text-green-700',
      cultivation: 'bg-purple-100 text-purple-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const EventCard = ({ event }: { event: any }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-sm mb-1">{event.name}</h3>
          <div className="flex gap-2 mb-2">
            <Badge className={`text-xs ${getTypeColor(event.type)}`}>
              {event.type}
            </Badge>
            <Badge className={`text-xs ${getStatusColor(event.status)}`}>
              {event.status}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <BarChart3 className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          <span>{event.startDate} - {event.endDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3 text-muted-foreground" />
          <span>{event.participants.toLocaleString()} người tham gia</span>
        </div>
        <div className="text-muted-foreground">
          <span>Phần thưởng: {event.rewards}</span>
        </div>
        
        {event.status === 'active' && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Tiến độ</span>
              <span>{event.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${event.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="outline" className="flex-1">
          <Edit className="w-3 h-3 mr-1" />
          Sửa
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <Eye className="w-3 h-3 mr-1" />
          Xem
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Quản Lý Sự Kiện</h2>
          <p className="text-sm text-muted-foreground">Tạo và quản lý các sự kiện game</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Tạo Sự Kiện
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo Sự Kiện Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input placeholder="Tên sự kiện..." />
              <Input placeholder="Loại sự kiện..." />
              <Input type="date" placeholder="Ngày bắt đầu..." />
              <Input type="date" placeholder="Ngày kết thúc..." />
              <Button className="w-full">Tạo Sự Kiện</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sự kiện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-green-600">
              {events.filter(e => e.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground">Đang Chạy</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-blue-600">
              {events.filter(e => e.status === 'scheduled').length}
            </div>
            <div className="text-xs text-muted-foreground">Sắp Diễn Ra</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-purple-600">
              {events.reduce((acc, event) => acc + event.participants, 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Tổng Tham Gia</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-orange-600">
              {events.filter(e => e.status === 'ended').length}
            </div>
            <div className="text-xs text-muted-foreground">Đã Kết Thúc</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="text-xs">Tất Cả</TabsTrigger>
          <TabsTrigger value="active" className="text-xs">Đang Chạy</TabsTrigger>
          <TabsTrigger value="scheduled" className="text-xs">Sắp Tới</TabsTrigger>
          <TabsTrigger value="ended" className="text-xs">Đã Xong</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {/* Mobile View */}
          <div className="block md:hidden space-y-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Desktop View */}
          <Card className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Sự Kiện</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Thời Gian</TableHead>
                  <TableHead>Tham Gia</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Tiến Độ</TableHead>
                  <TableHead>Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{event.startDate}</div>
                        <div className="text-muted-foreground">đến {event.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>{event.participants.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {event.status === 'active' && (
                        <div className="w-16">
                          <div className="text-xs mb-1">{event.progress}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${event.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
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
      </Tabs>
    </div>
  );
};

export default AdminEventManager;
