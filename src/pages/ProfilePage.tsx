import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Wallet, Coins, Image, Settings, Share2, 
  Copy, ExternalLink, Play, Heart, MoreHorizontal,
  Pencil, Trash2, X, Camera, LogOut, MessageCircle, Bookmark,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// 余额类型
const balances = [
  { id: "somate", name: "SoMate", amount: 2847.5, icon: "💜" },
  { id: "eth", name: "ETH", amount: 0.156, icon: "⟠" },
  { id: "sepolia", name: "SepoliaETH", amount: 1.25, icon: "🔷" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"nfts" | "collected">("nfts");
  const [nfts, setNfts] = useState(mockNFTs);
  
  // 编辑状态
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [nickname, setNickname] = useState("温柔的声音");
  const [bio, setBio] = useState("用声音记录生活，用温暖治愈彼此");
  const [editNickname, setEditNickname] = useState(nickname);
  const [editBio, setEditBio] = useState(bio);
  const [avatarSeed, setAvatarSeed] = useState("myprofile");

  // Mock 数据
  const walletAddress = "0x7F4e8B2c9D1a3E5f6A8b0C2d4E6f8A1b3C5d7E9F";
  const totalComments = 156;
  const totalLikes = 892;
  const totalCollects = 234;

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

  const handleDisconnect = () => {
    toast("确定要断开钱包连接吗？", {
      action: {
        label: "确认断开",
        onClick: () => {
          toast.success("钱包已断开");
          navigate("/");
        },
      },
    });
  };

  const handleSaveProfile = () => {
    setNickname(editNickname);
    setBio(editBio);
    setIsEditDialogOpen(false);
    toast.success("资料已更新 ✨");
  };

  const handleChangeAvatar = () => {
    // 模拟更换头像
    const seeds = ["moon", "star", "flower", "heart", "sun", "cloud", "rainbow"];
    const newSeed = seeds[Math.floor(Math.random() * seeds.length)];
    setAvatarSeed(newSeed);
    toast.success("头像已更新");
  };

  const handleDeleteNFT = (id: string, title: string) => {
    toast(`确定要删除「${title}」吗？`, {
      description: "删除后将无法恢复",
      action: {
        label: "确认删除",
        onClick: () => {
          setNfts((prev) => prev.filter((nft) => nft.id !== id));
          toast.success("作品已删除");
        },
      },
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
          <button 
            onClick={() => setIsEditDialogOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl
                     bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground
                     transition-all duration-300"
          >
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
            <div className="relative group">
              <img
                src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${avatarSeed}`}
                alt="头像"
                className="w-20 h-20 rounded-2xl ring-4 ring-primary/20"
              />
              <button
                onClick={handleChangeAvatar}
                className="absolute inset-0 rounded-2xl bg-foreground/50 opacity-0 group-hover:opacity-100
                         flex items-center justify-center transition-opacity duration-300"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full 
                            border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-display font-semibold text-foreground">
                  {nickname}
                </h2>
                <button
                  onClick={() => setIsEditDialogOpen(true)}
                  className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground 
                           hover:text-foreground transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {bio}
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
                <button
                  onClick={handleDisconnect}
                  className="w-8 h-8 rounded-lg bg-destructive/10 hover:bg-destructive/20 
                           flex items-center justify-center text-destructive
                           transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 多币种余额 */}
          <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
            <p className="text-xs text-muted-foreground mb-3">余额</p>
            <div className="space-y-3">
              {balances.map((balance) => (
                <div key={balance.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{balance.icon}</span>
                    <span className="text-sm text-muted-foreground">{balance.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {balance.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-4 h-9 rounded-xl border-primary/30 text-foreground hover:bg-primary/10"
            >
              <Coins className="w-4 h-4 mr-2" />
              兑换
            </Button>
          </div>
        </div>

        {/* 互动数据统计 - 点击跳转通知页 */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <button
            onClick={() => navigate("/notifications?tab=comments")}
            className="glass-card rounded-2xl p-4 text-center hover:bg-secondary/30 transition-colors group"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageCircle className="w-4 h-4 text-primary" />
              <p className="text-xl font-bold text-foreground">{totalComments}</p>
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              收到的评论
            </p>
          </button>
          <button
            onClick={() => navigate("/notifications?tab=likes")}
            className="glass-card rounded-2xl p-4 text-center hover:bg-secondary/30 transition-colors group"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart className="w-4 h-4 text-primary" />
              <p className="text-xl font-bold text-foreground">{totalLikes}</p>
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              收到的爱心
            </p>
          </button>
          <button
            onClick={() => navigate("/notifications?tab=collects")}
            className="glass-card rounded-2xl p-4 text-center hover:bg-secondary/30 transition-colors group"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Bookmark className="w-4 h-4 text-primary" />
              <p className="text-xl font-bold text-foreground">{totalCollects}</p>
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              被收藏
            </p>
          </button>
        </div>

        {/* 查看全部通知入口 */}
        <button
          onClick={() => navigate("/notifications")}
          className="w-full glass-card rounded-2xl p-4 mb-6 flex items-center justify-between
                   hover:bg-secondary/30 transition-colors animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-sm text-foreground">查看全部通知</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

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
          {nfts.map((nft, index) => (
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
                              transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center
                                   shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-foreground ml-0.5" />
                  </button>
                </div>
                {/* NFT 编号标签 */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-foreground/70 
                              text-background text-xs font-mono">
                  #{nft.id.padStart(3, '0')}
                </div>
                {/* 更多操作按钮 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-foreground/70
                                     flex items-center justify-center opacity-0 group-hover:opacity-100
                                     transition-opacity duration-300 hover:bg-foreground/90">
                      <MoreHorizontal className="w-4 h-4 text-background" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="glass-card">
                    <DropdownMenuItem
                      onClick={() => handleDeleteNFT(nft.id, nft.title)}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除作品
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

      {/* 编辑资料弹窗 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="glass-card border-border/50 max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">编辑资料</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {/* 头像 */}
            <div className="flex justify-center">
              <div className="relative group">
                <img
                  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${avatarSeed}`}
                  alt="头像"
                  className="w-24 h-24 rounded-2xl ring-4 ring-primary/20"
                />
                <button
                  onClick={handleChangeAvatar}
                  className="absolute inset-0 rounded-2xl bg-foreground/50 opacity-0 group-hover:opacity-100
                           flex items-center justify-center transition-opacity duration-300"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground">点击头像更换</p>

            {/* 昵称 */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">昵称</label>
              <Input
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
                placeholder="输入你的昵称"
                className="bg-secondary/30 border-border/50 rounded-xl"
                maxLength={20}
              />
            </div>

            {/* 简介 */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">个人简介</label>
              <Textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="介绍一下自己吧"
                className="bg-secondary/30 border-border/50 rounded-xl resize-none"
                rows={3}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground text-right">{editBio.length}/100</p>
            </div>

            {/* 保存按钮 */}
            <Button
              onClick={handleSaveProfile}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              保存
            </Button>

            {/* 断开钱包 */}
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm text-destructive
                       hover:bg-destructive/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              断开钱包连接
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
