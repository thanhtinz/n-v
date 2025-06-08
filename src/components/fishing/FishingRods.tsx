
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Anchor, Gem, Star, TrendingUp } from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';

const FishingRods = () => {
  const { fishingState, rodData, upgradeRod } = useFishingData();

  const currentRod = rodData.find(r => r.id === fishingState.currentRod);
  const nextRod = rodData.find(r => r.id === fishingState.currentRod + 1);

  return (
    <div className="space-y-4">
      {/* Current Rod */}
      <Card className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100">
        <h3 className="font-bold mb-3 text-yellow-800">Cần Câu Hiện Tại</h3>
        {currentRod && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Anchor className="w-16 h-16 mx-auto mb-2 text-yellow-600" />
              <div className="font-bold text-lg">{currentRod.name}</div>
              <Badge className="bg-yellow-500">Cấp {currentRod.level}</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>May Mắn:</span>
                <span className="text-green-600">+{currentRod.luckBonus}</span>
              </div>
              <div className="flex justify-between">
                <span>Tỷ Lệ Cá Hiếm:</span>
                <span className="text-blue-600">+{currentRod.rareFishRate}%</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-muted-foreground">Ngọc Trai</div>
              <div className="text-2xl font-bold text-pink-600">{fishingState.pearls}</div>
            </div>
          </div>
        )}
      </Card>

      {/* Upgrade Section */}
      {nextRod ? (
        <Card className="p-4">
          <h3 className="font-bold mb-3">Nâng Cấp Cần Câu</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current vs Next Comparison */}
            <div>
              <h4 className="font-medium mb-3">So Sánh</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">May Mắn</span>
                  <div className="flex items-center gap-2">
                    <span>{currentRod?.luckBonus}</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-bold">{nextRod.luckBonus}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Tỷ Lệ Cá Hiếm</span>
                  <div className="flex items-center gap-2">
                    <span>{currentRod?.rareFishRate}%</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-bold">{nextRod.rareFishRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade Cost */}
            <div>
              <h4 className="font-medium mb-3">Chi Phí Nâng Cấp</h4>
              <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
                <Gem className="w-12 h-12 mx-auto mb-2 text-pink-500" />
                <div className="text-2xl font-bold text-pink-600 mb-2">
                  {nextRod.upgradeCost} Ngọc Trai
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Bạn có: {fishingState.pearls} Ngọc Trai
                </div>
                
                <Button
                  onClick={upgradeRod}
                  disabled={fishingState.pearls < nextRod.upgradeCost}
                  className="w-full"
                  size="lg"
                >
                  {fishingState.pearls < nextRod.upgradeCost ? 'Không Đủ Ngọc Trai' : 'Nâng Cấp'}
                </Button>
              </div>
            </div>
          </div>

          {/* Next Rod Preview */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <Anchor className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-blue-800">{nextRod.name}</div>
                <Badge variant="outline" className="text-blue-600">Cấp {nextRod.level}</Badge>
              </div>
            </div>
            <p className="text-sm text-blue-700">
              Cần câu mạnh mẽ hơn giúp bạn câu được nhiều cá hiếm và có may mắn cao hơn.
            </p>
          </div>
        </Card>
      ) : (
        <Card className="p-4 bg-purple-50">
          <div className="text-center">
            <Star className="w-16 h-16 mx-auto mb-3 text-purple-500" />
            <h3 className="font-bold text-purple-800 mb-2">Cần Câu Tối Đa!</h3>
            <p className="text-purple-700">
              Bạn đã có cần câu mạnh nhất. Hãy sử dụng nó để câu những con cá huyền thoại!
            </p>
          </div>
        </Card>
      )}

      {/* All Rods List */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Tất Cả Cần Câu</h3>
        <div className="space-y-3">
          {rodData.map(rod => (
            <div 
              key={rod.id}
              className={`p-3 border rounded-lg ${
                rod.id === fishingState.currentRod 
                  ? 'border-yellow-500 bg-yellow-50' 
                  : rod.id < fishingState.currentRod 
                    ? 'border-gray-300 bg-gray-50' 
                    : 'border-blue-300 bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Anchor className={`w-6 h-6 ${
                    rod.id === fishingState.currentRod 
                      ? 'text-yellow-600' 
                      : rod.id < fishingState.currentRod 
                        ? 'text-gray-400' 
                        : 'text-blue-600'
                  }`} />
                  <div>
                    <div className="font-medium">{rod.name}</div>
                    <div className="text-sm text-muted-foreground">Cấp {rod.level}</div>
                  </div>
                </div>
                
                <div className="text-right text-sm">
                  <div>May mắn: +{rod.luckBonus}</div>
                  <div>Cá hiếm: +{rod.rareFishRate}%</div>
                </div>

                <div>
                  {rod.id === fishingState.currentRod && (
                    <Badge className="bg-yellow-500">Đang Dùng</Badge>
                  )}
                  {rod.id < fishingState.currentRod && (
                    <Badge variant="outline" className="text-gray-500">Đã Mở</Badge>
                  )}
                  {rod.id > fishingState.currentRod && (
                    <Badge variant="outline" className="text-blue-500">
                      {rod.upgradeCost} Ngọc Trai
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-green-50">
        <h3 className="font-bold mb-2 text-green-800">Mẹo Nâng Cấp</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Cần câu tốt hơn giúp câu được cá hiếm dễ dàng hơn</li>
          <li>• Ngọc trai kiếm được từ Trại Ngọc Trai và bán cá</li>
          <li>• Nâng cấp từng bước để tối ưu chi phí</li>
          <li>• Cần câu cao cấp cần thiết cho các đảo khó</li>
        </ul>
      </Card>
    </div>
  );
};

export default FishingRods;
