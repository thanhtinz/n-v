import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Coins, 
  TrendingUp, 
  Clock, 
  Star,
  Package,
  Users,
  Search,
  Plus,
  DollarSign
} from 'lucide-react';

interface MarketItem {
  id: string;
  name: string;
  category: 'weapon' | 'armor' | 'pill' | 'material' | 'misc';
  price: number;
  seller: string;
  quality: 'common' | 'rare' | 'epic' | 'legendary';
  timeLeft: number; // hours
  description: string;
  quantity: number;
}

interface PlayerItem {
  id: string;
  name: string;
  category: 'weapon' | 'armor' | 'pill' | 'material' | 'misc';
  quality: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  quantity: number;
  canSell: boolean;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  item: string;
  price: number;
  time: Date;
  buyer: string;
  seller: string;
}

const MarketSystem = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'history' | 'auction'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sellPrice, setSellPrice] = useState<string>('');
  const [sellDuration, setSellDuration] = useState<string>('24');

  const [marketItems] = useState<MarketItem[]>([
    {
      id: '1',
      name: 'Kiếm Phong Lôi',
      category: 'weapon',
      price: 1500,
      seller: 'Kiếm Thánh',
      quality: 'epic',
      timeLeft: 12,
      description: 'Kiếm với sức mạnh phong lôi, +25 Công Kích',
      quantity: 1
    },
    {
      id: '2',
      name: 'Hồi Linh Đan',
      category: 'pill',
      price: 50,
      seller: 'Đan Sư',
      quality: 'common',
      timeLeft: 24,
      description: 'Phục hồi 500 HP ngay lập tức',
      quantity: 10
    },
    {
      id: '3',
      name: 'Thiên Tằm Giáp',
      category: 'armor',
      price: 2200,
      seller: 'Luyện Khí Sư',
      quality: 'legendary',
      timeLeft: 6,
      description: 'Áo giáp huyền thoại, +40 Phòng Thủ',
      quantity: 1
    },
    {
      id: '4',
      name: 'Linh Thạch',
      category: 'material',
      price: 10,
      seller: 'Thương Gia',
      quality: 'common',
      timeLeft: 48,
      description: 'Nguyên liệu tu luyện cơ bản',
      quantity: 100
    }
  ]);

  const [playerItems] = useState<PlayerItem[]>([
    {
      id: 'p1',
      name: 'Tăng Lực Đan',
      category: 'pill',
      quality: 'common',
      description: 'Tăng sức mạnh tạm thời',
      quantity: 3,
      canSell: true
    },
    {
      id: 'p2',
      name: 'Linh Thảo',
      category: 'material',
      quality: 'common',
      description: 'Nguyên liệu luyện đan',
      quantity: 15,
      canSell: true
    },
    {
      id: 'p3',
      name: 'Kiếm Sắt Cũ',
      category: 'weapon',
      quality: 'common',
      description: 'Kiếm sắt đã qua sử dụng, +8 Công Kích',
      quantity: 1,
      canSell: true
    },
    {
      id: 'p4',
      name: 'Kiếm Sắt',
      category: 'weapon',
      quality: 'common',
      description: 'Kiếm sắt hiện tại đang trang bị',
      quantity: 1,
      canSell: false
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'buy',
      item: 'Tăng Lực Đan',
      price: 150,
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      buyer: 'Bạn',
      seller: 'NPCShop'
    },
    {
      id: '2',
      type: 'sell',
      item: 'Linh Thảo',
      price: 25,
      time: new Date(Date.now() - 5 * 60 * 60 * 1000),
      buyer: 'Đan Sư',
      seller: 'Bạn'
    }
  ]);

  const categories = [
    { id: 'all', label: 'Tất Cả', icon: Package },
    { id: 'weapon', label: 'Vũ Khí', icon: Star },
    { id: 'armor', label: 'Giáp', icon: Star },
    { id: 'pill', label: 'Đan Dược', icon: Star },
    { id: 'material', label: 'Nguyên Liệu', icon: Star }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case 'common': return 'Thường';
      case 'rare': return 'Hiếm';
      case 'epic': return 'Sử Thi';
      case 'legendary': return 'Huyền Thoại';
      default: return 'Thường';
    }
  };

  const buyItem = (item: MarketItem) => {
    alert(`Đã mua ${item.name} với giá ${item.price} Linh Thạch!`);
  };

  const sellItem = (item: PlayerItem) => {
    const price = parseInt(sellPrice);
    if (price > 0) {
      console.log(`Đã đặt bán ${item.name} với giá ${price} Linh Thạch, thời gian ${sellDuration}h`);
      setSellPrice('');
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? marketItems 
    : marketItems.filter(item => item.category === selectedCategory);

  const sellableItems = playerItems.filter(item => item.canSell);

  const tabs = [
    { id: 'browse', label: 'Duyệt', icon: Search },
    { id: 'sell', label: 'Bán', icon: Coins },
    { id: 'history', label: 'Lịch Sử', icon: Clock },
    { id: 'auction', label: 'Đấu Giá', icon: TrendingUp }
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-3 h-3" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-3">
          {/* Category Filter */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border/50">
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

          {/* Market Items */}
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-cultivator-gold/50 transition-colors">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm sm:text-base">{item.name}</span>
                      <Badge variant="outline" className={`text-xs ${getQualityColor(item.quality)}`}>
                        {getQualityLabel(item.quality)}
                      </Badge>
                      {item.quantity > 1 && (
                        <Badge variant="outline" className="text-xs">
                          x{item.quantity}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-2">
                      {item.description}
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {item.seller}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timeLeft}h
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-cultivator-gold font-bold">
                      <Coins className="w-4 h-4" />
                      <span>{item.price.toLocaleString()}</span>
                    </div>
                    <Button
                      onClick={() => buyItem(item)}
                      className="bg-spirit-jade hover:bg-spirit-jade/80"
                      size="sm"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      <span className="text-xs">Mua</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Sell Tab */}
      {activeTab === 'sell' && (
        <div className="space-y-4">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="font-semibold text-sm sm:text-base mb-4 text-cultivator-gold">Bán Vật Phẩm</h3>
            
            {sellableItems.length > 0 ? (
              <div className="space-y-3">
                {sellableItems.map((item) => (
                  <Card key={item.id} className="p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{item.name}</span>
                          <Badge variant="outline" className={`text-xs ${getQualityColor(item.quality)}`}>
                            {getQualityLabel(item.quality)}
                          </Badge>
                          {item.quantity > 1 && (
                            <Badge variant="outline" className="text-xs">
                              x{item.quantity}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end gap-2">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Giá"
                            value={sellPrice}
                            onChange={(e) => setSellPrice(e.target.value)}
                            className="w-20 px-2 py-1 text-xs bg-muted/30 border border-border/50 rounded"
                          />
                          <select
                            value={sellDuration}
                            onChange={(e) => setSellDuration(e.target.value)}
                            className="px-2 py-1 text-xs bg-muted/30 border border-border/50 rounded"
                          >
                            <option value="12">12h</option>
                            <option value="24">24h</option>
                            <option value="48">48h</option>
                            <option value="72">72h</option>
                          </select>
                        </div>
                        <Button
                          onClick={() => sellItem(item)}
                          className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                          size="sm"
                        >
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span className="text-xs">Bán</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Không có vật phẩm nào có thể bán</p>
                <p className="text-xs mt-2">Trang bị đang sử dụng không thể bán!</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold text-sm sm:text-base mb-3 text-cultivator-gold">Lịch Sử Giao Dịch</h3>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={tx.type === 'buy' ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}
                    >
                      {tx.type === 'buy' ? 'Mua' : 'Bán'}
                    </Badge>
                    <span className="text-sm font-medium">{tx.item}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-cultivator-gold text-sm">
                      <Coins className="w-3 h-3" />
                      {tx.price}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tx.time.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Auction Tab */}
      {activeTab === 'auction' && (
        <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold text-sm sm:text-base mb-4 text-cultivator-gold">Đấu Giá</h3>
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Nhà đấu giá đang được chuẩn bị...</p>
            <p className="text-xs mt-2">Đấu giá vật phẩm hiếm và quý!</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MarketSystem;
