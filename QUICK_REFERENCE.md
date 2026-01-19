# 🎯 快速更新参考卡

## 📝 添加新文章三步走

### 1️⃣ 创建文章文件

**AIGC Works:**
```bash
cd /home/user/webapp
touch content/aigc-works/my-new-post.md
```

**CV Blogs:**
```bash
cd /home/user/webapp
touch content/cv-blogs/my-new-post.md
```

**Quant Trading:**
```bash
cd /home/user/webapp
touch content/quant-trading/my-new-post.md
```

### 2️⃣ 使用模板填写内容

```markdown
---
title: "文章标题"
date: 2026-01-19
draft: false
tags: ["标签1", "标签2"]
categories: ["板块名称"]
description: "简短描述"
math: true  # 如果需要数学公式
---

# 标题

你的内容...
```

### 3️⃣ 提交并推送

```bash
cd /home/user/webapp
git add .
git commit -m "Add: 新文章标题"
git push origin main
```

## 📂 目录快速定位

| 板块 | 目录路径 |
|------|----------|
| AIGC Works | `content/aigc-works/` |
| CV Blogs | `content/cv-blogs/` |
| Quant Trading | `content/quant-trading/` |
| 关于页面 | `content/about/` |

## 🏷️ 推荐标签

**AIGC:**
`Stable Diffusion`, `Midjourney`, `GPT`, `Video Generation`, `Text-to-Image`

**CV:**
`Object Detection`, `Segmentation`, `YOLO`, `Transformer`, `PyTorch`, `Paper Review`

**Quant:**
`Trading Strategy`, `Backtesting`, `Risk Management`, `Technical Analysis`, `Machine Learning`

## ⚡ 常用命令

```bash
# 本地预览（包含草稿）
hugo server -D

# 构建网站
hugo

# 查看Git状态
git status

# 快速提交
git add . && git commit -m "更新内容" && git push origin main
```

## 🎨 自定义样式

编辑文件：`assets/css/extended/custom.css`

## ⚙️ 导航栏配置

编辑文件：`hugo.toml`

---

💡 **详细教程**: 查看 [CONTENT_UPDATE_GUIDE.md](CONTENT_UPDATE_GUIDE.md)
