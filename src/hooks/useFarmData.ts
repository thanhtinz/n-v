
import { useState, useEffect } from 'react';

export interface FarmPlot {
  id: string;
  crop: string | null;
  plantedTime: Date | null;
  growthTime: number; // minutes
  isReady: boolean;
  yield: number;
  petBonus: number; // bonus from pets
}

export interface CropType {
  id: string;
  name: string;
  growthTime: number; // minutes
  sellPrice: number;
  buyPrice: number;
  yieldBase: number;
  type: 'food' | 'material' | 'pet_food';
}

export interface FarmData {
  plots: FarmPlot[];
  autoHarvest: boolean;
  petHelp: boolean;
  totalHarvested: number;
  experience: number;
}

// Global farm state
let globalFarmData: FarmData = {
  plots: [
    { id: '1', crop: 'carrot', plantedTime: new Date(Date.now() - 25 * 60 * 1000), growthTime: 30, isReady: false, yield: 5, petBonus: 0 },
    { id: '2', crop: 'tomato', plantedTime: new Date(Date.now() - 55 * 60 * 1000), growthTime: 60, isReady: true, yield: 8, petBonus: 2 },
    { id: '3', crop: null, plantedTime: null, growthTime: 0, isReady: false, yield: 0, petBonus: 0 },
    { id: '4', crop: 'pet_rice', plantedTime: new Date(Date.now() - 20 * 60 * 1000), growthTime: 30, isReady: false, yield: 5, petBonus: 1 },
    { id: '5', crop: null, plantedTime: null, growthTime: 0, isReady: false, yield: 0, petBonus: 0 },
    { id: '6', crop: 'wheat', plantedTime: new Date(Date.now() - 150 * 60 * 1000), growthTime: 180, isReady: false, yield: 15, petBonus: 0 }
  ],
  autoHarvest: false,
  petHelp: true,
  totalHarvested: 156,
  experience: 89
};

const cropTypes: CropType[] = [
  { id: 'carrot', name: 'Cà Rốt', growthTime: 30, sellPrice: 50, buyPrice: 10, yieldBase: 5, type: 'food' },
  { id: 'tomato', name: 'Cà Chua', growthTime: 60, sellPrice: 100, buyPrice: 20, yieldBase: 8, type: 'food' },
  { id: 'corn', name: 'Ngô', growthTime: 120, sellPrice: 200, buyPrice: 50, yieldBase: 12, type: 'food' },
  { id: 'wheat', name: 'Lúa Mì', growthTime: 180, sellPrice: 300, buyPrice: 80, yieldBase: 15, type: 'food' },
  { id: 'pet_rice', name: 'Lúa Pet', growthTime: 30, sellPrice: 0, buyPrice: 5, yieldBase: 5, type: 'pet_food' },
  { id: 'pet_grass', name: 'Cỏ Ngọt', growthTime: 45, sellPrice: 0, buyPrice: 8, yieldBase: 8, type: 'pet_food' },
  { id: 'spirit_herb', name: 'Thảo Linh', growthTime: 90, sellPrice: 0, buyPrice: 15, yieldBase: 3, type: 'material' }
];

const listeners: Array<() => void> = [];

export const useFarmData = () => {
  const [, forceUpdate] = useState({});

  const updateFarmData = (newData: Partial<FarmData>) => {
    globalFarmData = { ...globalFarmData, ...newData };
    listeners.forEach(listener => listener());
  };

  const plantCrop = (plotId: string, cropId: string) => {
    const crop = cropTypes.find(c => c.id === cropId);
    if (!crop) return false;

    const newPlots = globalFarmData.plots.map(plot => 
      plot.id === plotId 
        ? { 
            ...plot, 
            crop: cropId, 
            plantedTime: new Date(), 
            growthTime: crop.growthTime,
            isReady: false,
            yield: crop.yieldBase + (globalFarmData.petHelp ? Math.floor(crop.yieldBase * 0.2) : 0),
            petBonus: globalFarmData.petHelp ? Math.floor(crop.yieldBase * 0.2) : 0
          }
        : plot
    );

    updateFarmData({ plots: newPlots });
    return true;
  };

  const harvestCrop = (plotId: string) => {
    const plot = globalFarmData.plots.find(p => p.id === plotId);
    if (!plot || !plot.isReady) return null;

    const newPlots = globalFarmData.plots.map(p => 
      p.id === plotId 
        ? { ...p, crop: null, plantedTime: null, isReady: false, yield: 0, petBonus: 0 }
        : p
    );

    const totalYield = plot.yield + plot.petBonus;
    updateFarmData({ 
      plots: newPlots,
      totalHarvested: globalFarmData.totalHarvested + totalYield,
      experience: globalFarmData.experience + 1
    });

    return {
      crop: plot.crop,
      yield: totalYield,
      petBonus: plot.petBonus
    };
  };

  const getPlotProgress = (plot: FarmPlot) => {
    if (!plot.plantedTime) return 0;
    const elapsed = Date.now() - plot.plantedTime.getTime();
    const progress = Math.min((elapsed / (plot.growthTime * 60 * 1000)) * 100, 100);
    return progress;
  };

  const updatePlotReadiness = () => {
    const newPlots = globalFarmData.plots.map(plot => {
      if (plot.plantedTime && !plot.isReady) {
        const elapsed = Date.now() - plot.plantedTime.getTime();
        const isReady = elapsed >= (plot.growthTime * 60 * 1000);
        return { ...plot, isReady };
      }
      return plot;
    });

    const hasChanges = newPlots.some((plot, index) => 
      plot.isReady !== globalFarmData.plots[index].isReady
    );

    if (hasChanges) {
      updateFarmData({ plots: newPlots });
    }
  };

  const togglePetHelp = () => {
    const newPetHelp = !globalFarmData.petHelp;
    updateFarmData({ petHelp: newPetHelp });
    
    // Update current plots with pet bonus
    const newPlots = globalFarmData.plots.map(plot => {
      if (plot.crop && !plot.isReady) {
        const crop = cropTypes.find(c => c.id === plot.crop);
        if (crop) {
          const newPetBonus = newPetHelp ? Math.floor(crop.yieldBase * 0.2) : 0;
          return {
            ...plot,
            yield: crop.yieldBase + newPetBonus,
            petBonus: newPetBonus
          };
        }
      }
      return plot;
    });
    
    updateFarmData({ plots: newPlots });
  };

  // Subscribe to changes
  useState(() => {
    const listener = () => forceUpdate({});
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  });

  return {
    farmData: globalFarmData,
    cropTypes,
    updateFarmData,
    plantCrop,
    harvestCrop,
    getPlotProgress,
    updatePlotReadiness,
    togglePetHelp
  };
};
