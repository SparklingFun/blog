---
categories: Other
date: 2020-08-02T01:49:59+08:00
tags:
- 工具
title: 使用forestry.io管理你的博客
excerpt: '[forestry.io](https://forestry.io/ "Forestry.io") 我使用了约有一年的时间，整体体验下来非常不错，对于书写博客这种轻量化的需求基本可以全面满足，利用模板（Front
  matter）和多种媒体库接入方式，把更多的精力专注于写作上。'
thumbnail: ''

---
> 如果英文能力还可以的同学可以直接移步 [官网文档](https://forestry.io/docs/welcome/)

## 原来的写博客方式

现在比较多的写博客模式是利用Github仓库，连接Github Page或者一些第三方服务如Netlify, Vercel(Now.sh)来进行部署，写好文章提交后的流程已经基本自动，而且大部分平台的服务都是免费的。

> 博主之前使用Vercel部署时，需要注意免费计划 **每个小时不能超过30次构建部署** 。

然而写博客主要是内容，那么书写平台就是一大问题，我们虽然可以用本地IDE（亦或是Code Server/VSCode Remote）这一类工具进行编写，但是未免仍不够轻量，如果是iPad这一类移动设备更是不方便，因而，我发现了这个基于Git的第三方编辑平台—— [Forestry.io](https://forestry.io)

![Forestry.io CMS](https://res.cloudinary.com/forestry-io/image/fetch/c_limit,dpr_auto,f_auto,q_80,w_1028/https://forestry.io/uploads/2018/12/draft-post-editor.png)

## 快速上手

Forestry.io支持四种Git来源：Github, Gitlab, Bitbucket, Azure Devops。

一般作为博客我们使用Github，继续后会进入到Github的授权界面，授权即可。

> 默认的授权是读取Public库，如果你需要也可以在CMS左侧的Settings中选择授权Private仓库。

> 如果是Bitbucket和Azure Devops，可能需要更复杂的设置，我没有使用过，可以参考官方文档。

授权完成后，可以进入Dashboard，选择Add Site。

本篇以一个GatsbyJS的模板项目为例子，Hexo，Hugo，Jekyll官网上都有相关的例子可以参考。如果你是Hexo，请选择Other类别。然后点击Next。

![选择静态生成框架](https://cdn.sparkling.land/public/blog/images/step1.png)

进入到“Select your git provider”界面，和原来一样，选择你的Git来源，这里我选择Github。

第三步就来到了仓库选择，直接选择你想要操作的仓库与分支，如果你不想让Forestry提交commit到master，请在此选择一个编辑分支。

![选择仓库与分支](https://cdn.sparkling.land/public/blog/images/step3.png)

导入完成，进入到CMS的主界面。

![CMS主界面](https://cdn.sparkling.land/public/blog/images/step4.png)