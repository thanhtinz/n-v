
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sword, Shield, Heart, Zap, Trophy, Users, User, Star } from 'lucide-react';
import BossArena from './BossArena';
import PvPArena from './PvPArena';

const CombatSystem = () => {
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
          <BossArena onBattleEvent={addBattleLog} />
        </TabsContent>

        <TabsContent value="pvp">
          <PvPArena onBattleEvent={addBattleLog} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CombatSystem;
