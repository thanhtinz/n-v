
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sword, Shield, Skull, Gem, Star } from 'lucide-react';

interface Boss {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  reward: {
    exp: number;
    spiritStones: number;
    items: string[];
  };
  difficulty: 'easy' | 'medium' | 'hard' | 'nightmare';
  icon: string;
}

interface PlayerStats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
}

interface BossArenaProps {
  playerStats: PlayerStats;
}

const BossArena = ({ playerStats }: BossArenaProps) => {
  const [bosses] = useState<Boss[]>([
    {
      id: 'demon-wolf',
      name: 'Ma Sói Núi Đen',
      level: 5,
      hp: 150,
      maxHp: 150,
      attack: 20,
      defense: 10,
      reward: { exp: 50, spiritStones: 10, items: ['Răng Sói', 'Da Thú'] },
      difficulty: 'easy',
      icon: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 'thunder-eagle',
      name: 'Lôi Ưng Hoàng Kim',
      level: 15,
      hp: 300,
      maxHp: 300,
      attack: 35,
      defense: 20,
      reward: { exp: 150, spiritStones: 30, items: ['Lông Vũ Lôi', 'Tinh Thạch Gió'] },
      difficulty: 'medium',
      icon: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 'flame-dragon',
      name: 'Hỏa Long Vương',
      level: 30,
      hp: 800,
      maxHp: 800,
      attack: 60,
      defense: 40,
      reward: { exp: 500, spiritStones: 100, items: ['Long Lân', 'Hỏa Hồn Châu'] },
      difficulty: 'hard',
      icon: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=100&h=100&fit=crop&crop=center'
    }
  ]);

  const [selectedBoss, setSelectedBoss] = useState<Boss | null>(null);
  const [isInBattle, setIsInBattle] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [playerCurrentHp, setPlayerCurrentHp] = useState(playerStats.hp);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'hard': return 'text-red-400 border-red-400';
      case 'nightmare': return 'text-purple-400 border-purple-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const startBattle = (boss: Boss) => {
    setSelectedBoss({ ...boss });
    setIsInBattle(true);
    setPlayerCurrentHp(playerStats.hp);
    setBattleLog([`Bắt đầu chiến đấu với ${boss.name}!`]);
  };

  const attack = () => {
    if (!selectedBoss || !isInBattle) return;

    const damage = Math.max(1, playerStats.attack - selectedBoss.defense + Math.random() * 10);
    const newBossHp = Math.max(0, selectedBoss.hp - damage);
    
    setBattleLog(prev => [...prev, `Bạn gây ${damage.toFixed(0)} sát thương!`]);
    
    setSelectedBoss(prev => prev ? { ...prev, hp: newBossHp } : null);

    if (newBossHp <= 0) {
      setBattleLog(prev => [...prev, `Chiến thắng! Nhận được ${selectedBoss.reward.exp} EXP và ${selectedBoss.reward.spiritStones} Linh Thạch!`]);
      setIsInBattle(false);
      return;
    }

    // Boss counter attack
    setTimeout(() => {
      const bossDamage = Math.max(1, selectedBoss.attack - playerStats.defense + Math.random() * 5);
      const newPlayerHp = Math.max(0, playerCurrentHp - bossDamage);
      
      setBattleLog(prev => [...prev, `${selectedBoss.name} gây ${bossDamage.toFixed(0)} sát thương!`]);
      setPlayerCurrentHp(newPlayerHp);

      if (newPlayerHp <= 0) {
        setBattleLog(prev => [...prev, 'Bạn đã bị đánh bại! Hãy tu luyện thêm rồi quay lại.']);
        setIsInBattle(false);
      }
    }, 1000);
  };

  const flee = () => {
    setBattleLog(prev => [...prev, 'Bạn đã bỏ chạy khỏi trận chiến!']);
    setIsInBattle(false);
    setSelectedBoss(null);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {!isInBattle ? (
        // Boss Selection
        <div className="grid gap-3 sm:gap-4">
          {bosses.map((boss) => (
            <Card key={boss.id} className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-cultivator-gold/50 transition-colors">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-blood-red/50 bg-card/50 flex-shrink-0">
                    <img
                      src={boss.icon}
                      alt={boss.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center bg-blood-red/20">
                      <Skull className="w-6 h-6 text-blood-red" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-sm sm:text-base">{boss.name}</h3>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(boss.difficulty)}`}>
                        Lv.{boss.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span>HP: {boss.hp}</span>
                      <span>ATK: {boss.attack}</span>
                      <span>DEF: {boss.defense}</span>
                    </div>
                    <div className="mt-2 text-xs text-cultivator-gold">
                      Thưởng: {boss.reward.exp} EXP, {boss.reward.spiritStones} Linh Thạch
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => startBattle(boss)}
                  className="w-full sm:w-auto bg-blood-red hover:bg-blood-red/80"
                >
                  <Sword className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">Thách Đấu</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Battle Interface
        <div className="space-y-3 sm:space-y-4">
          {/* Battle Visual */}
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-blood-red/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-spirit-jade/20 border-2 border-spirit-jade/50 flex items-center justify-center">
                  <div className="w-8 h-8 bg-spirit-jade rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="font-medium text-sm sm:text-base">Bạn</div>
                  <div className="text-xs text-muted-foreground">Lv.{Math.floor(Math.random() * 10) + 5}</div>
                </div>
              </div>
              
              <div className="text-center">
                <Sword className="w-6 h-6 sm:w-8 sm:h-8 text-blood-red animate-pulse mx-auto" />
                <div className="text-xs text-blood-red font-semibold mt-1">VS</div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium text-sm sm:text-base text-right">{selectedBoss?.name}</div>
                  <div className="text-xs text-muted-foreground text-right">Lv.{selectedBoss?.level}</div>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-blood-red/50">
                  <img
                    src={selectedBoss?.icon}
                    alt={selectedBoss?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full flex items-center justify-center bg-blood-red/20">
                    <Skull className="w-6 h-6 text-blood-red" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Battle Status */}
          <div className="grid gap-3 sm:gap-4">
            {/* Player Status */}
            <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm sm:text-base">Bạn</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{playerCurrentHp}/{playerStats.maxHp} HP</span>
              </div>
              <Progress value={(playerCurrentHp / playerStats.maxHp) * 100} className="h-2 sm:h-3" />
            </Card>

            {/* Boss Status */}
            <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-blood-red/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm sm:text-base">{selectedBoss?.name}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{selectedBoss?.hp}/{selectedBoss?.maxHp} HP</span>
              </div>
              <Progress value={selectedBoss ? (selectedBoss.hp / selectedBoss.maxHp) * 100 : 0} className="h-2 sm:h-3" />
            </Card>
          </div>

          {/* Battle Controls */}
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={attack}
                disabled={!isInBattle}
                className="flex-1 bg-blood-red hover:bg-blood-red/80"
              >
                <Sword className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Tấn Công</span>
              </Button>
              <Button
                onClick={flee}
                variant="outline"
                className="flex-1"
              >
                <span className="text-xs sm:text-sm">Bỏ Chạy</span>
              </Button>
            </div>
          </Card>

          {/* Battle Log */}
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-medium text-sm sm:text-base mb-2">Nhật Ký Chiến Đấu</h3>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {battleLog.map((log, index) => (
                <div key={index} className="text-xs sm:text-sm text-muted-foreground">
                  {log}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BossArena;
