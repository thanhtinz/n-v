
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fish, Plus, Coins } from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';

const FishingTank = () => {
  const { fishingState, updateFishingState } = useFishingData();

  const maxTankSlots = 12; // Can be expanded with fish coins
  const usedSlots = fishingState.fishTank.length;
  const expandCost = (Math.floor(usedSlots / 4) + 1) * 100; // Cost increases every 4 slots

  const getTotalStats = () => {
    return fishingState.fishTank.reduce((total, fish) => {
      Object.entries(fish.statBonus).forEach(([stat, value]) => {
        total[stat] = (total[stat] || 0) + value;
      });
      return total;
    }, {} as Record<string, number>);
  };

  const totalStats = getTotalStats();

  const expandTank = () => {
    if (fishingState.fishCoins < expandCost) return;
    
    updateFishingState({
      fishCoins: fishingState.fishCoins - expandCost
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-purple-500 border-purple-500';
      case 'epic': return 'text-yellow-500 border-yellow-500';
      case 'rare': return 'text-blue-500 border-blue-500';
      case 'uncommon': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getRarityName = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'Huyền Thoại';
      case 'epic': return 'Sử Thi';
      case 'rare': return 'Hiếm';
      case 'uncommon': return 'Không Phổ Biến';
      default: return 'Phổ Biến';
    }
  };

  return (
    <div className="space-y-4">
      {/* Total Stats */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Chỉ Số Tăng Cường</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cá trong bể sẽ tăng chỉ số cho tất cả tướng của bạn
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-red-50 rounded border">
            <div className="text-2xl font-bold text-red-500">
              +{totalStats.attack || 0}
            </div>
            <div className="text-sm text-muted-foreground">Tấn Công</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded border">
            <div className="text-2xl font-bold text-blue-500">
              +{totalStats.defense || 0}
            </div>
            <div className="text-sm text-muted-foreground">Phòng Thủ</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded border">
            <div className="text-2xl font-bold text-green-500">
              +{totalStats.hp || 0}
            </div>
            <div className="text-sm text-muted-foreground">Máu</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded border">
            <div className="text-2xl font-bold text-yellow-500">
              +{totalStats.speed || 0}
            </div>
            <div className="text-sm text-muted-foreground">Tốc Độ</div>
          </div>
        </div>
      </Card>

      {/* Fish Tank */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Bể Cá ({usedSlots}/{maxTankSlots})</h3>
          <Button
            size="sm"
            onClick={expandTank}
            disabled={fishingState.fishCoins < expandCost}
            className="text-xs"
          >
            <Plus className="w-4 h-4 mr-1" />
            Mở Rộng ({expandCost} Xu)
          </Button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Fish in tank */}
          {fishingState.fishTank.map((fish, index) => (
            <div 
              key={index} 
              className={`aspect-square p-2 border-2 rounded-lg ${getRarityColor(fish.rarity)}`}
            >
              <div className="text-center h-full flex flex-col justify-center">
                <Fish className={`w-8 h-8 mx-auto mb-1 ${getRarityColor(fish.rarity)}`} />
                <div className="text-xs font-medium">{fish.name}</div>
                <Badge variant="outline" className={`text-xs ${getRarityColor(fish.rarity)}`}>
                  {getRarityName(fish.rarity)}
                </Badge>
              </div>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: maxTankSlots - usedSlots }, (_, index) => (
            <div 
              key={`empty-${index}`}
              className="aspect-square p-2 border-2 border-dashed border-gray-300 rounded-lg"
            >
              <div className="text-center h-full flex flex-col justify-center text-gray-400">
                <Plus className="w-8 h-8 mx-auto mb-1" />
                <div className="text-xs">Trống</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Fish Details */}
      {fishingState.fishTank.length > 0 && (
        <Card className="p-4">
          <h3 className="font-bold mb-3">Chi Tiết Cá Trong Bể</h3>
          <div className="space-y-3">
            {fishingState.fishTank.map((fish, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-3">
                  <Fish className={`w-6 h-6 ${getRarityColor(fish.rarity)}`} />
                  <div>
                    <div className="font-medium">{fish.name}</div>
                    <Badge variant="outline" className={`text-xs ${getRarityColor(fish.rarity)}`}>
                      {getRarityName(fish.rarity)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-sm">
                  {Object.entries(fish.statBonus).map(([stat, value]) => (
                    <div key={stat} className="text-green-600">
                      {stat === 'attack' ? 'Tấn Công' :
                       stat === 'defense' ? 'Phòng Thủ' :
                       stat === 'hp' ? 'Máu' :
                       stat === 'speed' ? 'Tốc Độ' : stat}: +{value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card className="p-4 bg-blue-50">
        <h3 className="font-bold mb-2 text-blue-800">Mẹo Sử Dụng Bể Cá</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Cá hiếm cho bonus chỉ số cao hơn</li>
          <li>• Mở rộng bể để chứa thêm nhiều cá</li>
          <li>• Cá trong bể tăng chỉ số vĩnh viễn cho tướng</li>
          <li>• Kết hợp nhiều loại cá để tối ưu chỉ số</li>
        </ul>
      </Card>
    </div>
  );
};

export default FishingTank;
