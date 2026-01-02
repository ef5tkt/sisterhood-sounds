import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Wallet, Coins, Image, Settings, Share2, 
  Copy, ExternalLink, Play, Heart, MoreHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock NFT 数据
const mockNFTs = [
  {
    id: "1",
    title: "晚安冥想 #001",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=nft1&backgroundColor=ffd8b1,e6e6fa",
    plays: 324,
    likes: 89,
  },
  {
    id: "2",
    title: "写给18岁的自己",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=nft2&backgroundColor=ffe4e1,e6e6fa",
    plays: 567,
    likes: 156,
  },
  {
    id: "3",
    title: "海子的诗",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=nft3&backgroundColor=ffefd5,e6e6fa",
    plays: 892,
    likes: 234,
  },
  {
    id: "4",
    title: "雨天的咖啡馆",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=nft4&backgroundColor=fff0f5,e6e6fa",
    plays: 123,
    likes: 45,
  },
  {
    id: "5",
    title: "清晨唤醒冥想",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=nft5&backgroundColor=f5f5dc,e6e6fa",
    plays: 678,
    likes: 189,
  },
  {
    id: "6",
    title: "林徽因 · 四月天",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=nft6&backgroundColor=fffacd,e6e6fa",
    plays: 456,
    likes: 123,
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"nfts" | "collected">("nfts");

  // Mock 数据
  const walletAddress = "0x7F4e8B2c9D1a3E5f6A8b0C2d4E6f8A1b3C5d7E9F";
  const somateBalance = 2847.5;
  const totalPlays = 3456;
  const totalLikes = 892;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("钱包地址已复制", {
      description: "可以分享给姐妹们啦 ✨",
    });
  };

  const handleShare = () => {
    toast.success("分享链接已复制", {
      description: "邀请更多姐妹加入社区",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* 头部导航 */}
      <header className="relative z-10 glass-card border-b border-border/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">我的主页</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl
                           bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground
                           transition-all duration-300">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="relative z-10 container mx-auto px-4 py-6">
        {/* 个人信息卡片 */}
        <div className="glass-card rounded-3xl p-6 mb-6 animate-fade-in-up">
          {/* 头像和基本信息 */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=myprofile"
                alt="头像"
                className="w-20 h-20 rounded-2xl ring-4 ring-primary/20"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full 
                            border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-display font-semibold text-foreground mb-1">
                温柔的声音
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                用声音记录生活，用温暖治愈彼此
              </p>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleShare}
                  size="sm"
                  className="h-8 px-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  分享主页
                </Button>
              </div>
            </div>
          </div>

          {/* 钱包地址 */}
          <div className="glass-card rounded-2xl p-4 mb-4 bg-secondary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">钱包地址</p>
                  <p className="font-mono text-sm text-foreground">{formatAddress(walletAddress)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="w-8 h-8 rounded-lg bg-secondary/50 hover:bg-secondary 
                           flex items-center justify-center text-muted-foreground hover:text-foreground
                           transition-all duration-300"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-lg bg-secondary/50 hover:bg-secondary 
                           flex items-center justify-center text-muted-foreground hover:text-foreground
                           transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Somate 余额 */}
          <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center animate-pulse-glow">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Somate 余额</p>
                  <p className="text-2xl font-bold text-foreground">{somateBalance.toLocaleString()}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-9 px-4 rounded-xl border-primary/30 text-foreground hover:bg-primary/10"
              >
                兑换
              </Button>
            </div>
          </div>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground mb-1">{totalPlays.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">总播放量</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground mb-1">{totalLikes.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">收到的爱心</p>
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="flex gap-2 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => setActiveTab("nfts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-300 ${
                        activeTab === "nfts"
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      }`}
          >
            <Image className="w-4 h-4" />
            我的作品
          </button>
          <button
            onClick={() => setActiveTab("collected")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-300 ${
                        activeTab === "collected"
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      }`}
          >
            <Heart className="w-4 h-4" />
            收藏的声音
          </button>
        </div>

        {/* NFT 墙 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {mockNFTs.map((nft, index) => (
            <div
              key={nft.id}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer
                       hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              {/* NFT 封面 */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={nft.cover}
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 flex items-center justify-center">
                  <button className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center
                                   shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-foreground ml-1" />
                  </button>
                </div>
                {/* NFT 编号标签 */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-foreground/70 
                              text-background text-xs font-mono">
                  #{nft.id.padStart(3, '0')}
                </div>
              </div>
              {/* NFT 信息 */}
              <div className="p-3">
                <h3 className="font-medium text-foreground text-sm mb-2 truncate">{nft.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    <span>{nft.plays}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{nft.likes}</span>
                  </div>
                  <button className="p-1 hover:bg-secondary rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <p className="text-center text-sm text-muted-foreground/60 mt-8">
          所有作品已永久存储于 IPFS ✨
        </p>
      </main>
    </div>
  );
};

export default ProfilePage;
