---
title: "简易ComfyUI机理"
date: 2026-02-12
draft: false
weight: 201
tags: ["AIGC", "comfyui", "Image Generation"]
categories: ["AIGC Works"]
---

# 综述
当我们接触到AIGC，不管是文生图还是图生图，也不管是基于封装式平台还是自由度更高的方式，一旦我们想要自己寻找感兴趣模型，就会在模型网站上看到琳琅满目的后缀为.safetensors的文件。这些模型到底是怎么在生成图片的过程中起作用呢？彼此之间又有何区别、该怎么选择呢？接下来我们将通过在ComfyUI搭建一个最简单的工作流来体会，但是在此之前，稍微快速过一遍基本概念更有帮助。磨刀不误砍柴工，掌握了基本概念后，后面搭建复杂工作流时就更事半功倍了。

ComfyUI的工作流其实就是ai生成图片的过程，搭建工作流的过程中，我们对其各个环节的认识也会更加深刻。我们接触的第一个节点就是加载checkpoint模型，故需要认识的第一个模型是checkpoint模型。在最简单的工作流中，只需加入这一个模型就能跑。在这个模型里储存的.safetensors文件（你需要把在外面下载的checkpoint模型文件放到ComfyUI/models/checkpoints/文件夹下），这个文件分为CLIP，base model，vae三个核心组件、

## base model
提到base model，我们就不得不讲到扩散模型。Diffusion（扩散）模型认为，世界上任何图片都可以通过“不断加噪”变成一团乱码。那么生成图片的过程就是“反向去噪”（denoising）的过程，即从乱码开始，通过不断去噪，最终生成图片。

目前base model常用的架构有两种。一种是SD1.5，SDXL等使用的UNet；另一种是大家耳熟能详的Transformer架构，SD3 / Flux等使用。

### UNet 架构
UNet 最初是由 Olaf Ronneberger 等人在 2015 年为医疗影像分割设计的，因其网络结构图呈现对称的 “U”形 而得名。在 Stable Diffusion (SD 1.5/XL) 的 Base Model 中，它被改进并用作核心的噪声预测器 。网络架构如下图所示。

![UNet 架构图](images/aigc_blogs/unet.png)

我们的目的是掌握ComfyUI，故以下概念只是辅助理解，不过多介绍。提三个要点：
 1. 压缩路径：Encoder 
- 结构： 由一系列卷积层（Convolutional Layers）和下采样层（Downsampling）组成。
- 原理： 当Latent（潜空间）数据进入 UNet 后，Encoder 会逐层压缩数据的 空间维度 （长宽），同时增加 通道维度 （深度）。
- 作用： 这个过程就像是在“审题”。它把图像特征从具体的像素级别，抽象为宏观的语义特征。模型通过这个过程理解画面的构图、物体的位置和整体色调。 

2. 扩张路径：Decoder
- 结构： 与 Encoder 对称，由上采样层（Upsampling）和反卷积层组成。
- 原理： 它将 Encoder 提取出的抽象特征逐步恢复到原始的潜空间尺寸。
- 作用： 这个过程是在“作画”。它负责将宏观的构图转化为细腻的纹理、发丝的走向和光影的渐变。

3. 核心：跳跃连接 (Skip Connections)
- 这是 UNet 的灵魂： 在 U 形结构的每一层，Encoder 提取的特征图（Feature Map）会直接横向传递，并与 Decoder 对应层的特征图进行拼接（Concatenation） 。
- 为什么它重要呢？因为在深度学习中，数据经过层层压缩会丢失大量细节信息 （比如边缘的锐利度）。跳跃连接允许 Decoder 直接引用来自 Encoder 的“原始记忆”。这保证了模型在生成图像时，既能把握全局逻辑，又不会丢失极细微的纹理细节。

### Transformer 架构
Transformer 架构最初由 Vaswani 等人在 2017 年提出，被广泛应用于多种任务。它的核心思想是基于注意力机制（Attention Mechanism），能够有效捕捉序列中不同位置之间的依赖关系。

在 SD3 / Flux 中，Transformer 架构将图像（潜空间数据）切分为 Patches（图块） 并线性嵌入为 Tokens 。这个过程虽然在特征提取的初衷上与 UNet 的 Encoder 相似，但在机理上有本质不同：UNet依靠卷积（Convolution） 的局部感受野逐层压缩信息；而 Transformer 则通过自注意力机制（Self-Attention） ，让每一个图块 Token 都能在全局范围内与其他图块以及文本 Token 进行信息交换。这种‘全局视野’使得模型在处理复杂的构图逻辑和文字对齐时表现优异。

