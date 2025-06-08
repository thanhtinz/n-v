import React, { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserPlus, 
  Heart, 
  Search, 
  MessageCircle, 
  Crown,
  Shield,
  Coins,
  Star,
  User,
  Calendar,
  GraduationCap,
  Mail,
  Timer
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  level: number;
  vipLevel: number;
  combatPower: number;
  gender: 'male' | 'female';
  online: boolean;
}

interface MarriageStatus {
  isMarried: boolean;
  partner: string;
  marriageDate: string;
}

interface MasterInfo {
  hasMaster: boolean;
  masterName: string;
  masterLevel: number;
}

interface Disciple {
  id: string;
  name: string;
  level: number;
}

interface ChatMessage {
  id: string;
  player: string;
  message: string;
  time: string;
}

const initialPlayers: Player[] = [
  { id: '1', name: 'Gunner A', level: 15, vipLevel: 2, combatPower: 1500, gender: 'male', online: true },
  { id: '2', name: 'Tiên Nữ Mai', level: 18, vipLevel: 5, combatPower: 2200, gender: 'female', online: false },
  { id: '3', name: 'Đại Gia 99', level: 22, vipLevel: 8, combatPower: 3500, gender: 'male', online: true },
  { id: '4', name: 'Bé Bự', level: 12, vipLevel: 1, combatPower: 900, gender: 'female', online: true },
  { id: '5', name: 'Cao Thủ', level: 25, vipLevel: 10, combatPower: 5000, gender: 'male', online: false }
];

const SocialSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [activeSection, setActiveSection] = useState<'friends' | 'marriage' | 'mentorship' | 'chat'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [marriageStatus, setMarriageStatus] = useState<MarriageStatus>({
    isMarried: false,
    partner: '',
    marriageDate: ''
  });
  const [masterInfo, setMasterInfo] = useState<MasterInfo>({
    hasMaster: false,
    masterName: '',
    masterLevel: 0
  });
  const [disciples, setDisciples] = useState<Disciple[]>([
    { id: '1', name: 'Đệ Tử A', level: 10 },
    { id: '2', name: 'Đệ Tử B', level: 15 }
  ]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', player: 'Gunner A', message: 'Chào mọi người!', time: '10:00' },
    { id: '2', player: 'Tiên Nữ Mai', message: 'Chào Gunner A!', time: '10:01' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sections = [
    { id: 'friends', label: 'Kết Bạn', icon: UserPlus },
    { id: 'marriage', label: 'Hôn Nhân', icon: Heart },
    { id: 'mentorship', label: 'Sư Đồ', icon: GraduationCap },
    { id: 'chat', label: 'Trò Chuyện', icon: MessageCircle }
  ];

  const addFriend = (player: Player) => {
    alert(`Đã gửi lời mời kết bạn đến ${player.name}!`);
  };

  const handlePropose = (player: Player) => {
    // Get player gender from localStorage since it's not in gameState
    const savedCharacter = localStorage.getItem('playerCharacter');
    let playerGender = 'male';
    if (savedCharacter) {
      const character = JSON.parse(savedCharacter);
      playerGender = character.gender || 'male';
    }
    
    if (player.gender === playerGender) {
      addNotification('Chỉ có thể cầu hôn người khác giới!', 'warning');
      return;
    }

    const confirmPropose = window.confirm(`Bạn có muốn cầu hôn ${player.name} không?`);
    if (confirmPropose) {
      setMarriageStatus({
        isMarried: true,
        partner: player.name,
        marriageDate: new Date().toLocaleDateString()
      });
      addNotification(`Bạn đã cầu hôn ${player.name} thành công!`, 'success');
    } else {
      addNotification('Đã hủy cầu hôn.', 'info');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newChatMessage: ChatMessage = {
        id: Date.now().toString(),
        player: gameState.player.name,
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, newChatMessage]);
      setNewMessage('');
    }
  };

  const canMarry = gameState.player.level >= 14;
  const canBeMaster = gameState.player.level >= 20;
  const canHaveDisciple = gameState.player.level >= 20;

  // Get player gender for UI logic
  const getPlayerGender = () => {
    const savedCharacter = localStorage.getItem('playerCharacter');
    if (savedCharacter) {
      const character = JSON.parse(savedCharacter);
      return character.gender || 'male';
    }
    return 'male';
  };

  const playerGender = getPlayerGender();

  return (
    <div className="space-y-4">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(section.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-3 h-3" />
              <span className="text-xs">{section.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Find Friends Section */}
      {activeSection === 'friends' && (
        <div className="space-y-3">
          {/* Search */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Tìm kiếm người chơi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-muted/30 border border-border/30 rounded text-sm"
              />
              <Button size="sm">
                <Search className="w-3 h-3" />
              </Button>
            </div>
          </Card>

          {/* Player List */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Kết Bạn</h3>
            <div className="space-y-2">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{player.name}</span>
                          <Badge variant="outline" className="text-xs">
                            Lv.{player.level}
                          </Badge>
                          {player.vipLevel > 0 && (
                            <div className="flex items-center gap-1">
                              <Crown className="w-3 h-3 text-mystical-purple" />
                              <span className="text-xs text-mystical-purple">VIP{player.vipLevel}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{player.gender === 'male' ? 'Nam' : 'Nữ'}</span>
                          <span>•</span>
                          <span className="text-divine-blue">{player.combatPower} Lực Chiến</span>
                          <span>•</span>
                          <span className={player.online ? 'text-green-400' : 'text-red-400'}>
                            {player.online ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => addFriend(player)}>
                        <UserPlus className="w-3 h-3 mr-1" />
                        Kết bạn
                      </Button>
                      {canMarry && player.gender !== playerGender && (
                        <Button size="sm" variant="outline" onClick={() => handlePropose(player)}>
                          <Heart className="w-3 h-3 mr-1" />
                          Cầu hôn
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Marriage Section */}
      {activeSection === 'marriage' && (
        <div className="space-y-3">
          {/* Marriage Status */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Tình Trạng Hôn Nhân</h3>
            {marriageStatus.isMarried ? (
              <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span className="font-medium text-pink-400">Đã Kết Hôn</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Vợ/Chồng: <span className="text-pink-400 font-medium">{marriageStatus.partner}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ngày cưới: {marriageStatus.marriageDate}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                <div className="text-sm text-muted-foreground text-center">
                  {canMarry ? 'Độc thân - Có thể kết hôn' : `Cần đạt Lv.14 để kết hôn (Hiện tại: Lv.${gameState.player.level})`}
                </div>
              </div>
            )}
          </Card>

          {/* Wedding Hall */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Lễ Đường Kết Hôn</h3>
            {marriageStatus.isMarried ? (
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/20">
                  <div className="text-sm font-medium text-pink-400 mb-2">Kỷ Niệm Ngày Cưới</div>
                  <div className="text-xs text-muted-foreground">
                    Đã kết hôn được {Math.floor((Date.now() - new Date(marriageStatus.marriageDate).getTime()) / (1000 * 60 * 60 * 24))} ngày
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  onClick={() => alert('Tổ chức lễ kỷ niệm ngày cưới!')}
                >
                  <Heart className="w-3 h-3 mr-2" />
                  Tổ Chức Lễ Kỷ Niệm
                </Button>
              </div>
            ) : (
              <div className="text-center p-6">
                <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-3">
                  Hãy tìm người bạn đời và tổ chức lễ cưới tại đây!
                </div>
                <div className="text-xs text-muted-foreground">
                  Cần: Nhẫn cầu hôn, cả hai online cùng lúc
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Master-Disciple Section */}
      {activeSection === 'mentorship' && (
        <div className="space-y-3">
          {/* Master Status */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Quan Hệ Sư Đồ</h3>
            
            {masterInfo.hasMaster && (
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-blue-400">Sư Phụ</span>
                </div>
                <div className="text-sm">{masterInfo.masterName}</div>
                <div className="text-xs text-muted-foreground">Cấp: {masterInfo.masterLevel}</div>
              </div>
            )}

            {disciples.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-green-400">Đệ Tử ({disciples.length})</span>
                </div>
                {disciples.map((disciple) => (
                  <div key={disciple.id} className="p-2 bg-green-500/10 rounded border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{disciple.name}</div>
                        <div className="text-xs text-muted-foreground">Lv.{disciple.level}</div>
                      </div>
                      <div className="text-xs">
                        <Progress value={(disciple.level / 20) * 100} className="w-16 h-2" />
                        <span className="text-muted-foreground">{disciple.level}/20</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!masterInfo.hasMaster && disciples.length === 0 && (
              <div className="text-center p-6">
                <GraduationCap className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <div className="text-sm text-muted-foreground">
                  {canBeMaster ? 'Có thể nhận đệ tử hoặc bái sư' : 'Cần đạt Lv.20 để có thể bái sư hoặc nhận đệ tử'}
                </div>
              </div>
            )}
          </Card>

          {/* Mentorship Hall */}
          {canBeMaster && (
            <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Phòng Sư Đồ</h3>
              <div className="space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => alert('Đến phòng sư đồ để tìm đệ tử!')}
                >
                  <Search className="w-3 h-3 mr-2" />
                  Tìm Đệ Tử
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => alert('Tìm sư phụ phù hợp!')}
                >
                  <GraduationCap className="w-3 h-3 mr-2" />
                  Tìm Sư Phụ
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Chat Section */}
      {activeSection === 'chat' && (
        <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Trò Chuyện</h3>
          <div className="space-y-3">
            <div className="h-48 bg-muted/20 rounded-lg border border-border/30 p-3 overflow-y-auto">
              <div className="space-y-2">
                {chatMessages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <span className="text-cultivator-gold font-medium">{message.player}:</span>
                    <span className="ml-2">{message.message}</span>
                    <span className="text-xs text-muted-foreground ml-2">{message.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-muted/30 border border-border/30 rounded text-sm"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button size="sm" onClick={sendMessage}>
                <MessageCircle className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SocialSystem;
