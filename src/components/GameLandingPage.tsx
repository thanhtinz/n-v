
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Server,
  Play,
  Users,
  Crown,
  Sparkles
} from 'lucide-react';

interface GameLandingPageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onStartGame: () => void;
}

const GameLandingPage = ({ isLoggedIn, onLogin, onStartGame }: GameLandingPageProps) => {
  const [selectedServer, setSelectedServer] = useState('server1');

  const servers = [
    {
      id: 'server1',
      name: 'Thiên Đạo Tiên Vực',
      status: 'online',
      population: 'Đông',
      type: 'Mới',
      players: 8542
    },
    {
      id: 'server2', 
      name: 'Cửu Thiên Huyền Nữ',
      status: 'online',
      population: 'Vừa',
      type: 'Cũ',
      players: 5234
    },
    {
      id: 'server3',
      name: 'Thái Cực Tiên Môn',
      status: 'maintenance',
      population: 'Ít',
      type: 'Mới',
      players: 2156
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getPopulationColor = (population: string) => {
    switch (population) {
      case 'Đông': return 'text-red-400';
      case 'Vừa': return 'text-yellow-400';
      case 'Ít': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cultivator-gold rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cultivator-gold via-spirit-jade to-mystical-purple bg-clip-text text-transparent">
              Tu Tiên
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-divine-blue mb-2">
            Idle Game
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Khám phá hành trình tu tiên vô tận trong thế giới huyền bí đầy phép thuật
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-border/50 p-6">
          {!isLoggedIn ? (
            // Not logged in - show login button
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cultivator-gold to-spirit-jade rounded-full flex items-center justify-center mx-auto">
                <User className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-cultivator-gold mb-2">
                  Chào Mừng Tu Tiên Giả
                </h3>
                <p className="text-muted-foreground text-sm">
                  Đăng nhập để bắt đầu hành trình tu tiên của bạn
                </p>
              </div>

              <Button 
                onClick={onLogin}
                size="lg" 
                className="w-full bg-gradient-to-r from-cultivator-gold to-spirit-jade hover:from-cultivator-gold/80 hover:to-spirit-jade/80"
              >
                <User className="w-5 h-5 mr-2" />
                Đăng Nhập
              </Button>

              <div className="text-xs text-muted-foreground">
                <p>Đăng nhập để truy cập:</p>
                <div className="flex justify-center gap-4 mt-2">
                  <span>• Lưu tiến độ</span>
                  <span>• Chat đa người</span>
                  <span>• Xếp hạng</span>
                </div>
              </div>
            </div>
          ) : (
            // Logged in - show server selection and start button
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-cultivator-gold mb-2">
                  Chọn Máy Chủ
                </h3>
                <p className="text-muted-foreground text-sm">
                  Chọn máy chủ để bắt đầu cuộc phiêu lưu
                </p>
              </div>

              {/* Server List */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {servers.map((server) => (
                  <div
                    key={server.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedServer === server.id
                        ? 'border-cultivator-gold bg-cultivator-gold/10'
                        : 'border-border hover:border-cultivator-gold/50'
                    } ${server.status === 'maintenance' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => server.status !== 'maintenance' && setSelectedServer(server.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Server className={`w-5 h-5 ${getStatusColor(server.status)}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{server.name}</span>
                            {server.type === 'Mới' && (
                              <Badge variant="outline" className="text-xs px-1 py-0 text-spirit-jade border-spirit-jade">
                                {server.type}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className={getStatusColor(server.status)}>
                              {server.status === 'online' ? '● Online' : '● Bảo trì'}
                            </span>
                            <span className={getPopulationColor(server.population)}>
                              {server.population}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{server.players.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Server Info */}
              {selectedServer && (
                <div className="p-3 bg-muted/20 rounded-lg border border-cultivator-gold/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-cultivator-gold" />
                    <span className="text-sm font-medium text-cultivator-gold">
                      Máy chủ đã chọn:
                    </span>
                  </div>
                  <p className="text-sm font-semibold">
                    {servers.find(s => s.id === selectedServer)?.name}
                  </p>
                </div>
              )}

              {/* Start Game Button */}
              <Button 
                onClick={onStartGame}
                size="lg" 
                className="w-full bg-gradient-to-r from-spirit-jade to-divine-blue hover:from-spirit-jade/80 hover:to-divine-blue/80"
                disabled={!selectedServer || servers.find(s => s.id === selectedServer)?.status === 'maintenance'}
              >
                <Play className="w-5 h-5 mr-2" />
                Bắt Đầu Trò Chơi
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                <p>Có thể thay đổi máy chủ sau trong cài đặt</p>
              </div>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Tu Tiên Idle Game. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
};

export default GameLandingPage;
