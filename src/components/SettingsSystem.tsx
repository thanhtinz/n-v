
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGameState } from '@/hooks/useGameState';
import { 
  Settings,
  User,
  Shield,
  Bell,
  Volume2,
  Eye,
  Smartphone,
  Upload,
  History,
  Lock,
  Globe,
  MessageSquare,
  Swords,
  Camera,
  Mail
} from 'lucide-react';

const SettingsSystem = () => {
  const { addNotification } = useGameState();
  const [profile, setProfile] = useState({
    username: 'TuTienGia2024',
    email: 'tutien@example.com',
    avatar: '',
    bio: 'Tu tiên giả mới tham gia'
  });

  const [privacy, setPrivacy] = useState({
    acceptPvP: true,
    acceptMessages: false,
    showOnlineStatus: true,
    allowFriendRequests: true,
    profileVisible: true
  });

  const [notifications, setNotifications] = useState({
    gameEvents: true,
    combat: true,
    messages: false,
    system: true,
    email: false
  });

  const [audio, setAudio] = useState({
    masterVolume: 80,
    musicVolume: 70,
    soundEffects: 90,
    voiceChat: 60
  });

  const [loginHistory] = useState([
    { date: '2024-01-15 14:30', device: 'Chrome - Windows', ip: '192.168.1.100', status: 'success' },
    { date: '2024-01-14 09:15', device: 'Mobile App - Android', ip: '192.168.1.101', status: 'success' },
    { date: '2024-01-13 20:45', device: 'Firefox - MacOS', ip: '192.168.1.102', status: 'success' },
    { date: '2024-01-12 16:20', device: 'Chrome - Windows', ip: '192.168.1.100', status: 'failed' }
  ]);

  const handleAvatarUpload = () => {
    addNotification('Tính năng upload avatar sẽ sớm có!', 'info');
  };

  const handlePasswordChange = () => {
    addNotification('Mật khẩu đã được thay đổi thành công!', 'success');
  };

  const handleProfileUpdate = () => {
    addNotification('Thông tin cá nhân đã được cập nhật!', 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-6 h-6 text-cultivator-gold" />
          <h2 className="text-xl font-semibold text-cultivator-gold">Cài Đặt Hệ Thống</h2>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="profile" className="text-xs">Hồ Sơ</TabsTrigger>
            <TabsTrigger value="privacy" className="text-xs">Riêng Tư</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">Thông Báo</TabsTrigger>
            <TabsTrigger value="audio" className="text-xs">Âm Thanh</TabsTrigger>
            <TabsTrigger value="security" className="text-xs">Bảo Mật</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Thông Tin Cá Nhân
              </h3>

              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="bg-cultivator-gold text-white text-lg">
                      {profile.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button onClick={handleAvatarUpload} size="sm">
                      <Camera className="w-3 h-3 mr-1" />
                      Đổi Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG tối đa 2MB
                    </p>
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                    <Badge className="self-center bg-green-600">Đã xác thực</Badge>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Input
                    id="bio"
                    placeholder="Viết vài dòng về bản thân..."
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  />
                </div>

                <Button onClick={handleProfileUpdate}>
                  Cập Nhật Thông Tin
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Quyền Riêng Tư
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4" />
                      <span className="font-medium">Chấp nhận PvP</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cho phép người khác thách đấu bạn
                    </p>
                  </div>
                  <Switch
                    checked={privacy.acceptPvP}
                    onCheckedChange={(checked) => setPrivacy({...privacy, acceptPvP: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-medium">Tin nhắn từ người lạ</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nhận tin nhắn từ người không phải bạn bè
                    </p>
                  </div>
                  <Switch
                    checked={privacy.acceptMessages}
                    onCheckedChange={(checked) => setPrivacy({...privacy, acceptMessages: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">Hiển thị trạng thái online</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cho phép người khác biết bạn đang online
                    </p>
                  </div>
                  <Switch
                    checked={privacy.showOnlineStatus}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showOnlineStatus: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Lời mời kết bạn</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cho phép nhận lời mời kết bạn
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowFriendRequests}
                    onCheckedChange={(checked) => setPrivacy({...privacy, allowFriendRequests: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">Hồ sơ công khai</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cho phép người khác xem hồ sơ của bạn
                    </p>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Cài Đặt Thông Báo
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Sự kiện game</span>
                  <Switch
                    checked={notifications.gameEvents}
                    onCheckedChange={(checked) => setNotifications({...notifications, gameEvents: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span>Chiến đấu</span>
                  <Switch
                    checked={notifications.combat}
                    onCheckedChange={(checked) => setNotifications({...notifications, combat: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span>Tin nhắn</span>
                  <Switch
                    checked={notifications.messages}
                    onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span>Hệ thống</span>
                  <Switch
                    checked={notifications.system}
                    onCheckedChange={(checked) => setNotifications({...notifications, system: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span>Email thông báo</span>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Audio Settings */}
          <TabsContent value="audio" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Cài Đặt Âm Thanh
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Âm lượng chung</span>
                    <span>{audio.masterVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audio.masterVolume}
                    onChange={(e) => setAudio({...audio, masterVolume: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Nhạc nền</span>
                    <span>{audio.musicVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audio.musicVolume}
                    onChange={(e) => setAudio({...audio, musicVolume: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hiệu ứng âm thanh</span>
                    <span>{audio.soundEffects}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audio.soundEffects}
                    onChange={(e) => setAudio({...audio, soundEffects: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Voice chat</span>
                    <span>{audio.voiceChat}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audio.voiceChat}
                    onChange={(e) => setAudio({...audio, voiceChat: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Bảo Mật Tài Khoản
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Đổi mật khẩu</Label>
                  <div className="space-y-2">
                    <Input type="password" placeholder="Mật khẩu hiện tại" />
                    <Input type="password" placeholder="Mật khẩu mới" />
                    <Input type="password" placeholder="Xác nhận mật khẩu mới" />
                    <Button onClick={handlePasswordChange} size="sm">
                      Cập Nhật Mật Khẩu
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Lịch sử đăng nhập</Label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {loginHistory.map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium">{log.device}</p>
                            <p className="text-xs text-muted-foreground">{log.date}</p>
                          </div>
                        </div>
                        <Badge className={log.status === 'success' ? 'bg-green-600' : 'bg-red-600'}>
                          {log.status === 'success' ? 'Thành công' : 'Thất bại'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default SettingsSystem;
