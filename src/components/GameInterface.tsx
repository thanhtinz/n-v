import React, { useState } from 'react';
import { GameStateProvider, useGameState } from '@/hooks/useGameState';
import GameHeader from './GameHeader';
import PlayerStats from './PlayerStats';
import CentralDisplay from './CentralDisplay';
import DailyQuestSystem from './DailyQuestSystem';
import EventSystem from './EventSystem';
import HomeSystem from './HomeSystem';
import SectSystem from './SectSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Flame, Home, Shield, Sword } from 'lucide-react';
import QuestSystem from './QuestSystem';

const GameInterface = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { gameState } = useGameState();

  return (
    <GameStateProvider>
      <div className="min-h-screen bg-gradient-immortal text-foreground">
        <GameHeader />

        <div className="container mx-auto px-2 sm:px-4 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Panel - Player Stats */}
            <div className="lg:col-span-1 space-y-4">
              <PlayerStats player={gameState.player} />
            </div>

            {/* Central Display */}
            <div className="lg:col-span-1">
              <CentralDisplay
                player={{
                  name: gameState.player.name,
                  realm: 'Luyện Khí',
                  level: gameState.player.level,
                  gender: 'male',
                  class: 'sword',
                  equipment: {
                    clothing: 'Cloth Armor',
                    weapon: 'Iron Sword',
                    wings: 'None',
                    pet: 'None',
                    aura: 'None'
                  }
                }}
                activeTab={activeTab}
                isInCombat={false}
                isInTribulation={false}
                currentSect="Thiên Đạo Tông"
                currentBoss={{ name: 'Thủ Lĩnh Goblin', icon: '/goblin_leader.png' }}
                currentOpponent={{ name: 'Người Chơi Khác', avatar: '/default_avatar.png' }}
                homeActivity="gardening"
                activeCraftingJobs={3}
                plantsGrowing={8}
              />
            </div>

            {/* Right Panel - Game Content */}
            <div className="lg:col-span-1 space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-4">
                  <TabsTrigger value="home" className="text-xs">
                    <Home className="w-4 h-4 mr-1" />
                    Trang Chủ
                  </TabsTrigger>
                  <TabsTrigger value="daily" className="text-xs">
                    <Calendar className="w-4 h-4 mr-1" />
                    Nhiệm Vụ
                  </TabsTrigger>
                  <TabsTrigger value="events" className="text-xs">
                    <Flame className="w-4 h-4 mr-1" />
                    Sự Kiện
                  </TabsTrigger>
                  <TabsTrigger value="sect" className="text-xs">
                    <Shield className="w-4 h-4 mr-1" />
                    Tông Môn
                  </TabsTrigger>
                  <TabsTrigger value="combat" className="text-xs">
                    <Sword className="w-4 h-4 mr-1" />
                    Chiến Đấu
                  </TabsTrigger>
                  <TabsTrigger value="quests" className="text-xs">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Nhiệm Vụ
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="home">
                  <HomeSystem />
                </TabsContent>

                <TabsContent value="daily">
                  <DailyQuestSystem />
                </TabsContent>

                <TabsContent value="events">
                  <EventSystem />
                </TabsContent>

                <TabsContent value="sect">
                  <SectSystem />
                </TabsContent>

                <TabsContent value="combat">
                  <div>Combat Content</div>
                </TabsContent>

                <TabsContent value="quests">
                  <QuestSystem />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </GameStateProvider>
  );
};

export default GameInterface;
