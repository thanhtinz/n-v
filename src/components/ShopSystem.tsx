
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useGameState } from '@/hooks/useGameState';
import { useShopData } from '@/hooks/useShopData';
import { 
  ShoppingCart, 
  Gem, 
  Crown, 
  Coins,
  Sparkles,
  Star,
  Package,
  Store
} from 'lucide-react';

type ShopTab = 'shops' | 'recharge' | 'premium';

const ShopSystem = () => {
  const { gameState, addNotification } = useGameState();
  const { activeShops } = useShopData();
  const [activeTab, setActiveTab] = useState<ShopTab>('shops');
  const [selectedShop, setSelectedShop] = useState<number | null>(null);

  // Recharge packages
  const rechargePackages = [
    {
      id: 'pack1',
      name: 'Gói Khởi Đầu',
      realPrice: '29.000 VNĐ',
      goldIngots: 300,
      bonus: 'Tặng 50 Kim Nguyên Bảo',
      popular: false
    },
    {
      id: 'pack2', 
      name: 'Gói Phát Triển',
      realPrice: '99.000 VNĐ',
      goldIngots: 1200,
      bonus: 'Tặng 300 Kim Nguyên Bảo',
      popular: true
    },
    {
      id: 'pack3',
      name: 'Gói Cao Thủ',
      realPrice: '199.000 VNĐ', 
      goldIngots: 2500,
      bonus: 'Tặng 800 Kim Nguyên Bảo',
      popular: false
    }
  ];

  // VIP benefits
  const vipBenefits = [
    {
      level: 1,
      requirement: 'Nạp 50.000 VNĐ',
      benefits: ['Tăng 5% kinh nghiệm', 'Giảm 10% thời gian chờ', 'Mở kho đồ VIP']
    },
    {
      level: 2, 
      requirement: 'Nạp 200.000 VNĐ',
      benefits: ['Tăng 10% kinh nghiệm', 'Giảm 20% thời gian chờ', 'Nhận quà VIP hàng ngày']
    },
    {
      level: 3,
      requirement: 'Nạp 500.000 VNĐ', 
      benefits: ['Tăng 15% kinh nghiệm', 'Tăng 5% tỷ lệ rơi đồ', 'Trang phục VIP độc quyền']
    }
  ];

  const handlePurchase = (item: any, price: number) => {
    const playerSilver = gameState.player.silver;
    
    if (playerSilver >= price) {
      addNotification(`Mua ${item.name} thành công!`, 'success');
    } else {
      addNotification(`Không đủ bạc để mua ${item.name}!`, 'warning');
    }
  };

  const handleRecharge = (pack: any) => {
    addNotification(`Đã chuyển đến trang thanh toán cho ${pack.name}`, 'info');
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 text-gray-400';
      case 'rare': return 'border-blue-400 text-blue-400';
      case 'epic': return 'border-purple-400 text-purple-400';
      case 'legendary': return 'border-yellow-400 text-yellow-400';
      default: return 'border-gray-400 text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      weapon: 'bg-red-100 text-red-700',
      armor: 'bg-blue-100 text-blue-700',
      pet: 'bg-green-100 text-green-700',
      plant: 'bg-emerald-100 text-emerald-700',
      food: 'bg-orange-100 text-orange-700',
      material: 'bg-purple-100 text-purple-700',
      event: 'bg-pink-100 text-pink-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const currentShop = selectedShop ? activeShops.find(shop => shop.id === selectedShop) : null;

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cửa Hàng & Nạp Thẻ
        </h2>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ShopTab)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shops" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Cửa Hàng
            </TabsTrigger>
            <TabsTrigger value="recharge" className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Nạp Thẻ
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              VIP
            </TabsTrigger>
          </TabsList>

          {/* Shops Tab */}
          <TabsContent value="shops" className="space-y-4">
            {!selectedShop ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeShops.map((shop) => (
                  <Card key={shop.id} className="p-4 bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setSelectedShop(shop.id)}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cultivator-gold/20 to-spirit-jade/20 flex items-center justify-center">
                        <Package className="w-6 h-6 text-cultivator-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{shop.name}</h3>
                        <Badge className={`text-xs ${getCategoryColor(shop.category)}`}>
                          {shop.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-3">
                      {shop.items.length} vật phẩm có sẵn
                    </div>
                    
                    <Button size="sm" className="w-full bg-cultivator-gold hover:bg-cultivator-gold/80 text-black">
                      Vào Cửa Hàng
                    </Button>
                  </Card>
                ))}
                
                {activeShops.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <Store className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Chưa có cửa hàng nào hoạt động</p>
                    <p className="text-sm">Vui lòng liên hệ admin để thêm cửa hàng</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => setSelectedShop(null)}>
                    ← Quay Lại
                  </Button>
                  <h3 className="text-lg font-semibold">{currentShop?.name}</h3>
                  <Badge className={getCategoryColor(currentShop?.category || '')}>
                    {currentShop?.category}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentShop?.items.map((shopItem) => (
                    <Card key={shopItem.item.id} className="p-4 bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cultivator-gold/20 to-spirit-jade/20 flex items-center justify-center">
                          <img 
                            src={shopItem.item.icon} 
                            alt={shopItem.item.name}
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/placeholder-item.png';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{shopItem.item.name}</h4>
                            <Badge variant="outline" className={getRarityColor(shopItem.item.rarity)}>
                              {shopItem.item.rarity}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{shopItem.item.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-cultivator-gold">
                                {shopItem.price.toLocaleString()} Bạc
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Còn: {shopItem.quantity}
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handlePurchase(shopItem.item, shopItem.price)}
                              className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                              disabled={shopItem.quantity <= 0}
                            >
                              Mua
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {currentShop?.items.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Cửa hàng này chưa có vật phẩm nào</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Recharge Tab */}
          <TabsContent value="recharge" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rechargePackages.map((pack) => (
                <Card key={pack.id} className={`p-4 relative ${pack.popular ? 'border-cultivator-gold bg-cultivator-gold/5' : 'bg-muted/20'}`}>
                  {pack.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-cultivator-gold text-black">
                        <Star className="w-3 h-3 mr-1" />
                        Phổ Biến
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-center space-y-3">
                    <h3 className="font-semibold text-lg">{pack.name}</h3>
                    <div className="text-2xl font-bold text-cultivator-gold">{pack.realPrice}</div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Gem className="w-4 h-4 text-yellow-500" />
                        <span>{pack.goldIngots} Kim Nguyên Bảo</span>
                      </div>
                      <div className="text-sm text-spirit-jade">{pack.bonus}</div>
                    </div>
                    
                    <Button 
                      className="w-full bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                      onClick={() => handleRecharge(pack)}
                    >
                      Nạp Ngay
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* VIP Tab */}
          <TabsContent value="premium" className="space-y-4">
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-mystical-purple/20 to-divine-blue/20">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-mystical-purple" />
                  <h3 className="text-lg font-semibold">VIP Hiện Tại: Cấp {gameState.player.vipLevel}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tổng nạp: {gameState.player.totalRecharge.toLocaleString()} VNĐ
                </p>
              </Card>

              {vipBenefits.map((vip) => (
                <Card key={vip.level} className="p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-mystical-purple" />
                      <h4 className="font-medium">VIP {vip.level}</h4>
                    </div>
                    <Badge variant="outline">{vip.requirement}</Badge>
                  </div>
                  
                  <div className="space-y-1">
                    {vip.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-3 h-3 text-spirit-jade" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ShopSystem;
