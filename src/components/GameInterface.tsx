
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
        {/* Simple Header */}
        <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        {showMenu && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowMenu(false)}>
            <div 
              className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Menu</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowMenu(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Player Info in Sidebar */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-cultivator-gold">{gameState.player.name}</p>
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
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Kinh Nghiệm</span>
                    <span>{gameState.player.exp}/{gameState.player.maxExp}</span>
                  </div>
                  <Progress value={expPercentage} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-card rounded">
                    <Coins className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                    <span className="text-xs font-medium">{formatNumber(gameState.player.gold)}</span>
                  </div>
                  <div className="text-center p-2 bg-card rounded">
                    <Gem className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <span className="text-xs font-medium">{formatNumber(gameState.player.diamonds)}</span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('home');
                    setShowMenu(false);
                  }}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Trang Chủ
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('quests');
                    setShowMenu(false);
                  }}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Nhiệm Vụ
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('events');
                    setShowMenu(false);
                  }}
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Sự Kiện
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('sect');
                    setShowMenu(false);
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Tông Môn
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('ranking');
                    setShowMenu(false);
                  }}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Bảng Xếp Hạng
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('welfare');
                    setShowMenu(false);
                  }}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Phúc Lợi
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('social');
                    setShowMenu(false);
                  }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Xã Hội
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Sword className="w-4 h-4 mr-2" />
                  Chiến Đấu
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Tu Luyện
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-4 max-w-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

            <TabsContent value="events" className="mt-0">
              <EventSystem />
            </TabsContent>

            <TabsContent value="sect" className="mt-0">
              <SectSystem />
            </TabsContent>

            <TabsContent value="ranking" className="mt-0">
              <RankingSystem />
            </TabsContent>

            <TabsContent value="welfare" className="mt-0">
              <WelfareSystem />
            </TabsContent>

            <TabsContent value="social" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Users className="w-8 h-8 mx-auto mb-2 text-spirit-jade" />
                  <p className="text-sm font-medium">Bạn Bè</p>
                </Card>
                <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Sword className="w-8 h-8 mx-auto mb-2 text-divine-blue" />
                  <p className="text-sm font-medium">PvP</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GameStateProvider>
  );
};

export default GameInterface;
