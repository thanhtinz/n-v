
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Spade, Heart, Diamond, Club } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface BlackJackGameProps {
  onBack: () => void;
}

interface PlayingCard {
  suit: 'spades' | 'hearts' | 'diamonds' | 'clubs';
  value: string;
  numValue: number;
}

const BlackJackGame: React.FC<BlackJackGameProps> = ({ onBack }) => {
  const { gameState, updateGameState } = useGameState();
  const [playerCards, setPlayerCards] = useState<PlayingCard[]>([]);
  const [dealerCards, setDealerCards] = useState<PlayingCard[]>([]);
  const [gameState_local, setGameState_local] = useState<'betting' | 'playing' | 'finished'>('betting');
  const [bet, setBet] = useState(100);
  const [gameResult, setGameResult] = useState<string>('');
  const [showDealerCards, setShowDealerCards] = useState(false);

  const suits = ['spades', 'hearts', 'diamonds', 'clubs'] as const;
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const createDeck = (): PlayingCard[] => {
    const deck: PlayingCard[] = [];
    suits.forEach(suit => {
      values.forEach(value => {
        let numValue = parseInt(value);
        if (value === 'A') numValue = 11;
        else if (['J', 'Q', 'K'].includes(value)) numValue = 10;
        
        deck.push({ suit, value, numValue });
      });
    });
    return deck.sort(() => Math.random() - 0.5);
  };

  const calculateScore = (cards: PlayingCard[]): number => {
    let score = 0;
    let aces = 0;
    
    cards.forEach(card => {
      if (card.value === 'A') {
        aces++;
        score += 11;
      } else {
        score += card.numValue;
      }
    });
    
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    
    return score;
  };

  const getSuitIcon = (suit: string) => {
    switch (suit) {
      case 'spades': return <Spade className="w-4 h-4" />;
      case 'hearts': return <Heart className="w-4 h-4 text-red-500" />;
      case 'diamonds': return <Diamond className="w-4 h-4 text-red-500" />;
      case 'clubs': return <Club className="w-4 h-4" />;
      default: return null;
    }
  };

  const startGame = () => {
    if (gameState.player.silver < bet) return;
    
    const deck = createDeck();
    const newPlayerCards = [deck[0], deck[2]];
    const newDealerCards = [deck[1], deck[3]];
    
    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
    setGameState_local('playing');
    setShowDealerCards(false);
    setGameResult('');
    
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - bet
      }
    });
  };

  const hit = () => {
    const newCard: PlayingCard = {
      suit: suits[Math.floor(Math.random() * suits.length)],
      value: values[Math.floor(Math.random() * values.length)],
      numValue: 0
    };
    
    let numValue = parseInt(newCard.value);
    if (newCard.value === 'A') numValue = 11;
    else if (['J', 'Q', 'K'].includes(newCard.value)) numValue = 10;
    newCard.numValue = numValue;
    
    const newPlayerCards = [...playerCards, newCard];
    setPlayerCards(newPlayerCards);
    
    if (calculateScore(newPlayerCards) > 21) {
      setGameState_local('finished');
      setShowDealerCards(true);
      setGameResult('Bạn bị quá 21! Thua cuộc!');
    }
  };

  const stand = () => {
    setShowDealerCards(true);
    let currentDealerCards = [...dealerCards];
    
    while (calculateScore(currentDealerCards) < 17) {
      const newCard: PlayingCard = {
        suit: suits[Math.floor(Math.random() * suits.length)],
        value: values[Math.floor(Math.random() * values.length)],
        numValue: 0
      };
      
      let numValue = parseInt(newCard.value);
      if (newCard.value === 'A') numValue = 11;
      else if (['J', 'Q', 'K'].includes(newCard.value)) numValue = 10;
      newCard.numValue = numValue;
      
      currentDealerCards.push(newCard);
    }
    
    setDealerCards(currentDealerCards);
    
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(currentDealerCards);
    
    let result = '';
    let winnings = 0;
    
    if (dealerScore > 21) {
      result = 'Nhà cái quá 21! Bạn thắng!';
      winnings = bet * 2;
    } else if (playerScore > dealerScore) {
      result = 'Bạn thắng!';
      winnings = bet * 2;
    } else if (playerScore === dealerScore) {
      result = 'Hòa!';
      winnings = bet;
    } else {
      result = 'Nhà cái thắng!';
      winnings = 0;
    }
    
    setGameResult(result);
    setGameState_local('finished');
    
    if (winnings > 0) {
      updateGameState({
        player: {
          ...gameState.player,
          silver: gameState.player.silver + winnings
        }
      });
    }
  };

  const resetGame = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setGameState_local('betting');
    setShowDealerCards(false);
    setGameResult('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <Spade className="w-6 h-6" />
        <h2 className="text-xl font-bold">BlackJack</h2>
      </div>

      <Card className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold mb-2">Trò Chơi BlackJack</h3>
          <p className="text-sm text-muted-foreground">Mục tiêu: Đạt 21 điểm hoặc gần nhất mà không quá 21</p>
        </div>

        {gameState_local === 'betting' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm mb-2">Chọn mức cược:</p>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000].map(amount => (
                  <Button
                    key={amount}
                    variant={bet === amount ? "default" : "outline"}
                    onClick={() => setBet(amount)}
                    disabled={gameState.player.silver < amount}
                  >
                    {amount} Bạc
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={startGame}
              disabled={gameState.player.silver < bet}
              className="w-full"
            >
              Bắt Đầu Chơi ({bet} Bạc)
            </Button>
          </div>
        )}

        {gameState_local !== 'betting' && (
          <div className="space-y-4">
            {/* Dealer Cards */}
            <div className="text-center">
              <h4 className="font-bold mb-2">Nhà Cái</h4>
              <div className="flex justify-center gap-2 mb-2">
                {dealerCards.map((card, index) => (
                  <div key={index} className="w-16 h-20 bg-white border-2 border-gray-300 rounded flex flex-col items-center justify-center text-xs">
                    {(showDealerCards || index === 0) ? (
                      <>
                        <div className="font-bold">{card.value}</div>
                        {getSuitIcon(card.suit)}
                      </>
                    ) : (
                      <div className="w-full h-full bg-red-600 rounded flex items-center justify-center text-white">
                        ?
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Badge variant="outline">
                Điểm: {showDealerCards ? calculateScore(dealerCards) : '?'}
              </Badge>
            </div>

            {/* Player Cards */}
            <div className="text-center">
              <h4 className="font-bold mb-2">Bạn</h4>
              <div className="flex justify-center gap-2 mb-2">
                {playerCards.map((card, index) => (
                  <div key={index} className="w-16 h-20 bg-white border-2 border-gray-300 rounded flex flex-col items-center justify-center text-xs">
                    <div className="font-bold">{card.value}</div>
                    {getSuitIcon(card.suit)}
                  </div>
                ))}
              </div>
              <Badge variant="outline">
                Điểm: {calculateScore(playerCards)}
              </Badge>
            </div>

            {/* Game Controls */}
            {gameState_local === 'playing' && (
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={hit} disabled={calculateScore(playerCards) > 21}>
                  Rút Thêm
                </Button>
                <Button onClick={stand} variant="outline">
                  Dừng
                </Button>
              </div>
            )}

            {/* Game Result */}
            {gameState_local === 'finished' && (
              <div className="text-center space-y-4">
                <div className="p-3 bg-muted rounded">
                  <p className="font-bold text-lg">{gameResult}</p>
                </div>
                <Button onClick={resetGame} className="w-full">
                  Chơi Lại
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Rules */}
        <Card className="p-3 bg-blue-50 mt-4">
          <h4 className="font-bold text-blue-800 mb-2">Luật Chơi</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• A = 11 hoặc 1 điểm</li>
            <li>• J, Q, K = 10 điểm</li>
            <li>• Mục tiêu: Gần 21 nhất mà không quá</li>
            <li>• Nhà cái rút đến khi ≥ 17 điểm</li>
            <li>• Thắng: x2 tiền cược</li>
          </ul>
        </Card>
      </Card>
    </div>
  );
};

export default BlackJackGame;
