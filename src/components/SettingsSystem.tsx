
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Volume2,
  Eye,
  Gamepad2,
  Info,
  User,
  Shield,
  Gift,
  LogOut
} from 'lucide-react';

const SettingsSystem = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    masterVolume: 70,
    musicVolume: 50,
    sfxVolume: 80,
    voiceVolume: 60,
    showDamageNumbers: true,
    showOtherPlayers: true,
    showEffects: true,
    autoPickupItems: true,
    showMinimap: true,
    enablePvP: false,
    showChat: true,
    autoSave: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    console.log(`Cập nhật cài đặt ${key}: ${value}`);
  };

  const resetSettings = () => {
    console.log('Đã reset về cài đặt mặc định');
  };

  const exportData = () => {
    console.log('Xuất dữ liệu game');
  };

  const importData = () => {
    console.log('Nhập dữ liệu game');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-6 h-6 text-cultivator-gold" />
          <h2 className="text-xl font-semibold text-cultivator-gold">Cài Đặt</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Chung
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Âm Thanh
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Hiển Thị
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tài Khoản
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Cài Đặt Chung</h3>
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
