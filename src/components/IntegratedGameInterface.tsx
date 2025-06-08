import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { useDisplayState } from '@/hooks/useDisplayState';
import { useGameStateIntegration } from '@/hooks/useGameStateIntegration';

// Import all components
import HomeSystem from './HomeSystem';
import PlayerOverview from './PlayerOverview';
import CultivationSystem from './CultivationSystem';
import InventorySystem from './InventorySystem';
import ShopSystem from './ShopSystem';
import MarketSystem from './MarketSystem';
import QuestSystem from './QuestSystem';
import StorySystem from './StorySystem';
import ArenaSystem from './ArenaSystem';
import SectSystem from './SectSystem';
import GuildSystem from './GuildSystem';
import EventSystem from './EventSystem';
import SocialSystem from './SocialSystem';
import RankingSystem from './RankingSystem';
import VIPSystem from './VIPSystem';
import WelfareSystem from './WelfareSystem';
import SettingsSystem from './SettingsSystem';
import AdminSystem from './AdminSystem';
import DailyActivitiesSystem from './DailyActivitiesSystem';
import FishingSystem from './FishingSystem';
import EntertainmentSystem from './EntertainmentSystem';
import BossArena from './BossArena';
import PvPArena from './PvPArena';
import OfflineCultivationSystem from './OfflineCultivationSystem';
import EnhancementSystem from './EnhancementSystem';
import PetSystem from './PetSystem';
import LuckyWheelSystem from './LuckyWheelSystem';
import GiftCodeSystem from './GiftCodeSystem';
import NotificationSystem from './NotificationSystem';
import ChatSystem from './ChatSystem';
import MusicSystem from './MusicSystem';
import FairyGuideAI from './FairyGuideAI';
import GameHeader from './GameHeader';

import { 
  Home, 
  User, 
  Mountain, 
  Package, 
  Store, 
  ShoppingCart,
  Scroll, 
  Book, 
  Swords, 
  Crown, 
  Users, 
  Calendar, 
  MessageCircle, 
  Trophy, 
  Star, 
  Gift, 
  Settings, 
  Shield,
  CheckCircle,
  Fish,
  Gamepad2,
  Zap,
  Sparkles,
  Heart,
  Coins,
  Code,
  Bell,
  Music,
  Bot
} from 'lucide-react';

