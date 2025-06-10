
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

  const watchedGender = form.watch('gender');

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
        <Card className="w-full max-w-md bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm border border-amber-500/30 p-6 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Character Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-400 font-medium">角色名称</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="请输入角色名称..." 
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
                    <FormLabel className="text-amber-400 font-medium">选择性别</FormLabel>
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
                    <FormLabel className="text-amber-400 font-medium">职业选择</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="sword" id="sword" />
                          <Label htmlFor="sword" className="text-white cursor-pointer flex items-center">
                            <Sword className="w-5 h-5 mr-2 text-red-400" />
                            剑客 - 近战物理攻击
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="magic" id="magic" />
                          <Label htmlFor="magic" className="text-white cursor-pointer flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-purple-400" />
                            法师 - 远程魔法攻击
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="defense" id="defense" />
                          <Label htmlFor="defense" className="text-white cursor-pointer flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-blue-400" />
                            护卫 - 防御与支援
                          </Label>
                        </div>
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
                  创建角色
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
