# Modern Chat

## 描述
核心技术
- Vue
- TypeScript
- Electron
- Electron-Vite
- Element-Plus
- Tailwindcss

## 构建
1.Clone 
```shell
git clone https://github.com/luzilong2005/modern-chat.git
```

2.依次实行
```shell
pnpm run clean
pnpm run icon:build
pnpm run renderer:build
pnpm run electron:build:win:x64 # 选择合适的架构
```