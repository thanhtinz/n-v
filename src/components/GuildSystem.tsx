
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
  Gem
} from 'lucide-react';

const GuildSystem = () => {
  const { gameState, addNotification } = useGameState();

  const playerGuild = {
    name: 'Thiên Kiếm Môn',
    level: 8,
    exp: 15420,
    maxExp: 20000,
    members: 47,
    maxMembers: 50,
    rank: 3,
    power: 2580000,
    position: 'Trưởng Lão',
    contribution: 25680,
    weeklyContribution: 1250
  };

  const guildBuildings = [
    {
      name: 'Đại Sảnh',
      level: 8,
      description: 'Tăng số lượng thành viên tối đa',
      effect: '+50 Thành viên',
      upgradeCost: '50000 Điểm Bang',
      upgradeTime: '24h',
      status: 'active'
    },
    {
      name: 'Kho Báu',
      level: 6,
      description: 'Tăng phần thưởng hoạt động bang hội',
      effect: '+60% Phần thưởng',
      upgradeCost: '30000 Điểm Bang',
      upgradeTime: '12h',
      status: 'active'
    },
    {
      name: 'Luyện Võ Đài',
      level: 5,
      description: 'Mở tính năng thách đấu nội bộ',
      effect: 'PvP Bang Hội',
      upgradeCost: '25000 Điểm Bang',
      upgradeTime: '8h',
      status: 'upgrading'
    },
    {
      name: 'Nghiên Cứu Viện',
      level: 4,
      description: 'Mở khóa kỹ năng bang hội',
      effect: '+4 Kỹ năng',
      upgradeCost: '40000 Điểm Bang',
      upgradeTime: '16h',
      status: 'active'
    }
  ];

  const guildMembers = [
    { name: 'Kiếm Thần', position: 'Bang Chủ', level: 85, power: 250000, contribution: 45000, online: true },
    { name: 'Hỏa Vương', position: 'Phó Bang Chủ', level: 82, power: 230000, contribution: 38000, online: true },
    { name: 'Băng Nữ', position: 'Trưởng Lão', level: 80, power: 220000, contribution: 35000, online: false },
    { name: 'Lôi Đế', position: 'Trưởng Lão', level: 78, power: 210000, contribution: 32000, online: true },
    { name: 'Phong Thần', position: 'Tinh Anh', level: 75, power: 195000, contribution: 28000, online: true }
  ];

  const guildActivities = [
    {
      name: 'Boss Bang Hội',
      description: 'Cùng nhau tiêu diệt boss để nhận phần thưởng',
      time: '20:00 - 21:00',
      rewards: ['Điểm Bang', 'Trang bị hiếm', 'EXP'],
      participants: '15/50',
      status: 'available'
    },
    {
      name: 'Chiếm Lãnh Địa',
      description: 'Tranh đoạt lãnh địa với bang hội khác',
      time: 'Thứ 7 - 19:00',
      rewards: ['Tài nguyên lãnh địa', 'Danh vọng bang'],
      participants: '30/50',
      status: 'registered'
    },
    {
      name: 'Nhiệm Vụ Bang Hội',
      description: 'Hoàn thành nhiệm vụ để đóng góp điểm bang',
      time: 'Hàng ngày',
      rewards: ['Điểm đóng góp', 'EXP bang hội'],
      participants: '25/50',
      status: 'inProgress'
    }
  ];

  const guildSkills = [
    { name: 'Tăng EXP', level: 5, effect: '+50% EXP khi luyện công', maxLevel: 10 },
    { name: 'Tăng Đánh', level: 4, effect: '+40% Sát thương PvE', maxLevel: 10 },
    { name: 'Tăng Thủ', level: 3, effect: '+30% Phòng thủ', maxLevel: 10 },
    { name: 'Hồi Phục', level: 2, effect: '+20% Tốc độ hồi máu/mana', maxLevel: 10 }
  ];

  const guildRanking = [
    { rank: 1, name: 'Thiên Long Bát Bộ', level: 12, members: 50, power: 5200000 },
    { rank: 2, name: 'Minh Giáo', level: 11, members: 50, power: 4800000 },
    { rank: 3, name: 'Thiên Kiếm Môn', level: 8, members: 47, power: 2580000 },
    { rank: 4, name: 'Võ Đang Phái', level: 9, members: 45, power: 2400000 },
    { rank: 5, name: 'Nga Mi Phái', level: 7, members: 42, power: 2100000 }
  ];

  const handleJoinActivity = (activity: any) => {
    addNotification(`Đã tham gia ${activity.name}!`, 'success');
  };

  const handleUpgradeBuilding = (building: any) => {
    addNotification(`Bắt đầu nâng cấp ${building.name}!`, 'success');
  };

  const handleLearnSkill = (skill: any) => {
    addNotification(`Đã học kỹ năng ${skill.name}!`, 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-mystical-purple/10 to-cultivator-gold/10 border-mystical-purple/30">
        <h2 className="text-xl font-semibold text-mystical-purple mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Bang Hội: {playerGuild.name}
        </h2>
        
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
          <TabsTrigger value="buildings">Công Trình</TabsTrigger>
          <TabsTrigger value="skills">Kỹ Năng</TabsTrigger>
          <TabsTrigger value="ranking">Xếp Hạng</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-3">
          {guildActivities.map((activity, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-mystical-purple/20 to-cultivator-gold/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-mystical-purple" />
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
                    </div>
                    <div className="text-xs text-muted-foreground">{member.position} • Lv.{member.level}</div>
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
                        {building.status === 'upgrading' ? 'Đang nâng cấp' : 'Nâng cấp'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guildSkills.map((skill, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{skill.name}</h3>
                  <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                    {skill.level}/{skill.maxLevel}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{skill.effect}</p>
                
                <div className="mb-3">
                  <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2" />
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleLearnSkill(skill)}
                  disabled={skill.level >= skill.maxLevel}
                >
                  {skill.level >= skill.maxLevel ? 'Đã tối đa' : 'Nâng cấp'}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-3">
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-mystical-purple">Bảng Xếp Hạng Bang Hội</h3>
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
                      <div className="font-medium">{guild.name}</div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuildSystem;
