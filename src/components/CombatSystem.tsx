
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sword, Shield, Heart, Zap, Trophy, Users } from 'lucide-react';
import BossArena from './BossArena';
import PvPArena from './PvPArena';

interface PlayerStats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
}

const CombatSystem = () => {
  const [playerStats] = useState<PlayerStats>({
    hp: 100,
    maxHp: 100,
    attack: 25,
    defense: 15,
    speed: 10,
    critRate: 5
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Player Combat Stats */}
      <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold mb-3 sm:mb-4">Thông Số Chiến Đấu</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            <div>
              <div className="text-sm font-medium">{playerStats.hp}/{playerStats.maxHp}</div>
              <div className="text-xs text-muted-foreground">HP</div>
            </div>
          </div>
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
