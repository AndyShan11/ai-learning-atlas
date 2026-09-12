import {
  nodes,
  domains,
  sections,
  sources,
  paths,
  recipes,
  reviewed,
} from "./data.js";
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const byId = new Map(nodes.map((n) => [n.id, n]));
const domainById = new Map(domains.map((n) => [n.id, n]));
const state = { view: "map", domain: null, node: null, path: "all" };
let resizeObserver;
const links = (ids) =>
  ids
    .map(
      (id) =>
        `<button data-node="${id}">${esc(byId.get(id).title)} ↗</button>`,
    )
    .join("");
function route() {
  const params = new URLSearchParams(location.hash.slice(1));
  state.view = ["map", "choose", "recipes", "updates"].includes(
    params.get("view"),
  )
    ? params.get("view")
    : "map";
  state.path = paths[params.get("path")] ? params.get("path") : "all";
  state.node = byId.has(params.get("node")) ? params.get("node") : null;
  state.domain = state.node
    ? byId.get(state.node).domain
    : domainById.has(params.get("domain"))
      ? params.get("domain")
      : null;
  render();
}
function saveRoute() {
  const p = new URLSearchParams();
  if (state.view !== "map") p.set("view", state.view);
  if (state.path !== "all") p.set("path", state.path);
  if (state.node) p.set("node", state.node);
  else if (state.domain) p.set("domain", state.domain);
  const hash = p.toString();
  if (location.hash.slice(1) !== hash)
    history.pushState(
      null,
      "",
      location.pathname + location.search + (hash ? "#" + hash : ""),
    );
}
function go(change) {
  Object.assign(state, change);
  saveRoute();
  render();
}
function render() {
  $("#path").value = state.path;
  $("#path-note").textContent = paths[state.path].note;
  document.querySelectorAll("[data-view]").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === state.view);
    b.setAttribute("aria-pressed", String(b.dataset.view === state.view));
  });
  $("#domain-nav").innerHTML =
    `<button data-domain="" class="${!state.domain && state.view === "map" ? "active" : ""}"><span class="nav-dot" style="--branch:#234d41"></span>全景总览</button>` +
    domains
      .map(
        (d, i) =>
          `<button data-domain="${d.id}" class="${state.domain === d.id && state.view === "map" ? "active" : ""}" ${state.domain === d.id && state.view === "map" ? 'aria-current="page"' : ""}><span class="nav-dot" style="--branch:${d.color}"></span>${esc(d.title)}</button>`,
      )
      .join("");
  resizeObserver?.disconnect();
  if (state.view === "map") renderMap();
  else if (state.view === "choose") renderChoose();
  else if (state.view === "recipes") renderRecipes();
  else renderUpdates();
  renderDetail();
}
function pathStrip() {
  const p = paths[state.path];
  return p.steps.length
    ? `<div class="route-strip" aria-label="${esc(p.label)}学习顺序">${p.steps.map((id, i) => `${i ? '<span aria-hidden="true">→</span>' : ""}<button data-node="${id}">${i + 1}. ${esc(byId.get(id).title)}</button>`).join("")}</div>`
    : "";
}
function renderMap() {
  const d = domainById.get(state.domain);
  $("#content").innerHTML =
    pathStrip() +
    `<div class="map-toolbar"><div class="breadcrumbs"><button data-domain="">全景总览</button>${d ? `<span aria-hidden="true">/</span><span>${esc(d.title)}</span>` : `<span> / ${domains.length} 个模块 · ${nodes.length} 个知识节点</span>`}</div><div class="toolbar-actions"><button class="soft-btn" id="export-svg">导出 SVG</button><button class="soft-btn" id="print">打印</button>${state.node ? '<button class="soft-btn mobile-detail-link" id="read-detail">阅读详情 ↓</button>' : ""}</div></div>`;
  if (d) {
    $("#content").insertAdjacentHTML(
      "beforeend",
      `<div class="domain-head" style="--branch:${d.color}"><p class="eyebrow">${d.en}</p><h2>${esc(d.title)}</h2><p>${esc(d.summary)}</p></div><div class="domain-sections" style="--branch:${d.color}">${sections
        .filter((s) => s.domain === d.id)
        .map(
          (s) =>
            `<section class="branch-section"><h3>${esc(s.title)}</h3><div class="branch-leaves">${nodes
              .filter((n) => n.section === s.id)
              .map(
                (n) =>
                  `<button class="leaf ${state.node === n.id ? "selected" : ""}" data-node="${n.id}" aria-pressed="${state.node === n.id}"><span class="leaf-title">${esc(n.title)}</span><span class="leaf-desc">${esc(n.what)}</span><span class="leaf-tags"><span>${n.priority}</span>${paths[state.path].steps.includes(n.id) ? '<span class="recommend">本方向主线</span>' : ""}</span></button>`,
              )
              .join("")}</div></section>`,
        )
        .join("")}</div>`,
    );
  } else {
    const positions = domains.map((d, i) => ({
      d,
      x: i < 4 ? 16 : 674,
      y: 34 + (i % 4) * 166,
      i,
    }));
    $("#content").insertAdjacentHTML(
      "beforeend",
      `<div class="map-surface"><div class="map-stage"><svg class="map-connections" viewBox="0 0 960 700" aria-hidden="true">${positions.map(({ d, x, y, i }) => `<path style="--branch:${d.color}" d="M ${i < 4 ? 354 : 606} 361 C ${i < 4 ? 310 : 650} 361, ${i < 4 ? 330 : 630} ${y + 63}, ${i < 4 ? 286 : 674} ${y + 63}"/>`).join("")}</svg><div class="root-node"><small>FROM STRUCTURE TO PRACTICE</small><h2>数据与 AI</h2><p>大结构 → 选方法 → 会组合</p></div>${positions.map(({ d, x, y, i }) => `<button class="overview-node ${state.path !== "all" && !d.paths.includes(state.path) ? "dim" : ""}" style="left:${x}px;top:${y}px;--branch:${d.color}" data-domain="${d.id}"><span class="num">0${i + 1} / ${d.en}</span><span class="node-arrow" aria-hidden="true">↗</span><h3>${esc(d.title)}</h3><p>${esc(d.hint)}</p></button>`).join("")}</div></div><div class="map-bottom"><span><span class="legend-line"></span>连线表示知识模块组织；不是互斥分类</span><strong>点击任一分支，展开具体方法 ↗</strong></div><div class="orientation"><b>先分清两个维度：</b>监督 / 无监督 / 强化，回答“从什么反馈学习”；树模型 / 神经网络，回答“用什么模型”。<b>深度学习可以与强化学习组合。</b></div>`,
    );
    const surface = $(".map-surface"),
      stage = $(".map-stage");
    const fit = () => {
      if (innerWidth <= 760) {
        surface.style.height = "auto";
        stage.style.transform = "none";
      } else {
        const scale = Math.min(1, (surface.clientWidth - 2) / 960);
        stage.style.transform = `scale(${scale})`;
        surface.style.height = 700 * scale + "px";
      }
    };
    resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(surface);
    fit();
  }
}
function renderDetail() {
  const n = byId.get(state.node);
  if (!n) {
    $("#detail").innerHTML =
      `<div class="detail-top"><p class="eyebrow">HOW TO READ THIS MAP</p><span class="badge">从这里开始</span></div><h2>每个知识点，<br>都有自己的位置。</h2><p class="detail-summary">不用一次学完。先选一个分支，了解它解决哪类问题。</p><div class="welcome-art" aria-hidden="true"><span>是什么</span><span>什么时候用</span><span>和谁组合</span></div><ol class="welcome-steps"><li><span class="step-no">01</span><div><strong>先建立大结构</strong><p>查看模块与分支，分清学习方式、模型和训练技巧。</p></div></li><li><span class="step-no">02</span><div><strong>再看适用条件</strong><p>点开节点，查看使用场景、边界和具体例子。</p></div></li><li><span class="step-no">03</span><div><strong>把知识连起来</strong><p>沿关联节点跳转，或在“组合方案”里看完整流程。</p></div></li></ol><div class="detail-block"><h3>从你提到的问题出发</h3><button class="example-link" data-node="rl">强化学习属于哪里？ <span>↗</span></button><button class="example-link" data-node="cosine">余弦退火什么时候用？ <span>↗</span></button><button class="example-link" data-node="temperature">温度缩放能改变什么？ <span>↗</span></button></div><p class="reviewed">“先学 / 按需 / 进阶”是学习建议，不是新旧或强弱排名。</p>`;
    return;
  }
  const d = domainById.get(n.domain),
    s = sections.find((s) => s.id === n.section);
  $("#detail").innerHTML =
    `<div class="detail-top"><p class="eyebrow">KNOWLEDGE NOTE</p><span class="badge">${n.priority}</span></div><h2>${esc(n.title)}</h2><div class="detail-ancestry">${esc(d.title)} › ${esc(s.title)}</div><div class="detail-block"><h3>01 · 它是什么</h3><p>${esc(n.what)}</p></div><div class="detail-block"><h3>02 · 什么时候用</h3><p>${esc(n.when)}</p></div><div class="detail-block"><h3>03 · 使用边界</h3><p>${esc(n.avoid)}</p></div><div class="detail-block example"><h3>一个具体例子</h3><p>${esc(n.example)}</p></div><div class="detail-block"><h3>关联知识 · 组合、对照与下一步</h3><div class="related">${links(n.related)}</div></div><div class="detail-block"><h3>继续读 · 官方文档 / 原始资料</h3><ul class="source-links">${n.sources.map((id) => `<li><a href="${sources[id][1]}" target="_blank" rel="noopener">${esc(sources[id][0])} ↗</a></li>`).join("")}</ul></div><button class="soft-btn" id="copy-link">复制当前节点链接</button><p class="reviewed">编写 / 核查日期 ${n.reviewed} · 简介为教学归纳，具体 API 与限制以链接版本为准。</p>`;
  $("#detail").scrollTop = 0;
}
export function recommend(task, condition) {
  if (task === "analytics")
    return {
      title: "从指标与实验开始",
      text: "描述和诊断先做 SQL、指标拆解与分群。需要判断干预效果时，用随机实验；不能实验再检查因果识别条件。",
      ids: ["sql", "metrics", "eda", "ab", "causal"],
    };
  if (task === "tabular") {
    if (condition === "category")
      return {
        title: "类别较多：先比较 CatBoost 与 GBDT",
        text: "CatBoost 是方便的候选，不是必胜选择。统一验证方式后再比较编码策略。",
        ids: ["validation", "catboost", "lightgbm", "target-encoding"],
      };
    if (condition === "small")
      return {
        title: "小样本：简单基线 + 树模型 + 可选 TabPFN",
        text: "先限制模型复杂度，再检查 TabPFN 当前支持范围、许可与比赛规则。不要直接假定基础模型一定更强。",
        ids: ["linear", "logistic", "gbdt", "tabpfn"],
      };
    return {
      title: "普通表格：线性模型与梯度提升树",
      text: "先判断目标是数值还是类别，匹配线性回归或逻辑回归，再比较梯度提升树。模型选择必须服从验证结果。",
      ids: ["validation", "linear", "logistic", "gbdt", "scoring"],
    };
  }
  if (task === "vision")
    return {
      title: "图像：从预训练 CNN / ViT 开始",
      text: "先复用表示，再小规模微调；增强是否保留标签语义比技巧数量更重要。",
      ids: ["pretrained", "cnn", "transformer", "augmentation", "cosine"],
    };
  if (task === "text")
    return {
      title: "文本预测：低成本基线，再比较预训练表示",
      text: "TF-IDF + 线性模型作为基线；语义更复杂时比较嵌入或微调模型。预测分类不一定需要生成大模型。",
      ids: ["tfidf", "logistic", "embeddings", "transformer", "lora"],
    };
  if (task === "time")
    return {
      title: "时间序列：先回测，再选模型",
      text: "先做季节基线，随后比较统计模型、滞后特征 + GBDT。所有特征都必须在真实预测时可得。",
      ids: ["time-split", "time-series", "lag", "gbdt"],
    };
  if (task === "unlabeled")
    return {
      title: "无标签：先明确要找什么结构",
      text: "分群比较 K-means / DBSCAN；压缩或可视化比较 PCA / UMAP；异常筛查选择异常检测。它们解决的目标不同。",
      ids: ["unsupervised", "kmeans", "pca", "anomaly"],
    };
  if (task === "rl") {
    if (condition === "immediate")
      return {
        title: "只有即时反馈：先考虑多臂老虎机",
        text: "如果动作不需要建模长期状态变化，不必上复杂序列强化学习。",
        ids: ["bandit", "ab"],
      };
    if (condition === "offline")
      return {
        title: "只有历史轨迹：离线强化学习",
        text: "不要直接照搬在线探索。先检查历史动作覆盖、离线评估是否可信，再看 CQL / IQL。",
        ids: ["offline-rl", "rl", "validation"],
      };
    if (condition === "continuous")
      return {
        title: "连续动作：比较 SAC / TD3 与 PPO",
        text: "想复用历史交互时比较 SAC / TD3；有大量并行环境时 PPO 也是候选。按交互成本和多种子结果决定。",
        ids: ["sac", "ppo", "tracking"],
      };
    return {
      title: "离散动作：小状态用表格法，复杂状态看 DQN / PPO",
      text: "先确认奖励确实对应长期目标。DQN 适合离散动作，PPO 也支持离散动作但使用新采集的交互数据更新。",
      ids: ["qlearning", "dqn", "ppo"],
    };
  }
  if (condition === "behavior")
    return {
      title: "适配行为：按反馈选择 SFT、DPO 或 GRPO",
      text: "示范 → SFT；偏好对 → DPO；可靠可计算奖励 + 采样预算 → GRPO。这是分支选择，不要求依次全部使用。",
      ids: ["llm-eval", "sft", "lora", "dpo", "grpo"],
    };
  return {
    title: "补充知识：先建立检索与评估",
    text: "资料经常变化或需要私有证据时，先试 RAG。检索召回、答案忠实性和权限需要分别检查。",
    ids: ["embeddings", "rerank", "rag", "llm-eval"],
  };
}
const conditions = {
  tabular: [
    ["normal", "一般数值 / 混合表格"],
    ["category", "类别特征较多"],
    ["small", "样本较少"],
  ],
  rl: [
    ["discrete", "离散动作 · 可以采集交互"],
    ["continuous", "连续动作 · 可以采集交互"],
    ["offline", "只有历史轨迹，不能探索"],
    ["immediate", "只优化即时反馈"],
  ],
  genai: [
    ["knowledge", "需要私有 / 更新的知识"],
    ["behavior", "需要改变输出行为"],
  ],
};
function renderChoose() {
  $("#content").innerHTML =
    `<h2 class="view-title">从问题出发，找到候选方法。</h2><p class="view-lead">这是选择入口，不是“输入条件就能确定最优算法”。候选方案仍要在可信验证中比较。</p><div class="chooser"><label for="task">01 · 你要解决哪类问题？<select id="task"><option value="tabular">表格分类 / 回归</option><option value="analytics">业务描述 / 因果分析</option><option value="vision">图像预测</option><option value="text">文本分类 / 预测</option><option value="time">时间序列预测</option><option value="unlabeled">没有标签，想发现结构</option><option value="rl">连续决策与奖励</option><option value="genai">生成式 AI / 知识问答</option></select></label><div id="condition-wrap"></div></div><div id="recommendation" aria-live="polite"></div>`;
  $("#task").addEventListener("change", renderConditions);
  renderConditions();
}
function renderConditions() {
  const task = $("#task").value;
  $("#condition-wrap").innerHTML = conditions[task]
    ? `<label for="condition">02 · 更具体的条件是什么？<select id="condition">${conditions[task].map(([v, t]) => `<option value="${v}">${t}</option>`).join("")}</select></label>`
    : "";
  $("#condition")?.addEventListener("change", renderRecommendation);
  renderRecommendation();
}
function renderRecommendation() {
  const r = recommend($("#task").value, $("#condition")?.value);
  $("#recommendation").innerHTML =
    `<div class="chooser-result"><h3>${r.title}</h3><p>${r.text}</p><div class="related">${links(r.ids)}</div></div>`;
}
function renderRecipes() {
  $("#content").innerHTML =
    `<h2 class="view-title">好方案，是有理由的组合。</h2><p class="view-lead">先看问题，再看组件之间为什么能配合。每个节点都能点开；每次改动都应单独验证。</p><div class="recipe-grid">${recipes.map((r) => `<article class="recipe"><p class="eyebrow">${r.tag}</p><h3>${esc(r.title)}</h3><p>${esc(r.problem)}</p><div class="recipe-chain">${r.steps.map((id, i) => `${i ? '<span aria-hidden="true">→</span>' : ""}<button data-node="${id}">${esc(byId.get(id).title)}</button>`).join("")}</div><p>${esc(r.why)}</p><p class="check"><b>怎么验证：</b>${esc(r.check)}</p></article>`).join("")}</div>`;
}
function renderUpdates() {
  $("#content").innerHTML =
    `<h2 class="view-title">更新知识，而不追逐名词。</h2><p class="view-lead">基于 AMAI 2022 路线图的重构思路，重新编写内容与界面。核查日期 ${reviewed}；不是“所有 2026 技术”的穷尽目录。</p><div class="update-block"><h3>这次重新组织了什么</h3><ul><li>从职业工具清单改为 8 个知识模块，分开学习方式、模型、验证和训练技巧。</li><li>每个节点增加定义、适用条件、使用边界、例子和关联知识。</li><li>新增数据分析 / Kaggle / 生成式 AI 三条学习主线，以及条件选择器与组合方案。</li><li>经典不等于淘汰。“按需”表示对当前目标的优先级，不表示业界弃用。</li></ul></div><div class="update-block"><h3>内容取舍记录</h3><table class="updates-table"><thead><tr><th>内容</th><th>处理与原因</th></tr></thead><tbody><tr><td>LoRA / QLoRA、DPO、GRPO、TabPFN</td><td>补充到适配、后训练、表格模型的位置，写明资源、反馈与规则边界。不是所有任务的默认选择。</td></tr><tr><td>RAG、嵌入、多模态与生成评估</td><td>补充现代应用链路。“新增到本图”不代表发明于 2022 年后；RAG 原论文发表于 2020 年。</td></tr><tr><td>线性模型、树模型、TF-IDF、统计与实验</td><td>保留。仍能提供低成本基线或关键分析能力，不因年代较早而移除。</td></tr><tr><td>RNN / LSTM、SVM</td><td>保留为按需分支。说明适配场景，不放在所有任务的默认主线上。</td></tr><tr><td>大数据平台与分布式技术清单</td><td>缩到工程模块，等规模需求明确再学。对当前数据分析与 Kaggle 目标不必优先。</td></tr><tr><td>余弦退火、温度缩放、阈值、融合</td><td>按训练 / 后处理归位，并区分优化、校准与决策，不再散落在模型树上。</td></tr></tbody></table></div><div class="update-block"><h3>来源与维护</h3><p>节点正文是简明教学归纳，方法适用性是条件建议。重点核查新方法及容易混淆的概念；参考链接指向官方文档或原始论文。滚动文档会变化，具体版本限制以原文为准。</p><ul class="source-links">${["selection", "rl", "peft", "dpo", "grpo", "tabpfn", "temperature", "cosine", "rag", "tuning"].map((id) => `<li><a href="${sources[id][1]}" target="_blank" rel="noopener">${esc(sources[id][0])} ↗</a></li>`).join("")}<li><a href="https://github.com/AMAI-GmbH/AI-Expert-Roadmap" target="_blank" rel="noopener">AMAI 原版路线图 · 灵感来源 ↗</a></li><li><a href="./KNOWLEDGE.md">完整文字版与参考链接 ↗</a></li></ul></div>`;
}
function toast(text) {
  $("#toast").textContent = text;
  $("#toast").classList.add("show");
  setTimeout(() => $("#toast").classList.remove("show"), 2500);
}
function focusNode(id) {
  const n = byId.get(id);
  if (!n) return;
  $("#search").value = "";
  $("#search-results").innerHTML = "";
  go({ node: id, domain: n.domain, view: "map" });
  if (innerWidth <= 1250) {
    $("#detail").scrollIntoView({ behavior: "instant", block: "start" });
  } else {
    $("#workspace").scrollIntoView({ behavior: "instant", block: "start" });
  }
}
document.addEventListener("click", (e) => {
  const n = e.target.closest("[data-node]");
  if (n) {
    focusNode(n.dataset.node);
    return;
  }
  const d = e.target.closest("[data-domain]");
  if (d) {
    go({ domain: d.dataset.domain || null, node: null, view: "map" });
    $("#workspace").scrollIntoView({ behavior: "instant", block: "start" });
    return;
  }
  const v = e.target.closest("[data-view]");
  if (v) {
    go({ view: v.dataset.view });
    return;
  }
  if (e.target.closest("#export-svg")) exportSvg();
  if (e.target.closest("#print")) window.print();
  if (e.target.closest("#read-detail"))
    document
      .querySelector("#detail")
      .scrollIntoView({ behavior: "instant", block: "start" });
  if (e.target.closest("#copy-link")) copyLink();
});
async function copyLink() {
  try {
    await navigator.clipboard.writeText(location.href);
    toast("节点链接已复制");
  } catch {
    toast("无法自动复制，请复制浏览器地址栏中的链接");
  }
}
$("#path").addEventListener("change", (e) => go({ path: e.target.value }));
$("#search").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLocaleLowerCase();
  if (!q) {
    $("#search-results").innerHTML = "";
    return;
  }
  const matches = nodes.filter((n) =>
    [n.title, n.what, n.when, n.id].some((x) =>
      x.toLocaleLowerCase().includes(q),
    ),
  );
  matches.sort(
    (a, b) =>
      Number(b.title.toLowerCase().includes(q)) -
      Number(a.title.toLowerCase().includes(q)),
  );
  $("#search-results").innerHTML =
    `<p>${matches.length ? `找到 ${matches.length} 个节点${matches.length > 20 ? "，先显示前 20 个" : ""}` : "没有匹配结果，试试中文名或英文缩写。"}</p>` +
    matches
      .slice(0, 20)
      .map(
        (n) =>
          `<button data-node="${n.id}">${esc(n.title)}<br><small>${esc(domainById.get(n.domain).title)}</small></button>`,
      )
      .join("");
});
document.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
  ) {
    e.preventDefault();
    $("#search").focus();
  }
  if (e.key === "Escape" && document.activeElement === $("#search")) {
    $("#search").value = "";
    $("#search-results").innerHTML = "";
  }
});
window.addEventListener("popstate", route);
window.addEventListener("hashchange", () => {
  if (location.hash !== "#detail") route();
});
function exportSvg() {
  const d = domainById.get(state.domain);
  const groups = d
    ? sections
        .filter((s) => s.domain === d.id)
        .map((s) => ({
          title: s.title,
          color: d.color,
          items: nodes.filter((n) => n.section === s.id).map((n) => n.title),
        }))
    : domains.map((d) => ({
        title: d.title,
        color: d.color,
        items: sections.filter((s) => s.domain === d.id).map((s) => s.title),
      }));
  const width = 1200,
    pad = 45,
    col = 550;
  let heights = [150, 150];
  const boxes = groups.map((g, i) => {
    const c = i % 2,
      y = heights[c],
      x = pad + c * 580,
      h = 78 + g.items.length * 34;
    heights[c] += h + 24;
    return { g, x, y, h };
  });
  const height = Math.max(...heights) + 65;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f7f8f4"/><g font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif"><text x="45" y="63" font-size="30" font-weight="600" fill="#234d41">知图 · ${esc(d?.title || "数据与 AI 学习地图")}</text><text x="45" y="102" font-size="15" fill="#657565">${reviewed} · 模块表示知识组织，跨模块方法可以组合 · 完整条件见交互版</text>${boxes.map(({ g, x, y, h }) => `<rect x="${x}" y="${y}" width="${col}" height="${h}" rx="10" fill="white" stroke="#dce4d7"/><rect x="${x}" y="${y + 12}" width="4" height="32" fill="${g.color}"/><text x="${x + 24}" y="${y + 37}" font-size="21" fill="${g.color}" font-weight="600">${esc(g.title)}</text><path d="M ${x + 27} ${y + 62} V ${y + h - 20}" stroke="${g.color}" opacity=".4"/>${g.items.map((t, k) => `<path d="M ${x + 27} ${y + 77 + k * 34} H ${x + 40}" stroke="${g.color}" opacity=".4"/><text x="${x + 48}" y="${y + 83 + k * 34}" font-size="15" fill="#34483c">${esc(t)}</text>`).join("")}`).join("")}<text x="45" y="${height - 24}" font-size="12" fill="#657565">AndyShan11 / ai-learning-atlas · github.com/AndyShan11/ai-learning-atlas</text></g></svg>`;
  const url = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `learning-atlas-${d?.id || "overview"}.svg`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("已导出可缩放 SVG");
}
route();
