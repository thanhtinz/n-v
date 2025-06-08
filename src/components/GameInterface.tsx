import React, { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Home, 
  Calendar, 
  Flame, 
  Shield, 
  Sword, 
  BookOpen,
  Bell,
  Settings,
  Star,
  Coins,
  Gem,
  Zap,
  Menu,
  X,
  Crown,
  Users,
  Trophy,
  Gift,
  Package,
  Dumbbell,
  Sparkles,
  Hammer,
  ShoppingCart,
  RotateCcw,
  Target,
  Clock
} from 'lucide-react';
import DailyQuestSystem from './DailyQuestSystem';
import EventSystem from './EventSystem';
import HomeSystem from './HomeSystem';
import SectSystem from './SectSystem';
import QuestSystem from './QuestSystem';
import RankingSystem from './RankingSystem';
import WelfareSystem from './WelfareSystem';
import CombatSystem from './CombatSystem';
import InventorySystem from './InventorySystem';
import CultivationSystem from './CultivationSystem';
import EnhancementSystem from './EnhancementSystem';
import CentralDisplay from './CentralDisplay';
import PlayerOverview from './PlayerOverview';
import ShopSystem from './ShopSystem';
import DailyActivitiesSystem from './DailyActivitiesSystem';
import GuildSystem from './GuildSystem';
import GiftCodeSystem from './GiftCodeSystem';
import LuckyWheelSystem from './LuckyWheelSystem';

