# 2026-09-13 覆盖审计

从 220 个节点扩充到 308 个，层级连线 307 条，跨树关系从 55 条增至 119 条，组合方案从 8 个增至 11 个。审计覆盖八个模块的导航、说明与新增关系；不代表逐篇重新验证全部旧来源。

## 对照资料发现的缺口

| 资料                                                                                                                                                                           | 检查重点                             | 本次处理                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------- |
| [roadmap.sh 数据科学路线图](https://roadmap.sh/pdfs/roadmaps/ai-data-scientist.pdf)                                                                                            | 数学、统计实验、比率指标、分析与交付 | 补描述统计、效应大小、多重检验、比率口径与结论表达                  |
| [Power BI 建模指南](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema)                                                                                           | 分析岗实际工具和数据粒度             | 新增 BI、事实维度、DAX、Power Query 分支                            |
| [scikit-learn 指南](https://scikit-learn.org/stable/user_guide.html)与[交叉验证](https://scikit-learn.org/stable/modules/cross_validation.html)                                | 模型家族、预处理、验证与指标         | 补 GP、计数回归、NMF、t-SNE、LOF、Pipeline、OOF、嵌套验证及指标子类 |
| [imbalanced-learn](https://imbalanced-learn.org/stable/user_guide.html)                                                                                                        | 不平衡数据及泄漏陷阱                 | 区分类别权重与采样，明确仅在训练折采样                              |
| [动手学深度学习](https://d2l.ai/chapter_recommender-systems/index.html)与[scikit-survival](https://scikit-survival.readthedocs.io/en/stable/user_guide/index.html)             | 普通分类回归以外的任务               | 加入推荐、检测分割、生存分析、注意力与生成模型入口                  |
| [Hugging Face Cookbook](https://huggingface.co/learn/cookbook/index)及[检索重排指南](https://sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html) | 模型之外的组合链路                   | 增加关键词/向量/混合检索、检索指标、证据忠实度、推理预算            |
| [PyTorch 分布式](https://docs.pytorch.org/docs/stable/distributed.html)与[缓存策略](https://huggingface.co/docs/transformers/kv_cache)                                         | 训练和推理的不同资源瓶颈             | 梯度累积、激活检查点、多卡分片、KV Cache、注意力后端、批处理        |

## 快速迭代部分如何处理

核查日期是阅读与整理日期，不是算法发布日期。以下内容均直接链接维护方；没有把品牌版本排名做成固定知识层级。

- [TabPFN](https://github.com/PriorLabs/TabPFN)：保留家族节点，更新具体版本、权重许可、输入限制的核查提示，不沿用旧版本上限代表整个家族。
- [Chronos](https://github.com/amazon-science/chronos-forecasting)：补时间序列基础模型入口，并连接时间回测；预训练结果仍需与朴素基线比较。
- [Mamba](https://github.com/state-spaces/mamba)与[MoE 原论文](https://arxiv.org/abs/2101.03961)：补结构位置，标记进阶，不声称已经替代所有稠密 Transformer。
- [TRL GRPO](https://huggingface.co/docs/trl/grpo_trainer)：区分 RLHF / RLVR 的反馈来源与 PPO / GRPO 的优化方法，后训练不是普通分析岗默认前置。
- [MCP](https://modelcontextprotocol.io/docs/getting-started/intro)与[Agent 工作流](https://www.anthropic.com/engineering/building-effective-agents)：区分连接协议、工具调用和自主决策；补轨迹评估与停止条件。
- VAE、GAN、主动学习、经典统计虽然不是新发明，仍补回缺失位置；不以“新”决定是否值得学。

## 修正与连接

聚类和降维的旧类别节点曾沿用 K-means / PCA 的专有说明，现改为类别说明。新增关系区分在线学习与强化学习、上下文学习与微调、生成采样温度与概率校准温度、增强与 TTA。层级仅代表导航归属，学习设置可以交叉。

新增知识都包含定义、何时使用、使用边界、例子、来源和学习优先级。数据分析与 Kaggle 常用流程优先；特定模型、硬件优化和研究方向按需或进阶。

## 仍然有边界

这是一张主要知识结构的地图，不是所有论文的目录。贝叶斯计算、优化理论、推荐系统、音频视频、机器人、多智能体 RL 等仍有更深子类可按具体任务延伸。当前优先补与数据分析、Kaggle 和生成式 AI 实践直接相连的部分；没有宣称已覆盖全部 2026 研究进展，也没有自动联网更新功能。
