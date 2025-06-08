
import React, { useState, useEffect } from 'react';
import { Bell, Settings, User, MessageCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGameState } from '@/hooks/useGameState';

// Component imports
import HomeSystem from './HomeSystem';
import PlayerOverview from './PlayerOverview';
import CultivationSystem from './CultivationSystem';
import CombatSystem from './CombatSystem';
import ShopSystem from './ShopSystem';
import InventorySystem from './InventorySystem';
import QuestSystem from './QuestSystem';
import EventSystem from './EventSystem';
import SocialSystem from './SocialSystem';
import ChatSystem from './ChatSystem';
import GuildSystem from './GuildSystem';
import RankingSystem from './RankingSystem';
import SettingsSystem from './SettingsSystem';
import WelfareSystem from './WelfareSystem';
import NotificationSystem from './NotificationSystem';
import StorySystem from './StorySystem';
import OfflineCultivationSystem from './OfflineCultivationSystem';
import ServerCalamitySystem from './ServerCalamitySystem';
import SpiritGuideSystem from './SpiritGuideSystem';
import GoldenFateSystem from './GoldenFateSystem';

const GameInterface = () => {
  const { gameState } = useGameState();
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);

  const navigationItems = [
    { 
      id: 'home', 
      label: 'Thông Tin', 
      icon: User, 
      description: 'Thông tin nhân vật'
    },
    { 
      id: 'cultivation', 
      label: 'Tu Luyện', 
      icon: User, 
      description: 'Tu luyện cấp độ'
    },
    { 
      id: 'combat', 
      label: 'Chiến Đấu', 
      icon: User, 
      description: 'PvP, Boss, Đấu trường'
    },
    { 
      id: 'shop', 
      label: 'Cửa Hàng', 
      icon: User, 
      description: 'Mua vật phẩm & VIP'
    },
    { 
      id: 'inventory', 
      label: 'Kho Đồ', 
      icon: User, 
      description: 'Quản lý vật phẩm'
    },
    { 
      id: 'quest', 
      label: 'Nhiệm Vụ', 
      icon: User, 
      description: 'Nhiệm vụ hàng ngày'
    },
    { 
      id: 'event', 
      label: 'Sự Kiện', 
      icon: User, 
      description: 'Hoạt động đặc biệt'
    },
    { 
      id: 'social', 
      label: 'Bạn Bè', 
      icon: User, 
      description: 'Kết bạn, tương tác'
    },
    { 
      id: 'chat', 
      label: 'Trò Chuyện', 
      icon: MessageCircle, 
      description: 'Chat toàn server'
    },
    { 
      id: 'guild', 
      label: 'Bang Hội', 
      icon: User, 
      description: 'Gia nhập bang hội'
    },
    { 
      id: 'ranking', 
      label: 'Bảng Xếp Hạng', 
      icon: User, 
      description: 'Top người chơi'
    },
    { 
      id: 'welfare', 
      label: 'Phúc Lợi', 
      icon: Gift, 
      description: 'Quà tặng hàng ngày'
    },
    { 
      id: 'story', 
      label: 'Truyện Chính', 
      icon: User, 
      description: 'Cốt truyện game'
    },
    { 
      id: 'offline-cultivation', 
      label: 'Tu Hành Offline', 
      icon: User, 
      description: 'Tu luyện tự động'
    },
    { 
      id: 'server-calamity', 
      label: 'Thiên Kiếp', 
      icon: User, 
      description: 'Thảm họa toàn server'
    },
    { 
      id: 'spirit-guide', 
      label: 'Thần Linh', 
      icon: User, 
      description: 'AI đồng hành'
    },
    { 
      id: 'golden-fate', 
      label: 'Kỳ Ngộ', 
      icon: User, 
      description: 'Cơ hội đặc biệt'
    },
    { 
      id: 'settings', 
      label: 'Cài Đặt', 
      icon: Settings, 
      description: 'Thiết lập game'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSystem />;
      case 'player':
        return <PlayerOverview />;
      case 'cultivation':
        return <CultivationSystem />;
      case 'combat':
        return <CombatSystem />;
      case 'shop':
        return <ShopSystem />;
      case 'inventory':
        return <InventorySystem />;
      case 'quest':
        return <QuestSystem />;
      case 'event':
        return <EventSystem />;
      case 'social':
        return <SocialSystem />;
      case 'chat':
        return <ChatSystem />;
      case 'guild':
        return <GuildSystem />;
      case 'ranking':
        return <RankingSystem />;
      case 'welfare':
        return <WelfareSystem />;
      case 'story':
        return <StorySystem />;
      case 'offline-cultivation':
        return <OfflineCultivationSystem />;
      case 'server-calamity':
        return <ServerCalamitySystem />;
      case 'spirit-guide':
        return <SpiritGuideSystem />;
      case 'golden-fate':
        return <GoldenFateSystem />;
      case 'settings':
        return <SettingsSystem />;
      default:
        return <HomeSystem />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/50 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cultivator-gold to-spirit-jade bg-clip-text text-transparent">
              Tu Tiên Thế Giới
            </div>
            <div className="text-sm text-muted-foreground">
              {gameState.player.name} - Cấp {gameState.player.level}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-4 h-4" />
              {gameState.notifications.unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {gameState.notifications.unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex max-w-6xl mx-auto">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 min-h-screen p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                    activeTab === item.id
                      ? 'bg-divine-blue/20 text-divine-blue border border-divine-blue/30'
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.label}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="w-80 bg-card/95 backdrop-blur-sm border-l border-border/50 min-h-screen">
            <NotificationSystem onClose={() => setShowNotifications(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInterface;
