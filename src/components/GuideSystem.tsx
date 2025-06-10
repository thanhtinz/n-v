import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BookOpen, 
  Sword, 
  Zap, 
  Shield, 
  Star, 
  Crown, 
  Gift, 
  Users, 
  Coins,
  Home,
  Calendar,
  Heart,
  Trophy,
  Fish,
  Sparkles,
  Target,
  Clock,
  PawPrint,
  ShoppingCart,
  MessageSquare,
  Settings,
  ChevronRight,
  Search,
  Lightbulb,
  Info,
  Play,
  Check
} from 'lucide-react';

interface GuideContentItem {
  type: string;
  content: string | string[] | any;
}

interface Guide {
  id: string;
  title: string;
  difficulty: string;
  duration: string;
  content: GuideContentItem[];
}

const GuideSystem = () => {
  const [activeCategory, setActiveCategory] = useState('basics');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedGuides, setCompletedGuides] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const markGuideCompleted = (guideId: string) => {
    if (!completedGuides.includes(guideId)) {
      setCompletedGuides([...completedGuides, guideId]);
    }
  };

  const guideCategories = [
    {
      id: 'basics',
      name: 'Cơ Bản',
      icon: BookOpen,
      description: 'Những kiến thức cơ bản để bắt đầu',
      color: 'bg-blue-500'
    },
    {
      id: 'cultivation',
      name: 'Tu Luyện',
      icon: Zap,
      description: 'Hệ thống tu luyện và cảnh giới',
      color: 'bg-purple-500'
    },
    {
      id: 'combat',
      name: 'Chiến Đấu',
      icon: Sword,
      description: 'Chiến đấu và PvP',
      color: 'bg-red-500'
    },
    {
      id: 'equipment',
      name: 'Trang Bị',
      icon: Shield,
      description: 'Vũ khí, áo giáp và cường hóa',
      color: 'bg-orange-500'
    },
    {
      id: 'systems',
      name: 'Hệ Thống',
      icon: Settings,
      description: 'Các hệ thống khác trong game',
      color: 'bg-green-500'
    },
    {
      id: 'social',
      name: 'Xã Hội',
      icon: Users,
      description: 'Bang hội, bạn bè, chat',
      color: 'bg-pink-500'
    },
    {
      id: 'economy',
      name: 'Kinh Tế',
      icon: Coins,
      description: 'Tiền tệ, cửa hàng, giao dịch',
      color: 'bg-yellow-500'
    },
    {
      id: 'events',
      name: 'Sự Kiện',
      icon: Calendar,
      description: 'Sự kiện và hoạt động đặc biệt',
      color: 'bg-indigo-500'
    }
  ];

  const guides: Record<string, Guide[]> = {
    basics: [
      {
        id: 'getting-started',
        title: 'Bắt Đầu Chơi Game',
        difficulty: 'Dễ',
        duration: '5 phút',
        content: [
          {
            type: 'text',
            content: 'Chào mừng đến với thế giới tu tiên! Đây là hướng dẫn cơ bản để bắt đầu hành trình tu đạo của bạn.'
          },
          {
            type: 'steps',
            content: [
              'Tạo nhân vật và chọn giới tính, class phù hợp',
              'Làm quen với giao diện game và các menu chính',
              'Hoàn thành nhiệm vụ tân thủ để nhận thưởng',
              'Bắt đầu tu luyện để tăng cấp và sức mạnh',
              'Tham gia bang hội để có thêm bạn bè'
            ]
          },
          {
            type: 'tip',
            content: 'Mẹo: Hãy tập trung vào việc hoàn thành nhiệm vụ tân thủ trước khi khám phá các tính năng khác!'
          }
        ]
      },
      {
        id: 'interface-guide',
        title: 'Hướng Dẫn Giao Diện',
        difficulty: 'Dễ',
        duration: '3 phút',
        content: [
          {
            type: 'text',
            content: 'Tìm hiểu các phần quan trọng trong giao diện game.'
          },
          {
            type: 'feature-list',
            content: [
              { name: 'Menu Chính', description: 'Truy cập vào menu bằng nút ở góc trên trái' },
              { name: 'Thông Tin Nhân Vật', description: 'Xem level, EXP, tài nguyên ở header' },
              { name: 'Thông Báo', description: 'Nhận thông báo quan trọng từ hệ thống' },
              { name: 'Chat', description: 'Trò chuyện với người chơi khác' }
            ]
          }
        ]
      },
      {
        id: 'character-stats',
        title: 'Hiểu Về Chỉ Số Nhân Vật',
        difficulty: 'Trung Bình',
        duration: '7 phút',
        content: [
          {
            type: 'text',
            content: 'Các chỉ số quan trọng quyết định sức mạnh nhân vật của bạn.'
          },
          {
            type: 'stats-table',
            content: [
              { stat: 'Level', description: 'Cấp độ nhân vật, tăng qua kinh nghiệm' },
              { stat: 'Combat Power', description: 'Sức mạnh chiến đấu tổng thể' },
              { stat: 'HP', description: 'Máu, quyết định khả năng sống sót' },
              { stat: 'MP', description: 'Mana, cần thiết để dùng kỹ năng' },
              { stat: 'Attack', description: 'Sát thương cơ bản' },
              { stat: 'Defense', description: 'Khả năng phòng thủ' },
              { stat: 'Speed', description: 'Tốc độ di chuyển và đánh' }
            ]
          }
        ]
      }
    ],
    cultivation: [
      {
        id: 'cultivation-basics',
        title: 'Cơ Bản Về Tu Luyện',
        difficulty: 'Trung Bình',
        duration: '10 phút',
        content: [
          {
            type: 'text',
            content: 'Tu luyện là cốt lõi của game, giúp bạn tăng cảnh giới và sức mạnh.'
          },
          {
            type: 'cultivation-steps',
            content: [
              'Hấp thụ linh khí từ thiên địa',
              'Nâng cao cảnh giới tu luyện',
              'Mở khóa kỹ năng và thần thông mới',
              'Tăng chỉ số cơ bản của nhân vật'
            ]
          },
          {
            type: 'realms-intro',
            content: 'Hệ thống tu luyện gồm 4 bước lớn với nhiều cảnh giới nhỏ. Mỗi cảnh giới đều có yêu cầu và phần thưởng riêng.'
          }
        ]
      },
      {
        id: 'realm-system',
        title: 'Hệ Thống Cảnh Giới Chi Tiết',
        difficulty: 'Khó',
        duration: '15 phút',
        content: [
          {
            type: 'text',
            content: 'Tìm hiểu chi tiết về từng bước tu luyện và cảnh giới.'
          },
          {
            type: 'realm-breakdown',
            content: {
              'Bước 1 - Nhất Bộ Tung Hoành': [
                'Ngưng Khí Kỳ (1-15): Hấp thụ linh khí cơ bản',
                'Trúc Cơ Kỳ: Thanh tẩy thân thể',
                'Kết Đan Kỳ: Ngưng tụ kim đan',
                'Nguyên Anh Kỳ: Hình thành nguyên anh',
                'Hoá Thần Kỳ: Nguyên anh trưởng thành',
                'Anh Biến Kỳ: Chuyển hóa tiên thể',
                'Vấn Đỉnh Kỳ: Đỉnh cao bước đầu'
              ],
              'Bước 2 - Nhị Bộ Phi Thiên': [
                'Âm Hư - Dương Thực: Giai đoạn chuyển tiếp',
                'Khuy Niết: Tiếp xúc quy tắc',
                'Tịnh Niết: Nắm giữ quy tắc',
                'Toái Niết: Dung hợp quy tắc'
              ]
            }
          }
        ]
      },
      {
        id: 'cultivation-resources',
        title: 'Tài Nguyên Tu Luyện',
        difficulty: 'Trung Bình',
        duration: '8 phút',
        content: [
          {
            type: 'text',
            content: 'Các loại tài nguyên cần thiết cho việc tu luyện.'
          },
          {
            type: 'resource-list',
            content: [
              { name: 'Linh Khí', usage: 'Tu luyện cảnh giới thấp', obtain: 'Tự động hấp thụ từ môi trường' },
              { name: 'Tiên Khí', usage: 'Tu luyện cảnh giới cao', obtain: 'Từ tiên ngọc, địa điểm đặc biệt' },
              { name: 'Nguyên Lực', usage: 'Bước thứ hai trở lên', obtain: 'Chuyển hóa từ tiên khí' },
              { name: 'Đan Dược', usage: 'Hỗ trợ tu luyện nhanh hơn', obtain: 'Luyện đan, cửa hàng' }
            ]
          }
        ]
      }
    ],
    combat: [
      {
        id: 'combat-basics',
        title: 'Cơ Bản Chiến Đấu',
        difficulty: 'Dễ',
        duration: '6 phút',
        content: [
          {
            type: 'text',
            content: 'Hệ thống chiến đấu trong game bao gồm PvE và PvP.'
          },
          {
            type: 'combat-types',
            content: [
              { type: 'PvE', description: 'Chiến đấu với quái vật và boss', rewards: 'EXP, vật phẩm' },
              { type: 'PvP', description: 'Chiến đấu với người chơi khác', rewards: 'Danh vọng, ranking' },
              { type: 'Arena', description: 'Đấu trường tự động', rewards: 'Điểm arena, thưởng hạng' }
            ]
          }
        ]
      },
      {
        id: 'skills-guide',
        title: 'Hệ Thống Kỹ Năng',
        difficulty: 'Trung Bình',
        duration: '12 phút',
        content: [
          {
            type: 'text',
            content: 'Mỗi class có bộ kỹ năng riêng biệt phù hợp với lối chơi.'
          },
          {
            type: 'class-skills',
            content: {
              'Kiếm Sư': [
                'Kiếm Khí: Tấn công tầm xa bằng kiếm khí',
                'Phá Thiên Chém: Đòn chém mạnh phá giáp',
                'Kiếm Trận: Triệu hồi nhiều kiếm tấn công'
              ],
              'Pháp Sư': [
                'Hoả Cầu Thuật: Tấn công cơ bản bằng lửa',
                'Băng Phong Bão: AOE sát thương lớn',
                'Thuỷ Lôi: Kỹ năng sét mạnh'
              ],
              'Phòng Thủ': [
                'Khiên Phòng: Tăng phòng thủ',
                'Phản Đòn: Phản sát thương khi bị tấn công',
                'Hồi Phục: Hồi máu cho bản thân'
              ]
            }
          }
        ]
      }
    ],
    equipment: [
      {
        id: 'equipment-basics',
        title: 'Cơ Bản Về Trang Bị',
        difficulty: 'Dễ',
        duration: '8 phút',
        content: [
          {
            type: 'text',
            content: 'Trang bị quyết định phần lớn sức mạnh của nhân vật.'
          },
          {
            type: 'equipment-types',
            content: [
              { slot: 'Vũ Khí', effect: 'Tăng sát thương chính', rarity: 'Từ Thường đến Thần Khí' },
              { slot: 'Áo Giáp', effect: 'Tăng phòng thủ và HP', rarity: 'Nhiều cấp độ khác nhau' },
              { slot: 'Phụ Kiện', effect: 'Tăng chỉ số đặc biệt', rarity: 'Hiếm và quý giá' },
              { slot: 'Cánh', effect: 'Tăng tốc độ và combat power', rarity: 'Rất hiếm' }
            ]
          }
        ]
      },
      {
        id: 'enhancement-guide',
        title: 'Hướng Dẫn Cường Hóa',
        difficulty: 'Trung Bình',
        duration: '10 phút',
        content: [
          {
            type: 'text',
            content: 'Cường hóa giúp tăng sức mạnh của trang bị hiện có.'
          },
          {
            type: 'enhancement-methods',
            content: [
              { method: 'Nâng Cấp', description: 'Tăng level trang bị bằng vật liệu', success: '100%' },
              { method: 'Tinh Luyện', description: 'Cải thiện chất lượng trang bị', success: 'Phụ thuộc level' },
              { method: 'Khảm Ngọc', description: 'Gắn ngọc tăng chỉ số', success: '100%' },
              { method: 'Kế Thừa', description: 'Chuyển cấp độ sang trang bị khác', success: '100%' }
            ]
          }
        ]
      }
    ],
    systems: [
      {
        id: 'pet-system',
        title: 'Hệ Thống Thú Cưng',
        difficulty: 'Trung Bình',
        duration: '12 phút',
        content: [
          {
            type: 'text',
            content: 'Thú cưng đồng hành và hỗ trợ trong chiến đấu.'
          },
          {
            type: 'pet-features',
            content: [
              'Thu thập: Bắt thú hoang, mua từ shop',
              'Tiến hóa: Nâng cấp thành dạng mạnh hơn',
              'Kỹ năng: Mỗi pet có kỹ năng riêng',
              'Hỗ trợ: Tự động chiến đấu cùng chủ nhân'
            ]
          }
        ]
      },
      {
        id: 'sect-system',
        title: 'Hệ Thống Tông Môn',
        difficulty: 'Trung Bình',
        duration: '15 phút',
        content: [
          {
            type: 'text',
            content: 'Tham gia tông môn để học tập và rèn luyện.'
          },
          {
            type: 'sect-benefits',
            content: [
              'Học kỹ năng đặc biệt của tông môn',
              'Nhận nhiệm vụ và phần thưởng',
              'Tham gia hoạt động tông môn',
              'Tăng uy tín và địa vị'
            ]
          }
        ]
      }
    ],
    social: [
      {
        id: 'guild-guide',
        title: 'Hướng Dẫn Bang Hội',
        difficulty: 'Dễ',
        duration: '8 phút',
        content: [
          {
            type: 'text',
            content: 'Bang hội là nơi tập hợp những tu sĩ cùng chí hướng.'
          },
          {
            type: 'guild-features',
            content: [
              'Tạo hoặc gia nhập bang hội',
              'Tham gia chiến tranh bang hội',
              'Nhận buff từ công trình bang',
              'Chat riêng với thành viên'
            ]
          }
        ]
      },
      {
        id: 'friends-system',
        title: 'Hệ Thống Bạn Bè',
        difficulty: 'Dễ',
        duration: '5 phút',
        content: [
          {
            type: 'text',
            content: 'Kết bạn và tương tác với người chơi khác.'
          },
          {
            type: 'friend-actions',
            content: [
              'Gửi lời mời kết bạn',
              'Chat riêng tư',
              'Tặng quà hàng ngày',
              'Cùng nhau làm nhiệm vụ'
            ]
          }
        ]
      }
    ],
    economy: [
      {
        id: 'currency-guide',
        title: 'Hướng Dẫn Tiền Tệ',
        difficulty: 'Dễ',
        duration: '6 phút',
        content: [
          {
            type: 'text',
            content: 'Hiểu về các loại tiền tệ trong game.'
          },
          {
            type: 'currency-types',
            content: [
              { name: 'Bạc', usage: 'Mua vật phẩm cơ bản', obtain: 'Nhiệm vụ, bán đồ' },
              { name: 'Kim Nguyên Bảo', usage: 'Mua vật phẩm cao cấp', obtain: 'Nạp tiền, event' },
              { name: 'Linh Thạch', usage: 'Tu luyện, mua đặc biệt', obtain: 'Đặc biệt từ game' },
              { name: 'Danh Vọng', usage: 'Đổi vật phẩm PvP', obtain: 'Chiến thắng PvP' }
            ]
          }
        ]
      },
      {
        id: 'shop-guide',
        title: 'Hướng Dẫn Cửa Hàng',
        difficulty: 'Dễ',
        duration: '7 phút',
        content: [
          {
            type: 'text',
            content: 'Các loại cửa hàng và cách sử dụng hiệu quả.'
          },
          {
            type: 'shop-types',
            content: [
              'Cửa hàng thường: Vật phẩm cơ bản',
              'Cửa hàng VIP: Vật phẩm cao cấp',
              'Chợ người chơi: Giao dịch tự do',
              'Shop event: Vật phẩm giới hạn'
            ]
          }
        ]
      }
    ],
    events: [
      {
        id: 'daily-events',
        title: 'Sự Kiện Hàng Ngày',
        difficulty: 'Dễ',
        duration: '5 phút',
        content: [
          {
            type: 'text',
            content: 'Các hoạt động có thể làm mỗi ngày để nhận thưởng.'
          },
          {
            type: 'daily-list',
            content: [
              'Đăng nhập hàng ngày',
              'Hoàn thành nhiệm vụ daily',
              'Tham gia arena',
              'Tu luyện offline',
              'Câu cá giải trí'
            ]
          }
        ]
      },
      {
        id: 'special-events',
        title: 'Sự Kiện Đặc Biệt',
        difficulty: 'Trung Bình',
        duration: '10 phút',
        content: [
          {
            type: 'text',
            content: 'Các event lớn với phần thưởng giá trị.'
          },
          {
            type: 'event-types',
            content: [
              'Event nạp thẻ: Thưởng theo số tiền nạp',
              'Event ranking: Thi đua xếp hạng',
              'Event boss: Đánh boss thế giới',
              'Event lễ hội: Theo dịp đặc biệt'
            ]
          }
        ]
      }
    ]
  };

  const filteredGuides = Object.entries(guides).reduce((acc, [category, categoryGuides]) => {
    const filtered = categoryGuides.filter(guide => 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.content.some(item => 
        typeof item.content === 'string' && item.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, Guide[]>);

  const renderGuideContent = (content: GuideContentItem[]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'text':
          return (
            <p key={index} className={`text-muted-foreground mb-4 leading-relaxed ${isMobile ? 'text-sm' : 'text-sm'}`}>
              {typeof item.content === 'string' ? item.content : ''}
            </p>
          );
        
        case 'steps':
          return (
            <div key={index} className="mb-4">
              <h4 className={`font-medium mb-2 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                <Target className="w-4 h-4 text-blue-500" />
                Các Bước Thực Hiện:
              </h4>
              <ol className="space-y-2">
                {Array.isArray(item.content) && item.content.map((step: string, stepIndex: number) => (
                  <li key={stepIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <Badge variant="outline" className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      {stepIndex + 1}
                    </Badge>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        
        case 'tip':
          return (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5" />
                <p className={`text-blue-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {typeof item.content === 'string' ? item.content : ''}
                </p>
              </div>
            </div>
          );
        
        case 'feature-list':
          return (
            <div key={index} className="space-y-3 mb-4">
              {Array.isArray(item.content) && item.content.map((feature: any, featureIndex: number) => (
                <div key={featureIndex} className={`flex items-start gap-3 p-3 bg-muted/30 rounded-lg ${isMobile ? 'p-2' : 'p-3'}`}>
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <h5 className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{feature.name}</h5>
                    <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        
        default:
          return null;
      }
    });
  };

  const totalGuides = Object.values(guides).flat().length;
  const completionRate = (completedGuides.length / totalGuides) * 100;

  return (
    <div className={`space-y-6 ${isMobile ? 'space-y-4' : 'space-y-6'}`}>
      {/* Header with Search */}
      <Card className={`${isMobile ? 'p-3' : 'p-4'}`}>
        <div className={`flex items-center justify-between ${isMobile ? 'mb-3 flex-col space-y-3' : 'mb-4'}`}>
          <div className="flex items-center gap-3 w-full">
            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center`}>
              <BookOpen className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
            </div>
            <div className="flex-1">
              <h2 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>Cẩm Nang Tu Tiên</h2>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>Hướng dẫn toàn diện mọi tính năng</p>
            </div>
          </div>
          <div className={`${isMobile ? 'w-full' : 'text-right'}`}>
            <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>Tiến độ hoàn thành</p>
            <div className={`flex items-center gap-2 ${isMobile ? 'mt-1' : 'mt-1'}`}>
              <Progress value={completionRate} className={`${isMobile ? 'flex-1 h-2' : 'w-20 h-2'}`} />
              <span className="text-xs font-medium">{Math.round(completionRate)}%</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm hướng dẫn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${isMobile ? 'min-h-[44px]' : ''}`}
          />
        </div>
      </Card>

      {/* Category Navigation */}
      {!searchTerm && (
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {guideCategories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`h-auto justify-start ${isMobile ? 'p-3 min-h-[60px]' : 'p-3'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-white`} />
                </div>
                <div className="text-left flex-1">
                  <div className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>{category.name}</div>
                  <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>{category.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      )}

      {/* Guide Content */}
      <div className={`space-y-4 ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
        {searchTerm ? (
          // Search Results
          Object.entries(filteredGuides).map(([category, categoryGuides]) => (
            <div key={category}>
              <h3 className={`font-medium mb-3 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                <Sparkles className="w-4 h-4 text-primary" />
                Kết quả tìm kiếm trong {guideCategories.find(c => c.id === category)?.name}
              </h3>
              <div className={`space-y-3 ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                {categoryGuides.map((guide: Guide) => (
                  <Card key={guide.id} className={`${isMobile ? 'p-3' : 'p-4'}`}>
                    <div className={`flex items-start justify-between ${isMobile ? 'mb-2' : 'mb-3'}`}>
                      <div className="flex-1 pr-2">
                        <h4 className={`font-medium flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                          {guide.title}
                          {completedGuides.includes(guide.id) && (
                            <Check className="w-4 h-4 text-green-500" />
                          )}
                        </h4>
                        <div className={`flex items-center gap-3 text-muted-foreground mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                          <span>📚 {guide.difficulty}</span>
                          <span>⏱️ {guide.duration}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markGuideCompleted(guide.id)}
                        disabled={completedGuides.includes(guide.id)}
                        className={`${isMobile ? 'min-h-[40px] px-3' : ''}`}
                      >
                        {completedGuides.includes(guide.id) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    <Accordion type="single" collapsible>
                      <AccordionItem value="content">
                        <AccordionTrigger className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Xem chi tiết</AccordionTrigger>
                        <AccordionContent>
                          {renderGuideContent(guide.content)}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Category Guides
          <div className={`space-y-3 ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
            {guides[activeCategory]?.map((guide: Guide) => (
              <Card key={guide.id} className={`${isMobile ? 'p-3' : 'p-4'}`}>
                <div className={`flex items-start justify-between ${isMobile ? 'mb-2' : 'mb-3'}`}>
                  <div className="flex-1 pr-2">
                    <h4 className={`font-medium flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {guide.title}
                      {completedGuides.includes(guide.id) && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </h4>
                    <div className={`flex items-center gap-3 text-muted-foreground mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      <span>📚 {guide.difficulty}</span>
                      <span>⏱️ {guide.duration}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markGuideCompleted(guide.id)}
                    disabled={completedGuides.includes(guide.id)}
                    className={`${isMobile ? 'min-h-[40px] px-3' : ''}`}
                  >
                    {completedGuides.includes(guide.id) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="content">
                    <AccordionTrigger className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Xem chi tiết</AccordionTrigger>
                    <AccordionContent>
                      {renderGuideContent(guide.content)}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <Card className={`bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 ${isMobile ? 'p-3' : 'p-4'}`}>
        <div className="flex items-start gap-3">
          <Info className={`text-purple-500 mt-0.5 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          <div>
            <h4 className={`font-medium text-purple-700 mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>Mẹo Hay</h4>
            <p className={`text-purple-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              Hãy đọc hướng dẫn cơ bản trước khi khám phá các tính năng nâng cao. 
              Đánh dấu hoàn thành để theo dõi tiến độ học tập của bạn!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GuideSystem;
