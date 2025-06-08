
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gem, Sword, Shield, Clock, Trophy } from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';

const PearlCamp = () => {
  const { fishingState, updateFishingState } = useFishingData();
  
  const [selectedMine, setSelectedMine] = useState<number | null>(null);

  // Mock mine data
  const mines = [
    { id: 1, type: 'large', owner: null, harvestTime: 4, pearlReward: 50, isProtected: false, protectionEndTime: 0 },
    { id: 2, type: 'medium', owner: 'Player123', harvestTime: 4, pearlReward: 30, isProtected: true, protectionEndTime: Date.now() + 3600000 },
    { id: 3, type: 'small', owner: null, harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 },
    { id: 4, type: 'small', owner: 'Player456', harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 },
    { id: 5, type: 'small', owner: null, harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 },
    { id: 6, type: 'small', owner: null, harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 },
    { id: 7, type: 'small', owner: null, harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 },
    { id: 8, type: 'small', owner: null, harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 },
    { id: 9, type: 'small', owner: null, harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 },
    { id: 10, type: 'small', owner: null, harvestTime: 4, pearlReward: 15, isProtected: false, protectionEndTime: 0 }
  ];

  const getMineIcon = (type: string) => {
    switch (type) {
      case 'large': return <Gem className="w-8 h-8 text-purple-500" />;
      case 'medium': return <Gem className="w-6 h-6 text-blue-500" />;
      default: return <Gem className="w-4 h-4 text-green-500" />;
    }
  };

  const getMineColor = (type: string) => {
    switch (type) {
      case 'large': return 'border-purple-500 bg-purple-50';
      case 'medium': return 'border-blue-500 bg-blue-50';
      default: return 'border-green-500 bg-green-50';
    }
  };

  const attackMine = (mineId: number) => {
    const mine = mines.find(m => m.id === mineId);
    if (!mine || mine.isProtected || fishingState.dailyRaidCount >= 5) return;

    // Simulate battle
    const winChance = 0.7; // 70% win chance
    const isWin = Math.random() < winChance;

    if (isWin) {
      updateFishingState({
        currentMine: mineId,
        mineStartTime: Date.now(),
        dailyRaidCount: fishingState.dailyRaidCount + 1
      });
    } else {
      updateFishingState({
        dailyRaidCount: fishingState.dailyRaidCount + 1
      });
    }
  };

  const occupyMine = (mineId: number) => {
    const mine = mines.find(m => m.id === mineId);
    if (!mine || mine.owner) return;

    updateFishingState({
      currentMine: mineId,
      mineStartTime: Date.now()
    });
  };

  return (
    <div className="space-y-4">
      {/* Player Status */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Trạng Thái Hiện Tại</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-pink-50 rounded border">
            <Gem className="w-8 h-8 mx-auto mb-2 text-pink-500" />
            <div className="text-2xl font-bold text-pink-600">{fishingState.pearls}</div>
            <div className="text-sm text-muted-foreground">Ngọc Trai</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded border">
            <Sword className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold text-red-600">{5 - fishingState.dailyRaidCount}</div>
            <div className="text-sm text-muted-foreground">Lượt Cướp Còn Lại</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded border">
            <Shield className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">{3 - fishingState.dailyRaidedCount}</div>
            <div className="text-sm text-muted-foreground">Lần Bị Cướp Còn Lại</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded border">
            <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">
              {fishingState.currentMine ? '4h' : '0h'}
            </div>
            <div className="text-sm text-muted-foreground">Thời Gian Khai Thác</div>
          </div>
        </div>
      </Card>

      {/* Current Mine */}
      {fishingState.currentMine && (
        <Card className="p-4 bg-yellow-50">
          <h3 className="font-bold mb-3 text-yellow-800">Mỏ Đang Khai Thác</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getMineIcon(mines.find(m => m.id === fishingState.currentMine)?.type || 'small')}
              <div>
                <div className="font-medium">
                  Mỏ #{fishingState.currentMine} - 
                  {mines.find(m => m.id === fishingState.currentMine)?.type === 'large' ? ' Đại' :
                   mines.find(m => m.id === fishingState.currentMine)?.type === 'medium' ? ' Trung' : ' Tiểu'}
                </div>
                <div className="text-sm text-muted-foreground">
                  Phần thưởng: {mines.find(m => m.id === fishingState.currentMine)?.pearlReward} Ngọc Trai
                </div>
              </div>
            </div>
            <Badge className="bg-yellow-500">Đang Khai Thác</Badge>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Tiến độ:</span>
              <span>2h 30m / 4h 00m</span>
            </div>
            <Progress value={62.5} className="h-3" />
          </div>
        </Card>
      )}

      {/* Mine Map */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Bản Đồ Khu Vực Khai Thác</h3>
        <p className="text-sm text-muted-foreground mb-4">
          1 Mỏ Đại, 1 Mỏ Trung, 8 Mỏ Tiểu - Chọn mỏ để khai thác hoặc tấn công
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {mines.map(mine => (
            <Card 
              key={mine.id}
              className={`p-3 cursor-pointer transition-all ${getMineColor(mine.type)} ${
                selectedMine === mine.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedMine(mine.id)}
            >
              <div className="text-center">
                {getMineIcon(mine.type)}
                <div className="font-medium text-sm mt-1">
                  Mỏ #{mine.id}
                </div>
                <Badge variant="outline" className="text-xs">
                  {mine.type === 'large' ? 'Đại' : mine.type === 'medium' ? 'Trung' : 'Tiểu'}
                </Badge>
                
                <div className="text-xs mt-2">
                  {mine.pearlReward} Ngọc Trai
                </div>

                {mine.owner && (
                  <Badge 
                    variant={mine.owner === 'You' ? 'default' : 'destructive'}
                    className="text-xs mt-1"
                  >
                    {mine.owner === 'You' ? 'Của Bạn' : 'Bị Chiếm'}
                  </Badge>
                )}

                {mine.isProtected && (
                  <Badge className="bg-blue-500 text-xs mt-1">
                    Bảo Vệ 1h
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Mine Actions */}
      {selectedMine && (
        <Card className="p-4">
          <h3 className="font-bold mb-3">Hành Động</h3>
          {(() => {
            const mine = mines.find(m => m.id === selectedMine);
            if (!mine) return null;

            if (!mine.owner) {
              return (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mỏ này đang trống. Bạn có thể chiếm lấy để khai thác.
                  </p>
                  <Button 
                    onClick={() => occupyMine(selectedMine)}
                    disabled={!!fishingState.currentMine}
                    className="w-full"
                  >
                    {fishingState.currentMine ? 'Đã Có Mỏ Khác' : 'Chiếm Mỏ'}
                  </Button>
                </div>
              );
            } else if (mine.owner === 'You') {
              return (
                <div>
                  <p className="text-sm text-green-600 mb-3">
                    Đây là mỏ của bạn. Đang khai thác...
                  </p>
                  <Button disabled className="w-full">
                    Mỏ Của Bạn
                  </Button>
                </div>
              );
            } else {
              return (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mỏ này thuộc về {mine.owner}. Bạn có thể tấn công để chiếm lấy.
                  </p>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Cơ hội thắng:</span>
                      <span className="text-green-600">70%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Lượt cướp còn lại:</span>
                      <span className="text-blue-600">{5 - fishingState.dailyRaidCount}/5</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => attackMine(selectedMine)}
                    disabled={mine.isProtected || fishingState.dailyRaidCount >= 5 || !!fishingState.currentMine}
                    variant="destructive"
                    className="w-full"
                  >
                    {mine.isProtected ? 'Đang Bảo Vệ' :
                     fishingState.dailyRaidCount >= 5 ? 'Hết Lượt Cướp' :
                     fishingState.currentMine ? 'Đã Có Mỏ Khác' : 'Tấn Công'}
                  </Button>
                </div>
              );
            }
          })()}
        </Card>
      )}

      {/* Rules */}
      <Card className="p-4 bg-blue-50">
        <h3 className="font-bold mb-2 text-blue-800">Luật Chơi</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Mỗi người chỉ khai thác được 1 mỏ tại 1 thời điểm</li>
          <li>• Thời gian khai thác: 4 giờ</li>
          <li>• Sau khi chiếm mỏ, được bảo vệ 1 giờ</li>
          <li>• Tối đa 5 lượt cướp mỏ/ngày</li>
          <li>• Tối đa bị cướp 3 lần/ngày</li>
          <li>• Mỏ Đại cho nhiều ngọc trai nhất</li>
        </ul>
      </Card>
    </div>
  );
};

export default PearlCamp;
