
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Star, Coins, Gem, Zap } from 'lucide-react';

interface Player {
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  vipLevel: number;
  totalRecharge: number;
  gold: number;
  diamonds: number;
  spiritStones: number;
  rechargeSpiritStones: number;
  combatPower: number;
}

interface PlayerStatsProps {
  player: Player;
}

const PlayerStats = ({ player }: PlayerStatsProps) => {
  const expPercentage = (player.exp / player.maxExp) * 100;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-4">
      {/* Player Info Card */}
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 border-cultivator-gold/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-cultivator-gold">{player.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                Cấp {player.level}
              </Badge>
              <Badge variant="outline" className="text-xs border-mystical-purple text-mystical-purple">
                VIP {player.vipLevel}
              </Badge>
            </div>
          </div>
        </div>

        {/* Experience Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Kinh Nghiệm</span>
            <span className="text-cultivator-gold">{player.exp}/{player.maxExp}</span>
          </div>
          <Progress value={expPercentage} className="h-2" />
        </div>

        {/* Combat Power */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-divine-blue" />
          <span className="text-sm text-muted-foreground">Lực Chiến:</span>
          <span className="text-sm font-semibold text-divine-blue">{formatNumber(player.combatPower)}</span>
        </div>
      </Card>

      {/* Resources Card */}
      <Card className="p-4 bg-card/60 backdrop-blur-sm border-border/30">
        <h4 className="font-medium mb-3 text-spirit-jade">Tài Nguyên</h4>
        <div className="space-y-3">
          {/* Gold */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">Vàng</span>
            </div>
            <span className="text-sm font-medium text-yellow-500">{formatNumber(player.gold)}</span>
          </div>

          {/* Diamonds */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gem className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Kim Cương</span>
            </div>
            <span className="text-sm font-medium text-blue-400">{formatNumber(player.diamonds)}</span>
          </div>

          {/* Spirit Stones */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-spirit-jade" />
              <span className="text-sm">Linh Thạch</span>
            </div>
            <span className="text-sm font-medium text-spirit-jade">{formatNumber(player.spiritStones)}</span>
          </div>

          {/* Recharge Spirit Stones */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-mystical-purple" />
              <span className="text-sm">Linh Thạch Nạp</span>
            </div>
            <span className="text-sm font-medium text-mystical-purple">{formatNumber(player.rechargeSpiritStones)}</span>
          </div>
        </div>
      </Card>

      {/* VIP Info */}
      <Card className="p-4 bg-gradient-to-r from-mystical-purple/10 to-divine-blue/10 border-mystical-purple/30">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-mystical-purple" />
          <h4 className="font-medium text-mystical-purple">Thông Tin VIP</h4>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Tổng Nạp:</span>
            <span className="text-mystical-purple font-medium">{formatNumber(player.totalRecharge)} VNĐ</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayerStats;
