
import React, { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameStateIntegration } from '@/hooks/useGameStateIntegration';
import { Button } from '@/components/ui/button';
import EnhancedFairyGuideAI from './EnhancedFairyGuideAI';
import GameLandingPage from './GameLandingPage';
import CharacterSelection from './CharacterSelection';
import WorldMapInterface from './WorldMapInterface';
import StorySystem from './StorySystem';
import SectSelection from './SectSelection';

type GameState = 'landing' | 'character-selection' | 'game' | 'story' | 'sect-selection';

const IntegratedGameInterface = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { gameState: gameData } = useGameState();
  const { setLocation, setCombatState, setCultivationState, triggerEvent } = useGameStateIntegration();

  // Check if user is logged in on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // Check if we should show story when entering game
  useEffect(() => {
    if (gameState === 'game' && gameData?.player && !gameData.player.hasCompletedTutorial) {
      setGameState('story');
    }
  }, [gameState, gameData]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleStartGame = () => {
    setGameState('character-selection');
  };

  const handleCharacterSelect = (character: any) => {
    setGameState('game');
  };

  const handleBackToLanding = () => {
    setGameState('landing');
  };

  const handleSectSelectionTrigger = () => {
    setGameState('sect-selection');
  };

  const handleSectSelect = (sectId: string) => {
    setGameState('game');
  };

  const handleBackToGame = () => {
    setGameState('game');
  };

  // Render based on game state
  if (gameState === 'landing') {
    return (
      <GameLandingPage
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onStartGame={handleStartGame}
      />
    );
  }

  if (gameState === 'character-selection') {
    return (
      <CharacterSelection
        onCharacterSelect={handleCharacterSelect}
        onBack={handleBackToLanding}
      />
    );
  }

  if (gameState === 'story') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-cultivator-gold">Hành Trình Tu Tiên</h1>
            <Button 
              variant="outline" 
              onClick={handleBackToGame}
              className="border-amber-500/30 text-amber-400 hover:bg-amber-400/10"
            >
              Quay Về Thế Giới
            </Button>
          </div>
          <StorySystem onSectSelectionTrigger={handleSectSelectionTrigger} />
        </div>
      </div>
    );
  }

  if (gameState === 'sect-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto p-4">
          <SectSelection 
            onSectSelect={handleSectSelect}
            onBack={() => setGameState('story')}
          />
        </div>
      </div>
    );
  }

  // Game state - main world interface
  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Fairy Guide AI with integration */}
      <EnhancedFairyGuideAI />
      
      {/* Main World Map Interface */}
      <WorldMapInterface />
    </div>
  );
};

export default IntegratedGameInterface;
