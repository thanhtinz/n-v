import React, { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameStateIntegration } from '@/hooks/useGameStateIntegration';
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
  Clock,
  Heart,
  PawPrint,
  Settings as SettingsIcon,
  MessageSquare,
  Music,
  Fish,
  HelpCircle
} from 'lucide-react';

// Keep all existing component imports
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
import SocialSystem from './SocialSystem';
import PetSystem from './PetSystem';
import AdminSystem from './AdminSystem';
import ChatSystem from './ChatSystem';
import NotificationSystem from './NotificationSystem';
import SettingsSystem from './SettingsSystem';
import MusicSystem from './MusicSystem';
import AuthSystem from './AuthSystem';
import OfflineCultivationSystem from './OfflineCultivationSystem';
import StorySystem from './StorySystem';
import EnhancedFairyGuideAI from './EnhancedFairyGuideAI';
import EntertainmentSystem from './EntertainmentSystem';
import MarketSystem from './MarketSystem';
import GameLandingPage from './GameLandingPage';
import CharacterSelection from './CharacterSelection';
import GuideSystem from './GuideSystem';

type GameState = 'landing' | 'character-selection' | 'game';

const IntegratedGameInterface = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { gameState: gameData } = useGameState();
  const { setLocation, setCombatState, setCultivationState, triggerEvent } = useGameStateIntegration();

  // Check if user is logged in on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const expPercentage = gameData?.player ? (gameData.player.exp / gameData.player.maxExp) * 100 : 0;

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
    name: gameData?.player?.name || 'Tu Tiên Giả',
    realm: 'Phàm Nhân',
    level: gameData?.player?.level || 1,
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleStartGame = () => {
    setGameState('character-selection');
  };

  const handleCharacterSelect = (character: any) => {
    setGameState('game');
  };

  const handleBackToLanding = () => {
    setGameState('landing');
  };

  const handleMenuClick = (tab: string, actionName: string) => {
    setActiveTab(tab);
    setSelectedAction(actionName);
    setShowMenu(false);
    
    // Update integration state
    setLocation(tab);
    
    // Set specific states for certain tabs
    if (tab === 'combat') {
      setCombatState(true);
      triggerEvent('enter_combat', { message: 'Bước vào khu vực chiến đấu' });
    } else {
      setCombatState(false);
    }
    
    if (tab === 'cultivation' || tab === 'offline') {
      setCultivationState(true);
      triggerEvent('start_cultivation', { message: 'Bắt đầu tu luyện' });
    } else {
      setCultivationState(false);
    }
    
    setTimeout(() => {
      setSelectedAction(null);
    }, 2000);
  };

  const menuItems = [
    { id: 'overview', label: 'Thông Tin', icon: User, description: 'Trang chủ nhân vật' },
    { id: 'guide', label: 'Cẩm Nang', icon: HelpCircle, description: 'Hướng dẫn mọi tính năng' },
    { id: 'home', label: 'Động Phủ', icon: Home, description: 'Trang riêng cá nhân' },
    { id: 'combat', label: 'Chiến Đấu', icon: Sword },
    { id: 'cultivation', label: 'Tu Luyện', icon: Zap },
    { id: 'offline', label: 'Tu Hành AFK', icon: Clock, description: 'Tu luyện tự động' },
    { id: 'inventory', label: 'Hành Trang', icon: Shield },
    { id: 'quest', label: 'Nhiệm Vụ', icon: BookOpen },
    { id: 'story', label: 'Truyện Chính', icon: BookOpen, description: 'Visual Novel' },
    { id: 'shop', label: 'Cửa Hàng', icon: ShoppingCart, description: 'Bao gồm VIP' },
    { id: 'enhancement', label: 'Cường Hóa', icon: Star },
    { id: 'sect', label: 'Tông Môn', icon: Crown, description: 'Học tập rèn luyện' },
    { id: 'guild', label: 'Bang Hội', icon: Users, description: 'Tu tiên giả lập' },
    { id: 'pet', label: 'Thú Cưng', icon: PawPrint },
    { id: 'entertainment', label: 'Giải Trí', icon: Fish, description: 'Câu cá, cờ bạc, ước nguyện' },
    { id: 'event', label: 'Sự Kiện', icon: Calendar },
    { id: 'welfare', label: 'Phúc Lợi', icon: Gift },
    { id: 'market', label: 'Chợ', icon: Coins },
    { id: 'social', label: 'Bạn Bè', icon: Heart },
    { id: 'ranking', label: 'Xếp Hạng', icon: Trophy },
    { id: 'chat', label: 'Trò Chuyện', icon: MessageSquare },
    { id: 'music', label: 'Âm Nhạc', icon: Music },
    { id: 'auth', label: 'Đăng Nhập', icon: User },
    { id: 'settings', label: 'Cài Đặt', icon: SettingsIcon },
    { id: 'admin', label: 'Quản Trị', icon: Settings }
  ];

  // Render based on game state
  if (gameState === 'landing') {
    return (
      <GameLandingPage
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onStartGame={handleStartGame}
      />
    );
  }

  if (gameState === 'character-selection') {
    return (
      <CharacterSelection
        onCharacterSelect={handleCharacterSelect}
        onBack={handleBackToLanding}
      />
    );
  }

  // Game state - existing game interface
  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Enhanced Fairy Guide AI with integration */}
      <EnhancedFairyGuideAI />
      
      {/* Keep existing header and sidebar code exactly the same */}
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
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-4 h-4" />
                {gameData.notifications.unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                    {gameData.notifications.unreadCount}
                  </Badge>
                )}
              </Button>

              {showNotifications && (
                <Card className="absolute right-0 top-full mt-2 w-80 max-h-64 overflow-y-auto z-50 bg-background/95 backdrop-blur-sm">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Thông Báo</h4>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setShowNotifications(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {gameData.notifications.messages.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Không có thông báo mới
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {gameData.notifications.messages.map((notification: any) => (
                          <div key={notification.id} className="p-2 bg-muted/20 rounded text-sm">
                            <div className="flex items-start gap-2">
                              <Gift className="w-4 h-4 text-spirit-jade mt-0.5" />
                              <div>
                                <p>{notification.message}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(notification.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Keep existing sidebar menu code exactly the same */}
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
                    <p className="font-medium text-cultivator-gold">{gameData.player.name}</p>
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3 text-mystical-purple" />
                      <span className="text-xs text-mystical-purple">VIP{gameData.player.vipLevel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Lv.{gameData.player.level}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-divine-blue" />
                      <span className="text-divine-blue font-medium">{formatNumber(gameData.player.combatPower)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Kinh Nghiệm</span>
                  <span>{gameData.player.exp}/{gameData.player.maxExp}</span>
                </div>
                <Progress value={expPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-card rounded">
                  <Coins className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs font-medium">{formatNumber(gameData.player.silver)}</span>
                  <div className="text-xs text-muted-foreground">Bạc</div>
                </div>
                <div className="text-center p-2 bg-card rounded">
                  <Gem className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                  <span className="text-xs font-medium">{formatNumber(gameData.player.goldIngots)}</span>
                  <div className="text-xs text-muted-foreground">KNYB</div>
                </div>
                <div className="text-center p-2 bg-card rounded">
                  <Sparkles className="w-4 h-4 text-mystical-purple mx-auto mb-1" />
                  <span className="text-xs font-medium">{formatNumber(gameData.player.rechargeSpiritStones)}</span>
                  <div className="text-xs text-muted-foreground">LT Nạp</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map(item => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleMenuClick(item.id, item.label)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <div className="flex flex-col items-start">
                    <span>{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content - keep all existing tab content exactly the same */}
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

          <TabsContent value="guide" className="mt-0">
            <GuideSystem />
          </TabsContent>

          <TabsContent value="admin" className="mt-0">
            <AdminSystem />
          </TabsContent>

          <TabsContent value="home" className="mt-0">
            <HomeSystem />
          </TabsContent>

          <TabsContent value="pet" className="mt-0">
            <PetSystem />
          </TabsContent>

          <TabsContent value="activities" className="mt-0">
            <DailyActivitiesSystem />
          </TabsContent>

          <TabsContent value="guild" className="mt-0">
            <GuildSystem />
          </TabsContent>

          <TabsContent value="shop" className="mt-0">
            <ShopSystem />
          </TabsContent>

          <TabsContent value="inventory" className="mt-0">
            <InventorySystem 
              playerGender={playerInfo.gender as 'male' | 'female'}
              playerClass={playerInfo.class as 'sword' | 'magic' | 'defense'}
            />
          </TabsContent>

          <TabsContent value="combat" className="mt-0">
            <CombatSystem />
          </TabsContent>

          <TabsContent value="cultivation" className="mt-0">
            <CultivationSystem />
          </TabsContent>

          <TabsContent value="offline" className="mt-0">
            <OfflineCultivationSystem />
          </TabsContent>

          <TabsContent value="story" className="mt-0">
            <StorySystem />
          </TabsContent>

          <TabsContent value="enhancement" className="mt-0">
            <EnhancementSystem />
          </TabsContent>

          <TabsContent value="quest" className="mt-0">
            <QuestSystem />
          </TabsContent>

          <TabsContent value="event" className="mt-0">
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
            <SocialSystem />
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <ChatSystem />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationSystem />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <SettingsSystem />
          </TabsContent>

          <TabsContent value="music" className="mt-0">
            <MusicSystem />
          </TabsContent>

          <TabsContent value="auth" className="mt-0">
            <AuthSystem />
          </TabsContent>

          <TabsContent value="entertainment" className="mt-0">
            <EntertainmentSystem />
          </TabsContent>

          <TabsContent value="market" className="mt-0">
            <MarketSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntegratedGameInterface;
