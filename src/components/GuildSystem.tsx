
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  Shield, 
  Users, 
  Trophy, 
  Star,
  Crown,
  Sword,
  Target,
  Gift,
  Building,
  Gem,
  UserPlus,
  Gavel,
  Flag,
  Coins
} from 'lucide-react';

const GuildSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [showCreateGuild, setShowCreateGuild] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');

  const playerGuild = {
    id: 'heavenly-sword',
    name: 'Thiên Kiếm Môn',
    description: 'Bang hội được thành lập bởi các tu tiên giả chí cốt đạo tâm',
    level: 8,
    exp: 15420,
    maxExp: 20000,
    members: 47,
    maxMembers: 50,
    rank: 3,
    power: 2580000,
    position: 'Trưởng Lão',
    contribution: 25680,
    weeklyContribution: 1250,
    founder: 'Kiếm Thần',
    foundedDate: '2024-01-15',
    treasury: {
      silver: 1250000,
      goldIngots: 5000,
      materials: 500
    }
  };

  const guildBuildings = [
    {
      name: 'Đại Sảnh Bang Hội',
      level: 8,
      description: 'Nơi tập trung và họp mặt của bang hội',
      effect: '+50 Thành viên tối đa',
      upgradeCost: '50000 Điểm Bang',
      upgradeTime: '24h',
      status: 'active'
    },
    {
      name: 'Kho Báu Chung',
      level: 6,
      description: 'Kho lưu trữ tài sản chung của bang hội',
      effect: '+60% Dung lượng kho',
      upgradeCost: '30000 Điểm Bang',
      upgradeTime: '12h',
      status: 'active'
    },
    {
      name: 'Luyện Võ Đài',
      level: 5,
      description: 'Nơi các thành viên thiết đấu với nhau',
      effect: 'Mở PvP nội bộ',
      upgradeCost: '25000 Điểm Bang',
      upgradeTime: '8h',
      status: 'upgrading'
    },
    {
      name: 'Phòng Chiến Lược',
      level: 4,
      description: 'Lập kế hoạch chiến đấu và quản lý bang hội',
      effect: '+4 Chiến lược bang',
      upgradeCost: '40000 Điểm Bang',
      upgradeTime: '16h',
      status: 'active'
    }
  ];

  const guildMembers = [
    { name: 'Kiếm Thần', position: 'Bang Chủ', level: 85, power: 250000, contribution: 45000, online: true, joinDate: '2024-01-15' },
    { name: 'Hỏa Vương', position: 'Phó Bang Chủ', level: 82, power: 230000, contribution: 38000, online: true, joinDate: '2024-01-20' },
    { name: 'Băng Nữ', position: 'Trưởng Lão', level: 80, power: 220000, contribution: 35000, online: false, joinDate: '2024-02-01' },
    { name: 'Lôi Đế', position: 'Trưởng Lão', level: 78, power: 210000, contribution: 32000, online: true, joinDate: '2024-02-10' },
    { name: 'Phong Thần', position: 'Tinh Anh', level: 75, power: 195000, contribution: 28000, online: true, joinDate: '2024-02-15' }
  ];

  const guildActivities = [
    {
      name: 'Chiến Bang Hội',
      description: 'Tranh đoạt lãnh thổ với các bang hội khác',
      time: 'Thứ 7 - 20:00',
      rewards: ['Điểm Bang', 'Tài nguyên lãnh thổ', 'Danh vọng'],
      participants: '30/50',
      status: 'registered',
      type: 'pvp'
    },
    {
      name: 'Săn Boss Chung',
      description: 'Cùng nhau tiêu diệt boss để nhận phần thưởng',
      time: '20:00 - 21:00',
      rewards: ['Điểm Bang', 'Trang bị hiếm', 'EXP'],
      participants: '15/50',
      status: 'available',
      type: 'pve'
    },
    {
      name: 'Xây Dựng Bang Hội',
      description: 'Đóng góp tài nguyên để phát triển bang hội',
      time: 'Hàng ngày',
      rewards: ['Điểm đóng góp', 'EXP bang hội'],
      participants: '25/50',
      status: 'inProgress',
      type: 'building'
    }
  ];

  const guildRanking = [
    { rank: 1, name: 'Thiên Long Bát Bộ', level: 12, members: 50, power: 5200000, type: 'player-created' },
    { rank: 2, name: 'Minh Giáo Liên Minh', level: 11, members: 50, power: 4800000, type: 'player-created' },
    { rank: 3, name: 'Thiên Kiếm Môn', level: 8, members: 47, power: 2580000, type: 'player-created' },
    { rank: 4, name: 'Võ Đang Hội', level: 9, members: 45, power: 2400000, type: 'player-created' },
    { rank: 5, name: 'Nga Mi Liên Đoàn', level: 7, members: 42, power: 2100000, type: 'player-created' }
  ];

  const handleJoinActivity = (activity: any) => {
    addNotification(`Đã tham gia ${activity.name}!`, 'success');
  };

  const handleUpgradeBuilding = (building: any) => {
    addNotification(`Bắt đầu nâng cấp ${building.name}!`, 'success');
  };

  const handleCreateGuild = () => {
    if (newGuildName.trim()) {
      addNotification(`Đã thành lập bang hội "${newGuildName}"!`, 'success');
      setShowCreateGuild(false);
      setNewGuildName('');
    }
  };

  const handleDonate = (type: string) => {
    addNotification(`Đã đóng góp ${type} cho bang hội!`, 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-mystical-purple/10 to-cultivator-gold/10 border-mystical-purple/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-mystical-purple flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Bang Hội: {playerGuild.name}
          </h2>
          <Badge variant="outline" className="border-mystical-purple text-mystical-purple">
            Do Tu Tiên Giả Lập
          </Badge>
        </div>
        
        {/* Guild Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-lg font-bold text-mystical-purple">Lv.{playerGuild.level}</div>
            <div className="text-xs text-muted-foreground">Cấp Bang</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-lg font-bold text-cultivator-gold">#{playerGuild.rank}</div>
            <div className="text-xs text-muted-foreground">Xếp Hạng</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-lg font-bold text-spirit-jade">{playerGuild.members}/{playerGuild.maxMembers}</div>
            <div className="text-xs text-muted-foreground">Thành Viên</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-lg font-bold text-divine-blue">{(playerGuild.power / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Lực Chiến</div>
          </div>
        </div>

        <div className="mb-4 p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Flag className="w-4 h-4 text-cultivator-gold" />
            <span className="font-medium">Thông tin thành lập:</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Người sáng lập: <span className="text-cultivator-gold">{playerGuild.founder}</span><br/>
            Ngày thành lập: {playerGuild.foundedDate}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>EXP Bang Hội</span>
            <span>{playerGuild.exp}/{playerGuild.maxExp}</span>
          </div>
          <Progress value={(playerGuild.exp / playerGuild.maxExp) * 100} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-mystical-purple text-mystical-purple">
            {playerGuild.position}
          </Badge>
          <div className="text-sm">
            <span className="text-muted-foreground">Đóng góp: </span>
            <span className="font-medium text-cultivator-gold">{playerGuild.contribution.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="activities">Hoạt Động</TabsTrigger>
          <TabsTrigger value="members">Thành Viên</TabsTrigger>
          <TabsTrigger value="buildings">Xây Dựng</TabsTrigger>
          <TabsTrigger value="treasury">Kho Bạc</TabsTrigger>
          <TabsTrigger value="ranking">Xếp Hạng</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-3">
          {guildActivities.map((activity, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-mystical-purple/20 to-cultivator-gold/20 flex items-center justify-center">
                  {activity.type === 'pvp' ? <Sword className="w-6 h-6 text-red-400" /> :
                   activity.type === 'pve' ? <Target className="w-6 h-6 text-mystical-purple" /> :
                   <Building className="w-6 h-6 text-cultivator-gold" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{activity.name}</h3>
                    <Badge variant="outline" className={
                      activity.status === 'available' ? 'border-green-500 text-green-500' :
                      activity.status === 'registered' ? 'border-blue-500 text-blue-500' :
                      'border-yellow-500 text-yellow-500'
                    }>
                      {activity.status === 'available' ? 'Có thể tham gia' :
                       activity.status === 'registered' ? 'Đã đăng ký' : 'Đang diễn ra'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Thời gian: {activity.time} | Tham gia: {activity.participants}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {activity.rewards.map((reward, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-spirit-jade text-spirit-jade">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleJoinActivity(activity)}
                      disabled={activity.status === 'registered'}
                    >
                      {activity.status === 'registered' ? 'Đã tham gia' : 'Tham gia'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="members" className="space-y-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-mystical-purple">Danh Sách Thành Viên</h3>
            <Button size="sm" variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Mời Thành Viên
            </Button>
          </div>
          
          {guildMembers.map((member, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${member.online ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      {member.position === 'Bang Chủ' && <Crown className="w-4 h-4 text-yellow-500" />}
                      {member.name === playerGuild.founder && <Badge variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">Sáng Lập</Badge>}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {member.position} • Lv.{member.level} • Gia nhập: {member.joinDate}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-divine-blue">{(member.power / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-muted-foreground">{member.contribution.toLocaleString()} đóng góp</div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="buildings" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guildBuildings.map((building, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cultivator-gold/20 to-spirit-jade/20 flex items-center justify-center">
                    <Building className="w-6 h-6 text-cultivator-gold" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{building.name}</h3>
                      <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                        Lv.{building.level}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{building.description}</p>
                    <div className="text-xs text-spirit-jade mb-3">{building.effect}</div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Chi phí: {building.upgradeCost}<br/>
                        Thời gian: {building.upgradeTime}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleUpgradeBuilding(building)}
                        disabled={building.status === 'upgrading'}
                      >
                        {building.status === 'upgrading' ? 'Đang xây' : 'Nâng cấp'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="treasury" className="space-y-3">
          <Card className="p-4">
            <h3 className="font-semibold mb-4 text-mystical-purple flex items-center gap-2">
              <Gem className="w-5 h-5" />
              Kho Bạc Bang Hội
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Coins className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-lg font-bold">{playerGuild.treasury.silver.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Bạc</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Gem className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-lg font-bold">{playerGuild.treasury.goldIngots.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Kim Nguyên Bảo</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-lg font-bold">{playerGuild.treasury.materials}</div>
                <div className="text-xs text-muted-foreground">Nguyên Liệu</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-cultivator-gold">Đóng Góp Cho Bang Hội</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleDonate('silver')}>
                  <Coins className="w-4 h-4 mr-2" />
                  Đóng Góp Bạc
                </Button>
                <Button variant="outline" onClick={() => handleDonate('gold')}>
                  <Gem className="w-4 h-4 mr-2" />
                  Đóng Góp KNYB
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-3">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-mystical-purple">Bảng Xếp Hạng Bang Hội</h3>
              <Button size="sm" variant="outline" onClick={() => setShowCreateGuild(true)}>
                <Flag className="w-4 h-4 mr-2" />
                Lập Bang Hội
              </Button>
            </div>
            
            <div className="space-y-2">
              {guildRanking.map((guild, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${guild.name === playerGuild.name ? 'bg-mystical-purple/10 border border-mystical-purple/30' : 'bg-muted/20'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      guild.rank === 1 ? 'bg-yellow-500 text-black' :
                      guild.rank === 2 ? 'bg-gray-400 text-black' :
                      guild.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {guild.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{guild.name}</span>
                        <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                          Tu Tiên Giả Lập
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Lv.{guild.level} • {guild.members} thành viên</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-divine-blue">{(guild.power / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-muted-foreground">Lực chiến</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {showCreateGuild && (
            <Card className="p-4 border-cultivator-gold/50">
              <h4 className="font-medium mb-3 text-cultivator-gold">Thành Lập Bang Hội Mới</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nhập tên bang hội..."
                  value={newGuildName}
                  onChange={(e) => setNewGuildName(e.target.value)}
                  className="w-full p-2 rounded border bg-background"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCreateGuild} disabled={!newGuildName.trim()}>
                    Thành Lập
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateGuild(false)}>
                    Hủy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Chi phí: 100,000 Bạc • Yêu cầu: Lv.20 • Cần 5 thành viên sáng lập
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuildSystem;
