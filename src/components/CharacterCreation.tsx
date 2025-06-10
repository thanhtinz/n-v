
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
    <div className="w-full bg-gradient-to-b from-black/90 to-black/95 text-white p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
          Tạo Nhân Vật Tu Tiên
        </h1>
        <p className="text-amber-200/80">
          Chọn tên, giới tính và class để bắt đầu hành trình tu tiên
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Character Name */}
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-amber-400">Tên Đạo Hiệu</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập tên nhân vật của bạn..." 
                      {...field}
                      className="text-center text-lg h-12 bg-black/40 border-amber-500/30 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gender Selection */}
          <div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-amber-400">Giới Tính</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
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
                              className="flex flex-col items-center justify-between rounded-lg border-2 border-amber-500/20 bg-black/40 p-4 hover:bg-amber-500/10 hover:border-amber-400/50 peer-data-[state=checked]:border-amber-400 peer-data-[state=checked]:bg-amber-400/20 cursor-pointer min-h-[120px] transition-all"
                            >
                              <Icon className="w-8 h-8 mb-3 text-amber-400" />
                              <div className="text-center">
                                <div className="font-semibold text-white">{gender.name}</div>
                                <div className="text-sm text-gray-400 mt-1">
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

          {/* Class Selection */}
          <div>
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-amber-400">Lựa Chọn Class</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-4"
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
                              className="flex items-center justify-start rounded-lg border-2 border-amber-500/20 bg-black/40 p-4 hover:bg-amber-500/10 hover:border-amber-400/50 peer-data-[state=checked]:border-amber-400 peer-data-[state=checked]:bg-amber-400/20 cursor-pointer transition-all"
                            >
                              <Icon className="w-12 h-12 mr-4 flex-shrink-0 text-amber-400" />
                              <div className="flex-1 text-left">
                                <div className="font-semibold text-lg text-white">{classOption.name}</div>
                                <div className="text-sm text-gray-400 mt-2 mb-3">
                                  {classOption.description}
                                </div>
                                <Badge variant="outline" className="text-xs border-amber-400/50 text-amber-300">
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

          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              size="lg" 
              className="px-12 py-3 text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-2xl"
            >
              Bắt Đầu Hành Trình Tu Tiên
              <Sword className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CharacterCreation;
