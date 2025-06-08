
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sword, Shield, Heart, Zap, Trophy, Users, User } from 'lucide-react';
import BossArena from './BossArena';
import PvPArena from './PvPArena';

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

interface PlayerStats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
  level: number;
  exp: number;
  maxExp: number;
  avatar: string;
  elemental: ElementalStats;
}

const CombatSystem = () => {
  const [playerStats] = useState<PlayerStats>({
    hp: 100,
    maxHp: 100,
    attack: 25,
    defense: 15,
    speed: 10,
    critRate: 5,
    level: 8,
    exp: 450,
    maxExp: 1000,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=center',
    elemental: {
      fireAttack: 45,
      waterAttack: 12,
      windAttack: 8,
      earthAttack: 5,
      fireResist: 35,
      waterResist: 20,
      windResist: 15,
      earthResist: 10
    }
  });

  const getElementalColor = (element: string) => {
    switch (element) {
      case 'fire': return 'text-red-400 border-red-400';
      case 'water': return 'text-blue-400 border-blue-400';
      case 'wind': return 'text-green-400 border-green-400';
      case 'earth': return 'text-yellow-600 border-yellow-600';
      default: return 'text-gray-400 border-gray-400';
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

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Enhanced Player Info with Avatar */}
      <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-spirit-jade/50">
            <img
              src={playerStats.avatar}
              alt="Player Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-full h-full flex items-center justify-center bg-spirit-jade/20">
              <User className="w-8 h-8 text-spirit-jade" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold">Tu Tiên Giả</h2>
              <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                Lv.{playerStats.level}
              </Badge>
            </div>
            
            {/* Health Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-red-400">HP</span>
                <span>{playerStats.hp}/{playerStats.maxHp}</span>
              </div>
              <Progress value={(playerStats.hp / playerStats.maxHp) * 100} className="h-2 bg-muted [&>div]:bg-red-400" />
            </div>

            {/* EXP Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-blue-400">EXP</span>
                <span>{playerStats.exp}/{playerStats.maxExp}</span>
              </div>
              <Progress value={(playerStats.exp / playerStats.maxExp) * 100} className="h-2 bg-muted [&>div]:bg-blue-400" />
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-cultivator-gold mb-3">Thông Số Chiến Đấu</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
            <Sword className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            <div>
              <div className="text-sm font-medium">{playerStats.attack}</div>
              <div className="text-xs text-muted-foreground">Công Kích</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <div>
              <div className="text-sm font-medium">{playerStats.defense}</div>
              <div className="text-xs text-muted-foreground">Phòng Thủ</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <div>
              <div className="text-sm font-medium">{playerStats.speed}</div>
              <div className="text-xs text-muted-foreground">Tốc Độ</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <div>
              <div className="text-sm font-medium">{playerStats.critRate}%</div>
              <div className="text-xs text-muted-foreground">Bạo Kích</div>
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
                <div className="text-sm font-medium text-red-400">{playerStats.elemental.fireAttack}</div>
                <div className="text-xs text-muted-foreground">Lửa</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-950/30 rounded border border-blue-400/30">
              <span className="text-lg">{getElementalIcon('water')}</span>
              <div>
                <div className="text-sm font-medium text-blue-400">{playerStats.elemental.waterAttack}</div>
                <div className="text-xs text-muted-foreground">Nước</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-950/30 rounded border border-green-400/30">
              <span className="text-lg">{getElementalIcon('wind')}</span>
              <div>
                <div className="text-sm font-medium text-green-400">{playerStats.elemental.windAttack}</div>
                <div className="text-xs text-muted-foreground">Gió</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-950/30 rounded border border-yellow-600/30">
              <span className="text-lg">{getElementalIcon('earth')}</span>
              <div>
                <div className="text-sm font-medium text-yellow-600">{playerStats.elemental.earthAttack}</div>
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
                <div className="text-sm font-medium text-red-400">{playerStats.elemental.fireResist}</div>
                <div className="text-xs text-muted-foreground">Kháng Lửa</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-950/20 rounded border border-blue-400/20">
              <Shield className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-sm font-medium text-blue-400">{playerStats.elemental.waterResist}</div>
                <div className="text-xs text-muted-foreground">Kháng Nước</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-950/20 rounded border border-green-400/20">
              <Shield className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-sm font-medium text-green-400">{playerStats.elemental.windResist}</div>
                <div className="text-xs text-muted-foreground">Kháng Gió</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-950/20 rounded border border-yellow-600/20">
              <Shield className="w-4 h-4 text-yellow-600" />
              <div>
                <div className="text-sm font-medium text-yellow-600">{playerStats.elemental.earthResist}</div>
                <div className="text-xs text-muted-foreground">Kháng Đất</div>
              </div>
            </div>
          </div>
        </div>

        {/* Elemental Effects Info */}
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="text-sm font-medium text-cultivator-gold mb-2">Hiệu Ứng Nguyên Tố Mạnh Nhất</h4>
          <div className="text-sm space-y-1">
            <div className="text-red-400">🔥 Công Lửa: 15% xác suất gây bỏng (DMG: {Math.floor(playerStats.elemental.fireAttack * 0.8)})</div>
            <div className="text-red-400">🛡️ Kháng Lửa: Khiên nóng bỏng giảm {Math.floor(playerStats.elemental.fireResist * 0.6)}% sát thương</div>
          </div>
        </div>
      </Card>

      {/* Combat Tabs */}
      <Tabs defaultValue="boss" className="space-y-3 sm:space-y-4">
        <Card className="p-1 sm:p-2 bg-card/50 backdrop-blur-sm border-border/50">
          <TabsList className="grid w-full grid-cols-2 bg-transparent gap-1">
            <TabsTrigger
              value="boss"
              className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Trophy className="w-4 h-4" />
              <span className="text-sm">Đấu Boss</span>
            </TabsTrigger>
            <TabsTrigger
              value="pvp"
              className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Users className="w-4 h-4" />
              <span className="text-sm">PvP</span>
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="boss">
          <BossArena playerStats={playerStats} />
        </TabsContent>

        <TabsContent value="pvp">
          <PvPArena playerStats={playerStats} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CombatSystem;
