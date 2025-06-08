
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
  X
} from 'lucide-react';
import DailyQuestSystem from './DailyQuestSystem';
import EventSystem from './EventSystem';
import HomeSystem from './HomeSystem';
import SectSystem from './SectSystem';
import QuestSystem from './QuestSystem';

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
            
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <Settings className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Player Info Bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-cultivator-gold">{gameState.player.name}</p>
                  <p className="text-xs text-muted-foreground">Lv.{gameState.player.level} • VIP{gameState.player.vipLevel}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Lực Chiến</p>
                <p className="text-sm font-bold text-divine-blue">{formatNumber(gameState.player.combatPower)}</p>
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

            {/* Resources */}
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Coins className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-medium">{formatNumber(gameState.player.gold)}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Gem className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium">{formatNumber(gameState.player.diamonds)}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-spirit-jade" />
                  <span className="text-xs font-medium">{formatNumber(gameState.player.spiritStones)}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-mystical-purple" />
                  <span className="text-xs font-medium">{formatNumber(gameState.player.rechargeSpiritStones)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-4 max-w-md">
          {/* Character Display Card */}
          <Card className="mb-6 p-6 bg-gradient-to-br from-card to-muted/50 border-cultivator-gold/20">
            <div className="text-center">
              <div className="w-32 h-40 mx-auto mb-4 bg-gradient-to-b from-cultivator-gold/20 to-spirit-jade/20 rounded-lg border-2 border-cultivator-gold/30 flex items-center justify-center">
                <div className="text-6xl">👤</div>
              </div>
              <h3 className="text-lg font-semibold text-cultivator-gold mb-2">{gameState.player.name}</h3>
              <div className="flex justify-center gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Cảnh Giới</p>
                  <p className="font-medium text-spirit-jade">Luyện Khí</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Tông Môn</p>
                  <p className="font-medium text-mystical-purple">Thiên Đạo</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="home" className="text-xs">
                <Home className="w-4 h-4 mr-1" />
                Trang Chủ
              </TabsTrigger>
              <TabsTrigger value="quests" className="text-xs">
                <BookOpen className="w-4 h-4 mr-1" />
                Nhiệm Vụ
              </TabsTrigger>
              <TabsTrigger value="more" className="text-xs">
                <Menu className="w-4 h-4 mr-1" />
                Thêm
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

            <TabsContent value="more" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setActiveTab('events')}>
                  <Flame className="w-8 h-8 mx-auto mb-2 text-blood-red" />
                  <p className="text-sm font-medium">Sự Kiện</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setActiveTab('sect')}>
                  <Shield className="w-8 h-8 mx-auto mb-2 text-spirit-jade" />
                  <p className="text-sm font-medium">Tông Môn</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Sword className="w-8 h-8 mx-auto mb-2 text-divine-blue" />
                  <p className="text-sm font-medium">Chiến Đấu</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Star className="w-8 h-8 mx-auto mb-2 text-cultivator-gold" />
                  <p className="text-sm font-medium">Tu Luyện</p>
                </Card>
              </div>
            </TabsContent>

            {/* Hidden tabs for navigation */}
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
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('more')}>
                  ← Quay lại
                </Button>
              </div>
              <SectSystem />
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4">
          <div className="flex justify-around max-w-md mx-auto">
            <Button size="sm" variant="ghost" className="flex-col h-auto py-2">
              <Zap className="w-5 h-5 mb-1" />
              <span className="text-xs">Tu Luyện</span>
            </Button>
            <Button size="sm" variant="ghost" className="flex-col h-auto py-2">
              <Sword className="w-5 h-5 mb-1" />
              <span className="text-xs">Đánh Boss</span>
            </Button>
            <Button size="sm" variant="ghost" className="flex-col h-auto py-2">
              <Calendar className="w-5 h-5 mb-1" />
              <span className="text-xs">Sự Kiện</span>
            </Button>
            <Button size="sm" variant="ghost" className="flex-col h-auto py-2">
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">Cài Đặt</span>
            </Button>
          </div>
        </div>
      </div>
    </GameStateProvider>
  );
};

export default GameInterface;
