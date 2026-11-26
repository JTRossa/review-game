// Validate every pack in packs/manifest.js:  node tools/check_packs.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.join(__dirname, "..", "packs");
const list = [...fs.readFileSync(path.join(dir, "manifest.js"), "utf8").split("];")[0].matchAll(/"([^"]+\.js)"/g)].map(m => m[1]);
const ctx = { window: {} }; vm.createContext(ctx);
let bad = 0; const ids = new Set();
for (const f of list) {
  const fp = path.join(dir, f);
  if (!fs.existsSync(fp)) { console.log(`✗ ${f}: listed in manifest but file missing`); bad++; continue; }
  const before = (ctx.window.BOX_BLAST_PACKS || []).length;
  try { vm.runInContext(fs.readFileSync(fp, "utf8"), ctx); } catch (e) { console.log(`✗ ${f}: syntax error: ${e.message}`); bad++; continue; }
  const p = (ctx.window.BOX_BLAST_PACKS || [])[before];
  if (!p) { console.log(`✗ ${f}: did not push a pack`); bad++; continue; }
  const errs = [];
  if (!p.id || ids.has(p.id)) errs.push(`missing or duplicate id "${p.id}"`); ids.add(p.id);
  if (!p.title) errs.push("missing title"); if (!p.subject) errs.push("missing subject");
  (p.questions || []).forEach((q, i) => {
    const n = `Q${i + 1}`;
    if (!q.q) errs.push(`${n}: no question text`);
    if (!q.topic) errs.push(`${n}: no topic`);
    if (q.type === "open") { if (!q.model) errs.push(`${n}: open question without model answer`); }
    else {
      if (!Array.isArray(q.o) || q.o.length < 2 || q.o.length > 4) errs.push(`${n}: needs 2 to 4 options`);
      else if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length)) errs.push(`${n}: answer index a out of range`);
      else if (new Set(q.o).size !== q.o.length) errs.push(`${n}: duplicate options`);
      if (!q.e) errs.push(`${n}: no explanation (e)`);
    }
  });
  const qs = p.questions || [], open = qs.filter(q => q.type === "open").length;
  const spread = [0, 0, 0, 0]; qs.forEach(q => { if (q.type !== "open") spread[q.a]++; });
  const topics = {}; qs.forEach(q => topics[q.topic] = (topics[q.topic] || 0) + 1);
  if (qs.length < 30) errs.push(`only ${qs.length} questions (aim for 40+ so a 30-box board doesn't repeat)`);
  if (errs.length) { bad++; console.log(`✗ ${f}`); errs.forEach(e => console.log("   " + e)); }
  else console.log(`✓ ${f}: ${p.subject} · ${p.title} · ${qs.length} questions (${open} open)\n   topics: ${Object.entries(topics).map(([k, v]) => `${k} ${v}`).join(", ")}`);
}
process.exit(bad ? 1 : 0);
