import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Clock, Calendar, Gift, Star, Swords, Users } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface Quest {
  id: number;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  rewards: string[];
  completed: boolean;
  type: 'main' | 'side' | 'daily' | 'event';
  difficulty?: 'easy' | 'medium' | 'hard';
  timeLeft?: string;
}

const QuestSystem = () => {
  const { gameState, claimReward, addNotification } = useGameState();
  
  const [mainQuests, setMainQuests] = useState<Quest[]>([
    {
      id: 1,
      title: 'Khởi Đầu Hành Trình',
      description: 'Hoàn thành tutorial cơ bản',
      progress: 3,
      maxProgress: 5,
      rewards: ['200 EXP', '100 Vàng', 'Trang bị newbie'],
      completed: false,
      type: 'main',
      difficulty: 'easy'
    },
    {
      id: 2,
      title: 'Thử Thách Đầu Tiên',
      description: 'Đánh bại 10 quái vật',
      progress: 7,
      maxProgress: 10,
      rewards: ['500 EXP', '200 Vàng', 'Vũ khí Bạc'],
      completed: false,
      type: 'main',
      difficulty: 'medium'
    }
  ]);

  const [sideQuests, setSideQuests] = useState<Quest[]>([
    {
      id: 3,
      title: 'Thu Thập Nguyên Liệu',
      description: 'Thu thập 20 thảo dược',
      progress: 12,
      maxProgress: 20,
      rewards: ['100 EXP', '50 Vàng', '5 Đan dược'],
      completed: false,
      type: 'side',
      difficulty: 'easy'
    },
    {
      id: 4,
      title: 'Khám Phá Khu Vực Mới',
      description: 'Khám phá 3 khu vực chưa biết',
      progress: 1,
      maxProgress: 3,
      rewards: ['300 EXP', '150 Vàng', 'Bản đồ kho báu'],
      completed: false,
      type: 'side',
      difficulty: 'medium'
    }
  ]);

  const [dailyQuests, setDailyQuests] = useState<Quest[]>([
    {
      id: 5,
      title: 'Đăng Nhập Hàng Ngày',
      description: 'Đăng nhập game',
      progress: 1,
      maxProgress: 1,
      rewards: ['50 EXP', '30 Vàng'],
      completed: true,
      type: 'daily'
    },
    {
      id: 6,
      title: 'Tu Luyện Hàng Ngày',
      description: 'Tu luyện 30 phút',
      progress: 15,
      maxProgress: 30,
      rewards: ['100 EXP', '10 Linh Thạch'],
      completed: false,
      type: 'daily'
    },
    {
      id: 7,
      title: 'Chiến Đấu PvP',
      description: 'Tham gia 5 trận PvP',
      progress: 2,
      maxProgress: 5,
      rewards: ['150 EXP', '80 Vàng', 'Điểm Danh Vọng'],
      completed: false,
      type: 'daily'
    },
    {
      id: 8,
      title: 'Đánh Bại Boss',
      description: 'Đánh bại 3 boss bất kỳ',
      progress: 1,
      maxProgress: 3,
      rewards: ['100 EXP', '1 Trang Bị', '20 Vàng'],
      completed: false,
      type: 'daily'
    },
    {
      id: 9,
      title: 'Tương Tác Tông Môn',
      description: 'Tham gia hoạt động tông môn',
      progress: 0,
      maxProgress: 1,
      rewards: ['75 EXP', '15 Linh Thạch', 'Điểm Cống Hiến'],
      completed: false,
      type: 'daily'
    }
  ]);

  const [eventQuests, setEventQuests] = useState<Quest[]>([
    {
      id: 10,
      title: 'Lễ Hội Mùa Xuân',
      description: 'Tham gia hoạt động lễ hội',
      progress: 3,
      maxProgress: 10,
      rewards: ['1000 EXP', '500 Kim Cương', 'Thời trang độc quyền'],
      completed: false,
      type: 'event',
      timeLeft: '15 ngày',
      difficulty: 'hard'
    },
    {
      id: 11,
      title: 'Săn Boss Sự Kiện',
      description: 'Đánh bại Boss sự kiện 3 lần',
      progress: 1,
      maxProgress: 3,
      rewards: ['800 EXP', '300 Vàng', 'Trang bị hiếm'],
      completed: false,
      type: 'event',
      timeLeft: '7 ngày',
      difficulty: 'hard'
    }
  ]);

  const claimQuestReward = (questId: number, questType: 'main' | 'side' | 'daily' | 'event') => {
    let quest: Quest | undefined;
    
    if (questType === 'main') {
      quest = mainQuests.find(q => q.id === questId);
      setMainQuests(prev => prev.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ));
    } else if (questType === 'side') {
      quest = sideQuests.find(q => q.id === questId);
      setSideQuests(prev => prev.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ));
    } else if (questType === 'daily') {
      quest = dailyQuests.find(q => q.id === questId);
      setDailyQuests(prev => prev.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ));
    } else if (questType === 'event') {
      quest = eventQuests.find(q => q.id === questId);
      setEventQuests(prev => prev.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ));
    }

    if (quest) {
      quest.rewards.forEach(reward => {
        const [amount, type] = reward.split(' ');
        const numAmount = parseInt(amount);
        if (!isNaN(numAmount)) {
          claimReward(type.toLowerCase(), numAmount);
        }
      });
      addNotification(`Hoàn thành nhiệm vụ: ${quest.title}`, 'success');
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'border-green-500 text-green-400';
      case 'medium': return 'border-yellow-500 text-yellow-400';
      case 'hard': return 'border-red-500 text-red-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'main': return <BookOpen className="w-4 h-4 text-cultivator-gold" />;
      case 'side': return <Star className="w-4 h-4 text-spirit-jade" />;
      case 'daily': return <Clock className="w-4 h-4 text-divine-blue" />;
      case 'event': return <Gift className="w-4 h-4 text-mystical-purple" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const QuestCard = ({ quest, onClaim }: { quest: Quest, onClaim: (id: number, type: 'main' | 'side' | 'daily' | 'event') => void }) => {
    const isCompleted = quest.progress >= quest.maxProgress;
    const canClaim = isCompleted && !quest.completed;

    return (
      <Card className="p-4 bg-card/60 backdrop-blur-sm border-border/30">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getTypeIcon(quest.type)}
            <h4 className="font-medium text-sm">{quest.title}</h4>
            {quest.difficulty && (
              <Badge variant="outline" className={`text-xs ${getDifficultyColor(quest.difficulty)}`}>
                {quest.difficulty.toUpperCase()}
              </Badge>
            )}
          </div>
          {quest.completed && (
            <Badge variant="outline" className="border-spirit-jade text-spirit-jade text-xs">
              Hoàn Thành
            </Badge>
          )}
          {quest.timeLeft && (
            <div className="text-xs text-muted-foreground">
              Còn: {quest.timeLeft}
            </div>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">{quest.description}</p>
        
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Tiến độ</span>
            <span>{quest.progress}/{quest.maxProgress}</span>
          </div>
          <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
        </div>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Phần thưởng:</p>
          <div className="flex flex-wrap gap-1">
            {quest.rewards.map((reward, index) => (
              <Badge key={index} variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                {reward}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          size="sm" 
          className="w-full"
          disabled={!canClaim}
          onClick={() => onClaim(quest.id, quest.type)}
        >
          {quest.completed ? 'Đã Nhận' : canClaim ? 'Nhận Thưởng' : 'Chưa Hoàn Thành'}
        </Button>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 border-cultivator-gold/30">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-cultivator-gold" />
          <h3 className="font-semibold text-cultivator-gold">Hệ Thống Nhiệm Vụ</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Hoàn thành nhiệm vụ để nhận phần thưởng và tăng cấp nhanh chóng.
        </p>
      </Card>

      <Tabs defaultValue="main" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="main" className="text-xs">Chủ Tuyến</TabsTrigger>
          <TabsTrigger value="side" className="text-xs">Phụ</TabsTrigger>
          <TabsTrigger value="daily" className="text-xs">Hàng Ngày</TabsTrigger>
          <TabsTrigger value="event" className="text-xs">Sự Kiện</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <ScrollArea className="h-[400px]">
            <div className="space-y-3 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-cultivator-gold" />
                <h4 className="font-medium text-cultivator-gold">Nhiệm Vụ Chủ Tuyến</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Nhiệm vụ cốt lõi để tăng cấp nhanh chóng và nhận vật phẩm cần thiết.
              </p>
              {mainQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onClaim={claimQuestReward} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="side">
          <ScrollArea className="h-[400px]">
            <div className="space-y-3 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-spirit-jade" />
                <h4 className="font-medium text-spirit-jade">Nhiệm Vụ Phụ</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Nhiệm vụ bổ sung giúp tăng thêm kinh nghiệm và vật phẩm hiếm.
              </p>
              {sideQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onClaim={claimQuestReward} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="daily">
          <ScrollArea className="h-[400px]">
            <div className="space-y-3 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-divine-blue" />
                <h4 className="font-medium text-divine-blue">Nhiệm Vụ Hàng Ngày</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Nhiệm vụ lặp lại mỗi ngày. Reset tự động sau 24h.
              </p>
              {dailyQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onClaim={claimQuestReward} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="event">
          <ScrollArea className="h-[400px]">
            <div className="space-y-3 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4 text-mystical-purple" />
                <h4 className="font-medium text-mystical-purple">Nhiệm Vụ Sự Kiện</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Nhiệm vụ thường xuyên thay đổi với vật phẩm hiếm và cực hiếm.
              </p>
              {eventQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onClaim={claimQuestReward} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestSystem;
