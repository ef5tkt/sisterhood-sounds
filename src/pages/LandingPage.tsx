import { useState } from "react";
import { Wallet, Sparkles, Heart, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LandingPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const navigate = useNavigate();

  const handleConnectWallet = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 创建波纹效果
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    setIsConnecting(true);
    // 模拟钱包连接
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast.success("钱包连接成功", {
        description: "欢迎来到听她说社区 💜",
      });
    }, 1500);
  };

  const handleEnterCommunity = () => {
    if (inviteCode.trim().length < 4) {
      toast.error("请输入有效的邀请码");
      return;
    }
    toast.success("验证成功，正在进入社区...", {
      description: "愿你在这里找到温暖与共鸣",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 流动渐变背景 */}
      <div 
        className="absolute inset-0 flowing-gradient"
        style={{
          background: "linear-gradient(135deg, hsl(30 100% 88%) 0%, hsl(270 60% 90%) 25%, hsl(20 85% 85%) 50%, hsl(240 67% 94%) 75%, hsl(30 100% 88%) 100%)",
          backgroundSize: "400% 400%",
        }}
      />
      
      {/* 装饰性浮动元素 */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-secondary/40 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-accent/30 blur-2xl animate-breathe" />
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 rounded-full bg-lavender/40 blur-3xl animate-glow-spread" />
      
      {/* 主内容区 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo 和标题 */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative glass-card-glow p-4 rounded-2xl">
              <Music className="w-12 h-12 text-primary animate-breathe" />
              <Heart className="absolute -bottom-1 -right-1 w-5 h-5 text-accent fill-accent" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 tracking-tight">
            听她说
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            让每一个女性的声音，都被温柔听见
          </p>
        </div>

        {/* 功能亮点 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {[
            { icon: Music, text: "声音疗愈" },
            { icon: Heart, text: "姐妹社区" },
            { icon: Sparkles, text: "AI 配乐" },
          ].map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-5 py-2.5 glass-card-hover rounded-full text-sm text-foreground/80
                       hover:text-foreground cursor-default"
            >
              <item.icon className="w-4 h-4 text-accent" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* 钱包连接 / 邀请码输入 */}
        <div 
          className="w-full max-w-sm animate-fade-in-up" 
          style={{ animationDelay: "0.4s" }}
        >
          {!isConnected ? (
            <Button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="relative w-full h-16 text-lg font-medium glass-card-glow border-2 border-primary/30 
                         hover:border-primary/50 hover:bg-[var(--glass-bg-medium)] text-foreground rounded-2xl
                         transition-all duration-500 overflow-hidden group animate-glow-spread"
            >
              {/* 波纹效果 */}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute bg-primary/40 rounded-full animate-ripple pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 20,
                    height: 20,
                    marginLeft: -10,
                    marginTop: -10,
                  }}
                />
              ))}
              
              <span className="relative z-10 flex items-center gap-3">
                <Wallet className={`w-5 h-5 ${isConnecting ? "animate-spin" : ""}`} />
                {isConnecting ? "正在连接..." : "Connect Wallet"}
              </span>
              
              {/* 悬停光效 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="glass-card-solid rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>钱包已连接</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  0x7F4e...3a9B
                </p>
              </div>
              
              <div className="glass-card-solid rounded-2xl p-6">
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  输入邀请码，加入姐妹社区
                </p>
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="请输入邀请码"
                  className="glass-input h-12 text-center text-lg rounded-xl mb-4
                           focus:ring-2 focus:ring-primary/30"
                />
                <Button
                  onClick={handleEnterCommunity}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground 
                           font-medium rounded-xl transition-all duration-300
                           hover:shadow-lg hover:shadow-primary/30 glass-shine"
                >
                  进入社区
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 底部装饰文案 */}
        <p 
          className="absolute bottom-8 text-sm text-muted-foreground/60 animate-fade-in-up glass-badge"
          style={{ animationDelay: "0.6s" }}
        >
          ✨ 数据安全存储于 IPFS，由你完全掌控
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
