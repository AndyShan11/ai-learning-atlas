import { writeFile } from "node:fs/promises";
import {
  nodes,
  nodeMap,
  ancestors,
  neighborhood,
  sources,
  reviewed,
  relations,
  paths,
  recipes,
} from "../universe-data.js";
let text = `# 知图 · 知识宇宙 2.1\n\n结构更新：${reviewed}。${nodes.length} 个节点（含模块、子类、方法），${nodes.length - 1} 条层级连线，${relations.length} 条跨树关系。\n\n[打开交互版](https://andyshan11.github.io/ai-learning-atlas/)\n\n## 完整导航树\n\n层级是组织知识的方式，不是把不同维度强行当作互斥类别。跨树关系见各节点。\n\n`;
function outline(id, level = 0) {
  const n = nodeMap.get(id);
  text +=
    "  ".repeat(level) +
    `- [${n.title}](https://andyshan11.github.io/ai-learning-atlas/#node=${id})\n`;
  n.children.forEach((c) => outline(c, level + 1));
}
outline("universe");
for (const p of Object.values(paths))
  if (p.steps.length)
    text += `\n## ${p.label}主线\n\n${p.steps.map((id) => nodeMap.get(id).title).join(" → ")}\n`;
text += "\n## 节点笔记\n";
for (const n of nodes) {
  text += `\n### ${n.title}\n\n位置：${ancestors(n.id)
    .map((n) => n.title)
    .join(
      " › ",
    )}\n\n- **是什么：** ${n.what}\n- **什么时候用：** ${n.when}\n- **使用边界：** ${n.avoid}\n- **例子：** ${n.example}\n`;
  if (n.children.length)
    text += `- **子节点：** ${n.children.map((id) => nodeMap.get(id).title).join("、")}\n`;
  for (const r of neighborhood(n.id))
    text += `- **${r.label}：** ${nodeMap.get(r.source).title} ${["applies", "requires"].includes(r.type) ? "→" : "↔"} ${nodeMap.get(r.target).title}\n`;
  text += `- **资料：** ${n.sources.map((s) => `[${sources[s][0]}](${sources[s][1]})`).join("、")}\n`;
}
text += "\n## 组合方案\n";
for (const r of recipes)
  text += `\n### ${r.title}\n\n${r.problem}\n\n${r.steps.map((id) => nodeMap.get(id).title).join(" → ")}\n\n${r.why}\n\n验证：${r.check}\n`;
text +=
  "\n## 范围与出处\n\n本图覆盖数据分析、机器学习与生成式 AI 的主要学习结构，不声称穷尽所有研究领域。层级边为导航包含；适用边从方法指向任务，依赖边从概念指向前置，组合与对照边无方向。灵感源于 AMAI 路线图，代码与中文笔记独立编写。\n";
await writeFile(new URL("../KNOWLEDGE.md", import.meta.url), text);
console.log(`Generated full tree and ${nodes.length} notes.`);