如果你也对深度学习有一定的了解，你知道Transformer架构在很多领域都有应用，比如文本生成、翻译等，甚至你自己也复现过它的自注意力机制。如果你了解不深，但是对此深感兴趣，推荐阅读[Transformer: Attention Is All You Need](https://arxiv.org/abs/1706.03762)这篇经典文章，并在b站或YouTube跟着吴恩达或李沐等人的讲解学习。

要讲会讲很多，就讲到这里。你可以简单记住的是：UNet架构占主流，对局部特征 （纹理、线条）极其敏感，但在处理全局关系 （比如：手到底该长在胳膊的哪里？）时可能会翻车；而Transformer架构的自注意力机制则有更强的全局理解能力，语义理解能力更强，但是生态兼容较弱，显存需求也更大（模型越大，Transformer 的表现就越强，它的表现极依赖于模型规模）。这些综述性特点也并非绝对适用所有细化情况，若有兴趣钻研，请具体问题具体分析。

## CLIP
CLIP (Contrastive Language-Image Pre-training) 是由 OpenAI 开发的一种跨模态预训练模型。它是 Stable Diffusion 能够“听懂人话”的核心功臣。

CLIP 的强大源于其独特的训练方式。在预训练阶段，它接触了数以亿计的“图片+描述”对。
- 双塔架构： CLIP 包含一个文本编码器（Text Encoder） 和一个图像编码器（Image Encoder） 。
- 训练目标：它的任务是让正确的“图-文”对在Embedding Space中的距离尽可能接近，而让错误的对距离尽可能遥远。
- 结果： 经过海量训练，CLIP 构建了一个共享的语义潜空间。在这个空间里，文字（比如说“猫”）的数学向量和图片（比如说“猫”）的数学向量被对齐到了同一个坐标附近。

在 ComfyUI 的 Checkpoint 模型中，我们主要使用 CLIP 的 Text Encoder 部分。

当你在 CLIP Text Encode 节点输入提示词时：
1. Tokenization（分词）： CLIP 首先将你的句子拆解成一个个小的单位（Tokens）。
2. Vectorization（向量化）： 每一个 Token 会被转换成高维向量。
3. Conditioning（调节信号）： 这些向量包含了丰富的语义信息，它们作为“调节信号”输入给 Base Model ，告诉它：“在接下来的去噪过程中，请向这些坐标点靠近。”

在不同的 Base Model 架构中，CLIP 的运用方式和规格有着本质的区别，而我们需要提供的文本（即你可能经常听到的“提示词”）也有不同要注意的点。而且，怎么样的提示词效果最好，有什么讲究？这些，我将有时间单独写一篇关于“提示词”的博客，详细讨论。

## VAE

VAE (Variational Auto-Encoder，变分自编码器) 是扩散模型（Diffusion Models）实现高效生成的关键技术。AIGC 的语境下，VAE 负责在两个完全不同的空间之间进行数据转换：

- 像素空间 (Pixel Space) ：我们肉眼看到的、由 RGB 像素点组成的图像（例如 1024x1024 像素）。
- 潜空间 (Latent Space) ：模型进行去噪计算的、被高度压缩的数学空间（例如 128x128 维度的特征图）。

VAE 包含两个互逆的子网络：

- Encoder (编码器)：像素  → 潜空间
- Decoder (解码器)：潜空间  → 像素

至于编码和解码的细节，感兴趣可以去自行了解，这里不做过多介绍，以免因为过多概念而打击你上手AIGC的乐趣。你需要知道的是，VAE 的好坏直接决定了最终图片的视觉表现力 ：包括影响图像的细节、光泽、色彩和边缘清晰度等。

# 开始动手搭建第一个工作流吧！

接下来，我们将搭建一个最简单的文生图工作流。

![1.加载checkpoint模型节点](images/aigc_blogs/1.png)

如图，选用你喜欢的checkpoint模型，你可以看到它包含我提到的三种组件。

![2.连上CLIP文本编码节点](images/aigc_blogs/2.png)

连上CLIP文本编码节点，你可以看到它包含一个文本输入框，你可以在其中输入你喜欢的正面和负面提示词。对应输出点连在K采样器上，要注意，checkpoint模型的model点要和K采样器的model点连上，是因为 KSampler 的每一次迭代（Iteration）都高度依赖于 Model 提供的 方向 。

![3.K采样器节点参数设置](images/aigc_blogs/3.png)

在 ComfyUI 中， KSampler (K-采样器) 是整个图像生成流程的核心节点。如果说 Base Model 是画师的笔触，那么 KSampler 就是指挥画师如何一步步从混沌的噪声中“擦除”出清晰画面的总指挥。

这里的“K”源于著名的 AI 科学家 Tero Karras （NVIDIA 研究员），他提出了一系列改进采样效率和质量的算法。

采样器的本质是一个求解常微分方程 (ODE)的数学过程。通过选用不同采样算法和其他参数，往往会影响图片生成效果。

以下参数设置的介绍：

A. Seed (种子值)
- 功能： 决定了初始随机噪声的排列方式。
- 作用： 相同的种子、相同的参数、相同的模型会生成完全一样的图片。它是实现“可重复性”的基础。 

B. Control_after_generate (生成后操作)
- 选项： fixed (固定), increment (+1), decrement (-1), randomize (随机)。
- 作用： 方便你在跑图时自动更换种子，探索不同的可能性。 

C. Steps (采样步数)
- 功能： 规定了从纯噪声到最终图像一共要经过多少次去噪迭代。
- 经验值：
  - 通常 20-30 步 即可获得极佳效果。
  - 步数太少（<15）会导致画面模糊或细节缺失；步数太多（>50）收益递减，且可能导致过拟合。 
  
D. CFG (Classifier Free Guidance，提示词引导系数)
- 功能： 衡量模型“听话”程度的指标。
- 机理： 采样器会同时计算“有提示词”和“无提示词”两种去噪方向，CFG 值越高，模型就越倾向于远离无提示词的方向，即越贴近你的 Prompt。
- 经验值：
  - 5.0 - 8.0 是最稳妥的区间。
  - 过高（>12）会导致画面色彩过饱和、出现锐化的白边；过低（<3）则会让画面显得平淡且不符合提示词。 

E. Sampler_name (采样算法名称)
这是执行去噪逻辑的具体“公式”。常见的有：

- Euler / Euler a： 最经典的算法，速度快，适合写实和动漫。
- DPM++ (2M, 2S, 3M等)： 现代高效算法，通常能用更少的步数达到更高的画质。
- Ancestral (带 a 的，如 Euler a)： 在每一步都会引入一点点新的随机噪声。这意味着即使步数再多，画面也不会完全收敛，每次都会有细微变化。 

F. Scheduler (调度器)
- 功能： 控制每一步去噪的“力度”和“节奏”。
- 常见类型：
  - Normal： 线性节奏，平规平矩。
  - Karras： 这是最推荐的调度器。它在采样后期会减慢噪声减少的速度，从而极大提升图像细节的细腻程度。
  - Exponential： 指数型，后期去噪力度非常小。 G. Denoise (重绘幅度/去噪强度)
- 功能： 决定了要往初始 Latent 中注入多少比例的噪声。
- 作用：
  - 文生图 (Txt2Img) ：必须设为 1.0 （完全从噪声开始）。
  - 图生图 (Img2Img) ：通常设为 0.4 - 0.6 。值越小，保留原图越多；值越大，AI 发挥空间越大。

![4.连上空latent和VAE解码](images/aigc_blogs/4.png)

还记得我们在VAE部分介绍的概念吗？K采样器处理的是潜空间（Latent space）里的向量，所以你一开始的输入是给它一个空latent（长度和高度对应着分辨率，请参照对应模型的推荐值设置）。它的输出也在潜空间，所以我们要通过VAE解码节点，将其转换为像素空间（pixel space）的图片。连上预览和保存图像节点，第一个工作流就搭建完成了，快去试试跑第一幅图吧！

注意：VAE解码节点的VAE点要和加载checkpoint模型节点的VAE点连上，是因为你解码时需要根据模型的解码器进行反变换。不要忘记连了。（即上图中的红线）

Tips：可通过修改保存图像节点中的文件前缀，来方便你在批量跑图时，区分不同的图片。（比如：设置文件前缀为test/bunch1，将会生成test/bunch1_00001.png、test/bunch1_00002.png等，储存在ComfyUI的output文件夹中）

Tips:如果你觉得我的讲解还是略显繁琐，想要更简洁直观的介绍，这里有一个我在github上找到的简易英文教程，以微型galgame的形式呈现，有兴趣的可以去看一下。[https://comfyanonymous.github.io/ComfyUI_tutorial_vn/](https://comfyanonymous.github.io/ComfyUI_tutorial_vn/)
