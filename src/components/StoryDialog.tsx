
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  ChevronRight, 
  Star, 
  Gift,
  BookOpen
} from 'lucide-react';

interface StoryEvent {
  id: string;
  title: string;
  description: string;
  character: string;
  choices?: {
    text: string;
    reward?: string;
    consequence?: string;
  }[];
  reward?: {
    type: 'exp' | 'item' | 'skill';
    amount: number;
    name: string;
  };
  isRead: boolean;
}

const StoryDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<StoryEvent | null>(null);
  const [events, setEvents] = useState<StoryEvent[]>([
    {
      id: '1',
      title: 'Gặp Gỡ Sư Phụ',
      description: 'Một vị cao nhân bí ẩn xuất hiện trước mặt ngươi, đôi mắt sâu thẳm như có thể nhìn thấu mọi thứ.',
      character: 'Huyền Thiên Đạo Nhân',
      choices: [
        {
          text: 'Cung kính chào hỏi',
          reward: '+50 Exp, +10 Danh Vọng'
        },
        {
          text: 'Thận trọng quan sát',
          reward: '+30 Exp, +5 Trí Tuệ'
        }
      ],
      isRead: false
    },
    {
      id: '2',
      title: 'Khám Phá Hang Động Bí Mật',
      description: 'Trong quá trình khám phá, ngươi tìm thấy một hang động cổ kỳ tỏa ra ánh sáng kỳ lạ.',
      character: 'Người Kể Chuyện',
      choices: [
        {
          text: 'Tiến vào hang động',
          reward: 'Kiếm Cổ + 100 Exp'
        },
        {
          text: 'Quay về sau',
          reward: '+20 Exp (An toàn)'
        }
      ],
      isRead: false
    },
    {
      id: '3',
      title: 'Cuộc Gặp Gỡ Định Mệnh',
      description: 'Một thiếu nữ xinh đẹp đang bị truy sát bởi một nhóm tu sĩ tà đạo. Ngươi sẽ làm gì?',
      character: 'Lạnh Nguyệt',
      choices: [
        {
          text: 'Anh hùng cứu mỹ nhân',
          reward: '+100 Exp, Bạn đồng hành'
        },
        {
          text: 'Tránh xa rắc rối',
          reward: 'Không có phần thưởng'
        }
      ],
      isRead: false
    }
  ]);
  const [hasNewEvent, setHasNewEvent] = useState(false);

  useEffect(() => {
    // Check for new events periodically
    const interval = setInterval(() => {
      const unreadEvents = events.filter(event => !event.isRead);
      if (unreadEvents.length > 0 && !isOpen) {
        setHasNewEvent(true);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [events, isOpen]);

  const openEvent = (event: StoryEvent) => {
    setCurrentEvent(event);
    setIsOpen(true);
    setHasNewEvent(false);
  };

  const makeChoice = (choice: any) => {
    if (currentEvent) {
      // Mark event as read
      setEvents(prev => prev.map(event => 
        event.id === currentEvent.id 
          ? { ...event, isRead: true }
          : event
      ));

      // Show reward
      alert(`Lựa chọn: "${choice.text}"\nPhần thưởng: ${choice.reward}`);
      
      setIsOpen(false);
      setCurrentEvent(null);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setCurrentEvent(null);
  };

  const unreadEvents = events.filter(event => !event.isRead);
  const readEvents = events.filter(event => event.isRead);

  return (
    <>
      {/* Story Event Trigger Button */}
      {(hasNewEvent || unreadEvents.length > 0) && !isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="relative bg-mystical-purple hover:bg-mystical-purple/80 text-white shadow-lg"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Sự Kiện
            {unreadEvents.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 text-xs">
                {unreadEvents.length}
              </Badge>
            )}
          </Button>
        </div>
      )}

      {/* Story Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur border-border/50">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-cultivator-gold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {currentEvent ? 'Sự Kiện Đặc Biệt' : 'Danh Sách Sự Kiện'}
                </h2>
                <Button variant="ghost" size="sm" onClick={closeDialog}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {currentEvent ? (
                /* Current Event Display */
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-cultivation rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-2">{currentEvent.title}</h3>
                    <Badge variant="outline" className="border-black text-black">
                      {currentEvent.character}
                    </Badge>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm leading-relaxed">{currentEvent.description}</p>
                  </div>

                  {currentEvent.choices && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-spirit-jade">Lựa chọn của ngươi:</h4>
                      {currentEvent.choices.map((choice, index) => (
                        <Button
                          key={index}
                          onClick={() => makeChoice(choice)}
                          className="w-full justify-between bg-muted hover:bg-muted/80 text-foreground border border-border/50"
                          variant="outline"
                        >
                          <span>{choice.text}</span>
                          <div className="flex items-center gap-2 text-xs">
                            <Gift className="w-3 h-3" />
                            {choice.reward}
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Event List */
                <div className="space-y-4">
                  {unreadEvents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-mystical-purple mb-3">Sự Kiện Mới</h3>
                      <div className="space-y-2">
                        {unreadEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => openEvent(event)}
                            className="p-3 bg-mystical-purple/10 border border-mystical-purple/30 rounded-lg cursor-pointer hover:bg-mystical-purple/20 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm">{event.title}</div>
                                <div className="text-xs text-muted-foreground">{event.character}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-mystical-purple" />
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {readEvents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-muted-foreground mb-3">Sự Kiện Đã Hoàn Thành</h3>
                      <div className="space-y-2">
                        {readEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => openEvent(event)}
                            className="p-3 bg-muted/20 border border-border/30 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors opacity-75"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm">{event.title}</div>
                                <div className="text-xs text-muted-foreground">{event.character}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">Hoàn thành</Badge>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {unreadEvents.length === 0 && readEvents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Chưa có sự kiện nào...</p>
                      <p className="text-xs mt-2">Hãy khám phá thế giới để mở khóa câu chuyện!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default StoryDialog;
