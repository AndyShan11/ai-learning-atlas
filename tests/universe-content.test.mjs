import test from "node:test";
import assert from "node:assert/strict";
import {
  nodes,
  nodeMap,
  domains,
  hierarchy,
  relations,
  relationTypes,
  sources,
  paths,
  recipes,
  ancestors,
  descendants,
} from "../universe-data.js";
import { nodes as previous } from "../data.js";
import { layoutTree } from "../universe.js";
test("一棵连通且无环的完整导航树，旧笔记全部保留", () => {
  assert.equal(new Set(nodes.map((n) => n.id)).size, nodes.length);
  assert.equal(hierarchy.length, nodes.length - 1);
  assert.deepEqual(
    nodes.filter((n) => !n.parent).map((n) => n.id),
    ["universe"],
  );
  assert.equal(descendants("universe").length, nodes.length);
  for (const n of nodes) {
    const chain = ancestors(n.id);
    assert.equal(chain.length, n.depth + 1);
    assert.equal(new Set(chain.map((x) => x.id)).size, chain.length);
    assert.equal(chain[0].id, "universe");
    for (const child of n.children)
      assert.equal(nodeMap.get(child).parent, n.id);
  }
  for (const n of previous) assert.ok(nodeMap.has(n.id), n.id);
});
test("各模块深入子类，监督和无监督不再停留在单卡片", () => {
  assert.deepEqual(nodeMap.get("supervised").children, [
    "classification",
    "regression",
    "ranking",
  ]);
  assert.equal(nodeMap.get("classification").children.length, 3);
  assert.equal(nodeMap.get("regression").children.length, 2);
  assert.equal(nodeMap.get("unsupervised").children.length, 4);
  for (const id of [
    "self-supervised",
    "semi-supervised",
    "rl",
    "cnn",
    "rnn",
    "gnn",
    "transformer",
    "schedules",
    "adamw",
    "calibration",
    "time-series",
  ])
    assert.ok(nodeMap.get(id).children.length >= 2, id);
  for (const d of domains) {
    assert.ok(nodeMap.get(d.id).children.length >= 2);
    assert.ok(descendants(d.id).some((n) => n.depth >= 3));
  }
  assert.equal(nodeMap.get("cosine").parent, "schedules");
  assert.equal(nodeMap.get("temperature").parent, "calibration");
});
test("关系带类型和有效端点，学习方式与模型保持分离", () => {
  const keys = new Set();
  for (const r of relations) {
    assert.ok(nodeMap.has(r.source));
    assert.ok(nodeMap.has(r.target));
    assert.notEqual(r.source, r.target);
    assert.ok(relationTypes[r.type]);
    const key = [r.source, r.target, r.type].join(":");
    assert.ok(!keys.has(key));
    keys.add(key);
  }
  for (const tuple of [
    "gbdt:classification:applies",
    "gbdt:regression:applies",
    "cnn:cosine:combines",
    "dqn:deep-learning:requires",
    "deep-learning:rl:applies",
  ])
    assert.ok(keys.has(tuple), tuple);
});
test("每个星体都有定义、条件、边界、例子和来源", () => {
  for (const n of nodes) {
    for (const field of ["title", "what", "when", "avoid", "example"])
      assert.ok(n[field]?.trim(), `${n.id}.${field}`);
    assert.ok(n.sources.length);
    for (const s of n.sources) {
      assert.ok(sources[s]);
      assert.ok(new URL(sources[s][1]));
    }
  }
  for (const p of [...Object.values(paths), ...recipes])
    for (const id of p.steps) assert.ok(nodeMap.has(id));
});
test("两种布局保留全部节点、坐标有限且没有重叠中心", () => {
  for (const mode of ["orbit", "tree"]) {
    const positions = layoutTree(mode);
    assert.equal(positions.size, nodes.length);
    const coords = new Set();
    for (const [id, p] of positions) {
      assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y), id);
      const key = p.x.toFixed(3) + "," + p.y.toFixed(3);
      assert.ok(!coords.has(key), id);
      coords.add(key);
    }
  }
});
