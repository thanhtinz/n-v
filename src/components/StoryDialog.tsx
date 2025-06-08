
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Award, Heart, Skull } from 'lucide-react';

interface StoryChoice {
  text: string;
  alignment: 'good' | 'evil' | 'neutral';
  consequence: string;
  rewards?: {
    experience?: number;
    spiritStones?: number;
    items?: string[];
  };
}

interface StoryScene {
  id: number;
  title: string;
  content: string;
  character?: string;
  background?: string;
  choices: StoryChoice[];
}

const StoryDialog = () => {
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(null);
  const [alignment, setAlignment] = useState({ good: 0, evil: 0, neutral: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const storyScenes: StoryScene[] = [
    {
      id: 1,
      title: "Khởi Đầu Tu Tiên",
      content: "Bạn là một phàm nhân bình thường trong một ngôi làng nhỏ. Một ngày nọ, khi đang lên núi hái thuốc, bạn phát hiện một hang động bí ẩn toả ra ánh sáng kỳ lạ. Bạn có muốn tiến vào khám phá không?",
      character: "Mysterious Old Man",
      choices: [
        {
          text: "Dũng cảm tiến vào hang động",
          alignment: "neutral",
          consequence: "Bạn phát hiện ra một cuốn bí tịch tu luyện cổ xưa!",
          rewards: { experience: 50, spiritStones: 10 }
        },
        {
          text: "Quay về báo cho dân làng",
          alignment: "good",
          consequence: "Dân làng cảm kích và tặng bạn một số linh thạch quý.",
          rewards: { spiritStones: 20 }
        },
        {
          text: "Giấu kín và tự mình thu thập tài nguyên",
          alignment: "evil",
          consequence: "Bạn có được nhiều linh thạch nhưng bị nghi ngờ.",
          rewards: { spiritStones: 30, experience: 20 }
        }
      ]
    },
    {
      id: 2,
      title: "Cuộc Gặp Gỡ Định Mệnh",
      content: "Trong hang động, bạn gặp một tu sĩ bị thương nặng. Ông ta nói rằng đang bị một tà ma truy đuổi và yêu cầu bạn giúp đỡ. Ông hứa sẽ truyền cho bạn tâm pháp tu luyện nếu bạn cứu được ông.",
      character: "Injured Cultivator",
      choices: [
        {
          text: "Không ngần ngại cứu giúp",
          alignment: "good",
          consequence: "Tu sĩ truyền cho bạn 'Thiên Địa Quyết' - một tâm pháp mạnh mẽ!",
          rewards: { experience: 100, items: ["Thiên Địa Quyết"] }
        },
        {
          text: "Đòi hỏi phần thưởng trước khi giúp",
          alignment: "neutral",
          consequence: "Tu sĩ đồng ý và đưa cho bạn một phần linh thạch trước.",
          rewards: { spiritStones: 50, experience: 50 }
        },
        {
          text: "Lợi dụng lúc ông ta yếu để cướp tài sản",
          alignment: "evil",
          consequence: "Bạn có được nhiều tài nguyên nhưng bị nguyền rủa.",
          rewards: { spiritStones: 100, experience: 30 }
        }
      ]
    }
  ];

  useEffect(() => {
    // Show first story scene when component mounts
    setCurrentScene(storyScenes[0]);
    setIsVisible(true);
  }, []);

  const makeChoice = (choice: StoryChoice) => {
    // Update alignment
    setAlignment(prev => ({
      ...prev,
      [choice.alignment]: prev[choice.alignment] + 1
    }));

    // Show consequence
    alert(`${choice.consequence}\n\nPhần thưởng: ${
      choice.rewards ? 
      `${choice.rewards.experience || 0} EXP, ${choice.rewards.spiritStones || 0} Linh Thạch` +
      (choice.rewards.items ? `, ${choice.rewards.items.join(', ')}` : '') :
      'Không có'
    }`);

    // Move to next scene or close
    const currentIndex = storyScenes.findIndex(scene => scene.id === currentScene?.id);
    if (currentIndex < storyScenes.length - 1) {
      setCurrentScene(storyScenes[currentIndex + 1]);
    } else {
      setIsVisible(false);
    }
  };

  const getAlignmentColor = (align: string) => {
    switch (align) {
      case 'good': return 'text-green-400 border-green-400';
      case 'evil': return 'text-red-400 border-red-400';
      default: return 'text-blue-400 border-blue-400';
    }
  };

  const getAlignmentIcon = (align: string) => {
    switch (align) {
      case 'good': return <Heart className="w-4 h-4" />;
      case 'evil': return <Skull className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const getCurrentAlignment = () => {
    const total = alignment.good + alignment.evil + alignment.neutral;
    if (total === 0) return 'Trung Lập';
    
    const maxAlign = Math.max(alignment.good, alignment.evil, alignment.neutral);
    if (maxAlign === alignment.good) return 'Chính Đạo';
    if (maxAlign === alignment.evil) return 'Tà Đạo';
    return 'Trung Lập';
  };

  if (!isVisible || !currentScene) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 gradient-purple text-white"
      >
        Mở Cốt Truyện
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur border-border">
        <div className="p-6 space-y-4">
          {/* Story Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold gradient-gold bg-clip-text text-transparent">
              {currentScene.title}
            </h2>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className={getAlignmentColor('good')}>
                <Heart className="w-3 h-3 mr-1" />
                {alignment.good}
              </Badge>
              <Badge variant="outline" className={getAlignmentColor('neutral')}>
                <Award className="w-3 h-3 mr-1" />
                {alignment.neutral}
              </Badge>
              <Badge variant="outline" className={getAlignmentColor('evil')}>
                <Skull className="w-3 h-3 mr-1" />
                {alignment.evil}
              </Badge>
            </div>
            <Badge className="gradient-cultivation text-black">
              Căn Tính: {getCurrentAlignment()}
            </Badge>
          </div>

          {/* Character Portrait */}
          {currentScene.character && (
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-jade rounded-full flex items-center justify-center border-2 border-spirit-jade/50">
                <span className="text-xs text-center text-white font-medium">
                  {currentScene.character}
                </span>
              </div>
            </div>
          )}

          {/* Story Content */}
          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <p className="text-foreground leading-relaxed">
              {currentScene.content}
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-cultivator-gold">Lựa Chọn:</h3>
            {currentScene.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => makeChoice(choice)}
                variant="outline"
                className={`w-full text-left justify-start p-4 h-auto ${getAlignmentColor(choice.alignment)} hover:bg-muted/30`}
              >
                <div className="flex items-start gap-3 w-full">
                  {getAlignmentIcon(choice.alignment)}
                  <div className="flex-1">
                    <div className="text-sm">{choice.text}</div>
                    {choice.rewards && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Thưởng: {choice.rewards.experience || 0} EXP, {choice.rewards.spiritStones || 0} Linh Thạch
                        {choice.rewards.items && `, ${choice.rewards.items.join(', ')}`}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Button>
            ))}
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              className="text-muted-foreground"
            >
              Đóng Cốt Truyện
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoryDialog;
