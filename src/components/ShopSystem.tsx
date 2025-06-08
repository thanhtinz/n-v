
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  ShoppingCart, 
  Coins, 
  Gem, 
  Star,
  Crown,
  Sparkles,
  Package,
  Shirt,
  Sword,
  Shield,
  Zap,
  Heart,
  Gift,
  CreditCard,
  Wallet,
  DollarSign,
  Plus
} from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'silver' | 'goldIngots' | 'rechargeSpiritStones';
  category: 'weapon' | 'armor' | 'cosmetic' | 'consumable' | 'premium';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image?: string;
  discount?: number;
  isHot?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
}

interface RechargePackage {
  id: string;
  name: string;
  goldIngots: number;
  bonusIngots: number;
  price: number; // VND
  isPopular?: boolean;
  isFirstTime?: boolean;
  discount?: number;
}

const ShopSystem = () => {
  const { gameState, claimReward, addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState<'items' | 'recharge' | 'premium'>('items');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const shopItems: ShopItem[] = [
    // Weapons
    {
      id: 'w1',
      name: 'Kiếm Thiên Long',
      description: 'Kiếm huyền thoại với sức mạnh rồng thiêng +150 ATK',
      price: 2500,
      currency: 'goldIngots',
      category: 'weapon',
      rarity: 'legendary',
      isHot: true
    },
    {
      id: 'w2',
      name: 'Cung Phong Thần',
      description: 'Cung tên với tốc độ bắn cực nhanh +120 ATK, +30% Tốc Độ',
      price: 1800,
      currency: 'goldIngots',
      category: 'weapon',
      rarity: 'epic',
      isNew: true
    },
    
    // Armor
    {
      id: 'a1',
      name: 'Giáp Hoàng Kim',
      description: 'Bộ giáp vàng sang trọng +200 DEF, +50 HP',
      price: 2000,
      currency: 'goldIngots',
      category: 'armor',
      rarity: 'epic',
      discount: 20
    },
    {
      id: 'a2',
      name: 'Áo Choàng Ma Pháp',
      description: 'Tăng sức mạnh phép thuật +100 MAGIC, +30 MP',
      price: 1500,
      currency: 'goldIngots',
      category: 'armor',
      rarity: 'rare'
    },

    // Cosmetics
    {
      id: 'c1',
      name: 'Cánh Thiên Thần',
      description: 'Đôi cánh thiên thần tuyệt đẹp với hiệu ứng sáng',
      price: 3000,
      currency: 'goldIngots',
      category: 'cosmetic',
      rarity: 'legendary',
      isLimited: true
    },
    {
      id: 'c2',
      name: 'Mũ Hoàng Gia',
      description: 'Mũ hoàng gia sang trọng thể hiện đẳng cấp',
      price: 800,
      currency: 'goldIngots',
      category: 'cosmetic',
      rarity: 'rare'
    },
    {
      id: 'c3',
      name: 'Trang Phục Ninja',
      description: 'Bộ trang phục ninja bí ẩn với hiệu ứng tàng hình',
      price: 1200,
      currency: 'goldIngots',
      category: 'cosmetic',
      rarity: 'epic',
      isNew: true
    },

    // Consumables
    {
      id: 'p1',
      name: 'Gói Thuốc Hồi Sinh',
      description: '10 chai thuốc hồi phục 100% HP ngay lập tức',
      price: 50000,
      currency: 'silver',
      category: 'consumable',
      rarity: 'common'
    },
    {
      id: 'p2',
      name: 'Lệnh Bài Kinh Nghiệm x2',
      description: 'Tăng gấp đôi kinh nghiệm trong 2 giờ',
      price: 200,
      currency: 'goldIngots',
      category: 'consumable',
      rarity: 'rare',
      isHot: true
    },

    // Premium
    {
      id: 'pr1',
      name: 'Thẻ VIP Tháng',
      description: 'Đặc quyền VIP trong 30 ngày: +50% EXP, quà hàng ngày',
      price: 500,
      currency: 'goldIngots',
      category: 'premium',
      rarity: 'legendary'
    }
  ];

  const rechargePackages: RechargePackage[] = [
    {
      id: 'r1',
      name: 'Gói Khởi Đầu',
      goldIngots: 100,
      bonusIngots: 10,
      price: 20000,
      isFirstTime: true
    },
    {
      id: 'r2',
      name: 'Gói Tiết Kiệm',
      goldIngots: 300,
      bonusIngots: 50,
      price: 50000
    },
    {
      id: 'r3',
      name: 'Gói Phổ Biến',
      goldIngots: 600,
      bonusIngots: 120,
      price: 100000,
      isPopular: true
    },
    {
      id: 'r4',
      name: 'Gói Cao Cấp',
      goldIngots: 1200,
      bonusIngots: 300,
      price: 200000,
      discount: 15
    },
    {
      id: 'r5',
      name: 'Gói Đại Gia',
      goldIngots: 3000,
      bonusIngots: 1000,
      price: 500000,
      discount: 20
    },
    {
      id: 'r6',
      name: 'Gói Hoàng Gia',
      goldIngots: 6000,
      bonusIngots: 2500,
      price: 1000000,
      discount: 25
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất Cả', icon: Package },
    { id: 'weapon', label: 'Vũ Khí', icon: Sword },
    { id: 'armor', label: 'Giáp Áo', icon: Shield },
    { id: 'cosmetic', label: 'Thời Trang', icon: Shirt },
    { id: 'consumable', label: 'Tiêu Hao', icon: Heart },
    { id: 'premium', label: 'Cao Cấp', icon: Crown }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'silver': return Coins;
      case 'goldIngots': return Gem;
      case 'rechargeSpiritStones': return Sparkles;
      default: return Coins;
    }
  };

  const getCurrencyName = (currency: string) => {
    switch (currency) {
      case 'silver': return 'Bạc';
      case 'goldIngots': return 'Kim Nguyên Bảo';
      case 'rechargeSpiritStones': return 'Linh Thạch Nạp';
      default: return 'Bạc';
    }
  };

  const canAfford = (item: ShopItem) => {
    const playerCurrency = gameState.player[item.currency];
    return playerCurrency >= item.price;
  };

  const buyItem = (item: ShopItem) => {
    if (!canAfford(item)) {
      addNotification(`Không đủ ${getCurrencyName(item.currency)}!`, 'warning');
      return;
    }

    // Deduct currency (this would need to be implemented in gameState)
    addNotification(`Đã mua ${item.name} thành công!`, 'success');
  };

  const recharge = (pkg: RechargePackage) => {
    // This would typically open a payment gateway
    const totalIngots = pkg.goldIngots + pkg.bonusIngots;
    addNotification(`Đã nạp thành công ${totalIngots} Kim Nguyên Bảo!`, 'success');
    claimReward('goldIngots', totalIngots);
  };

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cửa Hàng Tu Tiên
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Vật Phẩm
            </TabsTrigger>
            <TabsTrigger value="recharge" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Nạp Thẻ
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              VIP
            </TabsTrigger>
          </TabsList>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-4">
            {/* Category Filter */}
            <Card className="p-3 bg-muted/20">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-1"
                    >
                      <Icon className="w-3 h-3" />
                      <span className="text-xs">{category.label}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const CurrencyIcon = getCurrencyIcon(item.currency);
                const affordable = canAfford(item);
                
                return (
                  <Card key={item.id} className="p-4 bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="space-y-3">
                      {/* Header with badges */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                              {item.rarity}
                            </Badge>
                            {item.isHot && (
                              <Badge className="text-xs bg-red-500 text-white">HOT</Badge>
                            )}
                            {item.isNew && (
                              <Badge className="text-xs bg-green-500 text-white">MỚI</Badge>
                            )}
                            {item.isLimited && (
                              <Badge className="text-xs bg-purple-500 text-white">GIỚI HẠN</Badge>
                            )}
                          </div>
                        </div>
                        {item.discount && (
                          <Badge className="bg-orange-500 text-white text-xs">
                            -{item.discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground">{item.description}</p>

                      {/* Price and Buy */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <CurrencyIcon className="w-4 h-4 text-cultivator-gold" />
                          <span className="font-bold text-cultivator-gold">
                            {item.discount ? (
                              <>
                                <span className="line-through text-muted-foreground mr-1">
                                  {item.price.toLocaleString()}
                                </span>
                                {Math.round(item.price * (1 - item.discount / 100)).toLocaleString()}
                              </>
                            ) : (
                              item.price.toLocaleString()
                            )}
                          </span>
                        </div>
                        
                        <Button
                          size="sm"
                          disabled={!affordable}
                          onClick={() => buyItem(item)}
                          className="bg-spirit-jade hover:bg-spirit-jade/80 disabled:opacity-50"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Mua
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Recharge Tab */}
          <TabsContent value="recharge" className="space-y-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Nạp Kim Nguyên Bảo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nạp thẻ để nhận Kim Nguyên Bảo và các phần thưởng bonus hấp dẫn!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rechargePackages.map((pkg) => (
                  <Card key={pkg.id} className={`p-4 bg-card/50 hover:bg-card/70 transition-colors ${
                    pkg.isPopular ? 'border-cultivator-gold border-2' : 'border-border/30'
                  }`}>
                    {pkg.isPopular && (
                      <div className="text-center mb-2">
                        <Badge className="bg-cultivator-gold text-black">PHỔ BIẾN NHẤT</Badge>
                      </div>
                    )}
                    
                    <div className="text-center space-y-3">
                      <h4 className="font-semibold text-lg">{pkg.name}</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Gem className="w-5 h-5 text-yellow-500" />
                          <span className="text-xl font-bold text-cultivator-gold">
                            {pkg.goldIngots.toLocaleString()}
                          </span>
                        </div>
                        
                        {pkg.bonusIngots > 0 && (
                          <div className="flex items-center justify-center gap-2 text-green-400">
                            <Plus className="w-4 h-4" />
                            <span className="font-medium">
                              Bonus: {pkg.bonusIngots.toLocaleString()}
                            </span>
                          </div>
                        )}
                        
                        {pkg.isFirstTime && (
                          <Badge className="bg-blue-500 text-white">LẦN ĐẦU x2</Badge>
                        )}
                      </div>

                      <div className="text-center">
                        {pkg.discount && (
                          <div className="text-sm text-muted-foreground line-through">
                            {Math.round(pkg.price / (1 - pkg.discount / 100)).toLocaleString()}đ
                          </div>
                        )}
                        <div className="text-lg font-bold text-red-500">
                          {pkg.price.toLocaleString()}đ
                        </div>
                        {pkg.discount && (
                          <Badge className="bg-red-500 text-white text-xs">
                            Giảm {pkg.discount}%
                          </Badge>
                        )}
                      </div>

                      <Button 
                        className="w-full bg-cultivator-gold hover:bg-cultivator-gold/80 text-black font-medium"
                        onClick={() => recharge(pkg)}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Nạp Ngay
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold mb-3 text-spirit-jade">Phương Thức Thanh Toán</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-card/50 rounded-lg text-center">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <span className="text-xs">Thẻ ATM</span>
                </div>
                <div className="p-3 bg-card/50 rounded-lg text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <span className="text-xs">Ví Điện Tử</span>
                </div>
                <div className="p-3 bg-card/50 rounded-lg text-center">
                  <Gem className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <span className="text-xs">Thẻ Game</span>
                </div>
                <div className="p-3 bg-card/50 rounded-lg text-center">
                  <Gift className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <span className="text-xs">SMS</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-4">
            <Card className="p-4 bg-gradient-to-r from-mystical-purple/20 to-cultivator-gold/20 border-cultivator-gold/50">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Crown className="w-8 h-8 text-cultivator-gold" />
                  <h3 className="text-2xl font-bold text-cultivator-gold">Hệ Thống VIP</h3>
                </div>
                
                <p className="text-muted-foreground">
                  Trở thành VIP để nhận được những đặc quyền độc quyền và ưu đãi tuyệt vời!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current VIP Status */}
                  <div className="p-4 bg-card/50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-spirit-jade">Trạng Thái Hiện Tại</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Cấp VIP:</span>
                        <Badge className="bg-mystical-purple">VIP {gameState.player.vipLevel}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tổng Nạp:</span>
                        <span className="font-bold text-cultivator-gold">
                          {gameState.player.totalRecharge.toLocaleString()}đ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* VIP Benefits */}
                  <div className="p-4 bg-card/50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-spirit-jade">Đặc Quyền VIP</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Kinh nghiệm +{gameState.player.vipLevel * 10}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span>Bạc rơi +{gameState.player.vipLevel * 15}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-red-500" />
                        <span>Quà hàng ngày</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-500" />
                        <span>Ưu tiên đăng nhập</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-mystical-purple to-cultivator-gold hover:opacity-90 text-white font-bold px-8">
                  <Crown className="w-5 h-5 mr-2" />
                  Nâng Cấp VIP
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ShopSystem;
