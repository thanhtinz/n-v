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
    // Ensure all required properties are present
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
      description: 'Chuyên về vũ khí kiếm, tấn công nhanh và linh hoạt',
      icon: Sword,
      color: 'text-red-400 border-red-400',
      weapons: ['Kiếm']
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
      description: 'Chuyên về phòng thủ và bảo vệ',
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 bg-card/90 backdrop-blur-sm border-border/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-gold bg-clip-text text-transparent mb-2">
            Tạo Nhân Vật Tu Tiên
          </h1>
          <p className="text-muted-foreground">
            Hãy chọn tên, giới tính và class để bắt đầu hành trình tu tiên của bạn
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Character Name */}
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-cultivator-gold">Tên Đạo Hiệu</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nhập tên nhân vật của bạn..." 
                        {...field}
                        className="text-center text-lg"
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
                    <FormLabel className="text-lg font-semibold text-spirit-jade">Giới Tính</FormLabel>
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
                                className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-card/50 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                              >
                                <Icon className="w-8 h-8 mb-3" />
                                <div className="text-center">
                                  <div className="font-semibold">{gender.name}</div>
                                  <div className="text-sm text-muted-foreground mt-1">
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
                    <FormLabel className="text-lg font-semibold text-mystical-purple">Lựa Chọn Class</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
                                className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-card/50 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer min-h-[160px]"
                              >
                                <Icon className="w-12 h-12 mb-3" />
                                <div className="text-center">
                                  <div className="font-semibold text-lg">{classOption.name}</div>
                                  <div className="text-sm text-muted-foreground mt-2 mb-3">
                                    {classOption.description}
                                  </div>
                                  <Badge variant="outline" className={`text-xs ${classOption.color}`}>
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
              <Button type="submit" size="lg" className="px-12 py-3 text-lg">
                Bắt Đầu Hành Trình Tu Tiên
                <Sword className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CharacterCreation;
