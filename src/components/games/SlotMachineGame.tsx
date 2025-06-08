
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cherry, Coins, Gem, Star } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface SlotMachineGameProps {
  onBack: () => void;
}

const SlotMachineGame: React.FC<SlotMachineGameProps> = ({ onBack }) => {
  const { gameState, updateGameState, claimReward } = useGameState();
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(100);
  const [lastWin, setLastWin] = useState(0);
  const [winMessage, setWinMessage] = useState('');

  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];
  const symbolNames: Record<string, string> = {
    '🍒': 'Cherry',
    '🍋': 'Lemon', 
    '🍊': 'Orange',
    '🍇': 'Grape',
    '⭐': 'Star',
    '💎': 'Diamond',
    '7️⃣': 'Seven'
  };

  // Payout table
  const payouts: Record<string, number> = {
    '🍒🍒🍒': 5,   // 3 cherries
    '🍋🍋🍋': 10,  // 3 lemons
    '🍊🍊🍊': 15,  // 3 oranges
    '🍇🍇🍇': 20,  // 3 grapes
    '⭐⭐⭐': 50,  // 3 stars
    '💎💎💎': 100, // 3 diamonds
    '7️⃣7️⃣7️⃣': 500 // 3 sevens - JACKPOT!
  };

  // Two symbol matches (smaller payouts)
  const twoSymbolPayouts: Record<string, number> = {
    '🍒🍒': 2,
    '🍋🍋': 3,
    '🍊🍊': 4,
    '🍇🍇': 5,
    '⭐⭐': 10,
    '💎💎': 20,
    '7️⃣7️⃣': 50
  };

  const spin = () => {
    if (gameState.player.silver < bet || spinning) return;
    
    setSpinning(true);
    setWinMessage('');
    setLastWin(0);
    
    // Deduct bet
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - bet
      }
    });

    // Simulate spinning animation
    const spinDuration = 2000;
    const spinInterval = 100;
    let spinCount = 0;
    const maxSpins = spinDuration / spinInterval;

    const spinAnimation = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      
      spinCount++;
      if (spinCount >= maxSpins) {
        clearInterval(spinAnimation);
        
        // Final result with weighted probabilities
        const finalReels = generateWeightedResult();
        setReels(finalReels);
        
        // Calculate winnings
        const winnings = calculateWinnings(finalReels);
        if (winnings > 0) {
          const totalWin = winnings * bet;
          setLastWin(totalWin);
          claimReward('silver', totalWin);
          
          if (finalReels.join('') === '7️⃣7️⃣7️⃣') {
            setWinMessage('🎉 JACKPOT! 🎉');
          } else if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
            setWinMessage(`🎊 Ba ${symbolNames[finalReels[0]]}! 🎊`);
          } else {
            setWinMessage('🎈 Thắng! 🎈');
          }
        } else {
          setWinMessage('Chúc may mắn lần sau!');
        }
        
        setSpinning(false);
      }
    }, spinInterval);
  };

  const generateWeightedResult = (): string[] => {
    // Weighted probability system
    const weights = {
      '🍒': 30, // Most common
      '🍋': 25,
      '🍊': 20,
      '🍇': 15,
      '⭐': 7,
      '💎': 2.5,
      '7️⃣': 0.5  // Rarest - jackpot
    };
    
    const getWeightedSymbol = () => {
      const random = Math.random() * 100;
      let cumulative = 0;
      
      for (const [symbol, weight] of Object.entries(weights)) {
        cumulative += weight;
        if (random <= cumulative) {
          return symbol;
        }
      }
      return '🍒'; // fallback
    };

    return [getWeightedSymbol(), getWeightedSymbol(), getWeightedSymbol()];
  };

  const calculateWinnings = (reels: string[]): number => {
    const reelString = reels.join('');
    
    // Check for three of a kind
    if (payouts[reelString]) {
      return payouts[reelString];
    }
    
    // Check for two of a kind
    const symbolCounts: Record<string, number> = {};
    reels.forEach(symbol => {
      symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    });
    
    for (const [symbol, count] of Object.entries(symbolCounts)) {
      if (count >= 2) {
        const twoSymbolKey = symbol + symbol;
        if (twoSymbolPayouts[twoSymbolKey]) {
          return twoSymbolPayouts[twoSymbolKey];
        }
      }
    }
    
    return 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <Cherry className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold">Slot Machine</h2>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold mb-2">Máy Đánh Bạc May Mắn</h3>
          <p className="text-sm text-muted-foreground">Quay để thử vận may!</p>
        </div>

        {/* Slot Machine Display */}
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 p-6 rounded-lg mb-6">
          <div className="bg-black p-4 rounded">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {reels.map((symbol, index) => (
                <div 
                  key={index} 
                  className={`bg-white h-20 rounded flex items-center justify-center text-4xl ${
                    spinning ? 'animate-bounce' : ''
                  }`}
                >
                  {symbol}
                </div>
              ))}
            </div>
            
            {winMessage && (
              <div className="text-center text-white font-bold text-lg mb-2">
                {winMessage}
              </div>
            )}
            
            {lastWin > 0 && (
              <div className="text-center text-yellow-300 font-bold">
                Thắng: {lastWin} Bạc!
              </div>
            )}
          </div>
        </div>

        {/* Betting Controls */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm mb-2">Chọn mức cược:</p>
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 200, 500].map(amount => (
                <Button
                  key={amount}
                  variant={bet === amount ? "default" : "outline"}
                  onClick={() => setBet(amount)}
                  disabled={gameState.player.silver < amount || spinning}
                  size="sm"
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={spin}
            disabled={gameState.player.silver < bet || spinning}
            className="w-full h-12 text-lg font-bold"
          >
            {spinning ? 'Đang Quay...' : `QUAY (${bet} Bạc)`}
          </Button>
        </div>

        {/* Payout Table */}
        <Card className="p-4 bg-blue-50 mt-6">
          <h4 className="font-bold text-blue-800 mb-3">Bảng Thưởng (Nhân với tiền cược)</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>🍒🍒🍒</span>
                <span className="font-bold">x5</span>
              </div>
              <div className="flex justify-between">
                <span>🍋🍋🍋</span>
                <span className="font-bold">x10</span>
              </div>
              <div className="flex justify-between">
                <span>🍊🍊🍊</span>
                <span className="font-bold">x15</span>
              </div>
              <div className="flex justify-between">
                <span>🍇🍇🍇</span>
                <span className="font-bold">x20</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>⭐⭐⭐</span>
                <span className="font-bold">x50</span>
              </div>
              <div className="flex justify-between">
                <span>💎💎💎</span>
                <span className="font-bold">x100</span>
              </div>
              <div className="flex justify-between text-yellow-600">
                <span>7️⃣7️⃣7️⃣</span>
                <span className="font-bold">x500</span>
              </div>
              <div className="text-gray-600 text-center mt-2">
                Hai giống nhau: x2-50
              </div>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default SlotMachineGame;
