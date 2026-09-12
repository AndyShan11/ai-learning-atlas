// 结构与正文分离；所有交叉关系通过稳定 id 连接。priority 是本地图的学习建议，不是算法排名。
export const reviewed = '2026-09-12';
export const sources = {
  cql:['CQL · 原论文','https://arxiv.org/abs/2006.04779'],
  iql:['IQL · 原论文','https://arxiv.org/abs/2110.06169'],
  cuped:['Microsoft · 实验方差缩减','https://www.microsoft.com/en-us/research/articles/deep-dive-into-variance-reduction/'],
  git:['Git · 官方入门教材','https://git-scm.com/book/zh/v2'],
  sklearn:['scikit-learn · 用户指南','https://scikit-learn.org/stable/user_guide.html'],
  selection:['scikit-learn · 算法选择图','https://scikit-learn.org/stable/machine_learning_map.html'],
  validation:['scikit-learn · 交叉验证','https://scikit-learn.org/stable/modules/cross_validation.html'],
  calibration:['scikit-learn · 概率校准','https://scikit-learn.org/stable/modules/calibration.html'],
  temperature:['温度缩放原论文 · 2017','https://arxiv.org/abs/1706.04599'],
  d2l:['动手学深度学习 · 中文','https://zh.d2l.ai/'],
  tuning:['Google · 深度学习调参手册','https://github.com/google-research/tuning_playbook'],
  cosine:['PyTorch · CosineAnnealingLR','https://docs.pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.CosineAnnealingLR.html'],
  rl:['Stable-Baselines3 · RL 选择与实践','https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html'],
  sutton:['Sutton & Barto · 强化学习教材','http://incompleteideas.net/book/the-book-2nd.html'],
  peft:['Hugging Face · PEFT','https://huggingface.co/docs/peft/index'],
  dpo:['Hugging Face · DPO','https://huggingface.co/docs/trl/dpo_trainer'],
  grpo:['Hugging Face · GRPO','https://huggingface.co/docs/trl/grpo_trainer'],
  rag:['RAG 原论文 · 2020','https://arxiv.org/abs/2005.11401'],
  tabpfn:['Prior Labs · TabPFN','https://github.com/PriorLabs/TabPFN'],
  catboost:['CatBoost · 文档','https://catboost.ai/docs/'],
  lightgbm:['LightGBM · 文档','https://lightgbm.readthedocs.io/en/stable/'],
  xgboost:['XGBoost · 文档','https://xgboost.readthedocs.io/en/stable/'],
  optuna:['Optuna · 文档','https://optuna.readthedocs.io/en/stable/'],
  pandas:['pandas · 入门教程','https://pandas.pydata.org/docs/getting_started/intro_tutorials/'],
  sql:['PostgreSQL · SQL 教程','https://www.postgresql.org/docs/current/tutorial-sql.html'],
  stats:['SciPy · 统计模块','https://docs.scipy.org/doc/scipy/reference/stats.html'],
  causal:['DoWhy · 因果推断','https://www.pywhy.org/dowhy/main/'],
  shap:['SHAP · 文档','https://shap.readthedocs.io/en/latest/'],
  conformal:['保形预测入门论文','https://arxiv.org/abs/2107.07511'],
  hf:['Hugging Face · Transformers','https://huggingface.co/docs/transformers/index'],
  diffusion:['Hugging Face · Diffusers','https://huggingface.co/docs/diffusers/index'],
  sentence:['Sentence Transformers · 文档','https://sbert.net/'],
  mlflow:['MLflow · 文档','https://mlflow.org/docs/latest/'],
  duckdb:['DuckDB · 文档','https://duckdb.org/docs/stable/'],
  spark:['Apache Spark · 文档','https://spark.apache.org/docs/latest/'],
  timeseries:['statsmodels · 时间序列','https://www.statsmodels.org/stable/tsa.html'],
  amp:['PyTorch · 自动混合精度','https://docs.pytorch.org/docs/stable/amp.html']
};
export const domains = [
  {id:'foundation',title:'基础工具与数学',en:'FOUNDATIONS',color:'#607965',hint:'读懂数据，也读懂模型',summary:'编程、数据处理和数学是其他模块的支撑。按具体概念补基础，不必先学完所有数学。',paths:['analyst','kaggle','genai']},
  {id:'analysis',title:'业务分析与因果',en:'ANALYTICS & CAUSALITY',color:'#a2733c',hint:'发生什么，为什么，做了会怎样',summary:'从指标描述到实验推断。相关关系不能直接证明因果；分析岗需要把结论变成可执行的业务建议。',paths:['analyst']},
  {id:'learning',title:'学习方式',en:'LEARNING PARADIGMS',color:'#3a7f90',hint:'监督、无监督、自监督、强化',summary:'按反馈来源理解学习。监督与强化在这一维度可比较；深度学习属于模型方法维度，可以与这些学习方式交叉。',paths:['analyst','kaggle','genai']},
  {id:'models',title:'模型与任务',en:'MODELS & TASKS',color:'#7364a1',hint:'表格、图像、文本、时间序列',summary:'按任务和数据结构找候选模型。算法不是优劣排行榜，先比较合理基线，再提高复杂度。',paths:['kaggle','genai']},
  {id:'workflow',title:'验证与特征',en:'EXPERIMENT WORKFLOW',color:'#447c68',hint:'先保证分数可信，再寻找提升',summary:'验证方式决定你能不能信任一次提升。特征只能使用真实预测时可获得的信息。',paths:['analyst','kaggle','genai']},
  {id:'toolbox',title:'训练与后处理',en:'TRAINING TOOLBOX',color:'#b17254',hint:'余弦退火、温度缩放放在这里',summary:'技巧沿训练流程归位：优化、泛化、效率、预测后处理。可与不同模型组合，不是新的学习范式。',paths:['kaggle','genai']},
  {id:'modern',title:'基础模型与生成式 AI',en:'FOUNDATION MODELS',color:'#567fad',hint:'预训练、检索、微调、偏好优化',summary:'理解近年的实践变化：先使用预训练能力，再决定检索、微调或后训练。新方法是补充，不自动替代经典方法。',paths:['genai','kaggle']},
  {id:'engineering',title:'工程与交付',en:'ENGINEERING',color:'#7c7970',hint:'复现、部署、监控与协作',summary:'让分析和模型可复现、可使用、可维护。基础工程先学，分布式系统按数据规模再学。',paths:['analyst','kaggle','genai']}
];
export const sections=[];
export const nodes=[];
function section(id,domain,title,source,rows){
  sections.push({id,domain,title});
  rows.forEach(([key,name,what,when,avoid,example,related='',priority='按需',refs=source])=>nodes.push({id:key,title:name,section:id,domain,what,when,avoid,example,related:related.split(',').filter(Boolean),priority,sources:refs.split(','),reviewed}));
}
section('data-basics','foundation','数据工具','pandas',[
 ['python','Python 与 pandas','用代码读取、清洗、聚合数据。','需要重复分析、处理比赛数据时。','只复制代码而不检查行数、类型和连接结果。','按用户聚合消费金额，再与用户表连接。','sql,eda','先学'],
 ['sql','SQL 与窗口函数','在数据库内筛选、连接、分组与计算窗口统计。','取数、漏斗、留存、排序、累计指标。','多对多连接放大行数；空值含义不清。','用 LAG 比较每个用户两次购买的时间。','python,metrics','先学','sql'],
 ['visual','可视化与表达','用合适图形表达分布、差异与趋势。','检查异常、比较群体、向业务说明结论。','截断坐标制造夸张差异；只给图不交代口径。','画各渠道的转化率及样本量。','eda,uncertainty','先学'],
 ['duckdb','DuckDB / Polars','本地分析工具，补充 pandas 的执行与内存选择。','本地较大表格、列式文件或 SQL 分析。','数据很小时先增加工具复杂度。','直接查询 Parquet，再只取汇总结果。','sql,python','按需','duckdb']
]);
section('math','foundation','数学与统计','stats',[
 ['probability','概率与分布','用概率描述不确定性；理解条件概率、期望与方差。','理解采样、分类概率、统计检验。','把条件概率的方向弄反。','知道检测阳性不等于一定患病。','uncertainty,logistic','先学'],
 ['uncertainty','抽样与置信区间','估计结果的不确定程度。','样本推广到总体，比较实验结果。','忽略非随机抽样；把置信区间理解成个体范围。','给转化率差异报告区间，而非只报点估计。','ab,bootstrap','先学'],
 ['linear-algebra','线性代数','向量、矩阵、内积和矩阵分解的语言。','理解回归、PCA、嵌入和神经网络。','刚开始就钻完全部证明再碰数据。','将用户表示为向量，用内积计算匹配程度。','pca,embeddings','先学','d2l'],
 ['gradient','梯度与优化基础','梯度指示局部上升方向，训练通常沿反方向更新。','理解损失、学习率和神经网络训练。','误以为下降一次就能找到全局最优。','改变学习率观察训练损失是否震荡。','adamw,cosine','先学','d2l']
]);
section('business','analysis','描述与诊断','stats',[
 ['metrics','指标体系','把业务目标拆成有明确分子、分母和时间窗的指标。','解释收入、转化、增长或成本变化。','总量与比例混用；指标变化被用户构成掩盖。','收入拆为购买人数 × 人均订单数 × 客单价。','sql,cohort','先学'],
 ['eda','探索性数据分析 EDA','先看分布、缺失、异常与变量关系。','接触任何新数据时。','看过测试标签后反复改方案；把相关当因果。','按时间查看标签比例是否突变。','validation,missing','先学','pandas'],
 ['funnel','漏斗分析','按事件顺序跟踪用户在哪一步流失。','注册、支付、申请等多步骤流程。','不同步骤使用不同人群、时间窗或重复计数。','浏览 → 加购 → 下单 → 支付，各步都以用户去重。','metrics,sql','先学'],
 ['cohort','留存与分群','把相同起点或特征的用户放在一起比较。','区分产品改进和新增用户构成变化。','不同 cohort 的观察长度不一致。','比较各注册周用户的第 7 天留存。','metrics,ab','先学']
]);
section('causality','analysis','实验与因果','causal',[
 ['ab','A/B 实验','随机分组后比较干预结果。','能够控制功能、价格或页面分配时。','频繁偷看后随时停止；忽略样本量与分流异常。','随机分配新旧页面，预先定义转化指标与实验周期。','uncertainty,cuped','先学','stats'],
 ['cuped','CUPED 方差缩减','利用实验前协变量降低效果估计的噪声。','有与结果相关、未受实验影响的历史指标。','把实验后变量当作协变量。','用实验前消费金额帮助估计实验期间消费差异。','ab','按需','cuped'],
 ['causal','因果推断与混杂','明确干预、结果和混杂关系，再选择识别方法。','无法随机实验但需要估计政策或运营影响。','模型预测准就声称找到了因果。','画因果图，检查年龄是否同时影响曝光和购买。','did,ab','按需'],
 ['did','双重差分 DiD','比较处理组与对照组的前后变化差。','存在可比对照和可信平行趋势等条件。','看到两组有差异就直接套用。','比较试点城市与对照城市政策前后的变化。','causal','按需']
]);
section('paradigms','learning','反馈从哪里来','sklearn',[
 ['supervised','监督学习','从输入与已知标签的配对中学习。','预测价格、销量、类别或风险分数。','把不存在于预测时的字段当输入。','用历史房屋信息与成交价学习价格预测。','linear,gbdt,validation','先学'],
 ['unsupervised','无监督学习','没有目标标签时寻找数据结构。','用户分群、降维、探索异常。','聚出的簇不一定具有业务意义。','按消费行为聚类后检查各群体差异。','kmeans,pca','先学'],
 ['self-supervised','自监督学习','从数据自身构造预测目标。','大量无标签文本、图像，或想学通用表征。','以为没有人工标签就没有训练目标。','遮住词再预测；对同一图像增强后学相似表示。','transformer,contrastive,pretrained','按需','d2l'],
 ['semi-supervised','半监督学习','同时利用少量有标签和大量无标签数据。','标注贵，但额外无标签数据与目标分布接近。','伪标签错误被反复强化。','先用高置信度预测形成伪标签，再验证收益。','pseudo,supervised','按需'],
 ['rl','强化学习','根据状态采取行动，从奖励学习长期决策。','当前动作影响未来状态和累计收益。','普通固定数据预测题通常不需要；奖励必须可评估。','库存决策影响后续缺货与成本，在模拟器中训练。','qlearning,dqn,ppo,sac,offline-rl','按需','rl,sutton']
]);
section('rl-algorithms','learning','强化学习里怎么选','rl',[
 ['qlearning','Q-learning / SARSA','用状态—动作价值表学习。','状态和动作空间很小；理解 RL 的起点。','高维图像状态无法靠枚举表格解决。','在小网格世界中比较探索策略。','rl,dqn','按需','sutton'],
 ['dqn','DQN','用神经网络近似动作价值，结合经验回放。','离散动作、需要处理较复杂状态。','连续动作不能直接枚举取最大值。','游戏中选择左、右、跳跃动作。','rl,mlp','按需'],
 ['ppo','PPO','限制策略更新幅度的策略梯度方法。','可持续采集新交互；离散或连续动作任务。','交互昂贵时，样本效率可能成为瓶颈。','在并行模拟环境中训练控制策略。','rl,grpo','按需'],
 ['sac','SAC / TD3','复用历史交互的连续控制方法；SAC 加入熵目标。','连续动作且希望复用交互数据。','默认超参数不保证适用；需要多随机种子评估。','连续控制机械臂的关节力度。','rl,ppo','按需'],
 ['offline-rl','离线 RL · CQL / IQL','只利用已有轨迹训练决策策略。','无法在线探索，但有较充分的历史状态动作数据。','超出数据覆盖的动作价值可能严重高估。','先检验日志覆盖与离线评估，再考虑上线。','rl,validation','进阶','cql,iql'],
 ['bandit','多臂老虎机','平衡探索与利用，通常不建模长期状态转移。','推荐或实验分配只需优化即时反馈。','动作有强长期影响时不能简单当老虎机。','在候选展示方案中分配流量。','rl,ab','按需','sutton']
]);
section('tabular','models','表格预测','selection',[
 ['linear','线性回归 / Ridge / Lasso','用特征加权和预测数值，正则化控制复杂度。','连续目标的低成本基线、解释系数。','非线性很强；相关特征下系数解释要谨慎。','先预测房价，与树模型比较。','supervised,scaling','先学'],
 ['logistic','逻辑回归','把线性得分映射为分类概率。','分类基线、稀疏文本、可解释线性关系。','名称有回归，但主要用于分类。','预测用户是否流失。','threshold,calibration,tfidf','先学'],
 ['random-forest','随机森林','对多棵随机化决策树的结果进行集成。','非线性表格基线，减少单树方差。','不要期待树模型自然外推超出训练目标范围。','对用户属性做分类，比较单树与森林。','gbdt,ensemble','先学','sklearn'],
 ['gbdt','梯度提升树 GBDT','逐步加树，修正当前预测的误差。','结构化表格的强候选模型。','验证泄漏再强的算法也救不了。','比较 LightGBM、XGBoost、CatBoost。','lightgbm,xgboost,catboost','先学','sklearn'],
 ['lightgbm','LightGBM','高效梯度提升树实现。','中大型表格、较多特征的候选方案。','小数据下过深的树可能过拟合。','调 num_leaves 与最小叶子样本数。','gbdt,early-stop,optuna','按需','lightgbm'],
 ['xgboost','XGBoost','支持正则化等机制的梯度提升工具。','表格分类、回归、排序的候选方案。','不要假设某个默认实现必然最好。','在相同折上与 LightGBM 比较误差。','gbdt,ensemble','按需','xgboost'],
 ['catboost','CatBoost','提供类别特征处理的梯度提升工具。','表格中存在较多类别列时。','仍需遵守时间与分组验证；类别信息不等于免疫泄漏。','直接标注类别列训练用户流失模型。','gbdt,target-encoding','按需','catboost'],
 ['svm','SVM / 核方法','寻找间隔较大的分类边界或核回归函数。','中小规模、特征适合核相似度时。','大样本核训练成本高，注意缩放。','标准化后比较线性核与 RBF 核。','scaling,logistic','按需','sklearn'],
 ['tabpfn','TabPFN · 表格基础模型','利用预训练模型对表格任务进行预测。','适配其支持范围的表格数据，可作为比较候选。','检查当前版本规模限制、许可、算力与比赛外部数据规则。','在同一验证集上与 GBDT 比较时间和分数。','gbdt,pretrained','按需','tabpfn']
]);
section('structure','models','无标签与时间序列','sklearn',[
 ['kmeans','K-means / DBSCAN','按距离或密度寻找群体结构。','探索用户分群或空间聚集。','尺度与距离选择会影响结果；簇编号没有自然顺序。','先标准化，再解释各簇的行为差异。','unsupervised,scaling','按需'],
 ['pca','PCA / UMAP','将高维数据映射到低维；PCA 线性，UMAP 非线性。','压缩、可视化和探索结构。','二维图上的分离不等于可泛化分类效果。','PCA 压缩相关数值特征，再交叉验证。','linear-algebra,unsupervised','按需'],
 ['anomaly','异常检测','学习正常模式或隔离少数异常点。','标签很少的异常筛查。','异常不一定是欺诈；需要人工或业务核验。','用 Isolation Forest 找出交易异常候选。','unsupervised,metrics','按需'],
 ['time-series','时间序列 · 统计与机器学习','利用时间依赖做预测；包括季节基线、ARIMA 和带滞后特征的模型。','销量、流量、需求预测。','随机切分穿越未来；忽视多步预测时特征是否可用。','先与上周同期比较，再试滞后特征 + GBDT。','time-split,lag,gbdt','按需','timeseries'],
 ['ranking','排序与推荐','学习候选项的相对顺序或用户偏好。','搜索、推荐、广告候选排序。','只看整体分类准确率，不看排序指标或曝光偏差。','以用户分组验证 NDCG，比较召回与重排。','embeddings,validation','按需','xgboost']
]);
section('deep-models','models','深度学习 · 模型维度','d2l',[
 ['deep-learning','深度学习','用多层神经网络学习表示和预测。','图像、文本、音频或复杂表示任务。','它可用于监督、自监督和强化学习，不与它们互斥。','CNN 做监督分类；DQN 用网络学动作价值。','supervised,self-supervised,rl,mlp','先学'],
 ['mlp','MLP · 多层感知机','基础前馈神经网络。','学习神经网络训练流程，或作为数值特征模型。','普通表格上不保证胜过树模型。','标准化数值特征后训练小网络。','gradient,adamw','按需'],
 ['cnn','CNN · 卷积网络','利用局部结构与共享卷积核提取特征。','图像分类、局部模式识别。','不要默认从零训练优于预训练。','微调预训练 ResNet 做图像分类。','pretrained,augmentation,cosine','按需'],
 ['transformer','Transformer / ViT','以注意力等组件组织序列或图像块信息。','文本、视觉、跨模态任务。','显存、输入长度和数据规模需要匹配。','微调文本编码器，或用 ViT 处理图像。','self-supervised,lora,embeddings','按需'],
 ['rnn','RNN / LSTM / GRU','通过递归状态处理序列。','学习序列建模、特定流式或资源约束任务。','不再作为所有文本任务的默认起点，也没有被彻底淘汰。','比较小型 GRU 与简单时间序列基线。','time-series,transformer','按需'],
 ['gnn','图神经网络 GNN','在节点和边之间传递、聚合信息。','分子、关系网络、图结构预测。','邻接关系或跨集合边可能带来信息泄漏。','用分子图预测性质，按分子族验证。','validation,deep-learning','进阶']
]);
section('evaluation','workflow','可信验证','validation',[
 ['validation','验证集与交叉验证','用未参与拟合的数据估计泛化效果。','任何模型比较、调参和融合之前。','反复窥探最终测试集；预处理在全量数据上拟合。','同一组折比较所有方案，保留最终测试集。','group-split,time-split,leakage','先学'],
 ['group-split','按用户 / 实体分组切分','同一实体的数据放在同一折。','同一用户、病人、设备有多条记录。','同一实体跨训练与验证导致记忆效应。','以患者 ID 作为 GroupKFold 分组键。','validation','先学'],
 ['time-split','时间切分与回测','用过去训练，在后来的时间段验证。','未来销量、金融序列、业务预测。','只移动窗口却让滚动特征看到未来。','滚动多段回测，模拟真实预测跨度。','validation,lag','先学'],
 ['leakage','数据泄漏检查','识别预测时不可得信息或验证数据进入训练的路径。','异常高分、本地与榜单差异很大。','把 ID、事后状态或全量统计当作无害特征。','检查退款时间是否发生在待预测购买之后。','target-encoding,validation','先学'],
 ['scoring','指标与目标对齐','依据目标选择 RMSE、MAE、AUC、LogLoss、F1 等。','决定训练、调参和提交方案时。','用准确率掩盖类别不平衡；不同指标不可直接比较。','F1 比赛选阈值，LogLoss 比赛关注概率质量。','threshold,calibration','先学','sklearn'],
 ['error-analysis','分组误差与消融','找错误集中的样本，再单独验证一次改动。','基线建立后寻找下一步 idea。','多个改动一起做，无法知道谁有效。','查看高销量区间误差，只新增一个滞后特征。','eda,ensemble','先学','tuning']
]);
section('features','workflow','特征与解释','sklearn',[
 ['missing','缺失值与异常值','区分缺失原因，并选择填补、指示变量或模型原生处理。','数据存在空值、单位问题或极端值。','不加判断删除所有极端样本。','填补年龄，同时保留年龄缺失标记。','eda,validation','先学'],
 ['scaling','缩放与标准化','调整特征尺度。','线性正则化、距离模型、神经网络。','在验证集上拟合均值和方差；树模型通常不依赖缩放。','仅用训练折拟合 StandardScaler。','svm,kmeans,mlp','先学'],
 ['target-encoding','目标编码','用类别对应的目标统计表示类别。','高基数类别可能含有稳定目标信息。','必须采用合适折外或时间安全编码，并对低频类别平滑。','在训练折内为城市生成房价统计。','leakage,catboost','按需'],
 ['lag','滞后 / 滚动 / 交互特征','把历史信息、窗口统计或变量组合显式提供给模型。','时间序列或需要业务关系的表格题。','窗口含当期目标；训练可得但实际预测不可得。','先 shift 再 rolling，生成过去 7 天销量均值。','time-split,gbdt','按需'],
 ['tfidf','TF-IDF','按词频与文档稀有度表示文本。','低成本文本分类和关键词检索基线。','不是过时废物；但难理解语义和同义表达。','TF-IDF + 逻辑回归预测短文本类别。','logistic,embeddings','按需'],
 ['shap','SHAP / 特征重要性','分析模型预测依赖哪些输入。','解释模型行为、排查可疑特征。','贡献不是因果效果；相关特征会影响解释。','发现事后状态贡献巨大，回查是否泄漏。','causal,leakage','按需','shap'],
 ['optuna','超参数搜索 · Optuna','系统试验超参数并记录目标值。','验证可信、基础方案稳定后。','对验证集过拟合；搜索预算超过收益。','限定预算搜索树深和正则强度。','validation,gbdt','按需','optuna']
]);
section('optimization','toolbox','优化训练','tuning',[
 ['adamw','AdamW / SGD','按梯度更新模型参数；AdamW 使用解耦权重衰减。','训练神经网络，需要选择优化器。','只换优化器却不匹配学习率和调度。','以 AdamW 建基线，再比较优化设置。','gradient,cosine','按需','d2l'],
 ['cosine','余弦退火','按余弦曲线调节学习率，常由大逐步降小。','神经网络固定训练预算下的候选调度。','不是所有训练都更好；普通余弦与带重启版本不同。','微调 CNN：warmup 后做一次余弦衰减。','warmup,adamw,cnn','按需','cosine'],
 ['warmup','学习率预热 Warmup','训练开始用较小学习率逐渐增加。','大模型微调或开头训练不稳定。','预热太长可能浪费训练预算。','先预热若干步，再切到主调度。','cosine,transformer','按需'],
 ['early-stop','早停 Early stopping','验证表现长期不改善时停止并保留较好模型。','树模型或神经网络出现过拟合。','在测试集上决定停在哪一轮。','按验证损失保存最佳 checkpoint。','validation,gbdt','按需'],
 ['gradient-clip','梯度裁剪','限制梯度范数或数值幅度。','观察到梯度爆炸或偶发更新异常。','不能修复坏数据、错误损失或数值实现问题。','记录梯度范数，再设置合理裁剪阈值。','gradient,amp','按需']
]);
section('generalization','toolbox','泛化与效率','d2l',[
 ['regularization','权重衰减 / Dropout','约束权重或随机丢弃激活，控制模型过拟合。','训练很好而验证较差。','正则过强导致欠拟合；方法适配不同模型。','调权重衰减时固定验证折与训练预算。','adamw,early-stop','按需'],
 ['augmentation','数据增强 / Mixup / CutMix','构造符合任务语义的数据变化。','图像等任务的数据不足或泛化不足。','翻转、裁剪可能改变标签含义。','自然图像轻量增强；医疗方向性任务先核查语义。','cnn,validation','按需'],
 ['pseudo','伪标签','把模型预测作为额外监督信号。','存在相关无标签数据，且比赛规则允许。','错误标签累积；不可用测试真值筛选。','只用可信伪标签，独立验证收益。','semi-supervised,validation','按需','sklearn'],
 ['amp','混合精度 / 梯度累积','降低计算精度或分批累积梯度，节省资源。','显存紧张或训练吞吐不足。','检查数值稳定；累积不总等价于真正大 batch。','用自动混合精度并监测 NaN。','gradient-clip,lora','按需','amp'],
 ['ema','EMA / SWA','对训练过程中的模型权重做平均。','权重波动较大，想改善稳定性。','需要正确处理模型缓冲状态与额外资源。','同样验证流程比较末轮权重与平均权重。','ensemble,validation','进阶']
]);
section('postprocess','toolbox','预测后处理','calibration',[
 ['calibration','概率校准','让预测概率与实际发生频率更一致。','决策依赖概率质量，而非仅类别。','必须使用独立或交叉验证的校准预测。','检查可靠性图、LogLoss 与 Brier 分数。','temperature,threshold','按需'],
 ['temperature','温度缩放 Temperature scaling','在 logits 上除以拟合出的正温度，再得到概率。','神经分类模型过度自信，希望校准置信度。','标准单温度不改变 argmax 类别；与生成采样温度用途不同。','在独立校准集拟合 T，再评估未见数据的概率质量。','calibration,logistic','按需','temperature'],
 ['threshold','分类阈值调整','把概率转换成类别时选择合适分界。','优化 F1、召回率或业务错判成本。','不等于概率校准；不能用测试标签挑阈值。','在验证集选择满足召回要求的阈值。','scoring,calibration','按需','sklearn'],
 ['ensemble','融合 / Stacking','组合具有互补误差的模型预测。','多个可靠模型在不同样本上各有所长。','stacking 的第二层必须使用折外预测，不能吃训练内预测。','用 OOF 预测训练线性融合器，再评估独立数据。','validation,gbdt,cnn','按需','sklearn'],
 ['conformal','保形预测 Conformal prediction','在适当假设下构造有边际覆盖保证的集合或区间。','需要表达预测不确定性。','分布漂移会破坏保证；边际覆盖不等于每个人群覆盖。','用独立校准残差构造房价预测区间。','validation,calibration','进阶','conformal'],
 ['bootstrap','Bootstrap','通过重采样估计统计量的波动。','估计指标或模型差异的不确定性。','时间或实体相关数据不能随意逐行重采样。','按用户重采样，比较两模型指标差异。','uncertainty,group-split','按需','stats']
]);
section('foundation-models','modern','表示与生成','hf',[
 ['pretrained','预训练与迁移学习','复用已学到的表示，再适配目标任务。','图像、文本、音频样本有限。','检查预训练数据规则、模型许可和领域差异。','先冻结编码器做基线，再微调。','cnn,transformer,lora','按需'],
 ['embeddings','Embedding / 语义向量','将文本或其他对象表示为可比较的向量。','语义搜索、相似样本、聚类与下游特征。','相似度高不保证事实一致，需按任务评估。','将商品描述编码后检索相似商品。','rag,kmeans,ranking','按需','sentence'],
 ['contrastive','对比学习','拉近匹配样本表示，区分不匹配样本。','无标签表示学习或跨模态对齐。','正负样本定义错误会学到错误相似性。','同一图像的两个增强视图作为正对。','self-supervised,embeddings','按需','d2l'],
 ['diffusion','扩散 / 流匹配生成模型','通过学习去噪或数据分布之间的流来生成样本。','图像、音频等生成与编辑任务。','普通表格预测不应因为流行而强行使用。','用预训练扩散模型进行图像编辑。','pretrained,lora','进阶','diffusion'],
 ['multimodal','多模态模型','联合处理文本、图像、音频等信息。','文档理解、图文检索或跨模态任务。','单模态已足够时，先衡量额外成本。','用图像与商品描述一起预测商品类别。','embeddings,transformer','按需']
]);
section('adaptation','modern','适配与系统','peft',[
 ['rag','RAG · 检索增强生成','先检索相关资料，再把资料交给生成模型。','知识需更新、有私有文档或需要证据出处。','检索错误、文档权限与生成忠实性需要分别验证。','检索产品手册片段，让回答附对应来源。','embeddings,rerank,llm-eval','按需','rag'],
 ['rerank','混合检索与重排','组合关键词和向量召回，再用重排模型筛选候选。','只用向量检索漏掉精确名称或关键证据。','召回没找到的文档无法靠重排救回。','关键词 + 向量检索合并候选，再重排。','rag,tfidf,embeddings','按需','sentence'],
 ['lora','LoRA / QLoRA','以低秩增量微调；QLoRA 结合量化基础权重节省显存。','想适配预训练模型，但全量微调成本高。','检查任务适配、量化支持；不保证等同全量微调。','在标注文本上微调小部分参数。','pretrained,sft,amp','按需'],
 ['sft','SFT · 监督微调','用期望输入输出样例适配模型行为。','有可靠示范，想学格式、风格或任务行为。','不能把微调当作随时更新事实库的首选。','用经过检查的问答样例训练任务格式。','supervised,lora,dpo','按需','hf'],
 ['agent','工具调用与 Agent','模型结合工具和控制流程执行多步任务。','问题确实需要查询、计算或分阶段操作。','Agent 不必使用强化学习；要控制工具权限和失败重试。','先查数据库，再计算结果并生成解释。','rag,llm-eval,sql','按需','hf'],
 ['llm-eval','生成系统评估','分别检查正确性、证据、成本、延迟与失败情况。','更换模型、提示词、检索或微调方法时。','只凭几个漂亮样例判断整体提升。','建立固定问题集，对答案和引文单独评分。','validation,rag,tracking','先学','hf']
]);
section('posttraining','modern','偏好优化与强化后训练','dpo',[
 ['dpo','DPO · 直接偏好优化','使用偏好回答对直接优化模型。','有 chosen / rejected 成对数据，希望调整回答偏好。','不等同于在线环境交互 RL，也不需要显式训练奖励模型。','用经过审核的回答对调整偏好。','sft,lora,grpo','进阶'],
 ['grpo','GRPO · 组相对策略优化','对同一提示的多次生成比较奖励，进行策略优化。','能够给生成结果可靠打分，有足够采样预算。','奖励投机、采样成本、训练稳定性都要评估。','可验证答案的任务中对一组候选计算奖励。','rl,ppo,sft,llm-eval','进阶','grpo']
]);
section('delivery','engineering','从实验到交付','mlflow',[
 ['git','Git 与环境管理','记录代码版本、依赖和实验入口。','需要复现、协作、回退改动。','只保存 notebook 输出，没有环境与随机种子记录。','每次提交记录数据版本和运行命令。','tracking,validation','先学','git'],
 ['tracking','实验跟踪','记录数据、参数、指标与模型产物。','比较多个模型、调参或团队协作。','只记录最好成绩，忽略失败和计算成本。','建立实验表：假设、改动、验证分数、结论。','optuna,error-analysis','先学'],
 ['deployment','部署与监控','把模型或分析交付为可运行服务、批处理或报告。','成果开始被他人定期使用。','忽略输入变化、缺失字段和性能下降。','监控新数据分布与可获得的线上标签表现。','drift,git','按需'],
 ['drift','数据与概念漂移','输入分布或输入—目标关系随时间改变。','上线表现下降、验证与真实使用出现差异。','分布变了不代表效果必然变差；需要标签或代理证据。','按周检查数据分布和分组错误。','time-split,deployment','按需'],
 ['distributed','Spark / 分布式处理','跨机器并行处理数据与计算。','单机资源确实不足或已有集群环境。','小数据不必先搭大数据平台。','先尝试列式存储和本地 SQL，再评估分布式需求。','duckdb,sql','进阶','spark']
]);

