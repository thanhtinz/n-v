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
  Skull,
  Heart,
  Shield,
  Gem,
  Book,
  Scroll,
  Timer,
  TrendingUp,
  AlertTriangle,
  Crown,
  Eye,
  Swords,
  Infinity
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
  step: number;
  level: number;
  maxLevel: number;
  progress: number;
  description: string;
  nextRealm?: string;
  requiresTribulation: boolean;
  requiredItems: string[];
  minCultivationTime: number; // in hours
  stepName: string;
}

interface TribulationState {
  isActive: boolean;
  phase: 'preparing' | 'lightning' | 'success' | 'failure';
  progress: number;
  lightningCount: number;
  maxLightning: number;
  successRate: number;
  failureCount: number;
}

interface CultivationResources {
  lingshi: number; // Linh Thạch
  lingqi: number; // Linh Khí
  lingdan: number; // Linh Đan
  experience: number; // Kinh Nghiệm
  tuvirondan: number; // Tu Vi Đan
  treasures: number; // Thiên Địa Bảo Vật
  leidans: number; // Lôi Đan (for tribulation)
  dokiepfu: number; // Độ Kiếp Phù
  tamphaph: number; // Tâm Pháp
  kinhvan: number; // Kinh Văn
  truyenthua: number; // Truyền Thừa
  cultivationTime: number; // Accumulated cultivation time in hours
  activityPoints: number; // Điểm hoạt lực
  tienkhí: number; // Tiên Khí
  tiengoc: number; // Tiên Ngọc
  nguyenluc: number; // Nguyên Lực
  huongHoa: number; // Hương Hỏa
}

