
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sword, Trophy, Users, Crown, Star } from 'lucide-react';

interface PlayerStats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
}

interface PvPPlayer {
  id: string;
  name: string;
  realm: string;
  level: number;
  power: number;
  wins: number;
  losses: number;
  rank: number;
}

interface PvPArenaProps {
  playerStats: PlayerStats;
}

const PvPArena = ({ playerStats }: PvPArenaProps) => {
  const [opponents] = useState<PvPPlayer[]>([
    {
      id: '1',
      name: 'Kiếm Thánh',
      realm: 'Luyện Khí',
      level: 8,
      power: 120,
      wins: 15,
      losses: 3,
      rank: 1
    },
    {
      id: '2',
      name: 'Phong Vân',
      realm: 'Phàm Nhân',
      level: 5,
      power: 95,
      wins: 8,
      losses: 5,
      rank: 3
    },
    {
      id: '3',
      name: 'Lôi Đế',
      realm: 'Trúc Cơ',
      level: 12,
      power: 200,
      wins: 25,
      losses: 2,
      rank: 2
    },
    {
      id: '4',
      name: 'Hỏa Vương',
      realm: 'Luyện Khí',
      level: 6,
      power: 85,
      wins: 5,
      losses: 8,
      rank: 5
    }
  ];

  const [selectedOpponent, setSelectedOpponent] = useState<PvPPlayer | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400 border-yellow-400';
      case 2: return 'text-gray-300 border-gray-300';
      case 3: return 'text-amber-600 border-amber-600';
      default: return 'text-blue-400 border-blue-400';
    }
  };

  const getPowerColor = (power: number) => {
    if (power > 150) return 'text-red-400';
    if (power > 100) return 'text-yellow-400';
    return 'text-green-400';
  };

  const challengePlayer = (opponent: PvPPlayer) => {
    setSelectedOpponent(opponent);
    setIsSearching(true);
    
    // Simulate finding match
    setTimeout(() => {
      setIsSearching(false);
      // Here you would start the actual PvP battle
      alert(`Tìm thấy đối thủ! Bắt đầu chiến đấu với ${opponent.name}`);
    }, 2000);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* PvP Stats */}
      <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Thống Kê PvP</h3>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="p-2 bg-muted/30 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-green-400">12</div>
            <div className="text-xs text-muted-foreground">Thắng</div>
          </div>
          <div className="p-2 bg-muted/30 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-red-400">5</div>
            <div className="text-xs text-muted-foreground">Thua</div>
          </div>
          <div className="p-2 bg-muted/30 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-yellow-400">8</div>
            <div className="text-xs text-muted-foreground">Hạng</div>
          </div>
        </div>
      </Card>

      {/* Search Status */}
      {isSearching && (
        <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-cultivator-gold/50">
          <div className="text-center space-y-2">
            <div className="animate-spin w-6 h-6 border-2 border-cultivator-gold border-t-transparent rounded-full mx-auto"></div>
            <div className="text-sm">Đang tìm kiếm đối thủ...</div>
            <div className="text-xs text-muted-foreground">Đối thủ: {selectedOpponent?.name}</div>
          </div>
        </Card>
      )}

      {/* Opponent List */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="font-semibold text-sm sm:text-base text-cultivator-gold">Danh Sách Đối Thủ</h3>
        {opponents.map((opponent) => (
          <Card key={opponent.id} className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-cultivator-gold/50 transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {opponent.rank <= 3 && (
                      <Crown className={`w-3 h-3 sm:w-4 sm:h-4 ${getRankColor(opponent.rank).split(' ')[0]}`} />
                    )}
                    <span className="font-medium text-sm sm:text-base">{opponent.name}</span>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getRankColor(opponent.rank)}`}>
                    #{opponent.rank}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground mb-2">
                  <span>{opponent.realm} • Lv.{opponent.level}</span>
                  <span className={getPowerColor(opponent.power)}>
                    Lực Chiến: {opponent.power}
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs">
                  <span className="text-green-400">{opponent.wins}W</span>
                  <span className="text-red-400">{opponent.losses}L</span>
                  <span className="text-yellow-400">
                    WR: {((opponent.wins / (opponent.wins + opponent.losses)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => challengePlayer(opponent)}
                  disabled={isSearching}
                  className="w-full sm:w-auto bg-blood-red hover:bg-blood-red/80"
                  size="sm"
                >
                  <Sword className="w-3 h-3 mr-1" />
                  <span className="text-xs">Thách Đấu</span>
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  {opponent.power > 120 ? 'Mạnh hơn' : opponent.power > 80 ? 'Ngang bằng' : 'Yếu hơn'}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Match */}
      <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="text-center space-y-3">
          <h3 className="font-semibold text-sm sm:text-base text-cultivator-gold">Tìm Trận Nhanh</h3>
          <Button
            onClick={() => {
              const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
              challengePlayer(randomOpponent);
            }}
            disabled={isSearching}
            className="w-full bg-gradient-cultivation text-black"
          >
            <Users className="w-4 h-4 mr-2" />
            Tìm Đối Thủ Ngẫu Nhiên
          </Button>
          <div className="text-xs text-muted-foreground">
            Hệ thống sẽ tự động tìm đối thủ có sức mạnh tương đương
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PvPArena;
