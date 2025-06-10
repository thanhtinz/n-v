
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sword, 
  Shield, 
  Zap, 
  Flame, 
  Crown, 
  Star,
  ChevronRight,
  Eye,
  Mountain,
  Moon
} from 'lucide-react';

interface Sect {
  id: 'thien_kiem' | 'anh_vu' | 'thien_am' | 'loi_tong' | 'huyet_ma' | 'van_mong' | 'huyen_vu' | 'xich_diem';
  name: string;
  description: string;
  characteristics: string[];
  weapon: string;
  element: string;
  difficulty: 'Dễ' | 'Trung Bình' | 'Khó';
  icon: any;
  color: string;
  bgGradient: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
    magic: number;
  };
}

interface SectSelectionProps {
  onSectSelect: (sectId: string) => void;
  onBack: () => void;
}

const SectSelection = ({ onSectSelect, onBack }: SectSelectionProps) => {
  const [selectedSect, setSelectedSect] = useState<string | null>(null);

  const sects: Sect[] = [
    {
      id: 'thien_kiem',
      name: 'Thiên Kiếm Tông',
      description: 'Tông môn kiếm đạo cổ xưa, chuyên về tấn công nhanh và sát thương cao.',
      characteristics: ['Tấn công mạnh', 'Tốc độ cao', 'Kỹ năng kiếm thuật'],
      weapon: 'Kiếm',
      element: 'Kim',
      difficulty: 'Trung Bình',
      icon: Sword,
      color: 'text-red-400',
      bgGradient: 'from-red-500/20 to-orange-500/20',
      stats: { attack: 95, defense: 60, speed: 85, magic: 70 }
    },
    {
      id: 'anh_vu',
      name: 'Ảnh Vũ Môn',
      description: 'Môn phái ám sát bí ẩn, chuyên về tốc độ và tấn công bất ngờ.',
      characteristics: ['Tàng hình', 'Tốc độ cực cao', 'Sát thương chí mạng'],
      weapon: 'Song Đao',
      element: 'Phong',
      difficulty: 'Khó',
      icon: Eye,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-blue-500/20',
      stats: { attack: 90, defense: 45, speed: 100, magic: 75 }
    },
    {
      id: 'thien_am',
      name: 'Thiên Âm Cung',
      description: 'Tông môn âm nhạc và tinh thần, sử dụng âm sóng chiến đấu.',
      characteristics: ['Hỗ trợ đồng đội', 'Kiểm soát tinh thần', 'Điều trị'],
      weapon: 'Cầm',
      element: 'Âm',
      difficulty: 'Trung Bình',
      icon: Moon,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      stats: { attack: 70, defense: 80, speed: 75, magic: 95 }
    },
    {
      id: 'loi_tong',
      name: 'Lôi Tông',
      description: 'Tông môn sấm sét mạnh mẽ, sử dụng sức mạnh thiên nhiên.',
      characteristics: ['Sát thương diện rộng', 'Sức mạnh sấm sét', 'Khống chế'],
      weapon: 'Búa Sấm',
      element: 'Lôi',
      difficulty: 'Trung Bình',
      icon: Zap,
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/20 to-orange-500/20',
      stats: { attack: 85, defense: 75, speed: 65, magic: 90 }
    },
    {
      id: 'huyet_ma',
      name: 'Huyết Ma Giáo',
      description: 'Ma giáo tà ác, sử dụng sức mạnh máu và bóng tối.',
      characteristics: ['Hút máu hồi phục', 'Sát thương ma thuật', 'Triệu hồi'],
      weapon: 'Ma Kiếm',
      element: 'Ma',
      difficulty: 'Khó',
      icon: Flame,
      color: 'text-red-600',
      bgGradient: 'from-red-600/20 to-black/20',
      stats: { attack: 100, defense: 55, speed: 80, magic: 95 }
    },
    {
      id: 'van_mong',
      name: 'Vân Mộng Cốc',
      description: 'Thung lũng huyền bí, chuyên về thuật điều khiển mộng境.',
      characteristics: ['Ảo thuật', 'Kiểm soát ý thức', 'Phòng thủ mạnh'],
      weapon: 'Phất Trần',
      element: 'Mộng',
      difficulty: 'Khó',
      icon: Star,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      stats: { attack: 75, defense: 90, speed: 70, magic: 100 }
    },
    {
      id: 'huyen_vu',
      name: 'Huyền Vũ Tông',
      description: 'Tông môn thủ thuật cổ truyền, cân bằng giữa tấn công và phòng thủ.',
      characteristics: ['Cân bằng toàn diện', 'Phòng thủ vững chắc', 'Phản đòn'],
      weapon: 'Khiên Kiếm',
      element: 'Thổ',
      difficulty: 'Dễ',
      icon: Shield,
      color: 'text-gray-400',
      bgGradient: 'from-gray-500/20 to-stone-500/20',
      stats: { attack: 80, defense: 95, speed: 60, magic: 75 }
    },
    {
      id: 'xich_diem',
      name: 'Xích Diệm Cung',
      description: 'Cung điện lửa thiêng, làm chủ sức mạnh hỏa diệm.',
      characteristics: ['Sát thương lửa', 'Đốt cháy địch', 'Tấn công tầm xa'],
      weapon: 'Cung Lửa',
      element: 'Hỏa',
      difficulty: 'Trung Bình',
      icon: Flame,
      color: 'text-orange-400',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      stats: { attack: 90, defense: 65, speed: 80, magic: 85 }
    }
  ];

  const handleSelectSect = (sectId: string) => {
    setSelectedSect(sectId);
  };

  const handleConfirmSelection = () => {
    if (selectedSect) {
      onSectSelect(selectedSect);
    }
  };

  const selectedSectData = sects.find(s => s.id === selectedSect);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div className="relative z-10 p-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-cultivator-gold mb-4">
              Chọn Tông Môn Tu Luyện
            </h1>
            <p className="text-lg text-amber-200">
              Sau khi hoàn thành hành trình khởi đầu, hãy chọn tông môn phù hợp với lối tu luyện của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sect List */}
            <div className="lg:col-span-2">
              <ScrollArea className="h-[600px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sects.map((sect) => {
                    const IconComponent = sect.icon;
                    const isSelected = selectedSect === sect.id;
                    
                    return (
                      <Card 
                        key={sect.id}
                        className={`p-4 cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-2 border-cultivator-gold bg-gradient-to-br ' + sect.bgGradient + ' scale-105' 
                            : 'hover:scale-102 bg-card/60 backdrop-blur-sm border-border/30'
                        }`}
                        onClick={() => handleSelectSect(sect.id)}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${sect.bgGradient}`}>
                            <IconComponent className={`w-6 h-6 ${sect.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-foreground">{sect.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {sect.element}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {sect.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {sect.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">Đặc điểm:</div>
                          <div className="flex flex-wrap gap-1">
                            {sect.characteristics.slice(0, 2).map((char, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {char}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Selected Sect Details */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-card/80 backdrop-blur-sm sticky top-4">
                {selectedSectData ? (
                  <>
                    <div className="text-center mb-6">
                      <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${selectedSectData.bgGradient} mb-4`}>
                        <selectedSectData.icon className={`w-12 h-12 ${selectedSectData.color}`} />
                      </div>
                      <h2 className="text-2xl font-bold text-cultivator-gold mb-2">
                        {selectedSectData.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedSectData.description}
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-medium mb-2">Thông Tin:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Vũ khí: <span className="text-spirit-jade">{selectedSectData.weapon}</span></div>
                          <div>Nguyên tố: <span className="text-mystical-purple">{selectedSectData.element}</span></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Đặc điểm:</h4>
                        <div className="space-y-1">
                          {selectedSectData.characteristics.map((char, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1 h-1 bg-cultivator-gold rounded-full"></div>
                              {char}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Chỉ Số:</h4>
                        <div className="space-y-2">
                          {Object.entries(selectedSectData.stats).map(([stat, value]) => {
                            const statNames = {
                              attack: 'Tấn Công',
                              defense: 'Phòng Thủ', 
                              speed: 'Tốc Độ',
                              magic: 'Pháp Thuật'
                            };
                            return (
                              <div key={stat} className="flex items-center justify-between text-sm">
                                <span>{statNames[stat as keyof typeof statNames]}:</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-2 bg-muted rounded-full">
                                    <div 
                                      className="h-full bg-gradient-to-r from-spirit-jade to-cultivator-gold rounded-full"
                                      style={{ width: `${value}%` }}
                                    />
                                  </div>
                                  <span className="font-medium">{value}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleConfirmSelection}
                      className="w-full bg-gradient-to-r from-cultivator-gold to-spirit-jade hover:from-spirit-jade hover:to-cultivator-gold text-black font-bold py-3"
                    >
                      Gia Nhập {selectedSectData.name}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Mountain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-lg mb-2">Chọn Tông Môn</h3>
                    <p className="text-sm text-muted-foreground">
                      Hãy chọn một tông môn từ danh sách bên trái để xem chi tiết
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <Button variant="outline" onClick={onBack}>
              Quay Lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectSelection;
