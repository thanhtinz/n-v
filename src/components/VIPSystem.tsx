
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Zap, Gift, Crown, Shield, Sword } from 'lucide-react';

const VIPSystem = () => {
  const [currentVIP, setCurrentVIP] = useState(2);
  const [totalRecharge, setTotalRecharge] = useState(150000);
  
  const vipLevels = [
    { 
      level: 0, 
      name: 'Phàm Nhân', 
      recharge: 0, 
      benefits: ['Tính năng cơ bản'], 
      dailyReward: '10 Vàng',
      color: 'text-muted-foreground'
    },
    { 
      level: 1, 
      name: 'Đồng Tiên', 
      recharge: 50000, 
      benefits: ['Auto tu luyện 2h', 'Tăng 10% EXP'], 
      dailyReward: '50 Vàng + 10 Linh Thạch',
      color: 'text-yellow-600'
    },
    { 
      level: 2, 
      name: 'Bạc Tiên', 
      recharge: 100000, 
      benefits: ['Auto tu luyện 4h', 'Tăng 20% EXP', 'Khung chat đặc biệt'], 
      dailyReward: '100 Vàng + 20 Linh Thạch',
      color: 'text-gray-400'
    },
    { 
      level: 3, 
      name: 'Vàng Tiên', 
      recharge: 200000, 
      benefits: ['Auto tu luyện 6h', 'Tăng 30% EXP', 'Ưu tiên đấu trường'], 
      dailyReward: '200 Vàng + 50 Linh Thạch',
      color: 'text-yellow-500'
    },
    { 
      level: 4, 
      name: 'Kim Cương Tiên', 
      recharge: 500000, 
      benefits: ['Auto tu luyện 8h', 'Tăng 50% EXP', 'Tính năng độc quyền'], 
      dailyReward: '500 Vàng + 100 Linh Thạch',
      color: 'text-blue-400'
    },
    { 
      level: 5, 
      name: 'Chí Tôn', 
      recharge: 1000000, 
      benefits: ['Auto không giới hạn', 'Tăng 100% EXP', 'Mọi đặc quyền'], 
      dailyReward: '1000 Vàng + 200 Linh Thạch',
      color: 'text-purple-500'
    }
  ];

  const rechargePackages = [
    { amount: 50000, diamond: 500, bonus: '100% lần đầu', popular: false },
    { amount: 100000, diamond: 1000, bonus: '+200 kim cương', popular: true },
    { amount: 200000, diamond: 2000, bonus: '+500 kim cương', popular: false },
    { amount: 500000, diamond: 5000, bonus: '+1500 kim cương', popular: false },
    { amount: 1000000, diamond: 10000, bonus: '+3000 kim cương', popular: false }
  ];

  const getNextVIPLevel = () => {
    return vipLevels.find(vip => vip.level > currentVIP);
  };

  const getCurrentProgress = () => {
    const currentLevel = vipLevels.find(vip => vip.level === currentVIP);
    const nextLevel = getNextVIPLevel();
    
    if (!nextLevel) return 100;
    
    const progress = ((totalRecharge - (currentLevel?.recharge || 0)) / 
                     (nextLevel.recharge - (currentLevel?.recharge || 0))) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const getVIPIcon = (level: number) => {
    if (level === 0) return <Shield className="w-4 h-4" />;
    if (level <= 2) return <Star className="w-4 h-4" />;
    if (level <= 4) return <Crown className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-mystical-purple/10 border-cultivator-gold/30">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-cultivator-gold" />
          <h3 className="font-semibold text-cultivator-gold">Hệ Thống VIP</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Nạp tiền để nâng cấp VIP và nhận đặc quyền độc quyền.
        </p>
      </Card>

      {/* Current VIP Status */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            {getVIPIcon(currentVIP)}
            <h3 className={`text-xl font-bold ${vipLevels[currentVIP].color}`}>
              VIP {currentVIP} - {vipLevels[currentVIP].name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Tổng nạp: {totalRecharge.toLocaleString()} VNĐ
          </p>
        </div>

        {getNextVIPLevel() && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Tiến độ lên VIP {getNextVIPLevel()?.level}</span>
              <span>{totalRecharge.toLocaleString()} / {getNextVIPLevel()?.recharge.toLocaleString()}</span>
            </div>
            <Progress value={getCurrentProgress()} className="h-3" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Đặc Quyền Hiện Tại</h4>
            <div className="space-y-1">
              {vipLevels[currentVIP].benefits.map((benefit, index) => (
                <div key={index} className="text-sm flex items-center gap-2">
                  <Star className="w-3 h-3 text-cultivator-gold" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Quà Hàng Ngày</h4>
            <div className="p-3 bg-spirit-jade/10 rounded-lg border border-spirit-jade/30">
              <div className="text-sm text-spirit-jade font-medium">
                {vipLevels[currentVIP].dailyReward}
              </div>
              <Button size="sm" className="w-full mt-2">Nhận Quà</Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="levels" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="levels">Cấp VIP</TabsTrigger>
          <TabsTrigger value="recharge">Nạp Tiền</TabsTrigger>
        </TabsList>

        <TabsContent value="levels" className="space-y-3">
          {vipLevels.map(vip => (
            <Card 
              key={vip.level} 
              className={`p-4 ${vip.level === currentVIP ? 'border-cultivator-gold bg-cultivator-gold/5' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getVIPIcon(vip.level)}
                  <h4 className={`font-medium ${vip.color}`}>VIP {vip.level} - {vip.name}</h4>
                  {vip.level === currentVIP && (
                    <Badge variant="outline" className="border-cultivator-gold text-cultivator-gold">
                      Hiện Tại
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {vip.recharge.toLocaleString()} VNĐ
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-1">Đặc Quyền</h5>
                  <div className="space-y-1">
                    {vip.benefits.map((benefit, index) => (
                      <div key={index} className="text-xs flex items-center gap-1">
                        <Star className="w-2 h-2 text-cultivator-gold" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-1">Quà Hàng Ngày</h5>
                  <div className="text-xs text-spirit-jade">{vip.dailyReward}</div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recharge" className="space-y-3">
          {rechargePackages.map((pkg, index) => (
            <Card key={index} className={`p-4 ${pkg.popular ? 'border-cultivator-gold bg-cultivator-gold/5' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-mystical-purple/20 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-mystical-purple" />
                  </div>
                  <div>
                    <div className="font-medium">{pkg.amount.toLocaleString()} VNĐ</div>
                    <div className="text-sm text-muted-foreground">
                      {pkg.diamond} Kim Cương
                    </div>
                    {pkg.bonus && (
                      <div className="text-xs text-cultivator-gold">{pkg.bonus}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {pkg.popular && (
                    <Badge className="mb-2 bg-cultivator-gold text-black">Phổ Biến</Badge>
                  )}
                  <Button>Nạp Ngay</Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VIPSystem;
