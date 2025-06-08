
import { useState, useEffect } from 'react';

interface GameItem {
  id: number;
  name: string;
  description: string;
  type: string;
  rarity: string;
  icon: string;
  iconType: 'image';
  level: number;
}

interface ShopItem {
  item: GameItem;
  quantity: number;
  price: number; // Price in silver
}

interface Shop {
  id: number;
  name: string;
  category: string;
  items: ShopItem[];
  revenue: number;
  status: 'active' | 'inactive';
  lastUpdate: string;
}

// Global shops state
let globalShops: Shop[] = [
  { 
    id: 1, 
    name: 'Shop Vũ Khí', 
    category: 'weapon', 
    items: [
      {
        item: {
          id: 1,
          name: 'Kiếm Thần Long',
          description: 'Thanh kiếm huyền thoại với sức mạnh của rồng thần',
          type: 'weapon',
          rarity: 'legendary',
          icon: '/images/items/sword_dragon.png',
          iconType: 'image',
          level: 50
        },
        quantity: 10,
        price: 50000
      }
    ], 
    revenue: 2500000, 
    status: 'active', 
    lastUpdate: '2024-06-08' 
  },
  { 
    id: 2, 
    name: 'Shop Trang Phục', 
    category: 'armor', 
    items: [
      {
        item: {
          id: 2,
          name: 'Giáp Thiên Long',
          description: 'Bộ giáp được rèn từ vảy rồng thiêng',
          type: 'armor',
          rarity: 'epic',
          icon: '/images/items/armor_dragon.png',
          iconType: 'image',
          level: 45
        },
        quantity: 5,
        price: 30000
      }
    ], 
    revenue: 1800000, 
    status: 'active', 
    lastUpdate: '2024-06-07' 
  },
  { 
    id: 3, 
    name: 'Shop Thú Cưng', 
    category: 'pet', 
    items: [
      {
        item: {
          id: 3,
          name: 'Thú Cưng Mèo Linh',
          description: 'Chú mèo linh thiêng có thể hỗ trợ chiến đấu',
          type: 'pet',
          rarity: 'rare',
          icon: '/images/items/pet_cat.png',
          iconType: 'image',
          level: 25
        },
        quantity: 3,
        price: 15000
      }
    ], 
    revenue: 500000, 
    status: 'active', 
    lastUpdate: '2024-06-08' 
  }
];

const listeners: Set<() => void> = new Set();

export const useShopData = () => {
  const [shops, setShops] = useState<Shop[]>(globalShops);

  useEffect(() => {
    const listener = () => setShops([...globalShops]);
    listeners.add(listener);
    
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateShops = (newShops: Shop[]) => {
    globalShops = newShops;
    listeners.forEach(listener => listener());
  };

  const addShop = (shop: Shop) => {
    globalShops = [...globalShops, shop];
    listeners.forEach(listener => listener());
  };

  const getActiveShops = () => {
    return globalShops.filter(shop => shop.status === 'active');
  };

  return {
    shops,
    activeShops: getActiveShops(),
    updateShops,
    addShop
  };
};

export type { Shop, ShopItem, GameItem };