const GameInterface = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { gameState } = useGameState();

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const expPercentage = gameState?.player ? (gameState.player.exp / gameState.player.maxExp) * 100 : 0;

  const getPlayerInfo = () => {
    const savedCharacter = localStorage.getItem('playerCharacter');
    if (savedCharacter) {
      const player = JSON.parse(savedCharacter);
      return {
        gender: player.gender || 'male',
        class: player.class || 'sword'
      };
    }
    return { gender: 'male', class: 'sword' };
  };

  const playerInfo = getPlayerInfo();

  const playerForDisplay = {
    name: gameState?.player?.name || 'Tu Tiên Giả',
    realm: 'Phàm Nhân',
    level: gameState?.player?.level || 1,
    gender: playerInfo.gender as 'male' | 'female',
    class: playerInfo.class as 'sword' | 'magic' | 'defense',
    equipment: {
      clothing: 'basic_robe',
      weapon: playerInfo.class === 'sword' ? 'iron_sword' : playerInfo.class === 'magic' ? 'wooden_staff' : 'iron_shield',
      wings: '',
      pet: '',
      aura: ''
    }
  };

  const handleMenuClick = (tab: string, actionName: string) => {
    setActiveTab(tab);
    setSelectedAction(actionName);
    setShowMenu(false);
    
    setTimeout(() => {
      setSelectedAction(null);
    }, 2000);
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Simple Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowMenu(false)}>
          <div 
            className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowMenu(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Player Info in Sidebar */}
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-cultivator-gold">{gameState.player.name}</p>
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3 text-mystical-purple" />
                      <span className="text-xs text-mystical-purple">VIP{gameState.player.vipLevel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Lv.{gameState.player.level}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-divine-blue" />
                      <span className="text-divine-blue font-medium">{formatNumber(gameState.player.combatPower)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Kinh Nghiệm</span>
                  <span>{gameState.player.exp}/{gameState.player.maxExp}</span>
                </div>
                <Progress value={expPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-card rounded">
                  <Coins className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs font-medium">{formatNumber(gameState.player.silver)}</span>
                  <div className="text-xs text-muted-foreground">Bạc</div>
                </div>
                <div className="text-center p-2 bg-card rounded">
                  <Gem className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                  <span className="text-xs font-medium">{formatNumber(gameState.player.goldIngots)}</span>
                  <div className="text-xs text-muted-foreground">KNYB</div>
                </div>
                <div className="text-center p-2 bg-card rounded">
                  <Sparkles className="w-4 h-4 text-mystical-purple mx-auto mb-1" />
                  <span className="text-xs font-medium">{formatNumber(gameState.player.rechargeSpiritStones)}</span>
                  <div className="text-xs text-muted-foreground">LT Nạp</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('overview', 'Trang Chủ')}
              >
                <User className="w-4 h-4 mr-2" />
                Trang Chủ
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('home', 'Động Phủ')}
              >
                <Home className="w-4 h-4 mr-2" />
                Động Phủ
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('activities', 'Hoạt Động')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Hoạt Động
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('guild', 'Bang Hội')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Bang Hội
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('shop', 'Cửa Hàng')}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cửa Hàng
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('luckywheel', 'Vòng Quay')}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Vòng Quay
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('giftcode', 'Code Quà')}
              >
                <Gift className="w-4 h-4 mr-2" />
                Code Quà
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('inventory', 'Hành Trang')}
              >
                <Package className="w-4 h-4 mr-2" />
                Hành Trang
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('combat', 'Chiến Đấu')}
              >
                <Sword className="w-4 h-4 mr-2" />
                Chiến Đấu
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('cultivation', 'Tu Luyện')}
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                Tu Luyện
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('enhancement', 'Rèn Đồ')}
              >
                <Hammer className="w-4 h-4 mr-2" />
                Rèn Đồ
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('quests', 'Nhiệm Vụ')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Nhiệm Vụ
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('events', 'Sự Kiện')}
              >
                <Flame className="w-4 h-4 mr-2" />
                Sự Kiện
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('sect', 'Tông Môn')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Tông Môn
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('ranking', 'Bảng Xếp Hạng')}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Bảng Xếp Hạng
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('welfare', 'Phúc Lợi')}
              >
                <Gift className="w-4 h-4 mr-2" />
                Phúc Lợi
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuClick('social', 'Xã Hội')}
              >
                <Users className="w-4 h-4 mr-2" />
                Xã Hội
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 max-w-md">
        {/* Central Display for animations */}
        {selectedAction && (
          <div className="mb-4">
            <CentralDisplay 
              player={playerForDisplay}
              activeTab={activeTab}
            />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview" className="mt-0">
            <PlayerOverview />
          </TabsContent>

          <TabsContent value="home" className="mt-0">
            <HomeSystem />
          </TabsContent>

          <TabsContent value="activities" className="mt-0">
            <DailyActivitiesSystem />
          </TabsContent>

          <TabsContent value="combat" className="mt-0">
            <CombatSystem />
          </TabsContent>

          <TabsContent value="cultivation" className="mt-0">
            <CultivationSystem />
          </TabsContent>

          <TabsContent value="enhancement" className="mt-0">
            <EnhancementSystem />
          </TabsContent>

          <TabsContent value="quests" className="mt-0">
            <div className="space-y-4">
              <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="daily">Hàng Ngày</TabsTrigger>
                  <TabsTrigger value="main">Chính Tuyến</TabsTrigger>
                </TabsList>
                <TabsContent value="daily">
                  <DailyQuestSystem />
                </TabsContent>
                <TabsContent value="main">
                  <QuestSystem />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-0">
            <EventSystem />
          </TabsContent>

          <TabsContent value="sect" className="mt-0">
            <SectSystem />
          </TabsContent>

          <TabsContent value="ranking" className="mt-0">
            <RankingSystem />
          </TabsContent>

          <TabsContent value="welfare" className="mt-0">
            <WelfareSystem />
          </TabsContent>

          <TabsContent value="social" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Users className="w-8 h-8 mx-auto mb-2 text-spirit-jade" />
                <p className="text-sm font-medium">Bạn Bè</p>
              </Card>
              <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Crown className="w-8 h-8 mx-auto mb-2 text-mystical-purple" />
                <p className="text-sm font-medium">Kết Hôn</p>
              </Card>
              <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-cultivator-gold" />
                <p className="text-sm font-medium">Sư Đồ</p>
              </Card>
              <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Gift className="w-8 h-8 mx-auto mb-2 text-divine-blue" />
                <p className="text-sm font-medium">Tặng Quà</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameInterface;
