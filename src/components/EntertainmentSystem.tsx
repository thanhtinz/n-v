import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Fish, 
  Star, 
  Trophy, 
  Gift, 
  Coins,
  Gem,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Grid3X3,
  ArrowLeft,
  Sparkles,
  ScrollText
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

const EntertainmentSystem = () => {
  const { gameState, claimReward, updateGameState } = useGameState();
  const [currentView, setCurrentView] = useState('menu');
  const [fishingProgress, setFishingProgress] = useState(0);
  const [fishingActive, setFishingActive] = useState(false);
  const [selectedBet, setSelectedBet] = useState(100);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [wishCount, setWishCount] = useState(0);
  const [selectedFortune, setSelectedFortune] = useState<any>(null);
  const [fortuneDrawn, setFortuneDrawn] = useState(false);

  const entertainmentFeatures = [
    {
      id: 'fishing',
      title: 'Câu Cá Linh Hồ',
      description: 'Câu cá để kiếm bạc',
      icon: Fish,
      color: 'text-divine-blue',
      bgColor: 'bg-divine-blue/10'
    },
    {
      id: 'gambling',
      title: 'Tài Xỉu Xúc Xắc',
      description: 'Thử vận may với xúc xắc',
      icon: Dice1,
      color: 'text-cultivator-gold',
      bgColor: 'bg-cultivator-gold/10'
    },
    {
      id: 'chess',
      title: 'Cờ Tướng Linh Thần',
      description: 'Thách đấu AI',
      icon: Grid3X3,
      color: 'text-mystical-purple',
      bgColor: 'bg-mystical-purple/10'
    },
    {
      id: 'wish',
      title: 'Ước Nguyện Thiên Thần',
      description: 'Cầu nguyện nhận quà',
      icon: Star,
      color: 'text-spirit-jade',
      bgColor: 'bg-spirit-jade/10'
    },
    {
      id: 'fortune',
      title: 'Xin Xăm Cầu May',
      description: 'Tìm hiểu vận mệnh',
      icon: ScrollText,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  const fortuneCards = [
    {
      id: 1,
      title: "Đại Cát",
      poem: "Thiên thời địa lợi nhân hòa,\nVạn sự như ý phát tài hoa.\nCông danh hiển đạt tài lộc đến,\nGia đình hạnh phúc khắp mọi nhà.",
      meaning: "Quẻ này báo hiệu vận may cực tốt. Mọi việc đều thuận lợi, tài lộc dồi dào, công danh thăng tiến.",
      type: "great_luck",
      reward: { type: 'silver', amount: 1000 }
    },
    {
      id: 2,
      title: "Trung Cát",
      poem: "Mây tan sương khói dần khai,\nNắng xuân ấm áp khắp nơi.\nKiên nhẫn chờ đợi thời cơ đến,\nThành công trong tầm tay thôi.",
      meaning: "Vận may trung bình. Cần kiên nhẫn và nỗ lực, thành công sẽ đến trong thời gian tới.",
      type: "medium_luck",
      reward: { type: 'silver', amount: 500 }
    },
    {
      id: 3,
      title: "Tiểu Cát",
      poem: "Từng bước từng bước đi lên,\nKhông vội không vàng kẻo hối tiền.\nChăm chi tích tiểu thành đại,\nVui vẻ an yên trọn kiếp này.",
      meaning: "May mắn nhỏ. Nên từ từ phát triển, tích lũy từng chút một để có kết quả tốt.",
      type: "small_luck",
      reward: { type: 'silver', amount: 200 }
    },
    {
      id: 4,
      title: "Bình An",
      poem: "Yên tâm an tâm đi trên đường,\nKhông gian không khó không âu sầu.\nSức khỏe dồi dào tài lộc đủ,\nCuộc đời bình yên vạn năm sau.",
      meaning: "Bình an vô sự. Cuộc sống ổn định, không có biến động lớn, sức khỏe tốt.",
      type: "peace",
      reward: { type: 'exp', amount: 30 }
    },
    {
      id: 5,
      title: "Cần Thận",
      poem: "Con đường phía trước nhiều gai,\nCẩn thận suy nghĩ chớ vội vàng.\nKiên nhẫn vượt qua khó khăn này,\nSáng sủa tương lai ở phía sau.",
      meaning: "Cần cẩn trọng. Thời gian này có thể gặp khó khăn, cần suy nghĩ kỹ trước khi hành động.",
      type: "caution",
      reward: { type: 'rechargeSpiritStones', amount: 1 }
    },
    {
      id: 6,
      title: "Thử Thách",
      poem: "Bão tố qua đi nắng lại về,\nKhó khăn chỉ là thử thách thôi.\nVững lòng vượt qua tháng ngày này,\nHoa thơm kết trái ngọt ngào rồi.",
      meaning: "Đang gặp thử thách. Cần vững vàng và kiên trì, khó khăn chỉ là tạm thời.",
      type: "challenge",
      reward: { type: 'goldIngots', amount: 3 }
    }
  ];

  const startFishing = () => {
    if (gameState.player.silver < 50) return;
    
    setFishingActive(true);
    setFishingProgress(0);
    
    const interval = setInterval(() => {
      setFishingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFishingActive(false);
          
          // Random fish catch
          const fishTypes = [
            { name: 'Cá Nhỏ', reward: 20, chance: 50 },
            { name: 'Cá Vừa', reward: 50, chance: 30 },
            { name: 'Cá Lớn', reward: 100, chance: 15 },
            { name: 'Cá Vàng', reward: 500, chance: 5 }
          ];
          
          const random = Math.random() * 100;
          let selectedFish = fishTypes[0];
          let currentChance = 0;
          
          for (const fish of fishTypes) {
            currentChance += fish.chance;
            if (random <= currentChance) {
              selectedFish = fish;
              break;
            }
          }
          
          claimReward('silver', selectedFish.reward);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    
    // Deduct fishing cost
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - 50
      }
    });
  };

  const rollDice = () => {
    if (gameState.player.silver < selectedBet) return;
    
    const results = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
    setDiceResults(results);
    
    let winAmount = 0;
    const sum = results.reduce((a, b) => a + b, 0);
    
    if (results.every(r => r === results[0])) {
      // Triple same
      winAmount = selectedBet * 10;
    } else if (sum >= 15) {
      // High roll
      winAmount = selectedBet * 2;
    } else if (sum <= 6) {
      // Low roll
      winAmount = selectedBet * 3;
    }
    
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - selectedBet + winAmount
      }
    });
  };

  const makeWish = () => {
    if (gameState.player.goldIngots < 10) return;
    
    setWishCount(prev => prev + 1);
    
    const rewards = [
      { type: 'silver', amount: 1000 },
      { type: 'goldIngots', amount: 5 },
      { type: 'rechargeSpiritStones', amount: 2 },
      { type: 'exp', amount: 50 }
    ];
    
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    claimReward(randomReward.type, randomReward.amount);
    
    updateGameState({
      player: {
        ...gameState.player,
        goldIngots: gameState.player.goldIngots - 10
      }
    });
  };

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const Icon = icons[value - 1];
    return <Icon className="w-8 h-8" />;
  };

  const drawFortune = () => {
    if (gameState.player.silver < 100) return;
    
    const randomFortune = fortuneCards[Math.floor(Math.random() * fortuneCards.length)];
    setSelectedFortune(randomFortune);
    setFortuneDrawn(true);
    
    // Deduct cost and give reward
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - 100
      }
    });
    
    claimReward(randomFortune.reward.type, randomFortune.reward.amount);
  };

  const resetFortune = () => {
    setSelectedFortune(null);
    setFortuneDrawn(false);
  };

  if (currentView === 'menu') {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-cultivator-gold mb-2">Khu Giải Trí</h2>
          <p className="text-muted-foreground">Thư giãn và kiếm thêm tài nguyên</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {entertainmentFeatures.map((feature) => (
            <Card 
              key={feature.id} 
              className={`p-4 cursor-pointer hover:scale-105 transition-transform ${feature.bgColor} border-2`}
              onClick={() => setCurrentView(feature.id)}
            >
              <div className="text-center">
                <feature.icon className={`w-12 h-12 mx-auto mb-3 ${feature.color}`} />
                <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentView('menu')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <h2 className="text-xl font-bold text-cultivator-gold">Khu Giải Trí</h2>
      </div>

      {currentView === 'fishing' && (
        <Card className="p-4">
          <div className="text-center mb-4">
            <Fish className="w-16 h-16 mx-auto mb-2 text-divine-blue" />
            <h3 className="text-lg font-bold">Câu Cá Linh Hồ</h3>
            <p className="text-sm text-muted-foreground">Chi phí: 50 Bạc mỗi lần</p>
          </div>

          {fishingActive && (
            <div className="mb-4">
              <p className="text-center mb-2">Đang câu cá...</p>
              <Progress value={fishingProgress} className="h-3" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded">
              <Fish className="w-6 h-6 mx-auto mb-1 text-gray-400" />
              <div className="text-sm">Cá Nhỏ: 20 Bạc</div>
              <div className="text-xs text-muted-foreground">50% tỷ lệ</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded">
              <Fish className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <div className="text-sm">Cá Vừa: 50 Bạc</div>
              <div className="text-xs text-muted-foreground">30% tỷ lệ</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded">
              <Fish className="w-6 h-6 mx-auto mb-1 text-purple-400" />
              <div className="text-sm">Cá Lớn: 100 Bạc</div>
              <div className="text-xs text-muted-foreground">15% tỷ lệ</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded">
              <Fish className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <div className="text-sm">Cá Vàng: 500 Bạc</div>
              <div className="text-xs text-muted-foreground">5% tỷ lệ</div>
            </div>
          </div>

          <Button 
            onClick={startFishing} 
            disabled={fishingActive || gameState.player.silver < 50}
            className="w-full"
          >
            {fishingActive ? 'Đang Câu...' : 'Bắt Đầu Câu Cá'}
          </Button>
        </Card>
      )}

      {currentView === 'gambling' && (
        <Card className="p-4">
          <div className="text-center mb-4">
            <div className="flex justify-center gap-2 mb-2">
              {getDiceIcon(1)}
              {getDiceIcon(2)}
              {getDiceIcon(3)}
            </div>
            <h3 className="text-lg font-bold">Tài Xỉu Xúc Xắc</h3>
            <p className="text-sm text-muted-foreground">Cược và thử vận may</p>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-2">Chọn mức cược:</p>
            <div className="grid grid-cols-3 gap-2">
              {[100, 500, 1000].map(bet => (
                <Button
                  key={bet}
                  variant={selectedBet === bet ? "default" : "outline"}
                  onClick={() => setSelectedBet(bet)}
                  size="sm"
                >
                  {bet} Bạc
                </Button>
              ))}
            </div>
          </div>

          {diceResults.length > 0 && (
            <div className="mb-4 p-3 bg-muted/50 rounded text-center">
              <div className="flex justify-center gap-2 mb-2">
                {diceResults.map((result, index) => (
                  <div key={index}>{getDiceIcon(result)}</div>
                ))}
              </div>
              <p className="text-sm">
                Tổng: {diceResults.reduce((a, b) => a + b, 0)}
              </p>
            </div>
          )}

          <div className="mb-4 text-xs text-muted-foreground">
            <p>• Ba số giống nhau: x10</p>
            <p>• Tổng ≥15: x2</p>
            <p>• Tổng ≤6: x3</p>
          </div>

          <Button 
            onClick={rollDice} 
            disabled={gameState.player.silver < selectedBet}
            className="w-full"
          >
            Lắc Xúc Xắc ({selectedBet} Bạc)
          </Button>
        </Card>
      )}

      {currentView === 'chess' && (
        <Card className="p-4">
          <div className="text-center mb-4">
            <Grid3X3 className="w-16 h-16 mx-auto mb-2 text-cultivator-gold" />
            <h3 className="text-lg font-bold">Cờ Tướng Linh Thần</h3>
            <p className="text-sm text-muted-foreground">Thách đấu với AI để nhận thưởng</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded">
              <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <div className="text-sm">Thắng</div>
              <div className="text-xs text-muted-foreground">+200 Bạc, +5 EXP</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded">
              <Star className="w-6 h-6 mx-auto mb-1 text-gray-400" />
              <div className="text-sm">Hòa</div>
              <div className="text-xs text-muted-foreground">+50 Bạc</div>
            </div>
          </div>

          <div className="mb-4 p-3 bg-muted/50 rounded">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className="aspect-square bg-card border rounded flex items-center justify-center text-xs">
                  {i % 3 === 1 ? '車' : i % 3 === 0 ? '兵' : ''}
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={() => {
              const isWin = Math.random() > 0.4;
              if (isWin) {
                claimReward('silver', 200);
                claimReward('exp', 5);
              } else {
                claimReward('silver', 50);
              }
            }}
            className="w-full"
          >
            Thách Đấu AI
          </Button>
        </Card>
      )}

      {currentView === 'wish' && (
        <Card className="p-4">
          <div className="text-center mb-4">
            <Star className="w-16 h-16 mx-auto mb-2 text-mystical-purple" />
            <h3 className="text-lg font-bold">Ước Nguyện Thiên Thần</h3>
            <p className="text-sm text-muted-foreground">Chi phí: 10 Kim Nguyên Bảo</p>
          </div>

          <div className="mb-4 text-center">
            <p className="text-sm mb-2">Số lần ước nguyện: {wishCount}</p>
            <Badge variant="outline">
              Mỗi 10 lần được quà đặc biệt
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded">
              <Coins className="w-6 h-6 mx-auto mb-1 text-gray-400" />
              <div className="text-sm">1000 Bạc</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded">
              <Gem className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <div className="text-sm">5 KNYB</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded">
              <Star className="w-6 h-6 mx-auto mb-1 text-mystical-purple" />
              <div className="text-sm">2 Linh Thạch</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded">
              <Trophy className="w-6 h-6 mx-auto mb-1 text-divine-blue" />
              <div className="text-sm">50 EXP</div>
            </div>
          </div>

          <Button 
            onClick={makeWish} 
            disabled={gameState.player.goldIngots < 10}
            className="w-full"
          >
            Thực Hiện Ước Nguyện (10 KNYB)
          </Button>
        </Card>
      )}

      {currentView === 'fortune' && (
        <Card className="p-4">
          <div className="text-center mb-4">
            <ScrollText className="w-16 h-16 mx-auto mb-2 text-red-500" />
            <h3 className="text-lg font-bold">Xin Xăm Cầu May</h3>
            <p className="text-sm text-muted-foreground">Chi phí: 100 Bạc mỗi lần</p>
          </div>

          {!fortuneDrawn ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Xin xăm là tập tục lâu đời, giúp bạn tìm hiểu vận mệnh và nhận lời khuyên từ thế giới tâm linh. 
                  Hãy thành tâm cầu nguyện trước khi rút thẻ xăm.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gradient-to-b from-red-600 to-red-800 rounded-lg flex items-center justify-center border-2 border-yellow-400">
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </div>
                ))}
              </div>

              <Button 
                onClick={drawFortune} 
                disabled={gameState.player.silver < 100}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Rút Thẻ Xăm (100 Bạc)
              </Button>
            </div>
          ) : selectedFortune && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-400">
                <div className="text-center mb-3">
                  <Badge className={`text-lg px-3 py-1 ${
                    selectedFortune.type === 'great_luck' ? 'bg-red-600' :
                    selectedFortune.type === 'medium_luck' ? 'bg-orange-500' :
                    selectedFortune.type === 'small_luck' ? 'bg-yellow-500' :
                    selectedFortune.type === 'peace' ? 'bg-green-500' :
                    selectedFortune.type === 'caution' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}>
                    {selectedFortune.title}
                  </Badge>
                </div>
                
                <div className="bg-white p-4 rounded border-l-4 border-red-500 mb-3">
                  <p className="text-sm font-medium text-gray-800 whitespace-pre-line leading-relaxed">
                    {selectedFortune.poem}
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded border">
                  <p className="text-sm text-gray-700">
                    <strong>Ý nghĩa:</strong> {selectedFortune.meaning}
                  </p>
                </div>
              </div>

              <Button 
                onClick={resetFortune}
                variant="outline"
                className="w-full"
              >
                Rút Thẻ Mới
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default EntertainmentSystem;
