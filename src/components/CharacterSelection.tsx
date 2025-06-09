
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User,
  Plus,
  Trash2,
  Play,
  Sword,
  Shield,
  Zap,
  Crown,
  Star
} from 'lucide-react';
import CharacterCreation from './CharacterCreation';

interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female';
  class: 'sword' | 'magic' | 'defense';
  level: number;
  realm: string;
  combatPower: number;
  lastPlayed: string;
  vipLevel: number;
}

interface CharacterSelectionProps {
  onCharacterSelect: (character: Character) => void;
  onBack: () => void;
}

const CharacterSelection = ({ onCharacterSelect, onBack }: CharacterSelectionProps) => {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('gameCharacters');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);

  const getClassInfo = (classType: 'sword' | 'magic' | 'defense') => {
    switch (classType) {
      case 'sword':
        return { name: 'Kiếm Khách', icon: Sword, color: 'text-red-400' };
      case 'magic':
        return { name: 'Pháp Sư', icon: Zap, color: 'text-purple-400' };
      case 'defense':
        return { name: 'Hộ Vệ', icon: Shield, color: 'text-blue-400' };
    }
  };

  const handleCreateCharacter = (newCharacter: {
    name: string;
    gender: 'male' | 'female';
    class: 'sword' | 'magic' | 'defense';
  }) => {
    const character: Character = {
      id: Date.now().toString(),
      name: newCharacter.name,
      gender: newCharacter.gender,
      class: newCharacter.class,
      level: 1,
      realm: 'Phàm Nhân',
      combatPower: 100,
      lastPlayed: new Date().toISOString(),
      vipLevel: 0
    };

    const updatedCharacters = [...characters, character];
    setCharacters(updatedCharacters);
    localStorage.setItem('gameCharacters', JSON.stringify(updatedCharacters));
    localStorage.setItem('playerCharacter', JSON.stringify(newCharacter));
    setShowCreateCharacter(false);
  };

  const handleDeleteCharacter = (characterId: string) => {
    const updatedCharacters = characters.filter(char => char.id !== characterId);
    setCharacters(updatedCharacters);
    localStorage.setItem('gameCharacters', JSON.stringify(updatedCharacters));
    
    if (selectedCharacter === characterId) {
      setSelectedCharacter(null);
    }
  };

  const handleSelectCharacter = (character: Character) => {
    localStorage.setItem('playerCharacter', JSON.stringify({
      name: character.name,
      gender: character.gender,
      class: character.class
    }));
    onCharacterSelect(character);
  };

  const formatLastPlayed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hôm nay';
    if (days === 1) return 'Hôm qua';
    return `${days} ngày trước`;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cultivator-gold via-spirit-jade to-mystical-purple bg-clip-text text-transparent">
              Chọn Nhân Vật
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Chọn nhân vật để tiếp tục hành trình tu tiên
          </p>
        </div>

        <Card className="w-full max-w-4xl bg-card/90 backdrop-blur-sm border-border/50 p-6">
          {characters.length === 0 ? (
            // No characters - show create character prompt
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cultivator-gold to-spirit-jade rounded-full flex items-center justify-center mx-auto">
                <User className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-cultivator-gold mb-2">
                  Chưa có nhân vật
                </h3>
                <p className="text-muted-foreground">
                  Tạo nhân vật đầu tiên để bắt đầu hành trình tu tiên
                </p>
              </div>

              <Dialog open={showCreateCharacter} onOpenChange={setShowCreateCharacter}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-cultivator-gold to-spirit-jade">
                    <Plus className="w-5 h-5 mr-2" />
                    Tạo Nhân Vật
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <CharacterCreation onComplete={handleCreateCharacter} />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            // Show character list
            <div className="space-y-6">
              {/* Character Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => {
                  const classInfo = getClassInfo(character.class);
                  const ClassIcon = classInfo.icon;
                  
                  return (
                    <Card
                      key={character.id}
                      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedCharacter === character.id
                          ? 'border-cultivator-gold bg-cultivator-gold/10'
                          : 'border-border hover:border-cultivator-gold/50'
                      }`}
                      onClick={() => setSelectedCharacter(character.id)}
                    >
                      <div className="space-y-4">
                        {/* Character Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cultivator-gold to-spirit-jade flex items-center justify-center">
                              <ClassIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-cultivator-gold">{character.name}</h4>
                                {character.vipLevel > 0 && (
                                  <Badge variant="outline" className="text-xs px-1 py-0 text-mystical-purple border-mystical-purple">
                                    VIP{character.vipLevel}
                                  </Badge>
                                )}
                              </div>
                              <p className={`text-sm ${classInfo.color}`}>{classInfo.name}</p>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCharacter(character.id);
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Character Stats */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Cấp độ:</span>
                            <span className="ml-2 font-semibold text-cultivator-gold">
                              {character.level}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cảnh giới:</span>
                            <span className="ml-2 font-semibold text-spirit-jade">
                              {character.realm}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-divine-blue" />
                              <span className="text-muted-foreground">Chiến lực:</span>
                              <span className="ml-2 font-semibold text-divine-blue">
                                {character.combatPower.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Last Played */}
                        <div className="text-xs text-muted-foreground">
                          Lần cuối chơi: {formatLastPlayed(character.lastPlayed)}
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {/* Create New Character Card */}
                <Card className="p-4 border-dashed border-2 border-muted-foreground/50 hover:border-cultivator-gold/50 transition-colors">
                  <Dialog open={showCreateCharacter} onOpenChange={setShowCreateCharacter}>
                    <DialogTrigger asChild>
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 cursor-pointer">
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                          <Plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Tạo nhân vật mới</p>
                          <p className="text-xs text-muted-foreground/70">Tối đa 5 nhân vật</p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <CharacterCreation onComplete={handleCreateCharacter} />
                    </DialogContent>
                  </Dialog>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <Button variant="outline" onClick={onBack}>
                  Quay Lại
                </Button>
                
                <Button
                  size="lg"
                  disabled={!selectedCharacter}
                  onClick={() => {
                    const character = characters.find(c => c.id === selectedCharacter);
                    if (character) handleSelectCharacter(character);
                  }}
                  className="bg-gradient-to-r from-spirit-jade to-divine-blue hover:from-spirit-jade/80 hover:to-divine-blue/80"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Vào Game
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CharacterSelection;
