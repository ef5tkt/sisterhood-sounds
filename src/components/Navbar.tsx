import { Music, Plus, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="relative">
            <Music className="w-7 h-7 text-primary-foreground group-hover:scale-110 transition-transform" />
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
              className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-border/50 rounded-xl
                       text-sm text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
                       transition-all duration-300"
            />
          </div>
        </div>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-3">
          {/* 创作按钮 */}
          <Button
            onClick={() => navigate("/create")}
            className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground 
                     rounded-xl font-medium shadow-md shadow-primary/20
                     hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">创作</span>
          </Button>

          {/* 通知 */}
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl
                           bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground
                           transition-all duration-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
          </button>

          {/* 用户头像 */}
          <button className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20 
                           hover:ring-primary/40 transition-all duration-300">
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
