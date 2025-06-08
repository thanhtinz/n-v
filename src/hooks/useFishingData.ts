
import { useState, useEffect } from 'react';

export interface Fish {
  id: number;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  experience: number;
  sellPrice: number;
  statBonus: {
    attack?: number;
    defense?: number;
    hp?: number;
    speed?: number;
  };
  island: number;
}

export interface FishingRod {
  id: number;
  name: string;
  level: number;
  luckBonus: number;
  rareFishRate: number;
  upgradeCost: number;
}

export interface Bait {
  id: number;
  name: string;
  price: number;
  successRate: number;
  rareFishBonus: number;
  duration: number;
}

export interface Island {
  id: number;
  name: string;
  unlockLevel: number;
  fishTypes: number[];
  specialRewards: string[];
}

export interface TreasureChest {
  id: number;
  x: number;
  y: number;
  rewards: {
    type: 'fishCoins' | 'pearl' | 'bait' | 'experience';
    amount: number;
  }[];
  collected: boolean;
}

export interface Mine {
  id: number;
  type: 'large' | 'medium' | 'small';
  owner: string | null;
  harvestTime: number;
  remainingTime: number;
  pearlReward: number;
  isProtected: boolean;
  protectionEndTime: number;
}

export interface FishingState {
  playerLevel: number;
  experience: number;
  maxExperience: number;
  fishCoins: number;
  pearls: number;
  currentIsland: number;
  inventory: Fish[];
  aquarium: Fish[];
  fishTank: Fish[];
  achievedFish: number[];
  currentRod: number;
  currentBait: number | null;
  baitRemaining: number;
  dailyFishingCount: number;
  dailyRaidCount: number;
  dailyRaidedCount: number;
  currentMine: number | null;
  mineStartTime: number | null;
}

const fishData: Fish[] = [
  { id: 1, name: 'Cá Nhỏ', rarity: 'common', experience: 10, sellPrice: 50, statBonus: { hp: 5 }, island: 1 },
  { id: 2, name: 'Cá Vừa', rarity: 'uncommon', experience: 25, sellPrice: 120, statBonus: { attack: 3, hp: 8 }, island: 1 },
  { id: 3, name: 'Cá Lớn', rarity: 'rare', experience: 50, sellPrice: 300, statBonus: { attack: 8, defense: 5 }, island: 1 },
  { id: 4, name: 'Cá Vàng', rarity: 'epic', experience: 100, sellPrice: 800, statBonus: { attack: 15, hp: 20 }, island: 1 },
  { id: 5, name: 'Cá Rồng', rarity: 'legendary', experience: 200, sellPrice: 2000, statBonus: { attack: 30, defense: 25, hp: 50 }, island: 2 },
  { id: 6, name: 'Cá Thiên Thần', rarity: 'legendary', experience: 300, sellPrice: 5000, statBonus: { attack: 50, defense: 40, hp: 100, speed: 20 }, island: 3 }
];

const rodData: FishingRod[] = [
  { id: 1, name: 'Cần Câu Gỗ', level: 1, luckBonus: 0, rareFishRate: 5, upgradeCost: 0 },
  { id: 2, name: 'Cần Câu Tre', level: 2, luckBonus: 5, rareFishRate: 8, upgradeCost: 10 },
  { id: 3, name: 'Cần Câu Thép', level: 3, luckBonus: 10, rareFishRate: 12, upgradeCost: 25 },
  { id: 4, name: 'Cần Câu Vàng', level: 4, luckBonus: 20, rareFishRate: 18, upgradeCost: 50 },
  { id: 5, name: 'Cần Câu Huyền Thoại', level: 5, luckBonus: 35, rareFishRate: 25, upgradeCost: 100 }
];

const baitData: Bait[] = [
  { id: 1, name: 'Mồi Giun', price: 10, successRate: 10, rareFishBonus: 0, duration: 60 },
  { id: 2, name: 'Mồi Tôm', price: 25, successRate: 15, rareFishBonus: 5, duration: 90 },
  { id: 3, name: 'Mồi Cá Nhỏ', price: 50, successRate: 20, rareFishBonus: 10, duration: 120 },
  { id: 4, name: 'Mồi Đặc Biệt', price: 100, successRate: 30, rareFishBonus: 20, duration: 180 }
];

