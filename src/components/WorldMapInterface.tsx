
import React, { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Crown, 
  Star, 
  Coins, 
  Gem, 
  Sparkles,
  Sword,
  Shield,
  Home,
  Calendar,
  Trophy,
  Gift,
  ShoppingCart,
  Settings,
  Users,
  BookOpen,
  Zap,
  PawPrint,
  Heart,
  MessageSquare,
  Bell,
  Plus
} from 'lucide-react';

import EventSystem from './EventSystem';
import HomeSystem from './HomeSystem';
import SectSystem from './SectSystem';
import QuestSystem from './QuestSystem';
import RankingSystem from './RankingSystem';
import WelfareSystem from './WelfareSystem';
import CombatSystem from './CombatSystem';
import InventorySystem from './InventorySystem';
import CultivationSystem from './CultivationSystem';
import EnhancementSystem from './EnhancementSystem';
import PlayerOverview from './PlayerOverview';
import ShopSystem from './ShopSystem';
import GuildSystem from './GuildSystem';
import SocialSystem from './SocialSystem';
import PetSystem from './PetSystem';
import ChatSystem from './ChatSystem';
import SettingsSystem from './SettingsSystem';

const WorldMapInterface = () => {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const { gameState } = useGameState();

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getPlayerInfo = () => {
    const savedCharacter = localStorage.getItem('playerCharacter');
    if (savedCharacter) {
      const player = JSON.parse(savedCharacter);
      return {
        gender: player.gender || 'male',
        class: player.class || 'sword'
      };
    }
    return { gender: 'male', class: 'sword' };
  };

  const playerInfo = getPlayerInfo();

  // Định nghĩa các khu vực trên bản đồ
  const mapAreas = [
    { 
      id: 'home', 
      name: 'Động Phủ', 
      icon: Home, 
      position: { top: '15%', left: '75%' },
      description: 'Nơi nghỉ ngơi của tu sĩ'
    },
    { 
      id: 'combat', 
      name: 'Chiến Trường', 
      icon: Sword, 
      position: { top: '25%', left: '15%' },
      description: 'Khu vực PvP và chiến đấu'
    },
    { 
      id: 'cultivation', 
      name: 'Đài Tu Luyện', 
      icon: Zap, 
      position: { top: '35%', right: '20%' },
      description: 'Nơi tu luyện tăng cường'
    },
    { 
      id: 'sect', 
      name: 'Tông Môn', 
      icon: Crown, 
      position: { top: '45%', left: '25%' },
      description: 'Hội tụ các cao thủ'
    },
    { 
      id: 'shop', 
      name: 'Thương Phố', 
      icon: ShoppingCart, 
      position: { bottom: '35%', left: '20%' },
      description: 'Mua bán trang bị'
    },
    { 
      id: 'guild', 
      name: 'Bang Hội', 
      icon: Users, 
      position: { bottom: '25%', right: '25%' },
      description: 'Liên minh tu sĩ'
    },
    { 
      id: 'quest', 
      name: 'Nhiệm Vụ', 
      icon: BookOpen, 
      position: { top: '55%', left: '50%' },
      description: 'Nhận nhiệm vụ'
    },
    { 
      id: 'ranking', 
      name: 'Bảng Xếp Hạng', 
      icon: Trophy, 
      position: { bottom: '15%', left: '45%' },
      description: 'Thứ hạng cao thủ'
    }
  ];

  const handleAreaClick = (areaId: string) => {
    setActiveSystem(areaId);
  };

  const handleBackToMap = () => {
    setActiveSystem(null);
  };

  const renderActiveSystem = () => {
    if (!activeSystem) return null;

    switch (activeSystem) {
      case 'overview':
        return <PlayerOverview />;
      case 'home':
        return <HomeSystem />;
      case 'combat':
        return <CombatSystem />;
      case 'cultivation':
        return <CultivationSystem />;
      case 'inventory':
        return <InventorySystem playerGender={playerInfo.gender as 'male' | 'female'} playerClass={playerInfo.class as 'sword' | 'magic' | 'defense'} />;
      case 'quest':
        return <QuestSystem />;
      case 'shop':
        return <ShopSystem />;
      case 'enhancement':
        return <EnhancementSystem />;
      case 'sect':
        return <SectSystem />;
      case 'guild':
        return <GuildSystem />;
      case 'pet':
        return <PetSystem />;
      case 'event':
        return <EventSystem />;
      case 'welfare':
        return <WelfareSystem />;
      case 'social':
        return <SocialSystem />;
      case 'ranking':
        return <RankingSystem />;
      case 'chat':
        return <ChatSystem />;
      case 'settings':
        return <SettingsSystem />;
      default:
        return null;
    }
  };

  if (activeSystem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border p-4">
          <Button onClick={handleBackToMap} variant="outline">
            ← Quay lại Bản đồ
          </Button>
        </div>
        <div className="container mx-auto px-4 py-4 max-w-md">
          {renderActiveSystem()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-900 via-blue-900 to-green-800">
      {/* Background với hiệu ứng thế giới tu tiên */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-800/30 to-cyan-600/40"></div>
      
      {/* Clouds and mystical effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwLjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSJ1cmwoI2EpIi8+Cjwvc3ZnPgo=')] opacity-20"></div>

      {/* Header với thông tin người chơi */}
      <div className="relative z-10 p-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            {/* Player Info */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center relative">
                <User className="w-8 h-8 text-white" />
                <div className="absolute -bottom-1 -right-1 bg-mystical-purple rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  VIP{gameState?.player?.vipLevel || 0}
                </div>
              </div>
              <div>
                <h3 className="text-cultivator-gold font-bold text-lg">{gameState?.player?.name || 'Tu Tiên Giả'}</h3>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span>Lv.{gameState?.player?.level || 1}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-divine-blue" />
                    <span className="text-divine-blue font-medium">{formatNumber(gameState?.player?.combatPower)}</span>
                  </div>
                </div>
                <div className="w-32 mt-1">
                  <Progress 
                    value={gameState?.player ? (gameState.player.exp / gameState.player.maxExp) * 100 : 0} 
                    className="h-2" 
                  />
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-black/40 rounded-lg px-3 py-1 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-white">{formatNumber(gameState?.player?.silver)}</span>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="bg-black/40 rounded-lg px-3 py-1 flex items-center gap-2">
                  <Gem className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-white">{formatNumber(gameState?.player?.goldIngots)}</span>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="bg-black/40 rounded-lg px-3 py-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-mystical-purple" />
                <span className="text-sm font-medium text-white">{formatNumber(gameState?.player?.rechargeSpiritStones)}</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main World Map */}
      <div className="relative z-10 flex-1 min-h-[calc(100vh-200px)]">
        {/* Mystical floating islands and structures */}
        <div className="absolute inset-0">
          {/* Central floating platform */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-br from-cultivator-gold/30 to-spirit-jade/30 rounded-full flex items-center justify-center">
              <Zap className="w-10 h-10 text-cultivator-gold animate-pulse" />
            </div>
          </div>

          {/* Map Areas */}
          {mapAreas.map((area) => (
            <div
              key={area.id}
              className="absolute cursor-pointer transform hover:scale-110 transition-all duration-300"
              style={area.position}
              onClick={() => handleAreaClick(area.id)}
            >
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 hover:border-cultivator-gold/50 transition-all duration-300 shadow-lg hover:shadow-cultivator-gold/20">
                  <area.icon className="w-8 h-8 text-white group-hover:text-cultivator-gold transition-colors" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-center whitespace-nowrap">
                    <div className="text-sm font-medium text-cultivator-gold">{area.name}</div>
                    <div className="text-xs text-white/70">{area.description}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cultivator-gold rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-spirit-jade rounded-full animate-bounce opacity-40"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-mystical-purple rounded-full animate-ping opacity-50"></div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 p-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3">
          <div className="grid grid-cols-5 gap-3">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2 text-white hover:text-cultivator-gold"
              onClick={() => handleAreaClick('overview')}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Thông Tin</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2 text-white hover:text-cultivator-gold"
              onClick={() => handleAreaClick('inventory')}
            >
              <Shield className="w-6 h-6" />
              <span className="text-xs">Hành Trang</span>
            </Button>

            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2 text-white hover:text-cultivator-gold"
              onClick={() => handleAreaClick('pet')}
            >
              <PawPrint className="w-6 h-6" />
              <span className="text-xs">Thú Cưng</span>
            </Button>

            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2 text-white hover:text-cultivator-gold"
              onClick={() => handleAreaClick('social')}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs">Bạn Bè</span>
            </Button>

            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2 text-white hover:text-cultivator-gold"
              onClick={() => handleAreaClick('settings')}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs">Cài Đặt</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Chat button */}
      <div className="absolute bottom-20 right-4 z-20">
        <Button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade hover:from-spirit-jade hover:to-cultivator-gold transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => handleAreaClick('chat')}
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>

      {/* Events notification */}
      <div className="absolute top-20 right-4 z-20">
        <Button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-mystical-purple to-divine-blue hover:from-divine-blue hover:to-mystical-purple transition-all duration-300 shadow-lg hover:shadow-xl relative"
          onClick={() => handleAreaClick('event')}
        >
          <Calendar className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            !
          </div>
        </Button>
      </div>
    </div>
  );
};

export default WorldMapInterface;
