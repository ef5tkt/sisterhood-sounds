import { useState } from "react";
import { Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WalletGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// 简单的本地存储来模拟钱包状态
const WALLET_KEY = "wallet_connected";
const INVITE_KEY = "invite_verified";

export const isUserVerified = () => {
  return localStorage.getItem(WALLET_KEY) === "true" && localStorage.getItem(INVITE_KEY) === "true";
};

export const setUserVerified = () => {
  localStorage.setItem(WALLET_KEY, "true");
  localStorage.setItem(INVITE_KEY, "true");
};

const WalletGateModal = ({ isOpen, onClose, onSuccess }: WalletGateModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleConnectWallet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast.success("钱包连接成功", {
        description: "欢迎来到听她说社区 💜",
      });
    }, 1500);
  };

  const handleVerifyInvite = () => {
    if (inviteCode.trim().length < 4) {
      toast.error("请输入有效的邀请码");
      return;
    }
    setUserVerified();
    toast.success("验证成功！", {
      description: "你现在可以自由互动了 ✨",
    });
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* 模态框 */}
      <div className={cn(
        "relative z-10 w-full max-w-sm mx-4 animate-slide-up"
      )}>
        <div className="glass-card-solid rounded-3xl p-6 shadow-2xl">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card flex items-center justify-center transition-all hover:scale-105"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* 标题 */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-candy-coral to-candy-orange flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">
              加入姐妹社区
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              连接钱包并输入邀请码，解锁全部互动功能
            </p>
          </div>

          {/* 内容 */}
          {!isConnected ? (
            <Button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="relative w-full h-14 text-lg font-medium bg-gradient-to-r from-candy-coral to-candy-orange
                         text-white rounded-2xl transition-all duration-500 overflow-hidden group"
            >
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none"
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
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>钱包已连接</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  0x7F4e...3a9B
                </p>
              </div>
              
              <Input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="请输入邀请码"
                className="h-12 text-center text-lg rounded-xl border-2 border-border/50 focus:border-candy-coral/50"
              />
              
              <Button
                onClick={handleVerifyInvite}
                className="w-full h-12 bg-gradient-to-r from-candy-coral to-candy-orange text-white 
                         font-medium rounded-xl transition-all duration-300 hover:opacity-90"
              >
                验证并加入
              </Button>
            </div>
          )}

          {/* 提示 */}
          <p className="text-xs text-center text-muted-foreground/60 mt-4">
            没有邀请码？找一位姐妹帮你引荐吧 ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletGateModal;
