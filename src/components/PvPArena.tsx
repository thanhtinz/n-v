
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { Sword, Trophy, Users, Crown, Star, Shield, Target, Zap } from 'lucide-react';

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
  const { gameState, addNotification } = useGameState();
  
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

  // Arena system data
  const arenaRanks = [
    { rank: 'Đồng', minPoints: 0, maxPoints: 1000, rewards: '500 Điểm Arena' },
    { rank: 'Bạc', minPoints: 1000, maxPoints: 2000, rewards: '1000 Điểm Arena' },
    { rank: 'Vàng', minPoints: 2000, maxPoints: 3500, rewards: '2000 Điểm Arena + Skin' },
    { rank: 'Bạch Kim', minPoints: 3500, maxPoints: 5000, rewards: '3500 Điểm Arena + Danh hiệu' },
    { rank: 'Kim Cương', minPoints: 5000, maxPoints: 7000, rewards: '5000 Điểm Arena + Trang bị Legendary' },
    { rank: 'Cao Thủ', minPoints: 7000, maxPoints: 10000, rewards: '8000 Điểm Arena + Khung Avatar' },
    { rank: 'Tông Sư', minPoints: 10000, maxPoints: 999999, rewards: '12000 Điểm Arena + Danh hiệu độc quyền' }
  ];

  const pvpModes = [
    {
      id: '1v1',
      name: 'Đấu Trường 1v1',
      description: 'Thi đấu cá nhân, thể hiện kỹ năng',
      minLevel: 20,
      rewards: ['Điểm Arena', 'EXP PvP', 'Danh vọng'],
      cost: '100 Bạc',
      icon: Sword
    },
    {
      id: '3v3',
      name: 'Đấu Trường 3v3',
      description: 'Thi đấu nhóm, cần phối hợp',
      minLevel: 30,
      rewards: ['Điểm Arena', 'Trang bị PvP', 'Danh hiệu'],
      cost: '200 Bạc',
      icon: Users
    },
    {
      id: 'ranked',
      name: 'Ranked Match',
      description: 'Xếp hạng chính thức, ảnh hưởng rank',
      minLevel: 25,
      rewards: ['Điểm Rank', 'Trang bị độc quyền'],
      cost: '500 Bạc',
      icon: Trophy
    },
    {
      id: 'guild',
      name: 'Bang Hội PvP',
      description: 'Đại diện bang hội thi đấu',
      minLevel: 35,
      rewards: ['Điểm Bang Hội', 'Vinh danh bang'],
      cost: '1000 Bạc',
      icon: Shield
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Kiếm Thánh', points: 9850, winRate: 87, guild: 'Thiên Kiếm Môn' },
    { rank: 2, name: 'Hỏa Thần', points: 9720, winRate: 85, guild: 'Liệt Hỏa Bang' },
    { rank: 3, name: 'Băng Nữ Hoàng', points: 9650, winRate: 83, guild: 'Băng Tâm Cung' },
    { rank: 4, name: 'Lôi Đế', points: 9500, winRate: 82, guild: 'Lôi Âm Tông' },
    { rank: 5, name: 'Phong Vương', points: 9350, winRate: 80, guild: 'Thanh Phong Lữ' }
  ];

  const tournaments = [
    {
      name: 'Thiên Hạ Đệ Nhất',
      description: 'Giải đấu lớn nhất server',
      startTime: '2024-03-15 20:00',
      prize: '100,000 Kim Nguyên Bảo + Danh hiệu Thiên Hạ Đệ Nhất',
      participants: 512,
      status: 'Đang đăng ký'
    },
    {
      name: 'Tân Tinh Vương',
      description: 'Giải đấu dành cho tân thủ',
      startTime: '2024-03-10 19:00',
      prize: '20,000 Kim Nguyên Bảo + Trang bị Tân Thủ',
      participants: 256,
      status: 'Sắp bắt đầu'
    }
  ];

  const playerArenaInfo = {
    currentRank: 'Vàng III',
    points: 2850,
    wins: 127,
    losses: 43,
    winRate: 75,
    dailyMatches: 8,
    maxDailyMatches: 10
  };

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

  const handleJoinPvP = (mode: any) => {
    if (gameState.player.level < mode.minLevel) {
      addNotification(`Cần đạt cấp ${mode.minLevel} để tham gia!`, 'warning');
      return;
    }
    addNotification(`Đã vào hàng chờ ${mode.name}!`, 'success');
  };

  const handleJoinTournament = (tournament: any) => {
    addNotification(`Đã đăng ký ${tournament.name}!`, 'success');
  };

  const getCurrentRankInfo = () => {
    return arenaRanks.find(rank => 
      playerArenaInfo.points >= rank.minPoints && 
      playerArenaInfo.points < rank.maxPoints
    ) || arenaRanks[0];
  };

  const getNextRankInfo = () => {
    const currentIndex = arenaRanks.findIndex(rank => 
      playerArenaInfo.points >= rank.minPoints && 
      playerArenaInfo.points < rank.maxPoints
    );
    return arenaRanks[currentIndex + 1] || null;
  };

  const currentRank = getCurrentRankInfo();
  const nextRank = getNextRankInfo();

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
              onClick={() => addNotification('Tấn công!', 'info')}
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
      {/* Arena Header */}
      <Card className="p-4 bg-gradient-to-r from-divine-blue/10 to-mystical-purple/10 border-divine-blue/30">
        <h2 className="text-xl font-semibold text-divine-blue mb-4 flex items-center gap-2">
          <Sword className="w-5 h-5" />
          PvP & Đấu Trường
        </h2>
        
        {/* Player Arena Info */}
        <Card className="p-3 mb-4 bg-muted/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-divine-blue">{playerArenaInfo.currentRank}</div>
              <div className="text-xs text-muted-foreground">Hạng Hiện Tại</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-cultivator-gold">{playerArenaInfo.points}</div>
              <div className="text-xs text-muted-foreground">Điểm Arena</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-spirit-jade">{playerArenaInfo.winRate}%</div>
              <div className="text-xs text-muted-foreground">Tỷ Lệ Thắng</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-mystical-purple">{playerArenaInfo.dailyMatches}/{playerArenaInfo.maxDailyMatches}</div>
              <div className="text-xs text-muted-foreground">Trận Hôm Nay</div>
            </div>
          </div>
          
          {nextRank && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Tiến độ lên {nextRank.rank}</span>
                <span>{playerArenaInfo.points}/{nextRank.minPoints}</span>
              </div>
              <Progress 
                value={((playerArenaInfo.points - currentRank.minPoints) / (nextRank.minPoints - currentRank.minPoints)) * 100} 
                className="h-2" 
              />
            </div>
          )}
        </Card>
      </Card>

      <Tabs defaultValue="modes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="modes">Chế Độ</TabsTrigger>
          <TabsTrigger value="ranking">Xếp Hạng</TabsTrigger>
          <TabsTrigger value="tournament">Giải Đấu</TabsTrigger>
          <TabsTrigger value="rewards">Phần Thưởng</TabsTrigger>
        </TabsList>

        <TabsContent value="modes" className="space-y-3">
          {/* Arena Modes */}
          {pvpModes.map((mode) => {
            const ModeIcon = mode.icon;
            return (
              <Card key={mode.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-divine-blue/20 to-mystical-purple/20 flex items-center justify-center">
                    <ModeIcon className="w-6 h-6 text-divine-blue" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{mode.name}</h3>
                      <Badge variant="outline" className="border-divine-blue text-divine-blue">
                        Lv.{mode.minLevel}+
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {mode.rewards.map((reward, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-spirit-jade text-spirit-jade">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{mode.cost}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleJoinPvP(mode)}
                          disabled={playerArenaInfo.dailyMatches >= playerArenaInfo.maxDailyMatches}
                        >
                          Tham Chiến
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

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
        </TabsContent>

        <TabsContent value="ranking" className="space-y-3">
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-divine-blue">Bảng Xếp Hạng Arena</h3>
            <div className="space-y-2">
              {leaderboard.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1 ? 'bg-yellow-500 text-black' :
                      player.rank === 2 ? 'bg-gray-400 text-black' :
                      player.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {player.rank}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-xs text-muted-foreground">{player.guild}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-divine-blue">{player.points}</div>
                    <div className="text-xs text-muted-foreground">{player.winRate}% WR</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tournament" className="space-y-3">
          {tournaments.map((tournament, index) => (
            <Card key={index} className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-divine-blue/10 border-cultivator-gold/30">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cultivator-gold/20 to-divine-blue/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-cultivator-gold" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-cultivator-gold">{tournament.name}</h3>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      {tournament.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{tournament.description}</p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Thời gian: {tournament.startTime} | Người tham gia: {tournament.participants}
                  </div>
                  
                  <div className="bg-muted/20 p-2 rounded text-xs mb-3">
                    <strong>Phần thưởng:</strong> {tournament.prize}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                    onClick={() => handleJoinTournament(tournament)}
                  >
                    Đăng Ký Tham Gia
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rewards" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arenaRanks.map((rank, index) => (
              <Card key={index} className={`p-4 ${playerArenaInfo.points >= rank.minPoints && playerArenaInfo.points < rank.maxPoints ? 'border-divine-blue bg-divine-blue/5' : 'bg-muted/20'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{rank.rank}</h3>
                  <Badge variant="outline" className="border-divine-blue text-divine-blue">
                    {rank.minPoints} - {rank.maxPoints === 999999 ? '∞' : rank.maxPoints}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {rank.rewards}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PvPArena;
