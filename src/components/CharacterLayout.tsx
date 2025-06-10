
import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Crown, 
  Star, 
  Coins, 
  Gem, 
  Shield,
  Sword,
  Shirt,
  Footprints,
  Hand,
  Zap,
  Heart,
  Target,
  Users,
  Calendar,
  Gift,
  Plus,
  Settings,
  BookOpen,
  Trophy,
  Sparkles
} from 'lucide-react';

const CharacterLayout = () => {
  const { gameState } = useGameState();

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Equipment slots around character - matching the reference layout
  const leftEquipmentSlots = [
    { id: 'weapon', icon: Sword, name: 'Vũ Khí', position: 'top-16' },
    { id: 'armor', icon: Shield, name: 'Giáp', position: 'top-32' },
    { id: 'boots', icon: Footprints, name: 'Giày', position: 'top-48' },
    { id: 'accessory1', icon: Gem, name: 'Phụ Kiện', position: 'top-64' }
  ];

  const rightEquipmentSlots = [
    { id: 'helmet', icon: Crown, name: 'Mũ', position: 'top-16' },
    { id: 'necklace', icon: Star, name: 'Dây Chuyền', position: 'top-32' },
    { id: 'ring', icon: Hand, name: 'Nhẫn', position: 'top-48' },
    { id: 'wings', icon: Zap, name: 'Cánh', position: 'top-64' }
  ];

  const bottomEquipmentSlots = [
    { id: 'gem1', icon: Gem, name: 'Ngọc 1' },
    { id: 'gem2', icon: Gem, name: 'Ngọc 2' },
    { id: 'gem3', icon: Gem, name: 'Ngọc 3' },
    { id: 'gem4', icon: Gem, name: 'Ngọc 4' },
    { id: 'gem5', icon: Gem, name: 'Ngọc 5' }
  ];

  const characterTabs = [
    { id: 'attributes', name: 'Thuộc Tính', active: true },
    { id: 'skills', name: 'Kỹ Năng', active: false },
    { id: 'pets', name: 'Thú Cưng', active: false },
    { id: 'mounts', name: 'Ngựa Thần', active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-amber-900/30 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 border-2 border-amber-600/50 backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-700/60 to-orange-700/60 px-4 py-2 border-b border-amber-600/30">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-2">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                Thông Tin Nhân Vật
              </h2>
              <div className="text-amber-100 text-sm">
                Lực Chiến: <span className="text-mystical-purple font-bold">{formatNumber(gameState?.player?.combatPower || 346408)}</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* Main character display area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
              {/* Left equipment slots */}
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  {leftEquipmentSlots.map((slot) => (
                    <div key={slot.id} className="group">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-700/30 to-amber-800/30 border-2 border-amber-600/50 rounded-lg flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer relative">
                        <slot.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 group-hover:text-amber-200" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                          +
                        </div>
                      </div>
                      <p className="text-xs text-amber-200 text-center mt-1">{slot.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center character display */}
              <div className="lg:col-span-8 flex flex-col items-center">
                {/* Character model area */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 mb-4 border border-white/20 backdrop-blur-sm">
                  {/* Character avatar - large display */}
                  <div className="relative">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-lg bg-gradient-to-br from-mystical-purple/20 to-divine-blue/20 border-2 border-cultivator-gold/50 flex items-center justify-center relative overflow-hidden">
                      {/* Character representation with wings */}
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-cultivator-gold to-spirit-jade flex items-center justify-center relative">
                        <User className="w-20 h-20 sm:w-24 sm:h-24 text-white" />
                        {/* Wings effect */}
                        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-16 h-20 bg-gradient-to-r from-mystical-purple/30 to-divine-blue/30 rounded-full blur-sm"></div>
                        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-16 h-20 bg-gradient-to-l from-mystical-purple/30 to-divine-blue/30 rounded-full blur-sm"></div>
                      </div>
                    </div>
                    {/* Character name and level */}
                    <div className="text-center mt-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-cultivator-gold">{gameState?.player?.name || 'Tu Tiên Giả'}</h3>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Badge className="bg-mystical-purple/20 border-mystical-purple/50 text-mystical-purple">
                          Lv.{gameState?.player?.level || 1}
                        </Badge>
                        <Badge className="bg-divine-blue/20 border-divine-blue/50 text-divine-blue">
                          <Crown className="w-3 h-3 mr-1" />
                          VIP {gameState?.player?.vipLevel || 0}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom equipment slots (gems) */}
                <div className="flex gap-2 justify-center">
                  {bottomEquipmentSlots.map((slot) => (
                    <div key={slot.id} className="group">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-700/30 to-amber-800/30 border-2 border-amber-600/50 rounded-lg flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer">
                        <slot.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 group-hover:text-amber-200" />
                      </div>
                      <p className="text-xs text-amber-200 text-center mt-1">{slot.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right equipment slots */}
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  {rightEquipmentSlots.map((slot) => (
                    <div key={slot.id} className="group">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-700/30 to-amber-800/30 border-2 border-amber-600/50 rounded-lg flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer relative">
                        <slot.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 group-hover:text-amber-200" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                          +
                        </div>
                      </div>
                      <p className="text-xs text-amber-200 text-center mt-1">{slot.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom tabs and content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Character tabs and attributes */}
              <div>
                {/* Tab navigation */}
                <div className="flex gap-1 mb-4 bg-black/20 p-1 rounded-lg">
                  {characterTabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={tab.active ? "default" : "ghost"}
                      size="sm"
                      className={`flex-1 text-xs ${tab.active ? 'bg-amber-600 text-white' : 'text-amber-200 hover:bg-amber-600/20'}`}
                    >
                      {tab.name}
                    </Button>
                  ))}
                </div>

                {/* Attributes content */}
                <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-600/50 p-4">
                  <h4 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Thuộc Tính Cơ Bản
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Công Kích:</span>
                      <span className="text-red-400 font-bold">1,587</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Phòng Thủ:</span>
                      <span className="text-blue-400 font-bold">1,541</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">HP:</span>
                      <span className="text-green-400 font-bold">4,468</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">May Mắn:</span>
                      <span className="text-yellow-400 font-bold">2,033</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Thể Lực:</span>
                      <span className="text-purple-400 font-bold">278</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Nội Lực:</span>
                      <span className="text-orange-400 font-bold">1,161</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right side - Additional information */}
              <div className="space-y-4">
                {/* Experience */}
                <Card className="bg-gradient-to-br from-blue-800/30 to-blue-900/30 border border-blue-600/50 p-4">
                  <h4 className="text-lg font-semibold text-blue-100 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    Tu Luyện
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-200">Kinh Nghiệm</span>
                        <span className="text-blue-200">
                          {gameState?.player?.exp || 33962}/{gameState?.player?.maxExp || 75174}
                        </span>
                      </div>
                      <Progress 
                        value={gameState?.player ? (gameState.player.exp / gameState.player.maxExp) * 100 : 45} 
                        className="h-2 bg-blue-900/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Cấp Độ:</span>
                        <span className="text-blue-100 font-bold">{gameState?.player?.level || 1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Tu Vi:</span>
                        <span className="text-blue-100 font-bold">Luyện Khí</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Resources */}
                <Card className="bg-gradient-to-br from-green-800/30 to-green-900/30 border border-green-600/50 p-4">
                  <h4 className="text-lg font-semibold text-green-100 mb-3 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    Tài Nguyên
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="text-green-200">Bạc:</span>
                      </div>
                      <span className="text-yellow-400 font-bold">{formatNumber(gameState?.player?.silver)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-blue-500" />
                        <span className="text-green-200">Kim Nguyên:</span>
                      </div>
                      <span className="text-blue-400 font-bold">{formatNumber(gameState?.player?.goldIngots)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="text-green-200">Linh Thạch:</span>
                      </div>
                      <span className="text-purple-400 font-bold">{formatNumber(gameState?.player?.rechargeSpiritStones)}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Cường Hóa
              </Button>
              <Button variant="outline" className="border-amber-600/50 text-amber-200 hover:bg-amber-600/20">
                <Shirt className="w-4 h-4 mr-2" />
                Thay Đồ
              </Button>
              <Button variant="outline" className="border-blue-600/50 text-blue-200 hover:bg-blue-600/20">
                <Star className="w-4 h-4 mr-2" />
                Tẩy Điểm
              </Button>
              <Button variant="outline" className="border-green-600/50 text-green-200 hover:bg-green-600/20">
                <Trophy className="w-4 h-4 mr-2" />
                Thành Tựu
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CharacterLayout;
