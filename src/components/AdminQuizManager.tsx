
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGameState } from '@/hooks/useGameState';
import { 
  Brain,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  category: 'cultivation' | 'general' | 'history' | 'literature';
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

const AdminQuizManager = () => {
  const { addNotification } = useGameState();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 1,
      question: 'Tu tiên là gì?',
      answers: ['Tu luyện thành tiên', 'Học phép thuật', 'Luyện võ công', 'Đọc sách'],
      correctAnswer: 0,
      category: 'cultivation',
      difficulty: 'easy',
      explanation: 'Tu tiên là quá trình tu luyện để trở thành tiên nhân'
    },
    {
      id: 2,
      question: 'Linh khí dùng để làm gì?',
      answers: ['Nấu ăn', 'Tu luyện', 'Trang trí', 'Bán đồ'],
      correctAnswer: 1,
      category: 'cultivation',
      difficulty: 'medium',
      explanation: 'Linh khí là năng lượng thiêng liêng dùng để tu luyện'
    },
    {
      id: 3,
      question: 'Thủ đô của Việt Nam là?',
      answers: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ'],
      correctAnswer: 1,
      category: 'general',
      difficulty: 'easy',
      explanation: 'Hà Nội là thủ đô của Việt Nam'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [formData, setFormData] = useState<Partial<QuizQuestion>>({
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: 0,
    category: 'cultivation',
    difficulty: 'easy',
    explanation: ''
  });

  const categories = [
    { value: 'cultivation', label: 'Tu Tiên' },
    { value: 'general', label: 'Tổng Hợp' },
    { value: 'history', label: 'Lịch Sử' },
    { value: 'literature', label: 'Văn Học' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Dễ', color: 'bg-green-500' },
    { value: 'medium', label: 'Trung Bình', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Khó', color: 'bg-red-500' }
  ];

  const handleSubmit = () => {
    if (!formData.question || formData.answers?.some(answer => !answer.trim())) {
      addNotification('Vui lòng điền đầy đủ câu hỏi và các đáp án!', 'warning');
      return;
    }

    if (editingQuestion) {
      setQuestions(prev => prev.map(q => 
        q.id === editingQuestion.id ? { ...formData, id: editingQuestion.id } as QuizQuestion : q
      ));
      addNotification('Đã cập nhật câu hỏi thành công!', 'success');
    } else {
      const newQuestion: QuizQuestion = {
        ...formData,
        id: Date.now()
      } as QuizQuestion;
      setQuestions(prev => [...prev, newQuestion]);
      addNotification('Đã thêm câu hỏi mới thành công!', 'success');
    }
    
    setShowAddModal(false);
    setEditingQuestion(null);
    setFormData({
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: 0,
      category: 'cultivation',
      difficulty: 'easy',
      explanation: ''
    });
  };

  const handleEdit = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setFormData(question);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    addNotification('Đã xóa câu hỏi thành công!', 'success');
  };

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...(formData.answers || ['', '', '', ''])];
    newAnswers[index] = value;
    setFormData(prev => ({ ...prev, answers: newAnswers }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Quản Lý Câu Hỏi Quiz
        </h3>
        <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-1" />
          Thêm Câu Hỏi
        </Button>
      </div>

      <Card className="p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Câu Hỏi</TableHead>
              <TableHead>Danh Mục</TableHead>
              <TableHead>Độ Khó</TableHead>
              <TableHead>Đáp Án Đúng</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => {
              const difficulty = difficulties.find(d => d.value === question.difficulty);
              const category = categories.find(c => c.value === question.category);
              
              return (
                <TableRow key={question.id}>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={question.question}>
                      {question.question}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{category?.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={difficulty?.color}>
                      {difficulty?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" />
                      <span className="text-sm">
                        {question.answers[question.correctAnswer]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(question)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(question.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {showAddModal && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingQuestion ? 'Chỉnh Sửa' : 'Thêm'} Câu Hỏi
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Câu Hỏi</label>
                <Textarea
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Nhập câu hỏi..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Danh Mục</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Độ Khó</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    {difficulties.map(diff => (
                      <option key={diff.value} value={diff.value}>{diff.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Các Đáp Án</label>
                <div className="space-y-3">
                  {(formData.answers || ['', '', '', '']).map((answer, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={formData.correctAnswer === index}
                          onChange={() => setFormData(prev => ({ ...prev, correctAnswer: index }))}
                          className="text-green-500"
                        />
                        <span className="text-sm font-medium">
                          {String.fromCharCode(65 + index)}:
                        </span>
                      </div>
                      <Input
                        value={answer}
                        onChange={(e) => updateAnswer(index, e.target.value)}
                        placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <AlertCircle className="w-3 h-3" />
                  <span>Chọn radio button để đánh dấu đáp án đúng</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Giải Thích (Tùy chọn)</label>
                <Textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="Giải thích cho đáp án đúng..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="w-4 h-4 mr-1" />
                  {editingQuestion ? 'Cập Nhật' : 'Thêm'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminQuizManager;
