
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Fish, 
  Star, 
  Trophy, 
  Coins,
  Gem,
  ArrowLeft,
  Map,
  BookOpen,
  ShoppingCart,
  Anchor,
  Library
} from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';
import FishingOcean from './fishing/FishingOcean';
import FishingAquarium from './fishing/FishingAquarium';
import FishingLibrary from './fishing/FishingLibrary';
import FishingTank from './fishing/FishingTank';
import FishingShop from './fishing/FishingShop';
import FishingRods from './fishing/FishingRods';
import PearlCamp from './fishing/PearlCamp';

interface FishingSystemProps {
  onBack: () => void;
}

const FishingSystem = ({ onBack }: FishingSystemProps) => {
  const { fishingState, islandData } = useFishingData();
  const [currentView, setCurrentView] = useState('overview');

  const currentIsland = islandData.find(i => i.id === fishingState.currentIsland);

  const fishingFeatures = [
    {
      id: 'ocean',
      title: 'Ra Khơi Câu Cá',
      description: 'Di chuyển thuyền và câu cá',
      icon: Fish,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'aquarium',
      title: 'Thủy Cung',
      description: 'Quản lý cá đã câu được',
      icon: Library,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 'library',
      title: 'Thư Viện',
      description: 'Thành tích và phần thưởng',
      icon: BookOpen,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'tank',
      title: 'Bể Cá',
      description: 'Cá tăng chỉ số cho tướng',
      icon: Star,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'shop',
      title: 'Cửa Hàng',
      description: 'Mua mồi câu và vật phẩm',
      icon: ShoppingCart,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: 'rods',
      title: 'Cần Câu',
      description: 'Nâng cấp cần câu',
      icon: Anchor,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'pearl',
      title: 'Trại Ngọc Trai',
      description: 'Tranh đấu mỏ khoáng sản',
      icon: Gem,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    }
  ];

  if (currentView === 'overview') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay Lại
          </Button>
          <h2 className="text-xl font-bold text-cultivator-gold">Hệ Thống Câu Cá</h2>
        </div>

        {/* Player Stats */}
        <Card className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Cấp Độ</div>
              <div className="text-lg font-bold">{fishingState.playerLevel}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Xu Cá</div>
              <div className="text-lg font-bold text-yellow-500">{fishingState.fishCoins}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Ngọc Trai</div>
              <div className="text-lg font-bold text-pink-500">{fishingState.pearls}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Đảo Hiện Tại</div>
              <div className="text-lg font-bold text-blue-500">{currentIsland?.name}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kinh Nghiệm</span>
              <span>{fishingState.experience}/{fishingState.maxExperience}</span>
            </div>
            <Progress 
              value={(fishingState.experience / fishingState.maxExperience) * 100} 
              className="h-2"
            />
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fishingFeatures.map((feature) => (
            <Card 
              key={feature.id} 
              className={`p-4 cursor-pointer hover:scale-105 transition-transform ${feature.bgColor} border-2`}
              onClick={() => setCurrentView(feature.id)}
            >
              <div className="text-center">
                <feature.icon className={`w-12 h-12 mx-auto mb-3 ${feature.color}`} />
                <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Thống Kê Nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">{fishingState.inventory.length}</div>
              <div className="text-xs text-muted-foreground">Cá Trong Kho</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{fishingState.fishTank.length}</div>
              <div className="text-xs text-muted-foreground">Cá Trong Bể</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">{fishingState.achievedFish.length}</div>
              <div className="text-xs text-muted-foreground">Loại Cá Đã Câu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{fishingState.dailyFishingCount}</div>
              <div className="text-xs text-muted-foreground">Lần Câu Hôm Nay</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentView('overview')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại Tổng Quan
        </Button>
        <h2 className="text-xl font-bold text-cultivator-gold">
          {fishingFeatures.find(f => f.id === currentView)?.title}
        </h2>
      </div>

      {currentView === 'ocean' && <FishingOcean />}
      {currentView === 'aquarium' && <FishingAquarium />}
      {currentView === 'library' && <FishingLibrary />}
      {currentView === 'tank' && <FishingTank />}
      {currentView === 'shop' && <FishingShop />}
      {currentView === 'rods' && <FishingRods />}
      {currentView === 'pearl' && <PearlCamp />}
    </div>
  );
};

export default FishingSystem;
