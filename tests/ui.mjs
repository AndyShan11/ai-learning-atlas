import assert from 'node:assert/strict';
import {mkdir,readFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {nodes,domains} from '../data.js';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright');
let server,serverUrl;
if(!process.env.ATLAS_URL){server=spawn(process.execPath,['scripts/serve.mjs'],{stdio:['ignore','pipe','pipe'],env:{...process.env,PORT:'0'}});serverUrl=await new Promise((resolve,reject)=>{server.stdout.once('data',data=>resolve(data.toString().match(/http:\/\/[^\s]+/)[0]+'/'));server.stderr.on('data',data=>process.stderr.write(data));server.once('error',reject);server.once('exit',code=>reject(new Error('Server exited '+code)));});}
const url=process.env.ATLAS_URL||serverUrl;
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
const page=await browser.newPage({viewport:{width:1600,height:1050},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(url))errors.push(`${r.status()} ${r.url()}`);});
const bodyFits=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal page overflow');
try{
 await page.goto(url);await page.locator('.overview-node').last().waitFor();assert.equal(await page.locator('.overview-node').count(),8);await bodyFits();
 await page.screenshot({path:'test-results/overview-desktop.png',fullPage:true});
 await page.locator('[data-domain="learning"].overview-node').click();
 await page.locator('.leaf[data-node="rl"]').click();assert.match(await page.locator('#detail').innerText(),/长期决策/);assert.ok(page.url().includes('node=rl'));
 await page.locator('#detail [data-node="ppo"]').click();assert.equal(await page.locator('#detail h2').innerText(),'PPO');
 await page.goBack();assert.equal(await page.locator('#detail h2').innerText(),'强化学习');
 await page.locator('#search').fill('余弦');await page.locator('#search-results [data-node="cosine"]').click();assert.equal(await page.locator('#detail h2').innerText(),'余弦退火');
 await page.screenshot({path:'test-results/node-desktop.png',fullPage:true});
 await page.locator('#search').fill('not-a-real-node-987');assert.match(await page.locator('#search-results').innerText(),/没有匹配/);await page.locator('#search').press('Escape');assert.equal(await page.locator('#search').inputValue(),'');
 await page.locator('#path').selectOption('kaggle');assert.equal(await page.locator('.route-strip button').count(),11);
 await page.reload();assert.equal(await page.locator('#path').inputValue(),'kaggle');assert.equal(await page.locator('#detail h2').innerText(),'余弦退火');
 await page.locator('[data-view="choose"]').click();
 await page.locator('#task').selectOption('rl');await page.locator('#condition').selectOption('continuous');assert.match(await page.locator('#recommendation').innerText(),/SAC/);
 await page.locator('#condition').selectOption('offline');assert.ok(await page.locator('#recommendation [data-node="offline-rl"]').count());assert.equal(await page.locator('#recommendation [data-node="sac"]').count(),0);
 await page.locator('#condition').selectOption('immediate');assert.ok(await page.locator('#recommendation [data-node="bandit"]').count());
 for(const task of ['analytics','tabular','vision','text','time','unlabeled','genai']){await page.locator('#task').selectOption(task);assert.ok((await page.locator('#recommendation button').count())>0);}
 await page.locator('#condition').selectOption('behavior');assert.ok(await page.locator('#recommendation [data-node="grpo"]').count());
 await page.locator('[data-view="recipes"]').click();assert.equal(await page.locator('.recipe').count(),8);await page.screenshot({path:'test-results/recipes-desktop.png',fullPage:true});
 await page.locator('[data-view="updates"]').click();assert.match(await page.locator('#content').innerText(),/不代表发明于 2022 年后/);
 await page.goto(url);await page.locator('#export-svg').waitFor();
 const downloadPromise=page.waitForEvent('download');await page.locator('#export-svg').click();const download=await downloadPromise;await download.saveAs('test-results/overview.svg');
 const svg=await readFile('test-results/overview.svg','utf8');assert.ok(svg.includes('数据与 AI 学习地图'));assert.ok(svg.includes('强化学习里怎么选'));assert.equal((svg.match(/font-size="21"/g)||[]).length,8);
 assert.equal(await page.evaluate(s=>new DOMParser().parseFromString(s,'image/svg+xml').querySelectorAll('parsererror').length,svg),0);
 // Every node must be reachable through its actual domain branch and show its own complete note.
 for(const d of domains){await page.locator(`#domain-nav [data-domain="${d.id}"]`).click();for(const n of nodes.filter(n=>n.domain===d.id)){await page.locator(`.leaf[data-node="${n.id}"]`).click();assert.equal(await page.locator('#detail h2').innerText(),n.title);assert.ok((await page.locator('#detail .source-links a').count())>0);}}
 console.log(`PASS desktop: all ${nodes.length} nodes, search, navigation, history, routes, chooser, recipes and SVG export`);
 for(const width of [390,768,1024,1440]){
  await page.setViewportSize({width,height:900});await page.goto(url);await page.locator('.overview-node').last().waitFor();await bodyFits();
  if(width===390)await page.screenshot({path:'test-results/overview-mobile.png',fullPage:true});
  await page.locator('#search').fill('温度');await page.locator('#search-results [data-node="temperature"]').click();assert.match(await page.locator('#detail').innerText(),/不改变 argmax/);await bodyFits();
  if(width===390)await page.screenshot({path:'test-results/node-mobile.png',fullPage:true});
  for(const view of ['choose','recipes','updates']){await page.locator(`[data-view="${view}"]`).click();await bodyFits();}
 }
 assert.deepEqual(errors,[]);console.log('PASS responsive: 390, 768, 1024, 1440 px; no script or same-origin HTTP errors');
}finally{await browser.close();server?.kill();}
