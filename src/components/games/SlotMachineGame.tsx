
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Cherry, Grape, Lemon, Bell, Star, Gem } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface SlotSymbol {
  id: string;
  icon: React.ComponentType<any>;
  name: string;
  multiplier: number;
  color: string;
}

interface SlotMachineGameProps {
  onBack: () => void;
}

const SlotMachineGame = ({ onBack }: SlotMachineGameProps) => {
  const { gameState, updateGameState, addNotification } = useGameState();
  const [reels, setReels] = useState<string[]>(['cherry', 'cherry', 'cherry']);
  const [spinning, setSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(50);
  const [lastWin, setLastWin] = useState(0);

  const symbols: SlotSymbol[] = [
    { id: 'cherry', icon: Cherry, name: 'Cherry', multiplier: 2, color: 'text-red-500' },
    { id: 'lemon', icon: Lemon, name: 'Lemon', multiplier: 3, color: 'text-yellow-500' },
    { id: 'grape', icon: Grape, name: 'Grape', multiplier: 4, color: 'text-purple-500' },
    { id: 'bell', icon: Bell, name: 'Bell', multiplier: 5, color: 'text-blue-500' },
    { id: 'star', icon: Star, name: 'Star', multiplier: 10, color: 'text-yellow-400' },
    { id: 'gem', icon: Gem, name: 'Gem', multiplier: 20, color: 'text-cyan-500' }
  ];

  const getSymbol = (id: string) => symbols.find(s => s.id === id);

  const spinReels = () => {
    if (gameState.player.silver < betAmount || spinning) return;

    setSpinning(true);
    setLastWin(0);

    // Deduct bet amount
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - betAmount
      }
    });

    // Simulate spinning animation
    let spinCount = 0;
    const maxSpins = 20;
    
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)].id,
        symbols[Math.floor(Math.random() * symbols.length)].id,
        symbols[Math.floor(Math.random() * symbols.length)].id
      ]);

      spinCount++;
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        
        // Final result with weighted probability
        const finalReels = [
          getRandomSymbol(),
          getRandomSymbol(),
          getRandomSymbol()
        ];
        
        setReels(finalReels);
        setSpinning(false);
        checkWin(finalReels);
      }
    }, 100);
  };

  const getRandomSymbol = (): string => {
    const weights = [
      { symbol: 'cherry', weight: 30 },
      { symbol: 'lemon', weight: 25 },
      { symbol: 'grape', weight: 20 },
      { symbol: 'bell', weight: 15 },
      { symbol: 'star', weight: 7 },
      { symbol: 'gem', weight: 3 }
    ];

    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;

    for (const { symbol, weight } of weights) {
      random -= weight;
      if (random <= 0) return symbol;
    }
    
    return 'cherry';
  };

  const checkWin = (finalReels: string[]) => {
    let winAmount = 0;
    let winType = '';

    // Check for three of a kind
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const symbol = getSymbol(finalReels[0]);
      if (symbol) {
        winAmount = betAmount * symbol.multiplier;
        winType = `3 ${symbol.name}`;
      }
    }
    // Check for two of a kind
    else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
      let matchingSymbol = '';
      if (finalReels[0] === finalReels[1]) matchingSymbol = finalReels[0];
      else if (finalReels[1] === finalReels[2]) matchingSymbol = finalReels[1];
      else matchingSymbol = finalReels[0];
      
      const symbol = getSymbol(matchingSymbol);
      if (symbol) {
        winAmount = Math.floor(betAmount * symbol.multiplier * 0.3);
        winType = `2 ${symbol.name}`;
      }
    }

    if (winAmount > 0) {
      setLastWin(winAmount);
      updateGameState({
        player: {
          ...gameState.player,
          silver: gameState.player.silver + winAmount
        }
      });
      addNotification(`Thắng ${winType}! +${winAmount} Bạc`, 'success');
    } else {
      addNotification('Chúc bạn may mắn lần sau!', 'info');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <Cherry className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold">Slot Machine</h2>
      </div>

      <Card className="p-4">
        {/* Betting */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Chọn mức cược:</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[50, 100, 200, 500].map(amount => (
              <Button
                key={amount}
                variant={betAmount === amount ? "default" : "outline"}
                onClick={() => setBetAmount(amount)}
                disabled={gameState.player.silver < amount || spinning}
                size="sm"
              >
                {amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Slot Machine */}
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 p-6 rounded-lg mb-4">
          <div className="bg-black p-4 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-4">
              {reels.map((symbolId, index) => {
                const symbol = getSymbol(symbolId);
                if (!symbol) return null;
                
                const Icon = symbol.icon;
                return (
                  <div 
                    key={index} 
                    className={`bg-white h-24 w-24 rounded-lg flex items-center justify-center border-4 border-yellow-300 ${
                      spinning ? 'animate-spin' : ''
                    }`}
                  >
                    <Icon className={`w-12 h-12 ${symbol.color}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Win Display */}
          {lastWin > 0 && (
            <div className="text-center mb-4">
              <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                Thắng: {lastWin} Bạc! 🎉
              </Badge>
            </div>
          )}

          {/* Spin Button */}
          <Button 
            onClick={spinReels} 
            disabled={gameState.player.silver < betAmount || spinning}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-3"
          >
            {spinning ? 'Đang Quay...' : `QUAY (${betAmount} Bạc)`}
          </Button>
        </div>

        {/* Paytable */}
        <Card className="p-4 bg-blue-50">
          <h4 className="font-bold text-blue-800 mb-3">Bảng Trả Thưởng</h4>
          <div className="space-y-2">
            {symbols.map(symbol => {
              const Icon = symbol.icon;
              return (
                <div key={symbol.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${symbol.color}`} />
                    <span>3 {symbol.name}</span>
                  </div>
                  <span className="font-bold">{symbol.multiplier}x</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t text-xs text-blue-600">
            <p>• 2 cùng loại: 30% của giá trị 3 cùng loại</p>
            <p>• Tỷ lệ xuất hiện giảm dần theo giá trị</p>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default SlotMachineGame;
