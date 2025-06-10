
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

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
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

      {/* Character avatars in background - left side */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-30">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-500/40 flex items-center justify-center mb-8">
          <User className="w-16 h-16 text-blue-300" />
        </div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center">
          <Zap className="w-12 h-12 text-purple-300" />
        </div>
      </div>

      {/* Character avatars in background - right side */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30">
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-red-500/40 to-orange-500/40 flex items-center justify-center mb-6">
          <Sword className="w-14 h-14 text-red-300" />
        </div>
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500/30 to-blue-500/30 flex items-center justify-center">
          <Shield className="w-16 h-16 text-green-300" />
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Compact creation form */}
        <Card className="w-full max-w-md bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-sm border border-amber-500/30 p-6 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
              Tạo Nhân Vật
            </h1>
            <p className="text-sm text-amber-200/80">
              Nhập thông tin để bắt đầu
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Character Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-400 font-medium">Tên nhân vật:</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nhập tên..." 
                        {...field}
                        className="bg-black/40 border-amber-500/30 text-white placeholder:text-gray-400 h-10"
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
                    <FormLabel className="text-amber-400 font-medium">Giới tính</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="text-white cursor-pointer">♂ Nam</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="text-white cursor-pointer">♀ Nữ</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Class Selection - Simple dropdown style */}
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-400 font-medium">Lớp nhân vật:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sword" id="sword" />
                          <Label htmlFor="sword" className="text-white cursor-pointer flex items-center">
                            <Sword className="w-4 h-4 mr-2 text-red-400" />
                            Kiếm Khách
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="magic" id="magic" />
                          <Label htmlFor="magic" className="text-white cursor-pointer flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-purple-400" />
                            Pháp Sư
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="defense" id="defense" />
                          <Label htmlFor="defense" className="text-white cursor-pointer flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-blue-400" />
                            Hộ Vệ
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg"
                >
                  Tạo Nhân Vật
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
