# 知图 · 数据与 AI 学习地图

内容核查：2026-09-12。8 个模块，94 个知识节点。

[打开交互版](https://AndyShan11.github.io/ai-learning-atlas/)

模块按不同维度组织，不是互斥分类。学习方式与模型可以交叉，训练技巧可以与模型组合。优先级是面向学习目标的编辑建议。

## 数据分析岗主线

先建立取数 → 指标 → 诊断 → 实验 → 表达的主线。

SQL 与窗口函数 → Python 与 pandas → 指标体系 → 探索性数据分析 EDA → 漏斗分析 → 留存与分群 → 抽样与置信区间 → A/B 实验 → 因果推断与混杂 → 可视化与表达

## Kaggle · 预测建模主线

先建立数据 → 验证 → 基线 → 特征 → 误差 → 融合的主线。

Python 与 pandas → 探索性数据分析 EDA → 监督学习 → 验证集与交叉验证 → 数据泄漏检查 → 指标与目标对齐 → 梯度提升树 GBDT → 滞后 / 滚动 / 交互特征 → 分组误差与消融 → 超参数搜索 · Optuna → 融合 / Stacking

## 生成式 AI主线

先复用模型与评估，再按问题选检索、微调或后训练。

Python 与 pandas → 深度学习 → Transformer / ViT → 预训练与迁移学习 → Embedding / 语义向量 → 生成系统评估 → RAG · 检索增强生成 → SFT · 监督微调 → LoRA / QLoRA → DPO · 直接偏好优化 → GRPO · 组相对策略优化

## 基础工具与数学

编程、数据处理和数学是其他模块的支撑。按具体概念补基础，不必先学完所有数学。

### 数据工具

#### Python 与 pandas

- **位置：** 基础工具与数学 › 数据工具；先学
- **是什么：** 用代码读取、清洗、聚合数据。
- **什么时候用：** 需要重复分析、处理比赛数据时。
- **使用边界：** 只复制代码而不检查行数、类型和连接结果。
- **例子：** 按用户聚合消费金额，再与用户表连接。
- **关联：** [SQL 与窗口函数](https://AndyShan11.github.io/ai-learning-atlas/#node=sql)、[探索性数据分析 EDA](https://AndyShan11.github.io/ai-learning-atlas/#node=eda)
- **资料：** [pandas · 入门教程](https://pandas.pydata.org/docs/getting_started/intro_tutorials/)

#### SQL 与窗口函数

- **位置：** 基础工具与数学 › 数据工具；先学
- **是什么：** 在数据库内筛选、连接、分组与计算窗口统计。
- **什么时候用：** 取数、漏斗、留存、排序、累计指标。
- **使用边界：** 多对多连接放大行数；空值含义不清。
- **例子：** 用 LAG 比较每个用户两次购买的时间。
- **关联：** [Python 与 pandas](https://AndyShan11.github.io/ai-learning-atlas/#node=python)、[指标体系](https://AndyShan11.github.io/ai-learning-atlas/#node=metrics)
- **资料：** [PostgreSQL · SQL 教程](https://www.postgresql.org/docs/current/tutorial-sql.html)

#### 可视化与表达

- **位置：** 基础工具与数学 › 数据工具；先学
- **是什么：** 用合适图形表达分布、差异与趋势。
- **什么时候用：** 检查异常、比较群体、向业务说明结论。
- **使用边界：** 截断坐标制造夸张差异；只给图不交代口径。
- **例子：** 画各渠道的转化率及样本量。
- **关联：** [探索性数据分析 EDA](https://AndyShan11.github.io/ai-learning-atlas/#node=eda)、[抽样与置信区间](https://AndyShan11.github.io/ai-learning-atlas/#node=uncertainty)
- **资料：** [pandas · 入门教程](https://pandas.pydata.org/docs/getting_started/intro_tutorials/)

#### DuckDB / Polars

- **位置：** 基础工具与数学 › 数据工具；按需
- **是什么：** 本地分析工具，补充 pandas 的执行与内存选择。
- **什么时候用：** 本地较大表格、列式文件或 SQL 分析。
- **使用边界：** 数据很小时先增加工具复杂度。
- **例子：** 直接查询 Parquet，再只取汇总结果。
- **关联：** [SQL 与窗口函数](https://AndyShan11.github.io/ai-learning-atlas/#node=sql)、[Python 与 pandas](https://AndyShan11.github.io/ai-learning-atlas/#node=python)
- **资料：** [DuckDB · 文档](https://duckdb.org/docs/stable/)

### 数学与统计

#### 概率与分布

- **位置：** 基础工具与数学 › 数学与统计；先学
- **是什么：** 用概率描述不确定性；理解条件概率、期望与方差。
- **什么时候用：** 理解采样、分类概率、统计检验。
- **使用边界：** 把条件概率的方向弄反。
- **例子：** 知道检测阳性不等于一定患病。
- **关联：** [抽样与置信区间](https://AndyShan11.github.io/ai-learning-atlas/#node=uncertainty)、[逻辑回归](https://AndyShan11.github.io/ai-learning-atlas/#node=logistic)
- **资料：** [SciPy · 统计模块](https://docs.scipy.org/doc/scipy/reference/stats.html)

#### 抽样与置信区间

- **位置：** 基础工具与数学 › 数学与统计；先学
- **是什么：** 估计结果的不确定程度。
- **什么时候用：** 样本推广到总体，比较实验结果。
- **使用边界：** 忽略非随机抽样；把置信区间理解成个体范围。
- **例子：** 给转化率差异报告区间，而非只报点估计。
- **关联：** [A/B 实验](https://AndyShan11.github.io/ai-learning-atlas/#node=ab)、[Bootstrap](https://AndyShan11.github.io/ai-learning-atlas/#node=bootstrap)
- **资料：** [SciPy · 统计模块](https://docs.scipy.org/doc/scipy/reference/stats.html)

#### 线性代数

- **位置：** 基础工具与数学 › 数学与统计；先学
- **是什么：** 向量、矩阵、内积和矩阵分解的语言。
- **什么时候用：** 理解回归、PCA、嵌入和神经网络。
- **使用边界：** 刚开始就钻完全部证明再碰数据。
- **例子：** 将用户表示为向量，用内积计算匹配程度。
- **关联：** [PCA / UMAP](https://AndyShan11.github.io/ai-learning-atlas/#node=pca)、[Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### 梯度与优化基础

- **位置：** 基础工具与数学 › 数学与统计；先学
- **是什么：** 梯度指示局部上升方向，训练通常沿反方向更新。
- **什么时候用：** 理解损失、学习率和神经网络训练。
- **使用边界：** 误以为下降一次就能找到全局最优。
- **例子：** 改变学习率观察训练损失是否震荡。
- **关联：** [AdamW / SGD](https://AndyShan11.github.io/ai-learning-atlas/#node=adamw)、[余弦退火](https://AndyShan11.github.io/ai-learning-atlas/#node=cosine)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

## 业务分析与因果

从指标描述到实验推断。相关关系不能直接证明因果；分析岗需要把结论变成可执行的业务建议。

### 描述与诊断

#### 指标体系

- **位置：** 业务分析与因果 › 描述与诊断；先学
- **是什么：** 把业务目标拆成有明确分子、分母和时间窗的指标。
- **什么时候用：** 解释收入、转化、增长或成本变化。
- **使用边界：** 总量与比例混用；指标变化被用户构成掩盖。
- **例子：** 收入拆为购买人数 × 人均订单数 × 客单价。
- **关联：** [SQL 与窗口函数](https://AndyShan11.github.io/ai-learning-atlas/#node=sql)、[留存与分群](https://AndyShan11.github.io/ai-learning-atlas/#node=cohort)
- **资料：** [SciPy · 统计模块](https://docs.scipy.org/doc/scipy/reference/stats.html)

#### 探索性数据分析 EDA

- **位置：** 业务分析与因果 › 描述与诊断；先学
- **是什么：** 先看分布、缺失、异常与变量关系。
- **什么时候用：** 接触任何新数据时。
- **使用边界：** 看过测试标签后反复改方案；把相关当因果。
- **例子：** 按时间查看标签比例是否突变。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[缺失值与异常值](https://AndyShan11.github.io/ai-learning-atlas/#node=missing)
- **资料：** [pandas · 入门教程](https://pandas.pydata.org/docs/getting_started/intro_tutorials/)

#### 漏斗分析

- **位置：** 业务分析与因果 › 描述与诊断；先学
- **是什么：** 按事件顺序跟踪用户在哪一步流失。
- **什么时候用：** 注册、支付、申请等多步骤流程。
- **使用边界：** 不同步骤使用不同人群、时间窗或重复计数。
- **例子：** 浏览 → 加购 → 下单 → 支付，各步都以用户去重。
- **关联：** [指标体系](https://AndyShan11.github.io/ai-learning-atlas/#node=metrics)、[SQL 与窗口函数](https://AndyShan11.github.io/ai-learning-atlas/#node=sql)
- **资料：** [SciPy · 统计模块](https://docs.scipy.org/doc/scipy/reference/stats.html)

#### 留存与分群

- **位置：** 业务分析与因果 › 描述与诊断；先学
- **是什么：** 把相同起点或特征的用户放在一起比较。
- **什么时候用：** 区分产品改进和新增用户构成变化。
- **使用边界：** 不同 cohort 的观察长度不一致。
- **例子：** 比较各注册周用户的第 7 天留存。
- **关联：** [指标体系](https://AndyShan11.github.io/ai-learning-atlas/#node=metrics)、[A/B 实验](https://AndyShan11.github.io/ai-learning-atlas/#node=ab)
- **资料：** [SciPy · 统计模块](https://docs.scipy.org/doc/scipy/reference/stats.html)

### 实验与因果

#### A/B 实验

- **位置：** 业务分析与因果 › 实验与因果；先学
- **是什么：** 随机分组后比较干预结果。
- **什么时候用：** 能够控制功能、价格或页面分配时。
- **使用边界：** 频繁偷看后随时停止；忽略样本量与分流异常。
- **例子：** 随机分配新旧页面，预先定义转化指标与实验周期。
- **关联：** [抽样与置信区间](https://AndyShan11.github.io/ai-learning-atlas/#node=uncertainty)、[CUPED 方差缩减](https://AndyShan11.github.io/ai-learning-atlas/#node=cuped)
- **资料：** [SciPy · 统计模块](https://docs.scipy.org/doc/scipy/reference/stats.html)

#### CUPED 方差缩减

- **位置：** 业务分析与因果 › 实验与因果；按需
- **是什么：** 利用实验前协变量降低效果估计的噪声。
- **什么时候用：** 有与结果相关、未受实验影响的历史指标。
- **使用边界：** 把实验后变量当作协变量。
- **例子：** 用实验前消费金额帮助估计实验期间消费差异。
- **关联：** [A/B 实验](https://AndyShan11.github.io/ai-learning-atlas/#node=ab)
- **资料：** [Microsoft · 实验方差缩减](https://www.microsoft.com/en-us/research/articles/deep-dive-into-variance-reduction/)

#### 因果推断与混杂

- **位置：** 业务分析与因果 › 实验与因果；按需
- **是什么：** 明确干预、结果和混杂关系，再选择识别方法。
- **什么时候用：** 无法随机实验但需要估计政策或运营影响。
- **使用边界：** 模型预测准就声称找到了因果。
- **例子：** 画因果图，检查年龄是否同时影响曝光和购买。
- **关联：** [双重差分 DiD](https://AndyShan11.github.io/ai-learning-atlas/#node=did)、[A/B 实验](https://AndyShan11.github.io/ai-learning-atlas/#node=ab)
- **资料：** [DoWhy · 因果推断](https://www.pywhy.org/dowhy/main/)

#### 双重差分 DiD

- **位置：** 业务分析与因果 › 实验与因果；按需
- **是什么：** 比较处理组与对照组的前后变化差。
- **什么时候用：** 存在可比对照和可信平行趋势等条件。
- **使用边界：** 看到两组有差异就直接套用。
- **例子：** 比较试点城市与对照城市政策前后的变化。
- **关联：** [因果推断与混杂](https://AndyShan11.github.io/ai-learning-atlas/#node=causal)
- **资料：** [DoWhy · 因果推断](https://www.pywhy.org/dowhy/main/)

## 学习方式

按反馈来源理解学习。监督与强化在这一维度可比较；深度学习属于模型方法维度，可以与这些学习方式交叉。

### 反馈从哪里来

#### 监督学习

- **位置：** 学习方式 › 反馈从哪里来；先学
- **是什么：** 从输入与已知标签的配对中学习。
- **什么时候用：** 预测价格、销量、类别或风险分数。
- **使用边界：** 把不存在于预测时的字段当输入。
- **例子：** 用历史房屋信息与成交价学习价格预测。
- **关联：** [线性回归 / Ridge / Lasso](https://AndyShan11.github.io/ai-learning-atlas/#node=linear)、[梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 无监督学习

- **位置：** 学习方式 › 反馈从哪里来；先学
- **是什么：** 没有目标标签时寻找数据结构。
- **什么时候用：** 用户分群、降维、探索异常。
- **使用边界：** 聚出的簇不一定具有业务意义。
- **例子：** 按消费行为聚类后检查各群体差异。
- **关联：** [K-means / DBSCAN](https://AndyShan11.github.io/ai-learning-atlas/#node=kmeans)、[PCA / UMAP](https://AndyShan11.github.io/ai-learning-atlas/#node=pca)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 自监督学习

- **位置：** 学习方式 › 反馈从哪里来；按需
- **是什么：** 从数据自身构造预测目标。
- **什么时候用：** 大量无标签文本、图像，或想学通用表征。
- **使用边界：** 以为没有人工标签就没有训练目标。
- **例子：** 遮住词再预测；对同一图像增强后学相似表示。
- **关联：** [Transformer / ViT](https://AndyShan11.github.io/ai-learning-atlas/#node=transformer)、[对比学习](https://AndyShan11.github.io/ai-learning-atlas/#node=contrastive)、[预训练与迁移学习](https://AndyShan11.github.io/ai-learning-atlas/#node=pretrained)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### 半监督学习

- **位置：** 学习方式 › 反馈从哪里来；按需
- **是什么：** 同时利用少量有标签和大量无标签数据。
- **什么时候用：** 标注贵，但额外无标签数据与目标分布接近。
- **使用边界：** 伪标签错误被反复强化。
- **例子：** 先用高置信度预测形成伪标签，再验证收益。
- **关联：** [伪标签](https://AndyShan11.github.io/ai-learning-atlas/#node=pseudo)、[监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=supervised)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 强化学习

- **位置：** 学习方式 › 反馈从哪里来；按需
- **是什么：** 根据状态采取行动，从奖励学习长期决策。
- **什么时候用：** 当前动作影响未来状态和累计收益。
- **使用边界：** 普通固定数据预测题通常不需要；奖励必须可评估。
- **例子：** 库存决策影响后续缺货与成本，在模拟器中训练。
- **关联：** [Q-learning / SARSA](https://AndyShan11.github.io/ai-learning-atlas/#node=qlearning)、[DQN](https://AndyShan11.github.io/ai-learning-atlas/#node=dqn)、[PPO](https://AndyShan11.github.io/ai-learning-atlas/#node=ppo)、[SAC / TD3](https://AndyShan11.github.io/ai-learning-atlas/#node=sac)、[离线 RL · CQL / IQL](https://AndyShan11.github.io/ai-learning-atlas/#node=offline-rl)
- **资料：** [Stable-Baselines3 · RL 选择与实践](https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html)、[Sutton & Barto · 强化学习教材](http://incompleteideas.net/book/the-book-2nd.html)

### 强化学习里怎么选

#### Q-learning / SARSA

- **位置：** 学习方式 › 强化学习里怎么选；按需
- **是什么：** 用状态—动作价值表学习。
- **什么时候用：** 状态和动作空间很小；理解 RL 的起点。
- **使用边界：** 高维图像状态无法靠枚举表格解决。
- **例子：** 在小网格世界中比较探索策略。
- **关联：** [强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[DQN](https://AndyShan11.github.io/ai-learning-atlas/#node=dqn)
- **资料：** [Sutton & Barto · 强化学习教材](http://incompleteideas.net/book/the-book-2nd.html)

#### DQN

- **位置：** 学习方式 › 强化学习里怎么选；按需
- **是什么：** 用神经网络近似动作价值，结合经验回放。
- **什么时候用：** 离散动作、需要处理较复杂状态。
- **使用边界：** 连续动作不能直接枚举取最大值。
- **例子：** 游戏中选择左、右、跳跃动作。
- **关联：** [强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[MLP · 多层感知机](https://AndyShan11.github.io/ai-learning-atlas/#node=mlp)
- **资料：** [Stable-Baselines3 · RL 选择与实践](https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html)

#### PPO

- **位置：** 学习方式 › 强化学习里怎么选；按需
- **是什么：** 限制策略更新幅度的策略梯度方法。
- **什么时候用：** 可持续采集新交互；离散或连续动作任务。
- **使用边界：** 交互昂贵时，样本效率可能成为瓶颈。
- **例子：** 在并行模拟环境中训练控制策略。
- **关联：** [强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[GRPO · 组相对策略优化](https://AndyShan11.github.io/ai-learning-atlas/#node=grpo)
- **资料：** [Stable-Baselines3 · RL 选择与实践](https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html)

#### SAC / TD3

- **位置：** 学习方式 › 强化学习里怎么选；按需
- **是什么：** 复用历史交互的连续控制方法；SAC 加入熵目标。
- **什么时候用：** 连续动作且希望复用交互数据。
- **使用边界：** 默认超参数不保证适用；需要多随机种子评估。
- **例子：** 连续控制机械臂的关节力度。
- **关联：** [强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[PPO](https://AndyShan11.github.io/ai-learning-atlas/#node=ppo)
- **资料：** [Stable-Baselines3 · RL 选择与实践](https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html)

#### 离线 RL · CQL / IQL

- **位置：** 学习方式 › 强化学习里怎么选；进阶
- **是什么：** 只利用已有轨迹训练决策策略。
- **什么时候用：** 无法在线探索，但有较充分的历史状态动作数据。
- **使用边界：** 超出数据覆盖的动作价值可能严重高估。
- **例子：** 先检验日志覆盖与离线评估，再考虑上线。
- **关联：** [强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [CQL · 原论文](https://arxiv.org/abs/2006.04779)、[IQL · 原论文](https://arxiv.org/abs/2110.06169)

#### 多臂老虎机

- **位置：** 学习方式 › 强化学习里怎么选；按需
- **是什么：** 平衡探索与利用，通常不建模长期状态转移。
- **什么时候用：** 推荐或实验分配只需优化即时反馈。
- **使用边界：** 动作有强长期影响时不能简单当老虎机。
- **例子：** 在候选展示方案中分配流量。
- **关联：** [强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[A/B 实验](https://AndyShan11.github.io/ai-learning-atlas/#node=ab)
- **资料：** [Sutton & Barto · 强化学习教材](http://incompleteideas.net/book/the-book-2nd.html)

## 模型与任务

按任务和数据结构找候选模型。算法不是优劣排行榜，先比较合理基线，再提高复杂度。

### 表格预测

#### 线性回归 / Ridge / Lasso

- **位置：** 模型与任务 › 表格预测；先学
- **是什么：** 用特征加权和预测数值，正则化控制复杂度。
- **什么时候用：** 连续目标的低成本基线、解释系数。
- **使用边界：** 非线性很强；相关特征下系数解释要谨慎。
- **例子：** 先预测房价，与树模型比较。
- **关联：** [监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=supervised)、[缩放与标准化](https://AndyShan11.github.io/ai-learning-atlas/#node=scaling)
- **资料：** [scikit-learn · 算法选择图](https://scikit-learn.org/stable/machine_learning_map.html)

#### 逻辑回归

- **位置：** 模型与任务 › 表格预测；先学
- **是什么：** 把线性得分映射为分类概率。
- **什么时候用：** 分类基线、稀疏文本、可解释线性关系。
- **使用边界：** 名称有回归，但主要用于分类。
- **例子：** 预测用户是否流失。
- **关联：** [分类阈值调整](https://AndyShan11.github.io/ai-learning-atlas/#node=threshold)、[概率校准](https://AndyShan11.github.io/ai-learning-atlas/#node=calibration)、[TF-IDF](https://AndyShan11.github.io/ai-learning-atlas/#node=tfidf)
- **资料：** [scikit-learn · 算法选择图](https://scikit-learn.org/stable/machine_learning_map.html)

#### 随机森林

- **位置：** 模型与任务 › 表格预测；先学
- **是什么：** 对多棵随机化决策树的结果进行集成。
- **什么时候用：** 非线性表格基线，减少单树方差。
- **使用边界：** 不要期待树模型自然外推超出训练目标范围。
- **例子：** 对用户属性做分类，比较单树与森林。
- **关联：** [梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)、[融合 / Stacking](https://AndyShan11.github.io/ai-learning-atlas/#node=ensemble)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 梯度提升树 GBDT

- **位置：** 模型与任务 › 表格预测；先学
- **是什么：** 逐步加树，修正当前预测的误差。
- **什么时候用：** 结构化表格的强候选模型。
- **使用边界：** 验证泄漏再强的算法也救不了。
- **例子：** 比较 LightGBM、XGBoost、CatBoost。
- **关联：** [LightGBM](https://AndyShan11.github.io/ai-learning-atlas/#node=lightgbm)、[XGBoost](https://AndyShan11.github.io/ai-learning-atlas/#node=xgboost)、[CatBoost](https://AndyShan11.github.io/ai-learning-atlas/#node=catboost)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### LightGBM

- **位置：** 模型与任务 › 表格预测；按需
- **是什么：** 高效梯度提升树实现。
- **什么时候用：** 中大型表格、较多特征的候选方案。
- **使用边界：** 小数据下过深的树可能过拟合。
- **例子：** 调 num_leaves 与最小叶子样本数。
- **关联：** [梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)、[早停 Early stopping](https://AndyShan11.github.io/ai-learning-atlas/#node=early-stop)、[超参数搜索 · Optuna](https://AndyShan11.github.io/ai-learning-atlas/#node=optuna)
- **资料：** [LightGBM · 文档](https://lightgbm.readthedocs.io/en/stable/)

#### XGBoost

- **位置：** 模型与任务 › 表格预测；按需
- **是什么：** 支持正则化等机制的梯度提升工具。
- **什么时候用：** 表格分类、回归、排序的候选方案。
- **使用边界：** 不要假设某个默认实现必然最好。
- **例子：** 在相同折上与 LightGBM 比较误差。
- **关联：** [梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)、[融合 / Stacking](https://AndyShan11.github.io/ai-learning-atlas/#node=ensemble)
- **资料：** [XGBoost · 文档](https://xgboost.readthedocs.io/en/stable/)

#### CatBoost

- **位置：** 模型与任务 › 表格预测；按需
- **是什么：** 提供类别特征处理的梯度提升工具。
- **什么时候用：** 表格中存在较多类别列时。
- **使用边界：** 仍需遵守时间与分组验证；类别信息不等于免疫泄漏。
- **例子：** 直接标注类别列训练用户流失模型。
- **关联：** [梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)、[目标编码](https://AndyShan11.github.io/ai-learning-atlas/#node=target-encoding)
- **资料：** [CatBoost · 文档](https://catboost.ai/docs/)

#### SVM / 核方法

- **位置：** 模型与任务 › 表格预测；按需
- **是什么：** 寻找间隔较大的分类边界或核回归函数。
- **什么时候用：** 中小规模、特征适合核相似度时。
- **使用边界：** 大样本核训练成本高，注意缩放。
- **例子：** 标准化后比较线性核与 RBF 核。
- **关联：** [缩放与标准化](https://AndyShan11.github.io/ai-learning-atlas/#node=scaling)、[逻辑回归](https://AndyShan11.github.io/ai-learning-atlas/#node=logistic)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### TabPFN · 表格基础模型

- **位置：** 模型与任务 › 表格预测；按需
- **是什么：** 利用预训练模型对表格任务进行预测。
- **什么时候用：** 适配其支持范围的表格数据，可作为比较候选。
- **使用边界：** 检查当前版本规模限制、许可、算力与比赛外部数据规则。
- **例子：** 在同一验证集上与 GBDT 比较时间和分数。
- **关联：** [梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)、[预训练与迁移学习](https://AndyShan11.github.io/ai-learning-atlas/#node=pretrained)
- **资料：** [Prior Labs · TabPFN](https://github.com/PriorLabs/TabPFN)

### 无标签与时间序列

#### K-means / DBSCAN

- **位置：** 模型与任务 › 无标签与时间序列；按需
- **是什么：** 按距离或密度寻找群体结构。
- **什么时候用：** 探索用户分群或空间聚集。
- **使用边界：** 尺度与距离选择会影响结果；簇编号没有自然顺序。
- **例子：** 先标准化，再解释各簇的行为差异。
- **关联：** [无监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=unsupervised)、[缩放与标准化](https://AndyShan11.github.io/ai-learning-atlas/#node=scaling)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### PCA / UMAP

- **位置：** 模型与任务 › 无标签与时间序列；按需
- **是什么：** 将高维数据映射到低维；PCA 线性，UMAP 非线性。
- **什么时候用：** 压缩、可视化和探索结构。
- **使用边界：** 二维图上的分离不等于可泛化分类效果。
- **例子：** PCA 压缩相关数值特征，再交叉验证。
- **关联：** [线性代数](https://AndyShan11.github.io/ai-learning-atlas/#node=linear-algebra)、[无监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=unsupervised)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 异常检测

- **位置：** 模型与任务 › 无标签与时间序列；按需
- **是什么：** 学习正常模式或隔离少数异常点。
- **什么时候用：** 标签很少的异常筛查。
- **使用边界：** 异常不一定是欺诈；需要人工或业务核验。
- **例子：** 用 Isolation Forest 找出交易异常候选。
- **关联：** [无监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=unsupervised)、[指标体系](https://AndyShan11.github.io/ai-learning-atlas/#node=metrics)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 时间序列 · 统计与机器学习

- **位置：** 模型与任务 › 无标签与时间序列；按需
- **是什么：** 利用时间依赖做预测；包括季节基线、ARIMA 和带滞后特征的模型。
- **什么时候用：** 销量、流量、需求预测。
- **使用边界：** 随机切分穿越未来；忽视多步预测时特征是否可用。
- **例子：** 先与上周同期比较，再试滞后特征 + GBDT。
- **关联：** [时间切分与回测](https://AndyShan11.github.io/ai-learning-atlas/#node=time-split)、[滞后 / 滚动 / 交互特征](https://AndyShan11.github.io/ai-learning-atlas/#node=lag)、[梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)
- **资料：** [statsmodels · 时间序列](https://www.statsmodels.org/stable/tsa.html)

#### 排序与推荐

- **位置：** 模型与任务 › 无标签与时间序列；按需
- **是什么：** 学习候选项的相对顺序或用户偏好。
- **什么时候用：** 搜索、推荐、广告候选排序。
- **使用边界：** 只看整体分类准确率，不看排序指标或曝光偏差。
- **例子：** 以用户分组验证 NDCG，比较召回与重排。
- **关联：** [Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [XGBoost · 文档](https://xgboost.readthedocs.io/en/stable/)

### 深度学习 · 模型维度

#### 深度学习

- **位置：** 模型与任务 › 深度学习 · 模型维度；先学
- **是什么：** 用多层神经网络学习表示和预测。
- **什么时候用：** 图像、文本、音频或复杂表示任务。
- **使用边界：** 它可用于监督、自监督和强化学习，不与它们互斥。
- **例子：** CNN 做监督分类；DQN 用网络学动作价值。
- **关联：** [监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=supervised)、[自监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=self-supervised)、[强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[MLP · 多层感知机](https://AndyShan11.github.io/ai-learning-atlas/#node=mlp)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### MLP · 多层感知机

- **位置：** 模型与任务 › 深度学习 · 模型维度；按需
- **是什么：** 基础前馈神经网络。
- **什么时候用：** 学习神经网络训练流程，或作为数值特征模型。
- **使用边界：** 普通表格上不保证胜过树模型。
- **例子：** 标准化数值特征后训练小网络。
- **关联：** [梯度与优化基础](https://AndyShan11.github.io/ai-learning-atlas/#node=gradient)、[AdamW / SGD](https://AndyShan11.github.io/ai-learning-atlas/#node=adamw)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### CNN · 卷积网络

- **位置：** 模型与任务 › 深度学习 · 模型维度；按需
- **是什么：** 利用局部结构与共享卷积核提取特征。
- **什么时候用：** 图像分类、局部模式识别。
- **使用边界：** 不要默认从零训练优于预训练。
- **例子：** 微调预训练 ResNet 做图像分类。
- **关联：** [预训练与迁移学习](https://AndyShan11.github.io/ai-learning-atlas/#node=pretrained)、[数据增强 / Mixup / CutMix](https://AndyShan11.github.io/ai-learning-atlas/#node=augmentation)、[余弦退火](https://AndyShan11.github.io/ai-learning-atlas/#node=cosine)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### Transformer / ViT

- **位置：** 模型与任务 › 深度学习 · 模型维度；按需
- **是什么：** 以注意力等组件组织序列或图像块信息。
- **什么时候用：** 文本、视觉、跨模态任务。
- **使用边界：** 显存、输入长度和数据规模需要匹配。
- **例子：** 微调文本编码器，或用 ViT 处理图像。
- **关联：** [自监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=self-supervised)、[LoRA / QLoRA](https://AndyShan11.github.io/ai-learning-atlas/#node=lora)、[Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### RNN / LSTM / GRU

- **位置：** 模型与任务 › 深度学习 · 模型维度；按需
- **是什么：** 通过递归状态处理序列。
- **什么时候用：** 学习序列建模、特定流式或资源约束任务。
- **使用边界：** 不再作为所有文本任务的默认起点，也没有被彻底淘汰。
- **例子：** 比较小型 GRU 与简单时间序列基线。
- **关联：** [时间序列 · 统计与机器学习](https://AndyShan11.github.io/ai-learning-atlas/#node=time-series)、[Transformer / ViT](https://AndyShan11.github.io/ai-learning-atlas/#node=transformer)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### 图神经网络 GNN

- **位置：** 模型与任务 › 深度学习 · 模型维度；进阶
- **是什么：** 在节点和边之间传递、聚合信息。
- **什么时候用：** 分子、关系网络、图结构预测。
- **使用边界：** 邻接关系或跨集合边可能带来信息泄漏。
- **例子：** 用分子图预测性质，按分子族验证。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[深度学习](https://AndyShan11.github.io/ai-learning-atlas/#node=deep-learning)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

## 验证与特征

验证方式决定你能不能信任一次提升。特征只能使用真实预测时可获得的信息。

### 可信验证

#### 验证集与交叉验证

- **位置：** 验证与特征 › 可信验证；先学
- **是什么：** 用未参与拟合的数据估计泛化效果。
- **什么时候用：** 任何模型比较、调参和融合之前。
- **使用边界：** 反复窥探最终测试集；预处理在全量数据上拟合。
- **例子：** 同一组折比较所有方案，保留最终测试集。
- **关联：** [按用户 / 实体分组切分](https://AndyShan11.github.io/ai-learning-atlas/#node=group-split)、[时间切分与回测](https://AndyShan11.github.io/ai-learning-atlas/#node=time-split)、[数据泄漏检查](https://AndyShan11.github.io/ai-learning-atlas/#node=leakage)
- **资料：** [scikit-learn · 交叉验证](https://scikit-learn.org/stable/modules/cross_validation.html)

#### 按用户 / 实体分组切分

- **位置：** 验证与特征 › 可信验证；先学
- **是什么：** 同一实体的数据放在同一折。
- **什么时候用：** 同一用户、病人、设备有多条记录。
- **使用边界：** 同一实体跨训练与验证导致记忆效应。
- **例子：** 以患者 ID 作为 GroupKFold 分组键。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [scikit-learn · 交叉验证](https://scikit-learn.org/stable/modules/cross_validation.html)

#### 时间切分与回测

- **位置：** 验证与特征 › 可信验证；先学
- **是什么：** 用过去训练，在后来的时间段验证。
- **什么时候用：** 未来销量、金融序列、业务预测。
- **使用边界：** 只移动窗口却让滚动特征看到未来。
- **例子：** 滚动多段回测，模拟真实预测跨度。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[滞后 / 滚动 / 交互特征](https://AndyShan11.github.io/ai-learning-atlas/#node=lag)
- **资料：** [scikit-learn · 交叉验证](https://scikit-learn.org/stable/modules/cross_validation.html)

#### 数据泄漏检查

- **位置：** 验证与特征 › 可信验证；先学
- **是什么：** 识别预测时不可得信息或验证数据进入训练的路径。
- **什么时候用：** 异常高分、本地与榜单差异很大。
- **使用边界：** 把 ID、事后状态或全量统计当作无害特征。
- **例子：** 检查退款时间是否发生在待预测购买之后。
- **关联：** [目标编码](https://AndyShan11.github.io/ai-learning-atlas/#node=target-encoding)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [scikit-learn · 交叉验证](https://scikit-learn.org/stable/modules/cross_validation.html)

#### 指标与目标对齐

- **位置：** 验证与特征 › 可信验证；先学
- **是什么：** 依据目标选择 RMSE、MAE、AUC、LogLoss、F1 等。
- **什么时候用：** 决定训练、调参和提交方案时。
- **使用边界：** 用准确率掩盖类别不平衡；不同指标不可直接比较。
- **例子：** F1 比赛选阈值，LogLoss 比赛关注概率质量。
- **关联：** [分类阈值调整](https://AndyShan11.github.io/ai-learning-atlas/#node=threshold)、[概率校准](https://AndyShan11.github.io/ai-learning-atlas/#node=calibration)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 分组误差与消融

- **位置：** 验证与特征 › 可信验证；先学
- **是什么：** 找错误集中的样本，再单独验证一次改动。
- **什么时候用：** 基线建立后寻找下一步 idea。
- **使用边界：** 多个改动一起做，无法知道谁有效。
- **例子：** 查看高销量区间误差，只新增一个滞后特征。
- **关联：** [探索性数据分析 EDA](https://AndyShan11.github.io/ai-learning-atlas/#node=eda)、[融合 / Stacking](https://AndyShan11.github.io/ai-learning-atlas/#node=ensemble)
- **资料：** [Google · 深度学习调参手册](https://github.com/google-research/tuning_playbook)

### 特征与解释

#### 缺失值与异常值

- **位置：** 验证与特征 › 特征与解释；先学
- **是什么：** 区分缺失原因，并选择填补、指示变量或模型原生处理。
- **什么时候用：** 数据存在空值、单位问题或极端值。
- **使用边界：** 不加判断删除所有极端样本。
- **例子：** 填补年龄，同时保留年龄缺失标记。
- **关联：** [探索性数据分析 EDA](https://AndyShan11.github.io/ai-learning-atlas/#node=eda)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 缩放与标准化

- **位置：** 验证与特征 › 特征与解释；先学
- **是什么：** 调整特征尺度。
- **什么时候用：** 线性正则化、距离模型、神经网络。
- **使用边界：** 在验证集上拟合均值和方差；树模型通常不依赖缩放。
- **例子：** 仅用训练折拟合 StandardScaler。
- **关联：** [SVM / 核方法](https://AndyShan11.github.io/ai-learning-atlas/#node=svm)、[K-means / DBSCAN](https://AndyShan11.github.io/ai-learning-atlas/#node=kmeans)、[MLP · 多层感知机](https://AndyShan11.github.io/ai-learning-atlas/#node=mlp)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 目标编码

- **位置：** 验证与特征 › 特征与解释；按需
- **是什么：** 用类别对应的目标统计表示类别。
- **什么时候用：** 高基数类别可能含有稳定目标信息。
- **使用边界：** 必须采用合适折外或时间安全编码，并对低频类别平滑。
- **例子：** 在训练折内为城市生成房价统计。
- **关联：** [数据泄漏检查](https://AndyShan11.github.io/ai-learning-atlas/#node=leakage)、[CatBoost](https://AndyShan11.github.io/ai-learning-atlas/#node=catboost)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 滞后 / 滚动 / 交互特征

- **位置：** 验证与特征 › 特征与解释；按需
- **是什么：** 把历史信息、窗口统计或变量组合显式提供给模型。
- **什么时候用：** 时间序列或需要业务关系的表格题。
- **使用边界：** 窗口含当期目标；训练可得但实际预测不可得。
- **例子：** 先 shift 再 rolling，生成过去 7 天销量均值。
- **关联：** [时间切分与回测](https://AndyShan11.github.io/ai-learning-atlas/#node=time-split)、[梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### TF-IDF

- **位置：** 验证与特征 › 特征与解释；按需
- **是什么：** 按词频与文档稀有度表示文本。
- **什么时候用：** 低成本文本分类和关键词检索基线。
- **使用边界：** 不是过时废物；但难理解语义和同义表达。
- **例子：** TF-IDF + 逻辑回归预测短文本类别。
- **关联：** [逻辑回归](https://AndyShan11.github.io/ai-learning-atlas/#node=logistic)、[Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### SHAP / 特征重要性

- **位置：** 验证与特征 › 特征与解释；按需
- **是什么：** 分析模型预测依赖哪些输入。
- **什么时候用：** 解释模型行为、排查可疑特征。
- **使用边界：** 贡献不是因果效果；相关特征会影响解释。
- **例子：** 发现事后状态贡献巨大，回查是否泄漏。
- **关联：** [因果推断与混杂](https://AndyShan11.github.io/ai-learning-atlas/#node=causal)、[数据泄漏检查](https://AndyShan11.github.io/ai-learning-atlas/#node=leakage)
- **资料：** [SHAP · 文档](https://shap.readthedocs.io/en/latest/)

#### 超参数搜索 · Optuna

- **位置：** 验证与特征 › 特征与解释；按需
- **是什么：** 系统试验超参数并记录目标值。
- **什么时候用：** 验证可信、基础方案稳定后。
- **使用边界：** 对验证集过拟合；搜索预算超过收益。
- **例子：** 限定预算搜索树深和正则强度。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)
- **资料：** [Optuna · 文档](https://optuna.readthedocs.io/en/stable/)

## 训练与后处理

技巧沿训练流程归位：优化、泛化、效率、预测后处理。可与不同模型组合，不是新的学习范式。

### 优化训练

#### AdamW / SGD

- **位置：** 训练与后处理 › 优化训练；按需
- **是什么：** 按梯度更新模型参数；AdamW 使用解耦权重衰减。
- **什么时候用：** 训练神经网络，需要选择优化器。
- **使用边界：** 只换优化器却不匹配学习率和调度。
- **例子：** 以 AdamW 建基线，再比较优化设置。
- **关联：** [梯度与优化基础](https://AndyShan11.github.io/ai-learning-atlas/#node=gradient)、[余弦退火](https://AndyShan11.github.io/ai-learning-atlas/#node=cosine)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### 余弦退火

- **位置：** 训练与后处理 › 优化训练；按需
- **是什么：** 按余弦曲线调节学习率，常由大逐步降小。
- **什么时候用：** 神经网络固定训练预算下的候选调度。
- **使用边界：** 不是所有训练都更好；普通余弦与带重启版本不同。
- **例子：** 微调 CNN：warmup 后做一次余弦衰减。
- **关联：** [学习率预热 Warmup](https://AndyShan11.github.io/ai-learning-atlas/#node=warmup)、[AdamW / SGD](https://AndyShan11.github.io/ai-learning-atlas/#node=adamw)、[CNN · 卷积网络](https://AndyShan11.github.io/ai-learning-atlas/#node=cnn)
- **资料：** [PyTorch · CosineAnnealingLR](https://docs.pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.CosineAnnealingLR.html)

#### 学习率预热 Warmup

- **位置：** 训练与后处理 › 优化训练；按需
- **是什么：** 训练开始用较小学习率逐渐增加。
- **什么时候用：** 大模型微调或开头训练不稳定。
- **使用边界：** 预热太长可能浪费训练预算。
- **例子：** 先预热若干步，再切到主调度。
- **关联：** [余弦退火](https://AndyShan11.github.io/ai-learning-atlas/#node=cosine)、[Transformer / ViT](https://AndyShan11.github.io/ai-learning-atlas/#node=transformer)
- **资料：** [Google · 深度学习调参手册](https://github.com/google-research/tuning_playbook)

#### 早停 Early stopping

- **位置：** 训练与后处理 › 优化训练；按需
- **是什么：** 验证表现长期不改善时停止并保留较好模型。
- **什么时候用：** 树模型或神经网络出现过拟合。
- **使用边界：** 在测试集上决定停在哪一轮。
- **例子：** 按验证损失保存最佳 checkpoint。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)
- **资料：** [Google · 深度学习调参手册](https://github.com/google-research/tuning_playbook)

#### 梯度裁剪

- **位置：** 训练与后处理 › 优化训练；按需
- **是什么：** 限制梯度范数或数值幅度。
- **什么时候用：** 观察到梯度爆炸或偶发更新异常。
- **使用边界：** 不能修复坏数据、错误损失或数值实现问题。
- **例子：** 记录梯度范数，再设置合理裁剪阈值。
- **关联：** [梯度与优化基础](https://AndyShan11.github.io/ai-learning-atlas/#node=gradient)、[混合精度 / 梯度累积](https://AndyShan11.github.io/ai-learning-atlas/#node=amp)
- **资料：** [Google · 深度学习调参手册](https://github.com/google-research/tuning_playbook)

### 泛化与效率

#### 权重衰减 / Dropout

- **位置：** 训练与后处理 › 泛化与效率；按需
- **是什么：** 约束权重或随机丢弃激活，控制模型过拟合。
- **什么时候用：** 训练很好而验证较差。
- **使用边界：** 正则过强导致欠拟合；方法适配不同模型。
- **例子：** 调权重衰减时固定验证折与训练预算。
- **关联：** [AdamW / SGD](https://AndyShan11.github.io/ai-learning-atlas/#node=adamw)、[早停 Early stopping](https://AndyShan11.github.io/ai-learning-atlas/#node=early-stop)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### 数据增强 / Mixup / CutMix

- **位置：** 训练与后处理 › 泛化与效率；按需
- **是什么：** 构造符合任务语义的数据变化。
- **什么时候用：** 图像等任务的数据不足或泛化不足。
- **使用边界：** 翻转、裁剪可能改变标签含义。
- **例子：** 自然图像轻量增强；医疗方向性任务先核查语义。
- **关联：** [CNN · 卷积网络](https://AndyShan11.github.io/ai-learning-atlas/#node=cnn)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### 伪标签

- **位置：** 训练与后处理 › 泛化与效率；按需
- **是什么：** 把模型预测作为额外监督信号。
- **什么时候用：** 存在相关无标签数据，且比赛规则允许。
- **使用边界：** 错误标签累积；不可用测试真值筛选。
- **例子：** 只用可信伪标签，独立验证收益。
- **关联：** [半监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=semi-supervised)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 混合精度 / 梯度累积

- **位置：** 训练与后处理 › 泛化与效率；按需
- **是什么：** 降低计算精度或分批累积梯度，节省资源。
- **什么时候用：** 显存紧张或训练吞吐不足。
- **使用边界：** 检查数值稳定；累积不总等价于真正大 batch。
- **例子：** 用自动混合精度并监测 NaN。
- **关联：** [梯度裁剪](https://AndyShan11.github.io/ai-learning-atlas/#node=gradient-clip)、[LoRA / QLoRA](https://AndyShan11.github.io/ai-learning-atlas/#node=lora)
- **资料：** [PyTorch · 自动混合精度](https://docs.pytorch.org/docs/stable/amp.html)

#### EMA / SWA

- **位置：** 训练与后处理 › 泛化与效率；进阶
- **是什么：** 对训练过程中的模型权重做平均。
- **什么时候用：** 权重波动较大，想改善稳定性。
- **使用边界：** 需要正确处理模型缓冲状态与额外资源。
- **例子：** 同样验证流程比较末轮权重与平均权重。
- **关联：** [融合 / Stacking](https://AndyShan11.github.io/ai-learning-atlas/#node=ensemble)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

### 预测后处理

#### 概率校准

- **位置：** 训练与后处理 › 预测后处理；按需
- **是什么：** 让预测概率与实际发生频率更一致。
- **什么时候用：** 决策依赖概率质量，而非仅类别。
- **使用边界：** 必须使用独立或交叉验证的校准预测。
- **例子：** 检查可靠性图、LogLoss 与 Brier 分数。
- **关联：** [温度缩放 Temperature scaling](https://AndyShan11.github.io/ai-learning-atlas/#node=temperature)、[分类阈值调整](https://AndyShan11.github.io/ai-learning-atlas/#node=threshold)
- **资料：** [scikit-learn · 概率校准](https://scikit-learn.org/stable/modules/calibration.html)

#### 温度缩放 Temperature scaling

- **位置：** 训练与后处理 › 预测后处理；按需
- **是什么：** 在 logits 上除以拟合出的正温度，再得到概率。
- **什么时候用：** 神经分类模型过度自信，希望校准置信度。
- **使用边界：** 标准单温度不改变 argmax 类别；与生成采样温度用途不同。
- **例子：** 在独立校准集拟合 T，再评估未见数据的概率质量。
- **关联：** [概率校准](https://AndyShan11.github.io/ai-learning-atlas/#node=calibration)、[逻辑回归](https://AndyShan11.github.io/ai-learning-atlas/#node=logistic)
- **资料：** [温度缩放原论文 · 2017](https://arxiv.org/abs/1706.04599)

#### 分类阈值调整

- **位置：** 训练与后处理 › 预测后处理；按需
- **是什么：** 把概率转换成类别时选择合适分界。
- **什么时候用：** 优化 F1、召回率或业务错判成本。
- **使用边界：** 不等于概率校准；不能用测试标签挑阈值。
- **例子：** 在验证集选择满足召回要求的阈值。
- **关联：** [指标与目标对齐](https://AndyShan11.github.io/ai-learning-atlas/#node=scoring)、[概率校准](https://AndyShan11.github.io/ai-learning-atlas/#node=calibration)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 融合 / Stacking

- **位置：** 训练与后处理 › 预测后处理；按需
- **是什么：** 组合具有互补误差的模型预测。
- **什么时候用：** 多个可靠模型在不同样本上各有所长。
- **使用边界：** stacking 的第二层必须使用折外预测，不能吃训练内预测。
- **例子：** 用 OOF 预测训练线性融合器，再评估独立数据。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[梯度提升树 GBDT](https://AndyShan11.github.io/ai-learning-atlas/#node=gbdt)、[CNN · 卷积网络](https://AndyShan11.github.io/ai-learning-atlas/#node=cnn)
- **资料：** [scikit-learn · 用户指南](https://scikit-learn.org/stable/user_guide.html)

#### 保形预测 Conformal prediction

- **位置：** 训练与后处理 › 预测后处理；进阶
- **是什么：** 在适当假设下构造有边际覆盖保证的集合或区间。
- **什么时候用：** 需要表达预测不确定性。
- **使用边界：** 分布漂移会破坏保证；边际覆盖不等于每个人群覆盖。
- **例子：** 用独立校准残差构造房价预测区间。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[概率校准](https://AndyShan11.github.io/ai-learning-atlas/#node=calibration)
- **资料：** [保形预测入门论文](https://arxiv.org/abs/2107.07511)

#### Bootstrap

- **位置：** 训练与后处理 › 预测后处理；按需
- **是什么：** 通过重采样估计统计量的波动。
- **什么时候用：** 估计指标或模型差异的不确定性。
- **使用边界：** 时间或实体相关数据不能随意逐行重采样。
- **例子：** 按用户重采样，比较两模型指标差异。
- **关联：** [抽样与置信区间](https://AndyShan11.github.io/ai-learning-atlas/#node=uncertainty)、[按用户 / 实体分组切分](https://AndyShan11.github.io/ai-learning-atlas/#node=group-split)
- **资料：** [SciPy · 统计模块](https://docs.scipy.org/doc/scipy/reference/stats.html)

## 基础模型与生成式 AI

理解近年的实践变化：先使用预训练能力，再决定检索、微调或后训练。新方法是补充，不自动替代经典方法。

### 表示与生成

#### 预训练与迁移学习

- **位置：** 基础模型与生成式 AI › 表示与生成；按需
- **是什么：** 复用已学到的表示，再适配目标任务。
- **什么时候用：** 图像、文本、音频样本有限。
- **使用边界：** 检查预训练数据规则、模型许可和领域差异。
- **例子：** 先冻结编码器做基线，再微调。
- **关联：** [CNN · 卷积网络](https://AndyShan11.github.io/ai-learning-atlas/#node=cnn)、[Transformer / ViT](https://AndyShan11.github.io/ai-learning-atlas/#node=transformer)、[LoRA / QLoRA](https://AndyShan11.github.io/ai-learning-atlas/#node=lora)
- **资料：** [Hugging Face · Transformers](https://huggingface.co/docs/transformers/index)

#### Embedding / 语义向量

- **位置：** 基础模型与生成式 AI › 表示与生成；按需
- **是什么：** 将文本或其他对象表示为可比较的向量。
- **什么时候用：** 语义搜索、相似样本、聚类与下游特征。
- **使用边界：** 相似度高不保证事实一致，需按任务评估。
- **例子：** 将商品描述编码后检索相似商品。
- **关联：** [RAG · 检索增强生成](https://AndyShan11.github.io/ai-learning-atlas/#node=rag)、[K-means / DBSCAN](https://AndyShan11.github.io/ai-learning-atlas/#node=kmeans)、[排序与推荐](https://AndyShan11.github.io/ai-learning-atlas/#node=ranking)
- **资料：** [Sentence Transformers · 文档](https://sbert.net/)

#### 对比学习

- **位置：** 基础模型与生成式 AI › 表示与生成；按需
- **是什么：** 拉近匹配样本表示，区分不匹配样本。
- **什么时候用：** 无标签表示学习或跨模态对齐。
- **使用边界：** 正负样本定义错误会学到错误相似性。
- **例子：** 同一图像的两个增强视图作为正对。
- **关联：** [自监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=self-supervised)、[Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)
- **资料：** [动手学深度学习 · 中文](https://zh.d2l.ai/)

#### 扩散 / 流匹配生成模型

- **位置：** 基础模型与生成式 AI › 表示与生成；进阶
- **是什么：** 通过学习去噪或数据分布之间的流来生成样本。
- **什么时候用：** 图像、音频等生成与编辑任务。
- **使用边界：** 普通表格预测不应因为流行而强行使用。
- **例子：** 用预训练扩散模型进行图像编辑。
- **关联：** [预训练与迁移学习](https://AndyShan11.github.io/ai-learning-atlas/#node=pretrained)、[LoRA / QLoRA](https://AndyShan11.github.io/ai-learning-atlas/#node=lora)
- **资料：** [Hugging Face · Diffusers](https://huggingface.co/docs/diffusers/index)

#### 多模态模型

- **位置：** 基础模型与生成式 AI › 表示与生成；按需
- **是什么：** 联合处理文本、图像、音频等信息。
- **什么时候用：** 文档理解、图文检索或跨模态任务。
- **使用边界：** 单模态已足够时，先衡量额外成本。
- **例子：** 用图像与商品描述一起预测商品类别。
- **关联：** [Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)、[Transformer / ViT](https://AndyShan11.github.io/ai-learning-atlas/#node=transformer)
- **资料：** [Hugging Face · Transformers](https://huggingface.co/docs/transformers/index)

### 适配与系统

#### RAG · 检索增强生成

- **位置：** 基础模型与生成式 AI › 适配与系统；按需
- **是什么：** 先检索相关资料，再把资料交给生成模型。
- **什么时候用：** 知识需更新、有私有文档或需要证据出处。
- **使用边界：** 检索错误、文档权限与生成忠实性需要分别验证。
- **例子：** 检索产品手册片段，让回答附对应来源。
- **关联：** [Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)、[混合检索与重排](https://AndyShan11.github.io/ai-learning-atlas/#node=rerank)、[生成系统评估](https://AndyShan11.github.io/ai-learning-atlas/#node=llm-eval)
- **资料：** [RAG 原论文 · 2020](https://arxiv.org/abs/2005.11401)

#### 混合检索与重排

- **位置：** 基础模型与生成式 AI › 适配与系统；按需
- **是什么：** 组合关键词和向量召回，再用重排模型筛选候选。
- **什么时候用：** 只用向量检索漏掉精确名称或关键证据。
- **使用边界：** 召回没找到的文档无法靠重排救回。
- **例子：** 关键词 + 向量检索合并候选，再重排。
- **关联：** [RAG · 检索增强生成](https://AndyShan11.github.io/ai-learning-atlas/#node=rag)、[TF-IDF](https://AndyShan11.github.io/ai-learning-atlas/#node=tfidf)、[Embedding / 语义向量](https://AndyShan11.github.io/ai-learning-atlas/#node=embeddings)
- **资料：** [Sentence Transformers · 文档](https://sbert.net/)

#### LoRA / QLoRA

- **位置：** 基础模型与生成式 AI › 适配与系统；按需
- **是什么：** 以低秩增量微调；QLoRA 结合量化基础权重节省显存。
- **什么时候用：** 想适配预训练模型，但全量微调成本高。
- **使用边界：** 检查任务适配、量化支持；不保证等同全量微调。
- **例子：** 在标注文本上微调小部分参数。
- **关联：** [预训练与迁移学习](https://AndyShan11.github.io/ai-learning-atlas/#node=pretrained)、[SFT · 监督微调](https://AndyShan11.github.io/ai-learning-atlas/#node=sft)、[混合精度 / 梯度累积](https://AndyShan11.github.io/ai-learning-atlas/#node=amp)
- **资料：** [Hugging Face · PEFT](https://huggingface.co/docs/peft/index)

#### SFT · 监督微调

- **位置：** 基础模型与生成式 AI › 适配与系统；按需
- **是什么：** 用期望输入输出样例适配模型行为。
- **什么时候用：** 有可靠示范，想学格式、风格或任务行为。
- **使用边界：** 不能把微调当作随时更新事实库的首选。
- **例子：** 用经过检查的问答样例训练任务格式。
- **关联：** [监督学习](https://AndyShan11.github.io/ai-learning-atlas/#node=supervised)、[LoRA / QLoRA](https://AndyShan11.github.io/ai-learning-atlas/#node=lora)、[DPO · 直接偏好优化](https://AndyShan11.github.io/ai-learning-atlas/#node=dpo)
- **资料：** [Hugging Face · Transformers](https://huggingface.co/docs/transformers/index)

#### 工具调用与 Agent

- **位置：** 基础模型与生成式 AI › 适配与系统；按需
- **是什么：** 模型结合工具和控制流程执行多步任务。
- **什么时候用：** 问题确实需要查询、计算或分阶段操作。
- **使用边界：** Agent 不必使用强化学习；要控制工具权限和失败重试。
- **例子：** 先查数据库，再计算结果并生成解释。
- **关联：** [RAG · 检索增强生成](https://AndyShan11.github.io/ai-learning-atlas/#node=rag)、[生成系统评估](https://AndyShan11.github.io/ai-learning-atlas/#node=llm-eval)、[SQL 与窗口函数](https://AndyShan11.github.io/ai-learning-atlas/#node=sql)
- **资料：** [Hugging Face · Transformers](https://huggingface.co/docs/transformers/index)

#### 生成系统评估

- **位置：** 基础模型与生成式 AI › 适配与系统；先学
- **是什么：** 分别检查正确性、证据、成本、延迟与失败情况。
- **什么时候用：** 更换模型、提示词、检索或微调方法时。
- **使用边界：** 只凭几个漂亮样例判断整体提升。
- **例子：** 建立固定问题集，对答案和引文单独评分。
- **关联：** [验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)、[RAG · 检索增强生成](https://AndyShan11.github.io/ai-learning-atlas/#node=rag)、[实验跟踪](https://AndyShan11.github.io/ai-learning-atlas/#node=tracking)
- **资料：** [Hugging Face · Transformers](https://huggingface.co/docs/transformers/index)

### 偏好优化与强化后训练

#### DPO · 直接偏好优化

- **位置：** 基础模型与生成式 AI › 偏好优化与强化后训练；进阶
- **是什么：** 使用偏好回答对直接优化模型。
- **什么时候用：** 有 chosen / rejected 成对数据，希望调整回答偏好。
- **使用边界：** 不等同于在线环境交互 RL，也不需要显式训练奖励模型。
- **例子：** 用经过审核的回答对调整偏好。
- **关联：** [SFT · 监督微调](https://AndyShan11.github.io/ai-learning-atlas/#node=sft)、[LoRA / QLoRA](https://AndyShan11.github.io/ai-learning-atlas/#node=lora)、[GRPO · 组相对策略优化](https://AndyShan11.github.io/ai-learning-atlas/#node=grpo)
- **资料：** [Hugging Face · DPO](https://huggingface.co/docs/trl/dpo_trainer)

#### GRPO · 组相对策略优化

- **位置：** 基础模型与生成式 AI › 偏好优化与强化后训练；进阶
- **是什么：** 对同一提示的多次生成比较奖励，进行策略优化。
- **什么时候用：** 能够给生成结果可靠打分，有足够采样预算。
- **使用边界：** 奖励投机、采样成本、训练稳定性都要评估。
- **例子：** 可验证答案的任务中对一组候选计算奖励。
- **关联：** [强化学习](https://AndyShan11.github.io/ai-learning-atlas/#node=rl)、[PPO](https://AndyShan11.github.io/ai-learning-atlas/#node=ppo)、[SFT · 监督微调](https://AndyShan11.github.io/ai-learning-atlas/#node=sft)、[生成系统评估](https://AndyShan11.github.io/ai-learning-atlas/#node=llm-eval)
- **资料：** [Hugging Face · GRPO](https://huggingface.co/docs/trl/grpo_trainer)

## 工程与交付

让分析和模型可复现、可使用、可维护。基础工程先学，分布式系统按数据规模再学。

### 从实验到交付

#### Git 与环境管理

- **位置：** 工程与交付 › 从实验到交付；先学
- **是什么：** 记录代码版本、依赖和实验入口。
- **什么时候用：** 需要复现、协作、回退改动。
- **使用边界：** 只保存 notebook 输出，没有环境与随机种子记录。
- **例子：** 每次提交记录数据版本和运行命令。
- **关联：** [实验跟踪](https://AndyShan11.github.io/ai-learning-atlas/#node=tracking)、[验证集与交叉验证](https://AndyShan11.github.io/ai-learning-atlas/#node=validation)
- **资料：** [Git · 官方入门教材](https://git-scm.com/book/zh/v2)

#### 实验跟踪

- **位置：** 工程与交付 › 从实验到交付；先学
- **是什么：** 记录数据、参数、指标与模型产物。
- **什么时候用：** 比较多个模型、调参或团队协作。
- **使用边界：** 只记录最好成绩，忽略失败和计算成本。
- **例子：** 建立实验表：假设、改动、验证分数、结论。
- **关联：** [超参数搜索 · Optuna](https://AndyShan11.github.io/ai-learning-atlas/#node=optuna)、[分组误差与消融](https://AndyShan11.github.io/ai-learning-atlas/#node=error-analysis)
- **资料：** [MLflow · 文档](https://mlflow.org/docs/latest/)

#### 部署与监控

- **位置：** 工程与交付 › 从实验到交付；按需
- **是什么：** 把模型或分析交付为可运行服务、批处理或报告。
- **什么时候用：** 成果开始被他人定期使用。
- **使用边界：** 忽略输入变化、缺失字段和性能下降。
- **例子：** 监控新数据分布与可获得的线上标签表现。
- **关联：** [数据与概念漂移](https://AndyShan11.github.io/ai-learning-atlas/#node=drift)、[Git 与环境管理](https://AndyShan11.github.io/ai-learning-atlas/#node=git)
- **资料：** [MLflow · 文档](https://mlflow.org/docs/latest/)

#### 数据与概念漂移

- **位置：** 工程与交付 › 从实验到交付；按需
- **是什么：** 输入分布或输入—目标关系随时间改变。
- **什么时候用：** 上线表现下降、验证与真实使用出现差异。
- **使用边界：** 分布变了不代表效果必然变差；需要标签或代理证据。
- **例子：** 按周检查数据分布和分组错误。
- **关联：** [时间切分与回测](https://AndyShan11.github.io/ai-learning-atlas/#node=time-split)、[部署与监控](https://AndyShan11.github.io/ai-learning-atlas/#node=deployment)
- **资料：** [MLflow · 文档](https://mlflow.org/docs/latest/)

#### Spark / 分布式处理

- **位置：** 工程与交付 › 从实验到交付；进阶
- **是什么：** 跨机器并行处理数据与计算。
- **什么时候用：** 单机资源确实不足或已有集群环境。
- **使用边界：** 小数据不必先搭大数据平台。
- **例子：** 先尝试列式存储和本地 SQL，再评估分布式需求。
- **关联：** [DuckDB / Polars](https://AndyShan11.github.io/ai-learning-atlas/#node=duckdb)、[SQL 与窗口函数](https://AndyShan11.github.io/ai-learning-atlas/#node=sql)
- **资料：** [Apache Spark · 文档](https://spark.apache.org/docs/latest/)

## 组合方案

### 表格分类 · 从可信基线开始

类别特征较多，预测是否流失。

验证集与交叉验证 → CatBoost → 分组误差与消融 → 超参数搜索 · Optuna → 融合 / Stacking

先确定分组或时间切分，再比较特征和模型。融合只在误差互补时尝试。

验证：用相同 OOF 折比较目标指标；记录每一步增益与波动。

### 图像分类 · 小数据微调

有标注图像，但从零训练容易过拟合。

预训练与迁移学习 → 数据增强 / Mixup / CutMix → AdamW / SGD → 学习率预热 Warmup → 余弦退火 → 早停 Early stopping

复用表示、用合理增强扩展样本变化，再控制优化节奏。各技巧不是必选套餐。

验证：与不加新技巧的微调基线逐项比较；按实体或来源切分。

### 销量预测 · 用过去预测未来

存在季节性和近期需求变化。

时间切分与回测 → 时间序列 · 统计与机器学习 → 滞后 / 滚动 / 交互特征 → 梯度提升树 GBDT → 分组误差与消融

先做季节基线，再加入真实预测时可获得的历史信息。

验证：多时间窗口回测；确认多步预测没有使用未来真实销量。

### 概率不可靠 · 校准再决策

模型分类还行，但经常过度自信。

指标与目标对齐 → 概率校准 → 温度缩放 Temperature scaling → 分类阈值调整

先判断是概率问题还是决策阈值问题。单温度缩放不会改变最高概率类别。

验证：用独立校准集拟合，另外评估 LogLoss / Brier；阈值按业务指标确定。

### 知识问答 · 把证据带进回答

需要回答私有、更新频繁的文档问题。

Embedding / 语义向量 → 混合检索与重排 → RAG · 检索增强生成 → 生成系统评估

检索解决资料获取，重排提高候选相关性，评估分别检查检索与回答。

验证：固定问题集检查证据召回、引文支持和拒答；不要只看语言流畅度。

### 业务改版 · 验证真实收益

上线新流程前，想知道是否提高转化。

指标体系 → 抽样与置信区间 → A/B 实验 → CUPED 方差缩减 → 可视化与表达

先定指标与随机分流，历史协变量有效时才使用 CUPED。

验证：预先确定样本量、周期和分析规则；检查分流异常与分组效果。

### 控制任务 · 先判断是否真需要 RL

动作影响未来状态，希望提高长期收益。

强化学习 → 多臂老虎机 → PPO → SAC / TD3 → 实验跟踪

先判断即时反馈是否足够；需要序列决策时，再按动作类型与交互成本选择 PPO 或 SAC。

验证：这些是条件分支，不是串联所有算法。单独测试环境、多种子评估，记录交互成本。

### 生成行为适配 · 选正确反馈

模型知识够用，但输出行为不符合任务。

生成系统评估 → SFT · 监督微调 → LoRA / QLoRA → DPO · 直接偏好优化 → GRPO · 组相对策略优化

示范数据对应 SFT；偏好对对应 DPO；能可靠打分且有预算时才考虑 GRPO。LoRA 是可组合的微调手段。

验证：这些也是条件选择。保留未见任务与回归集，防止奖励投机和原能力退化。

## 来源说明

设计思路受到 [AMAI AI Expert Roadmap](https://github.com/AMAI-GmbH/AI-Expert-Roadmap) 启发；界面与内容重新编写，不复用原图。资料链接以官方文档与原始论文为主。方法简述为教学归纳，适用条件不是性能保证；版本与限制请以原文为准。
