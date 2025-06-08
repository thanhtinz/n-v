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
  Check,
  Heart,
  Crown,
  Users,
  Sparkles,
  Gift
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

interface ButterflyEgg {
  id: string;
  level: number;
  isAwakened: boolean;
  awakenedBy: string | null;
  awakenedTime: Date | null;
}

interface ButterflyBoss {
  id: string;
  level: number;
  satiety: number;
  maxSatiety: number;
  lastFed: Date | null;
  isReadyToBattle: boolean;
}

interface SacredTree {
  id: string;
  level: number;
  exp: number;
  maxExp: number;
  canSummon: boolean;
}

interface CoupleActivity {
  hasPartner: boolean;
  partnerName: string;
  lovePoints: number;
  sharedActivities: {
    butterflyEggs: ButterflyEgg[];
    butterflyBoss: ButterflyBoss | null;
    sacredTree: SacredTree;
  };
}

interface HomeSystemProps {
  onActivityUpdate?: (activity: 'gardening' | 'crafting' | 'decorating' | 'farming' | null, data?: any) => void;
}

const HomeSystem = ({ onActivityUpdate }: HomeSystemProps) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'garden' | 'rooms' | 'craft' | 'farm' | 'couple'>('overview');
  
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

  const [coupleActivity, setCoupleActivity] = useState<CoupleActivity>({
    hasPartner: true, // Assuming player is married
    partnerName: 'Tiên Nữ Mai',
    lovePoints: 45,
    sharedActivities: {
      butterflyEggs: [],
      butterflyBoss: null,
      sacredTree: {
        id: 'tree1',
        level: 5,
        exp: 30,
        maxExp: 100,
        canSummon: true
      }
    }
  });

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
    const butterflyActivities = coupleActivity.sharedActivities.butterflyEggs.length;
    
    let currentActivity: 'gardening' | 'crafting' | 'decorating' | 'farming' | null = null;
    
    if (activeSection === 'garden' && plantsGrowing > 0) {
      currentActivity = 'gardening';
    } else if (activeSection === 'craft' && activeCraftingJobs > 0) {
      currentActivity = 'crafting';
    } else if (activeSection === 'rooms') {
      currentActivity = 'decorating';
    } else if ((activeSection === 'farm' || activeSection === 'couple') && butterflyActivities > 0) {
      currentActivity = 'farming';
    }
    
    onActivityUpdate?.(currentActivity, { 
      plantsGrowing, 
      craftingJobs: activeCraftingJobs,
      butterflyActivities
    });
  }, [activeSection, garden, craftingJobs, coupleActivity, onActivityUpdate]);

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

  const summonButterflyEgg = () => {
    if (!coupleActivity.hasPartner) {
      alert('Cần có vợ/chồng để triệu hồi Trứng Bướm Ma!');
      return;
    }

    if (!coupleActivity.sharedActivities.sacredTree.canSummon) {
      alert('Cây Thần chưa đủ điều kiện triệu hồi!');
      return;
    }

    const newEgg: ButterflyEgg = {
      id: Date.now().toString(),
      level: Math.min(coupleActivity.sharedActivities.sacredTree.level, 5),
      isAwakened: false,
      awakenedBy: null,
      awakenedTime: null
    };

    setCoupleActivity(prev => ({
      ...prev,
      sharedActivities: {
        ...prev.sharedActivities,
        butterflyEggs: [...prev.sharedActivities.butterflyEggs, newEgg],
        sacredTree: {
          ...prev.sharedActivities.sacredTree,
          canSummon: false
        }
      }
    }));

    alert(`Triệu hồi thành công Trứng Bướm Ma Cấp ${newEgg.level}!`);
  };

  const awakenButterflyEgg = (eggId: string) => {
    setCoupleActivity(prev => ({
      ...prev,
      sharedActivities: {
        ...prev.sharedActivities,
        butterflyEggs: prev.sharedActivities.butterflyEggs.map(egg =>
          egg.id === eggId 
            ? { 
                ...egg, 
                isAwakened: true, 
                awakenedBy: prev.partnerName,
                awakenedTime: new Date()
              }
            : egg
        )
      }
    }));

    // Convert awakened egg to butterfly boss
    const egg = coupleActivity.sharedActivities.butterflyEggs.find(e => e.id === eggId);
    if (egg) {
      const newBoss: ButterflyBoss = {
        id: Date.now().toString(),
        level: egg.level,
        satiety: 0,
        maxSatiety: 10,
        lastFed: null,
        isReadyToBattle: false
      };

      setCoupleActivity(prev => ({
        ...prev,
        sharedActivities: {
          ...prev.sharedActivities,
          butterflyBoss: newBoss,
          butterflyEggs: prev.sharedActivities.butterflyEggs.filter(e => e.id !== eggId)
        }
      }));

      alert('Trứng đã nở thành Bướm Ma! Hãy cho ăn để chuẩn bị chiến đấu.');
    }
  };

  const feedButterfly = () => {
    if (!coupleActivity.sharedActivities.butterflyBoss) return;

    const now = new Date();
    const lastFed = coupleActivity.sharedActivities.butterflyBoss.lastFed;
    
    if (lastFed && (now.getTime() - lastFed.getTime()) < 60 * 60 * 1000) {
      alert('Phải chờ 60 phút mới có thể cho ăn tiếp!');
      return;
    }

    setCoupleActivity(prev => ({
      ...prev,
      lovePoints: prev.lovePoints + 2,
      sharedActivities: {
        ...prev.sharedActivities,
        butterflyBoss: prev.sharedActivities.butterflyBoss ? {
          ...prev.sharedActivities.butterflyBoss,
          satiety: Math.min(prev.sharedActivities.butterflyBoss.satiety + 1, prev.sharedActivities.butterflyBoss.maxSatiety),
          lastFed: now,
          isReadyToBattle: prev.sharedActivities.butterflyBoss.satiety + 1 >= prev.sharedActivities.butterflyBoss.maxSatiety
        } : null
      }
    }));

    alert('Cho Bướm Ma ăn thành công! +2 Điểm Yêu Thương');
  };

  const battleButterfly = () => {
    if (!coupleActivity.sharedActivities.butterflyBoss?.isReadyToBattle) {
      alert('Bướm Ma chưa đủ no để chiến đấu!');
      return;
    }

    if (!coupleActivity.hasPartner) {
      alert('Cần cả hai vợ chồng mới có thể đánh Bướm Ma!');
      return;
    }

    // Simulate battle
    const victory = Math.random() > 0.3; // 70% success rate

    if (victory) {
      setCoupleActivity(prev => ({
        ...prev,
        sharedActivities: {
          ...prev.sharedActivities,
          butterflyBoss: null
        }
      }));
      alert('Chiến thắng Bướm Ma! Nhận được Túi Quà Bướm Ma với nhiều phần thưởng quý giá!');
    } else {
      alert('Thua cuộc! Bướm Ma đã bỏ trốn.');
    }
  };

  const upgradeSacredTree = () => {
    const requiredPoints = 10;
    if (coupleActivity.lovePoints >= requiredPoints) {
      setCoupleActivity(prev => ({
        ...prev,
        lovePoints: prev.lovePoints - requiredPoints,
        sharedActivities: {
          ...prev.sharedActivities,
          sacredTree: {
            ...prev.sharedActivities.sacredTree,
            exp: prev.sharedActivities.sacredTree.exp + 10,
            level: prev.sharedActivities.sacredTree.exp + 10 >= prev.sharedActivities.sacredTree.maxExp 
              ? prev.sharedActivities.sacredTree.level + 1 
              : prev.sharedActivities.sacredTree.level,
            exp: prev.sharedActivities.sacredTree.exp + 10 >= prev.sharedActivities.sacredTree.maxExp 
              ? 0 
              : prev.sharedActivities.sacredTree.exp + 10,
            maxExp: prev.sharedActivities.sacredTree.exp + 10 >= prev.sharedActivities.sacredTree.maxExp 
              ? prev.sharedActivities.sacredTree.maxExp + 20 
              : prev.sharedActivities.sacredTree.maxExp,
            canSummon: true
          }
        }
      }));
      alert('Cây Thần đã được tưới! +10 EXP');
    } else {
      alert(`Cần ${requiredPoints} Điểm Yêu Thương để tưới cây!`);
    }
  };

  const sections = [
    { id: 'overview', label: 'Tổng Quan', icon: Home },
    { id: 'garden', label: 'Vườn Thuốc', icon: Sprout },
    { id: 'rooms', label: 'Phòng Ốc', icon: Package },
    { id: 'craft', label: 'Chế Tạo', icon: Hammer },
    { id: 'farm', label: 'Nông Trại', icon: TreePine },
    { id: 'couple', label: 'Boss Vợ Chồng', icon: Heart }
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

      {/* Farm Section */}
      {activeSection === 'farm' && (
        <div className="space-y-3">
          <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Nông Trại Pet</h3>
            <div className="text-center p-6">
              <TreePine className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <div className="text-sm mb-2">Nông trại sản xuất thức ăn cho Pet</div>
              <div className="text-xs text-muted-foreground mb-4">
                Trồng cây để thu hoạch thức ăn cho Pet của bạn
              </div>
              <Button className="w-full">
                <Sprout className="w-3 h-3 mr-2" />
                Vào Nông Trại Pet
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Couple Boss Section */}
      {activeSection === 'couple' && (
        <div className="space-y-3">
          {/* Marriage Status */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Tình Trạng Hôn Nhân</h3>
            {coupleActivity.hasPartner ? (
              <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span className="font-medium">Đã kết hôn với {coupleActivity.partnerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-sm">Điểm Yêu Thương: {coupleActivity.lovePoints}</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                Cần kết hôn để mở khóa tính năng Boss Vợ Chồng
              </div>
            )}
          </Card>

          {coupleActivity.hasPartner && (
            <>
              {/* Sacred Tree */}
              <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Cây Thần</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TreePine className="w-4 h-4 text-green-400" />
                        <span className="font-medium">Cấp {coupleActivity.sharedActivities.sacredTree.level}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        EXP: {coupleActivity.sharedActivities.sacredTree.exp}/{coupleActivity.sharedActivities.sacredTree.maxExp}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={upgradeSacredTree}
                      disabled={coupleActivity.lovePoints < 10}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Tưới Cây
                    </Button>
                  </div>
                  
                  <Progress 
                    value={(coupleActivity.sharedActivities.sacredTree.exp / coupleActivity.sharedActivities.sacredTree.maxExp) * 100} 
                    className="h-2" 
                  />
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    onClick={summonButterflyEgg}
                    disabled={!coupleActivity.sharedActivities.sacredTree.canSummon}
                  >
                    <Plus className="w-3 h-3 mr-2" />
                    Triệu Hồi Trứng Bướm Ma
                  </Button>
                </div>
              </Card>

              {/* Butterfly Eggs */}
              {coupleActivity.sharedActivities.butterflyEggs.length > 0 && (
                <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
                  <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Trứng Bướm Ma</h3>
                  <div className="space-y-2">
                    {coupleActivity.sharedActivities.butterflyEggs.map((egg) => (
                      <div key={egg.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Gift className="w-4 h-4 text-purple-400" />
                              <span className="font-medium">Trứng Bướm Ma Cấp {egg.level}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {egg.isAwakened ? `Đã thức tỉnh bởi ${egg.awakenedBy}` : 'Cần vợ/chồng thức tỉnh'}
                            </div>
                          </div>
                          {!egg.isAwakened && (
                            <Button size="sm" onClick={() => awakenButterflyEgg(egg.id)}>
                              <Star className="w-3 h-3 mr-1" />
                              Thức Tỉnh
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Butterfly Boss */}
              {coupleActivity.sharedActivities.butterflyBoss && (
                <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
                  <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Bướm Ma Cấp {coupleActivity.sharedActivities.butterflyBoss.level}</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Độ no:</span>
                        <span>{coupleActivity.sharedActivities.butterflyBoss.satiety}/{coupleActivity.sharedActivities.butterflyBoss.maxSatiety}</span>
                      </div>
                      <Progress 
                        value={(coupleActivity.sharedActivities.butterflyBoss.satiety / coupleActivity.sharedActivities.butterflyBoss.maxSatiety) * 100} 
                        className="h-2" 
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={feedButterfly}
                        disabled={coupleActivity.sharedActivities.butterflyBoss.satiety >= coupleActivity.sharedActivities.butterflyBoss.maxSatiety}
                        className="flex-1"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        Cho Ăn
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={battleButterfly}
                        disabled={!coupleActivity.sharedActivities.butterflyBoss.isReadyToBattle}
                        className="flex-1 bg-red-500 hover:bg-red-600"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Chiến Đấu
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground p-2 bg-muted/10 rounded">
                      {coupleActivity.sharedActivities.butterflyBoss.isReadyToBattle 
                        ? 'Bướm Ma đã sẵn sàng chiến đấu! Cần cả hai vợ chồng cùng tham gia.'
                        : 'Hãy cho Bướm Ma ăn đến khi no mới có thể chiến đấu. Mỗi lần cho ăn cách nhau 60 phút và nhận 2 Điểm Yêu Thương.'
                      }
                    </div>
                  </div>
                </Card>
              )}

              {/* Love Points Info */}
              <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-sm mb-3 text-cultivator-gold">Hướng Dẫn</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>• Cây Thần cấp 0 có thể triệu hồi Trứng Bướm Ma cấp 1</div>
                  <div>• Cần vợ/chồng thức tỉnh trứng để nở thành Bướm Ma</div>
                  <div>• Cho Bướm Ma ăn mỗi 60 phút để tăng độ no</div>
                  <div>• Khi Bướm Ma no, cả hai vợ chồng có thể cùng đánh để nhận thưởng</div>
                  <div>• Dùng Điểm Yêu Thương để nâng cấp Cây Thần</div>
                  <div>• Cây Thần cấp 10, 20, 30, 40, 50 cần thêm Mặt Trời (300xu)</div>
                </div>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeSystem;
