
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGameState } from '@/hooks/useGameState';
import { 
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Target,
  Gift,
  Clock,
  Star
} from 'lucide-react';

interface Quest {
  id: number;
  name: string;
  description: string;
  type: 'main' | 'daily' | 'weekly' | 'event' | 'chain';
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare';
  level: number;
  npcGiver: string;
  objectives: {
    type: 'kill' | 'collect' | 'talk' | 'reach' | 'use';
    target: string;
    amount: number;
    current?: number;
  }[];
  rewards: {
    exp: number;
    silver: number;
    goldIngots: number;
    items: string[];
  };
  timeLimit?: number; // minutes
  prerequisites: number[]; // quest IDs
  status: 'available' | 'active' | 'completed' | 'locked';
}

const AdminQuestManager = () => {
  const { addNotification } = useGameState();
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      name: 'Tu Luyện Cơ Bản',
      description: 'Học cách tu luyện nội công để trở thành cao thủ võ lâm',
      type: 'main',
      difficulty: 'easy',
      level: 1,
      npcGiver: 'Trương Tam Phong',
      objectives: [
        { type: 'use', target: 'Tu Luyện', amount: 1, current: 0 },
        { type: 'reach', target: 'Level 5', amount: 1, current: 0 }
      ],
      rewards: {
        exp: 1000,
        silver: 5000,
        goldIngots: 100,
        items: ['Bí Kíp Tu Luyện Cơ Bản']
      },
      prerequisites: [],
      status: 'available'
    },
    {
      id: 2,
      name: 'Tiêu Diệt Quái Vật',
      description: 'Tiêu diệt 10 con sói rừng để bảo vệ dân làng',
      type: 'daily',
      difficulty: 'normal',
      level: 10,
      npcGiver: 'Lão Gia Shop',
      objectives: [
        { type: 'kill', target: 'Sói Rừng', amount: 10, current: 0 },
        { type: 'collect', target: 'Nanh Sói', amount: 5, current: 0 }
      ],
      rewards: {
        exp: 2000,
        silver: 10000,
        goldIngots: 200,
        items: ['Kiếm Sắt', 'Bình Máu Nhỏ']
      },
      timeLimit: 60,
      prerequisites: [1],
      status: 'locked'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [formData, setFormData] = useState<Partial<Quest>>({
    name: '',
    description: '',
    type: 'main',
    difficulty: 'easy',
    level: 1,
    npcGiver: '',
    objectives: [{ type: 'kill', target: '', amount: 1 }],
    rewards: { exp: 0, silver: 0, goldIngots: 0, items: [] },
    timeLimit: undefined,
    prerequisites: [],
    status: 'available'
  });

  const questTypes = [
    { value: 'main', label: 'Chính Tuyến', color: 'bg-red-500' },
    { value: 'daily', label: 'Hàng Ngày', color: 'bg-blue-500' },
    { value: 'weekly', label: 'Hàng Tuần', color: 'bg-purple-500' },
    { value: 'event', label: 'Sự Kiện', color: 'bg-yellow-500' },
    { value: 'chain', label: 'Chuỗi', color: 'bg-green-500' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Dễ', color: 'bg-green-500' },
    { value: 'normal', label: 'Bình Thường', color: 'bg-blue-500' },
    { value: 'hard', label: 'Khó', color: 'bg-orange-500' },
    { value: 'nightmare', label: 'Ác Mộng', color: 'bg-red-500' }
  ];

  const objectiveTypes = [
    { value: 'kill', label: 'Tiêu Diệt' },
    { value: 'collect', label: 'Thu Thập' },
    { value: 'talk', label: 'Nói Chuyện' },
    { value: 'reach', label: 'Đạt Tới' },
    { value: 'use', label: 'Sử Dụng' }
  ];

  const handleSubmit = () => {
    if (editingQuest) {
      setQuests(prev => prev.map(quest => 
        quest.id === editingQuest.id ? { ...formData, id: editingQuest.id } as Quest : quest
      ));
      addNotification('Đã cập nhật nhiệm vụ thành công!', 'success');
    } else {
      const newQuest: Quest = {
        ...formData,
        id: Date.now()
      } as Quest;
      setQuests(prev => [...prev, newQuest]);
      addNotification('Đã thêm nhiệm vụ mới thành công!', 'success');
    }
    
    setShowAddModal(false);
    setEditingQuest(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'main',
      difficulty: 'easy',
      level: 1,
      npcGiver: '',
      objectives: [{ type: 'kill', target: '', amount: 1 }],
      rewards: { exp: 0, silver: 0, goldIngots: 0, items: [] },
      timeLimit: undefined,
      prerequisites: [],
      status: 'available'
    });
  };

  const handleEdit = (quest: Quest) => {
    setEditingQuest(quest);
    setFormData(quest);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    setQuests(prev => prev.filter(quest => quest.id !== id));
    addNotification('Đã xóa nhiệm vụ thành công!', 'success');
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...(prev.objectives || []), { type: 'kill', target: '', amount: 1 }]
    }));
  };

  const updateObjective = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives?.map((obj, i) => 
        i === index ? { ...obj, [field]: value } : obj
      ) || []
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Quản Lý Nhiệm Vụ
        </h3>
        <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-1" />
          Thêm Nhiệm Vụ
        </Button>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên Nhiệm Vụ</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Độ Khó</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>NPC Giao</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quests.map((quest) => {
              const questType = questTypes.find(t => t.value === quest.type);
              const difficulty = difficulties.find(d => d.value === quest.difficulty);
              
              return (
                <TableRow key={quest.id}>
                  <TableCell className="font-medium">{quest.name}</TableCell>
                  <TableCell>
                    <Badge className={questType?.color}>
                      {questType?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={difficulty?.color}>
                      {difficulty?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>Lv.{quest.level}</TableCell>
                  <TableCell>{quest.npcGiver}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      quest.status === 'available' ? 'border-green-500 text-green-500' :
                      quest.status === 'active' ? 'border-blue-500 text-blue-500' :
                      quest.status === 'completed' ? 'border-yellow-500 text-yellow-500' :
                      'border-gray-500 text-gray-500'
                    }>
                      {quest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(quest)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(quest.id)}>
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
          <div className="bg-background p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingQuest ? 'Chỉnh Sửa' : 'Thêm'} Nhiệm Vụ
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên Nhiệm Vụ</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nhập tên nhiệm vụ..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mô Tả</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả nhiệm vụ..."
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Loại</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    {questTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
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

                <div>
                  <label className="text-sm font-medium">Level Yêu Cầu</label>
                  <Input
                    type="number"
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Thời Hạn (phút)</label>
                  <Input
                    type="number"
                    value={formData.timeLimit || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeLimit: e.target.value ? parseInt(e.target.value) : undefined }))}
                    placeholder="Không giới hạn"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">NPC Giao Nhiệm Vụ</label>
                <Input
                  value={formData.npcGiver}
                  onChange={(e) => setFormData(prev => ({ ...prev, npcGiver: e.target.value }))}
                  placeholder="Tên NPC..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mục Tiêu</label>
                <div className="space-y-2">
                  {formData.objectives?.map((objective, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <select
                        value={objective.type}
                        onChange={(e) => updateObjective(index, 'type', e.target.value)}
                        className="p-2 border rounded w-32"
                      >
                        {objectiveTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      <Input
                        value={objective.target}
                        onChange={(e) => updateObjective(index, 'target', e.target.value)}
                        placeholder="Mục tiêu..."
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={objective.amount}
                        onChange={(e) => updateObjective(index, 'amount', parseInt(e.target.value))}
                        className="w-20"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeObjective(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={addObjective}>
                    <Plus className="w-3 h-3 mr-1" />
                    Thêm Mục Tiêu
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Phần Thưởng</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs">EXP</label>
                    <Input
                      type="number"
                      value={formData.rewards?.exp}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        rewards: { ...prev.rewards!, exp: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs">Bạc</label>
                    <Input
                      type="number"
                      value={formData.rewards?.silver}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        rewards: { ...prev.rewards!, silver: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs">KNB</label>
                    <Input
                      type="number"
                      value={formData.rewards?.goldIngots}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        rewards: { ...prev.rewards!, goldIngots: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit}>
                  {editingQuest ? 'Cập Nhật' : 'Thêm'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminQuestManager;
