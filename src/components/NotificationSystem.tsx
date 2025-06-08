
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  Bell,
  BellRing,
  Gift,
  Calendar,
  Sword,
  Users,
  Crown,
  Trash2,
  Check,
  X
} from 'lucide-react';

interface SystemNotification {
  id: string;
  type: 'system' | 'event' | 'combat' | 'social' | 'reward';
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
  hasReward?: boolean;
  rewardClaimed?: boolean;
}

const NotificationSystem = () => {
  const { gameState, addNotification, claimReward } = useGameState();
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: '1',
      type: 'system',
      title: 'Bảo Trì Hệ Thống',
      message: 'Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày mai để cập nhật tính năng mới.',
      time: new Date(Date.now() - 10 * 60 * 1000),
      isRead: false
    },
    {
      id: '2',
      type: 'event',
      title: 'Sự Kiện Mới',
      message: 'Lễ Hội Mùa Hè đã bắt đầu! Tham gia để nhận nhiều phần thưởng hấp dẫn.',
      time: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      hasReward: true,
      rewardClaimed: false
    },
    {
      id: '3',
      type: 'combat',
      title: 'Chiến Thắng Boss',
      message: 'Bạn đã đánh thắng Hỏa Long Boss và nhận được 5000 EXP!',
      time: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true
    },
    {
      id: '4',
      type: 'social',
      title: 'Lời Mời Tông Môn',
      message: 'Kiếm Thánh đã mời bạn tham gia tông môn "Thiên Kiếm Phái".',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false
    },
    {
      id: '5',
      type: 'reward',
      title: 'Phần Thưởng Đăng Nhập',
      message: 'Bạn đã nhận được phần thưởng đăng nhập ngày thứ 7: 1000 KNB!',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      hasReward: true,
      rewardClaimed: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return <Bell className="w-4 h-4 text-blue-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'combat': return <Sword className="w-4 h-4 text-red-500" />;
      case 'social': return <Users className="w-4 h-4 text-green-500" />;
      case 'reward': return <Gift className="w-4 h-4 text-yellow-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'system': return 'Hệ Thống';
      case 'event': return 'Sự Kiện';
      case 'combat': return 'Chiến Đấu';
      case 'social': return 'Xã Hội';
      case 'reward': return 'Phần Thưởng';
      default: return 'Khác';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const claimNotificationReward = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && notification.hasReward && !notification.rewardClaimed) {
      // Mock reward claim
      claimReward('goldIngots', 100);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, rewardClaimed: true } : notif
        )
      );
      addNotification('Đã nhận phần thưởng từ thông báo!', 'success');
    }
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    addNotification('Đã xóa thông báo', 'info');
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    addNotification('Đã đánh dấu tất cả đã đọc', 'success');
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notif => !notif.isRead));
    addNotification('Đã xóa tất cả thông báo đã đọc', 'success');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BellRing className="w-6 h-6 text-cultivator-gold" />
            <h2 className="text-xl font-semibold text-cultivator-gold">Thông Báo</h2>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={markAllAsRead}>
              <Check className="w-3 h-3 mr-1" />
              Đánh dấu đã đọc
            </Button>
            <Button size="sm" variant="outline" onClick={deleteAllRead}>
              <Trash2 className="w-3 h-3 mr-1" />
              Xóa đã đọc
            </Button>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Không có thông báo nào</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id} className={`p-4 ${!notification.isRead ? 'bg-blue-500/10 border-blue-500/30' : 'bg-muted/20'}`}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{notification.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(notification.type)}
                      </Badge>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification.time.toLocaleString()}
                      </span>
                      
                      <div className="flex gap-1">
                        {notification.hasReward && !notification.rewardClaimed && (
                          <Button
                            size="sm"
                            onClick={() => claimNotificationReward(notification.id)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-xs px-2 h-6"
                          >
                            <Gift className="w-3 h-3 mr-1" />
                            Nhận Thưởng
                          </Button>
                        )}
                        
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs px-2 h-6"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs px-2 h-6"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default NotificationSystem;
