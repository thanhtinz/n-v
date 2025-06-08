
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
  avatar: string;
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
      rank: 1,
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: '2',
      name: 'Phong Vân',
      realm: 'Phàm Nhân',
      level: 5,
      power: 95,
      wins: 8,
      losses: 5,
      rank: 3,
      avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: '3',
      name: 'Lôi Đế',
      realm: 'Trúc Cơ',
      level: 12,
      power: 200,
      wins: 25,
      losses: 2,
      rank: 2,
      avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: '4',
      name: 'Hỏa Vương',
      realm: 'Luyện Khí',
      level: 6,
      power: 85,
      wins: 5,
      losses: 8,
      rank: 5,
      avatar: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=100&h=100&fit=crop&crop=center'
    }
  ]);

  const [selectedOpponent, setSelectedOpponent] = useState<PvPPlayer | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isInBattle, setIsInBattle] = useState(false);

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
      setIsInBattle(true);
    }, 2000);
  };

  const endBattle = () => {
    setIsInBattle(false);
    setSelectedOpponent(null);
  };

  if (isInBattle && selectedOpponent) {
    return (
      <div className="space-y-3 sm:space-y-4">
        {/* PvP Battle Visual */}
        <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-blood-red/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-spirit-jade/20 border-2 border-spirit-jade/50 flex items-center justify-center">
                <div className="w-8 h-8 bg-spirit-jade rounded-full animate-pulse" />
              </div>
              <div>
                <div className="font-medium text-sm sm:text-base">Bạn</div>
                <div className="text-xs text-muted-foreground">Tu Tiên Giả</div>
              </div>
            </div>
            
            <div className="text-center">
              <Sword className="w-6 h-6 sm:w-8 sm:h-8 text-blood-red animate-pulse mx-auto" />
              <div className="text-xs text-blood-red font-semibold mt-1">PvP</div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium text-sm sm:text-base text-right">{selectedOpponent.name}</div>
                <div className="text-xs text-muted-foreground text-right">{selectedOpponent.realm}</div>
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-blood-red/50">
                <img
                  src={selectedOpponent.avatar}
                  alt={selectedOpponent.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center bg-mystical-purple/20">
                  <Users className="w-6 h-6 text-mystical-purple" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Battle Controls */}
        <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={() => alert('Tấn công!')}
              className="flex-1 bg-blood-red hover:bg-blood-red/80"
            >
              <Sword className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Tấn Công</span>
            </Button>
            <Button
              onClick={endBattle}
              variant="outline"
              className="flex-1"
            >
              <span className="text-xs sm:text-sm">Kết Thúc</span>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
              <div className="flex items-start gap-3 flex-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-mystical-purple/50 bg-card/50 flex-shrink-0">
                  <img
                    src={opponent.avatar}
                    alt={opponent.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full flex items-center justify-center bg-mystical-purple/20">
                    <Users className="w-6 h-6 text-mystical-purple" />
                  </div>
                </div>
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
