import { useState, useEffect } from 'react';
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
  Wheat,
  Beaker,
  Zap,
  Shield,
  Plus,
  Check
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

interface Material {
  id: string;
  name: string;
  type: 'herb' | 'mineral' | 'essence' | 'core';
  quantity: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Recipe {
  id: string;
  name: string;
  type: 'pill' | 'weapon' | 'armor' | 'talisman';
  materials: { materialId: string; quantity: number }[];
  craftTime: number; // in minutes
  successRate: number; // percentage
  result: {
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  };
}

interface CraftingJob {
  id: string;
  recipeId: string;
  startTime: Date;
  endTime: Date;
  isCompleted: boolean;
}

interface HomeSystemProps {
  onActivityUpdate?: (activity: 'gardening' | 'crafting' | 'decorating' | null, data?: any) => void;
}

const HomeSystem = ({ onActivityUpdate }: HomeSystemProps) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'garden' | 'rooms' | 'craft'>('overview');
  
  const [garden, setGarden] = useState<Plant[]>([
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

  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'Linh Thảo', type: 'herb', quantity: 15, rarity: 'common' },
    { id: '2', name: 'Thiên Linh Quả', type: 'herb', quantity: 3, rarity: 'rare' },
    { id: '3', name: 'Sắt Tinh', type: 'mineral', quantity: 8, rarity: 'common' },
    { id: '4', name: 'Linh Thạch', type: 'essence', quantity: 50, rarity: 'common' },
    { id: '5', name: 'Ma Thú Tinh Hạch', type: 'core', quantity: 2, rarity: 'epic' }
  ]);

  const [recipes] = useState<Recipe[]>([
    {
      id: '1',
      name: 'Hồi Khí Đan',
      type: 'pill',
      materials: [{ materialId: '1', quantity: 3 }, { materialId: '4', quantity: 10 }],
      craftTime: 15,
      successRate: 85,
      result: {
        name: 'Hồi Khí Đan',
        description: 'Hồi phục 50% HP',
        rarity: 'common'
      }
    },
    {
      id: '2',
      name: 'Linh Kiếm',
      type: 'weapon',
      materials: [{ materialId: '3', quantity: 5 }, { materialId: '4', quantity: 20 }],
      craftTime: 45,
      successRate: 70,
      result: {
        name: 'Linh Kiếm',
        description: 'Tăng 25% sát thương',
        rarity: 'rare'
      }
    },
    {
      id: '3',
      name: 'Thiên Linh Đan',
      type: 'pill',
      materials: [{ materialId: '2', quantity: 2 }, { materialId: '5', quantity: 1 }],
      craftTime: 90,
      successRate: 50,
      result: {
        name: 'Thiên Linh Đan',
        description: 'Đột phá cảnh giới',
        rarity: 'epic'
      }
    },
    {
      id: '4',
      name: 'Hộ Thân Phù',
      type: 'talisman',
      materials: [{ materialId: '1', quantity: 2 }, { materialId: '4', quantity: 15 }],
      craftTime: 30,
      successRate: 75,
      result: {
        name: 'Hộ Thân Phù',
        description: 'Tăng 15% phòng thủ',
        rarity: 'common'
      }
    }
  ]);

  const [craftingJobs, setCraftingJobs] = useState<CraftingJob[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGarden(prev => prev.map(plant => {
        if (plant.planted && !plant.isReady) {
          const elapsed = Date.now() - plant.planted.getTime();
          const isReady = elapsed >= (plant.growthTime * 60 * 1000);
          if (isReady && !plant.isReady) {
            setTimeout(() => alert(`${plant.name} đã chín! Có thể thu hoạch.`), 100);
          }
          return { ...plant, isReady };
        }
        return plant;
      }));

      // Check crafting jobs
      setCraftingJobs(prev => prev.map(job => {
        if (!job.isCompleted && Date.now() >= job.endTime.getTime()) {
          const recipe = recipes.find(r => r.id === job.recipeId);
          if (recipe) {
            setTimeout(() => alert(`Chế tạo hoàn thành: ${recipe.result.name}!`), 100);
          }
          return { ...job, isCompleted: true };
        }
        return job;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [recipes]);

  useEffect(() => {
    const plantsGrowing = garden.filter(plant => plant.planted && !plant.isReady).length;
    const activeCraftingJobs = craftingJobs.filter(job => !job.isCompleted).length;
    
    let currentActivity: 'gardening' | 'crafting' | 'decorating' | null = null;
    
    if (activeSection === 'garden' && plantsGrowing > 0) {
      currentActivity = 'gardening';
    } else if (activeSection === 'craft' && activeCraftingJobs > 0) {
      currentActivity = 'crafting';
    } else if (activeSection === 'rooms') {
      currentActivity = 'decorating';
    }
    
    onActivityUpdate?.(currentActivity, { 
      plantsGrowing, 
      craftingJobs: activeCraftingJobs 
    });
  }, [activeSection, garden, craftingJobs, onActivityUpdate]);

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
    const plant = garden.find(p => p.id === plantId);
    if (plant && plant.isReady) {
      setGarden(prev => prev.map(p => 
        p.id === plantId 
          ? { ...p, planted: null, isReady: false }
          : p
      ));
      
      // Add harvested material
      if (plant.type === 'herb') {
        setMaterials(prev => prev.map(m => 
          m.name === plant.name 
            ? { ...m, quantity: m.quantity + 1 }
            : m
        ));
      }
      
      alert(`Thu hoạch thành công! +1 ${plant.name}`);
    }
  };

  const plantSeed = (plantId: string) => {
    const plant = garden.find(p => p.id === plantId);
    if (plant && !plant.planted) {
      setGarden(prev => prev.map(p => 
        p.id === plantId 
          ? { ...p, planted: new Date(), isReady: false }
          : p
      ));
      alert(`Đã gieo hạt ${plant.name}. Thời gian sinh trưởng: ${plant.growthTime} phút.`);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pill': return <Beaker className="w-4 h-4" />;
      case 'weapon': return <Zap className="w-4 h-4" />;
      case 'armor': return <Shield className="w-4 h-4" />;
      case 'talisman': return <Star className="w-4 h-4" />;
      default: return <Hammer className="w-4 h-4" />;
    }
  };

  const canCraft = (recipe: Recipe) => {
    return recipe.materials.every(req => {
      const material = materials.find(m => m.id === req.materialId);
      return material && material.quantity >= req.quantity;
    });
  };

  const startCrafting = (recipe: Recipe) => {
    if (!canCraft(recipe)) {
      alert('Không đủ nguyên liệu!');
      return;
    }

    // Consume materials
    setMaterials(prev => prev.map(material => {
      const requirement = recipe.materials.find(req => req.materialId === material.id);
      if (requirement) {
        return { ...material, quantity: material.quantity - requirement.quantity };
      }
      return material;
    }));

    // Start crafting job
    const now = new Date();
    const endTime = new Date(now.getTime() + recipe.craftTime * 60 * 1000);
    
    const newJob: CraftingJob = {
      id: Date.now().toString(),
      recipeId: recipe.id,
      startTime: now,
      endTime,
      isCompleted: false
    };

    setCraftingJobs(prev => [...prev, newJob]);
    alert(`Bắt đầu chế tạo ${recipe.name}. Thời gian: ${recipe.craftTime} phút.`);
  };

  const getCraftingProgress = (job: CraftingJob) => {
    if (job.isCompleted) return 100;
    const elapsed = Date.now() - job.startTime.getTime();
    const total = job.endTime.getTime() - job.startTime.getTime();
    return Math.min((elapsed / total) * 100, 100);
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
        <div className="space-y-3">
          {/* Materials Inventory */}
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Kho Nguyên Liệu</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {materials.map((material) => (
                <div key={material.id} className="p-2 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{material.name}</span>
                    <Badge variant="outline" className={`text-xs ${getRarityColor(material.rarity)}`}>
                      x{material.quantity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Crafting Jobs */}
          {craftingJobs.filter(job => !job.isCompleted).length > 0 && (
            <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Đang Chế Tạo</h3>
              <div className="space-y-2">
                {craftingJobs.filter(job => !job.isCompleted).map((job) => {
                  const recipe = recipes.find(r => r.id === job.recipeId);
                  if (!recipe) return null;
                  
                  return (
                    <div key={job.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(recipe.type)}
                        <span className="font-medium text-sm">{recipe.name}</span>
                        <Badge variant="outline" className={`text-xs ${getRarityColor(recipe.result.rarity)}`}>
                          {recipe.result.rarity}
                        </Badge>
                      </div>
                      <Progress value={getCraftingProgress(job)} className="h-2 mb-2" />
                      <div className="text-xs text-muted-foreground">
                        {Math.round(getCraftingProgress(job))}% - 
                        {job.isCompleted ? ' Hoàn thành!' : ` ${Math.ceil((job.endTime.getTime() - Date.now()) / 60000)} phút còn lại`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Recipe List */}
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Công Thức Chế Tạo</h3>
            <div className="space-y-3">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(recipe.type)}
                      <span className="font-medium text-sm">{recipe.name}</span>
                      <Badge variant="outline" className={`text-xs ${getRarityColor(recipe.result.rarity)}`}>
                        {recipe.result.rarity}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {recipe.craftTime}m • {recipe.successRate}%
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-2">
                    {recipe.result.description}
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium">Nguyên liệu cần:</div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.materials.map((req) => {
                        const material = materials.find(m => m.id === req.materialId);
                        const hasEnough = material && material.quantity >= req.quantity;
                        
                        return (
                          <Badge 
                            key={req.materialId}
                            variant="outline" 
                            className={`text-xs ${hasEnough ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'}`}
                          >
                            {material?.name} x{req.quantity} ({material?.quantity || 0})
                          </Badge>
                        );
                      })}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => startCrafting(recipe)}
                      disabled={!canCraft(recipe)}
                      className="w-full"
                    >
                      <Plus className="w-3 h-3 mr-2" />
                      Chế Tạo
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HomeSystem;
