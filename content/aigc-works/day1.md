---
title: "本地部署与简易ComfyUI逻辑"
date: 2026-02-10
draft: false
weight: 200
tags: ["AIGC", "comfyui", "Image Generation"]
categories: ["AIGC Works"]
---

# 综述

之前的电脑是轻薄本，一直是在云端部署ComfyUI。今天新电脑到了，虽然配了半天的配置，掉了不少坑，最终自如的模型上传与工作流跑起来喜人的速度把之前的微恼一扫而空。借此总结经验的机会给大家梳理一下常见部署方法。然后以一个最简单的工作流为例，展示一下ComfyUI的基本逻辑。

# 部署ComfyUI

## 云端部署/直接上手
重点在后面的本地部署上，这里就说的简略些。

一种方法是用集成式的平台。比如说aliyun的pai-artlab，以及类似产品。
好处是不需要配置pytorch，cuda等环境，直接上手。

坏处就是处处封装式的平台。一是可能会受限于平台的配置，租好的硬件可能要更多花钱，模型的生成速度也会受到限制；然后平台内置外的节点,模型的上传（如果平台允许上传的话）也相对不便。要么尤其是外部模型（本身大的动辄几GB）下载在本地后，还需要上传到在oss这样的对象存储上（另外计费），方便下次使用。

另一种方法是在云端Jupyter环境，使用官方或社区维护完善的 Notebook部署。Google colab有提供免费GPU（T4），但是不推荐，还是建议租服务器跑。

好处在于更自由，更不受制于封装式的平台缺陷。缺陷是本地下载的模型每次都要重新上传（如果释放实例的话）等。

## 本地部署

如果有NVIDIA显卡，本地部署当然是最好的。

直接上官网下载ComfyUI。本身的安装程序是自动安装好Python和Pytorch（cuda版本），但是众所周知，直接pip install容易卡死（境外源）。不出意外的，在安装过程中，进程卡死了。所以本身的安装包就卡在这里了。

需自行下载pytorch（cuda版本），如果有机器学习相关经验者，本段可以跳过。 PyTorch 对 CUDA 的版本要求非常严格，而清华源加速的版本不一定有最新版本cuda 对应的 PyTorch 轮子。建议直接到Pytorch官网下载对应版本（！重要提醒，一定要看清楚Pytorch对应的cuda版本和Python版本，我就连着下错了两次）

然后，可以通过以下方式检查。
```bash
& "(填入你的路径)\ComfyUI\.venv\Scripts\python.exe" -c "import torch; print(f'CUDA是否可用: {torch.cuda.is_available()}'); print(f'显卡型号: {torch.cuda.get_device_name(0)}'); print(f'算力版本: {torch.cuda.get_device_capability(0)}')"
```

因为原来的快捷方式打开来还是卡在装Python上的，此时可以直接删除原安装包。建立批处理文件，通过此打开ComfyUI。

此外，建议同时安装ComfyUI Manager插件，可在guthub网页下载，也可直接git clone。具有自动补全未下载的节点等诸多益处。

到此，就可以打开ComfyUI，建立第一个工作流啦。


