
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Fish, CheckCircle } from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';

const FishingLibrary = () => {
  const { fishingState, fishData } = useFishingData();

  const achievements = [
    {
      id: 1,
      title: 'Ngư Dân Mới',
      description: 'Câu được 10 con cá',
      requirement: 10,
      current: fishingState.inventory.length + fishingState.fishTank.length,
      reward: '100 Xu Cá',
      completed: (fishingState.inventory.length + fishingState.fishTank.length) >= 10
    },
    {
      id: 2,
      title: 'Thợ Câu Cá',
      description: 'Câu được 50 con cá',
      requirement: 50,
      current: fishingState.inventory.length + fishingState.fishTank.length,
      reward: '500 Xu Cá + 5 Ngọc Trai',
      completed: (fishingState.inventory.length + fishingState.fishTank.length) >= 50
    },
    {
      id: 3,
      title: 'Bậc Thầy Câu Cá',
      description: 'Câu được 100 con cá',
      requirement: 100,
      current: fishingState.inventory.length + fishingState.fishTank.length,
      reward: '1000 Xu Cá + 10 Ngọc Trai + Cần Câu Đặc Biệt',
      completed: (fishingState.inventory.length + fishingState.fishTank.length) >= 100
    },
    {
      id: 4,
      title: 'Nhà Sưu Tập',
      description: 'Câu được 5 loại cá khác nhau',
      requirement: 5,
      current: fishingState.achievedFish.length,
      reward: '200 Xu Cá',
      completed: fishingState.achievedFish.length >= 5
    },
    {
      id: 5,
      title: 'Chuyên Gia Sưu Tập',
      description: 'Câu được tất cả loại cá',
      requirement: fishData.length,
      current: fishingState.achievedFish.length,
      reward: '2000 Xu Cá + 20 Ngọc Trai + Danh Hiệu Đặc Biệt',
      completed: fishingState.achievedFish.length >= fishData.length
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-purple-500';
      case 'epic': return 'text-yellow-500';
      case 'rare': return 'text-blue-500';
      case 'uncommon': return 'text-green-500';
      default: return 'text-gray-500';
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
      {/* Achievements */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Thành Tích</h3>
        <div className="space-y-4">
          {achievements.map(achievement => (
            <div key={achievement.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {achievement.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Trophy className="w-5 h-5 text-gray-400" />
                  )}
                  <h4 className="font-bold">{achievement.title}</h4>
                </div>
                {achievement.completed && (
                  <Badge className="bg-green-500">Hoàn Thành</Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {achievement.description}
              </p>
              
              <div className="flex justify-between text-sm mb-2">
                <span>Tiến độ:</span>
                <span>{achievement.current}/{achievement.requirement}</span>
              </div>
              
              <Progress 
                value={(achievement.current / achievement.requirement) * 100} 
                className="h-2 mb-2"
              />
              
              <div className="text-sm">
                <span className="text-muted-foreground">Phần thưởng: </span>
                <span className="text-yellow-500">{achievement.reward}</span>
              </div>
              
              {achievement.completed && (
                <Button size="sm" className="mt-2">
                  Nhận Thưởng
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Fish Collection */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Bộ Sưu Tập Cá</h3>
        <div className="text-sm text-muted-foreground mb-4">
          Đã sưu tập: {fishingState.achievedFish.length}/{fishData.length}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fishData.map(fish => {
            const isCollected = fishingState.achievedFish.includes(fish.id);
            
            return (
              <div 
                key={fish.id} 
                className={`p-3 border rounded-lg text-center ${
                  isCollected ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                }`}
              >
                <Fish className={`w-8 h-8 mx-auto mb-2 ${
                  isCollected ? getRarityColor(fish.rarity) : 'text-gray-400'
                }`} />
                <div className={`font-medium text-sm ${
                  isCollected ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {isCollected ? fish.name : '???'}
                </div>
                {isCollected && (
                  <Badge variant="outline" className={`text-xs ${getRarityColor(fish.rarity)}`}>
                    {getRarityName(fish.rarity)}
                  </Badge>
                )}
                {isCollected && (
                  <div className="text-xs text-muted-foreground mt-1">
                    EXP: {fish.experience}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Thống Kê</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="text-2xl font-bold text-blue-500">{fishingState.playerLevel}</div>
            <div className="text-sm text-muted-foreground">Cấp Độ</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="text-2xl font-bold text-green-500">
              {fishingState.inventory.length + fishingState.fishTank.length}
            </div>
            <div className="text-sm text-muted-foreground">Tổng Cá Câu Được</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="text-2xl font-bold text-purple-500">
              {fishingState.achievedFish.length}
            </div>
            <div className="text-sm text-muted-foreground">Loại Cá Khác Nhau</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="text-2xl font-bold text-yellow-500">
              {fishingState.fishCoins}
            </div>
            <div className="text-sm text-muted-foreground">Xu Cá</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FishingLibrary;
