
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Home, 
  Sprout, 
  Hammer, 
  Star, 
  Clock,
  Coins,
  Package,
  TreePine,
  Flower2,
  Wheat
} from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  type: 'herb' | 'fruit' | 'grain';
  growthTime: number; // in minutes
  value: number;
  planted: Date | null;
  isReady: boolean;
}

interface HomeItem {
  id: string;
  name: string;
  type: 'furniture' | 'decoration' | 'facility';
  level: number;
  description: string;
  owned: boolean;
}

const HomeSystem = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'garden' | 'rooms' | 'craft'>('overview');
  
  const [garden] = useState<Plant[]>([
    {
      id: '1',
      name: 'Linh Thảo',
      type: 'herb',
      growthTime: 30,
      value: 50,
      planted: new Date(Date.now() - 25 * 60 * 1000),
      isReady: false
    },
    {
      id: '2',
      name: 'Thiên Linh Quả',
      type: 'fruit',
      growthTime: 60,
      value: 150,
      planted: new Date(Date.now() - 65 * 60 * 1000),
      isReady: true
    },
    {
      id: '3',
      name: 'Linh Lúa',
      type: 'grain',
      growthTime: 45,
      value: 80,
      planted: null,
      isReady: false
    }
  ]);

  const [homeItems] = useState<HomeItem[]>([
    {
      id: '1',
      name: 'Bàn Tu Luyện',
      type: 'facility',
      level: 2,
      description: 'Tăng 20% tốc độ tu luyện',
      owned: true
    },
    {
      id: '2',
      name: 'Lò Luyện Đan',
      type: 'facility',
      level: 1,
      description: 'Cho phép luyện đan cơ bản',
      owned: true
    },
    {
      id: '3',
      name: 'Tượng Rồng Thần',
      type: 'decoration',
      level: 1,
      description: 'Tăng may mắn +5',
      owned: false
    }
  ]);

  const getPlantIcon = (type: string) => {
    switch (type) {
      case 'herb': return <Flower2 className="w-4 h-4" />;
      case 'fruit': return <TreePine className="w-4 h-4" />;
      case 'grain': return <Wheat className="w-4 h-4" />;
      default: return <Sprout className="w-4 h-4" />;
    }
  };

  const getGrowthProgress = (plant: Plant) => {
    if (!plant.planted) return 0;
    const elapsed = Date.now() - plant.planted.getTime();
    const progress = Math.min((elapsed / (plant.growthTime * 60 * 1000)) * 100, 100);
    return progress;
  };

  const harvestPlant = (plantId: string) => {
    alert('Thu hoạch thành công! +' + garden.find(p => p.id === plantId)?.value + ' Linh Thạch');
  };

  const plantSeed = (plantId: string) => {
    alert('Đã gieo hạt ' + garden.find(p => p.id === plantId)?.name);
  };

  const sections = [
    { id: 'overview', label: 'Tổng Quan', icon: Home },
    { id: 'garden', label: 'Vườn Thuốc', icon: Sprout },
    { id: 'rooms', label: 'Phòng Ốc', icon: Package },
    { id: 'craft', label: 'Chế Tạo', icon: Hammer }
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(section.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-3 h-3" />
              <span className="text-xs">{section.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="space-y-3 sm:space-y-4">
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Thông Tin Động Phủ</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-cultivator-gold">Cấp 3</div>
                <div className="text-xs text-muted-foreground">Cấp Độ</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-spirit-jade">8/12</div>
                <div className="text-xs text-muted-foreground">Phòng</div>
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Hoạt Động Gần Đây</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Sprout className="w-3 h-3 text-green-400" />
                <span>Thiên Linh Quả đã chín</span>
                <span className="text-muted-foreground">2 phút trước</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Hammer className="w-3 h-3 text-blue-400" />
                <span>Hoàn thành chế tạo Bàn Tu Luyện</span>
                <span className="text-muted-foreground">1 giờ trước</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Garden Section */}
      {activeSection === 'garden' && (
        <div className="space-y-3">
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Vườn Linh Thảo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {garden.map((plant) => (
                <div key={plant.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPlantIcon(plant.type)}
                      <span className="font-medium text-sm">{plant.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {plant.type === 'herb' ? 'Thảo' : plant.type === 'fruit' ? 'Quả' : 'Lúa'}
                    </Badge>
                  </div>

                  {plant.planted ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{plant.growthTime} phút</span>
                      </div>
                      <Progress value={getGrowthProgress(plant)} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {plant.isReady ? 'Đã chín!' : `${Math.round(getGrowthProgress(plant))}%`}
                        </span>
                        {plant.isReady && (
                          <Button
                            size="sm"
                            onClick={() => harvestPlant(plant.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Thu Hoạch
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Chưa gieo</div>
                      <Button
                        size="sm"
                        onClick={() => plantSeed(plant.id)}
                        className="w-full"
                      >
                        Gieo Hạt
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Rooms Section */}
      {activeSection === 'rooms' && (
        <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Trang Trí Động Phủ</h3>
          <div className="space-y-3">
            {homeItems.map((item) => (
              <div key={item.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{item.name}</span>
                      <Badge variant="outline" className="text-xs">
                        Lv.{item.level}
                      </Badge>
                      {item.owned && <Star className="w-3 h-3 text-yellow-400" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  {!item.owned && (
                    <Button size="sm" variant="outline">
                      Mua
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Craft Section */}
      {activeSection === 'craft' && (
        <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Chế Tạo</h3>
          <div className="text-center py-8 text-muted-foreground">
            <Hammer className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Hệ thống chế tạo đang được phát triển...</p>
            <p className="text-xs mt-2">Luyện đan, rèn vũ khí, chế tạo trang bị!</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HomeSystem;
