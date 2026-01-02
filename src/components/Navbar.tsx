import { Music, Plus, Search, Bell, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="relative glass-badge px-2 py-1.5">
            <Music className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            听她说
          </span>
        </Link>

        {/* 中间搜索栏 - 桌面端显示 */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索声音、创作者或话题..."
              className="glass-input w-full h-10 pl-10 pr-4 rounded-xl
                       text-sm text-foreground placeholder:text-muted-foreground
                       focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-3">
          {/* 接龙按钮 */}
          <button
            onClick={() => navigate("/relay")}
            className="hidden sm:flex items-center gap-1.5 h-10 px-3 rounded-xl
                     glass-button text-muted-foreground hover:text-foreground"
          >
            <Radio className="w-4 h-4" />
            <span className="text-sm">接龙</span>
          </button>

          {/* 创作按钮 */}
          <Button
            onClick={() => navigate("/create")}
            className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground 
                     rounded-xl font-medium shadow-md shadow-primary/20
                     hover:shadow-lg hover:shadow-primary/30 transition-all duration-300
                     glass-shine"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">创作</span>
          </Button>

          {/* 通知 */}
          <button 
            onClick={() => navigate("/notifications")}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl
                       glass-button text-muted-foreground hover:text-foreground"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </button>

          {/* 用户头像 */}
          <button 
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-xl overflow-hidden glass-avatar-ring
                       hover:scale-105 transition-all duration-300"
          >
            <img
              src="https://api.dicebear.com/7.x/lorelei/svg?seed=user"
              alt="用户头像"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
