
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
  Star,
  ArrowLeft
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
        return { name: 'Kiếm Khách', icon: Sword, color: 'text-red-400', gradient: 'from-red-600 to-orange-600' };
      case 'magic':
        return { name: 'Pháp Sư', icon: Zap, color: 'text-purple-400', gradient: 'from-purple-600 to-blue-600' };
      case 'defense':
        return { name: 'Hộ Vệ', icon: Shield, color: 'text-blue-400', gradient: 'from-blue-600 to-cyan-600' };
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Floating magical particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
              选择角色
            </span>
          </h1>
          <p className="text-lg text-amber-200/80">
            選擇角色進入遊戲
          </p>
        </div>

        <Card className="w-full max-w-6xl bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm border border-amber-500/30 p-6 rounded-2xl shadow-2xl">
          {characters.length === 0 ? (
            // No characters - show create character prompt
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <User className="w-12 h-12 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">
                  沒有角色
                </h3>
                <p className="text-amber-200/70">
                  創建你的第一個角色開始修仙之旅
                </p>
              </div>

              <Dialog open={showCreateCharacter} onOpenChange={setShowCreateCharacter}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-2xl">
                    <Plus className="w-5 h-5 mr-2" />
                    創建角色
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black/95 border-amber-500/30">
                  <CharacterCreation onComplete={handleCreateCharacter} />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            // Show character list with mystical styling
            <div className="space-y-6">
              {/* Character Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((character) => {
                  const classInfo = getClassInfo(character.class);
                  const ClassIcon = classInfo.icon;
                  const isSelected = selectedCharacter === character.id;
                  
                  return (
                    <Card
                      key={character.id}
                      className={`relative p-0 cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden ${
                        isSelected
                          ? 'border-2 border-amber-400 shadow-2xl shadow-amber-400/30'
                          : 'border border-amber-500/20 hover:border-amber-400/50'
                      }`}
                      onClick={() => setSelectedCharacter(character.id)}
                    >
                      {/* Background gradient for character class */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${classInfo.gradient} opacity-20`} />
                      
                      {/* Character avatar area */}
                      <div className="relative h-32 bg-gradient-to-b from-transparent to-black/60 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl">
                          <ClassIcon className="w-10 h-10 text-white" />
                        </div>
                        
                        {/* Delete button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCharacter(character.id);
                          }}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 w-8 h-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Character info */}
                      <div className="relative p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="space-y-3">
                          {/* Character name and class */}
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <h4 className="font-bold text-amber-400 text-lg">{character.name}</h4>
                              {character.vipLevel > 0 && (
                                <Badge variant="outline" className="text-xs px-1 py-0 text-purple-400 border-purple-400">
                                  VIP{character.vipLevel}
                                </Badge>
                              )}
                            </div>
                            <p className={`text-sm font-medium ${classInfo.color}`}>{classInfo.name}</p>
                          </div>

                          {/* Character stats in grid */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center p-2 bg-black/40 rounded border border-amber-500/20">
                              <span className="text-amber-400 font-semibold">{character.level}</span>
                              <div className="text-gray-400">等級</div>
                            </div>
                            <div className="text-center p-2 bg-black/40 rounded border border-amber-500/20">
                              <span className="text-blue-400 font-semibold">{character.realm}</span>
                              <div className="text-gray-400">境界</div>
                            </div>
                          </div>

                          {/* Combat power */}
                          <div className="text-center p-2 bg-black/40 rounded border border-amber-500/20">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="w-3 h-3 text-orange-400" />
                              <span className="text-orange-400 font-semibold">
                                {character.combatPower.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-gray-400 text-xs">戰鬥力</div>
                          </div>

                          {/* Last played */}
                          <div className="text-center text-xs text-gray-500">
                            最後遊戲: {formatLastPlayed(character.lastPlayed)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {/* Create New Character Card */}
                <Card className="p-6 border-2 border-dashed border-amber-500/30 hover:border-amber-400/50 transition-colors bg-black/40">
                  <Dialog open={showCreateCharacter} onOpenChange={setShowCreateCharacter}>
                    <DialogTrigger asChild>
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 cursor-pointer">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-500/50 flex items-center justify-center">
                          <Plus className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium text-amber-400">創建新角色</p>
                          <p className="text-xs text-gray-500">最多5個角色</p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black/95 border-amber-500/30">
                      <CharacterCreation onComplete={handleCreateCharacter} />
                    </DialogContent>
                  </Dialog>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-amber-500/20">
                <Button variant="outline" onClick={onBack} className="border-amber-500/30 text-amber-400 hover:bg-amber-400/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Button>
                
                <Button
                  size="lg"
                  disabled={!selectedCharacter}
                  onClick={() => {
                    const character = characters.find(c => c.id === selectedCharacter);
                    if (character) handleSelectCharacter(character);
                  }}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-2xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  進入遊戲
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
