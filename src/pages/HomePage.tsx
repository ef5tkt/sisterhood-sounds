import { useNavigate } from "react-router-dom";
import { Headphones, Mic, Sparkles } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

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
      
      {/* 噪点纹理 */}
      <div className="absolute inset-0 noise-texture opacity-30" />
      
      {/* 装饰性浮动元素 */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-candy-coral/30 blur-3xl animate-float" />
      <div className="absolute bottom-32 right-10 w-56 h-56 rounded-full bg-candy-lavender/40 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-candy-mint/30 blur-2xl animate-breathe" />
      <div className="absolute bottom-1/4 left-1/4 w-44 h-44 rounded-full bg-candy-peach/40 blur-3xl animate-glow-spread" />
      
      {/* 主内容区 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo 和标题 */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-candy-orange animate-pulse" />
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-candy-coral to-candy-orange flex items-center justify-center shadow-lg shadow-candy-coral/30">
                <Headphones className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 tracking-tight">
            Attention Please
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed font-body">
            让每一个声音，都被温柔听见
          </p>
        </div>

        {/* 两个核心按钮 */}
        <div className="flex flex-col gap-5 w-full max-w-xs animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {/* 听她说按钮 */}
          <button
            onClick={() => navigate("/listen")}
            className="group relative w-full h-16 rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* 渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-r from-candy-coral to-candy-orange" />
            
            {/* 悬停光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            
            {/* 内容 */}
            <div className="relative z-10 flex items-center justify-center gap-3 h-full">
              <Headphones className="w-6 h-6 text-white" strokeWidth={2.5} />
              <span className="text-xl font-display font-bold text-white tracking-wide">听她说</span>
            </div>
            
            {/* 底部阴影 */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent" />
          </button>

          {/* 说一段话按钮 */}
          <button
            onClick={() => navigate("/create")}
            className="group relative w-full h-16 rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 glass-card-solid border-2 border-foreground/10"
          >
            {/* 悬停光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-candy-lavender/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            
            {/* 内容 */}
            <div className="relative z-10 flex items-center justify-center gap-3 h-full">
              <Mic className="w-6 h-6 text-foreground" strokeWidth={2.5} />
              <span className="text-xl font-display font-bold text-foreground tracking-wide">说一段话</span>
            </div>
          </button>
        </div>

        {/* 底部装饰 */}
        <div className="absolute bottom-8 flex items-center gap-2 text-sm text-muted-foreground/60 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Sparkles className="w-4 h-4" />
          <span className="font-body">发现姐妹们的温暖故事</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
