fetch('palettes.json')
  .then(r => {
    if (!r.ok) throw new Error('Could not load palettes.json');
    return r.json();
  })
  .then(data => initApp(data))
  .catch(err => {
    document.getElementById('grid').innerHTML =
      '<div style="padding:60px;color:#f97316;font-family:monospace">⚠ ' + err.message +
      '<br><small style="color:#6b7280">Run via a local server: python3 -m http.server</small></div>';
  });

function initApp(PALETTES) {
// ── RENDER ──
const variables = [...new Set(PALETTES.map(p => p.variable))];
const varChips = document.getElementById('var-chips');

let activeVar = 'all';
let activeFilters = new Set();
let searchQuery = '';
let currentPalette = null;
let activeCodeTab = 'r';

// Stat counts — auto-computed from PALETTES array
document.getElementById('stat-palettes').textContent = PALETTES.length;
document.getElementById('stat-vars').textContent = variables.length;
document.getElementById('stat-safe').textContent = PALETTES.filter(p => p.blindsafe).length;

// Variable chips
const allChip = document.createElement('button');
allChip.className = 'chip active';
allChip.textContent = '★ All';
allChip.onclick = () => setVar('all', allChip);
varChips.appendChild(allChip);

variables.forEach(v => {
  const btn = document.createElement('button');
  btn.className = 'chip';
  btn.textContent = v;
  btn.onclick = () => setVar(v, btn);
  varChips.appendChild(btn);
});

function setVar(v, el) {
  activeVar = v;
  document.querySelectorAll('#var-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

function toggleFilter(el) {
  const f = el.dataset.filter;
  if (activeFilters.has(f)) { activeFilters.delete(f); el.classList.remove('active'); }
  else { activeFilters.add(f); el.classList.add('active'); }
  applyFilters();
}

function applyFilters() {
  searchQuery = document.getElementById('search').value.toLowerCase();
  let visible = 0;
  document.querySelectorAll('.card').forEach(card => {
    const id = card.dataset.id;
    const p = PALETTES.find(x => x.id === id);
    let show = true;
    if (activeVar !== 'all' && p.variable !== activeVar) show = false;
    if (activeFilters.has('blindsafe') && !p.blindsafe) show = false;
    if (activeFilters.has('diverging') && p.type !== 'diverging') show = false;
    if (activeFilters.has('sequential') && p.type !== 'sequential') show = false;
    if (activeFilters.has('qualitative') && p.type !== 'qualitative') show = false;
    if (activeFilters.has('bivariate') && p.type !== 'bivariate') show = false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery) &&
        !p.variable.toLowerCase().includes(searchQuery) &&
        !p.theme.toLowerCase().includes(searchQuery) &&
        !p.context.toLowerCase().includes(searchQuery) &&
        !(p.also_useful || []).some(t => t.toLowerCase().includes(searchQuery))) show = false;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  document.getElementById('empty').classList.toggle('show', visible === 0);
}

// Build cards
const grid = document.getElementById('grid');

PALETTES.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = p.id;
  card.style.animationDelay = (i * 0.03) + 's';

  const swatch = p.colors.map(c =>
    `<div class="swatch-segment" style="background:${c}" title="${c}"></div>`
  ).join('');

  card.innerHTML = `
    <div class="card-swatch">${swatch}</div>
    <div class="card-body">
      <div class="card-header">
        <div class="card-name">${p.name}</div>
        <div class="card-variable">${p.variable}</div>
      </div>
      <div class="card-meta">
        <span class="meta-item"><span class="icon">◈</span> ${p.type}</span>
        <span class="meta-item"><span class="icon">⬡</span> ${p.colors.length} stops</span>
        <span class="${p.blindsafe ? 'badge-safe' : 'badge-unsafe'}">${p.blindsafe ? '👁 blindsafe' : '⚠ not tested'}</span>
      </div>
      <div class="card-desc">${p.theme}</div>
      ${p.also_useful && p.also_useful.length ? `<div class="card-also">Also: ${p.also_useful.map(t=>`<span class="also-tag">${t}</span>`).join('')}</div>` : ''}
      <div class="card-footer-meta">
        ${p.author && p.author !== 'GeoPalettes' ? `<span class="card-author">◎ ${p.author}</span>` : '<span></span>'}
        <div class="card-actions">
          <button class="btn-action" onclick="openModal('${p.id}',event)">↗ Details</button>
          <button class="btn-action" onclick="copyHex('${p.id}',this,event)">⊕ Copy HEX</button>
          <button class="btn-action" onclick="copyR('${p.id}',this,event)">⊕ Copy R</button>
        </div>
      </div>
    </div>
  `;
  grid.insertBefore(card, document.getElementById('empty'));
});

// ── COPY ──
function copyHex(id, btn, e) {
  e && e.stopPropagation();
  const p = PALETTES.find(x => x.id === id);
  navigator.clipboard.writeText(p.colors.join(', ')).then(() => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '⊕ Copy HEX'; btn.classList.remove('copied'); }, 1500);
  });
}

