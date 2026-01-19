# 📚 博客板块更新指南

## 🎯 概览

你的博客现在有三个主要板块：
1. **AIGC Works** - AI生成内容作品展示
2. **CV Blogs** - 计算机视觉技术博客
3. **Quant Trading** - 量化交易分析与策略

## 📁 目录结构

```
content/
├── aigc-works/          # AIGC板块
│   ├── _index.md       # 板块首页
│   └── *.md            # 文章文件
├── cv-blogs/           # CV博客板块
│   ├── _index.md       # 板块首页
│   └── *.md            # 文章文件
├── quant-trading/      # 量化交易板块
│   ├── _index.md       # 板块首页
│   └── *.md            # 文章文件
└── about/              # 关于页面
    └── _index.md
```

---

## ✍️ 如何添加新文章

### 方法1：手动创建文件

在对应板块目录下创建 Markdown 文件：

#### AIGC Works 文章模板

创建文件：`content/aigc-works/your-article-title.md`

```markdown
---
title: "你的文章标题"
date: 2026-01-19
draft: false
tags: ["AIGC", "Stable Diffusion", "图像生成"]
categories: ["AIGC Works"]
description: "文章简短描述"
cover:
    image: "images/cover.jpg"  # 可选：封面图片
    alt: "封面图片描述"
    caption: "图片说明"
---

# 文章内容

你的正文内容...

## 章节标题

更多内容...
```

#### CV Blogs 文章模板

创建文件：`content/cv-blogs/your-article-title.md`

```markdown
---
title: "你的技术文章标题"
date: 2026-01-19
draft: false
tags: ["Computer Vision", "Object Detection", "深度学习"]
categories: ["CV Blogs"]
description: "技术文章简介"
math: true  # 如果包含数学公式
---

# 文章标题

## 技术背景

介绍技术背景...

## 算法原理

数学公式示例：
$$f(x) = \int_{-\infty}^{\infty} e^{-x^2} dx$$

## 代码实现

```python
import torch
import torch.nn as nn

class YourModel(nn.Module):
    def __init__(self):
        super().__init__()
        # 你的代码
```

## 实验结果

| 模型 | 准确率 | FPS |
|------|--------|-----|
| Model A | 95.2% | 30 |
| Model B | 96.8% | 45 |
```

#### Quant Trading 文章模板

创建文件：`content/quant-trading/your-strategy.md`

```markdown
---
title: "你的策略或分析标题"
date: 2026-01-19
draft: false
tags: ["Quant Trading", "策略", "回测"]
categories: ["Quant Trading"]
description: "策略简介"
math: true
---

# 策略介绍

## 理论基础

策略的数学或经济学基础...

## 实现代码

```python
import pandas as pd
import numpy as np

def your_strategy():
    # 策略实现
    pass
```

## 回测结果

性能指标分析...
```

### 方法2：使用Hugo命令创建

```bash
# 进入项目目录
cd /home/user/webapp

# 创建AIGC文章
hugo new aigc-works/my-new-aigc-post.md

# 创建CV博客文章
hugo new cv-blogs/my-new-cv-post.md

# 创建量化交易文章
hugo new quant-trading/my-new-quant-post.md
```

---

## 🎨 文章元数据说明

### 必填字段

- **title**: 文章标题
- **date**: 发布日期（格式：YYYY-MM-DD）
- **draft**: 是否为草稿（`true`/`false`）

### 可选字段

- **tags**: 标签列表，方便分类和检索
- **categories**: 分类
- **description**: 文章简介，用于SEO和预览
- **cover**: 封面图片配置
- **math**: 是否启用数学公式渲染（`true`/`false`）
- **weight**: 文章排序权重（数字越小越靠前）

### 示例

```yaml
---
title: "深度学习在量化交易中的应用"
date: 2026-01-19
draft: false
tags: ["深度学习", "量化交易", "机器学习", "Python"]
categories: ["Quant Trading"]
description: "探索如何使用LSTM网络预测股票价格趋势"
math: true
weight: 10
cover:
    image: "images/dl-quant.jpg"
    alt: "深度学习量化交易"
    caption: "神经网络架构图"
---
```

---

## 🔧 修改板块首页

每个板块的首页文件是 `_index.md`，你可以编辑它来自定义板块介绍：

### 编辑 AIGC Works 首页

编辑文件：`content/aigc-works/_index.md`

```markdown
---
title: "AIGC Works"
description: "你的自定义描述"
layout: "section"
---

# 🎨 AIGC Works

这里写你想展示的板块介绍内容...

## 最新作品

自动显示最新文章列表
```

### 编辑 CV Blogs 首页

编辑文件：`content/cv-blogs/_index.md`

### 编辑 Quant Trading 首页

编辑文件：`content/quant-trading/_index.md`

---

## 📊 内容组织建议

### AIGC Works 板块

推荐内容类型：
- 生成式AI作品展示
- Stable Diffusion/Midjourney实验
- AI视频创作过程
- 文本生成案例
- 多模态项目

