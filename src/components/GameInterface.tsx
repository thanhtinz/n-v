
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import CharacterDisplay from './CharacterDisplay';
import CultivationSystem from './CultivationSystem';
import StoryDialog from './StoryDialog';
import { 
  User, 
  Zap, 
  Sword, 
  Users, 
  Home, 
  ShoppingCart, 
  Trophy,
  MessageCircle,
  Settings
} from 'lucide-react';

const GameInterface = () => {
  const [activeTab, setActiveTab] = useState('character');
  const [player] = useState({
    name: 'Tu Tiên Giả',
    realm: 'Phàm Nhân',
    level: 1,
    equipment: {
      clothing: 'Áo Vải Thô',
      weapon: 'Kiếm Sắt',
      wings: '',
      pet: '',
      aura: ''
    }
  });

  useEffect(() => {
    // Set last played time when component unmounts
    return () => {
      localStorage.setItem('lastPlayed', Date.now().toString());
    };
  }, []);

  const menuItems = [
    { id: 'character', label: 'Nhân Vật', icon: User },
    { id: 'cultivation', label: 'Tu Luyện', icon: Zap },
    { id: 'combat', label: 'Chiến Đấu', icon: Sword },
    { id: 'sect', label: 'Tông Môn', icon: Users },
    { id: 'home', label: 'Động Phủ', icon: Home },
    { id: 'market', label: 'Thị Trường', icon: ShoppingCart },
    { id: 'ranking', label: 'Bảng Xếp Hạng', icon: Trophy },
    { id: 'chat', label: 'Trò Chuyện', icon: MessageCircle },
    { id: 'settings', label: 'Cài Đặt', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold gradient-gold bg-clip-text text-transparent">
                Tiên Vực Truyền Sinh
              </h1>
              <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                Alpha v0.1
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Chào mừng, <span className="text-cultivator-gold font-medium">{player.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Character Display Panel */}
          <div className="lg:col-span-1">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="text-center space-y-4">
                <CharacterDisplay
                  realm={player.realm}
                  equipment={player.equipment}
                  name={player.name}
                  isActive={activeTab === 'cultivation'}
                />
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full border-spirit-jade text-spirit-jade">
                    {player.realm} • Tầng {player.level}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    "Con đường tu tiên nghịch thiên, mỗi bước đều đầy gian khó."
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Game Interface */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              {/* Tab Navigation */}
              <Card className="p-2 bg-card/50 backdrop-blur-sm border-border/50">
                <TabsList className="grid grid-cols-5 lg:grid-cols-9 w-full bg-transparent gap-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <TabsTrigger
                        key={item.id}
                        value={item.id}
                        className="flex flex-col items-center gap-1 p-2 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Card>

              {/* Tab Content */}
              <div className="min-h-[500px]">
                <TabsContent value="character" className="space-y-4">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Thông Tin Nhân Vật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Tên Đạo Hiệu</label>
                          <div className="text-lg font-medium">{player.name}</div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Cảnh Giới Hiện Tại</label>
                          <div className="text-lg font-medium text-spirit-jade">{player.realm}</div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Trang Bị</label>
                          <div className="space-y-1">
                            <div className="text-sm">🥋 {player.equipment.clothing}</div>
                            <div className="text-sm">⚔️ {player.equipment.weapon}</div>
                            <div className="text-sm text-muted-foreground">👼 Chưa có cánh</div>
                            <div className="text-sm text-muted-foreground">🐾 Chưa có pet</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Thành Tựu</label>
                          <div className="space-y-2">
                            <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                              🌟 Tân Thủ Tu Tiên
                            </Badge>
                            <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                              📚 Học Đệ Đầu Tiên
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Thống Kê</label>
                          <div className="text-sm space-y-1">
                            <div>Thời gian tu luyện: 1 ngày</div>
                            <div>Boss đã đánh bại: 0</div>
                            <div>Cảnh giới đạt được: 1</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="cultivation">
                  <CultivationSystem />
                </TabsContent>

                <TabsContent value="combat">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Chiến Đấu</h2>
                    <div className="text-center py-12 text-muted-foreground">
                      <Sword className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Hệ thống chiến đấu đang được phát triển...</p>
                      <p className="text-sm mt-2">Sẽ có chiến đấu boss, PvP, và phó bản!</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="sect">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Tông Môn</h2>
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Chưa gia nhập tông môn nào</p>
                      <p className="text-sm mt-2">Tìm kiếm tông môn phù hợp để cùng tu luyện!</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="home">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Động Phủ</h2>
                    <div className="text-center py-12 text-muted-foreground">
                      <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Động phủ cá nhân đang được xây dựng...</p>
                      <p className="text-sm mt-2">Sẽ có trồng trọt, luyện đan, và trang trí!</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="market">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Thị Trường</h2>
                    <div className="text-center py-12 text-muted-foreground">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Kỳ Trân Các đang được chuẩn bị...</p>
                      <p className="text-sm mt-2">Sẽ có mua bán vật phẩm và đấu giá!</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="ranking">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Bảng Xếp Hạng</h2>
                    <div className="text-center py-12 text-muted-foreground">
                      <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Bảng xếp hạng tu vi đang được cập nhật...</p>
                      <p className="text-sm mt-2">Tranh đấu vị trí cao nhất!</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="chat">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Cộng Đồng</h2>
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Hệ thống chat đang được phát triển...</p>
                      <p className="text-sm mt-2">Giao lưu với đồng đạo khắp tiên giới!</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold text-cultivator-gold mb-4">Cài Đặt</h2>
                    <div className="text-center py-12 text-muted-foreground">
                      <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Bảng cài đặt đang được thiết kế...</p>
                      <p className="text-sm mt-2">Tùy chỉnh trải nghiệm game của bạn!</p>
                    </div>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Story Dialog Component */}
      <StoryDialog />
    </div>
  );
};

export default GameInterface;
