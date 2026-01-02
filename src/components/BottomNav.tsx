import { useNavigate, useLocation } from "react-router-dom";
import { Home, Compass, Bell, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "首页", path: "/home" },
  { id: "discover", icon: Compass, label: "发现", path: "/relay" },
  { id: "create", icon: Plus, label: "创作", path: "/create" },
  { id: "notifications", icon: Bell, label: "消息", path: "/notifications" },
  { id: "profile", icon: User, label: "我的", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: NavItem) => {
    navigate(item.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav-bottom safe-area-bottom">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isCreate = item.id === "create";
          
          if (isCreate) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="relative -mt-6 group"
              >
                {/* 外层发光圈 */}
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-150 group-hover:scale-[1.8] transition-transform duration-300" />
                
                {/* 主按钮 */}
                <div className={cn(
                  "relative w-14 h-14 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br from-candy-coral to-candy-orange",
                  "shadow-lg shadow-primary/30",
                  "transition-all duration-300",
                  "hover:scale-110 hover:shadow-xl hover:shadow-primary/40",
                  "active:scale-95"
                )}>
                  <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-2xl",
                "transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive && "bg-primary/15 animate-bounce-select"
              )}>
                <item.icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive ? "fill-primary/20" : ""
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={cn(
                "text-xs mt-0.5 font-medium transition-all duration-300",
                isActive ? "font-bold" : ""
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
