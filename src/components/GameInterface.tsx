
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import CharacterCreation from './CharacterCreation';
import CentralDisplay from './CentralDisplay';
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
  Backpack,
  Shield,
  Star
} from 'lucide-react';

interface ElementalStats {
  fireAttack: number;
  waterAttack: number;
  windAttack: number;
  earthAttack: number;
  fireResist: number;
  waterResist: number;
  windResist: number;
  earthResist: number;
}

interface PlayerCharacter {
  name: string;
  realm: string;
  level: number;
  gender: 'male' | 'female';
  class: 'sword' | 'magic' | 'defense';
  equipment: {
    clothing: string;
    weapon: string;
    wings: string;
    pet: string;
    aura: string;
  };
  hp: number;
  maxHp: number;
  exp: number;
  maxExp: number;
  avatar: string;
  elemental: ElementalStats;
}

const GameInterface = () => {
  const [activeTab, setActiveTab] = useState('character');
  const [isCharacterCreated, setIsCharacterCreated] = useState(false);
  const [player, setPlayer] = useState<PlayerCharacter>({
    name: 'Tu Tiên Giả',
    realm: 'Phàm Nhân',
    level: 1,
    gender: 'male',
    class: 'sword',
    equipment: {
      clothing: 'Áo Vải Thô',
      weapon: 'Kiếm Sắt',
      wings: '',
      pet: '',
      aura: ''
    },
    hp: 100,
    maxHp: 100,
    exp: 45,
    maxExp: 100,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=center',
    elemental: {
      fireAttack: 25,
      waterAttack: 8,
      windAttack: 5,
      earthAttack: 3,
      fireResist: 20,
      waterResist: 12,
      windResist: 8,
      earthResist: 5
    }
  });

  // Add new states for home activities
  const [homeActivity, setHomeActivity] = useState<'gardening' | 'crafting' | 'decorating' | null>(null);
  const [activeCraftingJobs, setActiveCraftingJobs] = useState<number>(0);
  const [plantsGrowing, setPlantsGrowing] = useState<number>(0);

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  // Check if character was already created
  useEffect(() => {
    const savedCharacter = localStorage.getItem('playerCharacter');
    if (savedCharacter) {
      const parsedCharacter = JSON.parse(savedCharacter);
      // Update player with enhanced stats
      const enhancedPlayer = {
        ...parsedCharacter,
        hp: parsedCharacter.hp || Math.floor(100 + (parsedCharacter.level * 15)),
        maxHp: parsedCharacter.maxHp || Math.floor(100 + (parsedCharacter.level * 15)),
        exp: parsedCharacter.exp || Math.floor(parsedCharacter.level * 45),
        maxExp: parsedCharacter.maxExp || Math.floor((parsedCharacter.level + 1) * 100),
        avatar: parsedCharacter.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=center',
        elemental: parsedCharacter.elemental || {
          fireAttack: parsedCharacter.class === 'sword' ? 25 + parsedCharacter.level * 3 : 8,
          waterAttack: parsedCharacter.class === 'magic' ? 25 + parsedCharacter.level * 3 : 8,
          windAttack: 5 + parsedCharacter.level,
          earthAttack: parsedCharacter.class === 'defense' ? 25 + parsedCharacter.level * 3 : 3,
          fireResist: parsedCharacter.class === 'sword' ? 20 + parsedCharacter.level * 2 : 12,
          waterResist: parsedCharacter.class === 'magic' ? 20 + parsedCharacter.level * 2 : 12,
          windResist: 8 + parsedCharacter.level,
          earthResist: parsedCharacter.class === 'defense' ? 20 + parsedCharacter.level * 2 : 5
        }
      };
      setPlayer(enhancedPlayer);
      setIsCharacterCreated(true);
    }
  }, []);

  // Calculate combat power from equipped items
  const calculateCombatPower = () => {
    // Base power from realm and level
    let basePower = 100 + (player.level * 10);
    
    // Equipment power (these would normally come from the actual equipped items)
    const equipmentPower = {
      weapon: player.class === 'sword' ? 50 : player.class === 'magic' ? 40 : 35,
      armor: 30,
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

  const handleCharacterCreation = (character: {
    name: string;
    gender: 'male' | 'female';
    class: 'sword' | 'magic' | 'defense';
  }) => {
    const newPlayer: PlayerCharacter = {
      ...character,
      realm: 'Phàm Nhân',
      level: 1,
      equipment: {
        clothing: character.gender === 'male' ? 'Áo Vải Thô Nam' : 'Áo Vải Thô Nữ',
        weapon: character.class === 'sword' ? 'Kiếm Sắt' : 
                character.class === 'magic' ? 'Trượng Pháp Cơ Bản' : 'Khiên Sắt',
        wings: '',
        pet: '',
        aura: ''
      },
      hp: 100,
      maxHp: 100,
      exp: 0,
      maxExp: 100,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=center',
      elemental: {
        fireAttack: character.class === 'sword' ? 25 : 8,
        waterAttack: character.class === 'magic' ? 25 : 8,
        windAttack: 5,
        earthAttack: character.class === 'defense' ? 25 : 3,
        fireResist: character.class === 'sword' ? 20 : 12,
        waterResist: character.class === 'magic' ? 20 : 12,
        windResist: 8,
        earthResist: character.class === 'defense' ? 20 : 5
      }
    };
    
    setPlayer(newPlayer);
    setIsCharacterCreated(true);
    localStorage.setItem('playerCharacter', JSON.stringify(newPlayer));
  };

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

  // Add new states for enhanced display
  const [isInCombat, setIsInCombat] = useState(false);
  const [isInTribulation, setIsInTribulation] = useState(false);
  const [currentSect, setCurrentSect] = useState('Thiên Đạo Tông');

  // Handle home activity updates
  const handleHomeActivityUpdate = (activity: 'gardening' | 'crafting' | 'decorating' | null, data?: any) => {
    setHomeActivity(activity);
    if (data) {
      if (data.craftingJobs !== undefined) setActiveCraftingJobs(data.craftingJobs);
      if (data.plantsGrowing !== undefined) setPlantsGrowing(data.plantsGrowing);
    }
  };

  const getElementalIcon = (element: string) => {
    switch (element) {
      case 'fire': return '🔥';
      case 'water': return '💧';
      case 'wind': return '💨';
      case 'earth': return '🌍';
      default: return '⚡';
    }
  };

  // If character hasn't been created, show character creation
  if (!isCharacterCreated) {
    return <CharacterCreation onComplete={handleCharacterCreation} />;
  }

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
                <Badge variant="outline" className="ml-2 text-xs border-spirit-jade text-spirit-jade">
                  {player.class === 'sword' ? 'Kiếm Khách' : 
                   player.class === 'magic' ? 'Pháp Sư' : 'Hộ Vệ'}
                </Badge>
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
                <CentralDisplay
                  player={player}
                  activeTab={activeTab}
                  isInCombat={isInCombat}
                  isInTribulation={isInTribulation}
                  currentSect={currentSect}
                  homeActivity={homeActivity}
                  activeCraftingJobs={activeCraftingJobs}
                  plantsGrowing={plantsGrowing}
                />
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
                  {/* Enhanced Character Info with Avatar, HP, EXP */}
                  <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-spirit-jade/50">
                        <img
                          src={player.avatar}
                          alt="Player Avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full flex items-center justify-center bg-spirit-jade/20">
                          <User className="w-10 h-10 text-spirit-jade" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-xl font-semibold text-cultivator-gold">{player.name}</h2>
                          <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                            Lv.{player.level}
                          </Badge>
                        </div>
                        
                        {/* Health Bar */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-red-400">HP</span>
                            <span>{player.hp}/{player.maxHp}</span>
                          </div>
                          <Progress value={(player.hp / player.maxHp) * 100} className="h-3 bg-muted [&>div]:bg-red-400" />
                        </div>

                        {/* EXP Bar */}
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-blue-400">EXP</span>
                            <span>{player.exp}/{player.maxExp}</span>
                          </div>
                          <Progress value={(player.exp / player.maxExp) * 100} className="h-3 bg-muted [&>div]:bg-blue-400" />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-cultivator-gold mb-3">Thông Tin Nhân Vật</h3>
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
                          <label className="text-sm text-muted-foreground">Class</label>
                          <div className="text-base sm:text-lg font-medium text-mystical-purple">
                            {player.class === 'sword' ? 'Kiếm Khách' : 
                             player.class === 'magic' ? 'Pháp Sư' : 'Hộ Vệ'}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Giới Tính</label>
                          <div className="text-base sm:text-lg font-medium">
                            {player.gender === 'male' ? 'Nam' : 'Nữ'}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Lực Chiến</label>
                          <div className="text-base sm:text-lg font-medium text-cultivator-gold flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            {combatPower.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Trang Bị</label>
                          <div className="space-y-1">
                            <div className="text-sm">🥋 {player.equipment.clothing}</div>
                            <div className="text-sm">⚔️ {player.equipment.weapon}</div>
                            <div className="text-sm text-muted-foreground">👼 Chưa có cánh</div>
                            <div className="text-sm text-muted-foreground">🐾 Chưa có pet</div>
                          </div>
                        </div>
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

                  {/* Elemental Attributes */}
                  <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h3 className="font-semibold text-cultivator-gold mb-3">Thuộc Tính Nguyên Tố</h3>
                    
                    {/* Elemental Attack */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Công Nguyên Tố</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="flex items-center gap-2 p-2 bg-red-950/30 rounded border border-red-400/30">
                          <span className="text-lg">{getElementalIcon('fire')}</span>
                          <div>
                            <div className="text-sm font-medium text-red-400">{player.elemental.fireAttack}</div>
                            <div className="text-xs text-muted-foreground">Lửa</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-blue-950/30 rounded border border-blue-400/30">
                          <span className="text-lg">{getElementalIcon('water')}</span>
                          <div>
                            <div className="text-sm font-medium text-blue-400">{player.elemental.waterAttack}</div>
                            <div className="text-xs text-muted-foreground">Nước</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-green-950/30 rounded border border-green-400/30">
                          <span className="text-lg">{getElementalIcon('wind')}</span>
                          <div>
                            <div className="text-sm font-medium text-green-400">{player.elemental.windAttack}</div>
                            <div className="text-xs text-muted-foreground">Gió</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-yellow-950/30 rounded border border-yellow-600/30">
                          <span className="text-lg">{getElementalIcon('earth')}</span>
                          <div>
                            <div className="text-sm font-medium text-yellow-600">{player.elemental.earthAttack}</div>
                            <div className="text-xs text-muted-foreground">Đất</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Elemental Resistance */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Kháng Nguyên Tố</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="flex items-center gap-2 p-2 bg-red-950/20 rounded border border-red-400/20">
                          <Shield className="w-4 h-4 text-red-400" />
                          <div>
                            <div className="text-sm font-medium text-red-400">{player.elemental.fireResist}</div>
                            <div className="text-xs text-muted-foreground">Kháng Lửa</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-blue-950/20 rounded border border-blue-400/20">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <div>
                            <div className="text-sm font-medium text-blue-400">{player.elemental.waterResist}</div>
                            <div className="text-xs text-muted-foreground">Kháng Nước</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-green-950/20 rounded border border-green-400/20">
                          <Shield className="w-4 h-4 text-green-400" />
                          <div>
                            <div className="text-sm font-medium text-green-400">{player.elemental.windResist}</div>
                            <div className="text-xs text-muted-foreground">Kháng Gió</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-yellow-950/20 rounded border border-yellow-600/20">
                          <Shield className="w-4 h-4 text-yellow-600" />
                          <div>
                            <div className="text-sm font-medium text-yellow-600">{player.elemental.earthResist}</div>
                            <div className="text-xs text-muted-foreground">Kháng Đất</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Elemental Effects Info */}
                    <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                      <h4 className="text-sm font-medium text-cultivator-gold mb-2">Hiệu Ứng Nguyên Tố Mạnh Nhất</h4>
                      <div className="text-sm space-y-1">
                        {player.class === 'sword' && (
                          <>
                            <div className="text-red-400">🔥 Công Lửa: 15% xác suất gây bỏng (DMG: {Math.floor(player.elemental.fireAttack * 0.8)})</div>
                            <div className="text-red-400">🛡️ Kháng Lửa: Khiên nóng bỏng giảm {Math.floor(player.elemental.fireResist * 0.6)}% sát thương</div>
                          </>
                        )}
                        {player.class === 'magic' && (
                          <>
                            <div className="text-blue-400">💧 Công Nước: Xác suất đóng băng mục tiêu</div>
                            <div className="text-blue-400">🛡️ Kháng Nước: Giảm {Math.floor(player.elemental.waterResist * 0.6)}% sát thương</div>
                          </>
                        )}
                        {player.class === 'defense' && (
                          <>
                            <div className="text-yellow-600">🌍 Công Đất: Tăng sát thương theo địa hình</div>
                            <div className="text-yellow-600">🛡️ Kháng Đất: Giảm {Math.floor(player.elemental.earthResist * 0.6)}% sát thương</div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          localStorage.removeItem('playerCharacter');
                          setIsCharacterCreated(false);
                        }}
                        className="w-full text-red-400 border-red-400 hover:bg-red-400/10"
                      >
                        Tạo Lại Nhân Vật
                      </Button>
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
                  <InventorySystem playerGender={player.gender} playerClass={player.class} />
                </TabsContent>

                <TabsContent value="sect">
                  <SectSystem />
                </TabsContent>

                <TabsContent value="home">
                  <HomeSystem onActivityUpdate={handleHomeActivityUpdate} />
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