export const paths={
 all:{label:'完整知识地图',note:'模块是不同观察维度，不是互斥的算法分类。点击分支展开。',steps:[]},
 analyst:{label:'数据分析岗',note:'先建立取数 → 指标 → 诊断 → 实验 → 表达的主线。',steps:['sql','python','metrics','eda','funnel','cohort','uncertainty','ab','causal','visual']},
 kaggle:{label:'Kaggle · 预测建模',note:'先建立数据 → 验证 → 基线 → 特征 → 误差 → 融合的主线。',steps:['python','eda','supervised','validation','leakage','scoring','gbdt','lag','error-analysis','optuna','ensemble']},
 genai:{label:'生成式 AI',note:'先复用模型与评估，再按问题选检索、微调或后训练。',steps:['python','deep-learning','transformer','pretrained','embeddings','llm-eval','rag','sft','lora','dpo','grpo']}
};
export const recipes=[
 {title:'表格分类 · 从可信基线开始',tag:'KAGGLE',problem:'类别特征较多，预测是否流失。',steps:['validation','catboost','error-analysis','optuna','ensemble'],why:'先确定分组或时间切分，再比较特征和模型。融合只在误差互补时尝试。',check:'用相同 OOF 折比较目标指标；记录每一步增益与波动。'},
 {title:'图像分类 · 小数据微调',tag:'VISION',problem:'有标注图像，但从零训练容易过拟合。',steps:['pretrained','augmentation','adamw','warmup','cosine','early-stop'],why:'复用表示、用合理增强扩展样本变化，再控制优化节奏。各技巧不是必选套餐。',check:'与不加新技巧的微调基线逐项比较；按实体或来源切分。'},
 {title:'销量预测 · 用过去预测未来',tag:'TIME SERIES',problem:'存在季节性和近期需求变化。',steps:['time-split','time-series','lag','gbdt','error-analysis'],why:'先做季节基线，再加入真实预测时可获得的历史信息。',check:'多时间窗口回测；确认多步预测没有使用未来真实销量。'},
 {title:'概率不可靠 · 校准再决策',tag:'CALIBRATION',problem:'模型分类还行，但经常过度自信。',steps:['scoring','calibration','temperature','threshold'],why:'先判断是概率问题还是决策阈值问题。单温度缩放不会改变最高概率类别。',check:'用独立校准集拟合，另外评估 LogLoss / Brier；阈值按业务指标确定。'},
 {title:'知识问答 · 把证据带进回答',tag:'GENERATIVE AI',problem:'需要回答私有、更新频繁的文档问题。',steps:['embeddings','rerank','rag','llm-eval'],why:'检索解决资料获取，重排提高候选相关性，评估分别检查检索与回答。',check:'固定问题集检查证据召回、引文支持和拒答；不要只看语言流畅度。'},
 {title:'业务改版 · 验证真实收益',tag:'ANALYTICS',problem:'上线新流程前，想知道是否提高转化。',steps:['metrics','uncertainty','ab','cuped','visual'],why:'先定指标与随机分流，历史协变量有效时才使用 CUPED。',check:'预先确定样本量、周期和分析规则；检查分流异常与分组效果。'},
 {title:'控制任务 · 先判断是否真需要 RL',tag:'REINFORCEMENT',problem:'动作影响未来状态，希望提高长期收益。',steps:['rl','bandit','ppo','sac','tracking'],why:'先判断即时反馈是否足够；需要序列决策时，再按动作类型与交互成本选择 PPO 或 SAC。',check:'这些是条件分支，不是串联所有算法。单独测试环境、多种子评估，记录交互成本。'},
 {title:'生成行为适配 · 选正确反馈',tag:'POST-TRAINING',problem:'模型知识够用，但输出行为不符合任务。',steps:['llm-eval','sft','lora','dpo','grpo'],why:'示范数据对应 SFT；偏好对对应 DPO；能可靠打分且有预算时才考虑 GRPO。LoRA 是可组合的微调手段。',check:'这些也是条件选择。保留未见任务与回归集，防止奖励投机和原能力退化。'}
];
