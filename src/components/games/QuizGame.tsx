
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, HelpCircle, Trophy, RotateCcw } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface QuizGameProps {
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const QuizGame: React.FC<QuizGameProps> = ({ onBack }) => {
  const { claimReward } = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished'>('playing');
  const [timeLeft, setTimeLeft] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);

  const quizQuestions: Question[] = [
    {
      id: 1,
      question: "Trong tu tiên, 'Kim Đan' có tác dụng gì?",
      options: ["Tăng tu vi", "Hồi phục thương tích", "Tăng thọ mệnh", "Tất cả đều đúng"],
      correctAnswer: 3,
      category: "Tu Tiên"
    },
    {
      id: 2,
      question: "Giai đoạn đầu tiên của tu luyện thường được gọi là gì?",
      options: ["Luyện Khí", "Trúc Cơ", "Kim Đan", "Nguyên Anh"],
      correctAnswer: 0,
      category: "Tu Tiên"
    },
    {
      id: 3,
      question: "Trái Đất có bao nhiều châu lục?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      category: "Địa Lý"
    },
    {
      id: 4,
      question: "Quốc gia nào có diện tích lớn nhất thế giới?",
      options: ["Trung Quốc", "Canada", "Nga", "Mỹ"],
      correctAnswer: 2,
      category: "Địa Lý"
    },
    {
      id: 5,
      question: "Ai là tác giả của 'Truyện Kiều'?",
      options: ["Nguyễn Du", "Nguyễn Trãi", "Hồ Chí Minh", "Nguyễn Tất Thành"],
      correctAnswer: 0,
      category: "Văn Học"
    },
    {
      id: 6,
      question: "1 + 1 = ?",
      options: ["1", "2", "3", "11"],
      correctAnswer: 1,
      category: "Toán Học"
    },
    {
      id: 7,
      question: "Nguyên tố có ký hiệu H là gì?",
      options: ["Heli", "Hydro", "Hafnium", "Holmium"],
      correctAnswer: 1,
      category: "Hóa Học"
    },
    {
      id: 8,
      question: "Thủ đô của Việt Nam là gì?",
      options: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"],
      correctAnswer: 1,
      category: "Địa Lý"
    },
    {
      id: 9,
      question: "Trong truyện tu tiên, 'Thiên Kiếp' là gì?",
      options: ["Phép thuật mạnh", "Thử thách từ trời", "Loại vũ khí", "Cảnh giới cao"],
      correctAnswer: 1,
      category: "Tu Tiên"
    },
    {
      id: 10,
      question: "AI là viết tắt của từ gì?",
      options: ["Artificial Intelligence", "Advanced Internet", "Automatic Input", "Audio Interface"],
      correctAnswer: 0,
      category: "Công Nghệ"
    }
  ];

  const startNewGame = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameStatus('playing');
    setTimeLeft(30);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      handleNextQuestion();
    }
  }, [timeLeft, gameStatus]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correctAnswer) {
        setScore(prev => prev + 1);
      }
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setGameStatus('finished');
      // Calculate rewards based on score
      const silverReward = score * 50;
      const expReward = score * 5;
      if (silverReward > 0) {
        claimReward('silver', silverReward);
        claimReward('exp', expReward);
      }
    }
  };

  const getButtonStyle = (index: number) => {
    if (selectedAnswer === null) return 'outline';
    if (index === questions[currentQuestion].correctAnswer) return 'default';
    if (index === selectedAnswer && selectedAnswer !== questions[currentQuestion].correctAnswer) return 'destructive';
    return 'outline';
  };

  if (questions.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay Lại
        </Button>
        <HelpCircle className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-blue-500">Đố Vui Trí Tuệ</h2>
      </div>

      <Card className="p-6">
        {gameStatus === 'playing' ? (
          <>
            <div className="text-center mb-6">
              <div className="flex justify-center gap-4 mb-4">
                <Badge variant="outline">
                  Câu {currentQuestion + 1}/{questions.length}
                </Badge>
                <Badge variant="outline">
                  Điểm: {score}
                </Badge>
                <Badge variant={timeLeft <= 10 ? 'destructive' : 'secondary'}>
                  {timeLeft}s
                </Badge>
              </div>

              <Progress value={(currentQuestion / questions.length) * 100} className="mb-4" />

              <div className="mb-4">
                <Badge className="mb-2">{questions[currentQuestion].category}</Badge>
                <h3 className="text-lg font-bold mb-4">
                  {questions[currentQuestion].question}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={getButtonStyle(index)}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className="p-4 h-auto text-left justify-start"
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-2">Hoàn Thành!</h3>
            <p className="text-lg mb-4">
              Bạn trả lời đúng {score}/{questions.length} câu
            </p>
            
            <div className="mb-6">
              <Badge variant="outline" className="text-lg px-4 py-2">
                {score >= 4 ? 'Xuất sắc!' : score >= 3 ? 'Giỏi!' : score >= 2 ? 'Khá!' : 'Cần cố gắng!'}
              </Badge>
            </div>

            {score > 0 && (
              <div className="mb-4 text-green-600">
                <p>Phần thưởng: +{score * 50} Bạc, +{score * 5} EXP</p>
              </div>
            )}

            <Button onClick={startNewGame} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Chơi Lại
            </Button>
          </div>
        )}

        {/* Game Rules */}
        <Card className="p-3 bg-blue-50 mt-4">
          <h4 className="font-bold text-blue-800 mb-2">Luật Chơi</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Trả lời 5 câu hỏi trong thời gian giới hạn</li>
            <li>• Mỗi câu có 30 giây để suy nghĩ</li>
            <li>• Thưởng: 50 Bạc + 5 EXP mỗi câu đúng</li>
            <li>• Chủ đề: Tu Tiên, Địa Lý, Văn Học, Khoa Học...</li>
          </ul>
        </Card>
      </Card>
    </div>
  );
};

export default QuizGame;
