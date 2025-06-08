
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
  Gem
} from 'lucide-react';

interface Sect {
  id: string;
  name: string;
  description: string;
  level: number;
  members: number;
  maxMembers: number;
  power: number;
  requirements: {
    minLevel: number;
    minRealm: string;
  };
  benefits: string[];
  leader: string;
  type: 'righteous' | 'demonic' | 'neutral';
}

interface SectMember {
  name: string;
  realm: string;
  level: number;
  contribution: number;
  position: string;
  online: boolean;
}

const SectSystem = () => {
  const [currentSect, setCurrentSect] = useState<string | null>(null);
  const [availableSects] = useState<Sect[]>([
    {
      id: 'azure-cloud',
      name: 'Thanh Vân Tông',
      description: 'Tông môn chính đạo nổi tiếng với pháp thuật phong lôi',
      level: 15,
      members: 85,
      maxMembers: 100,
      power: 50000,
      requirements: { minLevel: 5, minRealm: 'Luyện Khí' },
      benefits: ['Tăng 20% EXP tu luyện', 'Học pháp thuật Phong Lôi', 'Kho báu tông môn'],
      leader: 'Thanh Vân Tử',
      type: 'righteous'
    },
    {
      id: 'blood-moon',
      name: 'Huyết Nguyệt Ma Tông',
      description: 'Ma tông hùng mạnh chuyên tu luyện tà thuật',
      level: 12,
      members: 67,
      maxMembers: 80,
      power: 35000,
      requirements: { minLevel: 8, minRealm: 'Trúc Cơ' },
      benefits: ['Tăng 30% sát thương PvP', 'Học ma công', 'Nhiệm vụ ma tông'],
      leader: 'Huyết Ma Tiên',
      type: 'demonic'
    },
    {
      id: 'jade-mountain',
      name: 'Bích Sơn Phái',
      description: 'Phái trung lập chú trọng luyện đan và chế tạo',
      level: 8,
      members: 45,
      maxMembers: 60,
      power: 20000,
      requirements: { minLevel: 3, minRealm: 'Phàm Nhân' },
      benefits: ['Giảm 50% chi phí luyện đan', 'Học kỹ năng chế tạo', 'Giao dịch nội bộ'],
      leader: 'Bích Sơn Trưởng Lão',
      type: 'neutral'
    }
  ]);

  const [sectMembers] = useState<SectMember[]>([
    { name: 'Thanh Vân Tử', realm: 'Hóa Thần', level: 45, contribution: 15000, position: 'Chưởng Môn', online: true },
    { name: 'Phong Lôi Đại Đệ', realm: 'Nguyên Anh', level: 35, contribution: 8500, position: 'Trưởng Lão', online: true },
    { name: 'Kiếm Tâm', realm: 'Kim Đan', level: 28, contribution: 5200, position: 'Đại Đệ Tử', online: false },
    { name: 'Tu Tiên Giả', realm: 'Phàm Nhân', level: 1, contribution: 0, position: 'Mới Nhập Môn', online: true }
  ]);

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
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {currentSect ? (
        // Current Sect View
        <Tabs defaultValue="overview" className="space-y-3 sm:space-y-4">
          <Card className="p-1 sm:p-2 bg-card/50 backdrop-blur-sm border-border/50">
            <TabsList className="grid w-full grid-cols-4 bg-transparent gap-1">
              <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-primary/20">
                Tổng Quan
              </TabsTrigger>
              <TabsTrigger value="members" className="text-xs data-[state=active]:bg-primary/20">
                Thành Viên
              </TabsTrigger>
              <TabsTrigger value="missions" className="text-xs data-[state=active]:bg-primary/20">
                Nhiệm Vụ
              </TabsTrigger>
              <TabsTrigger value="warehouse" className="text-xs data-[state=active]:bg-primary/20">
                Kho Báu
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="overview">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold">Thanh Vân Tông</h2>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    Chính Đạo
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-cultivator-gold">Lv.15</div>
                    <div className="text-xs text-muted-foreground">Cấp Tông</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-spirit-jade">85/100</div>
                    <div className="text-xs text-muted-foreground">Thành Viên</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-yellow-400">50K</div>
                    <div className="text-xs text-muted-foreground">Lực Chiến</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-purple-400">150</div>
                    <div className="text-xs text-muted-foreground">Cống Hiến</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-cultivator-gold">Đặc Quyền Tông Môn</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Tăng 20% EXP tu luyện</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <span>Học pháp thuật Phong Lôi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gem className="w-4 h-4 text-purple-400" />
                      <span>Kho báu tông môn</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentSect(null)}
                  variant="outline"
                  className="w-full"
                >
                  Rời Tông Môn
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 text-cultivator-gold">Danh Sách Thành Viên</h3>
              <div className="space-y-3">
                {sectMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${member.online ? 'bg-green-400' : 'bg-gray-400'}`} />
                      <div>
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.realm} • Lv.{member.level} • {member.position}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-400">{member.contribution}</div>
                      <div className="text-xs text-muted-foreground">Cống Hiến</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="missions">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 text-cultivator-gold">Nhiệm Vụ Tông Môn</h3>
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nhiệm vụ tông môn đang được chuẩn bị...</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="warehouse">
            <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 text-cultivator-gold">Kho Báu Tông Môn</h3>
              <div className="text-center py-8 text-muted-foreground">
                <Gem className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Kho báu tông môn đang được thiết lập...</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // Sect Selection View
        <div className="space-y-3 sm:space-y-4">
          <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
            <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold mb-3">Gia Nhập Tông Môn</h2>
            <p className="text-sm text-muted-foreground">
              Chọn tông môn phù hợp để cùng tu luyện và nhận được những đặc quyền mạnh mẽ!
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
                      <div className="text-sm font-medium text-yellow-400">{sect.power.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Lực Chiến</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{sect.description}</p>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Thành viên</div>
                      <Progress value={(sect.members / sect.maxMembers) * 100} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">{sect.members}/{sect.maxMembers}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Yêu cầu</div>
                      <div className="text-xs">
                        Lv.{sect.requirements.minLevel} • {sect.requirements.minRealm}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Đặc quyền:</div>
                    <div className="space-y-1">
                      {sect.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Crown className="w-3 h-3" />
                      <span>Chưởng môn: {sect.leader}</span>
                    </div>
                    <Button
                      onClick={() => joinSect(sect.id)}
                      className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                      size="sm"
                    >
                      Gia Nhập
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
