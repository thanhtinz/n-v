
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  User, 
  Heart, 
  Zap, 
  Shield, 
  ChevronRight, 
  Star,
  Crown,
  Flame,
  RotateCcw,
  MessageCircle,
  Gift
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface StoryChoice {
  id: string;
  text: string;
  morality: 'good' | 'evil' | 'neutral';
  reward?: string;
  consequence?: string;
  relationshipChange?: { character: string; change: number };
}

interface StoryChapter {
  id: string;
  title: string;
  content: string[];
  character?: string;
  characterImage?: string;
  background?: string;
  choices?: StoryChoice[];
  completed: boolean;
  unlocked: boolean;
  type: 'main' | 'side';
  moralityPoints?: { good: number; evil: number; neutral: number };
}

interface Character {
  id: string;
  name: string;
  relationship: number; // -100 to 100
  description: string;
  avatar: string;
}

const StorySystem = () => {
  const { gameState, claimReward, addNotification } = useGameState();
  const [currentChapter, setCurrentChapter] = useState<StoryChapter | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [moralityPoints, setMoralityPoints] = useState({ good: 0, evil: 0, neutral: 0 });
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 'master',
      name: 'Huyền Thiên Đạo Nhân', 
      relationship: 20,
      description: 'Sư phụ bí ẩn với tu vi cao siêu',
      avatar: '🧙‍♂️'
    },
    {
      id: 'leng_yue',
      name: 'Lạnh Nguyệt',
      relationship: 5,
      description: 'Thiếu nữ xinh đẹp có thân phận bí ẩn',
      avatar: '👸'
    },
    {
      id: 'demon_lord',
      name: 'Ma Tôn Thiên Hạ',
      relationship: -30,
      description: 'Kẻ thù nguy hiểm của chính đạo',
      avatar: '👹'
    }
  ]);

  const [chapters, setChapters] = useState<StoryChapter[]>([
    {
      id: 'ch1',
      title: 'Chương 1: Gặp Gỡ Sư Phụ',
      content: [
        'Một sáng sớm, ngươi đang tu luyện tại Linh Tuyền Sơn...',
        'Bỗng nhiên, một vị cao nhân bí ẩn xuất hiện, đôi mắt sâu thẳm như có thể nhìn thấu mọi thứ.',
        '"Nhỏ, ngươi có muốn bước vào con đường tu tiên không?"',
        'Giọng nói của ông ta như sấm sét, vang vọng khắp núi đồi.'
      ],
      character: 'Huyền Thiên Đạo Nhân',
      characterImage: '🧙‍♂️',
      background: '🏔️',
      choices: [
        {
          id: 'respect',
          text: 'Cung kính chào hỏi: "Tiền bối, đệ tử có thể học hỏi từ tiền bối được không?"',
          morality: 'good',
          reward: '+50 EXP, +10 Danh Vọng',
          relationshipChange: { character: 'master', change: 10 }
        },
        {
          id: 'cautious',
          text: 'Thận trọng quan sát: "Ngươi là ai? Tại sao lại tìm ta?"',
          morality: 'neutral',
          reward: '+30 EXP, +5 Trí Tuệ',
          relationshipChange: { character: 'master', change: 5 }
        },
        {
          id: 'arrogant',
          text: 'Kiêu ngạo đáp: "Ta không cần ai chỉ dạy!"',
          morality: 'evil',
          reward: '+10 EXP, +15 Sát Khí',
          relationshipChange: { character: 'master', change: -5 }
        }
      ],
      completed: false,
      unlocked: true,
      type: 'main'
    },
    {
      id: 'ch2',
      title: 'Chương 2: Cuộc Gặp Gỡ Định Mệnh',
      content: [
        'Sau khi rời khỏi sư phụ, ngươi lang thang trên con đường đèo.',
        'Bỗng nhiên nghe tiếng kêu cứu từ khe núi.',
        'Một thiếu nữ xinh đẹp đang bị truy sát bởi nhóm tu sĩ tà đạo.',
        '"Cứu ta... xin hãy cứu ta..."'
      ],
      character: 'Lạnh Nguyệt',
      characterImage: '👸',
      background: '🌲',
      choices: [
        {
          id: 'hero',
          text: 'Anh hùng cứu mỹ nhân: "Các ngươi dám?"',
          morality: 'good',
          reward: '+100 EXP, Đồng hành mới',
          relationshipChange: { character: 'leng_yue', change: 20 }
        },
        {
          id: 'negotiate',
          text: 'Thương lượng: "Các vị có thể tha cho cô ấy không?"',
          morality: 'neutral',
          reward: '+50 EXP, Thông tin',
          relationshipChange: { character: 'leng_yue', change: 10 }
        },
        {
          id: 'ignore',
          text: 'Tránh xa rắc rối: "Không phải việc của ta"',
          morality: 'evil',
          reward: 'Không có phần thưởng',
          relationshipChange: { character: 'leng_yue', change: -10 }
        }
      ],
      completed: false,
      unlocked: false,
      type: 'main'
    },
    {
      id: 'side1',
      title: 'Phụ Tuyến: Bí Mật Hang Động',
      content: [
        'Trong quá trình khám phá, ngươi tìm thấy một hang động cổ kỳ.',
        'Bên trong tỏa ra ánh sáng kỳ lạ...',
        'Có vẻ như đây là di tích của một vị tiền bối cao nhân.'
      ],
      character: 'Người Kể Chuyện',
      background: '🕳️',
      choices: [
        {
          id: 'enter',
          text: 'Tiến vào hang động khám phá',
          morality: 'neutral',
          reward: 'Kiếm Cổ + 100 EXP'
        },
        {
          id: 'careful',
          text: 'Thận trọng kiểm tra trước',
          morality: 'good',
          reward: '+50 EXP (An toàn)'
        }
      ],
      completed: false,
      unlocked: true,
      type: 'side'
    }
  ]);

  const readChapter = (chapter: StoryChapter) => {
    setCurrentChapter(chapter);
    setCurrentPage(0);
  };

  const nextPage = () => {
    if (currentChapter && currentPage < currentChapter.content.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const makeChoice = (choice: StoryChoice) => {
    if (!currentChapter) return;

    // Update morality points
    setMoralityPoints(prev => ({
      ...prev,
      [choice.morality]: prev[choice.morality] + 1
    }));

    // Update character relationship
    if (choice.relationshipChange) {
      setCharacters(prev => prev.map(char => 
        char.id === choice.relationshipChange?.character
          ? { ...char, relationship: Math.max(-100, Math.min(100, char.relationship + choice.relationshipChange.change)) }
          : char
      ));
    }

    // Mark chapter as completed
    setChapters(prev => prev.map(ch => {
      if (ch.id === currentChapter.id) {
        return { ...ch, completed: true };
      }
      // Unlock next chapter if this was main story
      if (currentChapter.type === 'main' && ch.id === getNextChapterId(currentChapter.id)) {
        return { ...ch, unlocked: true };
      }
      return ch;
    }));

    // Give rewards
    if (choice.reward) {
      addNotification(`Lựa chọn: "${choice.text.substring(0, 30)}..." - ${choice.reward}`, 'success');
    }

    // Close chapter
    setCurrentChapter(null);
    setCurrentPage(0);
  };

  const getNextChapterId = (currentId: string): string => {
    const mainChapters = ['ch1', 'ch2', 'ch3'];
    const currentIndex = mainChapters.indexOf(currentId);
    return currentIndex < mainChapters.length - 1 ? mainChapters[currentIndex + 1] : '';
  };

  const getMoralityAlignment = () => {
    const total = moralityPoints.good + moralityPoints.evil + moralityPoints.neutral;
    if (total === 0) return 'Chưa Xác Định';
    
    const maxPoints = Math.max(moralityPoints.good, moralityPoints.evil, moralityPoints.neutral);
    if (maxPoints === moralityPoints.good) return 'Thiện';
    if (maxPoints === moralityPoints.evil) return 'Ác';
    return 'Trung Lập';
  };

  const getRelationshipStatus = (relationship: number) => {
    if (relationship >= 80) return { text: 'Thân Thiết', color: 'text-green-500' };
    if (relationship >= 40) return { text: 'Thân Thiện', color: 'text-green-400' };
    if (relationship >= 10) return { text: 'Bình Thường', color: 'text-gray-400' };
    if (relationship >= -10) return { text: 'Lạnh Lùng', color: 'text-gray-500' };
    if (relationship >= -40) return { text: 'Thù Địch', color: 'text-red-400' };
    return { text: 'Kẻ Thù', color: 'text-red-500' };
  };

  const mainChapters = chapters.filter(ch => ch.type === 'main');
  const sideChapters = chapters.filter(ch => ch.type === 'side');

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-mystical-purple/10 to-cultivator-gold/10 border-mystical-purple/30">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-mystical-purple" />
          <h3 className="font-semibold text-mystical-purple">Truyện Chính & Phụ Tuyến</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Khám phá câu chuyện tu tiên với các lựa chọn ảnh hưởng đến số phận.
        </p>
      </Card>

      {/* Chapter Reading Modal */}
      {currentChapter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur">
            <div className="p-4 sm:p-6">
              {/* Chapter Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{currentChapter.background}</div>
                  <div>
                    <h3 className="font-bold text-cultivator-gold">{currentChapter.title}</h3>
                    {currentChapter.character && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{currentChapter.characterImage}</span>
                        <span>{currentChapter.character}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setCurrentChapter(null)}>
                  ✕
                </Button>
              </div>

              {/* Story Content */}
              <div className="mb-6">
                <div className="min-h-[200px] p-4 bg-muted/20 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {currentChapter.content[currentPage]}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-muted-foreground">
                    Trang {currentPage + 1} / {currentChapter.content.length}
                  </div>
                  
                  {currentPage < currentChapter.content.length - 1 ? (
                    <Button onClick={nextPage} size="sm">
                      Tiếp Theo <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : currentChapter.choices ? (
                    <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                      Đưa Ra Lựa Chọn
                    </Badge>
                  ) : (
                    <Button onClick={() => setCurrentChapter(null)} size="sm">
                      Hoàn Thành
                    </Button>
                  )}
                </div>
              </div>

              {/* Choices */}
              {currentPage === currentChapter.content.length - 1 && currentChapter.choices && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-spirit-jade">Lựa chọn của ngươi:</h4>
                  {currentChapter.choices.map((choice) => (
                    <Button
                      key={choice.id}
                      onClick={() => makeChoice(choice)}
                      className="w-full justify-start text-left h-auto p-4 bg-muted hover:bg-muted/80"
                      variant="outline"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{choice.text}</span>
                          <div className="flex items-center gap-1">
                            {choice.morality === 'good' && <Heart className="w-3 h-3 text-green-500" />}
                            {choice.morality === 'evil' && <Flame className="w-3 h-3 text-red-500" />}
                            {choice.morality === 'neutral' && <Shield className="w-3 h-3 text-gray-500" />}
                          </div>
                        </div>
                        {choice.reward && (
                          <div className="text-xs text-muted-foreground">
                            <Gift className="w-3 h-3 inline mr-1" />
                            {choice.reward}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      <Tabs defaultValue="main" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="main">Chính Tuyến</TabsTrigger>
          <TabsTrigger value="side">Phụ Tuyến</TabsTrigger>
          <TabsTrigger value="characters">Nhân Vật</TabsTrigger>
          <TabsTrigger value="morality">Đạo Tính</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <ScrollArea className="h-[400px]">
            <div className="space-y-3 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-4 h-4 text-cultivator-gold" />
                <h4 className="font-medium text-cultivator-gold">Truyện Chính</h4>
              </div>
              {mainChapters.map((chapter) => (
                <Card 
                  key={chapter.id} 
                  className={`p-4 cursor-pointer transition-colors ${
                    !chapter.unlocked ? 'opacity-50 cursor-not-allowed' : 
                    chapter.completed ? 'bg-spirit-jade/10 border-spirit-jade/30' : 
                    'hover:bg-muted/50'
                  }`}
                  onClick={() => chapter.unlocked && readChapter(chapter)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-sm">{chapter.title}</h5>
                        {chapter.completed && (
                          <Badge variant="outline" className="border-spirit-jade text-spirit-jade text-xs">
                            Hoàn Thành
                          </Badge>
                        )}
                        {!chapter.unlocked && (
                          <Badge variant="outline" className="text-xs">
                            Chưa Mở Khóa
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {chapter.content[0].substring(0, 60)}...
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="side">
          <ScrollArea className="h-[400px]">
            <div className="space-y-3 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-spirit-jade" />
                <h4 className="font-medium text-spirit-jade">Phụ Tuyến</h4>
              </div>
              {sideChapters.map((chapter) => (
                <Card 
                  key={chapter.id} 
                  className={`p-4 cursor-pointer transition-colors ${
                    !chapter.unlocked ? 'opacity-50 cursor-not-allowed' : 
                    chapter.completed ? 'bg-spirit-jade/10 border-spirit-jade/30' : 
                    'hover:bg-muted/50'
                  }`}
                  onClick={() => chapter.unlocked && readChapter(chapter)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-sm">{chapter.title}</h5>
                        {chapter.completed && (
                          <Badge variant="outline" className="border-spirit-jade text-spirit-jade text-xs">
                            Hoàn Thành
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {chapter.content[0].substring(0, 60)}...
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="characters">
          <ScrollArea className="h-[400px]">
            <div className="space-y-3 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-mystical-purple" />
                <h4 className="font-medium text-mystical-purple">Quan Hệ Nhân Vật</h4>
              </div>
              {characters.map((character) => {
                const status = getRelationshipStatus(character.relationship);
                return (
                  <Card key={character.id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{character.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-sm">{character.name}</h5>
                          <Badge variant="outline" className={`text-xs ${status.color} border-current`}>
                            {status.text}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{character.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Quan hệ</span>
                        <span>{character.relationship}/100</span>
                      </div>
                      <Progress 
                        value={((character.relationship + 100) / 200) * 100} 
                        className="h-2"
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="morality">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-divine-blue" />
                <h4 className="font-medium text-divine-blue">Hệ Thống Đạo Tính</h4>
              </div>

              <Card className="p-4 bg-gradient-to-r from-divine-blue/10 to-spirit-jade/10 border-divine-blue/30">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-divine-blue mb-1">
                    {getMoralityAlignment()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Thiên hướng đạo tính hiện tại
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Thiện</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{moralityPoints.good}</span>
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${(moralityPoints.good / Math.max(1, moralityPoints.good + moralityPoints.evil + moralityPoints.neutral)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Ác</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{moralityPoints.evil}</span>
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-red-500 rounded-full" 
                          style={{ width: `${(moralityPoints.evil / Math.max(1, moralityPoints.good + moralityPoints.evil + moralityPoints.neutral)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Trung Lập</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{moralityPoints.neutral}</span>
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-gray-500 rounded-full" 
                          style={{ width: `${(moralityPoints.neutral / Math.max(1, moralityPoints.good + moralityPoints.evil + moralityPoints.neutral)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h5 className="font-medium mb-3">Ảnh Hưởng Đạo Tính</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3 h-3 text-green-500" />
                    <span className="text-green-600">Thiện:</span>
                    <span className="text-muted-foreground">Tăng uy tín, dễ học võ công chính phái</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-3 h-3 text-red-500" />
                    <span className="text-red-600">Ác:</span>
                    <span className="text-muted-foreground">Tăng sát khí, mở khóa kỹ năng ma đạo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">Trung Lập:</span>
                    <span className="text-muted-foreground">Cân bằng, linh hoạt trong lựa chọn</span>
                  </div>
                </div>
              </Card>

              <Button className="w-full" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Xem Lại Lựa Chọn Đã Qua
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StorySystem;
