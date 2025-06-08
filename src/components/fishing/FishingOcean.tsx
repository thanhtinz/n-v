
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Fish, Anchor, Gift, Waves } from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';

const FishingOcean = () => {
  const { 
    fishingState, 
    fishData, 
    rodData, 
    baitData, 
    islandData,
    addFish,
    updateFishingState 
  } = useFishingData();

  const [boatPosition, setBoatPosition] = useState({ x: 50, y: 50 });
  const [fishingProgress, setFishingProgress] = useState(0);
  const [isFishing, setIsFishing] = useState(false);
  const [treasureChests, setTreasureChests] = useState([
    { id: 1, x: 20, y: 30, collected: false },
    { id: 2, x: 70, y: 60, collected: false },
    { id: 3, x: 40, y: 80, collected: false }
  ]);

  const currentRod = rodData.find(r => r.id === fishingState.currentRod);
  const currentBait = baitData.find(b => b.id === fishingState.currentBait);
  const currentIsland = islandData.find(i => i.id === fishingState.currentIsland);

  const moveBoat = (direction: 'up' | 'down' | 'left' | 'right') => {
    setBoatPosition(prev => {
      const step = 10;
      switch (direction) {
        case 'up': return { ...prev, y: Math.max(0, prev.y - step) };
        case 'down': return { ...prev, y: Math.min(90, prev.y + step) };
        case 'left': return { ...prev, x: Math.max(0, prev.x - step) };
        case 'right': return { ...prev, x: Math.min(90, prev.x + step) };
        default: return prev;
      }
    });
  };

  const startFishing = () => {
    if (isFishing) return;
    
    setIsFishing(true);
    setFishingProgress(0);

    const interval = setInterval(() => {
      setFishingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFishing(false);
          
          // Calculate success rate
          let baseRate = 30;
          if (currentBait) baseRate += currentBait.successRate;
          if (currentRod) baseRate += currentRod.luckBonus;
          
          const success = Math.random() * 100 < baseRate;
          
          if (success) {
            // Determine what was caught
            const random = Math.random() * 100;
            let rareFishChance = currentRod?.rareFishRate || 5;
            if (currentBait) rareFishChance += currentBait.rareFishBonus;
            
            if (random < 10) {
              // Caught trash
              console.log('Câu được rác!');
            } else {
              // Caught fish
              const availableFish = fishData.filter(f => 
                currentIsland?.fishTypes.includes(f.id)
              );
              
              let caughtFish;
              if (random < rareFishChance) {
                // Rare fish
                caughtFish = availableFish.filter(f => 
                  f.rarity === 'rare' || f.rarity === 'epic' || f.rarity === 'legendary'
                ).sort(() => Math.random() - 0.5)[0];
              } else {
                // Common fish
                caughtFish = availableFish.filter(f => 
                  f.rarity === 'common' || f.rarity === 'uncommon'
                ).sort(() => Math.random() - 0.5)[0];
              }
              
              if (caughtFish) {
                addFish(caughtFish.id);
                console.log(`Câu được ${caughtFish.name}!`);
              }
            }
          } else {
            console.log('Không câu được gì...');
          }
          
          // Use bait
          if (currentBait && fishingState.baitRemaining > 0) {
            updateFishingState({
              baitRemaining: fishingState.baitRemaining - 1,
              dailyFishingCount: fishingState.dailyFishingCount + 1
            });
          }
          
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  };

  const collectTreasure = (chestId: number) => {
    const chest = treasureChests.find(c => c.id === chestId);
    if (!chest || chest.collected) return;

    const distance = Math.sqrt(
      Math.pow(boatPosition.x - chest.x, 2) + 
      Math.pow(boatPosition.y - chest.y, 2)
    );

    if (distance < 15) {
      setTreasureChests(prev => 
        prev.map(c => c.id === chestId ? { ...c, collected: true } : c)
      );
      
      // Random rewards
      const rewards = [
        { type: 'fishCoins', amount: Math.floor(Math.random() * 100) + 50 },
        { type: 'pearls', amount: Math.floor(Math.random() * 3) + 1 }
      ];
      
      updateFishingState({
        fishCoins: fishingState.fishCoins + (rewards[0]?.amount || 0),
        pearls: fishingState.pearls + (rewards[1]?.amount || 0)
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Ocean Map */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Bản Đồ Đại Dương - {currentIsland?.name}</h3>
        
        <div className="relative w-full h-64 bg-gradient-to-b from-blue-200 to-blue-500 rounded-lg border overflow-hidden">
          {/* Waves decoration */}
          <div className="absolute inset-0 opacity-30">
            <Waves className="w-full h-full text-blue-300" />
          </div>
          
          {/* Treasure chests */}
          {treasureChests.map(chest => (
            !chest.collected && (
              <div
                key={chest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${chest.x}%`, top: `${chest.y}%` }}
                onClick={() => collectTreasure(chest.id)}
              >
                <Gift className="w-6 h-6 text-yellow-500 hover:scale-110 transition-transform" />
              </div>
            )
          ))}
          
          {/* Player boat */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${boatPosition.x}%`, top: `${boatPosition.y}%` }}
          >
            <Anchor className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        {/* Movement controls */}
        <div className="grid grid-cols-3 gap-2 mt-4 w-32 mx-auto">
          <div></div>
          <Button size="sm" onClick={() => moveBoat('up')}>↑</Button>
          <div></div>
          <Button size="sm" onClick={() => moveBoat('left')}>←</Button>
          <Button size="sm" onClick={() => moveBoat('down')}>↓</Button>
          <Button size="sm" onClick={() => moveBoat('right')}>→</Button>
        </div>
      </Card>

      {/* Current Equipment */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Trang Bị Hiện Tại</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded">
            <Anchor className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="font-medium">{currentRod?.name}</div>
            <div className="text-sm text-muted-foreground">May mắn: +{currentRod?.luckBonus}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <Fish className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="font-medium">
              {currentBait ? currentBait.name : 'Không có mồi'}
            </div>
            <div className="text-sm text-muted-foreground">
              Còn lại: {fishingState.baitRemaining}
            </div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="text-lg font-bold">{fishingState.dailyFishingCount}</div>
            <div className="text-sm text-muted-foreground">Lần câu hôm nay</div>
          </div>
        </div>
      </Card>

      {/* Fishing Action */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Câu Cá</h3>
        
        {isFishing && (
          <div className="mb-4">
            <p className="text-center mb-2">Đang câu cá...</p>
            <Progress value={fishingProgress} className="h-3" />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {currentIsland?.fishTypes.map(fishId => {
            const fish = fishData.find(f => f.id === fishId);
            if (!fish) return null;
            
            return (
              <div key={fishId} className="text-center p-3 bg-muted/50 rounded">
                <Fish className={`w-6 h-6 mx-auto mb-1 ${
                  fish.rarity === 'legendary' ? 'text-purple-500' :
                  fish.rarity === 'epic' ? 'text-yellow-500' :
                  fish.rarity === 'rare' ? 'text-blue-500' :
                  'text-gray-500'
                }`} />
                <div className="text-sm font-medium">{fish.name}</div>
                <Badge variant="outline" className="text-xs">
                  {fish.rarity === 'legendary' ? 'Huyền Thoại' :
                   fish.rarity === 'epic' ? 'Sử Thi' :
                   fish.rarity === 'rare' ? 'Hiếm' :
                   fish.rarity === 'uncommon' ? 'Không Phổ Biến' : 'Phổ Biến'}
                </Badge>
              </div>
            );
          })}
        </div>

        <Button 
          onClick={startFishing} 
          disabled={isFishing}
          className="w-full"
          size="lg"
        >
          {isFishing ? 'Đang Câu...' : 'Bắt Đầu Câu Cá'}
        </Button>
      </Card>
    </div>
  );
};

export default FishingOcean;
