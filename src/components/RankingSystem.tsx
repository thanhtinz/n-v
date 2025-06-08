
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy,
  Crown,
  Sword,
  Zap,
  Users,
  Medal,
  Star
} from 'lucide-react';

interface RankingEntry {
  id: string;
  rank: number;
  name: string;
  realm: string;
  level: number;
  power: number;
  sect: string;
  change: 'up' | 'down' | 'same';
}

const RankingSystem = () => {
  const [activeTab, setActiveTab] = useState('power');

  const [powerRanking] = useState<RankingEntry[]>([
    { id: '1', rank: 1, name: 'Thiên Đế', realm: 'Đại La Cảnh', level: 999, power: 999999, sect: 'Thiên Cung', change: 'same' },
    { id: '2', rank: 2, name: 'Kiếm Thánh', realm: 'Hóa Thần', level: 850, power: 850000, sect: 'Kiếm Tông', change: 'up' },
    { id: '3', rank: 3, name: 'Phượng Hoàng Nữ Đế', realm: 'Hóa Thần', level: 840, power: 840000, sect: 'Phượng Hoàng Cung', change: 'down' },
    { id: '4', rank: 4, name: 'Long Vương', realm: 'Nguyên Anh', level: 750, power: 750000, sect: 'Long Cung', change: 'same' },
    { id: '5', rank: 5, name: 'Ma Đế', realm: 'Nguyên Anh', level: 720, power: 720000, sect: 'Ma Tông', change: 'up' },
    { id: '6', rank: 6, name: 'Băng Tuyết Tiên Nữ', realm: 'Nguyên Anh', level: 700, power: 700000, sect: 'Băng Cung', change: 'down' },
    { id: '7', rank: 7, name: 'Lôi Thần', realm: 'Kim Đan', level: 650, power: 650000, sect: 'Lôi Âm Tự', change: 'same' },
    { id: '8', rank: 8, name: 'Hỏa Vương', realm: 'Kim Đan', level: 620, power: 620000, sect: 'Hỏa Vũ Tông', change: 'up' },
    { id: '9', rank: 9, name: 'Đan Thánh', realm: 'Kim Đan', level: 600, power: 600000, sect: 'Đan Đường', change: 'same' },
    { id: '10', rank: 10, name: 'Tu Tiên Giả', realm: 'Phàm Nhân', level: 1, power: 100, sect: 'Vô Môn', change: 'same' }
  ]);

  const [sectRanking] = useState([
    { id: '1', rank: 1, name: 'Thiên Cung', members: 50000, avgPower: 80000, leader: 'Thiên Đế', change: 'same' },
    { id: '2', rank: 2, name: 'Kiếm Tông', members: 45000, avgPower: 75000, leader: 'Kiếm Thánh', change: 'up' },
    { id: '3', rank: 3, name: 'Phượng Hoàng Cung', members: 40000, avgPower: 70000, leader: 'Phượng Hoàng Nữ Đế', change: 'down' },
    { id: '4', rank: 4, name: 'Long Cung', members: 35000, avgPower: 65000, leader: 'Long Vương', change: 'same' },
    { id: '5', rank: 5, name: 'Ma Tông', members: 30000, avgPower: 60000, leader: 'Ma Đế', change: 'up' }
  ]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
  };

  const getChangeIcon = (change: string) => {
    if (change === 'up') return <span className="text-green-400">↗</span>;
    if (change === 'down') return <span className="text-red-400">↘</span>;
    return <span className="text-gray-400">-</span>;
  };

  const getRealmColor = (realm: string) => {
    const colors: Record<string, string> = {
      'Phàm Nhân': 'text-gray-400',
      'Luyện Khí': 'text-green-400',
      'Trúc Cơ': 'text-blue-400',
      'Kim Đan': 'text-purple-400',
      'Nguyên Anh': 'text-yellow-400',
      'Hóa Thần': 'text-red-400',
      'Đại La Cảnh': 'text-white'
    };
    return colors[realm] || 'text-gray-400';
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-cultivator-gold" />
          <h2 className="text-xl font-semibold text-cultivator-gold">Bảng Xếp Hạng</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="power" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Tu Vi
            </TabsTrigger>
            <TabsTrigger value="sect" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tông Môn
            </TabsTrigger>
            <TabsTrigger value="combat" className="flex items-center gap-2">
              <Sword className="w-4 h-4" />
              Chiến Đấu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="power" className="space-y-3">
            <div className="space-y-2">
              {powerRanking.map((entry) => (
                <Card key={entry.id} className={`p-3 bg-muted/20 hover:bg-muted/40 transition-colors ${entry.name === 'Tu Tiên Giả' ? 'border-cultivator-gold' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRankIcon(entry.rank)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.name}</span>
                          {entry.name === 'Tu Tiên Giả' && (
                            <Badge variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                              Bạn
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className={getRealmColor(entry.realm)}>{entry.realm}</span> • 
                          <span className="ml-1">{entry.sect}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-cultivator-gold">
                          {entry.power.toLocaleString()}
                        </span>
                        {getChangeIcon(entry.change)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tầng {entry.level}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sect" className="space-y-3">
            <div className="space-y-2">
              {sectRanking.map((entry) => (
                <Card key={entry.id} className="p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRankIcon(entry.rank)}
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Chưởng Môn: {entry.leader}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-spirit-jade">
                          {entry.avgPower.toLocaleString()}
                        </span>
                        {getChangeIcon(entry.change)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {entry.members.toLocaleString()} thành viên
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combat" className="space-y-3">
            <div className="text-center py-8 text-muted-foreground">
              <Sword className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Bảng xếp hạng chiến đấu đang được cập nhật...</p>
              <p className="text-xs mt-2">Thống kê PvP và đánh boss!</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default RankingSystem;
