import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import CharacterDisplay from './CharacterDisplay';
import CultivationSystem from './CultivationSystem';
import CombatSystem from './CombatSystem';
import SectSystem from './SectSystem';
import HomeSystem from './HomeSystem';
import MarketSystem from './MarketSystem';
import InventorySystem from './InventorySystem';
import RankingSystem from './RankingSystem';
import ChatSystem from './ChatSystem';
import SettingsSystem from './SettingsSystem';
import StoryDialog from './StoryDialog';
import { 
  User, 
  Zap, 
  Sword, 
  Users, 
  Home, 
  ShoppingCart, 
  Trophy,
  MessageCircle,
  Settings,
  Backpack
} from 'lucide-react';

const GameInterface = () => {
  const [activeTab, setActiveTab] = useState('character');
  const [player] = useState({
    name: 'Tu Tiên Giả',
    realm: 'Phàm Nhân',
    level: 1,
    equipment: {
      clothing: 'Áo Vải Thô',
      weapon: 'Kiếm Sắt',
      wings: '',
      pet: '',
      aura: ''
    }
  });

  // Calculate combat power from equipped items
  const calculateCombatPower = () => {
    // Base power from realm and level
    let basePower = 100 + (player.level * 10);
    
    // Equipment power (these would normally come from the actual equipped items)
    const equipmentPower = {
      weapon: 50, // Kiếm Sắt
      armor: 30,  // Áo Vải Thô
      pants: 0,
      hair: 0,
      hat: 0,
      chest: 0,
      treasure: 0,
      ring: 0,
      bracelet: 0,
      necklace: 0,
      set: 0
    };
    
    const totalEquipmentPower = Object.values(equipmentPower).reduce((sum, power) => sum + power, 0);
    
    return basePower + totalEquipmentPower;
  };

  const combatPower = calculateCombatPower();

  useEffect(() => {
    // Set last played time when component unmounts
    return () => {
      localStorage.setItem('lastPlayed', Date.now().toString());
    };
  }, []);

  const menuItems = [
    { id: 'character', label: 'Nhân Vật', icon: User },
    { id: 'cultivation', label: 'Tu Luyện', icon: Zap },
    { id: 'combat', label: 'Chiến Đấu', icon: Sword },
    { id: 'inventory', label: 'Hành Trang', icon: Backpack },
    { id: 'sect', label: 'Tông Môn', icon: Users },
    { id: 'home', label: 'Động Phủ', icon: Home },
    { id: 'market', label: 'Thị Trường', icon: ShoppingCart },
    { id: 'ranking', label: 'BXH', icon: Trophy },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'settings', label: 'Cài Đặt', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <h1 className="text-lg sm:text-2xl font-bold gradient-gold bg-clip-text text-transparent">
                Tiên Vực Truyền Sinh
              </h1>
              <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold text-xs">
                Alpha v0.1
              </Badge>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm text-muted-foreground">
                <span className="hidden sm:inline">Chào mừng, </span>
                <span className="text-cultivator-gold font-medium">{player.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Character Display Panel */}
          <div className="lg:col-span-1">
            <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="text-center space-y-2 sm:space-y-4">
                <div className="character-display-mobile sm:w-64 sm:h-80 mx-auto">
                  <CharacterDisplay
                    realm={player.realm}
                    equipment={player.equipment}
                    name={player.name}
                    isActive={activeTab === 'cultivation'}
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Badge variant="outline" className="w-full border-spirit-jade text-spirit-jade text-xs sm:text-sm">
                    {player.realm} • Tầng {player.level}
                  </Badge>
                  {/* Combat Power Display */}
                  <Badge variant="outline" className="w-full border-cultivator-gold text-cultivator-gold text-xs sm:text-sm">
                    <Zap className="w-3 h-3 mr-1" />
                    Lực Chiến: {combatPower.toLocaleString()}
                  </Badge>
                  <div className="text-xs text-muted-foreground px-2">
                    "Con đường tu tiên nghịch thiên, mỗi bước đều đầy gian khó."
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Game Interface */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3 sm:space-y-4">
              {/* Tab Navigation */}
              <Card className="p-1 sm:p-2 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="overflow-x-auto">
                  <TabsList className="flex w-max sm:grid sm:grid-cols-10 sm:w-full bg-transparent gap-1 p-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <TabsTrigger
                          key={item.id}
                          value={item.id}
                          className="mobile-tab-btn flex flex-col items-center gap-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary flex-shrink-0 min-w-[70px]"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs leading-tight whitespace-nowrap">{item.label}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
              </Card>

              {/* Tab Content */}
              <div className="min-h-[400px] sm:min-h-[500px]">
                <TabsContent value="character" className="space-y-3 sm:space-y-4">
                  <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold mb-3 sm:mb-4">Thông Tin Nhân Vật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Tên Đạo Hiệu</label>
                          <div className="text-base sm:text-lg font-medium">{player.name}</div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Cảnh Giới Hiện Tại</label>
                          <div className="text-base sm:text-lg font-medium text-spirit-jade">{player.realm}</div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Lực Chiến</label>
                          <div className="text-base sm:text-lg font-medium text-cultivator-gold flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            {combatPower.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Trang Bị</label>
                          <div className="space-y-1">
                            <div className="text-sm">🥋 {player.equipment.clothing}</div>
                            <div className="text-sm">⚔️ {player.equipment.weapon}</div>
                            <div className="text-sm text-muted-foreground">👼 Chưa có cánh</div>
                            <div className="text-sm text-muted-foreground">🐾 Chưa có pet</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Thành Tựu</label>
                          <div className="space-y-2 mobile-space-y-2">
                            <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold text-xs">
                              🌟 Tân Thủ Tu Tiên
                            </Badge>
                            <Badge variant="outline" className="border-spirit-jade text-spirit-jade text-xs">
                              📚 Học Đệ Đầu Tiên
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Thống Kê</label>
                          <div className="text-sm space-y-1">
                            <div>Thời gian tu luyện: 1 ngày</div>
                            <div>Boss đã đánh bại: 0</div>
                            <div>Cảnh giới đạt được: 1</div>
                            <div className="text-cultivator-gold">Lực chiến hiện tại: {combatPower.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="cultivation">
                  <CultivationSystem />
                </TabsContent>

                <TabsContent value="combat">
                  <CombatSystem />
                </TabsContent>

                <TabsContent value="inventory">
                  <InventorySystem />
                </TabsContent>

                <TabsContent value="sect">
                  <SectSystem />
                </TabsContent>

                <TabsContent value="home">
                  <HomeSystem />
                </TabsContent>

                <TabsContent value="market">
                  <MarketSystem />
                </TabsContent>

                <TabsContent value="ranking">
                  <RankingSystem />
                </TabsContent>

                <TabsContent value="chat">
                  <ChatSystem />
                </TabsContent>

                <TabsContent value="settings">
                  <SettingsSystem />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Story Dialog Component */}
      <StoryDialog />
    </div>
  );
};

export default GameInterface;
