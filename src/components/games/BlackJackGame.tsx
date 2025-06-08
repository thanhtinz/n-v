
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Spade, Heart, Diamond, Club } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface PlayingCard {
  suit: 'spades' | 'hearts' | 'diamonds' | 'clubs';
  rank: string;
  value: number;
}

interface BlackJackGameProps {
  onBack: () => void;
}

const BlackJackGame = ({ onBack }: BlackJackGameProps) => {
  const { gameState, updateGameState, addNotification } = useGameState();
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [betAmount, setBetAmount] = useState(100);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | 'tie' | null>(null);

  const suits = ['spades', 'hearts', 'diamonds', 'clubs'] as const;
  const ranks = [
    { rank: 'A', value: 11 },
    { rank: '2', value: 2 },
    { rank: '3', value: 3 },
    { rank: '4', value: 4 },
    { rank: '5', value: 5 },
    { rank: '6', value: 6 },
    { rank: '7', value: 7 },
    { rank: '8', value: 8 },
    { rank: '9', value: 9 },
    { rank: '10', value: 10 },
    { rank: 'J', value: 10 },
    { rank: 'Q', value: 10 },
    { rank: 'K', value: 10 }
  ];

  const createDeck = (): PlayingCard[] => {
    const deck: PlayingCard[] = [];
    for (const suit of suits) {
      for (const { rank, value } of ranks) {
        deck.push({ suit, rank, value });
      }
    }
    return deck.sort(() => Math.random() - 0.5);
  };

  const calculateHandValue = (hand: PlayingCard[]): number => {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
      if (card.rank === 'A') {
        aces++;
        value += 11;
      } else {
        value += card.value;
      }
    }

    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  };

  const getSuitIcon = (suit: string) => {
    switch (suit) {
      case 'spades': return <Spade className="w-4 h-4 text-black" />;
      case 'hearts': return <Heart className="w-4 h-4 text-red-500" />;
      case 'diamonds': return <Diamond className="w-4 h-4 text-red-500" />;
      case 'clubs': return <Club className="w-4 h-4 text-black" />;
      default: return null;
    }
  };

  const startGame = () => {
    if (gameState.player.silver < betAmount) {
      addNotification('Không đủ tiền để đặt cược!', 'error');
      return;
    }

    const deck = createDeck();
    const newPlayerHand = [deck[0], deck[2]];
    const newDealerHand = [deck[1], deck[3]];

    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameStarted(true);
    setGameEnded(false);
    setPlayerTurn(true);
    setGameResult(null);

    // Deduct bet amount
    updateGameState({
      player: {
        ...gameState.player,
        silver: gameState.player.silver - betAmount
      }
    });

    // Check for immediate blackjack
    const playerValue = calculateHandValue(newPlayerHand);
    const dealerValue = calculateHandValue(newDealerHand);

    if (playerValue === 21) {
      if (dealerValue === 21) {
        endGame('tie');
      } else {
        endGame('win');
      }
    }
  };

  const hit = () => {
    if (!gameStarted || !playerTurn || gameEnded) return;

    const deck = createDeck();
    const newCard = deck[0];
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);

    const handValue = calculateHandValue(newHand);
    if (handValue > 21) {
      endGame('lose');
    } else if (handValue === 21) {
      stand();
    }
  };

  const stand = () => {
    if (!gameStarted || !playerTurn || gameEnded) return;

    setPlayerTurn(false);
    dealerPlay();
  };

  const dealerPlay = () => {
    let currentDealerHand = [...dealerHand];
    let dealerValue = calculateHandValue(currentDealerHand);

    while (dealerValue < 17) {
      const deck = createDeck();
      const newCard = deck[0];
      currentDealerHand.push(newCard);
      dealerValue = calculateHandValue(currentDealerHand);
    }

    setDealerHand(currentDealerHand);

    const playerValue = calculateHandValue(playerHand);

    if (dealerValue > 21) {
      endGame('win');
    } else if (dealerValue > playerValue) {
      endGame('lose');
    } else if (dealerValue < playerValue) {
      endGame('win');
    } else {
      endGame('tie');
    }
  };

  const endGame = (result: 'win' | 'lose' | 'tie') => {
    setGameEnded(true);
    setGameResult(result);

    let winnings = 0;
    if (result === 'win') {
      const playerValue = calculateHandValue(playerHand);
      if (playerValue === 21 && playerHand.length === 2) {
        // Blackjack pays 3:2
        winnings = betAmount + Math.floor(betAmount * 1.5);
      } else {
        // Normal win pays 2:1
        winnings = betAmount * 2;
      }
      addNotification(`Thắng! +${winnings} Bạc`, 'success');
    } else if (result === 'tie') {
      winnings = betAmount; // Return bet
      addNotification('Hòa! Hoàn tiền cược', 'info');
    } else {
      addNotification('Thua! Mất tiền cược', 'error');
    }

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
    setPlayerHand([]);
    setDealerHand([]);
    setGameStarted(false);
    setGameEnded(false);
    setPlayerTurn(true);
    setGameResult(null);
  };

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

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
        {/* Betting */}
        {!gameStarted && (
          <div className="mb-4">
            <h3 className="font-bold mb-2">Chọn mức cược:</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[50, 100, 200, 500].map(amount => (
                <Button
                  key={amount}
                  variant={betAmount === amount ? "default" : "outline"}
                  onClick={() => setBetAmount(amount)}
                  disabled={gameState.player.silver < amount}
                  size="sm"
                >
                  {amount}
                </Button>
              ))}
            </div>
            <Button onClick={startGame} className="w-full" disabled={gameState.player.silver < betAmount}>
              Bắt Đầu Game ({betAmount} Bạc)
            </Button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="space-y-6">
            {/* Dealer Hand */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold">Nhà Cái:</h3>
                <Badge variant="outline">
                  {gameEnded || !playerTurn ? dealerValue : dealerHand[0]?.value || 0}
                </Badge>
              </div>
              <div className="flex gap-2">
                {dealerHand.map((card, index) => (
                  <div key={index} className={`w-16 h-24 bg-white border-2 rounded-lg flex flex-col items-center justify-center ${
                    index === 1 && playerTurn && !gameEnded ? 'bg-gray-300' : ''
                  }`}>
                    {index === 1 && playerTurn && !gameEnded ? (
                      <div className="text-2xl">?</div>
                    ) : (
                      <>
                        <div className="font-bold text-lg">{card.rank}</div>
                        {getSuitIcon(card.suit)}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Player Hand */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold">Bạn:</h3>
                <Badge variant="outline">{playerValue}</Badge>
                {playerValue === 21 && playerHand.length === 2 && (
                  <Badge className="bg-yellow-500">BlackJack!</Badge>
                )}
              </div>
              <div className="flex gap-2">
                {playerHand.map((card, index) => (
                  <div key={index} className="w-16 h-24 bg-white border-2 rounded-lg flex flex-col items-center justify-center">
                    <div className="font-bold text-lg">{card.rank}</div>
                    {getSuitIcon(card.suit)}
                  </div>
                ))}
              </div>
            </div>

            {/* Game Controls */}
            {playerTurn && !gameEnded && (
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={hit} disabled={playerValue >= 21}>
                  Rút Thêm (Hit)
                </Button>
                <Button onClick={stand} variant="outline">
                  Dừng (Stand)
                </Button>
              </div>
            )}

            {/* Game Result */}
            {gameEnded && (
              <div className="text-center space-y-4">
                <div className="text-lg font-bold">
                  {gameResult === 'win' && 'Bạn Thắng! 🎉'}
                  {gameResult === 'lose' && 'Bạn Thua! 😢'}
                  {gameResult === 'tie' && 'Hòa! 🤝'}
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
            <li>• Mục tiêu: Đạt tổng điểm gần 21 nhất mà không vượt quá</li>
            <li>• A = 11 hoặc 1, J/Q/K = 10, các lá khác = giá trị mặt</li>
            <li>• BlackJack (A + 10/J/Q/K) trả thưởng 3:2</li>
            <li>• Thắng thường trả thưởng 2:1</li>
            <li>• Nhà cái bắt buộc rút đến khi ≥ 17</li>
          </ul>
        </Card>
      </Card>
    </div>
  );
};

export default BlackJackGame;
