
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Brain, 
  Heart, 
  AlertTriangle, 
  Eye, 
  MessageCircle,
  TrendingUp,
  Star,
  Lightbulb,
  Clock
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

const SpiritGuideSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [spiritMood, setSpiritMood] = useState('Hiền Lành');
  const [trustLevel, setTrustLevel] = useState(75);
  const [conversationCount, setConversationCount] = useState(127);
  const [currentAdvice, setCurrentAdvice] = useState('');

  const spiritPersonality = {
    name: 'Thiên Cơ Tử',
    type: 'Thần Linh Cổ Đại',
    appearance: 'Ánh sáng xanh lam lung linh',
    bond: trustLevel,
    loyalty: 'Nghi Ngờ' // Could be: Trung Thành, Nghi Ngờ, Phản Bội
  };

  const recentAdvices = [
    {
      time: '5 phút trước',
      type: 'warning',
      message: 'Ta thấy ngươi đang lãng phí linh thạch vào việc không cần thiết...',
      accuracy: 'Chính xác'
    },
    {
      time: '1 giờ trước', 
      type: 'suggestion',
      message: 'Hôm nay là ngày tốt để tu luyện Hoả hệ, ngươi nên tập trung vào đó.',
      accuracy: 'Chính xác'
    },
    {
      time: '3 giờ trước',
      type: 'prediction',
      message: 'Ta cảm nhận Boss mạnh sẽ xuất hiện trong 2 giờ tới. Hãy chuẩn bị!',
      accuracy: 'Sai'
    },
    {
      time: 'Hôm qua',
      type: 'wisdom',
      message: 'Đường tu đạo không phải là cuộc đua. Ngươi quá vội vàng...',
      accuracy: 'Có ý nghĩa'
    }
  ];

  const spiritualQuestions = [
    'Làm thế nào để tu luyện nhanh hơn?',
    'Tại sao ta lại gặp nhiều khó khăn?',
    'Liệu ta có thể trở thành cao thủ?',
    'Ta nên chọn phái nào?',
    'Khi nào Boss tiếp theo xuất hiện?'
  ];

  const askSpirit = (question: string) => {
    const responses = [
      'Hmm... Ta thấy trong tương lai của ngươi có bóng dáng vinh quang, nhưng cũng có tai họa...',
      'Ngươi đang đi đúng hướng, nhưng tâm tính còn thiếu kiên định.',
      'Câu hỏi hay! Nhưng câu trả lời phụ thuộc vào lựa chọn của chính ngươi.',
      'Ta không thể tiết lộ quá nhiều về tương lai. Một số điều ngươi phải tự khám phá.',
      '*Thiên Cơ Tử im lặng một lúc* ...Có những điều ta không được phép nói.',
      'Ngươi hỏi điều này làm gì? Ta nghi ngờ động cơ của ngươi...'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setCurrentAdvice(randomResponse);
    
    // Randomly affect trust
    const trustChange = Math.random() > 0.5 ? 1 : -1;
    setTrustLevel(prev => Math.max(0, Math.min(100, prev + trustChange)));
    
    addNotification('Thiên Cơ Tử đã trả lời!', 'info');
  };

  const getAdviceIcon = (type: string) => {
    switch(type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'prediction': return <Eye className="w-4 h-4 text-purple-500" />;
      case 'wisdom': return <Star className="w-4 h-4 text-cultivator-gold" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTrustColor = (trust: number) => {
    if (trust >= 80) return 'text-green-500';
    if (trust >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  useEffect(() => {
    // Simulate spirit giving periodic advice
    const interval = setInterval(() => {
      const tips = [
        'Ta cảm nhận ngươi đang tiến bộ...',
        'Hôm nay có vẻ không phải ngày tốt để mạo hiểm.',
        'Ngươi nên tập trung vào việc tu luyện hơn.',
        'Ta thấy có sự thay đổi lớn sắp tới...'
      ];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      if (Math.random() > 0.7) { // 30% chance
        setCurrentAdvice(randomTip);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-mystical-purple/20 to-divine-blue/20 border-mystical-purple/30">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-mystical-purple" />
          <h3 className="font-semibold text-mystical-purple">Thần Linh Cá Nhân</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Một thực thể cổ đại đồng hành cùng ngươi trên con đường tu đạo.
        </p>
      </Card>

      {/* Spirit Overview */}
      <Card className="p-4 bg-gradient-to-r from-spirit-jade/10 to-mystical-purple/10 border-spirit-jade/30">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-mystical-purple to-divine-blue rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-mystical-purple">{spiritPersonality.name}</h3>
            <p className="text-sm text-muted-foreground">{spiritPersonality.type}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs">Độ tin tưởng:</span>
              <span className={`text-xs font-medium ${getTrustColor(trustLevel)}`}>
                {trustLevel}%
              </span>
              <Badge variant="outline" className="text-xs">
                {spiritPersonality.loyalty}
              </Badge>
            </div>
          </div>
        </div>
        
        <Progress value={trustLevel} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">
          Độ tin tưởng ảnh hưởng đến chất lượng lời khuyên và khả năng phản bội cuối game.
        </p>
      </Card>

      <Tabs defaultValue="conversation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversation">Đối Thoại</TabsTrigger>
          <TabsTrigger value="advice">Lời Khuyên</TabsTrigger>
          <TabsTrigger value="relationship">Quan Hệ</TabsTrigger>
        </TabsList>

        <TabsContent value="conversation">
          <Card className="p-4">
            <div className="mb-4">
              <h4 className="font-medium mb-2">Hỏi Thiên Cơ Tử</h4>
              <div className="grid grid-cols-1 gap-2">
                {spiritualQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => askSpirit(question)}
                    className="text-left justify-start text-xs h-auto p-2"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {currentAdvice && (
              <Card className="p-3 bg-mystical-purple/10 border-mystical-purple/30">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-mystical-purple mt-0.5" />
                  <div className="text-sm text-mystical-purple italic">
                    "{currentAdvice}"
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-right">
                  - Thiên Cơ Tử
                </div>
              </Card>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="advice">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Lời Khuyên Gần Đây</h4>
            <div className="space-y-3">
              {recentAdvices.map((advice, index) => (
                <div key={index} className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    {getAdviceIcon(advice.type)}
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">
                        {advice.message}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{advice.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {advice.accuracy}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="relationship">
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-3">Thống Kê Tương Tác</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-divine-blue mx-auto mb-1" />
                  <div className="font-medium">{conversationCount}</div>
                  <div className="text-xs text-muted-foreground">Cuộc trò chuyện</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                  <div className="font-medium">{trustLevel}%</div>
                  <div className="text-xs text-muted-foreground">Độ tin tưởng</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <div className="font-medium">73%</div>
                  <div className="text-xs text-muted-foreground">Lời khuyên đúng</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div className="font-medium">45 ngày</div>
                  <div className="text-xs text-muted-foreground">Đồng hành</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-3">Cảnh Báo Phản Bội</h4>
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-400">Mức Độ Nguy Hiểm: Trung Bình</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Thiên Cơ Tử đang có dấu hiệu nghi ngờ. Các lựa chọn của ngươi trong tương lai có thể khiến nó phản bội. 
                  Hãy cẩn thận với những quyết định quan trọng.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpiritGuideSystem;
