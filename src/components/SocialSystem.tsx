
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGameState } from '@/hooks/useGameState';
import { 
  Users, 
  Heart, 
  BookOpen, 
  Search, 
  UserPlus, 
  MessageCircle, 
  Gift,
  Crown,
  Star,
  User,
  Calendar,
  Ring,
  GraduationCap,
  Mail,
  Timer
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  level: number;
  realm: string;
  power: number;
  gender: 'male' | 'female';
  online: boolean;
  introduction?: string;
  guild?: string;
}

interface MarriageProposal {
  from: string;
  to: string;
  status: 'pending' | 'accepted' | 'declined';
  ringType: string;
  message: string;
}

interface MasterDisciple {
  masterId: string;
  discipleId: string;
  startDate: string;
  progress: number;
  graduated: boolean;
}

const SocialSystem = () => {
  const { gameState, addNotification } = useGameState();
  
  const [activeSubTab, setActiveSubTab] = useState('find');
  const [searchTerm, setSearchTerm] = useState('');
  const [playerIntro, setPlayerIntro] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [marriageDialog, setMarriageDialog] = useState(false);
  const [weddingDialog, setWeddingDialog] = useState(false);
  const [masterDialog, setMasterDialog] = useState(false);

  const [onlinePlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Tiểu Long Nữ',
      level: 25,
      realm: 'Trúc Cơ',
      power: 350,
      gender: 'female',
      online: true,
      introduction: 'Mình là người vui tính, thích kết bạn và tìm hiểu về thế giới tu tiên!',
      guild: 'Cổ Mộ Phái'
    },
    {
      id: '2',
      name: 'Dương Quá',
      level: 30,
      realm: 'Luyện Khí',
      power: 420,
      gender: 'male',
      online: true,
      introduction: 'Tìm kiếm bạn đồng hành trên con đường tu tiên, ưa thích phiêu lưu.',
      guild: 'Quẫn Lộ Môn'
    },
    {
      id: '3',
      name: 'Hoàng Dung',
      level: 18,
      realm: 'Phàm Nhân',
      power: 180,
      gender: 'female',
      online: true,
      introduction: 'Mới vào giang hồ, mong được các cao thủ chỉ dạy!',
      guild: 'Đào Hoa Đảo'
    },
    {
      id: '4',
      name: 'Quách Tĩnh',
      level: 35,
      realm: 'Kết Đan',
      power: 580,
      gender: 'male',
      online: false,
      introduction: 'Tu tiên giả kỳ cựu, sẵn sàng hướng dẫn tân thủ.',
      guild: 'Đại Lý Môn'
    }
  ]);

  const [friends] = useState([
    { id: '1', name: 'Tiểu Long Nữ', level: 25, online: true, lastMessage: 'Hôm nay tu luyện thế nào?' },
    { id: '2', name: 'Dương Quá', level: 30, online: true, lastMessage: 'Tối nay đi săn boss không?' }
  ]);

  const [marriageProposals] = useState<MarriageProposal[]>([
    {
      from: 'Dương Quá',
      to: gameState.player.name,
      status: 'pending',
      ringType: 'Nhẫn Cầu Hôn Bạch Kim',
      message: 'Em có muốn cùng anh đi hết cuộc đời này không?'
    }
  ]);

  const [disciples] = useState([
    { id: '1', name: 'Tiểu Bảo', level: 15, progress: 75, online: true },
    { id: '2', name: 'Vi Tiểu Bảo', level: 18, progress: 90, online: false }
  ]);

  const [masters] = useState([
    { id: '1', name: 'Trương Tam Phong', level: 80, relation: 'Sư Phụ', online: true }
  ]);

  const ringTypes = [
    { name: 'Nhẫn Cầu Hôn Bạc', price: 1000, description: 'Nhẫn cơ bản cho lễ cưới đơn giản' },
    { name: 'Nhẫn Cầu Hôn Vàng', price: 5000, description: 'Nhẫn cao cấp cho lễ cưới hoành tráng' },
    { name: 'Nhẫn Cầu Hôn Bạch Kim', price: 10000, description: 'Nhẫn quý hiếm cho lễ cưới thượng lưu' }
  ];

  const weddingDurations = [
    { duration: '30 phút', price: 2000, guests: 20 },
    { duration: '1 giờ', price: 5000, guests: 50 },
    { duration: '2 giờ', price: 10000, guests: 100 }
  ];

  const filteredPlayers = onlinePlayers.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.guild?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = (player: Player) => {
    addNotification(`Đã gửi lời mời kết bạn tới ${player.name}!`, 'success');
  };

  const handlePropose = (player: Player) => {
    if (player.gender === gameState.player.gender) {
      addNotification('Chỉ có thể cầu hôn người khác giới!', 'warning');
      return;
    }
    setSelectedPlayer(player);
    setMarriageDialog(true);
  };

  const handleAcceptProposal = (proposal: MarriageProposal) => {
    addNotification(`Đã chấp nhận lời cầu hôn từ ${proposal.from}! Hãy tổ chức lễ cưới.`, 'success');
  };

  const handleBecomeDisciple = (master: Player) => {
    if (gameState.player.level >= 17) {
      addNotification('Cấp độ quá cao để bái sư! (Tối đa cấp 16)', 'warning');
      return;
    }
    if (master.level < 20) {
      addNotification('Sư phụ phải đạt cấp 20 trở lên!', 'warning');
      return;
    }
    addNotification(`Đã gửi lời bái sư tới ${master.name}!`, 'success');
  };

  const handleAcceptDisciple = (player: Player) => {
    if (gameState.player.level < 20) {
      addNotification('Bạn phải đạt cấp 20 mới có thể nhận đệ tử!', 'warning');
      return;
    }
    if (player.level >= 17 || player.level <= 5) {
      addNotification('Đệ tử phải có cấp từ 6-16!', 'warning');
      return;
    }
    addNotification(`Đã nhận ${player.name} làm đệ tử!`, 'success');
  };

  const canMarry = gameState.player.level >= 14;
  const canBeMaster = gameState.player.level >= 20;
  const canHaveDisciple = gameState.player.level >= 20;

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-spirit-jade/10 to-mystical-purple/10 border-spirit-jade/30">
        <h2 className="text-xl font-semibold text-spirit-jade mb-2 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Trung Tâm Kết Bạn
        </h2>
        <p className="text-sm text-muted-foreground">
          Khu vực kết nối giữa "cộng đồng Tu Tiên" với nhau, hãy vào đây để làm quen và kết bạn cùng mọi người nhé!
        </p>
      </Card>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="find">Kết Bạn</TabsTrigger>
          <TabsTrigger value="marriage">Kết Hôn</TabsTrigger>
          <TabsTrigger value="master">Sư Đồ</TabsTrigger>
          <TabsTrigger value="friends">Bạn Bè</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-4">
          {/* Search and Introduction */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Tìm kiếm bạn bè và giới thiệu về mình
            </h3>
            
            <div className="space-y-3">
              <Input
                placeholder="Tìm kiếm theo tên hoặc bang hội..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div>
                <label className="text-sm font-medium mb-2 block">Giới thiệu bản thân:</label>
                <Textarea
                  placeholder="Hãy giới thiệu về bản thân để mọi người hiểu hơn về bạn..."
                  value={playerIntro}
                  onChange={(e) => setPlayerIntro(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button size="sm" className="mt-2">
                  Cập nhật giới thiệu
                </Button>
              </div>
            </div>
          </Card>

          {/* Online Players */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Người chơi đang online ({filteredPlayers.length})</h3>
            <div className="space-y-3">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-spirit-jade/20 to-divine-blue/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-spirit-jade" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{player.name}</span>
                      <Badge variant="outline" className="border-divine-blue text-divine-blue">
                        Lv.{player.level}
                      </Badge>
                      {player.online && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-2">
                      {player.realm} • Sức mạnh: {player.power} • {player.guild}
                    </div>
                    
                    {player.introduction && (
                      <p className="text-sm text-muted-foreground mb-2 italic">
                        "{player.introduction}"
                      </p>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAddFriend(player)}>
                        <UserPlus className="w-3 h-3 mr-1" />
                        Kết bạn
                      </Button>
                      {canMarry && player.gender !== gameState.player.gender && (
                        <Button size="sm" variant="outline" onClick={() => handlePropose(player)}>
                          <Heart className="w-3 h-3 mr-1" />
                          Cầu hôn
                        </Button>
                      )}
                      {gameState.player.level < 17 && player.level >= 20 && (
                        <Button size="sm" variant="outline" onClick={() => handleBecomeDisciple(player)}>
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Bái sư
                        </Button>
                      )}
                      {canHaveDisciple && player.level >= 6 && player.level <= 16 && (
                        <Button size="sm" variant="outline" onClick={() => handleAcceptDisciple(player)}>
                          <BookOpen className="w-3 h-3 mr-1" />
                          Nhận đệ tử
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="marriage" className="space-y-4">
          {!canMarry && (
            <Card className="p-4 border-yellow-500/50 bg-yellow-500/10">
              <div className="flex items-center gap-2 text-yellow-600">
                <Crown className="w-4 h-4" />
                <span className="text-sm">Cần đạt cấp 14 để có thể kết hôn!</span>
              </div>
            </Card>
          )}

          {/* Marriage Proposals */}
          {marriageProposals.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Lời cầu hôn ({marriageProposals.length})
              </h3>
              <div className="space-y-3">
                {marriageProposals.map((proposal, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{proposal.from}</span>
                      <Badge className="bg-pink-500">Cầu hôn</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">"{proposal.message}"</p>
                    <div className="text-xs text-muted-foreground mb-3">
                      Nhẫn: {proposal.ringType}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptProposal(proposal)}>
                        Chấp nhận
                      </Button>
                      <Button size="sm" variant="outline">
                        Từ chối
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Wedding Organization */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Ring className="w-4 h-4" />
              Tổ chức lễ cưới
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Chọn gói lễ cưới:</h4>
                <div className="grid gap-2">
                  {weddingDurations.map((wedding, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{wedding.duration}</span>
                          <div className="text-sm text-muted-foreground">
                            Tối đa {wedding.guests} khách mời
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-cultivator-gold">
                            {wedding.price.toLocaleString()} Bạc
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                <Heart className="w-4 h-4 mr-2" />
                Bắt đầu tổ chức lễ cưới
              </Button>
            </div>
          </Card>

          {/* Ring Shop */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Cửa hàng nhẫn cầu hôn</h3>
            <div className="space-y-3">
              {ringTypes.map((ring, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{ring.name}</div>
                    <div className="text-sm text-muted-foreground">{ring.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-cultivator-gold">
                      {ring.price.toLocaleString()} KNYB
                    </div>
                    <Button size="sm">Mua</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="master" className="space-y-4">
          {/* Current Master */}
          {masters.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Sư phụ của tôi
              </h3>
              <div className="space-y-2">
                {masters.map((master) => (
                  <div key={master.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cultivator-gold/20 to-divine-blue/20 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-cultivator-gold" />
                      </div>
                      <div>
                        <div className="font-medium">{master.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Cấp {master.level} • {master.online ? 'Đang online' : 'Offline'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Nhắn tin
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Disciples */}
          {canBeMaster && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Đệ tử của tôi ({disciples.length})
              </h3>
              
              <div className="space-y-3">
                {disciples.map((disciple) => (
                  <div key={disciple.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-spirit-jade/20 to-mystical-purple/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-spirit-jade" />
                        </div>
                        <div>
                          <div className="font-medium">{disciple.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Cấp {disciple.level} • {disciple.online ? 'Online' : 'Offline'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Tiến độ</div>
                        <div className="font-medium text-spirit-jade">{disciple.progress}%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className="bg-spirit-jade h-2 rounded-full transition-all duration-300"
                          style={{ width: `${disciple.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Gift className="w-3 h-3 mr-1" />
                          Tặng quà
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Nhắn tin
                        </Button>
                        {disciple.progress >= 100 && (
                          <Button size="sm" className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black">
                            <Star className="w-3 h-3 mr-1" />
                            Tốt nghiệp
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full" onClick={() => setMasterDialog(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Tới phòng sư đồ
                </Button>
              </div>
            </Card>
          )}

          {/* Master-Disciple Benefits */}
          <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10">
            <h3 className="font-semibold mb-2">Lợi ích hệ thống Sư Đồ</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Sư phụ và đệ tử cùng nhận EXP bonus khi tu luyện</li>
              <li>• Đệ tử tốt nghiệp (cấp 20) sẽ nhận được quà đặc biệt</li>
              <li>• Sư phụ nhận danh hiệu và phần thưởng khi đệ tử tốt nghiệp</li>
              <li>• Có thể nhắn tin riêng và trao đổi kinh nghiệm</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Danh sách bạn bè ({friends.length})
            </h3>
            
            <div className="space-y-3">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-spirit-jade/20 to-divine-blue/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-spirit-jade" />
                      </div>
                      {friend.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{friend.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Cấp {friend.level} • {friend.online ? 'Đang online' : 'Offline'}
                      </div>
                      {friend.lastMessage && (
                        <div className="text-xs text-muted-foreground italic">
                          "{friend.lastMessage}"
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline">
                      <Gift className="w-3 h-3 mr-1" />
                      Tặng quà
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Marriage Proposal Dialog */}
      <Dialog open={marriageDialog} onOpenChange={setMarriageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cầu hôn {selectedPlayer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Chọn nhẫn cầu hôn:</label>
              <div className="grid gap-2 mt-2">
                {ringTypes.map((ring, index) => (
                  <div key={index} className="p-2 border rounded cursor-pointer hover:bg-muted/50">
                    <div className="flex justify-between">
                      <span className="font-medium">{ring.name}</span>
                      <span className="text-cultivator-gold">{ring.price.toLocaleString()} KNYB</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Lời nhắn:</label>
              <Textarea placeholder="Viết lời tỏ tình của bạn..." className="mt-2" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setMarriageDialog(false)}>
                Hủy
              </Button>
              <Button onClick={() => {
                addNotification(`Đã gửi lời cầu hôn tới ${selectedPlayer?.name}!`, 'success');
                setMarriageDialog(false);
              }}>
                Gửi lời cầu hôn
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialSystem;
