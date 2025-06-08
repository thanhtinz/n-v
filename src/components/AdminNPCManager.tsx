
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGameState } from '@/hooks/useGameState';
import { 
  Users,
  Plus,
  Edit,
  Trash2,
  Upload,
  ShoppingCart,
  BookOpen,
  Crown,
  Sword
} from 'lucide-react';

interface NPC {
  id: number;
  name: string;
  title: string;
  description: string;
  type: 'shopkeeper' | 'quest_giver' | 'trainer' | 'guard' | 'story';
  location: string;
  avatar: string;
  level: number;
  dialogue: string[];
  shop?: {
    items: number[];
    currency: 'silver' | 'gold' | 'spirit_stones';
  };
  quests?: number[];
  skills?: string[];
}

const AdminNPCManager = () => {
  const { addNotification } = useGameState();
  const [npcs, setNpcs] = useState<NPC[]>([
    {
      id: 1,
      name: 'Trương Tam Phong',
      title: 'Chưởng Môn Võ Đang',
      description: 'Cao thủ võ học huyền thoại, sáng lập phái Võ Đang',
      type: 'trainer',
      location: 'Võ Đang Sơn',
      avatar: 'zhang-sanfeng.png',
      level: 99,
      dialogue: [
        'Ta là Trương Tam Phong, chưởng môn phái Võ Đang.',
        'Ngươi có thiện căn, có thể học võ công của ta.',
        'Hãy chăm chỉ tu luyện!'
      ],
      skills: ['Thái Cực Quyền', 'Thái Cực Kiếm']
    },
    {
      id: 2,
      name: 'Lão Gia Shop',
      title: 'Thương Gia Thần Bí',
      description: 'Người bán những món đồ quý hiếm',
      type: 'shopkeeper',
      location: 'Thành Trung Ương',
      avatar: 'old-merchant.png',
      level: 50,
      dialogue: [
        'Chào mừng đến cửa hàng của lão già!',
        'Ở đây có đủ loại bảo bối quý hiếm.',
        'Có tiền là có tất cả!'
      ],
      shop: {
        items: [1, 2, 3, 4, 5],
        currency: 'silver'
      }
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNPC, setEditingNPC] = useState<NPC | null>(null);
  const [formData, setFormData] = useState<Partial<NPC>>({
    name: '',
    title: '',
    description: '',
    type: 'shopkeeper',
    location: '',
    avatar: '',
    level: 1,
    dialogue: [''],
    shop: undefined,
    quests: [],
    skills: []
  });

  const npcTypes = [
    { value: 'shopkeeper', label: 'Thương Gia', icon: ShoppingCart },
    { value: 'quest_giver', label: 'Người Giao Nhiệm Vụ', icon: BookOpen },
    { value: 'trainer', label: 'Thầy Dạy', icon: Crown },
    { value: 'guard', label: 'Bảo Vệ', icon: Sword },
    { value: 'story', label: 'Cốt Truyện', icon: Users }
  ];

  const handleSubmit = () => {
    if (editingNPC) {
      setNpcs(prev => prev.map(npc => 
        npc.id === editingNPC.id ? { ...formData, id: editingNPC.id } as NPC : npc
      ));
      addNotification('Đã cập nhật NPC thành công!', 'success');
    } else {
      const newNPC: NPC = {
        ...formData,
        id: Date.now()
      } as NPC;
      setNpcs(prev => [...prev, newNPC]);
      addNotification('Đã thêm NPC mới thành công!', 'success');
    }
    
    setShowAddModal(false);
    setEditingNPC(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      description: '',
      type: 'shopkeeper',
      location: '',
      avatar: '',
      level: 1,
      dialogue: [''],
      shop: undefined,
      quests: [],
      skills: []
    });
  };

  const handleEdit = (npc: NPC) => {
    setEditingNPC(npc);
    setFormData(npc);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    setNpcs(prev => prev.filter(npc => npc.id !== id));
    addNotification('Đã xóa NPC thành công!', 'success');
  };

  const addDialogue = () => {
    setFormData(prev => ({
      ...prev,
      dialogue: [...(prev.dialogue || []), '']
    }));
  };

  const updateDialogue = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      dialogue: prev.dialogue?.map((d, i) => i === index ? value : d) || []
    }));
  };

  const removeDialogue = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dialogue: prev.dialogue?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5" />
          Quản Lý NPC
        </h3>
        <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-1" />
          Thêm NPC
        </Button>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Chức Danh</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Vị Trí</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {npcs.map((npc) => {
              const TypeIcon = npcTypes.find(t => t.value === npc.type)?.icon || Users;
              return (
                <TableRow key={npc.id}>
                  <TableCell>
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <TypeIcon className="w-4 h-4" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{npc.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{npc.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {npcTypes.find(t => t.value === npc.type)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{npc.location}</TableCell>
                  <TableCell>Lv.{npc.level}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(npc)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(npc.id)}>
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
          <div className="bg-background p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingNPC ? 'Chỉnh Sửa' : 'Thêm'} NPC
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tên NPC</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập tên NPC..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Chức Danh</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Nhập chức danh..."
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Mô Tả</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Loại NPC</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    {npcTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Vị Trí</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Vị trí..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Level</label>
                  <Input
                    type="number"
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Đối Thoại</label>
                <div className="space-y-2">
                  {formData.dialogue?.map((dialogue, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={dialogue}
                        onChange={(e) => updateDialogue(index, e.target.value)}
                        placeholder={`Câu thoại ${index + 1}...`}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeDialogue(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={addDialogue}>
                    <Plus className="w-3 h-3 mr-1" />
                    Thêm Câu Thoại
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit}>
                  {editingNPC ? 'Cập Nhật' : 'Thêm'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminNPCManager;
