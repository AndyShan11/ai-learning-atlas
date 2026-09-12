import {writeFile} from 'node:fs/promises';
import {nodes,domains,sections,sources,reviewed,recipes,paths} from '../data.js';
let text=`# 知图 · 数据与 AI 学习地图\n\n内容核查：${reviewed}。${domains.length} 个模块，${nodes.length} 个知识节点。\n\n[打开交互版](https://AndyShan11.github.io/ai-learning-atlas/)\n\n模块按不同维度组织，不是互斥分类。学习方式与模型可以交叉，训练技巧可以与模型组合。优先级是面向学习目标的编辑建议。\n\n`;
for(const [key,p] of Object.entries(paths))if(key!=='all')text+=`## ${p.label}主线\n\n${p.note}\n\n${p.steps.map(id=>nodes.find(n=>n.id===id).title).join(' → ')}\n\n`;
for(const d of domains){text+=`## ${d.title}\n\n${d.summary}\n\n`;for(const s of sections.filter(s=>s.domain===d.id)){text+=`### ${s.title}\n\n`;for(const n of nodes.filter(n=>n.section===s.id)){text+=`#### ${n.title}\n\n- **位置：** ${d.title} › ${s.title}；${n.priority}\n- **是什么：** ${n.what}\n- **什么时候用：** ${n.when}\n- **使用边界：** ${n.avoid}\n- **例子：** ${n.example}\n- **关联：** ${n.related.map(id=>`[${nodes.find(n=>n.id===id).title}](https://AndyShan11.github.io/ai-learning-atlas/#node=${id})`).join('、')}\n- **资料：** ${n.sources.map(id=>`[${sources[id][0]}](${sources[id][1]})`).join('、')}\n\n`;}}}
text+='## 组合方案\n\n';for(const r of recipes)text+=`### ${r.title}\n\n${r.problem}\n\n${r.steps.map(id=>nodes.find(n=>n.id===id).title).join(' → ')}\n\n${r.why}\n\n验证：${r.check}\n\n`;
text+='## 来源说明\n\n设计思路受到 [AMAI AI Expert Roadmap](https://github.com/AMAI-GmbH/AI-Expert-Roadmap) 启发；界面与内容重新编写，不复用原图。资料链接以官方文档与原始论文为主。方法简述为教学归纳，适用条件不是性能保证；版本与限制请以原文为准。\n';
await writeFile(new URL('../KNOWLEDGE.md',import.meta.url),text);console.log(`Generated KNOWLEDGE.md (${nodes.length} nodes)`);
