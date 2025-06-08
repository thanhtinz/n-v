
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  DollarSign,
  Filter,
  Heart,
  Zap,
  Shield,
  Sword,
  Gem
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface MarketItem {
  id: string;
  name: string;
  category: 'weapon' | 'armor' | 'pill' | 'material' | 'misc' | 'pet' | 'plant';
  price: number;
  seller: string;
  quality: 'common' | 'rare' | 'epic' | 'legendary';
  timeLeft: number;
  description: string;
  quantity: number;
  level: number;
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    mp?: number;
  };
}

interface PlayerItem {
  id: string;
  name: string;
  category: 'weapon' | 'armor' | 'pill' | 'material' | 'misc' | 'pet' | 'plant';
  quality: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  quantity: number;
  level: number;
  canSell: boolean;
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    mp?: number;
  };
}

const MarketSystem = () => {
  const { gameState, addNotification, updateGameState } = useGameState();
  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'history' | 'auction'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price-low');

  const [marketItems] = useState<MarketItem[]>([
    {
      id: '1',
      name: 'Kiếm Phong Lôi Cấp 5',
      category: 'weapon',
      price: 15000,
      seller: 'Kiếm Thánh Huyền',
      quality: 'epic',
      timeLeft: 12,
      description: 'Kiếm với sức mạnh phong lôi, tăng tốc độ tấn công',
      quantity: 1,
      level: 45,
      stats: { attack: 280, mp: 50 }
    },
    {
      id: '2',
      name: 'Hồi Linh Đan Cấp 3',
      category: 'pill',
      price: 500,
      seller: 'Đan Sư Linh Huyền',
      quality: 'rare',
      timeLeft: 24,
      description: 'Phục hồi 800 HP và 200 MP ngay lập tức',
      quantity: 5,
      level: 30,
      stats: { hp: 800, mp: 200 }
    },
    {
      id: '3',
      name: 'Thiên Tằm Giáp Huyền Thiên',
      category: 'armor',
      price: 25000,
      seller: 'Luyện Khí Đại Sư',
      quality: 'legendary',
      timeLeft: 6,
      description: 'Áo giáp huyền thoại từ tằm thiên, phòng thủ tuyệt đối',
      quantity: 1,
      level: 60,
      stats: { defense: 350, hp: 1200 }
    },
    {
      id: '4',
      name: 'Linh Thạch Tinh Khiết',
      category: 'material',
      price: 100,
      seller: 'Thương Gia Bách Bảo',
      quality: 'common',
      timeLeft: 48,
      description: 'Nguyên liệu tu luyện tinh khiết, tăng hiệu quả 20%',
      quantity: 50,
      level: 10,
      stats: {}
    },
    {
      id: '5',
      name: 'Rồng Mini Linh Thú',
      category: 'pet',
      price: 30000,
      seller: 'Ngự Thú Sư',
      quality: 'legendary',
      timeLeft: 18,
      description: 'Thú cưng rồng mini, tăng may mắn và kinh nghiệm',
      quantity: 1,
      level: 35,
      stats: { hp: 500, mp: 300 }
    },
    {
      id: '6',
      name: 'Cây Linh Chi Thiên Niên',
      category: 'plant',
      price: 8000,
      seller: 'Nông Phu Linh',
      quality: 'epic',
      timeLeft: 30,
      description: 'Cây linh chi quý hiếm, hồi phục HP/MP theo thời gian',
      quantity: 1,
      level: 50,
      stats: { hp: 200, mp: 200 }
    }
  ]);

  const [playerItems] = useState<PlayerItem[]>([
    {
      id: 'p1',
      name: 'Tăng Lực Đan Cấp 2',
      category: 'pill',
      quality: 'common',
      description: 'Tăng sức mạnh tạm thời 30 phút',
      quantity: 3,
      level: 20,
      canSell: true,
      stats: { attack: 50 }
    },
    {
      id: 'p2',
      name: 'Linh Thảo Dại',
      category: 'material',
      quality: 'common',
      description: 'Nguyên liệu luyện đan cơ bản',
      quantity: 25,
      level: 5,
      canSell: true,
      stats: {}
    },
    {
      id: 'p3',
      name: 'Kiếm Sắt Phàm Tục',
      category: 'weapon',
      quality: 'common',
      description: 'Kiếm sắt thường, phù hợp tân thủ',
      quantity: 1,
      level: 15,
      canSell: true,
      stats: { attack: 80 }
    }
  ]);

  const categories = [
    { id: 'all', label: 'Tất Cả', icon: Package },
    { id: 'weapon', label: 'Vũ Khí', icon: Sword },
    { id: 'armor', label: 'Giáp Trụ', icon: Shield },
    { id: 'pill', label: 'Đan Dược', icon: Heart },
    { id: 'material', label: 'Nguyên Liệu', icon: Gem },
    { id: 'pet', label: 'Linh Thú', icon: Star },
    { id: 'plant', label: 'Linh Thực', icon: Plus }
  ];

  const getQualityColor = (quality: string) => {
    const colors = {
      common: 'text-gray-400 border-gray-400 bg-gray-400/10',
      rare: 'text-blue-400 border-blue-400 bg-blue-400/10',
      epic: 'text-purple-400 border-purple-400 bg-purple-400/10',
      legendary: 'text-yellow-400 border-yellow-400 bg-yellow-400/10'
    };
    return colors[quality as keyof typeof colors];
  };

  const getQualityLabel = (quality: string) => {
    const labels = {
      common: 'Phàm Tục',
      rare: 'Linh Khí',
      epic: 'Huyền Bí',
      legendary: 'Thiên Phẩm'
    };
    return labels[quality as keyof typeof labels];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      weapon: Sword,
      armor: Shield,
      pill: Heart,
      material: Gem,
      pet: Star,
      plant: Plus,
      misc: Package
    };
    return icons[category as keyof typeof icons] || Package;
  };

  const buyItem = (item: MarketItem) => {
    const playerSilver = gameState.player.silver;
    
    if (playerSilver >= item.price) {
      const newSilver = playerSilver - item.price;
      updateGameState({
        player: {
          ...gameState.player,
          silver: newSilver
        }
      });
      addNotification(`Đã mua ${item.name} với giá ${item.price.toLocaleString()} Bạc!`, 'success');
    } else {
      addNotification(`Không đủ bạc để mua ${item.name}! Cần ${item.price.toLocaleString()} Bạc.`, 'warning');
    }
  };

  const sellItem = (item: PlayerItem, price: number, duration: string) => {
    if (price > 0) {
      addNotification(`Đã đặt bán ${item.name} với giá ${price.toLocaleString()} Bạc, thời gian ${duration}h`, 'success');
    } else {
      addNotification('Vui lòng nhập giá hợp lệ!', 'warning');
    }
  };

  const filteredItems = marketItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'level-low': return a.level - b.level;
      case 'level-high': return b.level - a.level;
      case 'time': return a.timeLeft - b.timeLeft;
      default: return 0;
    }
  });

  const sellableItems = playerItems.filter(item => item.canSell);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-cultivator-gold/10 to-spirit-jade/10 border-cultivator-gold/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-cultivator-gold" />
            <h2 className="text-xl font-bold text-cultivator-gold">Chợ Tu Tiên</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Coins className="w-4 h-4 text-cultivator-gold" />
            <span className="font-bold text-cultivator-gold">
              {gameState.player.silver.toLocaleString()} Bạc
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Nơi giao dịch vật phẩm tu tiên giữa các đạo hữu
        </p>
      </Card>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'browse', label: 'Duyệt Chợ', icon: Search },
          { id: 'sell', label: 'Bán Đồ', icon: DollarSign },
          { id: 'history', label: 'Lịch Sử', icon: Clock },
          { id: 'auction', label: 'Đấu Giá', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Tìm kiếm</label>
                <Input
                  placeholder="Tên vật phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Danh mục</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Sắp xếp</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Giá thấp → cao</SelectItem>
                    <SelectItem value="price-high">Giá cao → thấp</SelectItem>
                    <SelectItem value="level-low">Cấp thấp → cao</SelectItem>
                    <SelectItem value="level-high">Cấp cao → thấp</SelectItem>
                    <SelectItem value="time">Thời gian còn lại</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button size="sm" variant="outline" className="h-8">
                  <Filter className="w-4 h-4 mr-1" />
                  Lọc
                </Button>
              </div>
            </div>
          </Card>

          {/* Market Items */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <Card key={item.id} className="p-4 hover:border-cultivator-gold/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cultivator-gold/20 to-spirit-jade/20 flex items-center justify-center">
                      <CategoryIcon className="w-8 h-8 text-cultivator-gold" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <Badge className={`${getQualityColor(item.quality)} text-xs`}>
                          {getQualityLabel(item.quality)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Cấp {item.level}
                        </Badge>
                        {item.quantity > 1 && (
                          <Badge variant="outline" className="text-xs">
                            x{item.quantity}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      
                      {item.stats && Object.keys(item.stats).length > 0 && (
                        <div className="flex gap-3 text-xs">
                          {item.stats.attack && (
                            <span className="flex items-center gap-1">
                              <Sword className="w-3 h-3" />
                              {item.stats.attack}
                            </span>
                          )}
                          {item.stats.defense && (
                            <span className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              {item.stats.defense}
                            </span>
                          )}
                          {item.stats.hp && (
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {item.stats.hp}
                            </span>
                          )}
                          {item.stats.mp && (
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {item.stats.mp}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {item.seller}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.timeLeft}h
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-cultivator-gold font-bold text-lg">
                              <Coins className="w-5 h-5" />
                              {item.price.toLocaleString()}
                            </div>
                          </div>
                          <Button
                            onClick={() => buyItem(item)}
                            className="bg-spirit-jade hover:bg-spirit-jade/80"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Mua
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
            
            {filteredItems.length === 0 && (
              <Card className="p-8 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Không tìm thấy vật phẩm</p>
                <p className="text-sm text-muted-foreground">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Sell Tab */}
      {activeTab === 'sell' && (
        <SellItemsTab sellableItems={sellableItems} onSell={sellItem} />
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <Card className="p-6 text-center">
          <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Lịch Sử Giao Dịch</p>
          <p className="text-sm text-muted-foreground">
            Chức năng đang được phát triển...
          </p>
        </Card>
      )}

      {/* Auction Tab */}
      {activeTab === 'auction' && (
        <Card className="p-6 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Nhà Đấu Giá Tu Tiên</p>
          <p className="text-sm text-muted-foreground">
            Đấu giá vật phẩm hiếm và quý hiếm sắp ra mắt!
          </p>
        </Card>
      )}
    </div>
  );
};

// Sell Items Component
const SellItemsTab = ({ sellableItems, onSell }: any) => {
  const [sellPrices, setSellPrices] = useState<{[key: string]: string}>({});
  const [sellDurations, setSellDurations] = useState<{[key: string]: string}>({});

  return (
    <Card className="p-4">
      <h3 className="font-bold text-lg mb-4 text-cultivator-gold">Bán Vật Phẩm Của Bạn</h3>
      
      {sellableItems.length > 0 ? (
        <div className="space-y-4">
          {sellableItems.map((item: any) => {
            const CategoryIcon = item.category === 'weapon' ? Sword : 
                                item.category === 'armor' ? Shield :
                                item.category === 'pill' ? Heart : 
                                item.category === 'material' ? Gem : Package;
                                
            return (
              <Card key={item.id} className="p-4 bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cultivator-gold/20 to-spirit-jade/20 flex items-center justify-center">
                    <CategoryIcon className="w-6 h-6 text-cultivator-gold" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        Cấp {item.level}
                      </Badge>
                      {item.quantity > 1 && (
                        <Badge variant="outline" className="text-xs">x{item.quantity}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Giá bán"
                      value={sellPrices[item.id] || ''}
                      onChange={(e) => setSellPrices(prev => ({...prev, [item.id]: e.target.value}))}
                      className="w-24"
                    />
                    <Select 
                      value={sellDurations[item.id] || '24'} 
                      onValueChange={(value) => setSellDurations(prev => ({...prev, [item.id]: value}))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12h</SelectItem>
                        <SelectItem value="24">24h</SelectItem>
                        <SelectItem value="48">48h</SelectItem>
                        <SelectItem value="72">72h</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => onSell(item, parseInt(sellPrices[item.id] || '0'), sellDurations[item.id] || '24')}
                      className="bg-cultivator-gold hover:bg-cultivator-gold/80 text-black"
                    >
                      <DollarSign className="w-4 h-4 mr-1" />
                      Bán
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Không có vật phẩm để bán</p>
          <p className="text-sm text-muted-foreground">
            Trang bị đang sử dụng không thể bán!
          </p>
        </div>
      )}
    </Card>
  );
};

export default MarketSystem;
