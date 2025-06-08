
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Grid2X2, Trophy, RotateCcw } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface Game2048Props {
  onBack: () => void;
}

const Game2048: React.FC<Game2048Props> = ({ onBack }) => {
  const { claimReward } = useGameState();
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const initializeBoard = useCallback(() => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }, []);

  const addRandomTile = (board: number[][]) => {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomCell[0]][randomCell[1]] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const startNewGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameStatus('playing');
  };

  useEffect(() => {
    startNewGame();
  }, [initializeBoard]);

  const move = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameStatus !== 'playing') return;
    
    // Simple move logic for demonstration
    const newBoard = board.map(row => [...row]);
    let scoreAdded = 0;
    
    // Basic left move logic
    if (direction === 'left') {
      for (let i = 0; i < 4; i++) {
        const row = newBoard[i].filter(cell => cell !== 0);
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] *= 2;
            scoreAdded += row[j];
            if (row[j] === 2048 && gameStatus === 'playing') {
              setGameStatus('won');
              claimReward('silver', 500);
              claimReward('exp', 25);
            }
            row.splice(j + 1, 1);
          }
        }
        while (row.length < 4) row.push(0);
        newBoard[i] = row;
      }
    }
    
    setBoard(newBoard);
    setScore(prev => prev + scoreAdded);
    
    setTimeout(() => {
      addRandomTile(newBoard);
      setBoard([...newBoard]);
    }, 100);
  };

  const getTileColor = (value: number) => {
    const colors: Record<number, string> = {
      0: 'bg-gray-200',
      2: 'bg-gray-100',
      4: 'bg-gray-200',
      8: 'bg-orange-200',
      16: 'bg-orange-300',
      32: 'bg-orange-400',
      64: 'bg-orange-500',
      128: 'bg-yellow-300',
      256: 'bg-yellow-400',
      512: 'bg-yellow-500',
      1024: 'bg-yellow-600',
      2048: 'bg-red-500'
    };
    return colors[value] || 'bg-red-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <Grid2X2 className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-orange-500">Game 2048</h2>
      </div>

      <Card className="p-6">
        <div className="text-center mb-4">
          <Badge variant="outline">Điểm: {score}</Badge>
          {gameStatus === 'won' && (
            <div className="text-green-600 mt-2">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold">Đạt 2048! +500 Bạc, +25 EXP</p>
            </div>
          )}
        </div>

        <div className="bg-gray-300 p-2 rounded-lg mb-4 max-w-sm mx-auto">
          <div className="grid grid-cols-4 gap-2">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-16 h-16 rounded flex items-center justify-center text-sm font-bold ${getTileColor(cell)} ${cell > 4 ? 'text-white' : 'text-gray-800'}`}
                >
                  {cell > 0 ? cell : ''}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div></div>
          <Button variant="outline" onClick={() => move('up')}>↑</Button>
          <div></div>
          <Button variant="outline" onClick={() => move('left')}>←</Button>
          <Button variant="outline" onClick={() => move('down')}>↓</Button>
          <Button variant="outline" onClick={() => move('right')}>→</Button>
        </div>

        <Button onClick={startNewGame} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Chơi Lại
        </Button>
      </Card>
    </div>
  );
};

export default Game2048;
