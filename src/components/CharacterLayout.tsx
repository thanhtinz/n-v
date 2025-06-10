
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
  Plus
} from 'lucide-react';

const CharacterLayout = () => {
  const { gameState } = useGameState();

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getPlayerInfo = () => {
    const savedCharacter = localStorage.getItem('playerCharacter');
    if (savedCharacter) {
      const player = JSON.parse(savedCharacter);
      return {
        gender: player.gender || 'male',
        class: player.class || 'sword'
      };
    }
    return { gender: 'male', class: 'sword' };
  };

  const playerInfo = getPlayerInfo();

  // Equipment slots configuration
  const equipmentSlots = {
    left: [
      { id: 'weapon', icon: Sword, name: 'Vũ Khí', position: 'top-4 left-4' },
      { id: 'armor', icon: Shield, name: 'Giáp Áo', position: 'top-20 left-4' },
      { id: 'boots', icon: Footprints, name: 'Giày', position: 'top-36 left-4' },
      { id: 'accessory1', icon: Gem, name: 'Phụ Kiện', position: 'top-52 left-4' }
    ],
    right: [
      { id: 'helmet', icon: Crown, name: 'Mũ Giáp', position: 'top-4 right-4' },
      { id: 'necklace', icon: Star, name: 'Dây Chuyền', position: 'top-20 right-4' },
      { id: 'ring', icon: Hand, name: 'Nhẫn', position: 'top-36 right-4' },
      { id: 'accessory2', icon: Zap, name: 'Bảo Bối', position: 'top-52 right-4' }
    ]
  };

  const playerStats = [
    { label: 'Lực Chiến', value: formatNumber(gameState?.player?.combatPower || 18267), icon: Sword, color: 'text-red-400' },
    { label: 'HP', value: formatNumber(4468), icon: Heart, color: 'text-green-400' },
    { label: 'S.Thương', value: formatNumber(1996), icon: Target, color: 'text-orange-400' },
    { label: 'Công', value: formatNumber(1587), icon: Sword, color: 'text-red-400' },
    { label: 'N.Nhẫn', value: formatNumber(1161), icon: Shield, color: 'text-blue-400' }
  ];

  const additionalStats = [
    { label: 'T.Luc', value: formatNumber(278), color: 'text-purple-400' },
    { label: 'Giáp', value: formatNumber(909), color: 'text-gray-400' },
    { label: 'Thủ', value: formatNumber(1541), color: 'text-blue-400' },
    { label: 'May', value: formatNumber(2033), color: 'text-yellow-400' }
  ];

  const guildInfo = {
    name: "Guild Name",
    level: 25,
    position: "Thành Viên"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-amber-900/30 p-4">
      {/* Main character panel */}
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 border-2 border-amber-600/50 backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-700/60 to-orange-700/60 px-6 py-3 border-b border-amber-600/30">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-100 flex items-center gap-2">
                <User className="w-6 h-6" />
                Cá Nhân
              </h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-amber-600/20 border-amber-500/50 text-amber-100 hover:bg-amber-600/30">
                  <Gift className="w-4 h-4 mr-1" />
                  Kết Hôn
                </Button>
                <Button size="sm" variant="outline" className="bg-green-600/20 border-green-500/50 text-green-100 hover:bg-green-600/30">
                  <Calendar className="w-4 h-4 mr-1" />
                  Pet
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left side - Equipment slots */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-100 mb-4">Trang Bị Trái</h3>
                <div className="grid grid-cols-2 gap-3">
                  {equipmentSlots.left.map((slot) => (
                    <div key={slot.id} className="group">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-700/30 to-amber-800/30 border-2 border-amber-600/50 rounded-lg flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer">
                        <slot.icon className="w-8 h-8 text-amber-300 group-hover:text-amber-200" />
                      </div>
                      <p className="text-xs text-amber-200 text-center mt-1">{slot.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center - Character avatar and basic info */}
              <div className="flex flex-col items-center space-y-4">
                {/* Character Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-amber-300 flex items-center justify-center relative overflow-hidden">
                    {/* Character representation */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    {/* Level indicator */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-600 rounded-full px-3 py-1 border-2 border-amber-300">
                      <span className="text-sm font-bold text-white">Lv.{gameState?.player?.level || 1}</span>
                    </div>
                  </div>
                </div>

                {/* Player Name and Title */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-amber-100">{gameState?.player?.name || 'Tu Tiên Giả'}</h3>
                  <Badge className="bg-mystical-purple/20 border-mystical-purple/50 text-mystical-purple mt-2">
                    <Crown className="w-3 h-3 mr-1" />
                    VIP {gameState?.player?.vipLevel || 0}
                  </Badge>
                </div>

                {/* Experience Bar */}
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-amber-200">EXP</span>
                    <span className="text-amber-200">
                      {gameState?.player?.exp || 33962}/{gameState?.player?.maxExp || 75174} (45%)
                    </span>
                  </div>
                  <Progress 
                    value={gameState?.player ? (gameState.player.exp / gameState.player.maxExp) * 100 : 45} 
                    className="h-3 bg-amber-900/50"
                  />
                </div>

                {/* Guild Info */}
                <div className="bg-gradient-to-r from-blue-800/30 to-blue-900/30 border border-blue-600/50 rounded-lg p-3 w-full max-w-xs">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">Guild</span>
                    </div>
                    <Badge className="bg-blue-600/20 text-blue-200 text-xs">
                      {guildInfo.level}
                    </Badge>
                  </div>
                  <p className="text-blue-100 font-medium mt-1">{guildInfo.name}</p>
                  <p className="text-blue-300 text-xs">{guildInfo.position}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-blue-300">Hoạt Động</span>
                      <span className="text-green-400">68%</span>
                    </div>
                    <Progress value={68} className="h-2 bg-blue-900/50" />
                  </div>
                </div>
              </div>

              {/* Right side - Equipment slots */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-100 mb-4">Trang Bị Phải</h3>
                <div className="grid grid-cols-2 gap-3">
                  {equipmentSlots.right.map((slot) => (
                    <div key={slot.id} className="group">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-700/30 to-amber-800/30 border-2 border-amber-600/50 rounded-lg flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer">
                        <slot.icon className="w-8 h-8 text-amber-300 group-hover:text-amber-200" />
                      </div>
                      <p className="text-xs text-amber-200 text-center mt-1">{slot.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Stats */}
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-600/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Chỉ Số Chính
                </h4>
                <div className="space-y-3">
                  {playerStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-gray-200">{stat.label}</span>
                      </div>
                      <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Stats */}
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-600/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Chỉ Số Phụ
                </h4>
                <div className="space-y-3">
                  {additionalStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-gray-200">{stat.label}</span>
                      <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CharacterLayout;
