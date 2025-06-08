
import React, { useEffect, createContext, useContext } from 'react';
import { useGameState } from './useGameState';

interface GameIntegrationState {
  lastAction: string | null;
  isInCombat: boolean;
  isCultivating: boolean;
  currentLocation: string;
  recentEvents: Array<{
    id: string;
    type: 'level_up' | 'quest_complete' | 'item_gained' | 'combat_win' | 'cultivation_progress';
    message: string;
    timestamp: number;
  }>;
}

const GameIntegrationContext = createContext<{
  integrationState: GameIntegrationState;
  triggerEvent: (type: string, data: any) => void;
  setLocation: (location: string) => void;
  setCombatState: (inCombat: boolean) => void;
  setCultivationState: (cultivating: boolean) => void;
} | null>(null);

export const useGameStateIntegration = () => {
  const context = useContext(GameIntegrationContext);
  if (!context) {
    throw new Error('useGameStateIntegration must be used within GameIntegrationProvider');
  }
  return context;
};

export const GameIntegrationProvider = ({ children }: { children: React.ReactNode }) => {
  const { gameState, addNotification } = useGameState();
  const [integrationState, setIntegrationState] = React.useState<GameIntegrationState>({
    lastAction: null,
    isInCombat: false,
    isCultivating: false,
    currentLocation: 'overview',
    recentEvents: []
  });

  const triggerEvent = (type: string, data: any) => {
    const event = {
      id: Date.now().toString(),
      type: type as any,
      message: data.message || `Sự kiện ${type}`,
      timestamp: Date.now()
    };

    setIntegrationState(prev => ({
      ...prev,
      lastAction: type,
      recentEvents: [event, ...prev.recentEvents.slice(0, 9)]
    }));

    // Trigger notifications for important events
    if (['level_up', 'quest_complete', 'combat_win'].includes(type)) {
      addNotification(event.message, 'success');
    }
  };

  const setLocation = (location: string) => {
    setIntegrationState(prev => ({ ...prev, currentLocation: location }));
  };

  const setCombatState = (inCombat: boolean) => {
    setIntegrationState(prev => ({ ...prev, isInCombat: inCombat }));
  };

  const setCultivationState = (cultivating: boolean) => {
    setIntegrationState(prev => ({ ...prev, isCultivating: cultivating }));
  };

  return (
    <GameIntegrationContext.Provider
      value={{
        integrationState,
        triggerEvent,
        setLocation,
        setCombatState,
        setCultivationState
      }}
    >
      {children}
    </GameIntegrationContext.Provider>
  );
};
