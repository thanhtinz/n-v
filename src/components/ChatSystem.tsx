
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  MessageCircle,
  Users,
  Globe,
  Send,
  Crown,
  Star,
  Shield,
  Bell,
  Settings
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: Date;
  channel: 'world' | 'sect' | 'private' | 'system';
  senderRealm: string;
  isVip?: boolean;
  isSystem?: boolean;
}

const ChatSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState('world');
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Hệ Thống',
      message: 'Chào mừng Tu Tiên Giả đến với thế giới tu tiên!',
      time: new Date(Date.now() - 5 * 60 * 1000),
      channel: 'system',
      senderRealm: '',
      isSystem: true
    },
    {
      id: '2',
      sender: 'Kiếm Thánh',
      message: 'Ai muốn tham gia đánh boss Hỏa Long cùng ta?',
      time: new Date(Date.now() - 10 * 60 * 1000),
      channel: 'world',
      senderRealm: 'Hóa Thần',
      isVip: true
    },
    {
      id: '3',
      sender: 'Đan Sư',
      message: 'Bán Hồi Linh Đan cấp 5, giá rẻ! Liên hệ riêng.',
      time: new Date(Date.now() - 15 * 60 * 1000),
      channel: 'world',
      senderRealm: 'Kim Đan'
    },
    {
      id: '4',
      sender: 'Hệ Thống',
      message: 'Sự kiện Lễ Hội Mùa Hè đã bắt đầu! Nhận quà miễn phí tại NPC Sự Kiện.',
      time: new Date(Date.now() - 20 * 60 * 1000),
      channel: 'system',
      senderRealm: '',
      isSystem: true
    }
  ]);

  const [onlineUsers] = useState([
    { name: 'Kiếm Thánh', realm: 'Hóa Thần', isVip: true, status: 'online' },
    { name: 'Đan Sư', realm: 'Kim Đan', isVip: false, status: 'online' },
    { name: 'Phượng Hoàng Nữ Đế', realm: 'Hóa Thần', isVip: true, status: 'online' },
    { name: 'Tu Luyện Giả', realm: 'Luyện Khí', isVip: false, status: 'online' },
    { name: 'Băng Tuyết Tiên Nữ', realm: 'Nguyên Anh', isVip: true, status: 'away' },
    { name: 'Long Vương', realm: 'Nguyên Anh', isVip: true, status: 'busy' }
  ]);

  const getRealmColor = (realm: string) => {
    const colors: Record<string, string> = {
      'Phàm Nhân': 'text-gray-400',
      'Luyện Khí': 'text-green-400',
      'Trúc Cơ': 'text-blue-400',
      'Kim Đan': 'text-purple-400',
      'Nguyên Anh': 'text-yellow-400',
      'Hóa Thần': 'text-red-400',
      'Đại La Cảnh': 'text-white'
    };
    return colors[realm] || 'text-gray-400';
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: gameState.player.name,
        message: message.trim(),
        time: new Date(),
        channel: activeTab as 'world' | 'sect' | 'private',
        senderRealm: 'Phàm Nhân',
        isVip: gameState.player.vipLevel > 0
      };

      setMessages(prev => [newMessage, ...prev.slice(0, 49)]);
      setMessage('');
      addNotification(`Đã gửi tin nhắn đến ${activeTab === 'world' ? 'Thế Giới' : activeTab === 'sect' ? 'Tông Môn' : 'Riêng Tư'}`, 'success');
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.channel === activeTab || (activeTab === 'world' && msg.channel === 'system')
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'busy': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-cultivator-gold" />
          <h2 className="text-xl font-semibold text-cultivator-gold">Trò Chuyện</h2>
          <Badge variant="outline" className="text-xs border-green-400 text-green-400">
            {onlineUsers.filter(u => u.status === 'online').length} online
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="world" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Thế Giới
                </TabsTrigger>
                <TabsTrigger value="sect" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Tông Môn
                </TabsTrigger>
                <TabsTrigger value="private" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Riêng Tư
                </TabsTrigger>
              </TabsList>

              <TabsContent value="world" className="space-y-3">
                <Card className="p-3 bg-muted/20 h-64 overflow-y-auto">
                  <div className="space-y-3">
                    {filteredMessages.map((msg) => (
                      <div key={msg.id} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="flex items-center gap-1">
                            {msg.isSystem ? (
                              <Bell className="w-3 h-3 text-blue-400" />
                            ) : (
                              msg.isVip && <Crown className="w-3 h-3 text-yellow-400" />
                            )}
                            <span className={`font-medium ${
                              msg.isSystem ? 'text-blue-400' : getRealmColor(msg.senderRealm)
                            }`}>
                              {msg.sender}
                            </span>
                          </span>
                          {!msg.isSystem && (
                            <Badge variant="outline" className={`text-xs ${getRealmColor(msg.senderRealm)}`}>
                              {msg.senderRealm}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {msg.time.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className={`pl-4 ${msg.isSystem ? 'text-blue-300' : 'text-foreground'}`}>
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-3 py-2 bg-muted/20 border border-border/50 rounded-md text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} size="sm" disabled={!message.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="sect" className="space-y-3">
                <Card className="p-4 bg-muted/20 h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Bạn chưa tham gia tông môn nào.</p>
                    <p className="text-xs mt-2">Tham gia tông môn để chat với thành viên!</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="private" className="space-y-3">
                <Card className="p-4 bg-muted/20 h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Chưa có tin nhắn riêng tư.</p>
                    <p className="text-xs mt-2">Nhấp vào tên người chơi để gửi tin nhắn!</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Online Users */}
          <div className="lg:col-span-1">
            <Card className="p-3 bg-muted/20">
              <h3 className="font-semibold text-sm mb-3 text-spirit-jade">Đang Online</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {onlineUsers.map((user, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 bg-card/30 rounded hover:bg-card/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setActiveTab('private');
                      addNotification(`Đã mở chat riêng với ${user.name}`, 'info');
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        {user.isVip && <Crown className="w-3 h-3 text-yellow-400" />}
                        <span className={`text-xs font-medium ${getRealmColor(user.realm)}`}>
                          {user.name}
                        </span>
                      </div>
                      <div className={`text-xs ${getRealmColor(user.realm)}`}>
                        {user.realm}
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatSystem;
