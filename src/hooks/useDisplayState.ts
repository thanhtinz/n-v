
import { useState, useEffect } from 'react';

interface DisplayState {
  isInCombat: boolean;
  isInTribulation: boolean;
  currentSect: string;
  combatTarget?: string;
  tribulationLevel?: number;
}

export const useDisplayState = () => {
  const [displayState, setDisplayState] = useState<DisplayState>({
    isInCombat: false,
    isInTribulation: false,
    currentSect: 'Thiên Đạo Tông'
  });

  const startCombat = (target: string) => {
    setDisplayState(prev => ({
      ...prev,
      isInCombat: true,
      combatTarget: target
    }));
  };

  const endCombat = () => {
    setDisplayState(prev => ({
      ...prev,
      isInCombat: false,
      combatTarget: undefined
    }));
  };

  const startTribulation = (level: number) => {
    setDisplayState(prev => ({
      ...prev,
      isInTribulation: true,
      tribulationLevel: level
    }));
  };

  const endTribulation = () => {
    setDisplayState(prev => ({
      ...prev,
      isInTribulation: false,
      tribulationLevel: undefined
    }));
  };

  const changeSect = (sectName: string) => {
    setDisplayState(prev => ({
      ...prev,
      currentSect: sectName
    }));
  };

  return {
    displayState,
    startCombat,
    endCombat,
    startTribulation,
    endTribulation,
    changeSect
  };
};