// Comprehensive realm progression system
const REALM_PROGRESSION = [
  // Bước thứ nhất - Nhất Bộ Tung Hoành
  {
    name: 'Ngưng Khí Kỳ',
    step: 1,
    stepName: 'Nhất Bộ Tung Hoành',
    description: 'Hấp thụ linh khí của trời đất vào thân thể, cải tạo thể chất để thích hợp cho việc tu luyện',
    nextRealm: 'Trúc Cơ Kỳ',
    requiresTribulation: false,
    requiredItems: ['Cơ Bản Tâm Pháp'],
    minCultivationTime: 0,
    maxLevel: 15
  },
  {
    name: 'Trúc Cơ Kỳ',
    step: 1,
    stepName: 'Nhất Bộ Tung Hoành',
    description: 'Sử dụng linh lực để thanh tẩy toàn thân, cải tạo thể chất lần thứ hai để thích hợp cho việc tu luyện',
    nextRealm: 'Kết Đan Kỳ',
    requiresTribulation: true,
    requiredItems: ['Trúc Cơ Kinh Văn', 'Thanh Linh Đan'],
    minCultivationTime: 20,
    maxLevel: 9
  },
  {
    name: 'Kết Đan Kỳ',
    step: 1,
    stepName: 'Nhất Bộ Tung Hoành',
    description: 'Nén linh lực từ dạng khí trở thành dạng chất lỏng sau đó tiếp tục nén và ngưng tụ thành kim đan',
    nextRealm: 'Nguyên Anh Kỳ',
    requiresTribulation: true,
    requiredItems: ['Kim Đan Tâm Pháp', 'Thiên Địa Linh Khí'],
    minCultivationTime: 50,
    maxLevel: 9
  },
  {
    name: 'Nguyên Anh Kỳ',
    step: 1,
    stepName: 'Nhất Bộ Tung Hoành',
    description: 'Kim đan vỡ vụn hình thành nguyên anh nhỏ trong thân thể, có thể xuất khiếu để đi đoạt xá',
    nextRealm: 'Hoá Thần Kỳ',
    requiresTribulation: true,
    requiredItems: ['Nguyên Anh Truyền Thừa', 'Cửu Chuyển Kim Đan'],
    minCultivationTime: 100,
    maxLevel: 9
  },
  {
    name: 'Hoá Thần Kỳ',
    step: 1,
    stepName: 'Nhất Bộ Tung Hoành',
    description: 'Nguyên anh trưởng thành, kết hợp với ý cảnh để ngưng kết thành nguyên thần',
    nextRealm: 'Anh Biến Kỳ',
    requiresTribulation: true,
    requiredItems: ['Hoá Thần Bí Pháp', 'Thái Cổ Linh Bảo', 'Ý Cảnh Tinh Thể'],
    minCultivationTime: 200,
    maxLevel: 9
  },
  {
    name: 'Anh Biến Kỳ',
    step: 1,
    stepName: 'Nhất Bộ Tung Hoành',
    description: 'Biến ý cảnh thành thực chất hóa, xóa bỏ phàm thể, hình thành tiên thể',
    nextRealm: 'Vấn Đỉnh Kỳ',
    requiresTribulation: true,
    requiredItems: ['Tiên Ngọc', 'Anh Biến Tâm Kinh'],
    minCultivationTime: 500,
    maxLevel: 9
  },
  {
    name: 'Vấn Đỉnh Kỳ',
    step: 1,
    stepName: 'Nhất Bộ Tung Hoành',
    description: 'Viên mãn ý cảnh, dung hợp với tiên lực để hình thành Vấn Đỉnh chi tinh',
    nextRealm: 'Âm Hư Dương Thực',
    requiresTribulation: true,
    requiredItems: ['Vấn Đỉnh Tâm Pháp', 'Tiên Hoả Linh Bảo'],
    minCultivationTime: 1000,
    maxLevel: 9
  },

  // Cảnh giới quá độ
  {
    name: 'Âm Hư Dương Thực',
    step: 1.5,
    stepName: 'Cảnh Giới Quá Độ',
    description: 'Giai đoạn chuyển hóa giữa bước thứ nhất và bước thứ hai, biến hóa ý cảnh',
    nextRealm: 'Khuy Niết',
    requiresTribulation: true,
    requiredItems: ['Hoá Nguyên Tâm Pháp', 'Nguyên Lực Tinh Thể'],
    minCultivationTime: 1500,
    maxLevel: 9
  },

  // Bước thứ hai - Nhị Bộ Phi Thiên (Toái Niết Tam Cảnh)
  {
    name: 'Khuy Niết',
    step: 2,
    stepName: 'Nhị Bộ Phi Thiên',
    description: 'Hoàn thành lần thay da đổi thịt đầu tiên, có thể dễ dàng hấp thu thiên địa nguyên lực',
    nextRealm: 'Tịnh Niết',
    requiresTribulation: true,
    requiredItems: ['Quy Tắc Linh Bảo', 'Nguyên Lực Hạt Giống'],
    minCultivationTime: 2000,
    maxLevel: 9
  },
  {
    name: 'Tịnh Niết',
    step: 2,
    stepName: 'Nhị Bộ Phi Thiên',
    description: 'Hoàn toàn nắm giữ một hoặc nhiều loại quy tắc, hấp thu sức mạnh của thiên địa',
    nextRealm: 'Toái Niết',
    requiresTribulation: true,
    requiredItems: ['Quy Tắc Kinh Văn', 'Thiên Địa Nguyên Lực'],
    minCultivationTime: 3000,
    maxLevel: 9
  },
  {
    name: 'Toái Niết',
    step: 2,
    stepName: 'Nhị Bộ Phi Thiên',
    description: 'Hoàn toàn dung hợp ý cảnh và quy tắc, tùy ý khống chế thiên địa nguyên lực',
    nextRealm: 'Thiên Nhân Suy Kiếp',
    requiresTribulation: true,
    requiredItems: ['Bổn Nguyên Lực Hạt Giống', 'Quy Tắc Thần Thông'],
    minCultivationTime: 5000,
    maxLevel: 9
  },

  // Cảnh giới quá độ
  {
    name: 'Thiên Nhân Suy Kiếp',
    step: 2.5,
    stepName: 'Phá Không Ngũ Chỉ',
    description: 'Thiên đạo sẽ không để cho bất kỳ sinh linh nào có tuổi thọ sánh ngang với thiên địa',
    nextRealm: 'Không Niết',
    requiresTribulation: true,
    requiredItems: ['Hương Hoả', 'Bổn Nguyên Cường Hóa Bảo'],
    minCultivationTime: 8000,
    maxLevel: 5
  },

  // Bước thứ ba - Tam Bộ Vô Biên - Đại Năng (Tứ Không Cảnh)
  {
    name: 'Không Niết',
    step: 3,
    stepName: 'Tam Bộ Vô Biên',
    description: 'Hoàn toàn vượt phá Không Môn, dùng bổn nguyên chứng đạo, thân thể bành trướng vô hạn',
    nextRealm: 'Không Linh',
    requiresTribulation: false,
    requiredItems: ['Hương Hoả Giới', 'Niết Bàn Lực'],
    minCultivationTime: 10000,
    maxLevel: 9
  },
  {
    name: 'Không Linh',
    step: 3,
    stepName: 'Tam Bộ Vô Biên',
    description: 'Linh hồn thăng hoa trở thành vật linh động, dung hợp cùng nguyên thần',
    nextRealm: 'Không Huyền',
    requiresTribulation: false,
    requiredItems: ['Linh Thần Hợp Thể', 'Linh Lực Tinh Túy'],
    minCultivationTime: 15000,
    maxLevel: 9
  },
  {
    name: 'Không Huyền',
    step: 3,
    stepName: 'Tam Bộ Vô Biên',
    description: 'Sở hữu đạo hư bổn nguyên, hiểu được đạo lý thiên địa',
    nextRealm: 'Huyền Kiếp',
    requiresTribulation: false,
    requiredItems: ['Hư Bổn Nguyên', 'Thiên Địa Đạo Lý'],
    minCultivationTime: 20000,
    maxLevel: 9
  },
  {
    name: 'Huyền Kiếp',
    step: 3,
    stepName: 'Tam Bộ Vô Biên',
    description: 'Chín lần sinh tử, mỗi lần vượt qua nguyên thần sẽ tăng lên gấp đôi',
    nextRealm: 'Không Kiếp',
    requiresTribulation: true,
    requiredItems: ['Huyền Kiếp Bảo Vật', 'Sinh Tử Luân Hồi Lực'],
    minCultivationTime: 30000,
    maxLevel: 9
  },
  {
    name: 'Không Kiếp',
    step: 3,
    stepName: 'Tam Bộ Vô Biên',
    description: 'Được xưng là Đại Tôn, chỉ cần phát ra uy áp cũng đủ khiến thiên địa biến sắc',
    nextRealm: 'Đại Thiên Tôn',
    requiresTribulation: false,
    requiredItems: ['Không Kiếp Vòng Xoáy', 'Kinh Thiên Khi Tức'],
    minCultivationTime: 50000,
    maxLevel: 9
  },
  {
    name: 'Đại Thiên Tôn',
    step: 3,
    stepName: 'Tam Bộ Vô Biên',
    description: 'Đỉnh phong của bước thứ ba, ngưng tụ Đại Thiên Tôn chi dương',
    nextRealm: 'Bán Bộ Đạp Thiên',
    requiresTribulation: false,
    requiredItems: ['Đại Thiên Tôn Chi Dương', 'Tín Thuật', 'Tín Bảo'],
    minCultivationTime: 80000,
    maxLevel: 9
  },

  // Cảnh giới quá độ
  {
    name: 'Bán Bộ Đạp Thiên',
    step: 3.5,
    stepName: 'Đạp Thiên Kiều',
    description: 'Bước vào Đạp Thiên Kiều, mỗi khi đi qua một kiều chiến lực và tu vi sẽ tăng mạnh',
    nextRealm: 'Đạp Thiên Cảnh',
    requiresTribulation: true,
    requiredItems: ['Đạp Thiên Nhãn', 'Vấn Đạo Tâm', 'Chứng Đạo Lực'],
    minCultivationTime: 100000,
    maxLevel: 9
  },

  // Bước thứ tư - Tứ Bộ Đạp Thiên
  {
    name: 'Đạp Thiên Cảnh',
    step: 4,
    stepName: 'Tứ Bộ Đạp Thiên',
    description: 'Hiểu được chân ngã trong luân hồi, có tư cách vượt qua và đứng trên thiên đạo',
    nextRealm: undefined,
    requiresTribulation: false,
    requiredItems: ['Chân Ngã Luân Hồi', 'Thiên Đạo Siêu Thoát'],
    minCultivationTime: 200000,
    maxLevel: 9
  }
];

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
    maxLightning: 9,
    successRate: 60,
    failureCount: 0
  });

  const [resources, setResources] = useState<CultivationResources>({
    lingshi: 1250,
    lingqi: 850,
    lingdan: 25,
    experience: 120,
    tuvirondan: 8,
    treasures: 3,
    leidans: 5,
    dokiepfu: 3,
    tamphaph: 2,
    kinhvan: 1,
    truyenthua: 1,
    cultivationTime: 25,
    activityPoints: 100,
    tienkhí: 50,
    tiengoc: 20,
    nguyenluc: 30,
    huongHoa: 5
  });

  const [currentRealmIndex, setCurrentRealmIndex] = useState(0);
  const [currentRealm, setCurrentRealm] = useState<Realm>({
    name: REALM_PROGRESSION[0].name,
    step: REALM_PROGRESSION[0].step,
    stepName: REALM_PROGRESSION[0].stepName,
    level: 9,
    maxLevel: REALM_PROGRESSION[0].maxLevel,
    progress: 100,
    description: REALM_PROGRESSION[0].description,
    nextRealm: REALM_PROGRESSION[0].nextRealm,
    requiresTribulation: REALM_PROGRESSION[0].requiresTribulation,
    requiredItems: REALM_PROGRESSION[0].requiredItems,
    minCultivationTime: REALM_PROGRESSION[0].minCultivationTime
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
                // Check success rate
                const success = Math.random() * 100 < prev.successRate;
                if (success) {
                  setTimeout(() => {
                    setTribulation({
                      isActive: false,
                      phase: 'success',
                      progress: 0,
                      lightningCount: 0,
                      maxLightning: 9,
                      successRate: 60,
                      failureCount: 0
                    });
                    advanceToNextRealm();
                    alert('🎉 Độ kiếp thành công! Đột phá lên cảnh giới mới!');
                  }, 1000);
                  return { ...prev, phase: 'success', progress: 100 };
                } else {
                  setTimeout(() => {
                    setTribulation(prev => ({
                      ...prev,
                      isActive: false,
                      phase: 'failure',
                      progress: 0,
                      lightningCount: 0,
                      failureCount: prev.failureCount + 1,
                      successRate: Math.max(20, prev.successRate - 10)
                    }));
                    setCurrentRealm(prev => ({ ...prev, progress: Math.max(0, prev.progress - 20) }));
                    alert('💥 Độ kiếp thất bại! Tu vi bị tổn thương, hãy chuẩn bị kỹ lưỡng hơn!');
                  }, 1000);
                  return { ...prev, phase: 'failure', progress: 100 };
                }
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
        const progress = Math.min((elapsed / (60 * 60 * 1000)) * 100, 100);
        setCultivationProgress(progress);
        
        if (progress >= 100) {
          setIsCultivating(false);
          setCultivationStart(null);
          setCultivationProgress(0);
          
          // Update resources and realm progress
          setResources(prev => ({
            ...prev,
            experience: prev.experience + 10,
            cultivationTime: prev.cultivationTime + 1,
            activityPoints: prev.activityPoints + 20
          }));
          
          setCurrentRealm(prev => {
            const newProgress = Math.min(prev.progress + 10, 100);
            return { ...prev, progress: newProgress };
          });
          
          alert('Tu luyện hoàn thành! +10 kinh nghiệm, +1 giờ tu luyện, +20 điểm hoạt lực');
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
    }, 100);

    return () => clearInterval(interval);
  }, [isCultivating, cultivationStart, tribulation.isActive]);

  const advanceToNextRealm = () => {
    if (currentRealmIndex < REALM_PROGRESSION.length - 1) {
      const nextIndex = currentRealmIndex + 1;
      const nextRealmData = REALM_PROGRESSION[nextIndex];
      
      setCurrentRealmIndex(nextIndex);
      setCurrentRealm({
        name: nextRealmData.name,
        step: nextRealmData.step,
        stepName: nextRealmData.stepName,
        level: 1,
        maxLevel: nextRealmData.maxLevel,
        progress: 0,
        description: nextRealmData.description,
        nextRealm: nextRealmData.nextRealm,
        requiresTribulation: nextRealmData.requiresTribulation,
        requiredItems: nextRealmData.requiredItems,
        minCultivationTime: nextRealmData.minCultivationTime
      });
    }
  };

  const canStartTribulation = () => {
    const hasRequiredProgress = currentRealm.progress >= 100 && currentRealm.level >= currentRealm.maxLevel;
    const hasRequiredTime = resources.cultivationTime >= currentRealm.minCultivationTime;
    
    return hasRequiredProgress && hasRequiredTime && currentRealm.requiresTribulation;
  };

  const startTribulation = () => {
    if (!canStartTribulation()) {
      alert('Chưa đủ điều kiện độ kiếp!');
      return;
    }

    // Calculate success rate based on preparations
    let baseSuccessRate = 40;
    if (resources.leidans > 0) baseSuccessRate += 20;
    if (resources.dokiepfu > 0) baseSuccessRate += 15;
    if (resources.tuvirondan > 0) baseSuccessRate += 10;
    
    setTribulation(prev => ({
      ...prev,
      isActive: true,
      phase: 'preparing',
      progress: 0,
      lightningCount: 0,
      maxLightning: 9,
      successRate: Math.min(90, baseSuccessRate)
    }));
  };

  const useCultivationResource = (resourceType: keyof CultivationResources, amount: number) => {
    setResources(prev => ({
      ...prev,
      [resourceType]: Math.max(0, prev[resourceType] - amount)
    }));
  };

  const boostCultivation = (boostType: string) => {
    switch (boostType) {
      case 'lingdan':
        if (resources.lingdan > 0) {
          useCultivationResource('lingdan', 1);
          setCurrentRealm(prev => ({ ...prev, progress: Math.min(100, prev.progress + 15) }));
          alert('Sử dụng Linh Đan! +15% tiến độ cảnh giới');
        }
        break;
      case 'tuvirondan':
        if (resources.tuvirondan > 0) {
          useCultivationResource('tuvirondan', 1);
          setCurrentRealm(prev => ({ ...prev, progress: Math.min(100, prev.progress + 25) }));
          alert('Sử dụng Tu Vi Đan! +25% tiến độ cảnh giới');
        }
        break;
      case 'treasure':
        if (resources.treasures > 0) {
          useCultivationResource('treasures', 1);
          const experienceGain = 50 + Math.floor(Math.random() * 50);
          setResources(prev => ({ ...prev, experience: prev.experience + experienceGain }));
          alert(`Sử dụng Thiên Địa Bảo Vật! +${experienceGain} kinh nghiệm`);
        }
        break;
      case 'tiengoc':
        if (resources.tiengoc > 0 && currentRealm.step >= 1.5) {
          useCultivationResource('tiengoc', 1);
          setCurrentRealm(prev => ({ ...prev, progress: Math.min(100, prev.progress + 30) }));
          alert('Sử dụng Tiên Ngọc! +30% tiến độ cảnh giới');
        }
        break;
      case 'nguyenluc':
        if (resources.nguyenluc > 0 && currentRealm.step >= 2) {
          useCultivationResource('nguyenluc', 1);
          setCurrentRealm(prev => ({ ...prev, progress: Math.min(100, prev.progress + 35) }));
          alert('Sử dụng Nguyên Lực! +35% tiến độ cảnh giới');
        }
        break;
    }
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

  const getStepIcon = (step: number) => {
    if (step === 1) return <Target className="w-4 h-4 text-green-400" />;
    if (step === 1.5) return <Swords className="w-4 h-4 text-blue-400" />;
    if (step === 2) return <Star className="w-4 h-4 text-purple-400" />;
    if (step === 2.5) return <CloudLightning className="w-4 h-4 text-yellow-400" />;
    if (step === 3) return <Crown className="w-4 h-4 text-amber-400" />;
    if (step === 3.5) return <Eye className="w-4 h-4 text-cyan-400" />;
    if (step === 4) return <Infinity className="w-4 h-4 text-red-400" />;
    return <Target className="w-4 h-4" />;
  };

  const getStepColor = (step: number) => {
    if (step === 1) return 'text-green-400 border-green-400/30';
    if (step === 1.5) return 'text-blue-400 border-blue-400/30';
    if (step === 2) return 'text-purple-400 border-purple-400/30';
    if (step === 2.5) return 'text-yellow-400 border-yellow-400/30';
    if (step === 3) return 'text-amber-400 border-amber-400/30';
    if (step === 3.5) return 'text-cyan-400 border-cyan-400/30';
    if (step === 4) return 'text-red-400 border-red-400/30';
    return 'text-muted-foreground border-border/30';
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
              <div className="text-sm text-cultivator-gold">
                Tỷ lệ thành công: {tribulation.successRate}%
              </div>
              <div className="relative">
                <Cloud className="w-24 h-24 mx-auto text-gray-600 tribulation-cloud" />
                <CloudLightning className="w-16 h-16 absolute top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-bounce" />
              </div>
            </div>
          )}

          {tribulation.phase === 'lightning' && (
            <div className="space-y-4">
              <div className="text-lg text-white">
                Sấm sét thứ {tribulation.lightningCount + 1}/{tribulation.maxLightning}
              </div>
              <div className="text-sm text-cultivator-gold">
                Tỷ lệ thành công: {tribulation.successRate}%
              </div>
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-b from-purple-900 to-black rounded-full flex items-center justify-center">
                  <Zap className="w-16 h-16 text-yellow-300 tribulation-lightning" />
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 bg-yellow-300 lightning-strike"
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
                Đột phá lên cảnh giới {currentRealm.nextRealm}!
              </div>
              <Sparkles className="w-24 h-24 mx-auto text-yellow-400 animate-spin" />
            </div>
          )}

          {tribulation.phase === 'failure' && (
            <div className="space-y-4">
              <div className="text-xl text-red-400 animate-pulse">
                💥 ĐỘ KIẾP THẤT BẠI! 💥
              </div>
              <div className="text-lg text-red-300">
                Tu vi bị tổn thương -20%
              </div>
              <div className="text-sm text-muted-foreground">
                Lần thất bại: {tribulation.failureCount + 1}
              </div>
              <Skull className="w-24 h-24 mx-auto text-red-400 animate-bounce" />
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
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getStepIcon(currentRealm.step)}
                  <h3 className="text-xl font-bold text-spirit-jade">{currentRealm.name}</h3>
                </div>
                
                <div className={`text-xs px-2 py-1 rounded-full border inline-block mb-2 ${getStepColor(currentRealm.step)}`}>
                  {currentRealm.stepName}
                </div>
                
                <div className="text-sm text-muted-foreground mb-3">{currentRealm.description}</div>
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                    Tầng {currentRealm.level}/{currentRealm.maxLevel}
                  </Badge>
                  {currentRealm.nextRealm && (
                    <Badge variant="outline" className="border-mystical-purple text-mystical-purple">
                      Tiếp theo: {currentRealm.nextRealm}
                    </Badge>
                  )}
                </div>
                
                {/* Cultivation Requirements */}
                {currentRealm.minCultivationTime > 0 && (
                  <div className="text-xs text-muted-foreground mb-2">
                    <Timer className="w-3 h-3 inline mr-1" />
                    Yêu cầu: {currentRealm.minCultivationTime.toLocaleString()}h tu luyện 
                    <span className="text-cultivator-gold ml-1">
                      (Hiện tại: {resources.cultivationTime.toFixed(1)}h)
                    </span>
                  </div>
                )}
                
                {currentRealm.requiredItems.length > 0 && (
                  <div className="text-xs text-muted-foreground mb-2">
                    <Book className="w-3 h-3 inline mr-1" />
                    Cần: {currentRealm.requiredItems.join(', ')}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến độ tu luyện</span>
                  <span>{Math.min(currentRealm.progress, 100)}%</span>
                </div>
                <Progress value={Math.min(currentRealm.progress, 100)} className="h-3" />
                
                {/* Cultivation Boost Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => boostCultivation('lingdan')}
                    disabled={resources.lingdan === 0}
                    className="text-xs"
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    Linh Đan ({resources.lingdan})
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => boostCultivation('tuvirondan')}
                    disabled={resources.tuvirondan === 0}
                    className="text-xs"
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Tu Vi Đan ({resources.tuvirondan})
                  </Button>
                  {currentRealm.step >= 1.5 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => boostCultivation('tiengoc')}
                      disabled={resources.tiengoc === 0}
                      className="text-xs"
                    >
                      <Gem className="w-3 h-3 mr-1" />
                      Tiên Ngọc ({resources.tiengoc})
                    </Button>
                  )}
                  {currentRealm.step >= 2 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => boostCultivation('nguyenluc')}
                      disabled={resources.nguyenluc === 0}
                      className="text-xs"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Nguyên Lực ({resources.nguyenluc})
                    </Button>
                  )}
                </div>
                
                {/* Tribulation Section */}
                {currentRealm.level >= currentRealm.maxLevel && currentRealm.requiresTribulation && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-yellow-900/50 to-red-900/50 rounded-lg border border-yellow-600/50">
                    <div className="flex items-center gap-2 text-yellow-300 mb-2">
                      <CloudLightning className="w-5 h-5" />
                      <span className="font-semibold">
                        {currentRealm.progress >= 100 ? 'Sẵn sàng độ kiếp!' : 'Chuẩn bị độ kiếp...'}
                      </span>
                    </div>
                    
                    {currentRealm.progress < 100 && (
                      <div className="text-xs text-yellow-200 mb-2">
                        Cần đạt 100% tiến độ tu luyện (hiện tại: {currentRealm.progress}%)
                      </div>
                    )}
                    
                    <div className="text-xs text-yellow-200 mb-2">
                      Tỷ lệ thành công hiện tại: {40 + (resources.leidans > 0 ? 20 : 0) + (resources.dokiepfu > 0 ? 15 : 0) + (resources.tuvirondan > 0 ? 10 : 0)}%
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      {!canStartTribulation() && (
                        <div className="text-red-300">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          {currentRealm.progress < 100 && 'Chưa đủ tiến độ tu luyện! '}
                          {resources.cultivationTime < currentRealm.minCultivationTime && 'Chưa đủ thời gian tu luyện! '}
                        </div>
                      )}
                      {canStartTribulation() && (
                        <div className="text-green-300">
                          ✓ Đã đủ điều kiện độ kiếp!
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={startTribulation}
                      disabled={tribulation.isActive || !canStartTribulation()}
                      className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 text-white"
                    >
                      <Skull className="w-4 h-4 mr-2" />
                      {canStartTribulation() ? 'Bắt Đầu Độ Kiếp' : 'Chưa Đủ Điều Kiện'}
                    </Button>
                  </div>
                )}
              </div>

              {isCultivating ? (
                <div className="space-y-3">
                  <div className="text-center p-4 bg-gradient-cultivation rounded-lg cultivate-anim">
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
            
            <div className="space-y-4">
              {/* Basic Resources */}
              <div>
                <h3 className="text-sm font-medium text-cultivator-gold mb-3">Tài Nguyên Cơ Bản</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-spirit-jade">{resources.lingshi.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Linh Thạch</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-mystical-purple">{resources.lingqi}</div>
                    <div className="text-xs text-muted-foreground">Linh Khí</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-cultivator-gold">{resources.lingdan}</div>
                    <div className="text-xs text-muted-foreground">Linh Đan</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-400">{resources.experience}</div>
                    <div className="text-xs text-muted-foreground">Kinh Nghiệm</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-400">{resources.tuvirondan}</div>
                    <div className="text-xs text-muted-foreground">Tu Vi Đan</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-red-400">{resources.treasures}</div>
                    <div className="text-xs text-muted-foreground">Thiên Địa Bảo Vật</div>
                  </div>
                </div>
              </div>

              {/* Advanced Resources */}
              <div className="border-t border-border/50 pt-4">
                <h3 className="text-sm font-medium text-cultivator-gold mb-3">Tài Nguyên Cao Cấp</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-cyan-400">{resources.tienkhí}</div>
                    <div className="text-xs text-muted-foreground">Tiên Khí</div>
                    <div className="text-xs text-green-400">Anh Biến+</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-pink-400">{resources.tiengoc}</div>
                    <div className="text-xs text-muted-foreground">Tiên Ngọc</div>
                    <div className="text-xs text-green-400">Anh Biến+</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-orange-400">{resources.nguyenluc}</div>
                    <div className="text-xs text-muted-foreground">Nguyên Lực</div>
                    <div className="text-xs text-green-400">Nhị Bộ+</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-amber-400">{resources.huongHoa}</div>
                    <div className="text-xs text-muted-foreground">Hương Hỏa</div>
                    <div className="text-xs text-green-400">Tam Bộ+</div>
                  </div>
                </div>
              </div>

              {/* Tribulation Resources */}
              <div className="border-t border-border/50 pt-4">
                <h3 className="text-sm font-medium text-cultivator-gold mb-3">Vật Phẩm Độ Kiếp</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-yellow-400">{resources.leidans}</div>
                    <div className="text-xs text-muted-foreground">Lôi Đan</div>
                    <div className="text-xs text-green-400">+20% tỷ lệ thành công</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-400">{resources.dokiepfu}</div>
                    <div className="text-xs text-muted-foreground">Độ Kiếp Phù</div>
                    <div className="text-xs text-green-400">+15% tỷ lệ thành công</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-cyan-400">{resources.tamphaph}</div>
                    <div className="text-xs text-muted-foreground">Tâm Pháp</div>
                    <div className="text-xs text-blue-400">Mở khóa cảnh giới</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-orange-400">{resources.kinhvan}</div>
                    <div className="text-xs text-muted-foreground">Kinh Văn</div>
                    <div className="text-xs text-blue-400">Yêu cầu đột phá</div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="border-t border-border/50 pt-4">
                <h3 className="text-sm font-medium text-cultivator-gold mb-3">Thống Kê Tu Luyện</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-cultivator-gold">{resources.cultivationTime.toLocaleString()}h</div>
                    <div className="text-xs text-muted-foreground">Thời Gian Tu Luyện</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-bold text-spirit-jade">{resources.activityPoints}</div>
                    <div className="text-xs text-muted-foreground">Điểm Hoạt Lực</div>
                  </div>
                </div>
              </div>

              {/* Cultivation Tips */}
              <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                <div className="text-sm font-medium mb-2">Hướng Dẫn Tu Luyện:</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• <strong>Bước 1:</strong> Ngưng Khí → Trúc Cơ → Kết Đan → Nguyên Anh → Hoá Thần → Anh Biến → Vấn Đỉnh</div>
                  <div>• <strong>Quá độ:</strong> Âm Hư Dương Thực - chuyển hóa thành nguyên lực</div>
                  <div>• <strong>Bước 2:</strong> Khuy Niết → Tịnh Niết → Toái Niết - nắm giữ quy tắc</div>
                  <div>• <strong>Bước 3:</strong> Không Niết → Không Linh → Không Huyền → Huyền Kiếp → Không Kiếp → Đại Thiên Tôn</div>
                  <div>• <strong>Bước 4:</strong> Đạp Thiên Cảnh - siêu thoát thiên đạo</div>
                  <div>• Tiên Ngọc cần thiết từ Anh Biến, Nguyên Lực từ bước 2, Hương Hỏa từ bước 3</div>
                  <div>• Lôi Đan và Độ Kiếp Phù tăng tỷ lệ thành công độ kiếp</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CultivationSystem;
