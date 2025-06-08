import { useGameState } from '@/hooks/useGameState';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Star, 
  Coins, 
  Gem, 
  Crown, 
  Zap, 
  Shield, 
  Sword,
  Heart,
  Activity,
  Target,
  Clock,
  Trophy,
  Gift,
  Flame,
  BookOpen,
  Sparkles
} from 'lucide-react';

const PlayerOverview = () => {
  const { gameState } = useGameState();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const expPercentage = (gameState.player.exp / gameState.player.maxExp) * 100;

  // Get player info from localStorage
  const getPlayerInfo = () => {
    const savedCharacter = localStorage.getItem('playerCharacter');
    if (savedCharacter) {
      const player = JSON.parse(savedCharacter);
      return {
        gender: player.gender || 'male',
        class: player.class || 'sword'
      };
    }
    return { gender: 'male', class: 'sword' };
  };

  const playerInfo = getPlayerInfo();

  const getClassInfo = (playerClass: string) => {
    switch (playerClass) {
      case 'sword':
        return { name: 'Kiếm Khách', icon: Sword, color: 'text-red-400' };
      case 'magic':
        return { name: 'Pháp Sư', icon: Zap, color: 'text-blue-400' };
      case 'defense':
        return { name: 'Đấu Sĩ', icon: Shield, color: 'text-green-400' };
      default:
        return { name: 'Tu Sĩ', icon: User, color: 'text-gray-400' };
    }
  };

  const classInfo = getClassInfo(playerInfo.class);
  const ClassIcon = classInfo.icon;

  const quickActions = [
    { id: 'cultivation', label: 'Tu Luyện', icon: Activity, color: 'bg-cultivator-gold' },
    { id: 'combat', label: 'Chiến Đấu', icon: Sword, color: 'bg-blood-red' },
    { id: 'quests', label: 'Nhiệm Vụ', icon: BookOpen, color: 'bg-spirit-jade' },
    { id: 'events', label: 'Sự Kiện', icon: Flame, color: 'bg-mystical-purple' }
  ];

  const dailyProgress = [
    { label: 'Đăng nhập', current: gameState.dailyActivities.loginDays, max: 7, reward: '1000 Bạc', icon: Gift },
    { label: 'Nhiệm vụ', current: gameState.dailyActivities.questsCompleted, max: 5, reward: '50 KN', icon: Target },
    { label: 'Boss', current: gameState.dailyActivities.bossesDefeated, max: 3, reward: '5 KNYB', icon: Trophy },
    { label: 'Tu luyện', current: Math.floor(gameState.dailyActivities.cultivationTime / 60), max: 2, reward: '30 KN', icon: Clock }
  ];

  return (
    <div className="space-y-4">
      {/* Player Main Info */}
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 via-spirit-jade/10 to-divine-blue/10 border border-cultivator-gold/30">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-cultivator-gold">{gameState.player.name}</h2>
              <Badge variant="outline" className="border-mystical-purple text-mystical-purple">
                <Crown className="w-3 h-3 mr-1" />
                VIP {gameState.player.vipLevel}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <ClassIcon className={`w-4 h-4 ${classInfo.color}`} />
                <span className={classInfo.color}>{classInfo.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Cấp {gameState.player.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">{playerInfo.gender === 'male' ? 'Nam' : 'Nữ'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Kinh Nghiệm</span>
            <span>{gameState.player.exp}/{gameState.player.maxExp}</span>
          </div>
          <Progress value={expPercentage} className="h-3" />
        </div>

        {/* Combat Power */}
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/30 rounded-lg">
          <Star className="w-5 h-5 text-divine-blue" />
          <span className="text-lg font-bold text-divine-blue">{formatNumber(gameState.player.combatPower)}</span>
          <span className="text-sm text-muted-foreground">Chiến Lực</span>
        </div>
      </Card>

      {/* Resources */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-cultivator-gold">Tài Nguyên</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Coins className="w-6 h-6 text-gray-400" />
            <div>
              <div className="font-medium">{formatNumber(gameState.player.silver)}</div>
              <div className="text-xs text-muted-foreground">Bạc</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Gem className="w-6 h-6 text-yellow-500" />
            <div>
              <div className="font-medium">{formatNumber(gameState.player.goldIngots)}</div>
              <div className="text-xs text-muted-foreground">Kim Nguyên Bảo</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg col-span-2">
            <Sparkles className="w-6 h-6 text-mystical-purple" />
            <div>
              <div className="font-medium">{formatNumber(gameState.player.rechargeSpiritStones)}</div>
              <div className="text-xs text-muted-foreground">Linh Thạch (Nạp)</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-cultivator-gold">Hành Động Nhanh</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-16 flex-col gap-2 hover:bg-muted/50"
              >
                <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                  <ActionIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Daily Progress */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-cultivator-gold">Tiến Độ Hàng Ngày</h3>
        <div className="space-y-3">
          {dailyProgress.map((item, index) => {
            const ItemIcon = item.icon;
            const progress = Math.min((item.current / item.max) * 100, 100);
            const isCompleted = item.current >= item.max;
            
            return (
              <div key={index} className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ItemIcon className="w-4 h-4 text-spirit-jade" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{item.current}/{item.max}</span>
                    {isCompleted && <Star className="w-3 h-3 text-yellow-400" />}
                  </div>
                </div>
                <Progress value={progress} className="h-2 mb-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Phần thưởng: {item.reward}</span>
                  {isCompleted && (
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Nhận
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-cultivator-gold">Hoạt Động Gần Đây</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm p-2 bg-muted/10 rounded">
            <Star className="w-3 h-3 text-yellow-400" />
            <span>Hoàn thành nhiệm vụ hàng ngày</span>
            <span className="text-xs text-muted-foreground ml-auto">2 phút trước</span>
          </div>
          <div className="flex items-center gap-2 text-sm p-2 bg-muted/10 rounded">
            <Sword className="w-3 h-3 text-red-400" />
            <span>Chiến thắng trong chiến đấu PvE</span>
            <span className="text-xs text-muted-foreground ml-auto">15 phút trước</span>
          </div>
          <div className="flex items-center gap-2 text-sm p-2 bg-muted/10 rounded">
            <Activity className="w-3 h-3 text-green-400" />
            <span>Tu luyện 30 phút</span>
            <span className="text-xs text-muted-foreground ml-auto">1 giờ trước</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayerOverview;