推荐标签：
```yaml
tags: ["Stable Diffusion", "Midjourney", "DALL-E", "GPT", "Video Generation", 
       "Text-to-Image", "Image-to-Image", "ControlNet", "LoRA"]
```

### CV Blogs 板块

推荐内容类型：
- 论文阅读笔记
- 算法实现教程
- 模型训练经验
- 数据集介绍
- 性能优化技巧

推荐标签：
```yaml
tags: ["Object Detection", "Segmentation", "Classification", "YOLO", "R-CNN",
       "Transformer", "CNN", "PyTorch", "TensorFlow", "OpenCV"]
```

### Quant Trading 板块

推荐内容类型：
- 交易策略分析
- 回测结果分享
- 市场研究报告
- 技术指标研究
- 风险管理方法

推荐标签：
```yaml
tags: ["Mean Reversion", "Momentum", "Pairs Trading", "Machine Learning",
       "Backtesting", "Risk Management", "Technical Analysis", "Alpha"]
```

---

## 🚀 发布流程

### 本地预览

```bash
cd /home/user/webapp

# 启动本地服务器（包括草稿）
hugo server -D

# 启动本地服务器（仅发布文章）
hugo server
```

访问 `http://localhost:1313` 预览你的博客。

### 构建静态网站

```bash
cd /home/user/webapp

# 构建网站（生成到 public/ 目录）
hugo

# 构建时包含草稿
hugo -D
```

### 部署到GitHub Pages

```bash
cd /home/user/webapp

# 1. 构建网站
hugo

# 2. 提交更改
git add .
git commit -m "Add new articles"

# 3. 推送到GitHub
git push origin main
```

GitHub Actions会自动部署你的网站。

---

## 🎯 快速工作流

### 日常更新文章

```bash
# 1. 创建新文章
hugo new aigc-works/my-new-post.md

# 2. 编辑文章内容
# 使用你喜欢的编辑器打开文件

# 3. 本地预览
hugo server -D

# 4. 修改 draft 为 false
# 在文章的 front matter 中：draft: false

# 5. 构建并部署
hugo
git add .
git commit -m "Add: new AIGC post about ..."
git push origin main
```

### 批量更新

```bash
# 1. 编写多篇文章
# 2. 一次性预览
hugo server -D

# 3. 确认无误后构建
hugo

# 4. 提交所有更改
git add .
git commit -m "Update: add multiple new posts"
git push origin main
```

---

## 💡 进阶技巧

### 1. 使用图片

将图片放在 `static/images/` 目录下：

```markdown
![图片描述](/images/your-image.jpg)
```

或使用封面图片：

```yaml
cover:
    image: "/images/cover.jpg"
    alt: "封面描述"
```

### 2. 添加目录

在文章开头添加：

```yaml
---
ShowToc: true
TocOpen: true
---
```

### 3. 代码高亮

支持多种语言高亮：

````markdown
```python
def hello_world():
    print("Hello, World!")
```

```javascript
const greeting = () => {
    console.log("Hello, World!");
};
```
````

### 4. 数学公式

启用数学支持：

```yaml
---
math: true
---
```

然后使用LaTeX语法：

```markdown
行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 5. 自定义排序

使用 `weight` 字段控制文章顺序：

```yaml
---
weight: 1  # 数字越小，排序越靠前
---
```

---

## 🔍 文件位置速查

| 内容类型 | 文件位置 |
|---------|---------|
| AIGC文章 | `content/aigc-works/*.md` |
| CV博客 | `content/cv-blogs/*.md` |
| 量化交易 | `content/quant-trading/*.md` |
| 关于页面 | `content/about/_index.md` |
| 导航配置 | `hugo.toml` |
| 自定义样式 | `assets/css/extended/custom.css` |
| 静态资源 | `static/` |
| 主题配置 | `themes/PaperMod/` |

---

## 🎨 自定义导航栏

编辑 `hugo.toml` 文件修改导航栏：

```toml
[[menu.main]]
    identifier = "aigc-works"
    name = "AIGC Works"      # 显示名称
    url = "/aigc-works/"     # 链接地址
    weight = 10              # 排序权重

[[menu.main]]
    identifier = "cv-blogs"
    name = "CV Blogs"
    url = "/cv-blogs/"
    weight = 20
```

---

## ❓ 常见问题

### Q: 文章不显示？

A: 检查以下几点：
1. `draft` 字段是否设置为 `false`
2. `date` 日期是否为未来时间
3. 文件是否保存在正确的目录

### Q: 如何修改主题样式？

A: 编辑 `assets/css/extended/custom.css` 文件，添加自定义CSS。

### Q: 如何添加新的板块？

A: 
1. 在 `hugo.toml` 添加新的菜单项
2. 创建对应的内容目录
3. 添加 `_index.md` 文件

### Q: 数学公式不显示？

A: 确保文章的 front matter 中有 `math: true`

---

## 📞 获取帮助

如果遇到问题：
1. 查看 [Hugo官方文档](https://gohugo.io/documentation/)
2. 查看 [PaperMod主题文档](https://github.com/adityatelange/hugo-PaperMod)
3. 检查构建日志中的错误信息

---

**祝你写作愉快！🚀**
