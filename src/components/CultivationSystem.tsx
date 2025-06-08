
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
  Sparkles
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
}

const CultivationSystem = () => {
  const [activeTab, setActiveTab] = useState('realm');
  const [cultivationProgress, setCultivationProgress] = useState(0);
  const [isCultivating, setIsCultivating] = useState(false);
  const [cultivationStart, setCultivationStart] = useState<Date | null>(null);

  const [currentRealm, setCurrentRealm] = useState<Realm>({
    name: 'Phàm Nhân',
    level: 1,
    maxLevel: 9,
    progress: 25,
    description: 'Cảnh giới khởi đầu của con đường tu tiên'
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
      if (isCultivating && cultivationStart) {
        const elapsed = Date.now() - cultivationStart.getTime();
        const progress = Math.min((elapsed / (60 * 60 * 1000)) * 100, 100); // 1 hour for full cultivation
        setCultivationProgress(progress);
        
        if (progress >= 100) {
          setIsCultivating(false);
          setCultivationStart(null);
          setCultivationProgress(0);
          // Update realm progress
          setCurrentRealm(prev => ({
            ...prev,
            progress: Math.min(prev.progress + 10, 100)
          }));
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
    }, 1000);

    return () => clearInterval(interval);
  }, [isCultivating, cultivationStart]);

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

  return (
    <div className="space-y-3 sm:space-y-4">
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
                  <span>{currentRealm.progress}%</span>
                </div>
                <Progress value={currentRealm.progress} className="h-3" />
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
