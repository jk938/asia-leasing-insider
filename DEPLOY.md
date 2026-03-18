# Asia Leasing Insider 部署指南

## 快速部署 (Vercel)

### 步骤 1: 准备代码
将以下文件推送到 GitHub:
```
/
├── index.html
├── data/
│   └── articles.json
├── vercel.json
├── package.json
├── .github/
│   └── workflows/
│       └── fetch-news.yml
└── scripts/
    └── fetch-news.js
```

### 步骤 2: Vercel 部署
1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "New Project" 
3. 选择刚才推送的 GitHub 仓库
4. 配置:
   - Framework Preset: Other
   - Build Command: (留空)
   - Output Directory: (留空)
5. 点击 "Deploy"

### 步骤 3: 自定义域名 (可选)
1. 在 Vercel 项目设置中添加自定义域名
2. 在域名提供商处配置 CNAME 记录

---

## 数据自动更新

### GitHub Actions
自动抓取工作流已配置:
- 每天 UTC 0点 (北京时间 8点) 自动运行
- 也支持手动触发

### 手动更新
```bash
npm install
npm run fetch
```

---

## 图片方案

### 免费图片源
| 服务 | 说明 | 限制 |
|------|------|------|
| Pexels | 免费商用图片 | 无需API Key |
| Unsplash | 免费商用图片 | 需要API Key |
| Picsum | 随机图片 | 简单随机图 |

### 当前实现
使用 Picsum Photos 作为占位图:
```javascript
`https://picsum.photos/800/400?random=${Date.now()}`
```

### 升级方案
1. 注册 Pexels/Unsplash 开发者账号
2. 获取 API Key
3. 修改 `scripts/fetch-news.js` 使用真实图片

---

## 成本估算

| 项目 | 免费方案 | 付费方案 |
|------|----------|----------|
| 网站托管 | Vercel (免费) | Vercel Pro $20/月 |
| 域名 | 首年 ~$5 | 续费 ~$15/年 |
| CDN | Vercel 全球CDN | - |
| SSL | Let's Encrypt (自动) | - |
| 数据存储 | GitHub (无限) | - |
| 图片托管 | 第三方CDN | Cloudflare $0 |

**首年成本: ~$5**

---

## 微信小程序 / App 扩展

### 方案对比

| 方案 | 成本 | 开发周期 | 难度 |
|------|------|----------|------|
| 微信小程序 | $0 | 1-2周 | 中等 |
| H5 App | $0 | 1周 | 简单 |
| React Native | $0 | 2-3周 | 中等 |
| Flutter | $0 | 2-3周 | 中等 |

### 微信小程序架构
```
┌─────────────────────────────────┐
│         微信小程序              │
├─────────────────────────────────┤
│  pages/                         │
│    ├── index/ (首页)           │
│    ├── articles/ (文章列表)     │
│    └── article/ (文章详情)     │
├─────────────────────────────────┤
│  components/ (TDesign组件)     │
├─────────────────────────────────┤
│  services/                      │
│    └── api.js (调用网站API)     │
└─────────────────────────────────┘
```

### 技术栈
- **小程序**: 微信小程序 + TDesign
- **API**: 复用网站 JSON 数据
- **发布**: 微信开发者工具

### 数据同步
网站和小程序共用同一套 JSON 数据:
- 网站: `data/articles.json`
- 小程序: 可通过 Vercel API 或直接读取 JSON

---

## 扩展建议

### 内容扩展
1. 添加更多RSS订阅源
2. 接入 NewsAPI 获取更多新闻
3. 接入 Crunchbase 获取融资交易数据

### 功能扩展
1. 搜索功能
2. 邮件订阅
3. 用户评论
4. 数据可视化图表

### 变现方式
1. 广告位 (Google AdSense)
2. 付费订阅报告
3. 企业服务 (定制分析)
4. 活动票务
