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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const getClassInfo = (classType: 'sword' | 'magic' | 'defense') => {
    switch (classType) {
      case 'sword':
        return { name: 'Kiếm Khách', icon: Sword, color: 'text-red-400', bgGradient: 'from-red-500/20 to-orange-500/20' };
      case 'magic':
        return { name: 'Pháp Sư', icon: Zap, color: 'text-purple-400', bgGradient: 'from-purple-500/20 to-blue-500/20' };
      case 'defense':
        return { name: 'Hộ Vệ', icon: Shield, color: 'text-blue-400', bgGradient: 'from-blue-500/20 to-cyan-500/20' };
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
      
      {/* Floating magical particles - reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
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
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-2 sm:p-4">
        {/* Header - mobile optimized */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
              Chọn Nhân Vật
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-amber-200/80">
            Chọn nhân vật để bắt đầu hành trình tu tiên
          </p>
        </div>

        {characters.length === 0 ? (
          // No characters - mobile optimized
          <Card className="w-full max-w-xs sm:max-w-md bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm border border-amber-500/30 p-4 sm:p-8 rounded-2xl shadow-2xl text-center space-y-4 sm:space-y-6">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <User className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
            
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-amber-400 mb-1 sm:mb-2">
                Chưa có nhân vật
              </h3>
              <p className="text-xs sm:text-base text-amber-200/70">
                Tạo nhân vật đầu tiên để bắt đầu hành trình tu tiên
              </p>
            </div>

            <Dialog open={showCreateCharacter} onOpenChange={setShowCreateCharacter}>
              <DialogTrigger asChild>
                <Button size={isMobile ? "default" : "lg"} className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-2xl text-sm sm:text-base">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Tạo Nhân Vật
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl sm:max-w-6xl max-h-[90vh] overflow-y-auto bg-black/95 border-amber-500/30">
                <CharacterCreation onComplete={handleCreateCharacter} />
              </DialogContent>
            </Dialog>
          </Card>
        ) : (
          // Character selection - mobile optimized
          <div className="w-full max-w-3xl sm:max-w-5xl space-y-4 sm:space-y-6">
            {/* Character Circle Display - smaller for mobile */}
            <div className="relative">
              {/* Center mystical platform - responsive */}
              <div className={`relative mx-auto ${isMobile ? 'w-60 h-60' : 'w-80 h-80'}`}>
                {/* Mystical background circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-red-500/20 animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/20 to-cyan-500/10 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Selected character display */}
                {selectedCharacter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-1 sm:space-y-2">
                      {(() => {
                        const character = characters.find(c => c.id === selectedCharacter);
                        if (!character) return null;
                        const classInfo = getClassInfo(character.class);
                        const ClassIcon = classInfo.icon;
                        return (
                          <>
                            <div className={`mx-auto rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}>
                              <ClassIcon className={`text-white ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`} />
                            </div>
                            <h3 className={`font-bold text-amber-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>{character.name}</h3>
                            <p className={`${classInfo.color} ${isMobile ? 'text-xs' : 'text-sm'}`}>{classInfo.name}</p>
                            <div className={`space-y-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                              <div className="text-amber-300">Cấp độ: {character.level}</div>
                              <div className="text-blue-300">Cảnh giới: {character.realm}</div>
                              <div className="text-orange-300">Sức mạnh: {character.combatPower.toLocaleString()}</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
                
                {!selectedCharacter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`mx-auto rounded-full border-2 border-dashed border-amber-400/50 flex items-center justify-center mb-2 sm:mb-3 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`}>
                        <User className={`text-amber-400/50 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                      </div>
                      <p className={`text-amber-400/60 ${isMobile ? 'text-xs' : 'text-sm'}`}>Chọn nhân vật</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Character slots around the circle - responsive positioning */}
              <div className="absolute inset-0">
                {characters.map((character, index) => {
                  const angle = (index * 360) / Math.max(characters.length, 5);
                  const radius = isMobile ? 150 : 200;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  const classInfo = getClassInfo(character.class);
                  const ClassIcon = classInfo.icon;
                  const isSelected = selectedCharacter === character.id;
                  
                  return (
                    <div
                      key={character.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isMobile ? 'w-14 h-14' : 'w-20 h-20'}`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      onClick={() => setSelectedCharacter(character.id)}
                    >
                      <div className={`relative w-full h-full rounded-full transition-all duration-300 ${
                        isSelected 
                          ? 'scale-110 shadow-2xl shadow-amber-400/50' 
                          : 'hover:scale-105'
                      }`}>
                        {/* Character avatar */}
                        <div className={`w-full h-full rounded-full bg-gradient-to-r ${
                          isSelected 
                            ? 'from-amber-500 to-orange-500' 
                            : 'from-gray-600 to-gray-700 hover:from-amber-400 hover:to-orange-400'
                        } flex items-center justify-center shadow-lg transition-all duration-300`}>
                          <ClassIcon className={`text-white ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                        </div>
                        
                        {/* Character name */}
                        <div className={`absolute left-1/2 transform -translate-x-1/2 text-center ${isMobile ? '-bottom-6' : '-bottom-8'}`}>
                          <p className={`font-medium ${isSelected ? 'text-amber-400' : 'text-gray-400'} ${isMobile ? 'text-xs' : 'text-xs'}`}>
                            {character.name}
                          </p>
                        </div>
                        
                        {/* Delete button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCharacter(character.id);
                          }}
                          className={`absolute p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full ${isMobile ? '-top-1 -right-1 w-5 h-5' : '-top-2 -right-2 w-6 h-6'}`}
                        >
                          <Trash2 className={isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                {/* Add new character slot */}
                {characters.length < 5 && (
                  <div
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isMobile ? 'w-14 h-14' : 'w-20 h-20'}`}
                    style={{
                      left: `calc(50% + ${Math.cos((characters.length * 360 / 5 * Math.PI) / 180) * (isMobile ? 150 : 200)}px)`,
                      top: `calc(50% + ${Math.sin((characters.length * 360 / 5 * Math.PI) / 180) * (isMobile ? 150 : 200)}px)`,
                    }}
                  >
                    <Dialog open={showCreateCharacter} onOpenChange={setShowCreateCharacter}>
                      <DialogTrigger asChild>
                        <div className="w-full h-full rounded-full border-2 border-dashed border-amber-500/50 hover:border-amber-400 transition-colors flex items-center justify-center bg-black/40 hover:bg-amber-400/10">
                          <Plus className={`text-amber-400 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl sm:max-w-6xl max-h-[90vh] overflow-y-auto bg-black/95 border-amber-500/30">
                        <CharacterCreation onComplete={handleCreateCharacter} />
                      </DialogContent>
                    </Dialog>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 text-center ${isMobile ? '-bottom-6' : '-bottom-8'}`}>
                      <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>Tạo mới</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - mobile optimized */}
            <div className="flex justify-center space-x-3 sm:space-x-4 pt-4 sm:pt-8">
              <Button 
                variant="outline" 
                onClick={onBack} 
                size={isMobile ? "sm" : "default"}
                className="border-amber-500/30 text-amber-400 hover:bg-amber-400/10 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                Quay lại
              </Button>
              
              <Button
                size={isMobile ? "default" : "lg"}
                disabled={!selectedCharacter}
                onClick={() => {
                  const character = characters.find(c => c.id === selectedCharacter);
                  if (character) handleSelectCharacter(character);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-2xl px-4 sm:px-8 text-sm sm:text-base"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Vào Game
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSelection;