const IntegratedGameInterface = () => {
  const { gameState, addNotification, isAdmin } = useGameState();
  const { currentLocation, setLocation } = useGameStateIntegration();
  const { 
    currentDisplay, 
    setCurrentDisplay, 
    previousDisplay, 
    setPreviousDisplay 
  } = useDisplayState();

  // // State to manage the current tab
  // const [activeTab, setActiveTab] = useState('home');

  // // Function to switch tabs
  // const handleTabChange = (tabId: string) => {
  //   setActiveTab(tabId);
  //   addNotification(`Switched to ${tabId}`, 'info');
  // };

  useEffect(() => {
    if (currentLocation && currentLocation !== currentDisplay) {
      console.log('Location sync: Setting display to', currentLocation);
      setCurrentDisplay(currentLocation);
      setLocation(currentLocation);
    }
  }, [currentLocation, currentDisplay, setCurrentDisplay, setLocation]);

  const navigationSections = [
    {
      title: 'Chính',
      items: [
        { id: 'home', label: 'Trang Chủ', icon: Home, component: HomeSystem },
        { id: 'player', label: 'Nhân Vật', icon: User, component: PlayerOverview },
        { id: 'cultivation', label: 'Tu Luyện', icon: Mountain, component: CultivationSystem },
        { id: 'inventory', label: 'Túi Đồ', icon: Package, component: InventorySystem },
      ]
    },
    {
      title: 'Thương Mại',
      items: [
        { id: 'shop', label: 'Cửa Hàng', icon: Store, component: ShopSystem },
        { id: 'market', label: 'Chợ Tu Tiên', icon: ShoppingCart, component: MarketSystem },
      ]
    },
    {
      title: 'Nhiệm Vụ & Cốt Truyện',
      items: [
        { id: 'quests', label: 'Nhiệm Vụ', icon: Scroll, component: QuestSystem },
        { id: 'story', label: 'Cốt Truyện', icon: Book, component: StorySystem },
      ]
    },
    {
      title: 'Chiến Đấu & Thi Đấu',
      items: [
        { id: 'arena', label: 'Đấu Trường', icon: Swords, component: ArenaSystem },
        { id: 'boss', label: 'Boss Arena', icon: Zap, component: BossArena },
        { id: 'pvp', label: 'PvP Arena', icon: Shield, component: PvPArena },
      ]
    },
    {
      title: 'Cộng Đồng',
      items: [
        { id: 'sect', label: 'Tông Môn', icon: Crown, component: SectSystem },
        { id: 'guild', label: 'Bang Hội', icon: Users, component: GuildSystem },
        { id: 'social', label: 'Xã Hội', icon: MessageCircle, component: SocialSystem },
        { id: 'ranking', label: 'Bảng Xếp Hạng', icon: Trophy, component: RankingSystem },
      ]
    },
    {
      title: 'Hoạt Động',
      items: [
        { id: 'events', label: 'Sự Kiện', icon: Calendar, component: EventSystem },
        { id: 'daily', label: 'Hoạt Động Hàng Ngày', icon: CheckCircle, component: DailyActivitiesSystem },
        { id: 'fishing', label: 'Câu Cá', icon: Fish, component: FishingSystem },
        { id: 'entertainment', label: 'Giải Trí', icon: Gamepad2, component: EntertainmentSystem },
      ]
    },
    {
      title: 'Nâng Cấp & Phát Triển',
      items: [
        { id: 'enhancement', label: 'Cường Hóa', icon: Sparkles, component: EnhancementSystem },
        { id: 'pet', label: 'Thú Cưng', icon: Heart, component: PetSystem },
        { id: 'offline', label: 'Tu Luyện Offline', icon: Mountain, component: OfflineCultivationSystem },
      ]
    },
    {
      title: 'VIP & Phúc Lợi',
      items: [
        { id: 'vip', label: 'VIP', icon: Star, component: VIPSystem },
        { id: 'welfare', label: 'Phúc Lợi', icon: Gift, component: WelfareSystem },
        { id: 'lucky', label: 'Vòng Quay May Mắn', icon: Coins, component: LuckyWheelSystem },
        { id: 'giftcode', label: 'Gift Code', icon: Code, component: GiftCodeSystem },
      ]
    },
    {
      title: 'Hệ Thống',
      items: [
        { id: 'notifications', label: 'Thông Báo', icon: Bell, component: NotificationSystem },
        { id: 'chat', label: 'Chat', icon: MessageCircle, component: ChatSystem },
        { id: 'music', label: 'Âm Nhạc', icon: Music, component: MusicSystem },
        { id: 'fairy', label: 'Tiên Nữ Hướng Dẫn', icon: Bot, component: FairyGuideAI },
        { id: 'settings', label: 'Cài Đặt', icon: Settings, component: SettingsSystem },
      ]
    }
  ];

  // Add admin section if user is admin
  if (isAdmin) {
    navigationSections.push({
      title: 'Quản Trị',
      items: [
        { id: 'admin', label: 'Quản Trị Hệ Thống', icon: Settings, component: AdminSystem },
      ]
    });
  }

  const handleNavigation = (itemId: string) => {
    console.log('Navigating to:', itemId);
    setPreviousDisplay(currentDisplay);
    setCurrentDisplay(itemId);
    setLocation(itemId);
    addNotification(`Chuyển đến ${getItemLabel(itemId)}`, 'info');
  };

  const getItemLabel = (itemId: string) => {
    for (const section of navigationSections) {
      const item = section.items.find(item => item.id === itemId);
      if (item) return item.label;
    }
    return itemId;
  };

  const getCurrentComponent = () => {
    for (const section of navigationSections) {
      const item = section.items.find(item => item.id === currentDisplay);
      if (item) return item.component;
    }
    return HomeSystem;
  };

  const CurrentComponent = getCurrentComponent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cultivator-dark via-cultivator-darker to-black text-cultivator-light">
      <GameHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 bg-cultivator-dark/50 border-cultivator-gold/30">
              <div className="space-y-4">
                {navigationSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-cultivator-gold mb-2">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Button
                            key={item.id}
                            variant={currentDisplay === item.id ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleNavigation(item.id)}
                            className={`w-full justify-start text-left ${
                              currentDisplay === item.id 
                                ? 'bg-cultivator-gold text-cultivator-dark' 
                                : 'text-cultivator-light hover:bg-cultivator-gold/20'
                            }`}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            <span className="text-xs">{item.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-cultivator-dark/30 rounded-lg border border-cultivator-gold/20">
              <CurrentComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedGameInterface;
