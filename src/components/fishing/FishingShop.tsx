
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fish, Anchor, Coins } from 'lucide-react';
import { useFishingData } from '@/hooks/useFishingData';

const FishingShop = () => {
  const { fishingState, baitData, buyBait } = useFishingData();

  return (
    <div className="space-y-4">
      {/* Current Resources */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Tài Nguyên Hiện Có</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded border">
            <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-yellow-600">{fishingState.fishCoins}</div>
            <div className="text-sm text-muted-foreground">Xu Cá</div>
          </div>
          <div className="text-center p-3 bg-pink-50 rounded border">
            <div className="text-2xl font-bold text-pink-600">{fishingState.pearls}</div>
            <div className="text-sm text-muted-foreground">Ngọc Trai</div>
          </div>
        </div>
      </Card>

      {/* Bait Shop */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Cửa Hàng Mồi Câu</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Mồi câu giúp tăng tỷ lệ thành công và cơ hội câu được cá hiếm
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {baitData.map(bait => (
            <Card key={bait.id} className="p-4 border-2">
              <div className="text-center mb-3">
                <Fish className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <h4 className="font-bold">{bait.name}</h4>
                <div className="text-2xl font-bold text-yellow-600 mt-2">
                  {bait.price} Xu
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Tăng tỷ lệ thành công:</span>
                  <span className="text-green-500">+{bait.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tăng cơ hội cá hiếm:</span>
                  <span className="text-blue-500">+{bait.rareFishBonus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Thời gian sử dụng:</span>
                  <span className="text-purple-500">{bait.duration} lần câu</span>
                </div>
              </div>

              <Button
                onClick={() => buyBait(bait.id)}
                disabled={fishingState.fishCoins < bait.price}
                className="w-full"
              >
                {fishingState.fishCoins < bait.price ? 'Không Đủ Xu' : 'Mua Mồi'}
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Current Bait */}
      {fishingState.currentBait && (
        <Card className="p-4 bg-green-50">
          <h3 className="font-bold mb-3 text-green-800">Mồi Đang Sử Dụng</h3>
          {(() => {
            const currentBait = baitData.find(b => b.id === fishingState.currentBait);
            return currentBait ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Fish className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">{currentBait.name}</div>
                    <div className="text-sm text-green-600">
                      Còn lại: {fishingState.baitRemaining} lần
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-500">Đang Hoạt Động</Badge>
              </div>
            ) : null;
          })()}
        </Card>
      )}

      {/* Special Offers */}
      <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <h3 className="font-bold mb-3 text-purple-800">Ưu Đãi Đặc Biệt</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded border">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Combo Mồi Câu</div>
                <div className="text-sm text-muted-foreground">
                  1x Mồi Đặc Biệt + 2x Mồi Cá Nhỏ
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-500 line-through">200 Xu</div>
                <div className="text-xl font-bold text-green-600">150 Xu</div>
              </div>
            </div>
            <Button className="w-full mt-2" disabled>
              Sắp Ra Mắt
            </Button>
          </div>

          <div className="p-3 bg-white rounded border">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Gói Khởi Đầu</div>
                <div className="text-sm text-muted-foreground">
                  500 Xu Cá + 5 Ngọc Trai + Mồi Đặc Biệt
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">50 VND</div>
              </div>
            </div>
            <Button className="w-full mt-2" disabled>
              Sắp Ra Mắt
            </Button>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-blue-50">
        <h3 className="font-bold mb-2 text-blue-800">Mẹo Mua Sắm</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Mồi tốt hơn = cơ hội cá hiếm cao hơn</li>
          <li>• Mua mồi trước khi ra khơi để tối ưu hiệu quả</li>
          <li>• Theo dõi ưu đãi để tiết kiệm xu cá</li>
          <li>• Mồi đặc biệt phù hợp cho các đảo cấp cao</li>
        </ul>
      </Card>
    </div>
  );
};

export default FishingShop;
