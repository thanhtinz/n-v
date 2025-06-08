
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  Sword, 
  Users, 
  Trophy, 
  Star,
  Crown,
  Shield,
  Zap,
  Target
} from 'lucide-react';

const ArenaSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [selectedMode, setSelectedMode] = useState('1v1');

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

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-divine-blue/10 to-mystical-purple/10 border-divine-blue/30">
        <h2 className="text-xl font-semibold text-divine-blue mb-4 flex items-center gap-2">
          <Sword className="w-5 h-5" />
          Hệ Thống PvP & Đấu Trường
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

export default ArenaSystem;
