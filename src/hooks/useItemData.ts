import { useState } from 'react';

export interface GameItem {
  id: number;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material' | 'pet' | 'plant' | 'event' | 'food';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  iconType: 'image';
  level: number;
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    mp?: number;
    speed?: number;
    luck?: number;
  };
  effects?: string[];
}

export const useItemData = () => {
  const [items] = useState<GameItem[]>([
    {
      id: 1,
      name: 'Kiếm Thần Long',
      description: 'Thanh kiếm huyền thoại với sức mạnh của rồng thần',
      type: 'weapon',
      rarity: 'legendary',
      icon: '/images/items/sword_dragon.png',
      iconType: 'image',
      level: 50,
      stats: { attack: 500, speed: 20 },
      effects: ['Hỏa Long Kiếm', 'Tăng 10% sát thương chí mạng']
    },
    {
      id: 2,
      name: 'Giáp Thiên Long',
      description: 'Bộ giáp được rèn từ vảy rồng thiêng',
      type: 'armor',
      rarity: 'epic',
      icon: '/images/items/armor_dragon.png',
      iconType: 'image',
      level: 45,
      stats: { defense: 300, hp: 1000 },
      effects: ['Phản đòn 5%', 'Giảm sát thương 15%']
    },
    {
      id: 3,
      name: 'Thú Cưng Mèo Linh',
      description: 'Chú mèo linh thiêng có thể hỗ trợ chiến đấu',
      type: 'pet',
      rarity: 'rare',
      icon: '/images/items/pet_cat.png',
      iconType: 'image',
      level: 25,
      stats: { luck: 50, speed: 30 },
      effects: ['Tăng may mắn', 'Tự động thu thập vật phẩm']
    },
    {
      id: 4,
      name: 'Cây Linh Chi Thiên Niên',
      description: 'Cây linh chi quý hiếm mọc trong thiên niên',
      type: 'plant',
      rarity: 'legendary',
      icon: '/images/items/plant_tree_deciduous.png',
      iconType: 'image',
      level: 60,
      stats: { hp: 2000, mp: 1000 },
      effects: ['Hồi phục HP/MP theo thời gian', 'Tăng tốc độ tu luyện']
    },
    {
      id: 5,
      name: 'Quả Táo Thần Kỳ',
      description: 'Quả táo từ vườn thiên đường, có thể hồi phục toàn bộ HP',
      type: 'food',
      rarity: 'epic',
      icon: '/images/items/food_apple.png',
      iconType: 'image',
      level: 10,
      stats: { hp: 500 },
      effects: ['Hồi phục 100% HP', 'Tăng tạm thời phòng thủ']
    },
    {
      id: 6,
      name: 'Hoa Sen Bạch Ngọc',
      description: 'Hoa sen quý hiếm từ ao thiêng, dùng để luyện đan',
      type: 'material',
      rarity: 'rare',
      icon: '/images/items/material_flower.png',
      iconType: 'image',
      level: 30,
      stats: {},
      effects: ['Nguyên liệu luyện đan cấp cao', 'Tăng thành công luyện đan']
    },
    {
      id: 7,
      name: 'Rồng Mini Sự Kiện',
      description: 'Thú cưng đặc biệt từ sự kiện Tết Nguyên Đán',
      type: 'event',
      rarity: 'legendary',
      icon: '/images/items/event_gift.png',
      iconType: 'image',
      level: 1,
      stats: { luck: 100, attack: 50 },
      effects: ['Chỉ có trong sự kiện', 'Tăng EXP thu được']
    },
    {
      id: 8,
      name: 'Chuối Vàng Thiên Đường',
      description: 'Chuối từ thiên đường tăng EXP',
      type: 'food',
      rarity: 'rare',
      icon: '/images/items/food_banana.png',
      iconType: 'image',
      level: 5,
      stats: {},
      effects: ['Tăng EXP thu được 50%', 'Hiệu lực 1 giờ']
    },
    {
      id: 9,
      name: 'Chó Thần Canh Gác',
      description: 'Chú chó thần bảo vệ chủ nhân',
      type: 'pet',
      rarity: 'epic',
      icon: '/images/items/pet_dog.png',
      iconType: 'image',
      level: 35,
      stats: { defense: 25, attack: 15 },
      effects: ['Bảo vệ chủ nhân', 'Tăng phòng thủ']
    },
    {
      id: 10,
      name: 'Cây Dừa Linh Thần',
      description: 'Cây dừa từ đảo thiêng',
      type: 'plant',
      rarity: 'epic',
      icon: '/images/items/plant_tree_palm.png',
      iconType: 'image',
      level: 40,
      stats: { attack: 20, defense: 30 },
      effects: ['Tăng sức mạnh', 'Bảo vệ khỏi yếu tố môi trường']
    }
  ]);

  return { items };
};
