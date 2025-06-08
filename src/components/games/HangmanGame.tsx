
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Type, Trophy } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface HangmanGameProps {
  onBack: () => void;
}

const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const { claimReward } = useGameState();
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const words = [
    'CULTIVATION', 'IMMORTAL', 'SPIRITUAL', 'ENERGY', 'POWER',
    'WISDOM', 'STRENGTH', 'PHOENIX', 'DRAGON', 'MYSTIC'
  ];

  const maxWrongGuesses = 6;

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (currentWord && gameStatus === 'playing') {
      const wordLetters = currentWord.split('');
      const hasWon = wordLetters.every(letter => guessedLetters.includes(letter));
      
      if (hasWon) {
        setGameStatus('won');
        claimReward('silver', 150);
        claimReward('exp', 10);
      } else if (wrongGuesses >= maxWrongGuesses) {
        setGameStatus('lost');
      }
    }
  }, [guessedLetters, wrongGuesses, currentWord, gameStatus, claimReward]);

  const guessLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;
    setGuessedLetters(prev => [...prev, letter]);
    if (!currentWord.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  const displayWord = () => {
    return currentWord
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <Type className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-bold text-green-500">Trò Chơi Đoán Từ</h2>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <Badge variant={gameStatus === 'won' ? 'default' : gameStatus === 'lost' ? 'destructive' : 'secondary'}>
            {gameStatus === 'won' ? 'Thắng!' : gameStatus === 'lost' ? 'Thua!' : 'Đang chơi'}
          </Badge>
          
          <div className="text-2xl font-bold tracking-widest mb-4 font-mono">
            {displayWord()}
          </div>
          
          <div className="text-sm mb-4">
            Sai: {wrongGuesses}/{maxWrongGuesses}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 mb-6">
          {alphabet.map(letter => (
            <Button
              key={letter}
              variant={
                guessedLetters.includes(letter)
                  ? currentWord.includes(letter)
                    ? 'default'
                    : 'destructive'
                  : 'outline'
              }
              size="sm"
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
              className="aspect-square text-xs"
            >
              {letter}
            </Button>
          ))}
        </div>

        {gameStatus !== 'playing' && (
          <div className="text-center mb-4">
            {gameStatus === 'won' ? (
              <div className="text-green-600">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <p className="font-bold">Chúc mừng! +150 Bạc, +10 EXP</p>
              </div>
            ) : (
              <div className="text-red-600">
                <p className="font-bold">Thua rồi! Từ đúng: {currentWord}</p>
              </div>
            )}
          </div>
        )}

        <Button onClick={startNewGame} className="w-full">
          Chơi Lại
        </Button>
      </Card>
    </div>
  );
};

export default HangmanGame;
