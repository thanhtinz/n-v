import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGameState } from '@/hooks/useGameState';
import { useGameStateIntegration } from '@/hooks/useGameStateIntegration';
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
  type: 'guide' | 'tip' | 'event' | 'quest' | 'chat' | 'reaction';
  action?: () => void;
  actionText?: string;
}

const EnhancedFairyGuideAI = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<FairyMessage | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { gameState, addNotification, claimReward } = useGameState();
  const { integrationState, triggerEvent } = useGameStateIntegration();

  // Context-aware messages based on game state
  const getContextualMessages = (): FairyMessage[] => {
    const baseMessages: FairyMessage[] = [
      {
        id: '1',
        text: 'Chào mừng đạo hữu! Ta là Tiểu Tiên, sẽ đồng hành cùng ngươi trên con đường tu tiên~',
        type: 'guide'
      }
    ];

    // Add location-specific messages
    if (integrationState.currentLocation === 'cultivation') {
      baseMessages.push({
        id: 'cult1',
        text: 'Tu luyện chăm chỉ sẽ giúp ngươi tiến bộ nhanh chóa! Hãy kiên trì!',
        type: 'tip'
      });
    }

    if (integrationState.currentLocation === 'combat') {
      baseMessages.push({
        id: 'combat1',
        text: 'Chiến đấu thông minh hơn sức mạnh! Hãy quan sát đối thủ!',
        type: 'tip'
      });
    }

    // Add state-reactive messages
    if (integrationState.isInCombat) {
      baseMessages.push({
        id: 'combat_active',
        text: 'Tập trung vào trận chiến! Ta sẽ tiếp thêm sức mạnh cho ngươi!',
        type: 'reaction',
        action: () => {
          claimReward('exp', 25);
          triggerEvent('fairy_blessing', { message: 'Tiểu Tiên ban phước lành chiến đấu!' });
        },
        actionText: 'Nhận Phước Lành'
      });
    }

    if (integrationState.isCultivating) {
      baseMessages.push({
        id: 'cult_active',
        text: 'Tu luyện tốt lắm! Ta cảm nhận được khí tức mạnh mẽ từ ngươi!',
        type: 'reaction'
      });
    }

    // React to recent events
    const recentEvent = integrationState.recentEvents[0];
    if (recentEvent && Date.now() - recentEvent.timestamp < 30000) {
      if (recentEvent.type === 'level_up') {
        baseMessages.push({
          id: 'level_reaction',
          text: 'Chúc mừng ngươi đã tăng cấp! Đây là phần thưởng từ ta!',
          type: 'event',
          action: () => claimReward('silver', 500),
          actionText: 'Nhận 500 Bạc'
        });
      }
    }

    return baseMessages;
  };

  const moveRandomly = () => {
    if (!isVisible) return;
    const newX = Math.random() * 80 + 10;
    const newY = Math.random() * 80 + 10;
    setIsAnimating(true);
    setPosition({ x: newX, y: newY });
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const moveToCorner = () => {
    setIsAnimating(true);
    setPosition({ x: 95, y: 95 });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const showContextualMessage = () => {
    if (!isVisible) return;
    const messages = getContextualMessages();
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setShowChat(true);
  };

  const toggleVisibility = () => {
    if (isVisible) {
      moveToCorner();
      setTimeout(() => {
        setIsVisible(false);
        setShowChat(false);
        setCurrentMessage(null);
      }, 500);
    } else {
      setIsVisible(true);
      setTimeout(() => {
        moveRandomly();
      }, 100);
    }
  };

  // Auto behaviors with context awareness
  useEffect(() => {
    if (!isVisible) return;
    
    const moveInterval = setInterval(moveRandomly, 8000);
    const messageInterval = setInterval(showContextualMessage, 12000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(messageInterval);
    };
  }, [isVisible, integrationState]);

  // React to game events
  useEffect(() => {
    const recentEvent = integrationState.recentEvents[0];
    if (recentEvent && Date.now() - recentEvent.timestamp < 5000) {
      // Show immediate reaction to important events
      if (['level_up', 'quest_complete', 'combat_win'].includes(recentEvent.type)) {
        showContextualMessage();
      }
    }
  }, [integrationState.recentEvents]);

  useEffect(() => {
    if (showChat) {
      const timer = setTimeout(() => {
        setShowChat(false);
        setCurrentMessage(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showChat]);

  if (!isVisible) {
    // Hidden state - small clickable icon in corner
    return (
      <div 
        className="fixed bottom-4 right-4 z-50 cursor-pointer hover:scale-110 transition-all duration-300"
        onClick={toggleVisibility}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 opacity-60 hover:opacity-100">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Fairy Guide */}
      <div 
        className="fixed z-50 pointer-events-none"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: isAnimating ? 'all 0.5s ease-in-out' : 'none'
        }}
      >
        <div 
          className="relative pointer-events-auto cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={showContextualMessage}
        >
          {/* Fairy visual elements */}
          <div className="absolute inset-0 animate-pulse">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-30 blur-md"></div>
          </div>
          
          <div className="relative w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          
          {/* Wings */}
          <div className="absolute -top-1 -left-1 w-3 h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-70 transform -rotate-12 animate-bounce"></div>
          <div className="absolute -top-1 -right-1 w-3 h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-70 transform rotate-12 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          
          {/* Sparkles */}
          <div className="absolute animate-ping">
            <Star className="w-2 h-2 text-yellow-300 absolute -top-3 -left-2" />
            <Star className="w-2 h-2 text-pink-300 absolute -bottom-2 right-1" style={{ animationDelay: '0.5s' }} />
            <Zap className="w-2 h-2 text-purple-300 absolute top-1 -right-3" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Quick action button */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 px-2 bg-white/80 hover:bg-white/90 text-xs rounded-full shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              showContextualMessage();
            }}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            Chat
          </Button>
        </div>
      </div>

      {/* Chat bubble - enhanced with context */}
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

                {currentMessage.type === 'reaction' && (
                  <div className="flex items-center gap-1 mt-1">
                    <Heart className="w-3 h-3 text-pink-500" />
                    <span className="text-xs text-pink-600 font-medium">Phản ứng</span>
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
          onClick={toggleVisibility}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default EnhancedFairyGuideAI;
