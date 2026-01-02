import { Mic, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord: () => void;
  onSelectUpload: () => void;
}

const CreateDrawer = ({ 
  isOpen, 
  onClose, 
  onSelectRecord, 
  onSelectUpload 
}: CreateDrawerProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "glass-modal rounded-t-super",
        "animate-slide-up"
      )}>
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        {/* Title */}
        <div className="text-center pb-4">
          <h3 className="text-lg font-bold text-foreground font-display">
            创作你的声音 ✨
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            选择一种方式开始
          </p>
        </div>
        
        {/* Options */}
        <div className="flex gap-4 px-6 pb-8">
          {/* Record option */}
          <button
            onClick={onSelectRecord}
            className={cn(
              "flex-1 flex flex-col items-center gap-3 p-6",
              "glass-card-hover rounded-3xl",
              "transition-all duration-300",
              "hover:scale-[1.02] active:scale-95"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-candy-coral to-candy-orange",
              "shadow-lg shadow-candy-coral/30"
            )}>
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">录音</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                即兴创作
              </p>
            </div>
          </button>
          
          {/* Upload option */}
          <button
            onClick={onSelectUpload}
            className={cn(
              "flex-1 flex flex-col items-center gap-3 p-6",
              "glass-card-hover rounded-3xl",
              "transition-all duration-300",
              "hover:scale-[1.02] active:scale-95"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-candy-purple to-candy-pink",
              "shadow-lg shadow-candy-purple/30"
            )}>
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">上传</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                本地音频
              </p>
            </div>
          </button>
        </div>
        
        {/* Safe area */}
        <div className="h-6" />
      </div>
    </>
  );
};

export default CreateDrawer;
