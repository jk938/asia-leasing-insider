# Asia Leasing Insider - 数据抓取系统

## 免费数据源方案

### 1. RSS订阅源
```xml
<!-- 可用的RSS订阅源 -->
- 金融时报中文网: https://www.ftchinese.com/rss/news
- 华尔街日报中文: https://cn.wsj.com/rss/
- 彭博中文: https://feeds.bloomberg.com/markets/news.rss
- 路透中文: https://www.reutersagency.com/feed/?best-topics=business-finance
```

### 2. 免费API
```javascript
// NewsAPI - 免费层每月100次请求
// https://newsapi.org/
const NEWS_API_KEY = 'YOUR_KEY';

// Guardian API - 完全免费
// https://open-platform.theguardian.com/
const GUARDIAN_API = 'https://content.guardianapis.com/search';

// Hacker News API - 获取金融科技热点
// https://github.com/HackerNews/API
const HN_API = 'https://hacker-news.firebaseio.com/v0/';
```

### 3. Google Alerts RSS
```
// 创建Google Alert后获取RSS地址
https://www.google.com/alerts/feeds/YOUR_ALERT_ID
```

### 4. 数据抓取脚本
```javascript
// fetcher.js - 主抓取脚本
const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();

// 数据源配置
const SOURCES = [
  { name: 'ft', url: 'https://www.ftchinese.com/rss/news', keywords: ['租赁', '融资', 'leasing'] },
  { name: 'reuters', url: 'https://www.reutersagency.com/feed/?best-topics=business-finance', keywords: ['leasing', 'finance', 'Asia'] },
  { name: 'bloomberg', url: 'https://feeds.bloomberg.com/markets/news.rss', keywords: ['leasing', 'equipment'] }
];

async function fetchNews() {
  const articles = [];
  
  for (const source of SOURCES) {
    try {
      const feed = await parser.parseURL(source.url);
      const filtered = feed.items
        .filter(item => source.keywords.some(k => 
          (item.title + item.content).toLowerCase().includes(k.toLowerCase())
        ))
        .slice(0, 5)
        .map(item => ({
          title: item.title,
          content: item.contentSnippet || item.content,
          link: item.link,
          date: item.pubDate || item.isoDate,
          source: source.name
        }));
      articles.push(...filtered);
    } catch (err) {
      console.error(`Error fetching ${source.name}:`, err.message);
    }
  }
  
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

module.exports = { fetchNews };
```

### 5. GitHub Actions 自动抓取
```yaml
# .github/workflows/fetch-news.yml
name: Daily News Fetch
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 0点 (北京时间8点)
  workflow_dispatch:

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install axios rss-parser
      - name: Fetch News
        run: node fetcher.js
        env:
          NEWS_API_KEY: ${{ secrets.NEWS_API_KEY }}
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "Auto-update: Fetch latest news"
```

### 6. 图片获取方案
```javascript
// 图片来源
const IMAGE_SOURCES = [
  // Unsplash API - 免费商用
  'https://api.unsplash.com/photos/random?query=finance,building&client_id=YOUR_KEY',
  // Pexels - 免费商用
  'https://api.pexels.com/v1/search?query=business',
  // Coverr - 免费商用
  'https://api.coverr.co/videos'
];

// 图片关键词映射
const IMAGE_KEYWORDS = {
  '周报': ['business meeting', 'office'],
  '分析': ['chart', 'analytics', 'graph'],
  '案例': ['handshake', 'deal', 'meeting'],
  '监管': ['building', 'government', 'law']
};

function getImageForCategory(category) {
  const keywords = IMAGE_KEYWORDS[category] || ['business'];
  return `https://source.unsplash.com/800x600/?${keywords.join(',')}`;
  // 注: source.unsplash.com 已停止服务,需使用新方案
}
```

### 7. 最低成本技术栈

| 组件 | 免费方案 | 成本 |
|------|----------|------|
| 网站托管 | Vercel / Cloudflare Pages | $0 |
| 内容存储 | GitHub仓库 | $0 |
| 数据抓取 | GitHub Actions | $0 |
| 图片托管 | Unsplash / Pexels CDN | $0 |
| 域名 | 阿里云/腾讯云首年 | ~$5 |
| SSL证书 | Let's Encrypt (自动) | $0 |
| 统计 | Vercel Analytics | $0 |

### 8. 后续扩展

#### 微信小程序
- 使用 TDesign 微信小程序组件库
- 可复用网站API接口
- 需要微信开发者账号

#### App同步
- 使用 React Native / Flutter
- 调用相同的后端API
- 可发布到 App Store / Play Store
