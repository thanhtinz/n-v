import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGameState } from '@/hooks/useGameState';
import { 
  Bell, 
  Coins, 
  Gem, 
  Zap, 
  Star, 
  Crown, 
  Plus,
  Gift,
  X,
  Sparkles
} from 'lucide-react';

const GameHeader = () => {
  const { gameState, addNotification } = useGameState();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRecharge = () => {
    addNotification('Chức năng nạp tiền sẽ sớm có!', 'info');
  };

  return (
    <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-lg sm:text-2xl font-bold gradient-gold bg-clip-text text-transparent">
              Tiên Vực Truyền Sinh
            </h1>
            <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold text-xs">
              Alpha v0.2
            </Badge>
          </div>
          
          {/* Player Info & Resources */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Player Name & Level */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="text-xs sm:text-sm text-muted-foreground">
                <span className="text-cultivator-gold font-medium">{gameState.player.name}</span>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-spirit-jade" />
                  <span>Lv.{gameState.player.level}</span>
                  <Crown className="w-3 h-3 text-mystical-purple ml-2" />
                  <span>VIP{gameState.player.vipLevel}</span>
                </div>
              </div>
            </div>

            {/* EXP Bar */}
            <div className="hidden md:block w-24">
              <div className="text-xs text-center mb-1">
                {gameState.player.exp}/{gameState.player.maxExp}
              </div>
              <Progress 
                value={(gameState.player.exp / gameState.player.maxExp) * 100} 
                className="h-2"
              />
            </div>

            {/* Resources */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Card className="px-2 py-1 bg-card/60">
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs font-medium">{gameState.player.gold.toLocaleString()}</span>
                  <Button size="sm" variant="ghost" className="h-4 w-4 p-0" onClick={handleRecharge}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </Card>

              <Card className="px-2 py-1 bg-card/60">
                <div className="flex items-center gap-1">
                  <Gem className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium">{gameState.player.diamonds.toLocaleString()}</span>
                  <Button size="sm" variant="ghost" className="h-4 w-4 p-0" onClick={handleRecharge}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </Card>

              {/* Linh Thạch Thường */}
              <Card className="px-2 py-1 bg-card/60">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-spirit-jade" />
                  <span className="text-xs font-medium">{gameState.player.spiritStones}</span>
                </div>
              </Card>

              {/* Linh Thạch Nạp */}
              <Card className="px-2 py-1 bg-card/60">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-mystical-purple" />
                  <span className="text-xs font-medium">{gameState.player.rechargeSpiritStones}</span>
                  <Button size="sm" variant="ghost" className="h-4 w-4 p-0" onClick={handleRecharge}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </Card>

              {/* Combat Power */}
              <Card className="px-2 py-1 bg-card/60">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-cultivator-gold" />
                  <span className="text-xs font-medium">{gameState.player.combatPower.toLocaleString()}</span>
                </div>
              </Card>

              {/* Notifications */}
              <div className="relative">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-4 h-4" />
                  {gameState.notifications.unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                      {gameState.notifications.unreadCount}
                    </Badge>
                  )}
                </Button>

                {showNotifications && (
                  <Card className="absolute right-0 top-full mt-2 w-80 max-h-64 overflow-y-auto z-50 bg-background/95 backdrop-blur-sm">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Thông Báo</h4>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setShowNotifications(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {gameState.notifications.messages.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Không có thông báo mới
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {gameState.notifications.messages.map((notification: any) => (
                            <div key={notification.id} className="p-2 bg-muted/20 rounded text-sm">
                              <div className="flex items-start gap-2">
                                <Gift className="w-4 h-4 text-spirit-jade mt-0.5" />
                                <div>
                                  <p>{notification.message}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(notification.timestamp).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
