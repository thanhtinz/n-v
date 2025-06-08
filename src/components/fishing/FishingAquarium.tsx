
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fish, Coins, Star } from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';

const FishingAquarium = () => {
  const { fishingState, sellFish, moveFishToTank } = useFishingData();

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
      <Card className="p-4">
        <h3 className="font-bold mb-3">Kho Cá Của Bạn</h3>
        <div className="text-sm text-muted-foreground mb-4">
          Tổng số cá: {fishingState.inventory.length}
        </div>

        {fishingState.inventory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Fish className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p>Chưa có cá nào trong kho</p>
            <p className="text-sm">Hãy ra khơi câu cá!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fishingState.inventory.map((fish, index) => (
              <Card key={index} className={`p-4 border-2 ${getRarityColor(fish.rarity)}`}>
                <div className="text-center mb-3">
                  <Fish className={`w-12 h-12 mx-auto mb-2 ${getRarityColor(fish.rarity)}`} />
                  <h4 className="font-bold">{fish.name}</h4>
                  <Badge variant="outline" className={getRarityColor(fish.rarity)}>
                    {getRarityName(fish.rarity)}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Giá bán:</span>
                    <span className="text-yellow-500">{fish.sellPrice} Xu</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kinh nghiệm:</span>
                    <span className="text-blue-500">{fish.experience} EXP</span>
                  </div>
                  {Object.entries(fish.statBonus).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="capitalize">
                        {stat === 'attack' ? 'Tấn Công' :
                         stat === 'defense' ? 'Phòng Thủ' :
                         stat === 'hp' ? 'Máu' :
                         stat === 'speed' ? 'Tốc Độ' : stat}:
                      </span>
                      <span className="text-green-500">+{value}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sellFish(fish.id)}
                    className="text-yellow-600"
                  >
                    <Coins className="w-4 h-4 mr-1" />
                    Bán
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => moveFishToTank(fish.id)}
                    className="text-green-600"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Vào Bể
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Thao Tác Nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            onClick={() => {
              // Sell all common fish
              fishingState.inventory
                .filter(fish => fish.rarity === 'common')
                .forEach(fish => sellFish(fish.id));
            }}
            disabled={!fishingState.inventory.some(f => f.rarity === 'common')}
          >
            Bán Cá Thường
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Move all rare+ fish to tank
              fishingState.inventory
                .filter(fish => ['rare', 'epic', 'legendary'].includes(fish.rarity))
                .forEach(fish => moveFishToTank(fish.id));
            }}
            disabled={!fishingState.inventory.some(f => ['rare', 'epic', 'legendary'].includes(f.rarity))}
          >
            Cá Hiếm Vào Bể
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Sell all fish
              fishingState.inventory.forEach(fish => sellFish(fish.id));
            }}
            disabled={fishingState.inventory.length === 0}
          >
            Bán Tất Cả
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Move all fish to tank
              fishingState.inventory.forEach(fish => moveFishToTank(fish.id));
            }}
            disabled={fishingState.inventory.length === 0}
          >
            Tất Cả Vào Bể
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FishingAquarium;
