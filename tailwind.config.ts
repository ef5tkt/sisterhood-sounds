import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // 品牌色
        sunset: {
          DEFAULT: "hsl(var(--sunset-orange))",
          deep: "hsl(var(--sunset-deep))",
        },
        lavender: {
          DEFAULT: "hsl(var(--lavender))",
          deep: "hsl(var(--lavender-deep))",
        },
        cream: "hsl(var(--cream))",
        // 糖果色
        candy: {
          coral: "hsl(var(--candy-coral))",
          orange: "hsl(var(--candy-orange))",
          pink: "hsl(var(--candy-pink))",
          mint: "hsl(var(--candy-mint))",
          purple: "hsl(var(--candy-purple))",
        },
        // NFT 金色
        nft: {
          gold: "hsl(var(--nft-gold))",
          glow: "hsl(var(--nft-glow))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "super": "2.5rem",
      },
      fontFamily: {
        sans: ["'Nunito'", "'Noto Sans SC'", "system-ui", "sans-serif"],
        display: ["'Poppins'", "'Nunito'", "sans-serif"],
        body: ["'Nunito'", "'Noto Sans SC'", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsla(30, 100%, 85%, 0.4)" },
          "50%": { boxShadow: "0 0 40px hsla(30, 100%, 85%, 0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // 新增：图标跳动
        "bounce-select": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        // 新增：按钮下压回弹
        "press-bounce": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.92)" },
          "100%": { transform: "scale(1)" },
        },
        // 新增：NFT 边框发光
        "nft-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 15px hsla(45, 100%, 60%, 0.5), 0 0 30px hsla(45, 100%, 60%, 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 25px hsla(45, 100%, 70%, 0.7), 0 0 50px hsla(45, 100%, 60%, 0.4)" 
          },
        },
        // 新增：音频波形
        "audio-wave": {
          "0%, 100%": { height: "20%" },
          "50%": { height: "100%" },
        },
        // 新增：流体背景
        "fluid-bg": {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        // 新增：滑入上
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        // 新增：滑出下
        "slide-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        // 新增：脉冲呼吸
        "pulse-breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.7" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
        },
        // 新增：旋转闪烁
        "spin-glow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-flow": "gradient-flow 15s ease infinite",
        ripple: "ripple 0.6s ease-out forwards",
        breathe: "breathe 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        // 新增动画
        "bounce-select": "bounce-select 0.3s ease-out",
        "press-bounce": "press-bounce 0.2s ease-out",
        "nft-glow": "nft-glow 2s ease-in-out infinite",
        "audio-wave": "audio-wave 1s ease-in-out infinite",
        "fluid-bg": "fluid-bg 20s ease infinite",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-breathe": "pulse-breathe 2s ease-in-out infinite",
        "spin-glow": "spin-glow 8s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
