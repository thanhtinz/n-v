
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Hash, Trophy, RotateCcw } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface SudokuGameProps {
  onBack: () => void;
}

const SudokuGame: React.FC<SudokuGameProps> = ({ onBack }) => {
  const { claimReward } = useGameState();
  const [board, setBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won'>('playing');

  const generateSimpleSudoku = () => {
    // Simple 4x4 Sudoku for demo
    const solution = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3]
    ];
    
    const puzzle = solution.map(row => [...row]);
    // Remove some numbers
    const cellsToRemove = 8;
    for (let i = 0; i < cellsToRemove; i++) {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);
      puzzle[row][col] = 0;
    }
    
    return puzzle;
  };

  const startNewGame = () => {
    setBoard(generateSimpleSudoku());
    setSelectedCell(null);
    setGameStatus('playing');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || gameStatus !== 'playing') return;
    
    const [row, col] = selectedCell;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = newBoard[row][col] === num ? 0 : num;
    setBoard(newBoard);

    // Check if solved
    if (newBoard.every(row => row.every(cell => cell !== 0))) {
      setGameStatus('won');
      claimReward('silver', 300);
      claimReward('exp', 20);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <Hash className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold text-purple-500">Sudoku</h2>
      </div>

      <Card className="p-6">
        <div className="text-center mb-4">
          <Badge variant={gameStatus === 'won' ? 'default' : 'secondary'}>
            {gameStatus === 'won' ? 'Hoàn thành!' : 'Đang chơi'}
          </Badge>
        </div>

        <div className="max-w-sm mx-auto mb-4">
          <div className="grid grid-cols-4 gap-1 border-2 border-black p-2">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer font-bold ${
                    selectedCell && selectedCell[0] === i && selectedCell[1] === j
                      ? 'bg-blue-200'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                  onClick={() => handleCellClick(i, j)}
                >
                  {cell > 0 ? cell : ''}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4 max-w-sm mx-auto">
          {[1, 2, 3, 4].map(num => (
            <Button
              key={num}
              variant="outline"
              onClick={() => handleNumberInput(num)}
              disabled={!selectedCell || gameStatus !== 'playing'}
            >
              {num}
            </Button>
          ))}
        </div>

        {gameStatus === 'won' && (
          <div className="text-center mb-4 text-green-600">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">Hoàn thành! +300 Bạc, +20 EXP</p>
          </div>
        )}

        <Button onClick={startNewGame} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Chơi mới
        </Button>
      </Card>
    </div>
  );
};

export default SudokuGame;
