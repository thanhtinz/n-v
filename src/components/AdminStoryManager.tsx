
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import { 
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Eye,
  Users,
  Crown,
  Sword,
  Flame,
  Star,
  Map,
  Scroll,
  Gem
} from 'lucide-react';

interface StoryChapter {
  id: number;
  number: number;
  name: string;
  title: string;
  description: string;
  status: 'locked' | 'available' | 'active' | 'completed';
  type: 'main' | 'expansion';
  requirements: {
    level: number;
    previousChapter?: number;
    items?: string[];
  };
  objectives: {
    type: 'kill' | 'collect' | 'reach' | 'talk' | 'choice';
    target: string;
    amount: number;
    description: string;
  }[];
  rewards: {
    exp: number;
    silver: number;
    goldIngots: number;
    items: string[];
    unlocks?: string[];
  };
  npcs: string[];
  locations: string[];
  choices?: {
    id: string;
    text: string;
    consequence: string;
  }[];
}

const AdminStoryManager = () => {
  const { addNotification } = useGameState();
  const [activeTab, setActiveTab] = useState('main');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingChapter, setEditingChapter] = useState<StoryChapter | null>(null);

  const [mainChapters, setMainChapters] = useState<StoryChapter[]>([
    {
      id: 1,
      number: 1,
      name: 'Khai Linh Phá Cốc',
      title: 'Khởi Đầu Hành Trình Tu Tiên',
      description: 'Khai linh, nhận linh căn, nhập tông môn. Chọn hệ tu tiên và khám phá ma khí trong cổ cốc.',
      status: 'available',
      type: 'main',
      requirements: { level: 1 },
      objectives: [
        { type: 'choice', target: 'Chọn hệ tu tiên', amount: 1, description: 'Chọn đường tu: Kiếm, Pháp, Linh, Thể, Huyết' },
        { type: 'kill', target: 'Ma khí', amount: 10, description: 'Tiêu diệt ma khí trong cổ cốc' },
        { type: 'collect', target: 'Mảnh Chân Nguyên 1', amount: 1, description: 'Tìm thấy mảnh chân nguyên đầu tiên' }
      ],
      rewards: {
        exp: 5000,
        silver: 10000,
        goldIngots: 500,
        items: ['Kiếm Luyện Khí', 'Áo Tu Sĩ', 'Đan Dưỡng Khí'],
        unlocks: ['Hệ thống Tu Luyện', 'Tông Môn']
      },
      npcs: ['Trưởng Lão Tiếp Dẫn', 'Sư Phụ Nhập Môn'],
      locations: ['Thái Sơ Cốc', 'Tông Môn Đại Điện'],
      choices: [
        { id: 'sword', text: 'Chọn hệ Kiếm', consequence: 'Tăng sát thương vật lý' },
        { id: 'magic', text: 'Chọn hệ Pháp', consequence: 'Tăng sát thương pháp thuật' },
        { id: 'spirit', text: 'Chọn hệ Linh', consequence: 'Tăng hồi phục và buff' }
      ]
    },
    {
      id: 2,
      number: 2,
      name: 'Tà Hỏa Tái Khởi',
      title: 'Cuộc Chiến Với Tà Tông',
      description: 'Tà Tông Diêm Hỏa Cốc xuất hiện, sử dụng luyện hồn cấm thuật. Đối mặt với Phong Lôi Chân Quân.',
      status: 'locked',
      type: 'main',
      requirements: { level: 15, previousChapter: 1 },
      objectives: [
        { type: 'kill', target: 'Đệ tử Diêm Hỏa', amount: 20, description: 'Tiêu diệt đệ tử tà tông' },
        { type: 'kill', target: 'Boss Tà Hỏa Luyện Hồn', amount: 1, description: 'Đánh bại boss tà hỏa' },
        { type: 'collect', target: 'Mảnh Chân Nguyên 2', amount: 1, description: 'Thu thập mảnh chân nguyên thứ 2' }
      ],
      rewards: {
        exp: 10000,
        silver: 25000,
        goldIngots: 1000,
        items: ['Kiếm Phá Tà', 'Giáp Chống Ma', 'Bùa Hộ Mệnh'],
        unlocks: ['PvE Boss System', 'Tà Khí Kháng Tính']
      },
      npcs: ['Phong Lôi Chân Quân', 'Diêm Hỏa Lão Quái'],
      locations: ['Diêm Hỏa Cốc', 'Tà Đạo Mê Cung']
    }
  ]);

  const [expansionChapters, setExpansionChapters] = useState<StoryChapter[]>([
    {
      id: 101,
      number: 1.1,
      name: 'Tàng Cốc U Ảnh',
      title: 'Ký Ức Thời Cổ Đại',
      description: 'Khám phá ảo cảnh từ thời cổ đại khi Thái Sơ Cốc bị chôn vùi.',
      status: 'locked',
      type: 'expansion',
      requirements: { level: 10, previousChapter: 1, items: ['Chìa Khóa Cổ Cốc'] },
      objectives: [
        { type: 'kill', target: 'Ảnh Linh Ký Sinh', amount: 1, description: 'Đánh bại boss ảnh linh' },
        { type: 'collect', target: 'Linh Căn Cổ', amount: 3, description: 'Thu thập linh căn cổ đại' }
      ],
      rewards: {
        exp: 3000,
        silver: 15000,
        goldIngots: 300,
        items: ['Thức Tỉnh Linh Căn', 'Ảnh Linh Ngọc'],
        unlocks: ['Hệ Linh Căn Ẩn']
      },
      npcs: ['Ảnh Linh Canh Gác'],
      locations: ['U Ảnh Động Thiên']
    }
  ]);

  const [formData, setFormData] = useState<Partial<StoryChapter>>({
    name: '',
    title: '',
    description: '',
    status: 'locked',
    type: 'main',
    requirements: { level: 1 },
    objectives: [],
    rewards: { exp: 0, silver: 0, goldIngots: 0, items: [] },
    npcs: [],
    locations: [],
    choices: []
  });

  const chapterStatuses = [
    { value: 'locked', label: 'Khóa', color: 'bg-gray-500' },
    { value: 'available', label: 'Mở', color: 'bg-blue-500' },
    { value: 'active', label: 'Đang Chạy', color: 'bg-green-500' },
    { value: 'completed', label: 'Hoàn Thành', color: 'bg-yellow-500' }
  ];

  const objectiveTypes = [
    { value: 'kill', label: 'Tiêu Diệt' },
    { value: 'collect', label: 'Thu Thập' },
    { value: 'reach', label: 'Đạt Tới' },
    { value: 'talk', label: 'Nói Chuyện' },
    { value: 'choice', label: 'Lựa Chọn' }
  ];

  const handleSubmit = () => {
    if (editingChapter) {
      if (formData.type === 'main') {
        setMainChapters(prev => prev.map(chapter => 
          chapter.id === editingChapter.id ? { ...formData, id: editingChapter.id } as StoryChapter : chapter
        ));
      } else {
        setExpansionChapters(prev => prev.map(chapter => 
          chapter.id === editingChapter.id ? { ...formData, id: editingChapter.id } as StoryChapter : chapter
        ));
      }
      addNotification('Đã cập nhật chương truyện thành công!', 'success');
    } else {
      const newChapter: StoryChapter = {
        ...formData,
        id: Date.now()
      } as StoryChapter;
      
      if (formData.type === 'main') {
        setMainChapters(prev => [...prev, newChapter]);
      } else {
        setExpansionChapters(prev => [...prev, newChapter]);
      }
      addNotification('Đã thêm chương truyện mới thành công!', 'success');
    }
    
    setShowAddModal(false);
    setEditingChapter(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      description: '',
      status: 'locked',
      type: 'main',
      requirements: { level: 1 },
      objectives: [],
      rewards: { exp: 0, silver: 0, goldIngots: 0, items: [] },
      npcs: [],
      locations: [],
      choices: []
    });
  };

  const handleEdit = (chapter: StoryChapter) => {
    setEditingChapter(chapter);
    setFormData(chapter);
    setShowAddModal(true);
  };

  const handleDelete = (id: number, type: 'main' | 'expansion') => {
    if (type === 'main') {
      setMainChapters(prev => prev.filter(chapter => chapter.id !== id));
    } else {
      setExpansionChapters(prev => prev.filter(chapter => chapter.id !== id));
    }
    addNotification('Đã xóa chương truyện thành công!', 'success');
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...(prev.objectives || []), { type: 'kill', target: '', amount: 1, description: '' }]
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

  const ChapterTable = ({ chapters, type }: { chapters: StoryChapter[], type: 'main' | 'expansion' }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Số TT</TableHead>
          <TableHead>Tên Chương</TableHead>
          <TableHead>Tiêu Đề</TableHead>
          <TableHead>Yêu Cầu Level</TableHead>
          <TableHead>Trạng Thái</TableHead>
          <TableHead>Thao Tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chapters.map((chapter) => {
          const status = chapterStatuses.find(s => s.value === chapter.status);
          return (
            <TableRow key={chapter.id}>
              <TableCell>{chapter.number}</TableCell>
              <TableCell className="font-medium">{chapter.name}</TableCell>
              <TableCell>{chapter.title}</TableCell>
              <TableCell>Lv.{chapter.requirements.level}</TableCell>
              <TableCell>
                <Badge className={status?.color}>
                  {status?.label}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(chapter)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(chapter.id, type)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Quản Lý Cốt Truyện
        </h3>
        <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-1" />
          Thêm Chương
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="main">Tuyến Chính (10 Chương)</TabsTrigger>
          <TabsTrigger value="expansion">Chương Mở Rộng</TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-cultivator-gold" />
              <h4 className="font-semibold text-cultivator-gold">Tuyến Truyện Chính</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              10 chương chính theo cốt truyện tu tiên: từ Khai Linh đến Phá Thiên Lập Giới
            </p>
            <ChapterTable chapters={mainChapters} type="main" />
          </Card>
        </TabsContent>

        <TabsContent value="expansion" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-spirit-jade" />
              <h4 className="font-semibold text-spirit-jade">Chương Mở Rộng</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Các chương phụ, bí cảnh, ký ức và sự kiện mở rộng từ cốt truyện chính
            </p>
            <ChapterTable chapters={expansionChapters} type="expansion" />
          </Card>
        </TabsContent>
      </Tabs>

      {showAddModal && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-[700px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingChapter ? 'Chỉnh Sửa' : 'Thêm'} Chương Truyện
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Số Thứ Tự</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.number}
                    onChange={(e) => setFormData(prev => ({ ...prev, number: parseFloat(e.target.value) }))}
                    placeholder="VD: 1, 1.1, 2..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Loại Chương</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="main">Tuyến Chính</option>
                    <option value="expansion">Mở Rộng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Tên Chương</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="VD: Khai Linh Phá Cốc"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tiêu Đề</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="VD: Khởi Đầu Hành Trình Tu Tiên"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mô Tả</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Mô tả chi tiết về chương..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Level Yêu Cầu</label>
                  <Input
                    type="number"
                    value={formData.requirements?.level}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      requirements: { ...prev.requirements!, level: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Chương Trước</label>
                  <Input
                    type="number"
                    value={formData.requirements?.previousChapter || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      requirements: { ...prev.requirements!, previousChapter: e.target.value ? parseInt(e.target.value) : undefined }
                    }))}
                    placeholder="Không yêu cầu"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Trạng Thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    {chapterStatuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Mục Tiêu</label>
                <div className="space-y-2">
                  {formData.objectives?.map((objective, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <select
                        value={objective.type}
                        onChange={(e) => updateObjective(index, 'type', e.target.value)}
                        className="col-span-2 p-2 border rounded text-xs"
                      >
                        {objectiveTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      <Input
                        value={objective.target}
                        onChange={(e) => updateObjective(index, 'target', e.target.value)}
                        placeholder="Mục tiêu..."
                        className="col-span-3 text-xs"
                      />
                      <Input
                        type="number"
                        value={objective.amount}
                        onChange={(e) => updateObjective(index, 'amount', parseInt(e.target.value))}
                        className="col-span-1 text-xs"
                      />
                      <Input
                        value={objective.description}
                        onChange={(e) => updateObjective(index, 'description', e.target.value)}
                        placeholder="Mô tả..."
                        className="col-span-5 text-xs"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          objectives: prev.objectives?.filter((_, i) => i !== index) || []
                        }))}
                        className="col-span-1"
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

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit}>
                  {editingChapter ? 'Cập Nhật' : 'Thêm'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminStoryManager;
