import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sword, Shield, Zap, User, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const formSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(20, 'Tên không được quá 20 ký tự'),
  gender: z.enum(['male', 'female']),
  class: z.enum(['sword', 'magic', 'defense'])
});

interface CharacterCreationProps {
  onComplete: (character: {
    name: string;
    gender: 'male' | 'female';
    class: 'sword' | 'magic' | 'defense';
  }) => void;
}

const CharacterCreation = ({ onComplete }: CharacterCreationProps) => {
  const isMobile = useIsMobile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: 'male',
      class: 'sword'
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

  const classes = [
    {
      id: 'sword',
      name: 'Kiếm Khách',
      description: 'Chuyên về võ thuật kiếm, tấn công nhanh và linh hoạt',
      icon: Sword,
      color: 'text-red-400 border-red-400',
      weapons: ['Kiếm', 'Đao']
    },
    {
      id: 'magic',
      name: 'Pháp Sư', 
      description: 'Sử dụng phép thuật và pháp bảo mạnh mẽ',
      icon: Zap,
      color: 'text-purple-400 border-purple-400',
      weapons: ['Trượng Pháp', 'Pháp Bảo']
    },
    {
      id: 'defense',
      name: 'Hộ Vệ',
      description: 'Chuyên về phòng thủ và bảo vệ đồng đội',
      icon: Shield,
      color: 'text-blue-400 border-blue-400',
      weapons: ['Khiên', 'Giáp']
    }
  ];

  const genders = [
    {
      id: 'male',
      name: 'Nam',
      icon: User,
      description: 'Trang phục nam tính, mạnh mẽ'
    },
    {
      id: 'female', 
      name: 'Nữ',
      icon: Users,
      description: 'Trang phục nữ tính, thanh lịch'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-black/90 to-black/95 text-white p-3 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className={`font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-1 sm:mb-2 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
          Tạo Nhân Vật Tu Tiên
        </h1>
        <p className={`text-amber-200/80 ${isMobile ? 'text-sm' : 'text-base'}`}>
          Chọn tên, giới tính và class để bắt đầu hành trình tu tiên
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {/* Character Name - mobile optimized */}
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`font-semibold text-amber-400 ${isMobile ? 'text-base' : 'text-lg'}`}>Tên Đạo Hiệu</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập tên nhân vật của bạn..." 
                      {...field}
                      className={`text-center bg-black/40 border-amber-500/30 text-white placeholder:text-gray-400 ${isMobile ? 'text-base h-10' : 'text-lg h-12'}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gender Selection - mobile optimized */}
          <div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`font-semibold text-amber-400 ${isMobile ? 'text-base' : 'text-lg'}`}>Giới Tính</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-2 sm:gap-4"
                    >
                      {genders.map((gender) => {
                        const Icon = gender.icon;
                        return (
                          <div key={gender.id}>
                            <RadioGroupItem
                              value={gender.id}
                              id={gender.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={gender.id}
                              className={`flex flex-col items-center justify-between rounded-lg border-2 border-amber-500/20 bg-black/40 hover:bg-amber-500/10 hover:border-amber-400/50 peer-data-[state=checked]:border-amber-400 peer-data-[state=checked]:bg-amber-400/20 cursor-pointer transition-all ${isMobile ? 'p-3 min-h-[100px]' : 'p-4 min-h-[120px]'}`}
                            >
                              <Icon className={`mb-2 sm:mb-3 text-amber-400 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                              <div className="text-center">
                                <div className={`font-semibold text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{gender.name}</div>
                                <div className={`text-gray-400 mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                  {gender.description}
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
          </div>

          {/* Class Selection - mobile optimized */}
          <div>
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`font-semibold text-amber-400 ${isMobile ? 'text-base' : 'text-lg'}`}>Lựa Chọn Class</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-2 sm:gap-4"
                    >
                      {classes.map((classOption) => {
                        const Icon = classOption.icon;
                        return (
                          <div key={classOption.id}>
                            <RadioGroupItem
                              value={classOption.id}
                              id={classOption.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={classOption.id}
                              className={`flex items-center justify-start rounded-lg border-2 border-amber-500/20 bg-black/40 hover:bg-amber-500/10 hover:border-amber-400/50 peer-data-[state=checked]:border-amber-400 peer-data-[state=checked]:bg-amber-400/20 cursor-pointer transition-all ${isMobile ? 'p-3' : 'p-4'}`}
                            >
                              <Icon className={`mr-3 sm:mr-4 flex-shrink-0 text-amber-400 ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`} />
                              <div className="flex-1 text-left">
                                <div className={`font-semibold text-white ${isMobile ? 'text-base' : 'text-lg'}`}>{classOption.name}</div>
                                <div className={`text-gray-400 mt-1 sm:mt-2 mb-2 sm:mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                  {classOption.description}
                                </div>
                                <Badge variant="outline" className={`border-amber-400/50 text-amber-300 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                                  Vũ khí: {classOption.weapons.join(', ')}
                                </Badge>
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
          </div>

          <div className="flex justify-center pt-4 sm:pt-6">
            <Button 
              type="submit" 
              size={isMobile ? "default" : "lg"}
              className={`bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-2xl ${isMobile ? 'px-8 py-2 text-base' : 'px-12 py-3 text-lg'}`}
            >
              Bắt Đầu Hành Trình Tu Tiên
              <Sword className={`ml-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CharacterCreation;
