
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useGameState } from '@/hooks/useGameState';
import { 
  Gamepad2, 
  Settings, 
  Save, 
  RotateCcw,
  TrendingUp,
  Trophy,
  Coins,
  Zap
} from 'lucide-react';

interface GameRates {
  hangman: {
    silverReward: number;
    expReward: number;
    winRate: number;
  };
  sudoku: {
    silverReward: number;
    expReward: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  game2048: {
    silverReward: number;
    expReward: number;
    targetScore: number;
  };
  quiz: {
    silverPerCorrect: number;
    expPerCorrect: number;
    timeLimit: number;
    questionCount: number;
  };
  caro: {
    winSilver: number;
    winExp: number;
    drawSilver: number;
    drawExp: number;
    boardSize: number;
  };
}

const AdminGameRatesManager = () => {
  const { addNotification } = useGameState();
  
  const [gameRates, setGameRates] = useState<GameRates>({
    hangman: {
      silverReward: 150,
      expReward: 10,
      winRate: 75
    },
    sudoku: {
      silverReward: 300,
      expReward: 20,
      difficulty: 'medium'
    },
    game2048: {
      silverReward: 500,
      expReward: 25,
      targetScore: 2048
    },
    quiz: {
      silverPerCorrect: 50,
      expPerCorrect: 5,
      timeLimit: 30,
      questionCount: 5
    },
    caro: {
      winSilver: 200,
      winExp: 15,
      drawSilver: 50,
      drawExp: 5,
      boardSize: 15
    }
  });

  const [originalRates, setOriginalRates] = useState<GameRates>({ ...gameRates });

  const updateGameRate = (game: keyof GameRates, field: string, value: number | string) => {
    setGameRates(prev => ({
      ...prev,
      [game]: {
        ...prev[game],
        [field]: value
      }
    }));
  };

  const saveChanges = () => {
    setOriginalRates({ ...gameRates });
    addNotification('Đã lưu cấu hình tỷ lệ game thành công!', 'success');
  };

  const resetChanges = () => {
    setGameRates({ ...originalRates });
    addNotification('Đã khôi phục cấu hình ban đầu!', 'info');
  };

  const hasChanges = JSON.stringify(gameRates) !== JSON.stringify(originalRates);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" />
          Quản Lý Tỷ Lệ Game
        </h3>
        <div className="flex gap-2">
          {hasChanges && (
            <Button variant="outline" onClick={resetChanges}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Khôi Phục
            </Button>
          )}
          <Button onClick={saveChanges} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-1" />
            Lưu Thay Đổi
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hangman" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hangman">Hangman</TabsTrigger>
          <TabsTrigger value="sudoku">Sudoku</TabsTrigger>
          <TabsTrigger value="game2048">2048</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="caro">Caro</TabsTrigger>
        </TabsList>

        <TabsContent value="hangman">
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cấu Hình Hangman
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Phần Thưởng Bạc</Label>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <Input
                    type="number"
                    value={gameRates.hangman.silverReward}
                    onChange={(e) => updateGameRate('hangman', 'silverReward', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Phần Thưởng EXP</Label>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <Input
                    type="number"
                    value={gameRates.hangman.expReward}
                    onChange={(e) => updateGameRate('hangman', 'expReward', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Tỷ Lệ Thắng (%)</Label>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <Input
                    type="number"
                    value={gameRates.hangman.winRate}
                    onChange={(e) => updateGameRate('hangman', 'winRate', parseInt(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sudoku">
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cấu Hình Sudoku
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Phần Thưởng Bạc</Label>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <Input
                    type="number"
                    value={gameRates.sudoku.silverReward}
                    onChange={(e) => updateGameRate('sudoku', 'silverReward', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Phần Thưởng EXP</Label>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <Input
                    type="number"
                    value={gameRates.sudoku.expReward}
                    onChange={(e) => updateGameRate('sudoku', 'expReward', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Độ Khó</Label>
                <select
                  value={gameRates.sudoku.difficulty}
                  onChange={(e) => updateGameRate('sudoku', 'difficulty', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="easy">Dễ</option>
                  <option value="medium">Trung Bình</option>
                  <option value="hard">Khó</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="game2048">
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cấu Hình Game 2048
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Phần Thưởng Bạc</Label>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <Input
                    type="number"
                    value={gameRates.game2048.silverReward}
                    onChange={(e) => updateGameRate('game2048', 'silverReward', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Phần Thưởng EXP</Label>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <Input
                    type="number"
                    value={gameRates.game2048.expReward}
                    onChange={(e) => updateGameRate('game2048', 'expReward', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Mục Tiêu Điểm</Label>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-purple-500" />
                  <Input
                    type="number"
                    value={gameRates.game2048.targetScore}
                    onChange={(e) => updateGameRate('game2048', 'targetScore', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cấu Hình Quiz
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Bạc Mỗi Câu Đúng</Label>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <Input
                    type="number"
                    value={gameRates.quiz.silverPerCorrect}
                    onChange={(e) => updateGameRate('quiz', 'silverPerCorrect', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>EXP Mỗi Câu Đúng</Label>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <Input
                    type="number"
                    value={gameRates.quiz.expPerCorrect}
                    onChange={(e) => updateGameRate('quiz', 'expPerCorrect', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Thời Gian (giây)</Label>
                <Input
                  type="number"
                  value={gameRates.quiz.timeLimit}
                  onChange={(e) => updateGameRate('quiz', 'timeLimit', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Số Câu Hỏi</Label>
                <Input
                  type="number"
                  value={gameRates.quiz.questionCount}
                  onChange={(e) => updateGameRate('quiz', 'questionCount', parseInt(e.target.value))}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="caro">
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cấu Hình Caro
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Thắng - Bạc</Label>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <Input
                    type="number"
                    value={gameRates.caro.winSilver}
                    onChange={(e) => updateGameRate('caro', 'winSilver', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Thắng - EXP</Label>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <Input
                    type="number"
                    value={gameRates.caro.winExp}
                    onChange={(e) => updateGameRate('caro', 'winExp', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Kích Thước Bàn</Label>
                <Input
                  type="number"
                  value={gameRates.caro.boardSize}
                  onChange={(e) => updateGameRate('caro', 'boardSize', parseInt(e.target.value))}
                  min="10"
                  max="20"
                />
              </div>
              <div>
                <Label>Hòa - Bạc</Label>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <Input
                    type="number"
                    value={gameRates.caro.drawSilver}
                    onChange={(e) => updateGameRate('caro', 'drawSilver', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Hòa - EXP</Label>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <Input
                    type="number"
                    value={gameRates.caro.drawExp}
                    onChange={(e) => updateGameRate('caro', 'drawExp', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {hasChanges && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2 text-yellow-800">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">
              Có thay đổi chưa lưu. Nhấn "Lưu Thay Đổi" để áp dụng.
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminGameRatesManager;
