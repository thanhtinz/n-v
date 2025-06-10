
import React, { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameStateIntegration } from '@/hooks/useGameStateIntegration';
import EnhancedFairyGuideAI from './EnhancedFairyGuideAI';
import GameLandingPage from './GameLandingPage';
import CharacterSelection from './CharacterSelection';
import WorldMapInterface from './WorldMapInterface';

type GameState = 'landing' | 'character-selection' | 'game';

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

  // Game state - new world map interface
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
