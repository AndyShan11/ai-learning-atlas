# 知图 · 数据与 AI 学习地图

**先建立大结构，再理解什么时候用什么。**

[打开交互导图](https://AndyShan11.github.io/ai-learning-atlas/) · [完整文字版](./KNOWLEDGE.md) · [内容维护说明](./CONTENT_POLICY.md)

![导图预览](./docs/preview.png)

面向数据分析、Kaggle 与生成式 AI 的中文知识地图。内容核查日期：**2026-09-12**。

- **8 个模块、94 个节点**：基础、分析与因果、学习方式、模型、验证与特征、训练与后处理、基础模型与生成式 AI、工程。
- 每个节点解释：**是什么、什么时候用、使用边界、具体例子、关联知识、参考资料**。
- 三条学习主线、条件选择器、8 个组合方案，中英文关键词搜索与节点直达链接。
- 区分学习方式和模型维度；将余弦退火、温度缩放等技巧归入训练流程。
- 补充 LoRA / QLoRA、RAG、DPO、GRPO、TabPFN；保留仍有用的经典方法，不按年代判断淘汰。
- 桌面 / 手机可用；可导出当前模块的 SVG，支持浏览器打印。

## 本地运行

需要 Node.js 22 或更新版本。页面无运行时第三方依赖，没有构建步骤。

```sh
node scripts/serve.mjs
```

打开 `http://127.0.0.1:4173`。也可用任意静态 HTTP 服务器。由于使用 ES modules，请通过 HTTP 打开，不要直接双击 HTML。

## 修改内容

编辑 `data.js` 中的模块、分支、节点、学习路径与组合方案。每个节点保留稳定 `id`，保证分享链接和关联不失效。

```sh
node --test tests/content.test.mjs
node scripts/docs.mjs
```

运行浏览器验证（需要安装 Playwright 与 Chromium）：

```sh
npm install
npx playwright install chromium
node tests/ui.mjs
```

`tests/ui.mjs` 自动启动本地服务器；设置 `ATLAS_URL` 可改测已部署页面。测试包括导航、搜索、节点分享、条件选择、SVG 导出、所有节点详情与移动端布局。截图保存在 `test-results/`。

## 发布

纯静态文件可由 GitHub Pages 托管。此仓库设置为从 `main` 分支根目录发布。CI 校验内容结构与生成文字版的一致性。

## 范围与出处

受到 [AMAI AI Expert Roadmap](https://github.com/AMAI-GmbH/AI-Expert-Roadmap) 的全景学习思路启发，界面与文字重新设计编写，未复用原版图片或源代码。本图聚焦用户的分析与建模需求，不追求覆盖全部 AI 研究领域。

参考资料以官方文档和原始论文为主。“先学 / 按需 / 进阶”是编辑建议，不是算法排名或行业淘汰结论。核查日期不意味着每个链接永久不变；具体实现和版本限制以资料为准。

MIT License。
