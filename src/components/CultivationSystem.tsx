
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Gem, Clock, TrendingUp } from 'lucide-react';

interface CultivationData {
  currentRealm: string;
  realmLevel: number;
  experience: number;
  maxExperience: number;
  spiritStones: number;
  cultivationSpeed: number;
  isAutoTraining: boolean;
}

const CultivationSystem = () => {
  const [cultivation, setCultivation] = useState<CultivationData>({
    currentRealm: 'Phàm Nhân',
    realmLevel: 1,
    experience: 0,
    maxExperience: 100,
    spiritStones: 50,
    cultivationSpeed: 1,
    isAutoTraining: false
  });

  const realms = [
    'Phàm Nhân', 'Luyện Khí', 'Trúc Cơ', 'Kim Đan', 
    'Nguyên Anh', 'Hóa Thần', 'Độ Kiếp', 'Phi Thăng'
  ];

  const [offlineRewards, setOfflineRewards] = useState({
    experience: 0,
    spiritStones: 0,
    timeAway: 0
  });

  useEffect(() => {
    // Simulate offline progress
    const lastPlayed = localStorage.getItem('lastPlayed');
    if (lastPlayed) {
      const timeAway = Math.floor((Date.now() - parseInt(lastPlayed)) / 1000 / 60); // minutes
      if (timeAway > 5) {
        const offlineExp = Math.floor(timeAway * cultivation.cultivationSpeed * 2);
        const offlineStones = Math.floor(timeAway * 0.5);
        setOfflineRewards({
          experience: offlineExp,
          spiritStones: offlineStones,
          timeAway
        });
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (cultivation.isAutoTraining) {
      interval = setInterval(() => {
        setCultivation(prev => {
          const newExp = prev.experience + prev.cultivationSpeed;
          
          if (newExp >= prev.maxExperience) {
            // Level up or breakthrough
            const currentRealmIndex = realms.indexOf(prev.currentRealm);
            if (prev.realmLevel < 9) {
              return {
                ...prev,
                realmLevel: prev.realmLevel + 1,
                experience: newExp - prev.maxExperience,
                maxExperience: Math.floor(prev.maxExperience * 1.2)
              };
            } else if (currentRealmIndex < realms.length - 1) {
              return {
                ...prev,
                currentRealm: realms[currentRealmIndex + 1],
                realmLevel: 1,
                experience: newExp - prev.maxExperience,
                maxExperience: Math.floor(prev.maxExperience * 1.5)
              };
            }
          }
          
          return { ...prev, experience: newExp };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [cultivation.isAutoTraining, cultivation.cultivationSpeed, realms]);

  const toggleAutoTraining = () => {
    setCultivation(prev => ({
      ...prev,
      isAutoTraining: !prev.isAutoTraining
    }));
  };

  const manualCultivate = () => {
    if (cultivation.spiritStones >= 1) {
      setCultivation(prev => ({
        ...prev,
        experience: prev.experience + 10,
        spiritStones: prev.spiritStones - 1
      }));
    }
  };

  const claimOfflineRewards = () => {
    setCultivation(prev => ({
      ...prev,
      experience: prev.experience + offlineRewards.experience,
      spiritStones: prev.spiritStones + offlineRewards.spiritStones
    }));
    setOfflineRewards({ experience: 0, spiritStones: 0, timeAway: 0 });
  };

  const progressPercentage = (cultivation.experience / cultivation.maxExperience) * 100;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Offline Rewards Modal */}
      {offlineRewards.timeAway > 0 && (
        <Card className="p-3 sm:p-4 border-cultivator-gold/50 bg-gradient-gold/10">
          <div className="text-center space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-cultivator-gold">Tu Luyện Ngoại Tuyến</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Bạn đã tu luyện {offlineRewards.timeAway} phút ngoại tuyến
            </p>
            <div className="flex justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>+{offlineRewards.experience} EXP</span>
              </div>
              <div className="flex items-center gap-1">
                <Gem className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span>+{offlineRewards.spiritStones} Linh Thạch</span>
              </div>
            </div>
            <Button onClick={claimOfflineRewards} className="mobile-btn gradient-gold text-black w-full sm:w-auto">
              Nhận Thưởng
            </Button>
          </div>
        </Card>
      )}

      {/* Main Cultivation Panel */}
      <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="space-y-3 sm:space-y-4">
          {/* Realm Display */}
          <div className="text-center space-y-2">
            <Badge variant="outline" className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg border-cultivator-gold text-cultivator-gold">
              {cultivation.currentRealm} • Tầng {cultivation.realmLevel}
            </Badge>
          </div>

          {/* Experience Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Tu Vi Tiến Độ</span>
              <span>{cultivation.experience}/{cultivation.maxExperience}</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 sm:h-3 bg-muted border border-border/50"
            />
          </div>

          {/* Resources */}
          <div className="mobile-grid-2 sm:grid sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
              <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-spirit-jade" />
              <span className="font-medium text-sm sm:text-base">{cultivation.spiritStones}</span>
              <span className="text-xs text-muted-foreground">Linh Thạch</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cultivator-gold" />
              <span className="font-medium text-sm sm:text-base">{cultivation.cultivationSpeed}/s</span>
              <span className="text-xs text-muted-foreground">Tốc Độ</span>
            </div>
          </div>

          {/* Cultivation Controls */}
          <div className="mobile-grid-2 sm:grid sm:grid-cols-2 gap-2 sm:gap-3">
            <Button
              onClick={toggleAutoTraining}
              variant={cultivation.isAutoTraining ? "destructive" : "default"}
              className="mobile-btn cultivate-anim w-full"
            >
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">
                {cultivation.isAutoTraining ? 'Dừng TL' : 'Tự Động TL'}
              </span>
            </Button>
            <Button
              onClick={manualCultivate}
              disabled={cultivation.spiritStones < 1}
              className="mobile-btn gradient-jade text-black w-full"
            >
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Tu Luyện (1LS)</span>
            </Button>
          </div>

          {/* Cultivation Status */}
          {cultivation.isAutoTraining && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Đang tu luyện...
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CultivationSystem;
