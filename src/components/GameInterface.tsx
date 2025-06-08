
import React, { useState } from 'react';
import { GameStateProvider, useGameState } from '@/hooks/useGameState';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Home, 
  Calendar, 
  Flame, 
  Shield, 
  Sword, 
  BookOpen,
  Bell,
  Settings,
  Star,
  Coins,
  Gem,
  Zap,
  Menu,
  X,
  Crown,
  Users,
  Trophy,
  Gift
} from 'lucide-react';
import DailyQuestSystem from './DailyQuestSystem';
import EventSystem from './EventSystem';
import HomeSystem from './HomeSystem';
import SectSystem from './SectSystem';
import QuestSystem from './QuestSystem';
import RankingSystem from './RankingSystem';
import WelfareSystem from './WelfareSystem';

const GameInterface = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const { gameState } = useGameState();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const expPercentage = (gameState.player.exp / gameState.player.maxExp) * 100;

  return (
    <GameStateProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden"
              >
                {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div>
                <h1 className="text-lg font-bold text-cultivator-gold">Tiên Vực</h1>
                <Badge variant="outline" className="text-xs">v0.2</Badge>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('cultivation')}>
                <Zap className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('pvp')}>
                <Sword className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('events')}>
                <Calendar className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Player Info Bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-cultivator-gold">{gameState.player.name}</p>
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3 text-mystical-purple" />
                      <span className="text-xs text-mystical-purple">VIP{gameState.player.vipLevel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Lv.{gameState.player.level}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-divine-blue" />
                      <span className="text-divine-blue font-medium">{formatNumber(gameState.player.combatPower)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Cảnh Giới</p>
                <p className="text-sm font-bold text-spirit-jade">Luyện Khí</p>
              </div>
            </div>
            
            {/* EXP Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Kinh Nghiệm</span>
                <span>{gameState.player.exp}/{gameState.player.maxExp}</span>
              </div>
              <Progress value={expPercentage} className="h-2" />
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-4 gap-2">
              <Card className="p-2 bg-card/60">
                <div className="text-center">
                  <Coins className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                  <span className="text-xs font-medium block">{formatNumber(gameState.player.gold)}</span>
                </div>
              </Card>
              <Card className="p-2 bg-card/60">
                <div className="text-center">
                  <Gem className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <span className="text-xs font-medium block">{formatNumber(gameState.player.diamonds)}</span>
                </div>
              </Card>
              <Card className="p-2 bg-card/60">
                <div className="text-center">
                  <Zap className="w-4 h-4 text-spirit-jade mx-auto mb-1" />
                  <span className="text-xs font-medium block">{formatNumber(gameState.player.spiritStones)}</span>
                </div>
              </Card>
              <Card className="p-2 bg-card/60">
                <div className="text-center">
                  <Star className="w-4 h-4 text-mystical-purple mx-auto mb-1" />
                  <span className="text-xs font-medium block">{formatNumber(gameState.player.rechargeSpiritStones)}</span>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-4 max-w-md pb-4">
          {/* Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="home" className="text-xs flex flex-col py-2">
                <Home className="w-4 h-4 mb-1" />
                <span>Trang Chủ</span>
              </TabsTrigger>
              <TabsTrigger value="quests" className="text-xs flex flex-col py-2">
                <BookOpen className="w-4 h-4 mb-1" />
                <span>Nhiệm Vụ</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="text-xs flex flex-col py-2">
                <Users className="w-4 h-4 mb-1" />
                <span>Xã Hội</span>
              </TabsTrigger>
              <TabsTrigger value="more" className="text-xs flex flex-col py-2">
                <Menu className="w-4 h-4 mb-1" />
                <span>Thêm</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-0">
              <HomeSystem />
            </TabsContent>

            <TabsContent value="quests" className="mt-0">
              <div className="space-y-4">
                <Tabs defaultValue="daily" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="daily">Hàng Ngày</TabsTrigger>
                    <TabsTrigger value="main">Chính Tuyến</TabsTrigger>
                  </TabsList>
                  <TabsContent value="daily">
                    <DailyQuestSystem />
                  </TabsContent>
                  <TabsContent value="main">
                    <QuestSystem />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Users className="w-8 h-8 mx-auto mb-2 text-spirit-jade" />
                  <p className="text-sm font-medium">Bạn Bè</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setActiveTab('sect')}>
                  <Shield className="w-8 h-8 mx-auto mb-2 text-mystical-purple" />
                  <p className="text-sm font-medium">Tông Môn</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setActiveTab('ranking')}>
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-cultivator-gold" />
                  <p className="text-sm font-medium">Bảng Xếp Hạng</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setActiveTab('welfare')}>
                  <Gift className="w-8 h-8 mx-auto mb-2 text-blood-red" />
                  <p className="text-sm font-medium">Phúc Lợi</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="more" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setActiveTab('events')}>
                  <Flame className="w-8 h-8 mx-auto mb-2 text-blood-red" />
                  <p className="text-sm font-medium">Sự Kiện</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Sword className="w-8 h-8 mx-auto mb-2 text-divine-blue" />
                  <p className="text-sm font-medium">Chiến Đấu</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-spirit-jade" />
                  <p className="text-sm font-medium">Tu Luyện</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Cài Đặt</p>
                </Card>
              </div>
            </TabsContent>

            {/* All Feature Tabs */}
            <TabsContent value="events" className="mt-0">
              <div className="mb-4">
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('more')}>
                  ← Quay lại
                </Button>
              </div>
              <EventSystem />
            </TabsContent>

            <TabsContent value="sect" className="mt-0">
              <div className="mb-4">
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('social')}>
                  ← Quay lại
                </Button>
              </div>
              <SectSystem />
            </TabsContent>

            <TabsContent value="ranking" className="mt-0">
              <div className="mb-4">
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('social')}>
                  ← Quay lại
                </Button>
              </div>
              <RankingSystem />
            </TabsContent>

            <TabsContent value="welfare" className="mt-0">
              <div className="mb-4">
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('social')}>
                  ← Quay lại
                </Button>
              </div>
              <WelfareSystem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GameStateProvider>
  );
};

export default GameInterface;
