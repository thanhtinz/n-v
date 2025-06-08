import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Star, 
  BookOpen, 
  Flame, 
  Wind, 
  Droplets, 
  Mountain,
  Target,
  Clock,
  Sparkles,
  Cloud,
  CloudLightning,
  Skull
} from 'lucide-react';

interface Technique {
  id: string;
  name: string;
  element: 'fire' | 'water' | 'earth' | 'wind' | 'lightning';
  level: number;
  maxLevel: number;
  description: string;
  cultivationTime: number; // in minutes
  isCultivating: boolean;
  startTime: Date | null;
}

interface Realm {
  name: string;
  level: number;
  maxLevel: number;
  progress: number;
  description: string;
  nextRealm?: string;
}

interface TribulationState {
  isActive: boolean;
  phase: 'preparing' | 'lightning' | 'success' | 'failure';
  progress: number;
  lightningCount: number;
  maxLightning: number;
}

const CultivationSystem = () => {
  const [activeTab, setActiveTab] = useState('realm');
  const [cultivationProgress, setCultivationProgress] = useState(0);
  const [isCultivating, setIsCultivating] = useState(false);
  const [cultivationStart, setCultivationStart] = useState<Date | null>(null);
  const [tribulation, setTribulation] = useState<TribulationState>({
    isActive: false,
    phase: 'preparing',
    progress: 0,
    lightningCount: 0,
    maxLightning: 9
  });

  const [currentRealm, setCurrentRealm] = useState<Realm>({
    name: 'Phàm Nhân',
    level: 1,
    maxLevel: 9,
    progress: 85, // Set high for testing tribulation
    description: 'Cảnh giới khởi đầu của con đường tu tiên',
    nextRealm: 'Luyện Khí'
  });

  const [techniques, setTechniques] = useState<Technique[]>([
    {
      id: '1',
      name: 'Cơ Bản Hỏa Cầu Thuật',
      element: 'fire',
      level: 1,
      maxLevel: 10,
      description: 'Phép thuật hỏa hệ cơ bản, tấn công đơn thể',
      cultivationTime: 30,
      isCultivating: false,
      startTime: null
    },
    {
      id: '2',
      name: 'Phong Nhẫn Thuật',
      element: 'wind',
      level: 0,
      maxLevel: 10,
      description: 'Phép thuật phong hệ, tăng tốc độ di chuyển',
      cultivationTime: 45,
      isCultivating: false,
      startTime: null
    },
    {
      id: '3',
      name: 'Thổ Cường Thuật',
      element: 'earth',
      level: 0,
      maxLevel: 10,
      description: 'Phép thuật thổ hệ, tăng phòng thủ',
      cultivationTime: 60,
      isCultivating: false,
      startTime: null
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Handle tribulation animation
      if (tribulation.isActive) {
        setTribulation(prev => {
          if (prev.phase === 'preparing') {
            return { ...prev, phase: 'lightning', progress: 0 };
          } else if (prev.phase === 'lightning') {
            const newProgress = prev.progress + 2;
            if (newProgress >= 100) {
              const newLightningCount = prev.lightningCount + 1;
              if (newLightningCount >= prev.maxLightning) {
                // Tribulation completed successfully
                setTimeout(() => {
                  setTribulation({
                    isActive: false,
                    phase: 'success',
                    progress: 0,
                    lightningCount: 0,
                    maxLightning: 9
                  });
                  // Advance to next realm
                  setCurrentRealm(prevRealm => ({
                    name: prevRealm.nextRealm || 'Luyện Khí',
                    level: 1,
                    maxLevel: 9,
                    progress: 0,
                    description: 'Bắt đầu hành trình tu luyện chân chính',
                    nextRealm: 'Trúc Cơ'
                  }));
                  alert('🎉 Độ kiếp thành công! Đột phá lên cảnh giới mới!');
                }, 1000);
                return { ...prev, phase: 'success', progress: 100 };
              } else {
                return { 
                  ...prev, 
                  progress: 0, 
                  lightningCount: newLightningCount 
                };
              }
            }
            return { ...prev, progress: newProgress };
          }
          return prev;
        });
      }

      if (isCultivating && cultivationStart) {
        const elapsed = Date.now() - cultivationStart.getTime();
        const progress = Math.min((elapsed / (60 * 60 * 1000)) * 100, 100); // 1 hour for full cultivation
        setCultivationProgress(progress);
        
        if (progress >= 100) {
          setIsCultivating(false);
          setCultivationStart(null);
          setCultivationProgress(0);
          // Update realm progress
          setCurrentRealm(prev => {
            const newProgress = Math.min(prev.progress + 10, 100);
            return { ...prev, progress: newProgress };
          });
          alert('Tu luyện hoàn thành! +10 tiến độ cảnh giới');
        }
      }

      // Update technique cultivation
      setTechniques(prev => prev.map(tech => {
        if (tech.isCultivating && tech.startTime) {
          const elapsed = Date.now() - tech.startTime.getTime();
          const techProgress = (elapsed / (tech.cultivationTime * 60 * 1000)) * 100;
          
          if (techProgress >= 100) {
            alert(`${tech.name} tu luyện hoàn thành!`);
            return {
              ...tech,
              level: Math.min(tech.level + 1, tech.maxLevel),
              isCultivating: false,
              startTime: null
            };
          }
        }
        return tech;
      }));
    }, 100); // Faster interval for smooth tribulation animation

    return () => clearInterval(interval);
  }, [isCultivating, cultivationStart, tribulation.isActive]);

  const startTribulation = () => {
    setTribulation({
      isActive: true,
      phase: 'preparing',
      progress: 0,
      lightningCount: 0,
      maxLightning: 9
    });
  };

  const canStartTribulation = () => {
    return currentRealm.progress >= 100 && currentRealm.level >= currentRealm.maxLevel;
  };

  const startCultivation = () => {
    setIsCultivating(true);
    setCultivationStart(new Date());
    setCultivationProgress(0);
  };

  const stopCultivation = () => {
    setIsCultivating(false);
    setCultivationStart(null);
    setCultivationProgress(0);
  };

  const startTechniqueCultivation = (techniqueId: string) => {
    setTechniques(prev => prev.map(tech => 
      tech.id === techniqueId 
        ? { ...tech, isCultivating: true, startTime: new Date() }
        : tech
    ));
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Flame className="w-4 h-4 text-red-400" />;
      case 'water': return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'earth': return <Mountain className="w-4 h-4 text-amber-600" />;
      case 'wind': return <Wind className="w-4 h-4 text-green-400" />;
      case 'lightning': return <Zap className="w-4 h-4 text-yellow-400" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getTechniqueProgress = (technique: Technique) => {
    if (!technique.isCultivating || !technique.startTime) return 0;
    const elapsed = Date.now() - technique.startTime.getTime();
    return Math.min((elapsed / (technique.cultivationTime * 60 * 1000)) * 100, 100);
  };

  const renderTribulationOverlay = () => {
    if (!tribulation.isActive) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <div className="text-2xl font-bold text-cultivator-gold mb-4">
            ⚡ ĐỘ KIẾP ⚡
          </div>
          
          {tribulation.phase === 'preparing' && (
            <div className="space-y-4">
              <div className="text-lg text-white">Thiên kiếp đang tụ tập...</div>
              <div className="relative">
                <Cloud className="w-24 h-24 mx-auto text-gray-600 animate-pulse" />
                <CloudLightning className="w-16 h-16 absolute top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-bounce" />
              </div>
            </div>
          )}

          {tribulation.phase === 'lightning' && (
            <div className="space-y-4">
              <div className="text-lg text-white">
                Sấm sét thứ {tribulation.lightningCount + 1}/{tribulation.maxLightning}
              </div>
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-b from-purple-900 to-black rounded-full flex items-center justify-center">
                  <Zap 
                    className="w-16 h-16 text-yellow-300 animate-ping" 
                    style={{
                      filter: `drop-shadow(0 0 20px #fbbf24) hue-rotate(${tribulation.progress * 3.6}deg)`,
                      transform: `scale(${1 + tribulation.progress / 100})`
                    }}
                  />
                </div>
                {/* Lightning effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 bg-yellow-300 animate-pulse"
                      style={{
                        height: `${20 + Math.random() * 40}px`,
                        left: `${20 + Math.random() * 60}%`,
                        top: `${10 + Math.random() * 60}%`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        boxShadow: '0 0 10px #fbbf24',
                        opacity: tribulation.progress / 100
                      }}
                    />
                  ))}
                </div>
              </div>
              <Progress value={tribulation.progress} className="h-3" />
              <div className="text-sm text-muted-foreground">
                Chịu đựng sức mạnh của thiên kiếp...
              </div>
            </div>
          )}

          {tribulation.phase === 'success' && (
            <div className="space-y-4">
              <div className="text-xl text-cultivator-gold animate-pulse">
                🎉 ĐỘ KIẾP THÀNH CÔNG! 🎉
              </div>
              <div className="text-lg text-spirit-jade">
                Đột phá lên cảnh giới mới!
              </div>
              <Sparkles className="w-24 h-24 mx-auto text-yellow-400 animate-spin" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {renderTribulationOverlay()}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3 sm:space-y-4">
        <Card className="p-1 sm:p-2 bg-card/50 backdrop-blur-sm border-border/50">
          <TabsList className="grid w-full grid-cols-3 bg-transparent gap-1">
            <TabsTrigger value="realm" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
              <Target className="w-4 h-4" />
              <span className="text-sm">Cảnh Giới</span>
            </TabsTrigger>
            <TabsTrigger value="techniques" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Thuật Pháp</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Tài Nguyên</span>
            </TabsTrigger>
          </TabsList>
        </Card>

        {/* Realm Cultivation */}
        <TabsContent value="realm">
          <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
            <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold mb-4">Tu Luyện Cảnh Giới</h2>
            
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-bold text-spirit-jade mb-2">{currentRealm.name}</h3>
                <div className="text-sm text-muted-foreground mb-3">{currentRealm.description}</div>
                <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                  Tầng {currentRealm.level}/{currentRealm.maxLevel}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến độ tu luyện</span>
                  <span>{Math.min(currentRealm.progress, 100)}%</span>
                </div>
                <Progress value={Math.min(currentRealm.progress, 100)} className="h-3" />
                
                {currentRealm.progress >= 100 && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-yellow-900/50 to-red-900/50 rounded-lg border border-yellow-600/50">
                    <div className="flex items-center gap-2 text-yellow-300 mb-2">
                      <CloudLightning className="w-5 h-5" />
                      <span className="font-semibold">Sẵn sàng độ kiếp!</span>
                    </div>
                    <div className="text-xs text-yellow-200 mb-3">
                      Cảnh giới đã đạt đỉnh, cần vượt qua thiên kiếp để đột phá
                    </div>
                    <Button 
                      onClick={startTribulation}
                      disabled={tribulation.isActive}
                      className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 text-white"
                    >
                      <Skull className="w-4 h-4 mr-2" />
                      Bắt Đầu Độ Kiếp
                    </Button>
                  </div>
                )}
              </div>

              {isCultivating ? (
                <div className="space-y-3">
                  <div className="text-center p-4 bg-gradient-cultivation rounded-lg animate-cultivate">
                    <div className="text-lg font-semibold text-black mb-2">Đang Tu Luyện...</div>
                    <div className="flex justify-between text-sm text-black mb-2">
                      <span>Tiến độ</span>
                      <span>{Math.round(cultivationProgress)}%</span>
                    </div>
                    <Progress value={cultivationProgress} className="h-2 mb-3" />
                    <div className="text-xs text-black/80">
                      Linh khí đang tụ tập, tâm trí phải tập trung tuyệt đối
                    </div>
                  </div>
                  <Button 
                    onClick={stopCultivation}
                    variant="destructive"
                    className="w-full"
                  >
                    Dừng Tu Luyện
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={startCultivation}
                  className="w-full bg-gradient-cultivation text-black hover:opacity-90"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Bắt Đầu Tu Luyện
                </Button>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Techniques */}
        <TabsContent value="techniques">
          <div className="space-y-3">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold mb-4">Thuật Pháp</h2>
              
              <div className="space-y-3">
                {techniques.map((technique) => (
                  <div key={technique.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getElementIcon(technique.element)}
                        <span className="font-medium text-sm">{technique.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Lv.{technique.level}/{technique.maxLevel}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground mb-3">{technique.description}</div>

                    {technique.isCultivating ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>Đang tu luyện... {technique.cultivationTime} phút</span>
                        </div>
                        <Progress value={getTechniqueProgress(technique)} className="h-2" />
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Thời gian: {technique.cultivationTime} phút
                        </div>
                        {technique.level < technique.maxLevel && (
                          <Button
                            size="sm"
                            onClick={() => startTechniqueCultivation(technique.id)}
                            className="text-xs"
                          >
                            Tu Luyện
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources">
          <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
            <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold mb-4">Tài Nguyên Tu Luyện</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-spirit-jade">1,250</div>
                <div className="text-xs text-muted-foreground">Linh Thạch</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-mystical-purple">850</div>
                <div className="text-xs text-muted-foreground">Linh Khí</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-cultivator-gold">25</div>
                <div className="text-xs text-muted-foreground">Linh Đan</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-green-400">120</div>
                <div className="text-xs text-muted-foreground">Kinh Nghiệm</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-400">8</div>
                <div className="text-xs text-muted-foreground">Tu Vi Đan</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-red-400">3</div>
                <div className="text-xs text-muted-foreground">Thiên Địa Bảo Vật</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted/20 rounded-lg">
              <div className="text-sm font-medium mb-2">Mẹo Tu Luyện:</div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Sử dụng Linh Đan để tăng tốc độ tu luyện</div>
                <div>• Tu Vi Đan giúp đột phá cảnh giới dễ dàng hơn</div>
                <div>• Thiên Địa Bảo Vật có thể mở khóa kỹ năng đặc biệt</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CultivationSystem;
