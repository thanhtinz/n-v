
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
  ArrowLeft,
  Server
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
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    characters.length > 0 ? characters[0].id : null
  );
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const [selectedServer, setSelectedServer] = useState('Server 1');
  const isMobile = useIsMobile();

  const servers = ['Server 1', 'Server 2', 'Server 3', 'Server 4'];

  const getClassInfo = (classType: 'sword' | 'magic' | 'defense') => {
    switch (classType) {
      case 'sword':
        return { 
          name: 'Kiếm Khách', 
          icon: Sword, 
          color: 'text-red-400', 
          bgGradient: 'from-red-500/20 to-orange-500/20',
          wings: 'from-red-500 to-orange-500',
          platform: 'from-orange-500/40 to-red-500/40'
        };
      case 'magic':
        return { 
          name: 'Pháp Sư', 
          icon: Zap, 
          color: 'text-purple-400', 
          bgGradient: 'from-purple-500/20 to-blue-500/20',
          wings: 'from-blue-500 to-cyan-500',
          platform: 'from-cyan-500/40 to-blue-500/40'
        };
      case 'defense':
        return { 
          name: 'Hộ Vệ', 
          icon: Shield, 
          color: 'text-blue-400', 
          bgGradient: 'from-blue-500/20 to-cyan-500/20',
          wings: 'from-green-500 to-blue-500',
          platform: 'from-blue-500/40 to-cyan-500/40'
        };
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
    setSelectedCharacter(character.id);
    setShowCreateCharacter(false);
  };

  const handleDeleteCharacter = (characterId: string) => {
    const updatedCharacters = characters.filter(char => char.id !== characterId);
    setCharacters(updatedCharacters);
    localStorage.setItem('gameCharacters', JSON.stringify(updatedCharacters));
    
    if (selectedCharacter === characterId) {
      setSelectedCharacter(updatedCharacters.length > 0 ? updatedCharacters[0].id : null);
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

  const currentCharacter = characters.find(c => c.id === selectedCharacter);
  const classInfo = currentCharacter ? getClassInfo(currentCharacter.class) : null;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Floating magical particles */}
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
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <Button 
            variant="outline" 
            onClick={onBack} 
            size={isMobile ? "sm" : "default"}
            className="border-amber-500/30 text-amber-400 hover:bg-amber-400/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Chọn Nhân Vật
          </h1>
          
          <div className="w-20"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Side - Character List */}
          <div className="w-1/4 p-4 space-y-3">
            {characters.map((character) => {
              const charClassInfo = getClassInfo(character.class);
              const CharacterIcon = charClassInfo.icon;
              const isSelected = selectedCharacter === character.id;
              
              return (
                <Card
                  key={character.id}
                  className={`p-3 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50' 
                      : 'bg-black/40 border-gray-600/30 hover:bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedCharacter(character.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                      isSelected ? 'from-amber-500 to-orange-500' : 'from-gray-600 to-gray-700'
                    } flex items-center justify-center`}>
                      <CharacterIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${isSelected ? 'text-amber-400' : 'text-gray-300'}`}>
                        {character.name}
                      </p>
                      <p className={`text-xs ${isSelected ? 'text-amber-300' : 'text-gray-500'}`}>
                        Lv.{character.level} {charClassInfo.name}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCharacter(character.id);
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 w-6 h-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              );
            })}
            
            {/* Add Character Button */}
            {characters.length < 5 && (
              <Dialog open={showCreateCharacter} onOpenChange={setShowCreateCharacter}>
                <DialogTrigger asChild>
                  <Card className="p-3 cursor-pointer border-2 border-dashed border-amber-500/50 hover:border-amber-400 bg-black/20 hover:bg-amber-400/5 transition-colors">
                    <div className="flex items-center justify-center space-x-2 text-amber-400">
                      <Plus className="w-5 h-5" />
                      <span className="text-sm">Tạo nhân vật</span>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-amber-500/30">
                  <CharacterCreation onComplete={handleCreateCharacter} />
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Center - Character Display */}
          <div className="flex-1 flex items-center justify-center">
            {currentCharacter ? (
              <div className="relative">
                {/* Character Platform */}
                <div className={`w-80 h-80 rounded-full bg-gradient-to-r ${classInfo?.platform} opacity-30 absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-pulse`} />
                
                {/* Wings Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-96 h-96 bg-gradient-to-r ${classInfo?.wings} opacity-20 rounded-full animate-pulse`} style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)' }} />
                </div>
                
                {/* Character Avatar */}
                <div className="relative z-10 w-64 h-80 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4 shadow-2xl golden-glow">
                    {classInfo && <classInfo.icon className="w-16 h-16 text-white" />}
                  </div>
                  
                  {/* Character Info */}
                  <div className="text-center space-y-2 bg-black/60 backdrop-blur-sm rounded-lg p-4">
                    <h2 className="text-2xl font-bold text-amber-400">{currentCharacter.name}</h2>
                    <p className={`${classInfo?.color} text-lg`}>{classInfo?.name}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cấp độ:</span>
                        <span className="text-amber-300">{currentCharacter.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cảnh giới:</span>
                        <span className="text-blue-300">{currentCharacter.realm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sức mạnh:</span>
                        <span className="text-orange-300">{currentCharacter.combatPower.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating combat power badges */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Badge className="bg-red-500/80 text-white">戰</Badge>
                  <Badge className="bg-purple-500/80 text-white">法</Badge>
                  <Badge className="bg-green-500/80 text-white">道</Badge>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <User className="w-32 h-32 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Chưa có nhân vật</p>
                <p className="text-sm">Tạo nhân vật đầu tiên để bắt đầu</p>
              </div>
            )}
          </div>

          {/* Right Side - Server Info */}
          <div className="w-1/4 p-4 space-y-4">
            <Card className="bg-black/60 border-amber-500/30 p-4">
              <h3 className="text-amber-400 font-medium mb-3 flex items-center">
                <Server className="w-4 h-4 mr-2" />
                Chọn Server
              </h3>
              <div className="space-y-2">
                {servers.map((server) => (
                  <div
                    key={server}
                    onClick={() => setSelectedServer(server)}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedServer === server
                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                        : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{server}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs">流畅</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="p-6 flex justify-center">
          <Button
            size="lg"
            disabled={!currentCharacter}
            onClick={() => currentCharacter && handleSelectCharacter(currentCharacter)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-2xl px-12 py-3 text-lg font-bold"
            style={{
              background: 'linear-gradient(45deg, #B8860B, #DAA520, #FFD700)',
              border: '2px solid #FFD700',
              borderRadius: '10px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            <Play className="w-5 h-5 mr-2" />
            进入游戏
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;
