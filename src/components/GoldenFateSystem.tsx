
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Star, 
  Clock, 
  Users, 
  Sparkles, 
  Eye,
  Globe,
  Timer,
  Gift,
  Zap,
  AlertCircle
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

const GoldenFateSystem = () => {
  const { gameState, addNotification } = useGameState();
  const [nextSelection, setNextSelection] = useState(5.2); // days
  const [currentChosen, setCurrentChosen] = useState(null);
  const [isInFateRealm, setIsInFateRealm] = useState(false);
  const [fateTimeLeft, setFateTimeLeft] = useState(0); // minutes

  const selectionCriteria = [
    { name: 'Tu Đạo Chân Tâm', weight: 30, description: 'Không gian lận, chơi honest' },
    { name: 'Hoạt Động Tích Cực', weight: 25, description: 'Tham gia events, giúp đỡ người khác' },
    { name: 'Trình Độ Tu Luyện', weight: 20, description: 'Level và cultivation progress' },
    { name: 'Đạo Đức Trong Game', weight: 15, description: 'Không PK vô lý, fair play' },
    { name: 'Ngẫu Nhiên Thiên Định', weight: 10, description: 'Yếu tố may mắn' }
  ];

  const currentChosenPlayer = {
    name: 'Kiếm Thánh Vô Danh',
    level: 67,
    cultivation: 'Kim Đan Cảnh',
    server: 'Thiên Cơ',
    timeSelected: '2024-12-08 14:30:00',
    choices: [
      { description: 'Mở cổng đến Bí Cảnh mới', impact: 'Toàn server có thể khám phá map mới', chosen: true },
      { description: 'Triệu hồi Boss Thượng Cổ', impact: 'Server boss xuất hiện 3 ngày', chosen: false },
      { description: 'Ban phước toàn server', impact: '+50% EXP cho tất cả trong 1 tuần', chosen: false }
    ]
  };

  const fateRealms = [
    {
      name: 'Thiên Cơ Điện',
      description: 'Cung điện của các vị thần, nơi quyết định vận mệnh',
      choices: 3,
      impact: 'Ảnh hưởng toàn server',
      rarity: 'Huyền Thoại'
    },
    {
      name: 'Vô Gian Hư Không',
      description: 'Không gian ngoài thời gian, nhìn thấy quá khứ tương lai',
      choices: 5,
      impact: 'Thay đổi timeline',
      rarity: 'Thần Thoại'
    },
    {
      name: 'Luân Hồi Điện',
      description: 'Nơi quản lý sinh tử và luân hồi',
      choices: 4,
      impact: 'Hồi sinh boss cũ',
      rarity: 'Cực Hiếm'
    }
  ];

  const weeklyHistory = [
    {
      week: 'Tuần 1',
      chosen: 'Phong Thần Tử',
      choice: 'Mở Cổng Địa Ngục',
      result: 'Demon Boss xuất hiện, server united để đánh bại',
      participants: 15420
    },
    {
      week: 'Tuần 2', 
      chosen: 'Băng Hoa Tiên Tử',
      choice: 'Ban Phước Thiên Thời',
      result: 'Toàn server +100% cultivation speed 3 ngày',
      participants: 18350
    },
    {
      week: 'Tuần 3',
      chosen: 'Long Vương Truyền Nhân',
      choice: 'Mở Long Cung Bảo Khố',
      result: 'Rare items drop rate tăng 500% trong 5 ngày',
      participants: 22100
    }
  ];

  const enterFateRealm = () => {
    setIsInFateRealm(true);
    setFateTimeLeft(30); // 30 minutes
    addNotification('Chúc mừng! Ngươi được chọn cho Kỳ Ngộ Hoàng Kim!', 'success');
  };

  const makeChoice = (choiceIndex: number) => {
    addNotification('Lựa chọn của ngươi sẽ ảnh hưởng toàn server!', 'info');
    // Simulate choice impact
  };

  useEffect(() => {
    // Countdown for next selection
    const timer = setInterval(() => {
      setNextSelection(prev => prev > 0 ? prev - 0.001 : 7);
    }, 60000);

    // Fate realm timer
    if (isInFateRealm && fateTimeLeft > 0) {
      const fateTimer = setInterval(() => {
        setFateTimeLeft(prev => prev > 0 ? prev - 1 : 0);
      }, 60000);
      return () => clearInterval(fateTimer);
    }

    return () => clearInterval(timer);
  }, [isInFateRealm, fateTimeLeft]);

  const formatTimeLeft = (days: number) => {
    const hours = Math.floor((days % 1) * 24);
    const minutes = Math.floor(((days % 1) * 24 % 1) * 60);
    return `${Math.floor(days)} ngày ${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/20 to-spirit-jade/20 border-cultivator-gold/30">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-cultivator-gold" />
          <h3 className="font-semibold text-cultivator-gold">Kỳ Ngộ Hoàng Kim</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Chỉ 1 người được chọn mỗi tuần để quyết định vận mệnh toàn server.
        </p>
      </Card>

      {/* If player is in fate realm */}
      {isInFateRealm && (
        <Card className="p-6 bg-gradient-to-r from-cultivator-gold/30 to-spirit-jade/30 border-cultivator-gold/50">
          <div className="text-center mb-4">
            <Crown className="w-16 h-16 text-cultivator-gold mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-cultivator-gold">Thiên Cơ Điện</h3>
            <p className="text-muted-foreground">Ngươi đã được chọn! Hãy quyết định vận mệnh server.</p>
          </div>

          <div className="text-center mb-4">
            <div className="text-xl font-bold text-red-400 mb-2">
              Thời gian còn lại: {fateTimeLeft} phút
            </div>
            <Progress value={(30 - fateTimeLeft) / 30 * 100} className="h-3" />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Chọn Vận Mệnh Server:</h4>
            {currentChosenPlayer.choices.map((choice, index) => (
              <Card key={index} className="p-3 cursor-pointer hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cultivator-gold/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-cultivator-gold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">{choice.description}</div>
                    <div className="text-sm text-muted-foreground">{choice.impact}</div>
                  </div>
                  <Button size="sm" onClick={() => makeChoice(index)}>
                    Chọn
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Hiện Tại</TabsTrigger>
          <TabsTrigger value="criteria">Tiêu Chí</TabsTrigger>
          <TabsTrigger value="history">Lịch Sử</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="space-y-4">
            <Card className="p-4">
              <div className="text-center mb-4">
                <Timer className="w-12 h-12 text-divine-blue mx-auto mb-2" />
                <h3 className="text-xl font-bold">Lựa Chọn Tiếp Theo</h3>
                <div className="text-2xl font-bold text-divine-blue mt-2">
                  {formatTimeLeft(nextSelection)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Users className="w-6 h-6 text-mystical-purple mx-auto mb-1" />
                  <div className="font-medium">2,847</div>
                  <div className="text-xs text-muted-foreground">Ứng viên tiềm năng</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Eye className="w-6 h-6 text-spirit-jade mx-auto mb-1" />
                  <div className="font-medium">AI Quan Sát</div>
                  <div className="text-xs text-muted-foreground">Đang phân tích</div>
                </div>
              </div>

              {!isInFateRealm && (
                <div className="text-center">
                  <Button onClick={enterFateRealm} disabled className="w-full">
                    <Crown className="w-4 h-4 mr-2" />
                    Đợi Được Chọn (Demo)
                  </Button>
                </div>
              )}
            </Card>

            {/* Current chosen player */}
            <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 border-cultivator-gold/30">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-cultivator-gold" />
                Người Được Chọn Tuần Này
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cultivator-gold to-spirit-jade rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">{currentChosenPlayer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Level {currentChosenPlayer.level} • {currentChosenPlayer.cultivation}
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-card/50 rounded-lg">
                <div className="font-medium text-green-400 mb-1">Lựa chọn đã thực hiện:</div>
                <div className="text-sm">{currentChosenPlayer.choices.find(c => c.chosen)?.description}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ảnh hưởng: {currentChosenPlayer.choices.find(c => c.chosen)?.impact}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="criteria">
          <Card className="p-4">
            <h4 className="font-medium mb-4">Tiêu Chí Lựa Chọn</h4>
            <div className="space-y-3">
              {selectionCriteria.map((criteria, index) => (
                <div key={index} className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{criteria.name}</span>
                    <Badge variant="outline" className="border-divine-blue text-divine-blue">
                      {criteria.weight}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{criteria.description}</p>
                  <Progress value={criteria.weight} className="h-2 mt-2" />
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-400">Lưu Ý</span>
              </div>
              <p className="text-xs text-muted-foreground">
                AI sẽ theo dõi và đánh giá tất cả người chơi. Việc gian lận hoặc vi phạm sẽ loại khỏi danh sách ứng viên.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-3">
            {weeklyHistory.map((record, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <Crown className="w-4 h-4 text-cultivator-gold" />
                      {record.chosen}
                    </div>
                    <div className="text-xs text-muted-foreground">{record.week}</div>
                  </div>
                  <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                    {record.participants.toLocaleString()} người
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm"><strong>Lựa chọn:</strong> {record.choice}</div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Kết quả:</strong> {record.result}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoldenFateSystem;
