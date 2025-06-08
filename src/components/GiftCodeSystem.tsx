
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGameState } from '@/hooks/useGameState';
import { Gift, Check, Clock, Star } from 'lucide-react';

const GiftCodeSystem = () => {
  const { addNotification, claimReward } = useGameState();
  const [giftCode, setGiftCode] = useState('');
  const [usedCodes, setUsedCodes] = useState<string[]>(['NEWBIE2024', 'WELCOME100']);

  const availableGiftCodes = [
    {
      code: 'NEWBIE2024',
      description: 'Quà tặng tân thủ',
      rewards: ['5000 Bạc', '100 Kim Nguyên Bảo', '10 Linh Thạch'],
      expiry: '2024-12-31',
      used: true
    },
    {
      code: 'WELCOME100',
      description: 'Chào mừng 100K người chơi',
      rewards: ['10000 Bạc', '200 Kim Nguyên Bảo', 'Trang bị Epic'],
      expiry: '2024-06-30',
      used: true
    },
    {
      code: 'SUMMER2024',
      description: 'Sự kiện mùa hè',
      rewards: ['15000 Bạc', '300 Kim Nguyên Bảo', '20 Linh Thạch', 'Skin mùa hè'],
      expiry: '2024-08-31',
      used: false
    },
    {
      code: 'BIRTHDAY2024',
      description: 'Sinh nhật server 1 năm',
      rewards: ['20000 Bạc', '500 Kim Nguyên Bảo', '50 Linh Thạch', 'Pet sinh nhật'],
      expiry: '2024-07-15',
      used: false
    },
    {
      code: 'FESTIVAL2024',
      description: 'Lễ hội truyền thống',
      rewards: ['8000 Bạc', '150 Kim Nguyên Bảo', 'Thời trang lễ hội'],
      expiry: '2024-05-20',
      used: false
    }
  ];

  const weeklyGiftCodes = [
    {
      week: 'Tuần 1',
      code: 'WEEK1GIFT',
      rewards: ['3000 Bạc', '50 Kim Nguyên Bảo'],
      status: 'claimed'
    },
    {
      week: 'Tuần 2', 
      code: 'WEEK2GIFT',
      rewards: ['5000 Bạc', '100 Kim Nguyên Bảo'],
      status: 'available'
    },
    {
      week: 'Tuần 3',
      code: 'WEEK3GIFT', 
      rewards: ['8000 Bạc', '150 Kim Nguyên Bảo'],
      status: 'locked'
    },
    {
      week: 'Tuần 4',
      code: 'WEEK4GIFT',
      rewards: ['12000 Bạc', '200 Kim Nguyên Bảo', 'Trang bị Rare'],
      status: 'locked'
    }
  ];

  const specialEvents = [
    {
      name: 'Tết Nguyên Đán',
      description: 'Sự kiện Tết với nhiều quà tặng hấp dẫn',
      giftCodes: ['TET2024', 'XUANGIAP', 'THANHLONG'],
      rewards: 'Trang bị độc quyền + 1000 Kim Nguyên Bảo',
      status: 'coming_soon',
      startDate: '2024-02-10'
    },
    {
      name: 'Halloween',
      description: 'Lễ hội ma quái với skin kinh dị',
      giftCodes: ['HALLOWEEN2024', 'PUMPKIN', 'GHOST'],
      rewards: 'Skin Halloween + Pet ma',
      status: 'ended',
      startDate: '2023-10-31'
    }
  ];

  const handleSubmitCode = () => {
    if (!giftCode.trim()) {
      addNotification('Vui lòng nhập mã quà tặng!', 'warning');
      return;
    }

    const code = availableGiftCodes.find(c => c.code === giftCode.toUpperCase());
    
    if (!code) {
      addNotification('Mã quà tặng không hợp lệ!', 'warning');
      return;
    }

    if (usedCodes.includes(code.code)) {
      addNotification('Mã quà tặng đã được sử dụng!', 'warning');
      return;
    }

    // Check expiry
    const now = new Date();
    const expiry = new Date(code.expiry);
    if (now > expiry) {
      addNotification('Mã quà tặng đã hết hạn!', 'warning');
      return;
    }

    // Claim rewards
    setUsedCodes([...usedCodes, code.code]);
    
    // Give rewards
    code.rewards.forEach(reward => {
      if (reward.includes('Bạc')) {
        const amount = parseInt(reward.replace(/\D/g, ''));
        claimReward('silver', amount);
      } else if (reward.includes('Kim Nguyên Bảo')) {
        const amount = parseInt(reward.replace(/\D/g, ''));
        claimReward('goldIngots', amount);
      } else if (reward.includes('Linh Thạch')) {
        const amount = parseInt(reward.replace(/\D/g, ''));
        claimReward('rechargeSpiritStones', amount);
      }
    });

    addNotification(`Đã nhận quà từ mã: ${code.code}!`, 'success');
    setGiftCode('');
  };

  const handleClaimWeeklyGift = (weekGift: any) => {
    if (weekGift.status !== 'available') return;
    
    addNotification(`Đã nhận quà ${weekGift.week}!`, 'success');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-spirit-jade/10 to-cultivator-gold/10 border-spirit-jade/30">
        <h2 className="text-xl font-semibold text-spirit-jade mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          Hệ Thống Code Quà Tặng
        </h2>
        
        {/* Gift Code Input */}
        <Card className="p-4 mb-4 bg-muted/20">
          <h3 className="font-semibold mb-3">Nhập Mã Quà Tặng</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Nhập mã code tại đây..."
              value={giftCode}
              onChange={(e) => setGiftCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSubmitCode} className="bg-spirit-jade hover:bg-spirit-jade/80">
              Nhận Quà
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            * Mỗi mã chỉ có thể sử dụng 1 lần duy nhất
          </p>
        </Card>
      </Card>

      {/* Available Gift Codes */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-cultivator-gold">Danh Sách Mã Quà Tặng</h3>
        <div className="space-y-3">
          {availableGiftCodes.map((code, index) => (
            <Card key={index} className={`p-4 ${usedCodes.includes(code.code) ? 'bg-muted/30 opacity-60' : 'bg-muted/20'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{code.code}</h4>
                    {usedCodes.includes(code.code) ? (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        <Check className="w-3 h-3 mr-1" />
                        Đã sử dụng
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-spirit-jade text-spirit-jade">
                        Có thể sử dụng
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{code.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {code.rewards.map((reward, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-cultivator-gold text-cultivator-gold">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Hết hạn: {code.expiry}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Weekly Gift Codes */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-divine-blue">Mã Quà Hàng Tuần</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {weeklyGiftCodes.map((weekGift, index) => (
            <Card key={index} className={`p-3 ${
              weekGift.status === 'claimed' ? 'bg-green-100/50 border-green-500' :
              weekGift.status === 'available' ? 'bg-blue-100/50 border-blue-500' :
              'bg-muted/30 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{weekGift.week}</h4>
                <Badge variant="outline" className={
                  weekGift.status === 'claimed' ? 'border-green-500 text-green-500' :
                  weekGift.status === 'available' ? 'border-blue-500 text-blue-500' :
                  'border-gray-500 text-gray-500'
                }>
                  {weekGift.status === 'claimed' ? 'Đã nhận' :
                   weekGift.status === 'available' ? 'Có thể nhận' : 'Chưa mở'}
                </Badge>
              </div>
              
              <div className="text-xs font-mono bg-muted/50 p-2 rounded mb-2">
                {weekGift.code}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {weekGift.rewards.map((reward, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {reward}
                  </Badge>
                ))}
              </div>
              
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => handleClaimWeeklyGift(weekGift)}
                disabled={weekGift.status !== 'available'}
              >
                {weekGift.status === 'claimed' ? 'Đã nhận' :
                 weekGift.status === 'available' ? 'Nhận quà' : 'Chưa khả dụng'}
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Special Events */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-mystical-purple">Sự Kiện Đặc Biệt</h3>
        <div className="space-y-3">
          {specialEvents.map((event, index) => (
            <Card key={index} className="p-4 bg-gradient-to-r from-mystical-purple/10 to-cultivator-gold/10 border-mystical-purple/30">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-mystical-purple/20 to-cultivator-gold/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-mystical-purple" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <Badge variant="outline" className={
                      event.status === 'coming_soon' ? 'border-blue-500 text-blue-500' :
                      event.status === 'active' ? 'border-green-500 text-green-500' :
                      'border-gray-500 text-gray-500'
                    }>
                      {event.status === 'coming_soon' ? 'Sắp diễn ra' :
                       event.status === 'active' ? 'Đang diễn ra' : 'Đã kết thúc'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  
                  <div className="text-sm mb-2">
                    <strong>Mã code:</strong> {event.giftCodes.join(', ')}
                  </div>
                  
                  <div className="text-sm text-spirit-jade mb-2">
                    <strong>Phần thưởng:</strong> {event.rewards}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Thời gian: {event.startDate}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GiftCodeSystem;
