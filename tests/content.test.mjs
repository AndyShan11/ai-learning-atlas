import test from 'node:test';
import assert from 'node:assert/strict';
import {nodes,domains,sections,sources,paths,recipes} from '../data.js';
test('每个节点有唯一位置、完整使用条件和可解析参考资料',()=>{
 const ids=new Set(nodes.map(n=>n.id));assert.equal(ids.size,nodes.length);
 const ds=new Set(domains.map(d=>d.id));const ss=new Map(sections.map(s=>[s.id,s]));
 for(const n of nodes){assert.ok(ds.has(n.domain),n.id);assert.equal(ss.get(n.section)?.domain,n.domain);for(const f of ['title','what','when','avoid','example'])assert.ok(n[f]?.trim(),`${n.id}.${f}`);assert.ok(n.sources.length);for(const s of n.sources){assert.ok(sources[s],`${n.id} source ${s}`);assert.ok(new URL(sources[s][1]));}for(const r of n.related)assert.ok(ids.has(r),`${n.id} → ${r}`);}
 for(const d of domains)assert.ok(nodes.some(n=>n.domain===d.id));
});
test('学习路径与组合方案不存在断链',()=>{const ids=new Set(nodes.map(n=>n.id));for(const p of [...Object.values(paths),...recipes])for(const id of p.steps)assert.ok(ids.has(id),id);});
test('关键概念覆盖且归属正确，避免把工具误当学习范式',()=>{
 const n=Object.fromEntries(nodes.map(n=>[n.id,n]));
 assert.equal(n.rl.domain,'learning');assert.equal(n['deep-learning'].domain,'models');
 assert.equal(n.cosine.section,'optimization');assert.equal(n.temperature.section,'postprocess');
 assert.equal(n.lora.section,'adaptation');assert.equal(n.dpo.section,'posttraining');assert.equal(n.grpo.section,'posttraining');
 for(const id of ['ppo','sac','dqn','offline-rl','tabpfn','rag'])assert.ok(n[id]);
 assert.match(n.temperature.avoid,/不改变 argmax/);assert.match(n.dpo.avoid,/不等同/);
});
