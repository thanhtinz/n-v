
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  User,
  Server,
  Play,
  Users,
  Crown,
  Sparkles,
  Music
} from 'lucide-react';

interface GameLandingPageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onStartGame: () => void;
}

const GameLandingPage = ({ isLoggedIn, onLogin, onStartGame }: GameLandingPageProps) => {
  const [selectedServer, setSelectedServer] = useState('server1');
  const [username, setUsername] = useState('');

  const servers = [
    {
      id: 'server1',
      name: 'S1. Long Lâm',
      status: 'online',
      population: 'Đông',
      type: 'Mới',
      players: 8542
    },
    {
      id: 'server2', 
      name: 'S2. Thiên Đạo',
      status: 'online',
      population: 'Vừa',
      type: 'Cũ',
      players: 5234
    },
    {
      id: 'server3',
      name: 'S3. Huyền Nữ',
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
        backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Music button in corner */}
      <div className="absolute bottom-4 right-4 z-20">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-black/50 border-white/30 text-white hover:bg-black/70"
        >
          <Music className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
              Tu Tiên
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-2 drop-shadow-lg">
            Mộng Uý
          </h2>
          <p className="text-base text-white/80 max-w-md mx-auto drop-shadow-md">
            Khám phá hành trình tu tiên vô tận trong thế giới huyền bí đầy phép thuật
          </p>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-sm space-y-4">
          {!isLoggedIn ? (
            // Not logged in - show login form
            <div className="space-y-4">
              {/* Login Input Card */}
              <Card className="bg-gradient-to-b from-amber-100/90 to-amber-200/90 backdrop-blur-sm border-2 border-amber-300/50 p-4 rounded-2xl shadow-2xl">
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-amber-800 font-bold text-lg">Đăng nhập</h3>
                  </div>
                  <Input
                    placeholder="Tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white/80 border-amber-300 text-center text-amber-900 placeholder:text-amber-600"
                  />
                  <div className="flex justify-between">
                    <Button 
                      onClick={onLogin}
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold px-6 py-2 rounded-lg shadow-lg"
                    >
                      Đăng nhập
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-amber-600 text-amber-700 hover:bg-amber-100 font-bold px-6 py-2 rounded-lg"
                    >
                      Đổi server
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            // Logged in - show server selection
            <div className="space-y-4">
              {/* Login Status Card */}
              <Card className="bg-gradient-to-b from-amber-100/90 to-amber-200/90 backdrop-blur-sm border-2 border-amber-300/50 p-4 rounded-2xl shadow-2xl">
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-amber-800 font-bold text-lg">Đăng nhập</h3>
                    <div className="text-amber-700 text-sm font-medium">
                      {username || 'Đạo hữu'}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      className="border-amber-600 text-amber-700 hover:bg-amber-100 font-bold px-6 py-2 rounded-lg"
                    >
                      Đăng nhập
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-amber-600 text-amber-700 hover:bg-amber-100 font-bold px-6 py-2 rounded-lg"
                    >
                      Đổi server
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Server Selection Card */}
              <Card className="bg-gradient-to-b from-amber-100/90 to-amber-200/90 backdrop-blur-sm border-2 border-amber-300/50 p-4 rounded-2xl shadow-2xl">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-amber-800 font-bold text-base">
                      {servers.find(s => s.id === selectedServer)?.name || 'S1. Long Lâm'}
                    </h3>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-amber-600 text-amber-700 hover:bg-amber-100 font-bold rounded-lg"
                      onClick={() => {
                        // Cycle through servers
                        const currentIndex = servers.findIndex(s => s.id === selectedServer);
                        const nextIndex = (currentIndex + 1) % servers.length;
                        setSelectedServer(servers[nextIndex].id);
                      }}
                    >
                      Chọn server
                    </Button>
                  </div>
                  
                  {/* Server Status */}
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-700">
                      Trạng thái: <span className={getStatusColor(servers.find(s => s.id === selectedServer)?.status || 'online')}>
                        {servers.find(s => s.id === selectedServer)?.status === 'online' ? 'Hoạt động' : 'Bảo trì'}
                      </span>
                    </span>
                    <span className="text-amber-700">
                      Đông: <span className={getPopulationColor(servers.find(s => s.id === selectedServer)?.population || 'Vừa')}>
                        {servers.find(s => s.id === selectedServer)?.population}
                      </span>
                    </span>
                  </div>
                </div>
              </Card>

              {/* Enter Game Button */}
              <Button 
                onClick={onStartGame}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 rounded-2xl shadow-2xl text-lg"
                disabled={servers.find(s => s.id === selectedServer)?.status === 'maintenance'}
              >
                Vào game
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/60">
          <p>© 2024 Tu Tiên Mộng Uý. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
};

export default GameLandingPage;
