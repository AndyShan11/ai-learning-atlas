import {
  nodes,
  nodeMap,
  domains,
  hierarchy,
  relations,
  relationTypes,
  ancestors,
  descendants,
  paths,
} from "./universe-data.js";
const NS = "http://www.w3.org/2000/svg";
const colors = new Map(domains.map((d) => [d.id, d.color]));
const color = (n) => colors.get(n.domain) || "#eedc9c";
const xml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
export function layoutTree(mode = "orbit") {
  const positions = new Map();
  let leaf = 0;
  function weigh(id) {
    const n = nodeMap.get(id);
    return n.children.length ? n.children.reduce((a, c) => a + weigh(c), 0) : 1;
  }
  if (mode === "orbit") {
    function radial(id, start, end) {
      const n = nodeMap.get(id),
        angle = (start + end) / 2,
        r = n.depth === 0 ? 0 : 800 + (n.depth - 1) * 360;
      positions.set(id, {
        x: n.depth ? Math.cos(angle) * r : 0,
        y: n.depth ? Math.sin(angle) * r : 0,
        angle,
        depth: n.depth,
      });
      let a = start;
      const total = weigh(id);
      for (const child of n.children) {
        const span =
          (end - start) *
          (id === "universe" ? 1 / n.children.length : weigh(child) / total);
        radial(child, a, a + span);
        a += span;
      }
    }
    radial("universe", -Math.PI / 2, Math.PI * 1.5);
  } else {
    function tidy(id) {
      const n = nodeMap.get(id);
      let y;
      if (!n.children.length) y = leaf++ * 53;
      else {
        const ys = n.children.map(tidy);
        y = (ys[0] + ys.at(-1)) / 2;
      }
      positions.set(id, { x: n.depth * 310, y, angle: 0, depth: n.depth });
      return y;
    }
    tidy("universe");
    const center = positions.get("universe").y;
    for (const p of positions.values()) p.y -= center;
  }
  return positions;
}
export function createUniverse(container, { onSelect }) {
  let mode = "orbit",
    positions = layoutTree(),
    selected = null,
    path = "all",
    zoom = 1,
    tx = 0,
    ty = 0;
  let collapsed = new Set(),
    depth = 99,
    allRelations = false,
    showRelations = true,
    allLabels = false,
    pointers = new Map(),
    dragged = false,
    gesture = null,
    pointerNode = null;
  let width = container.clientWidth,
    height = container.clientHeight;
  const defs = `<defs><radialGradient id="nebula"><stop offset="0" stop-color="#799ab5" stop-opacity=".11"/><stop offset=".5" stop-color="#7394ba" stop-opacity=".035"/><stop offset="1" stop-color="#7394ba" stop-opacity="0"/></radialGradient>${[...domains, { id: "core", color: "#efd59a" }].map((d) => `<radialGradient id="planet-${d.id}" cx="30%" cy="25%" r="83%"><stop offset="0" stop-color="#ffffff"/><stop offset=".12" stop-color="${d.color}"/><stop offset=".48" stop-color="${d.color}" stop-opacity=".72"/><stop offset=".82" stop-color="#162333"/><stop offset="1" stop-color="#080c19"/></radialGradient>`).join("")}<filter id="soft-glow" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="14"/></filter><marker id="arrow-applies" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10" fill="#83b9ff"/></marker><marker id="arrow-requires" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10" fill="#e1bf79"/></marker></defs>`;
  container.innerHTML = `<svg class="universe-svg" tabindex="0" role="group" aria-label="完整知识宇宙。滚轮缩放、拖动平移。Tab 选择节点，Enter 查看，双击聚焦。" xmlns="${NS}">${defs}<g class="universe-world"><g class="galactic-atmosphere" aria-hidden="true"></g><g class="orbits" aria-hidden="true"></g><g class="tree-edges" aria-hidden="true"></g><g class="semantic-edges" aria-hidden="true"></g><g class="planet-nodes"></g></g></svg><div class="canvas-hint">拖动探索 · 滚轮缩放 · 双击聚焦子树</div><div class="canvas-scale" aria-live="polite"></div><div class="mini-map" aria-label="全图定位"><svg viewBox="-2100 -2100 4200 4200" aria-hidden="true"></svg><span>全图定位</span></div>`;
  const svg = container.querySelector("svg"),
    world = container.querySelector(".universe-world"),
    edgeLayer = container.querySelector(".tree-edges"),
    relationLayer = container.querySelector(".semantic-edges"),
    nodeLayer = container.querySelector(".planet-nodes"),
    orbits = container.querySelector(".orbits"),
    mini = container.querySelector(".mini-map svg");
  function visible(n) {
    if (n.depth > depth) return false;
    return !ancestors(n.id)
      .slice(0, -1)
      .some((p) => collapsed.has(p.id));
  }
  function build() {
    positions = layoutTree(mode);
    const active = nodes.filter(visible),
      ids = new Set(active.map((n) => n.id));
    container.querySelector(".galactic-atmosphere").innerHTML =
      mode === "orbit"
        ? domains
            .map((d, i) => {
              const a = -Math.PI / 2 + ((i + 0.5) * Math.PI) / 4;
              return (
                '<ellipse cx="' +
                Math.cos(a) * 1420 +
                '" cy="' +
                Math.sin(a) * 1420 +
                '" rx="800" ry="520" transform="rotate(' +
                (a * 180) / Math.PI +
                " " +
                Math.cos(a) * 1420 +
                " " +
                Math.sin(a) * 1420 +
                ')" fill="url(#nebula)"/>'
              );
            })
            .join("") +
          '<circle r="390" fill="none" stroke="#d9c292" stroke-opacity=".08" stroke-dasharray="2 18" stroke-width="2"/><circle r="270" fill="none" stroke="#d9c292" stroke-opacity=".07" stroke-width="1"/>'
        : "";
    orbits.innerHTML =
      mode === "orbit"
        ? [800, 1160, 1520, 1880, 2240]
            .map(
              (r) =>
                `<circle r="${r}" fill="none" stroke="#93a7d0" stroke-opacity=".08" stroke-dasharray="3 16" stroke-width="1"/>`,
            )
            .join("")
        : "";
    edgeLayer.innerHTML = hierarchy
      .filter((e) => ids.has(e.source) && ids.has(e.target))
      .map((e) => {
        const a = positions.get(e.source),
          b = positions.get(e.target);
        const d =
          mode === "orbit"
            ? `M${a.x},${a.y} Q${a.x * 0.35 + b.x * 0.65},${a.y * 0.65 + b.y * 0.35} ${b.x},${b.y}`
            : `M${a.x},${a.y} C${(a.x + b.x) / 2},${a.y} ${(a.x + b.x) / 2},${b.y} ${b.x},${b.y}`;
        return `<path class="hierarchy-edge" data-source="${e.source}" data-target="${e.target}" d="${d}" fill="none" stroke="${color(nodeMap.get(e.target))}" stroke-opacity=".31" stroke-width="1.3" vector-effect="non-scaling-stroke"/>`;
      })
      .join("");
    nodeLayer.innerHTML = active
      .map((n) => {
        const p = positions.get(n.id),
          r = [115, 95, 18, 10, 6, 5][n.depth] || 5;
        const main = n.depth <= 1;
        let angle =
          mode === "orbit" && n.depth >= 2 ? (p.angle * 180) / Math.PI : 0;
        const flip = mode === "orbit" && n.depth >= 2 && Math.cos(p.angle) < 0;
        if (flip) angle += 180;
        const outward = false;
        const mainLeft = outward && Math.cos(p.angle) < 0;
        const labelX = outward
          ? mainLeft
            ? -r - 22
            : r + 22
          : main
            ? 0
            : flip
              ? -r - 12
              : r + 12;
        const labelY = main && !outward ? r + 72 : 5;
        return `<g class="planet-node depth-${n.depth}" data-id="${n.id}" data-depth="${n.depth}" tabindex="0" role="button" aria-label="${xml(n.title)}${n.children.length ? "，" + n.children.length + " 个直接子节点" : ""}" aria-pressed="false" transform="translate(${p.x} ${p.y})"><title>${xml(
          ancestors(n.id)
            .map((n) => n.title)
            .join(" → "),
        )}</title>${main ? `<circle class="planet-halo" r="${r * 1.7}" fill="${color(n)}" opacity=".14" filter="url(#soft-glow)"/>` : ""}<circle class="selection-orbit" r="${r + 8}" fill="none" stroke="${color(n)}" stroke-width="1.2" opacity="0" vector-effect="non-scaling-stroke"/>${main ? `<ellipse rx="${r * 1.5}" ry="${r * 0.34}" transform="rotate(-28)" fill="none" stroke="${color(n)}" stroke-opacity=".5" stroke-width="2.5"/>` : ""}<circle class="planet-body" r="${r}" fill="${main ? "url(#planet-" + (n.domain || "core") + ")" : color(n)}" stroke="${color(n)}" stroke-width=".6"/>${main ? `<path d="M${-r * 0.75} ${-r * 0.23} Q0 ${-r * 0.75} ${r * 0.7} ${-r * 0.1}" stroke="#ffffff" stroke-opacity=".12" stroke-width="${r * 0.12}" fill="none"/><ellipse rx="${r * 1.5}" ry="${r * 0.34}" transform="rotate(-28)" fill="none" stroke="${color(n)}" stroke-opacity=".13" stroke-width="8"/>` : ""}<circle class="node-hit" r="${Math.max(17, r)}" fill="transparent"/><g class="label-group" transform="rotate(${angle})"><text class="planet-label" x="${labelX}" y="${labelY}" text-anchor="${outward ? (mainLeft ? "end" : "start") : main ? "middle" : flip ? "end" : "start"}" fill="${main ? "#e8ecf7" : "#bbc8e0"}" font-size="${main ? 23 : 14}" paint-order="stroke" stroke="#070d1d" stroke-width="4" stroke-linejoin="round">${xml(n.title)}</text></g>${collapsed.has(n.id) ? `<text class="collapsed-count" y="${-r - 12}" text-anchor="middle" fill="#f7d297" font-size="15">+${descendants(n.id).length - 1}</text>` : ""}</g>`;
      })
      .join("");
    mini.innerHTML =
      hierarchy
        .map((e) => {
          const a = positions.get(e.source),
            b = positions.get(e.target);
          return `<path d="M${a.x} ${a.y} L${b.x} ${b.y}" stroke="${color(nodeMap.get(e.target))}" stroke-opacity=".6" stroke-width="12"/>`;
        })
        .join("") +
      '<rect class="mini-window" fill="#ffffff0d" stroke="#bacbf0" stroke-width="15"/>';
    if (mode === "tree") {
      const ys = [...positions.values()].map((p) => p.y);
      mini.setAttribute(
        "viewBox",
        `-100 ${Math.min(...ys) - 100} 1950 ${Math.max(...ys) - Math.min(...ys) + 200}`,
      );
    } else mini.setAttribute("viewBox", "-2550 -2550 5100 5100");
    highlight();
    transform();
  }
  function highlight() {
    const chain = new Set(selected ? ancestors(selected).map((n) => n.id) : []),
      near = new Set([selected]),
      subtree = new Set(selected ? descendants(selected).map((n) => n.id) : []);
    const visibleIds = new Set(nodes.filter(visible).map((n) => n.id));
    let rels = showRelations
      ? relations.filter(
          (r) =>
            visibleIds.has(r.source) &&
            visibleIds.has(r.target) &&
            (allRelations || r.source === selected || r.target === selected),
        )
      : [];
    rels.forEach((r) => {
      near.add(r.source);
      near.add(r.target);
    });
    const routeIds = new Set(paths[path]?.steps || []);
    nodeLayer.querySelectorAll(".planet-node").forEach((el) => {
      const id = el.dataset.id;
      el.classList.toggle("selected", id === selected);
      el.classList.toggle("ancestor", chain.has(id));
      el.classList.toggle("neighbor", near.has(id) && id !== selected);
      el.classList.toggle(
        "reveal-label",
        subtree.size <= 20
          ? subtree.has(id)
          : nodeMap.get(id).parent === selected,
      );
      el.classList.toggle(
        "off-focus",
        Boolean(selected) &&
          !chain.has(id) &&
          !near.has(id) &&
          !subtree.has(id),
      );
      el.classList.toggle("on-route", routeIds.has(id));
      el.setAttribute("aria-pressed", String(id === selected));
    });
    edgeLayer.querySelectorAll("path").forEach((el) => {
      const on = chain.has(el.dataset.target) && chain.has(el.dataset.source);
      el.classList.toggle("ancestry-edge", on);
      el.setAttribute(
        "stroke-opacity",
        on
          ? "1"
          : subtree.has(el.dataset.source)
            ? ".55"
            : selected
              ? ".1"
              : ".31",
      );
      el.setAttribute("stroke-width", on ? "2.5" : "1.3");
    });
    relationLayer.innerHTML = rels
      .map((r) => {
        const a = positions.get(r.source),
          b = positions.get(r.target),
          cx = (a.x + b.x) / 2,
          cy = (a.y + b.y) / 2 - 90;
        return `<g class="semantic-edge" data-source="${r.source}" data-target="${r.target}" data-type="${r.type}"><path d="M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}" fill="none" stroke="${relationTypes[r.type].color}" stroke-width="1.4" stroke-dasharray="${relationTypes[r.type].dash}" stroke-opacity="${allRelations ? ".38" : ".85"}" vector-effect="non-scaling-stroke" ${["requires", "applies"].includes(r.type) ? `marker-end="url(#arrow-${r.type})"` : ""}/><text class="edge-label" x="${cx}" y="${(a.y + b.y) / 2 - 45}" text-anchor="middle" fill="${relationTypes[r.type].color}" stroke="#080e1e" stroke-width="5" paint-order="stroke">${r.label}</text></g>`;
      })
      .join("");
    transform();
  }
  function transform() {
    world.setAttribute("transform", `translate(${tx} ${ty}) scale(${zoom})`);
    svg.dataset.zoom = zoom.toFixed(4);
    nodeLayer.querySelectorAll(".planet-node").forEach((el) => {
      const n = nodeMap.get(el.dataset.id),
        label = el.querySelector(".planet-label");
      const important =
        el.classList.contains("selected") ||
        el.classList.contains("ancestor") ||
        el.classList.contains("neighbor") ||
        el.classList.contains("reveal-label");
      let shown =
        allLabels ||
        n.depth <= 1 ||
        important ||
        (zoom > 0.37 && n.depth === 2) ||
        (zoom > 0.65 && n.depth === 3) ||
        zoom > 1.0;
      label.style.display = shown ? "" : "none";
      label.setAttribute(
        "font-size",
        n.depth <= 1
          ? Math.min(94, 13 / zoom)
          : important
            ? Math.min(34, 14 / zoom)
            : Math.min(23, 13 / zoom),
      );
    });
    relationLayer.querySelectorAll(".edge-label").forEach((el) => {
      el.setAttribute("font-size", Math.min(32, 12 / zoom));
      el.style.display = allRelations && zoom < 0.55 ? "none" : "";
    });
    container.querySelector(".canvas-scale").textContent =
      `${Math.round(zoom * 100)}% · ${nodes.filter(visible).length} / ${nodes.length} 星体`;
    const rect = mini.querySelector("rect");
    if (rect) {
      rect.setAttribute("x", -tx / zoom);
      rect.setAttribute("y", -ty / zoom);
      rect.setAttribute("width", width / zoom);
      rect.setAttribute("height", height / zoom);
    }
  }
  function fit(ids, padding = 100) {
    const ps = ids.map((id) => positions.get(id));
    if (!ps.length) return;
    const minX = Math.min(...ps.map((p) => p.x)) - 100,
      maxX = Math.max(...ps.map((p) => p.x)) + 100,
      minY = Math.min(...ps.map((p) => p.y)) - 100,
      maxY = Math.max(...ps.map((p) => p.y)) + 100;
    zoom = Math.max(
      0.065,
      Math.min(
        1.35,
        (width - padding) / (maxX - minX),
        (height - padding) / (maxY - minY),
      ),
    );
    tx = width / 2 - ((minX + maxX) / 2) * zoom;
    ty = height / 2 - ((minY + maxY) / 2) * zoom;
    transform();
  }
  function home() {
    fit(
      nodes.filter(visible).map((n) => n.id),
      60,
    );
  }
  function focus(id) {
    container.dispatchEvent(new CustomEvent("depthreset"));
    const n = nodeMap.get(id);
    ancestors(id).forEach((a) => collapsed.delete(a.id));
    depth = 99;
    build();
    if (n.children.length)
      fit(
        descendants(id)
          .filter(visible)
          .map((n) => n.id),
        90,
      );
    else {
      const p = positions.get(id);
      zoom = 1.25;
      tx = width / 2 - p.x * zoom;
      ty = height / 2 - p.y * zoom;
      transform();
    }
  }
  function zoomBy(factor, x = width / 2, y = height / 2) {
    const next = Math.min(4, Math.max(0.065, zoom * factor));
    tx = x - ((x - tx) * next) / zoom;
    ty = y - ((y - ty) * next) / zoom;
    zoom = next;
    transform();
  }
  svg.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const r = svg.getBoundingClientRect();
      zoomBy(
        Math.exp(-e.deltaY * 0.0015),
        e.clientX - r.left,
        e.clientY - r.top,
      );
    },
    { passive: false },
  );
  const tooltip = document.createElement("div");
  tooltip.className = "node-tooltip";
  tooltip.hidden = true;
  tooltip.innerHTML = "<small></small><strong></strong><p></p>";
  container.append(tooltip);
  svg.addEventListener("pointermove", (e) => {
    const id = e.target.closest(".planet-node")?.dataset.id;
    const n = nodeMap.get(id);
    if (!n || pointers.size || e.pointerType === "touch") {
      tooltip.hidden = true;
      return;
    }
    tooltip.style.setProperty("--node-color", color(n));
    tooltip.querySelector("small").textContent = n.children.length
      ? n.children.length + " 个分支 · 双击探索"
      : "知识点 · 点击查看";
    tooltip.querySelector("strong").textContent = n.title;
    tooltip.querySelector("p").textContent = n.what;
    tooltip.hidden = false;
    const box = container.getBoundingClientRect();
    tooltip.style.left =
      Math.max(
        12,
        Math.min(e.clientX - box.left + 18, width - tooltip.offsetWidth - 12),
      ) + "px";
    tooltip.style.top =
      Math.max(
        12,
        Math.min(e.clientY - box.top + 18, height - tooltip.offsetHeight - 12),
      ) + "px";
  });
  svg.addEventListener("pointerleave", () => {
    tooltip.hidden = true;
  });
  svg.addEventListener("pointerdown", (e) => {
    tooltip.hidden = true;
    if (e.button !== 0) return;
    pointerNode = e.target.closest(".planet-node")?.dataset.id || null;
    const r = svg.getBoundingClientRect();
    pointers.set(e.pointerId, { x: e.clientX - r.left, y: e.clientY - r.top });
    svg.setPointerCapture(e.pointerId);
    dragged = false;
    if (pointers.size === 1) gesture = { tx, ty, x: e.clientX, y: e.clientY };
    else {
      const [a, b] = [...pointers.values()];
      gesture = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        zoom,
        tx,
        ty,
        cx: (a.x + b.x) / 2,
        cy: (a.y + b.y) / 2,
      };
    }
  });
  svg.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    const r = svg.getBoundingClientRect();
    pointers.set(e.pointerId, { x: e.clientX - r.left, y: e.clientY - r.top });
    if (pointers.size === 2 && gesture.distance) {
      const [a, b] = [...pointers.values()],
        next = Math.min(
          4,
          Math.max(
            0.065,
            (gesture.zoom * Math.hypot(a.x - b.x, a.y - b.y)) /
              gesture.distance,
          ),
        );
      tx = (a.x + b.x) / 2 - ((gesture.cx - gesture.tx) * next) / gesture.zoom;
      ty = (a.y + b.y) / 2 - ((gesture.cy - gesture.ty) * next) / gesture.zoom;
      zoom = next;
      dragged = true;
    } else if (pointers.size === 1 && gesture.x !== undefined) {
      const dx = e.clientX - gesture.x,
        dy = e.clientY - gesture.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) dragged = true;
      tx = gesture.tx + dx;
      ty = gesture.ty + dy;
    }
    transform();
  });
  const end = (e) => {
    const tapped =
      e.type === "pointerup" && !dragged && pointers.size === 1
        ? pointerNode
        : null;
    pointers.delete(e.pointerId);
    if (tapped) onSelect(tapped, false);
    if (pointers.size === 1) {
      const p = [...pointers.values()][0],
        r = svg.getBoundingClientRect();
      gesture = { tx, ty, x: p.x + r.left, y: p.y + r.top };
    }
    setTimeout(() => {
      if (!pointers.size) dragged = false;
    }, 0);
  };
  svg.addEventListener("pointerup", end);
  svg.addEventListener("pointercancel", end);

  svg.addEventListener("dblclick", (e) => {
    const id = e.target.closest(".planet-node")?.dataset.id || pointerNode;
    if (id) focus(id);
  });
  svg.addEventListener("keydown", (e) => {
    const n = e.target.closest(".planet-node");
    if (n && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onSelect(n.dataset.id, false);
      focus(n.dataset.id);
    } else if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      zoomBy(1.25);
    } else if (e.key === "-") {
      e.preventDefault();
      zoomBy(0.8);
    } else if (e.key === "Home") {
      e.preventDefault();
      home();
    } else if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
    ) {
      e.preventDefault();
      tx += e.key === "ArrowLeft" ? 65 : e.key === "ArrowRight" ? -65 : 0;
      ty += e.key === "ArrowUp" ? 65 : e.key === "ArrowDown" ? -65 : 0;
      transform();
    }
  });
  container.querySelector(".mini-map").addEventListener("click", home);
  const observer = new ResizeObserver(() => {
    const w = container.clientWidth,
      h = container.clientHeight;
    tx += (w - width) / 2;
    ty += (h - height) / 2;
    width = w;
    height = h;
    transform();
  });
  observer.observe(container);
  build();
  home();
  return {
    select(id, shouldFocus = false) {
      selected = id;
      highlight();
      if (shouldFocus && id) focus(id);
    },
    path(id) {
      path = id;
      highlight();
    },
    home,
    focus,
    zoomBy,
    mode(value) {
      mode = value;
      build();
      selected ? focus(selected) : home();
    },
    depth(value) {
      depth = Number(value);
      build();
      home();
    },
    relations(value) {
      showRelations = value;
      highlight();
    },
    allRelations(value) {
      allRelations = value;
      highlight();
    },
    labels(value) {
      allLabels = value;
      transform();
    },
    toggle(id) {
      if (collapsed.has(id)) collapsed.delete(id);
      else collapsed.add(id);
      build();
    },
    expandAll() {
      collapsed.clear();
      depth = 99;
      build();
      home();
    },
    destroy() {
      observer.disconnect();
    },
    exportSvg() {
      const savedCollapsed = collapsed,
        savedDepth = depth;
      collapsed = new Set();
      depth = 99;
      build();
      const clone = svg.cloneNode(true);
      const ps = [...positions.values()];
      const minX = Math.min(...ps.map((p) => p.x)) - 300,
        minY = Math.min(...ps.map((p) => p.y)) - 300,
        maxX = Math.max(...ps.map((p) => p.x)) + 300,
        maxY = Math.max(...ps.map((p) => p.y)) + 300;
      clone.setAttribute(
        "viewBox",
        `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
      );
      clone.setAttribute("width", maxX - minX);
      clone.setAttribute("height", maxY - minY);
      clone.querySelector(".universe-world").removeAttribute("transform");
      clone.querySelectorAll(".planet-label").forEach((el) => {
        el.style.display = "";
        el.setAttribute(
          "font-size",
          el.closest(".depth-0,.depth-1") ? "26" : "14",
        );
      });
      const background = document.createElementNS(NS, "rect");
      for (const [k, v] of Object.entries({
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        fill: "#080d1c",
      }))
        background.setAttribute(k, v);
      clone.insertBefore(background, clone.firstChild);
      collapsed = savedCollapsed;
      depth = savedDepth;
      build();
      return new XMLSerializer().serializeToString(clone);
    },
  };
}
