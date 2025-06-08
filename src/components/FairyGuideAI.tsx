
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGameState } from '@/hooks/useGameState';
import { 
  Sparkles, 
  MessageCircle, 
  X, 
  Gift, 
  Star,
  Lightbulb,
  Heart,
  Zap
} from 'lucide-react';

interface FairyMessage {
  id: string;
  text: string;
  type: 'guide' | 'tip' | 'event' | 'quest' | 'chat';
  action?: () => void;
  actionText?: string;
}

const FairyGuideAI = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<FairyMessage | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { gameState, addNotification, claimReward } = useGameState();

  // Tin nhắn của Tiểu Tiên
  const fairyMessages: FairyMessage[] = [
    {
      id: '1',
      text: 'Chào mừng đạo hữu! Ta là Tiểu Tiên, sẽ đồng hành cùng ngươi trên con đường tu tiên~',
      type: 'guide'
    },
    {
      id: '2',
      text: 'Tu luyện chăm chỉ sẽ giúp ngươi tiến bộ nhanh hơn đấy! Hãy vào phần Tu Luyện ngay!',
      type: 'tip',
      action: () => addNotification('Hãy vào mục Tu Luyện để tăng sức mạnh!', 'info'),
      actionText: 'Đi Tu Luyện'
    },
    {
      id: '3',
      text: 'Có vẻ ngươi còn nhiều nhiệm vụ chưa hoàn thành. Ta sẽ giúp ngươi một chút!',
      type: 'quest',
      action: () => claimReward('exp', 50),
      actionText: 'Nhận 50 EXP'
    },
    {
      id: '4',
      text: 'Hmm... ta cảm nhận được khí vận của ngươi khá tốt hôm nay! Đây là món quà nhỏ~',
      type: 'event',
      action: () => claimReward('silver', 1000),
      actionText: 'Nhận 1000 Bạc'
    },
    {
      id: '5',
      text: 'Đừng quên kiểm tra Hành Trang thường xuyên! Có thể có những bảo vật quý giá đấy!',
      type: 'tip'
    },
    {
      id: '6',
      text: 'Tu tiên không chỉ là sức mạnh, mà còn là trí tuệ. Hãy học hỏi từ các cao thủ khác!',
      type: 'guide'
    }
  ];

  // Di chuyển ngẫu nhiên
  const moveRandomly = () => {
    const newX = Math.random() * 80 + 10; // 10-90% width
    const newY = Math.random() * 80 + 10; // 10-90% height
    setIsAnimating(true);
    setPosition({ x: newX, y: newY });
    
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Xuất hiện tin nhắn ngẫu nhiên
  const showRandomMessage = () => {
    const randomMessage = fairyMessages[Math.floor(Math.random() * fairyMessages.length)];
    setCurrentMessage(randomMessage);
    setShowChat(true);
  };

  // Auto behaviors
  useEffect(() => {
    const moveInterval = setInterval(moveRandomly, 8000); // Di chuyển mỗi 8 giây
    const messageInterval = setInterval(showRandomMessage, 15000); // Tin nhắn mỗi 15 giây

    return () => {
      clearInterval(moveInterval);
      clearInterval(messageInterval);
    };
  }, []);

  // Đóng chat sau 8 giây
  useEffect(() => {
    if (showChat) {
      const timer = setTimeout(() => {
        setShowChat(false);
        setCurrentMessage(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showChat]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiểu Tiên */}
      <div 
        className="fixed z-50 pointer-events-none"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: isAnimating ? 'all 1s ease-in-out' : 'none'
        }}
      >
        <div 
          className="relative pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
          onClick={() => showRandomMessage()}
        >
          {/* Hiệu ứng ánh sáng */}
          <div className="absolute inset-0 animate-pulse">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-30 blur-md"></div>
          </div>
          
          {/* Thân Tiểu Tiên */}
          <div className="relative w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          
          {/* Cánh */}
          <div className="absolute -top-1 -left-1 w-3 h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-70 transform -rotate-12 animate-bounce"></div>
          <div className="absolute -top-1 -right-1 w-3 h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-70 transform rotate-12 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          
          {/* Chấm sáng bay xung quanh */}
          <div className="absolute animate-ping">
            <Star className="w-2 h-2 text-yellow-300 absolute -top-3 -left-2" />
            <Star className="w-2 h-2 text-pink-300 absolute -bottom-2 right-1" style={{ animationDelay: '0.5s' }} />
            <Zap className="w-2 h-2 text-purple-300 absolute top-1 -right-3" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Nút tương tác nhanh */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 px-2 bg-white/80 hover:bg-white/90 text-xs rounded-full shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              showRandomMessage();
            }}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            Chat
          </Button>
        </div>
      </div>

      {/* Chat bubble */}
      {showChat && currentMessage && (
        <div 
          className="fixed z-50"
          style={{
            left: position.x > 50 ? `${position.x - 25}%` : `${position.x + 15}%`,
            top: `${Math.max(position.y - 15, 10)}%`,
            maxWidth: '280px'
          }}
        >
          <Card className="p-3 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 shadow-lg animate-scale-in">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-purple-600">Tiểu Tiên</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 hover:bg-purple-100"
                    onClick={() => {
                      setShowChat(false);
                      setCurrentMessage(null);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                  {currentMessage.text}
                </p>
                
                {currentMessage.action && currentMessage.actionText && (
                  <Button 
                    size="sm" 
                    className="h-7 px-3 text-xs bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"
                    onClick={() => {
                      currentMessage.action?.();
                      setShowChat(false);
                      setCurrentMessage(null);
                    }}
                  >
                    <Gift className="w-3 h-3 mr-1" />
                    {currentMessage.actionText}
                  </Button>
                )}
                
                {currentMessage.type === 'tip' && (
                  <div className="flex items-center gap-1 mt-1">
                    <Lightbulb className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-yellow-600 font-medium">Mẹo hay</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat tail */}
            <div 
              className="absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-pink-50"
              style={{
                left: position.x > 50 ? '85%' : '15%',
                bottom: '-4px'
              }}
            ></div>
          </Card>
        </div>
      )}

      {/* Toggle visibility button */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 bg-white/80 hover:bg-white/90 rounded-full shadow-md"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-purple-500" />}
        </Button>
      </div>
    </>
  );
};

export default FairyGuideAI;
