
import React, { useState, useEffect, createContext, useContext } from 'react';

interface GameState {
  // Player stats
  player: {
    name: string;
    level: number;
    exp: number;
    maxExp: number;
    vipLevel: number;
    totalRecharge: number;
    silver: number; // Bạc
    goldIngots: number; // Kim Nguyên Bảo
    rechargeSpiritStones: number; // Linh thạch nạp
    combatPower: number;
    sect?: string; // Tông môn đã chọn
    hasCompletedTutorial: boolean;
  };
  dailyActivities: {
    loginDays: number;
    questsCompleted: number;
    bossesDefeated: number;
    cultivationTime: number;
    lastLoginDate: string;
  };
  events: {
    activeEvents: any[];
    availableRewards: any[];
    claimedRewards: string[];
  };
  notifications: {
    unreadCount: number;
    messages: any[];
  };
}

const initialGameState: GameState = {
  player: {
    name: 'Tu Tiên Giả',
    level: 1,
    exp: 45,
    maxExp: 100,
    vipLevel: 2,
    totalRecharge: 150000,
    silver: 50000, // Bạc
    goldIngots: 1200, // Kim Nguyên Bảo
    rechargeSpiritStones: 50, // Linh thạch nạp
    combatPower: 180,
    hasCompletedTutorial: false
  },
  dailyActivities: {
    loginDays: 3,
    questsCompleted: 1,
    bossesDefeated: 0,
    cultivationTime: 15,
    lastLoginDate: new Date().toDateString()
  },
  events: {
    activeEvents: [],
    availableRewards: [],
    claimedRewards: []
  },
  notifications: {
    unreadCount: 3,
    messages: []
  }
};

const GameStateContext = createContext<{
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  claimReward: (type: string, amount: number, items?: string[]) => void;
  completeQuest: (questId: number, rewards: string[]) => void;
  addNotification: (message: string, type: 'success' | 'info' | 'warning') => void;
  setSect: (sectId: string) => void;
} | null>(null);

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within GameStateProvider');
  }
  return context;
};

export const GameStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gameState');
    return saved ? { ...initialGameState, ...JSON.parse(saved) } : initialGameState;
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const setSect = (sectId: string) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        sect: sectId,
        hasCompletedTutorial: true
      }
    }));
    
    addNotification(`Đã gia nhập tông môn thành công!`, 'success');
  };

  const claimReward = (type: string, amount: number, items?: string[]) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      if (type === 'silver') {
        newState.player.silver += amount;
      } else if (type === 'goldIngots') {
        newState.player.goldIngots += amount;
      } else if (type === 'rechargeSpiritStones') {
        newState.player.rechargeSpiritStones += amount;
      } else if (type === 'exp') {
        newState.player.exp += amount;
        // Check for level up
        while (newState.player.exp >= newState.player.maxExp) {
          newState.player.exp -= newState.player.maxExp;
          newState.player.level += 1;
          newState.player.maxExp = Math.floor(newState.player.maxExp * 1.2);
          newState.player.combatPower += 15;
        }
      }
      
      return newState;
    });
    
    addNotification(`Nhận được ${amount} ${type}`, 'success');
  };

  const completeQuest = (questId: number, rewards: string[]) => {
    setGameState(prev => ({
      ...prev,
      dailyActivities: {
        ...prev.dailyActivities,
        questsCompleted: prev.dailyActivities.questsCompleted + 1
      }
    }));

    rewards.forEach(reward => {
      const [amount, type] = reward.split(' ');
      const numAmount = parseInt(amount);
      if (!isNaN(numAmount)) {
        claimReward(type.toLowerCase(), numAmount);
      }
    });
  };

  const addNotification = (message: string, type: 'success' | 'info' | 'warning') => {
    setGameState(prev => ({
      ...prev,
      notifications: {
        unreadCount: prev.notifications.unreadCount + 1,
        messages: [
          { id: Date.now(), message, type, timestamp: new Date() },
          ...prev.notifications.messages.slice(0, 9)
        ]
      }
    }));
  };

  return React.createElement(
    GameStateContext.Provider,
    {
      value: {
        gameState,
        updateGameState,
        claimReward,
        completeQuest,
        addNotification,
        setSect
      }
    },
    children
  );
};
