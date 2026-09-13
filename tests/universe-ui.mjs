import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import {
  nodes,
  nodeMap,
  domains,
  relations,
  recipes,
  ancestors,
} from "../universe-data.js";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
let server,
  url = process.env.ATLAS_URL;
if (!url) {
  server = spawn(process.execPath, ["scripts/serve.mjs"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: "0" },
  });
  url = await new Promise((resolve, reject) => {
    server.stdout.once("data", (d) =>
      resolve(d.toString().match(/http:\/\/\S+/)[0] + "/"),
    );
    server.once("error", reject);
    server.stderr.on("data", (d) => process.stderr.write(d));
  });
}
await mkdir("test-results", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
});
const page = await browser.newPage({
  viewport: { width: 1600, height: 1050 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const select = async (id) => {
  await page.locator("#search").fill(nodeMap.get(id).title);
  await page.locator(`#search-results [data-node="${id}"]`).click();
};
const fits = async () =>
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    "No page overflow",
  );
try {
  await page.goto(url);
  await page.locator(".planet-node").last().waitFor();
  assert.equal(await page.locator(".planet-node").count(), nodes.length);
  assert.equal(await page.locator(".hierarchy-edge").count(), nodes.length - 1);
  await fits();
  await page.screenshot({
    path: "test-results/universe-overview.png",
    fullPage: true,
  });
  if (process.env.SMOKE_ONLY) {
    console.log("Smoke complete");
  } else {
    await page.locator('.planet-node[data-id="learning"] .planet-body').hover();
    assert.equal(
      await page.locator(".node-tooltip strong").innerText(),
      nodeMap.get("learning").title,
    );
    const normalCanvas = await page.locator("#universe").boundingBox();
    await page.locator("#immersive-toggle").click();
    await page.waitForFunction(() =>
      document.body.classList.contains("immersive"),
    );
    const immersiveCanvas = await page.locator("#universe").boundingBox();
    assert.ok(immersiveCanvas.width > normalCanvas.width);
    await page.waitForFunction(() => Number(document.querySelector('.universe-svg').dataset.zoom) > 0.18);
    await page.screenshot({
      path: "test-results/universe-immersive.png",
      fullPage: true,
    });
    await page.keyboard.press("Escape");
    assert.equal(
      await page.locator("#immersive-toggle").getAttribute("aria-pressed"),
      "false",
    );
    const beforeDouble = Number(
      await page.locator(".universe-svg").getAttribute("data-zoom"),
    );
    await page
      .locator('.planet-node[data-id="learning"] .planet-body')
      .dblclick();
    assert.ok(
      Number(await page.locator(".universe-svg").getAttribute("data-zoom")) >
        beforeDouble,
    );
    await select("supervised");
    assert.equal(await page.locator("#detail h2").innerText(), "监督学习");
    assert.equal(await page.locator("#detail .child-links button").count(), 3);
    await page.screenshot({
      path: "test-results/universe-supervised.png",
      fullPage: true,
    });
    await page.locator('#detail [data-node="classification"]').click();
    assert.equal(await page.locator("#detail .child-links button").count(), 3);
    assert.ok(
      await page
        .locator(
          '.semantic-edge[data-source="gbdt"][data-target="classification"]',
        )
        .count(),
    );
    await page.locator("#close-detail").click();
    // Direct selection on the actual SVG must work, not only HTML links.
    await page
      .locator('.planet-node[data-id="classification"] .planet-body')
      .click({ force: true });
    assert.equal(await page.locator("#detail h2").innerText(), "分类任务");
    await select("cosine");
    assert.ok(
      await page
        .locator('.semantic-edge[data-source="cnn"][data-target="cosine"]')
        .count(),
    );
    assert.equal(
      await page.locator(".ancestry-edge").count(),
      ancestors("cosine").length - 1,
    );
    await page.locator("#fit-all").click();
    await page.locator("#close-detail").click();
    const z = Number(
      await page.locator(".universe-svg").getAttribute("data-zoom"),
    );
    await page.locator("#zoom-in").click();
    assert.ok(
      Number(await page.locator(".universe-svg").getAttribute("data-zoom")) > z,
    );
    const before = await page
      .locator(".universe-world")
      .getAttribute("transform");
    const box = await page.locator(".universe-svg").boundingBox();
    await page.mouse.move(box.x + 30, box.y + 150);
    await page.mouse.down();
    await page.mouse.move(box.x + 100, box.y + 210);
    await page.mouse.up();
    assert.notEqual(
      await page.locator(".universe-world").getAttribute("transform"),
      before,
    );
    await select("rl");
    await page.locator("#collapse-selection").click();
    assert.equal(await page.locator('.planet-node[data-id="dqn"]').count(), 0);
    await page.locator("#expand-all").click();
    assert.equal(await page.locator(".planet-node").count(), nodes.length);
    await page.locator("#depth-limit").selectOption("2");
    assert.equal(await page.locator('.planet-node[data-depth="3"]').count(), 0);
    const limitedCount = await page.locator(".planet-node").count();
    const fullExport = page.waitForEvent("download");
    await page.locator("#export-svg").click();
    await (await fullExport).saveAs("test-results/full-from-collapsed.svg");
    const fullText = await readFile(
      "test-results/full-from-collapsed.svg",
      "utf8",
    );
    assert.equal(
      (fullText.match(/class="planet-node /g) || []).length,
      nodes.length,
    );
    assert.equal(await page.locator(".planet-node").count(), limitedCount);
    await select("dqn");
    assert.equal(await page.locator("#depth-limit").inputValue(), "99");
    assert.equal(await page.locator("#detail h2").innerText(), "DQN");
    assert.ok(await page.locator('.planet-node[data-id="dqn"]').count());
    await page.locator("#layout-tree").click();
    assert.equal(
      await page.locator("#layout-tree").getAttribute("aria-pressed"),
      "true",
    );
    await select("unsupervised");
    await page.screenshot({
      path: "test-results/universe-tree.png",
      fullPage: true,
    });
    assert.equal(await page.locator("#detail .child-links button").count(), 4);
    await page.locator("#all-relations").check();
    assert.ok((await page.locator(".semantic-edge").count()) > 40);
    await page.locator("#relations-toggle").uncheck();
    assert.equal(await page.locator(".semantic-edge").count(), 0);
    await page.locator("#relations-toggle").check();
    const downloadP = page.waitForEvent("download");
    await page.locator("#export-svg").click();
    const download = await downloadP;
    await download.saveAs("test-results/universe.svg");
    const svg = await readFile("test-results/universe.svg", "utf8");
    assert.equal(
      await page.evaluate(
        (s) =>
          new DOMParser()
            .parseFromString(s, "image/svg+xml")
            .querySelectorAll("parsererror").length,
        svg,
      ),
      0,
    );
    for (const n of nodes) assert.ok(svg.includes(`data-id="${n.id}"`), n.id);
    await page.locator("#path").selectOption("kaggle");
    assert.ok((await page.locator(".on-route").count()) > 5);
    await page.reload();
    assert.equal(await page.locator("#path").inputValue(), "kaggle");
    assert.equal(await page.locator("#detail h2").innerText(), "无监督学习");
    await page.locator('[data-view="choose"]').click();
    await page.locator("#task").selectOption("rl");
    await page.locator("#condition").selectOption("continuous");
    assert.match(await page.locator("#recommendation").innerText(), /SAC/);
    await page.locator('#recommendation [data-node="sac"]').click();
    assert.equal(await page.locator("#detail h2").innerText(), "SAC / TD3");
    await page.locator('[data-view="recipes"]').click();
    assert.equal(await page.locator(".recipe").count(), recipes.length);
    await page.locator('[data-view="updates"]').click();
    await fits();
    // Every expanded node has a usable note, ancestry and child navigation.
    await page.goto(url);
    for (const n of nodes) {
      await page.evaluate((id) => {
        const el = document.querySelector(`.planet-node[data-id="${id}"]`);
        el.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
        );
      }, n.id);
      assert.equal(await page.locator("#detail h2").innerText(), n.title);
      assert.equal(
        await page.locator("#detail .child-links button").count(),
        n.children.length,
      );
    }
    console.log(
      `PASS ${nodes.length} reachable nodes, hierarchy, semantic links, zoom, drag, collapse, depth, layouts, export and existing tools`,
    );
    for (const width of [390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await page.goto(url);
      await page.locator(".planet-node").last().waitFor();
      await fits();
      await select("supervised");
      await fits();
      assert.equal(await page.locator("#detail h2").innerText(), "监督学习");
      if (width === 390)
        await page.screenshot({
          path: "test-results/universe-mobile.png",
          fullPage: true,
        });
      await page.locator("#close-detail").click();
      await page.locator("#layout-tree").click();
      await fits();
    }
    await page.setViewportSize({ width: 390, height: 950 });
    await page.goto(url);
    await page.locator(".planet-node").last().waitFor();
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: true });
    const touchBox = await page.locator(".universe-svg").boundingBox(),
      cx = touchBox.x + touchBox.width / 2,
      cy = touchBox.y + 160;
    const oldZoom = Number(
      await page.locator(".universe-svg").getAttribute("data-zoom"),
    );
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [
        { x: cx - 20, y: cy, id: 1 },
        { x: cx + 20, y: cy, id: 2 },
      ],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        { x: cx - 55, y: cy, id: 1 },
        { x: cx + 55, y: cy, id: 2 },
      ],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    assert.ok(
      Number(await page.locator(".universe-svg").getAttribute("data-zoom")) >
        oldZoom,
    );
    await cdp.detach();
    assert.deepEqual(errors, []);
    console.log("PASS responsive, pinch zoom and zero JS errors");
  }
} finally {
  await browser.close();
  server?.kill();
}