const islandData: Island[] = [
  { id: 1, name: 'Đảo Khởi Đầu', unlockLevel: 1, fishTypes: [1, 2, 3, 4], specialRewards: ['Ngọc Trai', 'Xu Cá'] },
  { id: 2, name: 'Đảo Rồng', unlockLevel: 10, fishTypes: [3, 4, 5], specialRewards: ['Cần Câu Hiếm', 'Ngọc Trai Lớn'] },
  { id: 3, name: 'Đảo Thiên Đường', unlockLevel: 25, fishTypes: [4, 5, 6], specialRewards: ['Cần Câu Huyền Thoại', 'Kho Báu'] }
];

const initialState: FishingState = {
  playerLevel: 1,
  experience: 0,
  maxExperience: 100,
  fishCoins: 500,
  pearls: 10,
  currentIsland: 1,
  inventory: [],
  aquarium: [],
  fishTank: [],
  achievedFish: [],
  currentRod: 1,
  currentBait: null,
  baitRemaining: 0,
  dailyFishingCount: 0,
  dailyRaidCount: 0,
  dailyRaidedCount: 0,
  currentMine: null,
  mineStartTime: null
};

export const useFishingData = () => {
  const [fishingState, setFishingState] = useState<FishingState>(() => {
    const saved = localStorage.getItem('fishingState');
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  });

  const [treasureChests, setTreasureChests] = useState<TreasureChest[]>([]);
  const [mines, setMines] = useState<Mine[]>([]);

  useEffect(() => {
    localStorage.setItem('fishingState', JSON.stringify(fishingState));
  }, [fishingState]);

  const updateFishingState = (updates: Partial<FishingState>) => {
    setFishingState(prev => ({ ...prev, ...updates }));
  };

  const addExperience = (amount: number) => {
    setFishingState(prev => {
      let newExp = prev.experience + amount;
      let newLevel = prev.playerLevel;
      let newMaxExp = prev.maxExperience;

      while (newExp >= newMaxExp) {
        newExp -= newMaxExp;
        newLevel += 1;
        newMaxExp = Math.floor(newMaxExp * 1.2);
      }

      return {
        ...prev,
        experience: newExp,
        playerLevel: newLevel,
        maxExperience: newMaxExp
      };
    });
  };

  const addFish = (fishId: number) => {
    const fish = fishData.find(f => f.id === fishId);
    if (!fish) return;

    setFishingState(prev => ({
      ...prev,
      inventory: [...prev.inventory, fish],
      achievedFish: prev.achievedFish.includes(fishId) 
        ? prev.achievedFish 
        : [...prev.achievedFish, fishId]
    }));

    addExperience(fish.experience);
  };

  const sellFish = (fishId: number) => {
    const fish = fishData.find(f => f.id === fishId);
    if (!fish) return;

    setFishingState(prev => ({
      ...prev,
      inventory: prev.inventory.filter((f, index) => {
        if (f.id === fishId) {
          return index !== prev.inventory.findIndex(item => item.id === fishId);
        }
        return true;
      }),
      fishCoins: prev.fishCoins + fish.sellPrice
    }));
  };

  const moveFishToTank = (fishId: number) => {
    const fishIndex = fishingState.inventory.findIndex(f => f.id === fishId);
    if (fishIndex === -1) return;

    const fish = fishingState.inventory[fishIndex];
    setFishingState(prev => ({
      ...prev,
      inventory: prev.inventory.filter((_, index) => index !== fishIndex),
      fishTank: [...prev.fishTank, fish]
    }));
  };

  const upgradeRod = () => {
    const nextRodId = fishingState.currentRod + 1;
    const nextRod = rodData.find(r => r.id === nextRodId);
    if (!nextRod || fishingState.pearls < nextRod.upgradeCost) return;

    setFishingState(prev => ({
      ...prev,
      currentRod: nextRodId,
      pearls: prev.pearls - nextRod.upgradeCost
    }));
  };

  const buyBait = (baitId: number) => {
    const bait = baitData.find(b => b.id === baitId);
    if (!bait || fishingState.fishCoins < bait.price) return;

    setFishingState(prev => ({
      ...prev,
      currentBait: baitId,
      baitRemaining: bait.duration,
      fishCoins: prev.fishCoins - bait.price
    }));
  };

  return {
    fishingState,
    fishData,
    rodData,
    baitData,
    islandData,
    treasureChests,
    mines,
    updateFishingState,
    addExperience,
    addFish,
    sellFish,
    moveFishToTank,
    upgradeRod,
    buyBait,
    setTreasureChests,
    setMines
  };
};
