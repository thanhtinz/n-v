import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sword, Shield, Heart, Zap, Trophy, Users, User, Star, Target } from 'lucide-react';
import BossArena from './BossArena';
import PvPArena from './PvPArena';
import ArenaSystem from './ArenaSystem';

const CombatSystem = () => {
  // Create player stats that match the expected interface
  const [playerStats] = useState(() => {
    const savedCharacter = localStorage.getItem('playerCharacter');
    if (savedCharacter) {
      const player = JSON.parse(savedCharacter);
      return {
        hp: player.hp || 100,
        maxHp: player.maxHp || 100,
        attack: 25 + (player.level * 3),
        defense: 15 + (player.level * 2),
        speed: 10 + player.level,
        critRate: 5 + Math.floor(player.level / 2),
        elemental: player.elemental || {
          fireAttack: player.class === 'sword' ? 25 + player.level * 3 : 8,
          waterAttack: player.class === 'magic' ? 25 + player.level * 3 : 8,
          windAttack: 5 + player.level,
          earthAttack: player.class === 'defense' ? 25 + player.level * 3 : 3,
          fireResist: player.class === 'sword' ? 20 + player.level * 2 : 12
        },
        avatar: player.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=center',
        level: player.level || 1,
        exp: player.exp || 0,
        maxExp: player.maxExp || 100
      };
    }
    // Default stats if no character saved
    return {
      hp: 100,
      maxHp: 100,
      attack: 25,
      defense: 15,
      speed: 10,
      critRate: 5,
      elemental: {
        fireAttack: 25,
        waterAttack: 8,
        windAttack: 5,
        earthAttack: 3,
        fireResist: 20
      },
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=center',
      level: 1,
      exp: 0,
      maxExp: 100
    };
  });

  const [battleLogs, setBattleLogs] = useState<string[]>([
    "🌟 Bước vào đấu trường chiến đấu...",
    "⚔️ Sẵn sàng cho trận chiến!"
  ]);

  const addBattleLog = (message: string) => {
    setBattleLogs(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    // Simulate some battle events
    const interval = setInterval(() => {
      const events = [
        "💫 Thiên địa linh khí dao động...",
        "⚡ Cảm nhận được sức mạnh nguyên tố",
        "🔥 Ngọn lửa tu luyện bùng cháy",
        "🌊 Dòng nước linh khí chảy xiết",
        "💨 Gió mang theo khí tức mạnh mẽ"
      ];
      addBattleLog(events[Math.floor(Math.random() * events.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Battle Log */}
      <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold text-cultivator-gold mb-3 flex items-center gap-2">
          <Sword className="w-5 h-5" />
          Nhật Ký Chiến Đấu
        </h3>
        <div className="bg-muted/20 rounded-lg p-3 h-32 overflow-y-auto">
          <div className="text-xs space-y-1 font-mono">
            {battleLogs.map((log, index) => (
              <div key={index} className="text-muted-foreground">
                {log}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Combat Tabs */}
      <Tabs defaultValue="boss" className="space-y-3 sm:space-y-4">
        <Card className="p-1 sm:p-2 bg-card/50 backdrop-blur-sm border-border/50">
          <TabsList className="grid w-full grid-cols-3 bg-transparent gap-1">
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
            <TabsTrigger
              value="arena"
              className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Target className="w-4 h-4" />
              <span className="text-sm">Đấu Trường</span>
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="boss">
          <BossArena playerStats={playerStats} />
        </TabsContent>

        <TabsContent value="pvp">
          <PvPArena playerStats={playerStats} />
        </TabsContent>

        <TabsContent value="arena">
          <ArenaSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CombatSystem;
