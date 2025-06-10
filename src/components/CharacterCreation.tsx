
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sword, Shield, Zap, User, Flame } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const formSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(20, 'Tên không được quá 20 ký tự'),
  gender: z.enum(['male', 'female']),
  class: z.enum(['thien_kiem', 'anh_vu', 'thien_am', 'loi_tong', 'huyet_ma', 'van_mong', 'huyen_vu', 'xich_diem'])
});

interface CharacterCreationProps {
  onComplete: (character: {
    name: string;
    gender: 'male' | 'female';
    class: 'thien_kiem' | 'anh_vu' | 'thien_am' | 'loi_tong' | 'huyet_ma' | 'van_mong' | 'huyen_vu' | 'xich_diem';
  }) => void;
}

const CharacterCreation = ({ onComplete }: CharacterCreationProps) => {
  const isMobile = useIsMobile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: 'male',
      class: 'thien_kiem'
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.name && values.gender && values.class) {
      onComplete({
        name: values.name,
        gender: values.gender,
        class: values.class
      });
    }
  };

  const watchedGender = form.watch('gender');

  const characterClasses = [
    {
      id: 'thien_kiem',
      name: 'Thiên Kiếm',
      subtitle: 'Kiếm Tông',
      icon: '🔥',
      lucideIcon: Sword,
      weapon: 'Kiếm',
      role: 'Công kích cận chiến hoặc tầm xa, sát thương cao, tốc độ nhanh',
      style: 'Chính đạo, tu kiếm đạo',
      personality: 'Lạnh lùng, cô độc, trọng nghĩa khí',
      skills: 'Kiếm khí, kiếm trận, phi kiếm truy sát',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-400'
    },
    {
      id: 'anh_vu',
      name: 'Ảnh Vũ',
      subtitle: 'Ảnh Tông / Sát Ảnh',
      icon: '🌪️',
      lucideIcon: Sword,
      weapon: 'Song đao, móng vuốt, phi tiêu',
      role: 'Sát thủ, ám sát, né tránh cao',
      style: 'Tà đạo / trung lập',
      personality: 'Trầm mặc, nhanh nhẹn, lén lút',
      skills: 'Ẩn thân, bạo kích, độc tố',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400'
    },
    {
      id: 'thien_am',
      name: 'Thiên Âm',
      subtitle: 'Linh Tông / Y Tông',
      icon: '💎',
      lucideIcon: Shield,
      weapon: 'Cầm, sáo, quạt, ngọc',
      role: 'Hỗ trợ, buff, hồi máu, debuff kẻ thù',
      style: 'Chính đạo',
      personality: 'Hiền lành, uyển chuyển, từ bi',
      skills: 'Trị thương, tăng chỉ số, mê hoặc, ngủ',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400'
    },
    {
      id: 'loi_tong',
      name: 'Lôi Tông',
      subtitle: 'Lôi Điện Các',
      icon: '⚡',
      lucideIcon: Zap,
      weapon: 'Trượng, pháp bảo lôi',
      role: 'Pháp sư sát thương phép mạnh, diện rộng',
      style: 'Trung lập',
      personality: 'Nóng nảy, hiếu chiến',
      skills: 'Lôi đình, tốc biến, bạo nộ',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400'
    },
    {
      id: 'huyet_ma',
      name: 'Huyết Ma',
      subtitle: 'Tà Tông / Âm Linh',
      icon: '🌙',
      lucideIcon: Sword,
      weapon: 'Trảo, pháp trượng, huyết kiếm',
      role: 'Tà pháp, hút máu, khống chế tâm trí',
      style: 'Tà đạo',
      personality: 'Tàn độc, bí ẩn',
      skills: 'Tự hồi máu, triệu hồi ma vật, khống chế',
      color: 'text-red-600',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-600'
    },
    {
      id: 'van_mong',
      name: 'Vân Mộng',
      subtitle: 'Hoa Tông / Thảo Mộc',
      icon: '🌿',
      lucideIcon: Shield,
      weapon: 'Quạt, phiến, pháp trượng',
      role: 'Hỗ trợ, khống chế, độc dược',
      style: 'Trung lập',
      personality: 'Thanh tao, thông minh',
      skills: 'Hạ độc, gây ảo giác, hóa giải hiệu ứng',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400'
    },
    {
      id: 'huyen_vu',
      name: 'Huyền Vũ',
      subtitle: 'Kim Cang / Thiết Phái',
      icon: '🛡️',
      lucideIcon: Shield,
      weapon: 'Đại chùy, khiên, búa',
      role: 'Tanker, phòng thủ cao, khống chế cứng',
      style: 'Chính đạo',
      personality: 'Cương trực, trung thành',
      skills: 'Khiêu khích, hộ thuẫn, phản đòn',
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
      borderColor: 'border-gray-400'
    },
    {
      id: 'xich_diem',
      name: 'Xích Diệm',
      subtitle: 'Hỏa Tông / Diễm Phái',
      icon: '🔥',
      lucideIcon: Flame,
      weapon: 'Pháp khí lửa, hỏa đao',
      role: 'Sát thương phép mạnh, DPS dồn nhanh',
      style: 'Chính – Tà đều có',
      personality: 'Cuồng nhiệt, mạnh mẽ',
      skills: 'Thiêu đốt, bùng nổ, hiệu ứng cháy lan',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400'
    }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/3c625da2-63cb-4adf-8e0e-4e0a4a745db4.png')`
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Character Display Area */}
        <div className="flex flex-col items-center mb-8">
          {/* Character Avatar Display */}
          <div className="relative w-80 h-80 mb-6">
            {/* Character illustration based on gender */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                {/* Character base */}
                <div className="w-48 h-48 rounded-full bg-gradient-to-b from-amber-100/20 to-amber-200/20 backdrop-blur-sm border-2 border-amber-400/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-amber-400/40 to-orange-500/40 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                {/* Gender indicator */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    watchedGender === 'male' 
                      ? 'bg-blue-500 border-2 border-blue-300' 
                      : 'bg-pink-500 border-2 border-pink-300'
                  }`}>
                    <span className="text-white font-bold text-lg">
                      {watchedGender === 'male' ? '♂' : '♀'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Server name display */}
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
            <span className="text-amber-400 font-medium">源码屋</span>
          </div>
        </div>

        {/* Creation Form */}
        <Card className="w-full max-w-2xl bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm border border-amber-500/30 p-6 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Character Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-400 font-medium">Tên nhân vật</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nhập tên nhân vật..." 
                        {...field}
                        className="bg-black/40 border-amber-500/30 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Selection */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-400 font-medium">Chọn giới tính</FormLabel>
                    <FormControl>
                      <div className="flex justify-center space-x-8">
                        <div 
                          className={`cursor-pointer p-4 rounded-full transition-all ${
                            field.value === 'male' 
                              ? 'bg-blue-500/20 border-2 border-blue-400' 
                              : 'bg-gray-600/20 border-2 border-gray-500/30 hover:bg-blue-500/10'
                          }`}
                          onClick={() => field.onChange('male')}
                        >
                          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">♂</span>
                          </div>
                        </div>
                        <div 
                          className={`cursor-pointer p-4 rounded-full transition-all ${
                            field.value === 'female' 
                              ? 'bg-pink-500/20 border-2 border-pink-400' 
                              : 'bg-gray-600/20 border-2 border-gray-500/30 hover:bg-pink-500/10'
                          }`}
                          onClick={() => field.onChange('female')}
                        >
                          <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">♀</span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Class Selection */}
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-400 font-medium">Chọn môn phái</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4 mt-4"
                      >
                        {characterClasses.map((charClass) => {
                          const IconComponent = charClass.lucideIcon;
                          return (
                            <div key={charClass.id} className="relative">
                              <RadioGroupItem value={charClass.id} id={charClass.id} className="sr-only" />
                              <Label 
                                htmlFor={charClass.id} 
                                className={`cursor-pointer block p-4 rounded-lg border-2 transition-all ${
                                  field.value === charClass.id 
                                    ? `${charClass.bgColor} ${charClass.borderColor}` 
                                    : 'bg-black/20 border-gray-600/30 hover:bg-gray-800/30'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="flex flex-col items-center">
                                    <span className="text-2xl mb-1">{charClass.icon}</span>
                                    <IconComponent className={`w-6 h-6 ${charClass.color}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col">
                                      <span className={`font-bold text-sm ${charClass.color}`}>
                                        {charClass.name}
                                      </span>
                                      <span className="text-xs text-gray-400 mb-2">
                                        {charClass.subtitle}
                                      </span>
                                      <div className="text-xs text-gray-300 space-y-1">
                                        <div><span className="text-amber-400">Vũ khí:</span> {charClass.weapon}</div>
                                        <div><span className="text-amber-400">Vai trò:</span> {charClass.role}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Create Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 text-lg shadow-lg border-2 border-orange-400"
                  style={{
                    background: 'linear-gradient(45deg, #f97316, #f59e0b)',
                    borderRadius: '8px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  Tạo nhân vật
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CharacterCreation;
