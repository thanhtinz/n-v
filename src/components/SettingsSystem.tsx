import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  Settings,
  Volume2,
  Eye,
  Gamepad2,
  Info,
  User,
  Shield,
  Gift,
  LogOut,
  Bell,
  MessageCircle,
  Lock,
  Globe
} from 'lucide-react';

const SettingsSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Audio Settings
    masterVolume: 70,
    musicVolume: 50,
    sfxVolume: 80,
    voiceVolume: 60,
    
    // Display Settings
    showDamageNumbers: true,
    showOtherPlayers: true,
    showEffects: true,
    autoPickupItems: true,
    showMinimap: true,
    enablePvP: false,
    showChat: true,
    autoSave: true,
    
    // Chat Settings
    enableWorldChat: true,
    enableSectChat: true,
    enablePrivateChat: true,
    autoTranslate: false,
    chatFontSize: 14,
    showChatTimestamp: true,
    blockStrangers: false,
    
    // Notification Settings
    enableSystemNotifications: true,
    enableEventNotifications: true,
    enableCombatNotifications: true,
    enableSocialNotifications: true,
    soundNotifications: true,
    
    // Privacy Settings
    showOnlineStatus: true,
    allowFriendRequests: true,
    allowGuildInvites: true,
    showEquipment: true,
    allowSpectate: true,
    
    // Personal Info
    nickname: gameState.player.name,
    signature: 'Tu tiên giả đang trên con đường tu luyện...',
    birthday: '',
    gender: 'Bí mật'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    addNotification(`Đã cập nhật cài đặt ${key}`, 'success');
  };

  const resetSettings = () => {
    addNotification('Đã reset về cài đặt mặc định', 'success');
  };

  const saveProfile = () => {
    addNotification('Đã lưu thông tin cá nhân', 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-6 h-6 text-cultivator-gold" />
          <h2 className="text-xl font-semibold text-cultivator-gold">Cài Đặt Cá Nhân</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="general">Chung</TabsTrigger>
            <TabsTrigger value="audio">Âm Thanh</TabsTrigger>
            <TabsTrigger value="display">Hiển Thị</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="notifications">Thông Báo</TabsTrigger>
            <TabsTrigger value="privacy">Riêng Tư</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Thông Tin Cá Nhân</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tên Hiển Thị</label>
                  <Input
                    value={settings.nickname}
                    onChange={(e) => updateSetting('nickname', e.target.value)}
                    placeholder="Nhập tên hiển thị..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Chữ Ký</label>
                  <Input
                    value={settings.signature}
                    onChange={(e) => updateSetting('signature', e.target.value)}
                    placeholder="Nhập chữ ký cá nhân..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sinh Nhật</label>
                    <Input
                      type="date"
                      value={settings.birthday}
                      onChange={(e) => updateSetting('birthday', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Giới Tính</label>
                    <select 
                      className="w-full px-3 py-2 bg-muted/20 border border-border/50 rounded-md text-sm"
                      value={settings.gender}
                      onChange={(e) => updateSetting('gender', e.target.value)}
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Bí mật</option>
                    </select>
                  </div>
                </div>

                <Button onClick={saveProfile} className="w-full">
                  Lưu Thông Tin
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Cài Đặt Game</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Tự Động Lưu Game</span>
                    <div className="text-xs text-muted-foreground">Lưu tiến độ mỗi 5 phút</div>
                  </div>
                  <Button
                    variant={settings.autoSave ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('autoSave', !settings.autoSave)}
                  >
                    {settings.autoSave ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Tự Động Nhặt Vật Phẩm</span>
                    <div className="text-xs text-muted-foreground">Tự động nhặt đồ rơi</div>
                  </div>
                  <Button
                    variant={settings.autoPickupItems ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('autoPickupItems', !settings.autoPickupItems)}
                  >
                    {settings.autoPickupItems ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Cho Phép PvP</span>
                    <div className="text-xs text-muted-foreground">Tham gia chiến đấu với người chơi</div>
                  </div>
                  <Button
                    variant={settings.enablePvP ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enablePvP', !settings.enablePvP)}
                  >
                    {settings.enablePvP ? 'Bật' : 'Tắt'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Cài Đặt Chat</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Chat Thế Giới</span>
                    <div className="text-xs text-muted-foreground">Hiển thị tin nhắn thế giới</div>
                  </div>
                  <Button
                    variant={settings.enableWorldChat ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enableWorldChat', !settings.enableWorldChat)}
                  >
                    {settings.enableWorldChat ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Chat Tông Môn</span>
                    <div className="text-xs text-muted-foreground">Hiển thị tin nhắn tông môn</div>
                  </div>
                  <Button
                    variant={settings.enableSectChat ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enableSectChat', !settings.enableSectChat)}
                  >
                    {settings.enableSectChat ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Tin Nhắn Riêng</span>
                    <div className="text-xs text-muted-foreground">Cho phép nhận tin nhắn riêng</div>
                  </div>
                  <Button
                    variant={settings.enablePrivateChat ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enablePrivateChat', !settings.enablePrivateChat)}
                  >
                    {settings.enablePrivateChat ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Chặn Người Lạ</span>
                    <div className="text-xs text-muted-foreground">Chỉ nhận tin từ bạn bè</div>
                  </div>
                  <Button
                    variant={settings.blockStrangers ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('blockStrangers', !settings.blockStrangers)}
                  >
                    {settings.blockStrangers ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Cỡ Chữ Chat</span>
                    <span className="text-sm text-cultivator-gold">{settings.chatFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="20"
                    value={settings.chatFontSize}
                    onChange={(e) => updateSetting('chatFontSize', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Cài Đặt Thông Báo</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Thông Báo Hệ Thống</span>
                    <div className="text-xs text-muted-foreground">Bảo trì, cập nhật, công bố</div>
                  </div>
                  <Button
                    variant={settings.enableSystemNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enableSystemNotifications', !settings.enableSystemNotifications)}
                  >
                    {settings.enableSystemNotifications ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Thông Báo Sự Kiện</span>
                    <div className="text-xs text-muted-foreground">Sự kiện mới, quà tặng</div>
                  </div>
                  <Button
                    variant={settings.enableEventNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enableEventNotifications', !settings.enableEventNotifications)}
                  >
                    {settings.enableEventNotifications ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Thông Báo Chiến Đấu</span>
                    <div className="text-xs text-muted-foreground">Kết quả PvP, Boss</div>
                  </div>
                  <Button
                    variant={settings.enableCombatNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enableCombatNotifications', !settings.enableCombatNotifications)}
                  >
                    {settings.enableCombatNotifications ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Thông Báo Xã Hội</span>
                    <div className="text-xs text-muted-foreground">Bạn bè, tông môn, kết hôn</div>
                  </div>
                  <Button
                    variant={settings.enableSocialNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('enableSocialNotifications', !settings.enableSocialNotifications)}
                  >
                    {settings.enableSocialNotifications ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Âm Thanh Thông Báo</span>
                    <div className="text-xs text-muted-foreground">Phát âm thanh khi có thông báo</div>
                  </div>
                  <Button
                    variant={settings.soundNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('soundNotifications', !settings.soundNotifications)}
                  >
                    {settings.soundNotifications ? 'Bật' : 'Tắt'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Cài Đặt Riêng Tư</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Hiển Thị Trạng Thái Online</span>
                    <div className="text-xs text-muted-foreground">Cho người khác biết bạn đang online</div>
                  </div>
                  <Button
                    variant={settings.showOnlineStatus ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('showOnlineStatus', !settings.showOnlineStatus)}
                  >
                    {settings.showOnlineStatus ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Cho Phép Kết Bạn</span>
                    <div className="text-xs text-muted-foreground">Nhận lời mời kết bạn</div>
                  </div>
                  <Button
                    variant={settings.allowFriendRequests ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('allowFriendRequests', !settings.allowFriendRequests)}
                  >
                    {settings.allowFriendRequests ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Cho Phép Mời Tông Môn</span>
                    <div className="text-xs text-muted-foreground">Nhận lời mời tham gia tông môn</div>
                  </div>
                  <Button
                    variant={settings.allowGuildInvites ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('allowGuildInvites', !settings.allowGuildInvites)}
                  >
                    {settings.allowGuildInvites ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Hiển Thị Trang Bị</span>
                    <div className="text-xs text-muted-foreground">Cho phép xem trang bị của bạn</div>
                  </div>
                  <Button
                    variant={settings.showEquipment ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('showEquipment', !settings.showEquipment)}
                  >
                    {settings.showEquipment ? 'Bật' : 'Tắt'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Cài Đặt Âm Thanh</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Âm Lượng Tổng</span>
                    <span className="text-sm text-cultivator-gold">{settings.masterVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.masterVolume}
                    onChange={(e) => updateSetting('masterVolume', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Nhạc Nền</span>
                    <span className="text-sm text-cultivator-gold">{settings.musicVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.musicVolume}
                    onChange={(e) => updateSetting('musicVolume', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Hiệu Ứng Âm Thanh</span>
                    <span className="text-sm text-cultivator-gold">{settings.sfxVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.sfxVolume}
                    onChange={(e) => updateSetting('sfxVolume', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Giọng Nói</span>
                    <span className="text-sm text-cultivator-gold">{settings.voiceVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.voiceVolume}
                    onChange={(e) => updateSetting('voiceVolume', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Cài Đặt Hiển Thị</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Hiển Thị Số Sát Thương</span>
                    <div className="text-xs text-muted-foreground">Hiện số damage khi đánh</div>
                  </div>
                  <Button
                    variant={settings.showDamageNumbers ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('showDamageNumbers', !settings.showDamageNumbers)}
                  >
                    {settings.showDamageNumbers ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Hiển Thị Người Chơi Khác</span>
                    <div className="text-xs text-muted-foreground">Hiện các tu sĩ khác</div>
                  </div>
                  <Button
                    variant={settings.showOtherPlayers ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('showOtherPlayers', !settings.showOtherPlayers)}
                  >
                    {settings.showOtherPlayers ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Hiệu Ứng Kỹ Năng</span>
                    <div className="text-xs text-muted-foreground">Hiện animation kỹ năng</div>
                  </div>
                  <Button
                    variant={settings.showEffects ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('showEffects', !settings.showEffects)}
                  >
                    {settings.showEffects ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Minimap</span>
                    <div className="text-xs text-muted-foreground">Hiện bản đồ nhỏ</div>
                  </div>
                  <Button
                    variant={settings.showMinimap ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('showMinimap', !settings.showMinimap)}
                  >
                    {settings.showMinimap ? 'Bật' : 'Tắt'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Hiển Thị Chat</span>
                    <div className="text-xs text-muted-foreground">Hiện tin nhắn chat</div>
                  </div>
                  <Button
                    variant={settings.showChat ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting('showChat', !settings.showChat)}
                  >
                    {settings.showChat ? 'Bật' : 'Tắt'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Thông Tin Tài Khoản</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-card/30 rounded">
                  <div>
                    <span className="text-sm font-medium">Tu Tiên Giả</span>
                    <div className="text-xs text-muted-foreground">ID: 1000001</div>
                  </div>
                  <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                    Thành Viên
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={exportData}>
                    <Shield className="w-4 h-4 mr-2" />
                    Sao Lưu
                  </Button>
                  <Button variant="outline" onClick={importData}>
                    <Gift className="w-4 h-4 mr-2" />
                    Khôi Phục
                  </Button>
                </div>

                <div className="pt-4 border-t border-border/30">
                  <Button
                    variant="outline"
                    onClick={resetSettings}
                    className="w-full mb-3"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Reset Cài Đặt
                  </Button>
                  
                  <Button
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng Xuất
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Về Game</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Phiên Bản:</span>
                  <span className="text-cultivator-gold">Alpha v0.1</span>
                </div>
                <div className="flex justify-between">
                  <span>Engine:</span>
                  <span>React + Vite</span>
                </div>
                <div className="flex justify-between">
                  <span>UI Framework:</span>
                  <span>Tailwind CSS</span>
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
