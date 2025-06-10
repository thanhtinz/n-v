
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
import { useIsMobile } from '@/hooks/use-mobile';

const formSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(20, 'Tên không được quá 20 ký tự'),
  gender: z.enum(['male', 'female'])
});

interface CharacterCreationProps {
  onComplete: (character: {
    name: string;
    gender: 'male' | 'female';
  }) => void;
}

const CharacterCreation = ({ onComplete }: CharacterCreationProps) => {
  const isMobile = useIsMobile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: 'male'
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.name && values.gender) {
      onComplete({
        name: values.name,
        gender: values.gender
      });
    }
  };

  const watchedGender = form.watch('gender');

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-amber-300 mb-8 text-center">
          Tạo Nhân Vật
        </h1>

        {/* Character Selection Area */}
        <div className="relative mb-8">
          {/* Decorative corners */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-l-4 border-t-4 border-red-500"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-r-4 border-t-4 border-red-500"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-4 border-b-4 border-red-500"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-4 border-b-4 border-red-500"></div>

          <Card className="bg-gradient-to-b from-amber-900/80 to-amber-950/80 backdrop-blur-sm border-2 border-amber-600/50 p-8 rounded-2xl">
            {/* Character Display */}
            <div className="flex justify-center items-end gap-12 mb-8">
              {/* Male Character */}
              <div className={`flex flex-col items-center transition-all duration-300 ${watchedGender === 'male' ? 'scale-110' : 'scale-95 opacity-60'}`}>
                <div className="relative">
                  {/* Magic Circle Background */}
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-red-500/30 to-orange-500/30 animate-pulse">
                    <div className="w-full h-full rounded-full border-4 border-red-400/50 animate-spin-slow">
                      <div className="absolute inset-2 rounded-full border-2 border-red-300/30"></div>
                      <div className="absolute inset-4 rounded-full border border-red-200/20"></div>
                    </div>
                  </div>
                  
                  {/* Character Avatar */}
                  <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-b from-orange-400 to-red-500 flex items-center justify-center border-4 border-orange-300">
                    {/* Character representation */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-b from-orange-200 to-orange-400 flex items-center justify-center">
                      <div className="text-2xl">👨‍🦲</div>
                    </div>
                  </div>
                </div>
                
                {/* Wings/Weapon display */}
                <div className="mt-2">
                  <div className="w-16 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse"></div>
                </div>
              </div>

              {/* Female Character */}
              <div className={`flex flex-col items-center transition-all duration-300 ${watchedGender === 'female' ? 'scale-110' : 'scale-95 opacity-60'}`}>
                <div className="relative">
                  {/* Magic Circle Background */}
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 animate-pulse">
                    <div className="w-full h-full rounded-full border-4 border-purple-400/50 animate-spin-slow">
                      <div className="absolute inset-2 rounded-full border-2 border-purple-300/30"></div>
                      <div className="absolute inset-4 rounded-full border border-purple-200/20"></div>
                    </div>
                  </div>
                  
                  {/* Character Avatar */}
                  <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-b from-purple-400 to-blue-500 flex items-center justify-center border-4 border-purple-300">
                    {/* Character representation */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-b from-purple-200 to-purple-400 flex items-center justify-center">
                      <div className="text-2xl">👩</div>
                    </div>
                  </div>
                </div>
                
                {/* Wings/Weapon display */}
                <div className="mt-2">
                  <div className="w-16 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-80 animate-pulse"></div>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Gender Selection */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-center space-x-8">
                          <div 
                            className={`cursor-pointer p-3 rounded-full transition-all ${
                              field.value === 'male' 
                                ? 'bg-blue-500/30 border-2 border-blue-400' 
                                : 'bg-gray-600/20 border-2 border-gray-500/30 hover:bg-blue-500/10'
                            }`}
                            onClick={() => field.onChange('male')}
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white text-sm">♂</span>
                              </div>
                              <span className="text-orange-300 font-bold text-lg">Nam</span>
                            </div>
                          </div>
                          
                          <div 
                            className={`cursor-pointer p-3 rounded-full transition-all ${
                              field.value === 'female' 
                                ? 'bg-pink-500/30 border-2 border-pink-400' 
                                : 'bg-gray-600/20 border-2 border-gray-500/30 hover:bg-pink-500/10'
                            }`}
                            onClick={() => field.onChange('female')}
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                                <span className="text-white text-sm">♀</span>
                              </div>
                              <span className="text-orange-300 font-bold text-lg">Nữ</span>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-400 font-medium text-center block">Tên nhân vật</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Nhập tên nhân vật..." 
                          {...field}
                          className="bg-black/40 border-amber-500/30 text-white placeholder:text-gray-400 text-center"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Info Text */}
                <div className="text-center text-sm text-amber-200 bg-black/30 p-3 rounded-lg">
                  Sau khi tạo nhân vật, bạn sẽ trải qua hành trình tu luyện và được chọn tông môn phù hợp.
                </div>

                {/* Create Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-xl shadow-2xl border-2 border-green-500 rounded-xl"
                  >
                    Bắt Đầu Hành Trình
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CharacterCreation;
