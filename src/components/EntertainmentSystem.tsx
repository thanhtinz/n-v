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
  ScrollText,
  Shell,
  Type,
  Grid2X2,
  Hash,
  RotateCcw,
  HelpCircle,
  X,
  Spade,
  Cherry
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import FishingSystem from './FishingSystem';
import HangmanGame from './games/HangmanGame';
import Game2048 from './games/Game2048';
import SudokuGame from './games/SudokuGame';
import QuizGame from './games/QuizGame';
import CaroGame from './games/CaroGame';
import BlackJackGame from './games/BlackJackGame';
import SlotMachineGame from './games/SlotMachineGame';
import LuckyWheelSystem from './LuckyWheelSystem';

const EntertainmentSystem = () => {
  const { gameState, claimReward, updateGameState } = useGameState();
  const [currentView, setCurrentView] = useState('menu');
  const [fishingProgress, setFishingProgress] = useState(0);
  const [fishingActive, setFishingActive] = useState(false);
  const [selectedBet, setSelectedBet] = useState(100);
  const [selectedTaiXiuBet, setSelectedTaiXiuBet] = useState('');
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [wishCount, setWishCount] = useState(0);
  const [selectedFortune, setSelectedFortune] = useState<any>(null);
  const [fortuneDrawn, setFortuneDrawn] = useState(false);
  
  // Bầu Cua Tôm Cá state
  const [bauCuaBets, setBauCuaBets] = useState<Record<string, number>>({});
  const [bauCuaResults, setBauCuaResults] = useState<string[]>([]);
  const [bauCuaRolling, setBauCuaRolling] = useState(false);

  const entertainmentFeatures = [
    {
      id: 'fishing',
      title: 'Hệ Thống Câu Cá',
      description: 'Hệ thống câu cá hoàn chỉnh',
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
      id: 'blackjack',
      title: 'BlackJack',
      description: 'Trò chơi bài kinh điển',
      icon: Spade,
      color: 'text-gray-800',
      bgColor: 'bg-gray-800/10'
    },
    {
      id: 'slot',
      title: 'Slot Machine',
      description: 'Máy đánh bạc may mắn',
      icon: Cherry,
      color: 'text-red-600',
      bgColor: 'bg-red-600/10'
    },
    {
      id: 'baucua',
      title: 'Bầu Cua Tôm Cá',
      description: 'Trò chơi dân gian truyền thống',
      icon: Shell,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 'lucky-wheel',
      title: 'Vòng Quay May Mắn',
      description: 'Quay để nhận phần thưởng',
      icon: RotateCcw,
      color: 'text-mystical-purple',
      bgColor: 'bg-mystical-purple/10'
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
    },
    {
      id: 'hangman',
      title: 'Trò Chơi Đoán Từ',
      description: 'Hangman - Đoán từ để thắng',
      icon: Type,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: '2048',
      title: 'Game 2048',
      description: 'Ghép số để đạt 2048',
      icon: Grid2X2,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: 'sudoku',
      title: 'Sudoku',
      description: 'Trò chơi trí tuệ số học',
      icon: Hash,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'quiz',
      title: 'Đố Vui Trí Tuệ',
      description: 'Trả lời câu hỏi kiến thức',
      icon: HelpCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'caro',
      title: 'Caro 5 Trong 1 Dòng',
      description: 'Cờ caro với AI',
      icon: X,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
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
    if (gameState.player.silver < selectedBet || !selectedTaiXiuBet) return;
    
    const results = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
    setDiceResults(results);
    
    const sum = results.reduce((a, b) => a + b, 0);
    let winAmount = 0;
    
    // Luật tài xỉu chuẩn
    if (sum > 10 && selectedTaiXiuBet === 'tai') {
      winAmount = selectedBet * 2; // Trả lại tiền cược + tiền thắng (1:1)
    } else if (sum < 10 && selectedTaiXiuBet === 'xiu') {
      winAmount = selectedBet * 2; // Trả lại tiền cược + tiền thắng (1:1)
    }
    // Nếu sum = 10, nhà cái thắng (không trả gì)
    
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

  const bauCuaSymbols = [
    { id: 'bau', name: 'Bầu', emoji: '🎃', color: 'text-green-600' },
    { id: 'cua', name: 'Cua', emoji: '🦀', color: 'text-red-600' },
    { id: 'tom', name: 'Tôm', emoji: '🦐', color: 'text-pink-600' },
    { id: 'ca', name: 'Cá', emoji: '🐟', color: 'text-blue-600' },
    { id: 'ga', name: 'Gà', emoji: '🐔', color: 'text-yellow-600' },
    { id: 'nai', name: 'Nai', emoji: '🦌', color: 'text-brown-600' }
  ];

  const placeBauCuaBet = (symbolId: string, amount: number) => {
    if (gameState.player.silver < amount) return;
    
    setBauCuaBets(prev => ({
      ...prev,
      [symbolId]: (prev[symbolId] || 0) + amount
    }));
    
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - amount
      }
    });
  };

  const rollBauCua = () => {
    if (Object.keys(bauCuaBets).length === 0) return;
    
    setBauCuaRolling(true);
    
    setTimeout(() => {
      const results = Array.from({ length: 3 }, () => {
        const randomIndex = Math.floor(Math.random() * bauCuaSymbols.length);
        return bauCuaSymbols[randomIndex].id;
      });
      
      setBauCuaResults(results);
      
      // Calculate winnings
      let totalWinnings = 0;
      Object.entries(bauCuaBets).forEach(([symbolId, betAmount]) => {
        const matches = results.filter(result => result === symbolId).length;
        if (matches > 0) {
          totalWinnings += betAmount * matches;
        }
      });
      
      if (totalWinnings > 0) {
        updateGameState({
          player: {
            ...gameState.player,
            silver: gameState.player.silver + totalWinnings
          }
        });
      }
      
      setBauCuaRolling(false);
    }, 2000);
  };

  const clearBauCuaBets = () => {
    // Return bet money
    const totalBets = Object.values(bauCuaBets).reduce((sum, bet) => sum + bet, 0);
    if (totalBets > 0) {
      updateGameState({
        player: {
          ...gameState.player,
          silver: gameState.player.silver + totalBets
        }
      });
    }
    setBauCuaBets({});
  };

  if (currentView === 'fishing') {
    return <FishingSystem onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'blackjack') {
    return <BlackJackGame onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'slot') {
    return <SlotMachineGame onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'lucky-wheel') {
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
          <RotateCcw className="w-6 h-6 text-mystical-purple" />
          <h2 className="text-xl font-bold text-mystical-purple">Vòng Quay May Mắn</h2>
        </div>
        <LuckyWheelSystem />
      </div>
    );
  }

  if (currentView === 'hangman') {
    return <HangmanGame onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === '2048') {
    return <Game2048 onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'sudoku') {
    return <SudokuGame onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'quiz') {
    return <QuizGame onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'caro') {
    return <CaroGame onBack={() => setCurrentView('menu')} />;
  }

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
            <p className="text-sm text-muted-foreground">Đặt cược Tài hoặc Xỉu</p>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-2">Chọn mức cược:</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
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

          <div className="mb-4">
            <p className="text-sm mb-2">Chọn cửa cược:</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={selectedTaiXiuBet === 'tai' ? "default" : "outline"}
                onClick={() => setSelectedTaiXiuBet('tai')}
                className="h-16 text-lg font-bold"
              >
                <div className="text-center">
                  <div>TÀI</div>
                  <div className="text-xs opacity-80">Tổng &gt; 10</div>
                </div>
              </Button>
              <Button
                variant={selectedTaiXiuBet === 'xiu' ? "default" : "outline"}
                onClick={() => setSelectedTaiXiuBet('xiu')}
                className="h-16 text-lg font-bold"
              >
                <div className="text-center">
                  <div>XỈU</div>
                  <div className="text-xs opacity-80">Tổng &lt; 10</div>
                </div>
              </Button>
            </div>
          </div>

          {diceResults.length > 0 && (
            <div className="mb-4 p-3 bg-muted/50 rounded text-center">
              <div className="flex justify-center gap-2 mb-2">
                {diceResults.map((result, index) => (
                  <div key={index}>{getDiceIcon(result)}</div>
                ))}
              </div>
              <p className="text-sm mb-1">
                Tổng: {diceResults.reduce((a, b) => a + b, 0)}
              </p>
              <p className="text-sm font-bold">
                Kết quả: {
                  diceResults.reduce((a, b) => a + b, 0) > 10 ? 'TÀI' :
                  diceResults.reduce((a, b) => a + b, 0) < 10 ? 'XỈU' : 'HÒA'
                }
              </p>
            </div>
          )}

          <div className="mb-4 text-xs text-muted-foreground bg-blue-50 p-3 rounded">
            <p className="font-bold mb-2">Luật chơi:</p>
            <p>• Tài: Tổng 3 xúc xắc &gt; 10 (11-18)</p>
            <p>• Xỉu: Tổng 3 xúc xắc &lt; 10 (3-9)</p>
            <p>• Hòa: Tổng = 10 (nhà cái thắng)</p>
            <p>• Tỷ lệ thưởng: 1:1</p>
          </div>

          <Button 
            onClick={rollDice} 
            disabled={gameState.player.silver < selectedBet || !selectedTaiXiuBet}
            className="w-full"
          >
            Lắc Xúc Xắc ({selectedBet} Bạc - {selectedTaiXiuBet ? selectedTaiXiuBet.toUpperCase() : 'Chưa chọn'})
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
                  <div key={i} className="aspect-[3/4] bg-gradient-to-b from-red-600 to-red-800 rounded-lg flex items-center justify-center text-xs">
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

      {currentView === 'baucua' && (
        <Card className="p-4">
          <div className="text-center mb-4">
            <Shell className="w-16 h-16 mx-auto mb-2 text-red-500" />
            <h3 className="text-lg font-bold">Bầu Cua Tôm Cá</h3>
            <p className="text-sm text-muted-foreground">Trò chơi dân gian truyền thống</p>
          </div>

          {/* Betting Board */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {bauCuaSymbols.map(symbol => (
              <Card key={symbol.id} className="p-3 border-2">
                <div className="text-center mb-2">
                  <div className="text-4xl mb-1">{symbol.emoji}</div>
                  <div className={`font-bold ${symbol.color}`}>{symbol.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Đặt: {bauCuaBets[symbol.id] || 0} Bạc
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  {[50, 100, 200].map(amount => (
                    <Button
                      key={amount}
                      size="sm"
                      variant="outline"
                      onClick={() => placeBauCuaBet(symbol.id, amount)}
                      disabled={gameState.player.silver < amount || bauCuaRolling}
                      className="text-xs"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Dice Results */}
          {bauCuaResults.length > 0 && (
            <Card className="p-4 bg-yellow-50 mb-4">
              <h4 className="font-bold text-center mb-3">Kết Quả</h4>
              <div className="flex justify-center gap-4">
                {bauCuaResults.map((result, index) => {
                  const symbol = bauCuaSymbols.find(s => s.id === result);
                  return (
                    <div key={index} className="text-center">
                      <div className="text-4xl mb-1">{symbol?.emoji}</div>
                      <div className={`text-sm font-bold ${symbol?.color}`}>
                        {symbol?.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Game Status */}
          <div className="mb-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">
              Tổng tiền đặt: {Object.values(bauCuaBets).reduce((sum, bet) => sum + bet, 0)} Bạc
            </div>
            {bauCuaRolling && (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin text-2xl">🎲</div>
                <span>Đang lắc xúc xắc...</span>
              </div>
            )}
          </div>

          {/* Game Controls */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={rollBauCua}
              disabled={Object.keys(bauCuaBets).length === 0 || bauCuaRolling}
              className="w-full"
            >
              {bauCuaRolling ? 'Đang Lắc...' : 'Lắc Xúc Xắc'}
            </Button>
            <Button
              onClick={clearBauCuaBets}
              variant="outline"
              disabled={Object.keys(bauCuaBets).length === 0 || bauCuaRolling}
              className="w-full"
            >
              Hủy Cược
            </Button>
          </div>

          {/* Rules */}
          <Card className="p-3 bg-blue-50 mt-4">
            <h4 className="font-bold text-blue-800 mb-2">Luật Chơi</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Đặt tiền vào các hình ảnh bạn dự đoán</li>
              <li>• 1 hình trúng: được x1 tiền cược</li>
              <li>• 2 hình trúng: được x2 tiền cược</li>
              <li>• 3 hình trúng: được x3 tiền cược</li>
              <li>• Có thể đặt nhiều hình cùng lúc</li>
            </ul>
          </Card>
        </Card>
      )}
    </div>
  );
};

export default EntertainmentSystem;
