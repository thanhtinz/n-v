
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import ServerSelectionDialog from './ServerSelectionDialog';
import { 
  User,
  Server,
  Play,
  Music,
  Mail,
  Lock
} from 'lucide-react';

const authSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
});

interface GameLandingPageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onStartGame: () => void;
}

const GameLandingPage = ({ isLoggedIn, onLogin, onStartGame }: GameLandingPageProps) => {
  const [selectedServer, setSelectedServer] = useState('server1');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showServerDialog, setShowServerDialog] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const servers = [
    {
      id: 'server1',
      name: 'S1. Long Lâm',
      status: 'online' as const,
      population: 'Đông' as const,
      type: 'Mới' as const,
      players: 8542
    },
    {
      id: 'server2', 
      name: 'S2. Thiên Đạo',
      status: 'online' as const,
      population: 'Vừa' as const,
      type: 'Cũ' as const,
      players: 5234
    },
    {
      id: 'server3',
      name: 'S3. Huyền Nữ',
      status: 'maintenance' as const,
      population: 'Ít' as const,
      type: 'Mới' as const,
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

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate auth process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('userEmail', values.email);
      
      toast({
        title: isLogin ? 'Đăng nhập thành công' : 'Đăng ký thành công',
        description: `Chào mừng ${values.email}!`
      });

      onLogin();
      
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra, vui lòng thử lại',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
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
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60 animate-pulse"
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
        <div className="w-full max-w-xs space-y-3">
          {!isLoggedIn ? (
            // Compact login form
            <Card className="bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm border border-amber-500/30 p-4 rounded-xl shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-amber-400" />
                            <Input 
                              placeholder="Email" 
                              className="pl-10 bg-black/40 border-amber-500/30 text-white placeholder:text-gray-400 h-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-amber-400" />
                            <Input 
                              type="password"
                              placeholder="Mật khẩu"
                              className="pl-10 bg-black/40 border-amber-500/30 text-white placeholder:text-gray-400 h-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-2 rounded-lg shadow-lg h-9"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}
                  </Button>
                </form>
              </Form>

              <div className="mt-3 text-center">
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-amber-400 hover:text-amber-300 text-xs p-0 h-auto"
                >
                  {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                </Button>
              </div>
            </Card>
          ) : (
            // Logged in state
            <div className="space-y-3">
              {/* Server Selection Card */}
              <Card className="bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm border border-amber-500/30 p-3 rounded-xl shadow-2xl">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-amber-400 font-bold text-sm">
                      {servers.find(s => s.id === selectedServer)?.name || 'S1. Long Lâm'}
                    </h3>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-amber-600 text-amber-400 hover:bg-amber-100/10 font-bold rounded text-xs h-7"
                      onClick={() => setShowServerDialog(true)}
                    >
                      Đổi server
                    </Button>
                  </div>
                  
                  {/* Server Status */}
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">
                      Trạng thái: <span className={getStatusColor(servers.find(s => s.id === selectedServer)?.status || 'online')}>
                        {servers.find(s => s.id === selectedServer)?.status === 'online' ? 'Hoạt động' : 'Bảo trì'}
                      </span>
                    </span>
                    <span className="text-gray-300">
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
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-2 rounded-xl shadow-2xl text-base h-10"
                disabled={servers.find(s => s.id === selectedServer)?.status === 'maintenance'}
              >
                <Play className="w-4 h-4 mr-2" />
                Vào game
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-white/60">
          <p>© 2024 Tu Tiên Mộng Uý. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>

      {/* Server Selection Dialog */}
      <ServerSelectionDialog
        open={showServerDialog}
        onOpenChange={setShowServerDialog}
        selectedServer={selectedServer}
        onSelectServer={setSelectedServer}
        servers={servers}
      />
    </div>
  );
};

export default GameLandingPage;
