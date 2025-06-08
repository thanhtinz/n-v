
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sword, Users, Zap, Trophy, Star, Clock, Gift } from 'lucide-react';

const DailyQuestSystem = () => {
  const [dailyQuests, setDailyQuests] = useState([
    {
      id: 1,
      title: 'Tu Luyện Hàng Ngày',
      description: 'Tu luyện 30 phút',
      progress: 15,
      maxProgress: 30,
      rewards: ['50 EXP', '10 Linh Thạch'],
      completed: false,
      type: 'cultivation'
    },
    {
      id: 2,
      title: 'Đánh Bại Boss',
      description: 'Đánh bại 3 boss bất kỳ',
      progress: 1,
      maxProgress: 3,
      rewards: ['100 EXP', '1 Trang Bị', '20 Vàng'],
      completed: false,
      type: 'combat'
    },
    {
      id: 3,
      title: 'Tương Tác Tông Môn',
      description: 'Tham gia hoạt động tông môn',
      progress: 0,
      maxProgress: 1,
      rewards: ['75 EXP', '15 Linh Thạch', 'Điểm Cống Hiến'],
      completed: false,
      type: 'sect'
    }
  ]);

  const [weeklyQuests, setWeeklyQuests] = useState([
    {
      id: 1,
      title: 'Bá Chủ Đấu Trường',
      description: 'Thắng 20 trận PvP',
      progress: 5,
      maxProgress: 20,
      rewards: ['500 EXP', '1 Trang Bị Hiếm', '100 Kim Cương'],
      completed: false,
      type: 'pvp'
    },
    {
      id: 2,
      title: 'Vượt Cảnh Giới',
      description: 'Nâng 2 cấp độ',
      progress: 0,
      maxProgress: 2,
      rewards: ['1000 EXP', '1 Đan Dược Hiếm', '200 Vàng'],
      completed: false,
      type: 'level'
    }
  ]);

  const claimReward = (questId: number, isWeekly = false) => {
    if (isWeekly) {
      setWeeklyQuests(prev => prev.map(quest => 
        quest.id === questId ? { ...quest, completed: true } : quest
      ));
    } else {
      setDailyQuests(prev => prev.map(quest => 
        quest.id === questId ? { ...quest, completed: true } : quest
      ));
    }
  };

  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'cultivation': return <Zap className="w-4 h-4 text-spirit-jade" />;
      case 'combat': return <Sword className="w-4 h-4 text-blood-red" />;
      case 'sect': return <Users className="w-4 h-4 text-mystical-purple" />;
      case 'pvp': return <Trophy className="w-4 h-4 text-cultivator-gold" />;
      case 'level': return <Star className="w-4 h-4 text-divine-blue" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const QuestCard = ({ quest, isWeekly = false }: { quest: any, isWeekly?: boolean }) => {
    const isCompleted = quest.progress >= quest.maxProgress;
    const canClaim = isCompleted && !quest.completed;

    return (
      <Card className="p-4 bg-card/60 backdrop-blur-sm border-border/30">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getQuestIcon(quest.type)}
            <h4 className="font-medium text-sm">{quest.title}</h4>
          </div>
          {quest.completed && (
            <Badge variant="outline" className="border-spirit-jade text-spirit-jade text-xs">
              Đã Hoàn Thành
            </Badge>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">{quest.description}</p>
        
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Tiến độ</span>
            <span>{quest.progress}/{quest.maxProgress}</span>
          </div>
          <Progress 
            value={(quest.progress / quest.maxProgress) * 100} 
            className="h-2"
          />
        </div>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Phần thưởng:</p>
          <div className="flex flex-wrap gap-1">
            {quest.rewards.map((reward: string, index: number) => (
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
          onClick={() => claimReward(quest.id, isWeekly)}
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
          <Clock className="w-5 h-5 text-cultivator-gold" />
          <h3 className="font-semibold text-cultivator-gold">Nhiệm Vụ Hàng Ngày</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Hoàn thành nhiệm vụ để nhận phần thưởng. Reset mỗi ngày vào 00:00.
        </p>
      </Card>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Hàng Ngày</TabsTrigger>
          <TabsTrigger value="weekly">Hàng Tuần</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-3">
          {dailyQuests.map(quest => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-3">
          {weeklyQuests.map(quest => (
            <QuestCard key={quest.id} quest={quest} isWeekly={true} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyQuestSystem;
