import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().email('请输入有效的邮箱地址');
const passwordSchema = z.string().min(6, '密码至少6个字符');

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // 已登录用户自动跳转
  useEffect(() => {
    if (user && !authLoading) {
      navigate(-1);
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('邮箱或密码错误');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('登录成功');
        navigate(-1);
      }
    } else {
      const { error } = await signUp(email, password, nickname || undefined);
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('该邮箱已注册，请直接登录');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('注册成功');
        navigate(-1);
      }
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 背景 */}
      <div 
        className="absolute inset-0 animate-fluid-bg opacity-30"
        style={{
          background: "linear-gradient(135deg, hsl(350 70% 85%) 0%, hsl(270 60% 88%) 25%, hsl(200 70% 85%) 50%, hsl(30 80% 88%) 75%, hsl(350 70% 85%) 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* 顶部导航 */}
      <div className="relative z-10 p-4 safe-area-top">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl glass-card-solid flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* 表单区域 */}
      <div className="relative z-10 px-6 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? '欢迎回来' : '加入我们'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? '登录以解锁更多功能' : '创建账户开始你的旅程'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="nickname">昵称（可选）</Label>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="给自己起个名字"
                className="h-12 rounded-xl bg-background/80"
                maxLength={20}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="your@email.com"
              className={`h-12 rounded-xl bg-background/80 ${errors.email ? 'border-destructive' : ''}`}
              maxLength={255}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                placeholder="至少6个字符"
                className={`h-12 rounded-xl bg-background/80 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                maxLength={100}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-base font-medium"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              isLogin ? '登录' : '注册'
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isLogin ? '还没有账户？' : '已有账户？'}
            <span className="text-primary ml-1 font-medium">
              {isLogin ? '注册' : '登录'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
