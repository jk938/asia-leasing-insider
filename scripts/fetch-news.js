/**
 * Asia Leasing Insider - News Fetcher
 * 自动抓取金融租赁行业新闻
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 图片关键词映射 - 根据分类获取合适的图片
const IMAGE_KEYWORDS = {
  'weekly': ['business meeting', 'skyscraper', 'finance'],
  'analysis': ['chart', 'analytics', 'data', 'graph'],
  'case': ['handshake', 'deal', 'office meeting'],
  'regulation': ['government building', 'law', 'courthouse']
};

// Unsplash免费图片API (使用source API)
function getImageUrl(category, width = 800, height = 400) {
  const keywords = IMAGE_KEYWORDS[category] || ['business'];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  // 使用 picsum.photos 作为备选免费图片源
  return `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
}

// 模拟新闻数据 (实际使用时替换为真实API调用)
function generateSampleNews() {
  const now = new Date();
  const articles = {
    weekly: [],
    analysis: [],
    cases: [],
    regulation: []
  };

  // 生成周报
  articles.weekly.push({
    id: `w${Date.now()}`,
    category: { en: 'Weekly', zh: '周报' },
    date: now.toISOString().split('T')[0],
    title: { 
      en: `Weekly Deal Roundup: ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 
      zh: `每周交易回顾：${now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}` 
    },
    excerpt: { 
      en: 'This week saw significant leasing activity across APAC with focus on sustainable finance and infrastructure projects.', 
      zh: '本周亚太区租赁活动显著增长，可持续金融和基础设施项目成为焦点。' 
    },
    tags: ['Asia Pacific', 'Sustainable Finance', 'Infrastructure'],
    image: getImageUrl('weekly'),
    source: 'Asia Leasing Insider'
  });

  // 生成市场分析
  articles.analysis.push({
    id: `a${Date.now()}`,
    category: { en: 'Analysis', zh: '分析' },
    date: now.toISOString().split('T')[0],
    title: { 
      en: 'Q1 2024 Asia-Pacific Equipment Finance Outlook', 
      zh: '2024年Q1亚太区设备融资展望' 
    },
    excerpt: { 
      en: 'Market analysis shows 12% growth in equipment financing across Southeast Asia with green leases gaining momentum.', 
      zh: '市场分析显示东南亚设备融资增长12%，绿色租赁正在蓬勃发展。' 
    },
    tags: ['Market Report', 'Growth', 'Forecast'],
    image: getImageUrl('analysis'),
    source: 'Asia Leasing Insider'
  });

  // 生成案例
  articles.cases.push({
    id: `c${Date.now()}`,
    category: { en: 'Case Study', zh: '案例' },
    date: now.toISOString().split('T')[0],
    title: { 
      en: 'Cross-Border Aircraft Lease Structure Analysis', 
      zh: '跨境飞机租赁结构分析' 
    },
    excerpt: { 
      en: 'Deep dive into a complex cross-border aircraft leasing transaction structure involving multiple jurisdictions.', 
      zh: '深入分析涉及多个司法管辖区的复杂跨境飞机租赁交易结构。' 
    },
    tags: ['Aviation', 'Cross-border', 'Structure'],
    image: getImageUrl('case'),
    source: 'Asia Leasing Insider'
  });

  // 生成监管动态
  articles.regulation.push({
    id: `r${Date.now()}`,
    category: { en: 'Regulation', zh: '监管' },
    date: now.toISOString().split('T')[0],
    title: { 
      en: 'Singapore MAS Updates on Lease Accounting Standards', 
      zh: '新加坡金管局更新租赁会计准则' 
    },
    excerpt: { 
      en: 'New guidelines from MAS on lease accounting and risk management requirements for financial institutions.', 
      zh: '金管局发布金融机构租赁会计和风险管理新指南。' 
    },
    tags: ['Singapore', 'MAS', 'Compliance'],
    image: getImageUrl('regulation'),
    source: 'Asia Leasing Insider'
  });

  return articles;
}

// RSS抓取函数 (可扩展)
async function fetchFromRSS() {
  const parser = require('rss-parser');
  const feeds = [
    { url: 'https://www.reutersagency.com/feed/?best-topics=business-finance', keywords: ['leasing', 'finance'] }
  ];

  // 实际实现时启用
  // for (const feed of feeds) {
  //   try {
  //     const parsed = await parser.parseURL(feed.url);
  //     // 过滤和处理
  //   } catch (err) {
  //     console.error(`Error fetching ${feed.url}:`, err.message);
  //   }
  // }

  return null;
}

// 主函数
async function main() {
  console.log('Fetching news data...');
  
  try {
    // 生成新文章
    const newArticles = generateSampleNews();
    
    // 读取现有数据
    const dataPath = path.join(__dirname, '..', 'data', 'articles.json');
    let existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // 合并新文章 (保留原有文章，添加新文章)
    const sections = ['weekly', 'analysis', 'cases', 'regulation'];
    sections.forEach(section => {
      // 添加新文章到开头
      existingData[section] = [...newArticles[section], ...existingData[section]].slice(0, 10);
    });
    
    // 保存更新后的数据
    fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log('Data updated successfully!');
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
