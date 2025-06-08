
import React, { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Trophy, RotateCcw } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface CaroGameProps {
  onBack: () => void;
}

type CellValue = 'X' | 'O' | null;
type GameResult = 'player' | 'ai' | 'draw' | null;

const CaroGame: React.FC<CaroGameProps> = ({ onBack }) => {
  const { claimReward } = useGameState();
  const [board, setBoard] = useState<CellValue[][]>(() => 
    Array(15).fill(null).map(() => Array(15).fill(null))
  );
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [lastMove, setLastMove] = useState<[number, number] | null>(null);

  const checkWinner = useCallback((board: CellValue[][], row: number, col: number, player: CellValue): boolean => {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal \
      [1, -1],  // diagonal /
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      
      // Check positive direction
      for (let i = 1; i < 5; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }
      
      // Check negative direction
      for (let i = 1; i < 5; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }
      
      if (count >= 5) return true;
    }
    
    return false;
  }, []);

  const findBestMove = useCallback((board: CellValue[][]): [number, number] => {
    // Simple AI: try to block player or make winning move
    const emptyCells: [number, number][] = [];
    
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (board[i][j] === null) {
          // Only consider cells near existing pieces
          let hasNeighbor = false;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (ni >= 0 && ni < 15 && nj >= 0 && nj < 15 && board[ni][nj] !== null) {
                hasNeighbor = true;
                break;
              }
            }
            if (hasNeighbor) break;
          }
          if (hasNeighbor || emptyCells.length === 0) {
            emptyCells.push([i, j]);
          }
        }
      }
    }

    // If no moves made yet, play center
    if (emptyCells.length === 225) {
      return [7, 7];
    }

    // Check for winning move
    for (const [row, col] of emptyCells) {
      const testBoard = board.map(r => [...r]);
      testBoard[row][col] = 'O';
      if (checkWinner(testBoard, row, col, 'O')) {
        return [row, col];
      }
    }

    // Check for blocking move
    for (const [row, col] of emptyCells) {
      const testBoard = board.map(r => [...r]);
      testBoard[row][col] = 'X';
      if (checkWinner(testBoard, row, col, 'X')) {
        return [row, col];
      }
    }

    // Random move from available positions
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }, [checkWinner]);

  const handleCellClick = (row: number, col: number) => {
    if (!isPlayerTurn || board[row][col] !== null || gameResult !== null) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 'X';
    setBoard(newBoard);
    setLastMove([row, col]);

    if (checkWinner(newBoard, row, col, 'X')) {
      setGameResult('player');
      claimReward('silver', 200);
      claimReward('exp', 15);
      return;
    }

    setIsPlayerTurn(false);

    // AI move
    setTimeout(() => {
      const [aiRow, aiCol] = findBestMove(newBoard);
      newBoard[aiRow][aiCol] = 'O';
      setBoard([...newBoard]);
      setLastMove([aiRow, aiCol]);

      if (checkWinner(newBoard, aiRow, aiCol, 'O')) {
        setGameResult('ai');
      } else {
        // Check for draw
        const isFull = newBoard.every(row => row.every(cell => cell !== null));
        if (isFull) {
          setGameResult('draw');
          claimReward('silver', 50);
        } else {
          setIsPlayerTurn(true);
        }
      }
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(15).fill(null).map(() => Array(15).fill(null)));
    setIsPlayerTurn(true);
    setGameResult(null);
    setLastMove(null);
  };

  const getCellStyle = (row: number, col: number) => {
    let className = 'w-6 h-6 text-xs font-bold flex items-center justify-center border border-gray-300 cursor-pointer ';
    
    if (board[row][col] === null) {
      className += 'hover:bg-gray-100 ';
    }
    
    if (lastMove && lastMove[0] === row && lastMove[1] === col) {
      className += 'bg-yellow-200 ';
    }
    
    return className;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <X className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-bold text-indigo-500">Caro 5 Trong 1 Dòng</h2>
      </div>

      <Card className="p-6">
        <div className="text-center mb-4">
          <div className="flex justify-center gap-4 mb-4">
            <Badge variant="outline">
              Bạn: X
            </Badge>
            <Badge variant="outline">
              AI: O
            </Badge>
            <Badge variant={isPlayerTurn ? 'default' : 'secondary'}>
              {gameResult ? 'Kết thúc' : isPlayerTurn ? 'Lượt bạn' : 'Lượt AI'}
            </Badge>
          </div>
        </div>

        {/* Game Board */}
        <div className="mb-4 overflow-auto max-h-96">
          <div className="inline-block border-2 border-gray-400">
            {board.map((row, i) => (
              <div key={i} className="flex">
                {row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={getCellStyle(i, j)}
                    onClick={() => handleCellClick(i, j)}
                  >
                    {cell === 'X' ? (
                      <span className="text-blue-600 font-bold">X</span>
                    ) : cell === 'O' ? (
                      <span className="text-red-600 font-bold">O</span>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Game Results */}
        {gameResult && (
          <div className="text-center mb-4">
            {gameResult === 'player' ? (
              <div className="text-green-600">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <p className="font-bold">Chúc mừng! Bạn đã thắng!</p>
                <p className="text-sm">+200 Bạc, +15 EXP</p>
              </div>
            ) : gameResult === 'ai' ? (
              <div className="text-red-600">
                <p className="font-bold">AI thắng! Hãy thử lại!</p>
              </div>
            ) : (
              <div className="text-yellow-600">
                <p className="font-bold">Hòa! +50 Bạc</p>
              </div>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="text-center">
          <Button onClick={resetGame} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Chơi Lại
          </Button>
        </div>

        {/* Game Rules */}
        <Card className="p-3 bg-blue-50 mt-4">
          <h4 className="font-bold text-blue-800 mb-2">Luật Chơi</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Đặt 5 quân cờ liên tiếp (ngang/dọc/chéo) để thắng</li>
            <li>• Bạn đi X (màu xanh), AI đi O (màu đỏ)</li>
            <li>• Thắng: +200 Bạc, +15 EXP</li>
            <li>• Hòa: +50 Bạc</li>
            <li>• Ô vàng: nước đi cuối cùng</li>
          </ul>
        </Card>
      </Card>
    </div>
  );
};

export default CaroGame;
