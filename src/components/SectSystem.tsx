
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Crown, 
  Star, 
  Gift, 
  Swords, 
  BookOpen, 
  Mountain,
  Shield,
  Gem,
  GraduationCap,
  Target,
  Zap,
  Award,
  Scroll
} from 'lucide-react';

interface Sect {
  id: string;
  name: string;
  description: string;
  type: 'righteous' | 'demonic' | 'neutral';
  level: number;
  disciples: number;
  maxDisciples: number;
  masterName: string;
  teachings: string[];
  cultivationBonus: number;
  requirements: {
    minLevel: number;
    minRealm: string;
  };
  skills: SectSkill[];
  missions: SectMission[];
}

interface SectSkill {
  id: string;
  name: string;
  description: string;
  type: 'combat' | 'cultivation' | 'alchemy' | 'formation';
  level: number;
  maxLevel: number;
  learningCost: number;
  prerequisite?: string;
}

interface SectMission {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  rewards: {
    exp: number;
    sectContribution: number;
    items?: string[];
  };
  requirements: {
    minLevel: number;
    skills?: string[];
  };
  completed: boolean;
}

const SectSystem = () => {
  const [currentSect, setCurrentSect] = useState<string | null>('azure-cloud');
  const [sectContribution, setSectContribution] = useState(1250);
  const [sectRank, setSectRank] = useState('Nội Môn Đệ Tử');

  const availableSects: Sect[] = [
    {
      id: 'azure-cloud',
      name: 'Thanh Vân Tông',
      description: 'Tông môn chính đạo chuyên tu luyện kiếm thuật và phong lôi pháp',
      type: 'righteous',
      level: 15,
      disciples: 450,
      maxDisciples: 500,
      masterName: 'Thanh Vân Chân Nhân',
      teachings: ['Thanh Vân Kiếm Pháp', 'Phong Lôi Tâm Kinh', 'Thiên Địa Vô Cực'],
      cultivationBonus: 25,
      requirements: { minLevel: 5, minRealm: 'Luyện Khí' },
      skills: [
        {
          id: 'azure-sword',
          name: 'Thanh Vân Kiếm Pháp',
          description: 'Tăng 30% sát thương kiếm thuật',
          type: 'combat',
          level: 3,
          maxLevel: 10,
          learningCost: 500,
        },
        {
          id: 'thunder-technique',
          name: 'Phong Lôi Thuật',
          description: 'Tăng 25% sát thương nguyên tố phong/lôi',
          type: 'combat',
          level: 2,
          maxLevel: 8,
          learningCost: 800,
          prerequisite: 'azure-sword'
        }
      ],
      missions: [
        {
          id: 'daily-cultivation',
          name: 'Tu Luyện Hàng Ngày',
          description: 'Hoàn thành 3 lần tu luyện trong ngày',
          difficulty: 'easy',
          rewards: { exp: 1000, sectContribution: 50 },
          requirements: { minLevel: 1 },
          completed: false
        }
      ]
    },
    {
      id: 'blood-moon',
      name: 'Huyết Nguyệt Ma Tông',
      description: 'Ma tông chuyên tu luyện huyết ma công và tà thuật',
      type: 'demonic',
      level: 12,
      disciples: 280,
      maxDisciples: 300,
      masterName: 'Huyết Ma Tôn Giả',
      teachings: ['Huyết Ma Đại Pháp', 'Tà Linh Tâm Kinh', 'Ma Khí Phần Thân'],
      cultivationBonus: 35,
      requirements: { minLevel: 10, minRealm: 'Trúc Cơ' },
      skills: [
        {
          id: 'blood-technique',
          name: 'Huyết Ma Công',
          description: 'Hút HP từ kẻ thù khi tấn công',
          type: 'combat',
          level: 1,
          maxLevel: 10,
          learningCost: 1000,
        }
      ],
      missions: []
    },
    {
      id: 'jade-mountain',
      name: 'Bích Sơn Phái',
      description: 'Phái trung lập chuyên về luyện đan và trận pháp',
      type: 'neutral',
      level: 8,
      disciples: 200,
      maxDisciples: 250,
      masterName: 'Bích Sơn Trưởng Lão',
      teachings: ['Luyện Đan Thuật', 'Trận Pháp Đại Toàn', 'Thiên Địa Linh Khí'],
      cultivationBonus: 20,
      requirements: { minLevel: 3, minRealm: 'Phàm Nhân' },
      skills: [
        {
          id: 'alchemy',
          name: 'Luyện Đan Thuật',
          description: 'Tăng 50% hiệu quả luyện đan',
          type: 'alchemy',
          level: 2,
          maxLevel: 12,
          learningCost: 600,
        }
      ],
      missions: []
    }
  ];

  const getSectTypeColor = (type: string) => {
    switch (type) {
      case 'righteous': return 'text-blue-400 border-blue-400';
      case 'demonic': return 'text-red-400 border-red-400';
      case 'neutral': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getSectTypeIcon = (type: string) => {
    switch (type) {
      case 'righteous': return <Shield className="w-4 h-4" />;
      case 'demonic': return <Swords className="w-4 h-4" />;
      case 'neutral': return <Mountain className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const joinSect = (sectId: string) => {
    setCurrentSect(sectId);
    setSectContribution(0);
    setSectRank('Ngoại Môn Đệ Tử');
  };

  const leaveSect = () => {
    setCurrentSect(null);
    setSectContribution(0);
    setSectRank('');
  };

  const currentSectData = availableSects.find(sect => sect.id === currentSect);

  const learnSkill = (skillId: string) => {
    console.log(`Learning skill: ${skillId}`);
  };

  const completeTypeMission = (missionId: string) => {
    console.log(`Completing mission: ${missionId}`);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {currentSect && currentSectData ? (
        // Current Sect View
        <Tabs defaultValue="overview" className="space-y-3 sm:space-y-4">
          <Card className="p-1 sm:p-2 bg-card/50 backdrop-blur-sm border-border/50">
            <TabsList className="grid w-full grid-cols-4 bg-transparent gap-1">
              <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-primary/20">
                Tổng Quan
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-xs data-[state=active]:bg-primary/20">
                Học Võ
              </TabsTrigger>
              <TabsTrigger value="missions" className="text-xs data-[state=active]:bg-primary/20">
                Nhiệm Vụ
              </TabsTrigger>
              <TabsTrigger value="library" className="text-xs data-[state=active]:bg-primary/20">
                Tàng Kinh Các
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="overview">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold">{currentSectData.name}</h2>
                  <Badge variant="outline" className={getSectTypeColor(currentSectData.type)}>
                    {currentSectData.type === 'righteous' ? 'Chính Đạo' : 
                     currentSectData.type === 'demonic' ? 'Ma Đạo' : 'Trung Lập'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-cultivator-gold">Lv.{currentSectData.level}</div>
                    <div className="text-xs text-muted-foreground">Cấp Tông</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-spirit-jade">{currentSectData.disciples}/{currentSectData.maxDisciples}</div>
                    <div className="text-xs text-muted-foreground">Đệ Tử</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-yellow-400">+{currentSectData.cultivationBonus}%</div>
                    <div className="text-xs text-muted-foreground">Tu Luyện</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-purple-400">{sectContribution}</div>
                    <div className="text-xs text-muted-foreground">Cống Hiến</div>
                  </div>
                </div>

                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-cultivator-gold" />
                    <span className="font-medium text-cultivator-gold">Cấp Bậc Đệ Tử</span>
                  </div>
                  <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                    {sectRank}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-cultivator-gold flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Chưởng Môn: {currentSectData.masterName}
                  </h3>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-cultivator-gold">Môn Phái Truyền Thừa</h3>
                  <div className="space-y-2">
                    {currentSectData.teachings.map((teaching, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span>{teaching}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={leaveSect}
                    variant="outline"
                    className="flex-1"
                  >
                    Rời Tông Môn
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                  >
                    Thăng Cấp Đệ Tử
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 text-cultivator-gold flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Học Võ Công
              </h3>
              <div className="space-y-3">
                {currentSectData.skills.map((skill) => (
                  <div key={skill.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{skill.name}</h4>
                      <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                        {skill.level}/{skill.maxLevel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                    <div className="mb-3">
                      <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Chi phí: {skill.learningCost} Cống hiến
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => learnSkill(skill.id)}
                        disabled={sectContribution < skill.learningCost || skill.level >= skill.maxLevel}
                      >
                        {skill.level >= skill.maxLevel ? 'Đã Đạt Cực Hạn' : 'Học Võ'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="missions">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 text-cultivator-gold flex items-center gap-2">
                <Target className="w-5 h-5" />
                Nhiệm Vụ Tông Môn
              </h3>
              <div className="space-y-3">
                {currentSectData.missions.map((mission) => (
                  <div key={mission.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{mission.name}</h4>
                      <Badge variant="outline" className={
                        mission.difficulty === 'easy' ? 'border-green-500 text-green-500' :
                        mission.difficulty === 'medium' ? 'border-yellow-500 text-yellow-500' :
                        mission.difficulty === 'hard' ? 'border-orange-500 text-orange-500' :
                        'border-red-500 text-red-500'
                      }>
                        {mission.difficulty === 'easy' ? 'Dễ' :
                         mission.difficulty === 'medium' ? 'Trung Bình' :
                         mission.difficulty === 'hard' ? 'Khó' : 'Cực Khó'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-yellow-400">+{mission.rewards.exp} EXP</span>
                        <span className="text-purple-400 ml-2">+{mission.rewards.sectContribution} Cống hiến</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => completeTypeMission(mission.id)}
                        disabled={mission.completed}
                      >
                        {mission.completed ? 'Đã Hoàn Thành' : 'Nhận Nhiệm Vụ'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="library">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 text-cultivator-gold flex items-center gap-2">
                <Scroll className="w-5 h-5" />
                Tàng Kinh Các
              </h3>
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Tàng kinh các đang được sắp xếp...</p>
                <p className="text-sm mt-2">Nơi lưu trữ các bí tịch và kinh điển của tông môn</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // Sect Selection View
        <div className="space-y-3 sm:space-y-4">
          <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
            <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold mb-3 flex items-center gap-2">
              <Mountain className="w-5 h-5" />
              Gia Nhập Tông Môn
            </h2>
            <p className="text-sm text-muted-foreground">
              Tông môn là nơi học tập và rèn luyện được các bậc tiền bối sáng lập. Chọn tông môn phù hợp để học hỏi võ công và nhận được sự truyền thừa!
            </p>
          </Card>

          <div className="grid gap-3 sm:gap-4">
            {availableSects.map((sect) => (
              <Card key={sect.id} className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-cultivator-gold/50 transition-colors">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {getSectTypeIcon(sect.type)}
                      <h3 className="font-semibold text-base sm:text-lg">{sect.name}</h3>
                      <Badge variant="outline" className={`text-xs ${getSectTypeColor(sect.type)}`}>
                        Lv.{sect.level}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-400">+{sect.cultivationBonus}%</div>
                      <div className="text-xs text-muted-foreground">Tu Luyện</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{sect.description}</p>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Đệ tử</div>
                      <Progress value={(sect.disciples / sect.maxDisciples) * 100} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">{sect.disciples}/{sect.maxDisciples}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Yêu cầu</div>
                      <div className="text-xs">
                        Lv.{sect.requirements.minLevel} • {sect.requirements.minRealm}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Truyền thừa:</div>
                    <div className="space-y-1">
                      {sect.teachings.slice(0, 2).map((teaching, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{teaching}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Crown className="w-3 h-3" />
                      <span>Chưởng môn: {sect.masterName}</span>
                    </div>
                    <Button
                      onClick={() => joinSect(sect.id)}
                      className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                      size="sm"
                    >
                      Bái Sư
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectSystem;