function copyR(id, btn, e) {
  e && e.stopPropagation();
  const p = PALETTES.find(x => x.id === id);
  const code = buildR(p);
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '⊕ Copy R'; btn.classList.remove('copied'); }, 1500);
  });
}

// ── MODAL ──
function openModal(id, e) {
  e && e.stopPropagation();
  const p = PALETTES.find(x => x.id === id);
  currentPalette = p;

  document.getElementById('modal-swatch').innerHTML =
    p.colors.map(c =>
      `<div class="swatch-segment" data-hex="${c}" style="background:${c}" onclick="navigator.clipboard.writeText('${c}')" title="Click to copy ${c}"></div>`
    ).join('');

  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-sub').textContent = `${p.variable} · ${p.type} · ${p.colors.length} color stops`;

  document.getElementById('modal-meta').innerHTML = `
    <div class="meta-box"><div class="meta-box-label">Variable</div><div class="meta-box-value">${p.variable}</div></div>
    <div class="meta-box"><div class="meta-box-label">Type</div><div class="meta-box-value">${p.type}</div></div>
    <div class="meta-box"><div class="meta-box-label">Value Range</div><div class="meta-box-value">${p.range}</div></div>
    <div class="meta-box"><div class="meta-box-label">Blindsafe</div><div class="meta-box-value">${p.blindsafe ? '✓ Yes' : '✗ Not tested'}</div></div>
    ${p.author && p.author !== 'GeoPalettes' ? `<div class="meta-box"><div class="meta-box-label">Author</div><div class="meta-box-value">${p.author}</div></div>` : ''}
    <div class="meta-box" style="grid-column:1/-1"><div class="meta-box-label">Recommended Context</div><div class="meta-box-value">${p.context}</div></div>
    <div class="meta-box" style="grid-column:1/-1"><div class="meta-box-label">Theme / Inspiration</div><div class="meta-box-value">${p.theme}</div></div>
    ${p.also_useful && p.also_useful.length ? `<div class="meta-box" style="grid-column:1/-1"><div class="meta-box-label">Also useful for</div><div class="meta-box-value" style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">${p.also_useful.map(t=>`<span style="background:var(--surface);border:1px solid var(--border);padding:2px 8px;font-size:10px;border-radius:1px">${t}</span>`).join('')}</div></div>` : ''}
    ${p.id === 'temp-fahrenheit-nws' ? `<div class="meta-box" style="grid-column:1/-1">
      <div class="meta-box-label">Color zones (°C)</div>
      <div class="meta-box-value" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
        <span style="background:#5C0A0A;color:#fff;padding:2px 8px;font-size:10px;border-radius:1px">&gt; 48 °C · Extreme heat</span>
        <span style="background:#AE2A50;color:#fff;padding:2px 8px;font-size:10px;border-radius:1px">38–48 °C · Scorching</span>
        <span style="background:#CC7818;color:#fff;padding:2px 8px;font-size:10px;border-radius:1px">29–38 °C · Orange/Gold</span>
        <span style="background:#AAAA30;color:#111;padding:2px 8px;font-size:10px;border-radius:1px">21–29 °C · Yellows</span>
        <span style="background:#2E7070;color:#fff;padding:2px 8px;font-size:10px;border-radius:1px">13–21 °C · Lime/Teal</span>
        <span style="background:#3A618C;color:#fff;padding:2px 8px;font-size:10px;border-radius:1px">4–13 °C · Frigid blues</span>
        <span style="background:#1C2D6B;color:#fff;padding:2px 8px;font-size:10px;border-radius:1px">−18–0 °C · Navy wall</span>
        <span style="background:#A8CBEA;color:#111;padding:2px 8px;font-size:10px;border-radius:1px">−43–−18 °C · Gray/blues</span>
        <span style="background:#F8FAFF;color:#333;border:1px solid #ccc;padding:2px 8px;font-size:10px;border-radius:1px">&lt; −43 °C · Polar white</span>
      </div>
    </div>` : ''}
    ${p.notes ? `<div class="meta-box" style="grid-column:1/-1"><div class="meta-box-label">Notes</div><div class="meta-box-value" style="font-size:11px;line-height:1.5;color:var(--text-mid)">${p.notes}</div></div>` : ''}
    ${p.source ? `<div class="meta-box"><div class="meta-box-label">Source</div><div class="meta-box-value" style="font-size:11px">${p.source}</div></div>` : ''}
    ${p.license && p.license !== 'CC BY 4.0' ? `<div class="meta-box"><div class="meta-box-label">License</div><div class="meta-box-value" style="font-size:11px">${p.license}</div></div>` : ''}
  `;

  document.getElementById('modal-hexes').innerHTML =
    p.colors.map(c =>
      `<div class="hex-chip" onclick="navigator.clipboard.writeText('${c}');this.style.borderColor='#4ade80';setTimeout(()=>this.style.borderColor='',1200)">
        <div class="hex-dot" style="background:${c};border:1px solid rgba(255,255,255,.1)"></div>
        ${c}
      </div>`
    ).join('');

  document.getElementById('code-r').innerHTML = buildRHtml(p);
  document.getElementById('code-python').innerHTML = buildPyHtml(p);
  document.getElementById('code-css').innerHTML = buildCssHtml(p);

  // Reset tabs
  document.querySelectorAll('.code-tab').forEach((t,i) => t.classList.toggle('active', i===0));
  document.querySelectorAll('.code-block').forEach((b,i) => b.classList.toggle('active', i===0));
  activeCodeTab = 'r';

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal') && e.type !== 'click') return;
  if (e && e.currentTarget === document.getElementById('modal') && e.target !== e.currentTarget) return;
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
});

function switchTab(tab, el) {
  activeCodeTab = tab;
  document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.code-block').forEach(b => b.classList.remove('active'));
  document.getElementById('code-' + tab).classList.add('active');
}

// ── CODE BUILDERS ──
function buildR(p) {
  const hexStr = p.colors.map(c => `"${c}"`).join(', ');
  return `# ${p.name} — ${p.variable} (${p.type})\n# ${p.theme}\n# Range: ${p.range}\n# Context: ${p.context}\n\n${p.id.replace(/-/g,'_')} <- c(${hexStr})\n\n# Usage with ggplot2\nlibrary(ggplot2)\nscale_fill_gradientn(colours = ${p.id.replace(/-/g,'_')})\n\n# Or with colorRampPalette for continuous interpolation\npal_fn <- colorRampPalette(${p.id.replace(/-/g,'_')})\npal256 <- pal_fn(256)`;
}

