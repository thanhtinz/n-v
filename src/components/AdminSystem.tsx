
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import AdminOverview from './AdminOverview';
import AdminItemManager from './AdminItemManager';
import AdminNPCManager from './AdminNPCManager';
import AdminQuestManager from './AdminQuestManager';
import AdminStoryManager from './AdminStoryManager';
import AdminShopManager from './AdminShopManager';
import AdminEventManager from './AdminEventManager';
import AdminPlayerManager from './AdminPlayerManager';
import AdminGiftCodeManager from './AdminGiftCodeManager';
import AdminPackageManager from './AdminPackageManager';
import AdminGameRatesManager from './AdminGameRatesManager';
import AdminQuizManager from './AdminQuizManager';
import { 
  Settings, 
  BarChart3,
  ShoppingCart, 
  Calendar, 
  Gift, 
  Users,
  Package,
  BookOpen,
  Sword,
  Crown,
  Scroll,
  Gamepad2,
  Brain
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  const adminTabs = [
    { id: 'overview', label: 'Tổng Quan', icon: BarChart3, component: AdminOverview },
    { id: 'story', label: 'Cốt Truyện', icon: Scroll, component: AdminStoryManager },
    { id: 'items', label: 'Vật Phẩm', icon: Package, component: AdminItemManager },
    { id: 'npcs', label: 'NPC', icon: Crown, component: AdminNPCManager },
    { id: 'quests', label: 'Nhiệm Vụ', icon: Sword, component: AdminQuestManager },
    { id: 'shop', label: 'Shop', icon: ShoppingCart, component: AdminShopManager },
    { id: 'events', label: 'Sự Kiện', icon: Calendar, component: AdminEventManager },
    { id: 'giftcodes', label: 'Gift Code', icon: Gift, component: AdminGiftCodeManager },
    { id: 'packages', label: 'Gói Nạp', icon: Package, component: AdminPackageManager },
    { id: 'players', label: 'Người Chơi', icon: Users, component: AdminPlayerManager },
    { id: 'gamerates', label: 'Tỷ Lệ Game', icon: Gamepad2, component: AdminGameRatesManager },
    { id: 'quiz', label: 'Câu Hỏi', icon: Brain, component: AdminQuizManager }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    addNotification(`Chuyển đến ${adminTabs.find(t => t.id === tabId)?.label}`, 'info');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Settings className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-indigo-600">
              Hệ Thống Quản Trị Game
            </h2>
            <p className="text-sm text-muted-foreground">
              Quản lý toàn diện hệ thống game Tu Tiên
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className={`grid w-full ${
            isMobile 
              ? 'grid-cols-3 h-auto' 
              : 'grid-cols-4 lg:grid-cols-6'
          }`}>
            {adminTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className={`flex items-center gap-1 ${
                  isMobile 
                    ? 'flex-col p-2 h-16 text-xs' 
                    : 'flex-row text-sm'
                }`}
              >
                <tab.icon className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 mr-1'}`} />
                <span className={isMobile ? 'leading-tight' : ''}>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {adminTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-4">
              <tab.component />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminSystem;
