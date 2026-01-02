import { cn } from "@/lib/utils";
import { Sparkles, BookOpen, Lightbulb, Rabbit, Users, Mic } from "lucide-react";

interface TagFilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTag: (tag: string) => void;
  onCreateClick: () => void;
  currentTag: string;
}

const tags = [
  { id: "冥想", label: "冥想", icon: Sparkles, color: "from-purple-400 to-purple-600" },
  { id: "故事", label: "故事", icon: BookOpen, color: "from-pink-400 to-rose-500" },
  { id: "想法", label: "想法", icon: Lightbulb, color: "from-amber-400 to-orange-500" },
  { id: "兔子洞", label: "兔子洞", icon: Rabbit, color: "from-emerald-400 to-teal-500" },
  { id: "共创", label: "共创", icon: Users, color: "from-blue-400 to-indigo-500" },
];

const TagFilterMenu = ({ isOpen, onClose, onSelectTag, onCreateClick, currentTag }: TagFilterMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* 标签菜单 */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-6 pb-10 safe-area-bottom animate-slide-up">
        <div className="glass-panel rounded-3xl p-6 shadow-2xl">
          {/* 标题 */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">
              想听什么？
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              选择一个分类，开始探索
            </p>
          </div>

          {/* 标签网格 */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <button
                key={tag.id}
                onClick={() => onSelectTag(tag.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300",
                  "hover:scale-105 active:scale-95",
                  currentTag === tag.id
                    ? "bg-gradient-to-br " + tag.color + " text-white shadow-lg"
                    : "glass-card-solid hover:bg-foreground/5"
                )}
              >
                <tag.icon className={cn(
                  "w-7 h-7 mb-2",
                  currentTag === tag.id ? "text-white" : "text-foreground/70"
                )} />
                <span className={cn(
                  "text-sm font-medium font-body",
                  currentTag === tag.id ? "text-white" : "text-foreground"
                )}>
                  {tag.label}
                </span>
              </button>
            ))}
          </div>

          {/* 第二行 */}
          <div className="grid grid-cols-2 gap-3">
            {tags.slice(3).map((tag) => (
              <button
                key={tag.id}
                onClick={() => onSelectTag(tag.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300",
                  "hover:scale-105 active:scale-95",
                  currentTag === tag.id
                    ? "bg-gradient-to-br " + tag.color + " text-white shadow-lg"
                    : "glass-card-solid hover:bg-foreground/5"
                )}
              >
                <tag.icon className={cn(
                  "w-7 h-7 mb-2",
                  currentTag === tag.id ? "text-white" : "text-foreground/70"
                )} />
                <span className={cn(
                  "text-sm font-medium font-body",
                  currentTag === tag.id ? "text-white" : "text-foreground"
                )}>
                  {tag.label}
                </span>
                {tag.id === "兔子洞" && (
                  <span className="text-xs text-muted-foreground/60 mt-0.5">全局随机</span>
                )}
                {tag.id === "共创" && (
                  <span className="text-xs text-muted-foreground/60 mt-0.5">接龙广场</span>
                )}
              </button>
            ))}
          </div>

          {/* 创作入口 */}
          <div className="mt-4 pt-4 border-t border-border/30">
            <button
              onClick={onCreateClick}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/80 to-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
            >
              <Mic className="w-6 h-6" />
              <span className="text-base font-semibold font-body">说一段话</span>
            </button>
          </div>

          {/* 关闭提示 */}
          <div className="text-center mt-4">
            <span className="text-xs text-muted-foreground/50 font-body">
              点击任意位置关闭
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagFilterMenu;