function buildRHtml(p) {
  const hexStr = p.colors.map(c => `<span class="c-str">"${c}"</span>`).join(', ');
  const varname = p.id.replace(/-/g,'_');
  return `<span class="c-comment"># ${p.name} — ${p.variable} (${p.type})</span>
<span class="c-comment"># ${p.theme}</span>
<span class="c-comment"># Range: ${p.range} | Context: ${p.context}</span>

${varname} &lt;- c(${hexStr})

<span class="c-comment"># Usage with ggplot2</span>
<span class="c-fn">library</span>(ggplot2)
<span class="c-fn">scale_fill_gradientn</span>(colours = ${varname})

<span class="c-comment"># Continuous interpolation</span>
pal_fn &lt;- <span class="c-fn">colorRampPalette</span>(${varname})
pal256 &lt;- pal_fn(<span class="c-num">256</span>)`;
}

function buildPyHtml(p) {
  const hexStr = p.colors.map(c => `<span class="c-str">'${c}'</span>`).join(', ');
  const varname = p.id.replace(/-/g,'_');
  return `<span class="c-comment"># ${p.name} — ${p.variable} (${p.type})</span>
<span class="c-comment"># ${p.theme}</span>
<span class="c-comment"># Range: ${p.range} | Context: ${p.context}</span>

<span class="c-fn">import</span> matplotlib.pyplot <span class="c-fn">as</span> plt
<span class="c-fn">from</span> matplotlib.colors <span class="c-fn">import</span> LinearSegmentedColormap

${varname} = [${hexStr}]

<span class="c-comment"># Create matplotlib colormap</span>
cmap = LinearSegmentedColormap.<span class="c-fn">from_list</span>(
    <span class="c-str">'${p.id}'</span>, ${varname}
)

<span class="c-comment"># Usage</span>
plt.<span class="c-fn">imshow</span>(data, cmap=cmap)
plt.<span class="c-fn">colorbar</span>()`;
}

function buildCssHtml(p) {
  const stops = p.colors.map((c, i) =>
    `    <span class="c-str">${c}</span> <span class="c-num">${Math.round(i/(p.colors.length-1)*100)}%</span>`
  ).join(',\n');
  return `<span class="c-comment">/* ${p.name} — ${p.variable} */</span>
<span class="c-comment">/* ${p.theme} */</span>

.<span class="c-fn">${p.id}</span> {
  background: <span class="c-fn">linear-gradient</span>(
    to right,
${stops}
  );
}

<span class="c-comment">/* CSS Custom Properties */</span>
:root {
${p.colors.map((c,i)=>`  --${p.id}-${i+1}: <span class="c-str">${c}</span>;`).join('\n')}
}`;
}

// Expose functions called via inline onclick to global scope
window.openModal   = openModal;
window.closeModal  = closeModal;
window.copyHex     = copyHex;
window.copyR       = copyR;
window.switchTab   = switchTab;
window.toggleFilter = toggleFilter;
window.setVar      = setVar;
}

