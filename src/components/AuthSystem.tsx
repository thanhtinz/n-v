
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
});

interface AuthSystemProps {
  onAuthSuccess?: () => void;
}

const AuthSystem = ({ onAuthSuccess }: AuthSystemProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate auth process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email/password combination works
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('userEmail', values.email);
      
      toast({
        title: isLogin ? 'Đăng nhập thành công' : 'Đăng ký thành công',
        description: `Chào mừng ${values.email}!`
      });

      // Call the success callback if provided
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra, vui lòng thử lại',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-card/90 backdrop-blur-sm border-border/50">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-cultivator-gold to-spirit-jade rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cultivator-gold via-spirit-jade to-mystical-purple bg-clip-text text-transparent">
              {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
            </span>
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Đăng nhập để tiếp tục hành trình tu tiên' : 'Tạo tài khoản mới để bắt đầu'}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Nhập email của bạn" 
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cultivator-gold to-spirit-jade hover:from-cultivator-gold/80 hover:to-spirit-jade/80"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-cultivator-gold hover:text-cultivator-gold/80"
          >
            {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
          </Button>
        </div>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          <p>Demo: Bất kỳ email/mật khẩu nào cũng hoạt động</p>
        </div>
      </Card>
    </div>
  );
};

export default AuthSystem;
