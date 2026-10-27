(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqSmall = matchMedia('(max-width: 899px)'), isSmall = () => mqSmall.matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  gsap.registerPlugin(ScrollTrigger);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  ScrollTrigger.clearScrollMemory('manual'); scrollTo(0, 0);

  const root = document.documentElement, isLight = () => root.classList.contains('light');
  let sceneTheme = () => {};
  let bgTheme = () => {};
  $('#theme').addEventListener('click', () => {
    root.classList.add('theming'); const light = root.classList.toggle('light');
    try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
    sceneTheme(light); bgTheme(); setTimeout(() => root.classList.remove('theming'), 700);
  });
  $$('[data-tags]').forEach(ul => { ul.innerHTML = ul.dataset.tags.split('|').map(t => `<li>${t}</li>`).join(''); });
  $('#year').textContent = new Date().getFullYear();
  $('#tot').textContent = $('#cnt-tot').textContent = PORTFOLIO.length;
   
  function placeholder(img) {
    if (img.dataset.ph) return; img.dataset.ph = 1;
    const c = document.createElement('canvas'); c.width = 640; c.height = 427; const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 640, 400); g.addColorStop(0, '#1a1c24'); g.addColorStop(1, '#2a1409'); x.fillStyle = g; x.fillRect(0, 0, 640, 400);
    x.fillStyle = 'rgba(255,90,31,.85)';
    const box = (a, b, w, h, r) => { x.beginPath(); x.roundRect ? x.roundRect(a, b, w, h, r) : x.rect(a, b, w, h); x.fill(); };
    const cat = (img.dataset.cat || '').toLowerCase(), k = /mobile|app/.test(cat) ? 'mobile' : /brand|print|logo|sticker|card/.test(cat) ? 'brand' : 'web';
    if (k === 'mobile') [150, 270, 390].forEach((a, n) => box(a - 50, 50 + n % 2 * 20, 100, 230, 16));
    else if (k === 'web') { box(90, 70, 460, 250, 14); x.fillStyle = 'rgba(8,9,12,.55)'; box(110, 95, 120, 205, 8); box(250, 95, 280, 60, 8); box(250, 170, 135, 130, 8); box(395, 170, 135, 130, 8); }
    else { x.beginPath(); x.arc(320, 190, 95, 0, 7); x.fill(); }
    x.fillStyle = 'rgba(241,239,233,.85)'; x.font = '500 20px monospace';
    x.fillText(img.dataset.name + ' · ' + img.getAttribute('src'), 24, 410);
    img.src = c.toDataURL();
  }
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
 
  $('#grid').innerHTML = PORTFOLIO.map((p, i) => {
    const [name, tag, cat0, what, tools, url, lang, file0] = p, cat = cat0 || 'Other', nn = String(i + 1).padStart(2, '0'), file = file0 || slug(name);
    return `<article class="card" data-cat="${esc(cat)}"><div class="in">
      <img class="th" src="images/portfolio/${esc(file)}.webp" width="1500" height="1000" alt="${esc(name)} preview" data-cat="${esc(cat)}" data-name="${esc(name)}">
      <div class="tx"><span class="num">${nn}</span><span class="lg">${esc(lang)}</span><h3>${esc(name)}</h3>${tag ? `<p class="tag">${esc(tag)}</p>` : ''}<p>${esc(what)}</p><p>${esc(tools)}</p>
      <a href="${esc(url)}" target="_blank" rel="noopener">View prototype ↗</a></div></div></article>`;
  }).join('');
  $$('.th').forEach(img => { img.addEventListener('error', () => placeholder(img)); if (img.complete && !img.naturalWidth) placeholder(img); });

  let lenis = null, vel = 0;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', e => { ScrollTrigger.update(); vel = e.velocity; });
    gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  }
  $$('[data-go]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const t = a.getAttribute('href');
    lenis ? lenis.scrollTo(t, { duration: 1.8, offset: isSmall() ? -96 : 0 }) : $(t).scrollIntoView();
  }));

  const lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('.lb-cap', lb);
  const openLb = img => {
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; lbCap.textContent = img.dataset.name || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); lenis && lenis.stop(); $('.lb-close', lb).focus();
  };
  const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); lenis && lenis.start(); };
  $$('.th').forEach(img => { img.tabIndex = 0; img.setAttribute('role', 'button'); img.setAttribute('aria-label', 'Zoom image: ' + img.dataset.name); img.title = 'Click or tap to zoom'; });
  $('#grid').addEventListener('click', e => { const img = e.target.closest('.th'); if (img) openLb(img); });
  $('#grid').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('th')) { e.preventDefault(); openLb(e.target); } });
  lb.addEventListener('click', closeLb);
  addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  lb.addEventListener('wheel', e => e.preventDefault(), { passive: false });

  const NET = {
    nodes: 110,
    nodesSmall: 60,
    links: 3,
    radius: 2.1,
    thickness: .35,
    nodeSize: .16,
    wobble: .07,
    pulses: 8,
    lineOpacity: .6
  };
  const SC = { e: 2, ry: -3 };
  let goScene = () => {}, activeName = 'hero';
  const mouse = { x: 0, y: 0 };

  const T = { hero: [3, 4, .9, .25, .6, -1], services: [-3, 4, .85, 1, 1.2, 5], xp: [3, 4, .85, 1, 1.9, 0], edu: [-3, 4, .85, 1, 2.6, 3], cert: [3, 4, .85, 1, 3.3, 1],
    tools: [-3, 4, .85, 1, 4, 2], skills: [3, 4, .85, 1, 4.7, 4], work: [0, 4.6, .6, 1, 5.4, -2], contact: [3.1, 4.5, .65, 0, 6.9, -1] };
  try {
    const canvas = $('#scene');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x08090c, 10, 24);
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 60); camera.position.set(0, 4, 9.5);
    let floor;
    const makeFloor = light => { if (floor) { scene.remove(floor); floor.geometry.dispose(); floor.material.dispose(); } floor = new THREE.GridHelper(40, 40, light ? 0xc9c6bd : 0x2c2e36, light ? 0xe0ddd5 : 0x15161b); floor.position.y = -3.4; scene.add(floor); };

    const group = new THREE.Group(), N = isSmall() ? NET.nodesSmall : NET.nodes, base = [], region = [], ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i + .5) / N * 2, rad = Math.sqrt(1 - y * y), th = ga * i, len = NET.radius * (1 - NET.thickness * Math.random());
      const v = new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(len); base.push(v);
      region.push(Math.min(5, Math.floor((Math.atan2(v.z, v.x) + Math.PI) / (Math.PI * 2) * 6)));
    }

    const seen = new Set(), link = [];
    base.forEach((a, i) => {
      base.map((b, j) => [j, a.distanceToSquared(b)]).filter(p => p[0] !== i).sort((p, q) => p[1] - q[1]).slice(0, NET.links).forEach(p => {
        const k = i < p[0] ? i + '-' + p[0] : p[0] + '-' + i; if (!seen.has(k)) { seen.add(k); link.push(i, p[0]); }
      });
    });
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), lPos = new Float32Array(link.length * 3), lCol = new Float32Array(link.length * 3);
    const pGeo = new THREE.BufferGeometry(), lGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3)); lGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3));

    const dotC = document.createElement('canvas'); dotC.width = dotC.height = 64; const dx = dotC.getContext('2d'), gr = dx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, '#fff'); gr.addColorStop(.4, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); dx.fillStyle = gr; dx.fillRect(0, 0, 64, 64);
    const pMat = new THREE.PointsMaterial({ size: NET.nodeSize, map: new THREE.CanvasTexture(dotC), vertexColors: true, transparent: true, depthWrite: false, fog: false });
    const lMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: NET.lineOpacity, depthWrite: false, fog: false });
    group.add(new THREE.LineSegments(lGeo, lMat), new THREE.Points(pGeo, pMat)); scene.add(group);

    const pal = { base: new THREE.Color(), accent: new THREE.Color(), bg: new THREE.Color() }, tmp = new THREE.Color();
    const setPalette = light => {
      pal.base.set(light ? 0x4a4f57 : 0xcfd2d8); pal.accent.set(light ? 0xe24a12 : 0xff5a1f); pal.bg.set(light ? 0xf4f2ed : 0x08090c);
      pMat.blending = lMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending; pMat.needsUpdate = lMat.needsUpdate = true;
    };
    const R = Array.from({ length: 6 }, () => ({ b: 1, a: 0 }));
    const pulse = new Set(Array.from({ length: NET.pulses }, () => Math.floor(Math.random() * N)));

    const resize = () => { renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
    addEventListener('resize', resize); resize();
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => goScene(activeName), 200); });
    addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth - .5; mouse.y = e.clientY / innerHeight - .5; });

    let t = 0;
    gsap.ticker.add(() => {
      t += .01;
      const spread = 1 + (SC.e + Math.min(Math.abs(vel) * .02, .5)) * .28;
      for (let i = 0; i < N; i++) {
        const b = base[i], w = NET.wobble, r = R[region[i]], k = i * 3;
        pos[k] = b.x * spread + Math.sin(t * 1.3 + i) * w; pos[k + 1] = b.y * spread + Math.cos(t * 1.1 + i * 1.7) * w; pos[k + 2] = b.z * spread + Math.sin(t * .9 + i * 2.3) * w;
        const mix = pulse.has(i) ? Math.max(r.a, Math.sin(t * 2.4 + i) * .5 + .5) : r.a;
        tmp.copy(pal.base).lerp(pal.accent, mix); tmp.lerpColors(pal.bg, tmp, r.b);
        col[k] = tmp.r; col[k + 1] = tmp.g; col[k + 2] = tmp.b;
      }
      for (let l = 0; l < link.length; l++) { const s = link[l] * 3, d = l * 3; lPos[d] = pos[s]; lPos[d + 1] = pos[s + 1]; lPos[d + 2] = pos[s + 2]; lCol[d] = col[s]; lCol[d + 1] = col[s + 1]; lCol[d + 2] = col[s + 2]; }
      pGeo.attributes.position.needsUpdate = pGeo.attributes.color.needsUpdate = lGeo.attributes.position.needsUpdate = lGeo.attributes.color.needsUpdate = true;
      group.rotation.y = SC.ry + t * .2 + mouse.x * .5; group.rotation.x = mouse.y * .18;
      renderer.render(scene, camera);
    });

    sceneTheme = light => { scene.fog.color.set(light ? 0xf4f2ed : 0x08090c); makeFloor(light); setPalette(light); };
    sceneTheme(isLight());

    goScene = (name, first) => {
      const [x0, y0, s0, e, ry, hl] = T[name], d = first ? 2.6 : 1.7; let x = x0, y = y0, s = s0;
      const sm = isSmall(), dim = sm && name === 'contact';
      if (sm) { x = 0; y = 4.8; s *= .6; }
      else { const halfW = 3.46 * innerWidth / innerHeight; x = Math.sign(x) * Math.min(Math.abs(x), Math.max(0, halfW - 2.8 * s - .1)); }
      gsap.to(group.position, { x, y, duration: d, ease: 'power3.inOut' });
      gsap.to(group.scale, { x: s, y: s, z: s, duration: d, ease: 'power3.inOut' });
      gsap.to(SC, { e, ry, duration: d, ease: 'power3.inOut' });
      R.forEach((r, k) => gsap.to(r, { b: dim ? .15 : hl === -1 ? 1 : hl === -2 ? .4 : k === hl ? 1 : .3, a: k === hl ? 1 : 0, duration: 1 }));
    };
  } catch (err) { console.warn('WebGL unavailable, showing the plain layout.', err); }

  const BG = {
    density: 1,
    linkDist: 150,
    speed: 1,
    parallax: .12,
    lineAlpha: .5,
    dotAlpha: .7,
    dotSize: 1.6,
    pointer: true
  };
  (function bgMesh() {
    const cv = $('#bgmesh'); if (!cv) return;
    const g = cv.getContext('2d'); let W, H, dpr, pts = [], ink = [241, 239, 233], px = -999, py = -999;
    const readInk = () => { const v = getComputedStyle(root).getPropertyValue('--ink').trim(); if (/^#[0-9a-f]{6}$/i.test(v)) ink = [1, 3, 5].map(i => parseInt(v.slice(i, i + 2), 16)); };
    bgTheme = readInk; readInk();
    const build = () => {
      W = innerWidth; H = innerHeight; dpr = Math.min(devicePixelRatio, 1.5); cv.width = W * dpr; cv.height = H * dpr;
      const n = Math.max(25, Math.min(140, Math.round(W * H / 16000 * BG.density)));
      pts = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), d: .3 + Math.random() * .7, ph: Math.random() * 6.28 }));
    };
    const draw = () => {
      const t = performance.now() / 1000 * BG.speed, sy = scrollY * BG.parallax, span = H + 80, L = BG.linkDist, P = [];
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H); g.lineWidth = 1;
      pts.forEach(p => {
        P.push({ x: p.x * W + Math.sin(t * .2 + p.ph) * 24 * p.d, y: ((p.y * span - sy * p.d + t * 5 * p.d) % span + span) % span - 40, d: p.d });
      });
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
        const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, dd = dx * dx + dy * dy;
        if (dd < L * L) { g.strokeStyle = `rgba(${ink},${(1 - Math.sqrt(dd) / L) * BG.lineAlpha * (P[i].d + P[j].d) / 2})`; g.beginPath(); g.moveTo(P[i].x, P[i].y); g.lineTo(P[j].x, P[j].y); g.stroke(); }
      }
      if (BG.pointer) P.forEach(p => { const dx = p.x - px, dy = p.y - py, dd = dx * dx + dy * dy; if (dd < L * L * 1.4) { g.strokeStyle = `rgba(${ink},${(1 - Math.sqrt(dd) / (L * 1.18)) * BG.lineAlpha * 1.2})`; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(px, py); g.stroke(); } });
      P.forEach(p => { g.fillStyle = `rgba(${ink},${BG.dotAlpha * p.d})`; g.beginPath(); g.arc(p.x, p.y, BG.dotSize * (.6 + p.d * .6), 0, 6.283); g.fill(); });
    };
    build(); draw();
    addEventListener('resize', () => { build(); draw(); });
    addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; });
    if (!reduce) gsap.ticker.add(draw);
  })();

  const cards = $$('.card'), cur = $('#cur'), workEl = $('.work'), pill = $('#cnt'), pcur = $('#cnt-cur');
  let vis = cards.slice(), workST = null, paintFlow = () => {}, shownNo = '';
  const pad2 = n => String(n).padStart(2, '0');
  const setCount = i => {
    const v = pad2(i + 1); if (v === shownNo) return; shownNo = v;
    cur.textContent = pcur.textContent = v;
    gsap.fromTo([cur, pcur], { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .35, ease: 'power2.out', overwrite: true });
  };
 
  const stackCounter = () => {
    cards.forEach(c => ScrollTrigger.create({ trigger: c, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && setCount(vis.indexOf(c)) }));
    ScrollTrigger.create({ trigger: workEl, start: 'top 75%', end: 'bottom 35%', onToggle: s => pill.classList.toggle('show', s.isActive) });
    return () => pill.classList.remove('show');
  };
  
  const filtersEl = $('#filters'), stat = $('#fstat'), nav = $('.nav');
  const setNavH = () => root.style.setProperty('--navh', nav.offsetHeight + 'px');
  setNavH(); addEventListener('resize', setNavH);

  if (document.fonts) document.fonts.ready.then(() => { const n = $('.nav nav'); n.style.display = 'none'; void n.offsetHeight; n.style.display = ''; setNavH(); });
  const applyFilter = (label, byUser) => {
    const all = label === 'All';
    vis = cards.filter(c => { const ok = all || c.dataset.cat === label; c.hidden = !ok; return ok; });
    vis.forEach((c, i) => { $('.num', c).textContent = pad2(i + 1); });
    $$('.fchip', filtersEl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === label)));
    $('#tot').textContent = $('#cnt-tot').textContent = vis.length;
    stat.textContent = `Showing ${vis.length} ${vis.length === 1 ? 'project' : 'projects'}${all ? '' : ' in ' + label}`;
    shownNo = ''; setCount(0);
    if (!byUser) return;
    ScrollTrigger.refresh();
    if (workST) { lenis ? lenis.scrollTo(workST.start, { immediate: true }) : scrollTo(0, workST.start); workST.animation.progress(0); paintFlow(); }
    else { const top = $('#grid').getBoundingClientRect().top + scrollY - nav.offsetHeight - filtersEl.offsetHeight - 12; if (scrollY > top) lenis ? lenis.scrollTo(top, { duration: .8 }) : scrollTo(0, top); }
    if (!reduce) gsap.fromTo($('#grid'), { opacity: 0 }, { opacity: 1, duration: .45, ease: 'power2.out', clearProps: 'opacity' });
  };
  ['All', ...new Set(cards.map(c => c.dataset.cat))].forEach(label => {
    const n = label === 'All' ? cards.length : cards.filter(c => c.dataset.cat === label).length, b = document.createElement('button');
    b.type = 'button'; b.className = 'fchip'; b.dataset.f = label; b.innerHTML = `${esc(label)} <i>${n}</i>`;
    b.addEventListener('click', () => applyFilter(label, true)); filtersEl.appendChild(b);
  });
  applyFilter('All', false);

  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    if (reduce) { workEl.classList.add('stack'); const off = stackCounter(); return () => { workEl.classList.remove('stack'); off(); }; }
    const track = $('#grid'), dist = () => Math.max(1, track.scrollWidth - innerWidth);
  
    const fit = () => { track.classList.remove('few'); track.classList.toggle('few', track.scrollWidth <= innerWidth + 2); };
    fit(); ScrollTrigger.addEventListener('refreshInit', fit);
    workST = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#work', pin: true, scrub: .6, start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1 } }).scrollTrigger;

    let onScreen = false;
    const io = new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }, { rootMargin: '200px' }); io.observe(workEl);
    const paint = () => {
      const left = track.getBoundingClientRect().left, mid = document.documentElement.clientWidth / 2; let best = 0, bd = 9;
      vis.forEach((c, i) => {
        const d = (left + c.offsetLeft + c.offsetWidth / 2 - mid) / (mid * 2), a = Math.min(Math.abs(d), 1);
        c.style.transform = `perspective(1400px) rotateY(${Math.max(-38, Math.min(38, -d * 38))}deg) scale(${1 - a * .12})`;
        c.style.opacity = 1 - a * .5; if (a < bd) { bd = a; best = i; }
      });
      setCount(best);
    };
    const tick = () => { if (onScreen) paint(); };
    paintFlow = paint; gsap.ticker.add(tick); paint();
    return () => { gsap.ticker.remove(tick); io.disconnect(); paintFlow = () => {}; ScrollTrigger.removeEventListener('refreshInit', fit); track.classList.remove('few'); workST = null; cards.forEach(c => { c.style.transform = ''; c.style.opacity = ''; }); };
  });
  mm.add('(max-width: 899px)', () => {
    workEl.classList.add('stack');
    if (!reduce) ScrollTrigger.batch('.card', { start: 'top 92%', onEnter: b => gsap.from(b, { y: 60, rotationX: 18, opacity: 0, transformPerspective: 1000, stagger: .08, duration: .9, ease: 'power3.out' }) });
    const off = stackCounter();
    return () => { workEl.classList.remove('stack'); off(); };
  });

  const navEl = $('.nav nav');
  const activate = name => {
    activeName = name;
    $$('.dots a,.nav nav a').forEach(a => a.classList.toggle('on', a.dataset.s === name));
    const on = $('.nav nav a.on');
    if (on && navEl.scrollWidth > navEl.clientWidth) navEl.scrollTo({ left: on.offsetLeft - navEl.clientWidth / 2 + on.offsetWidth / 2, behavior: 'smooth' });
    goScene(name);
  };

  $$('.xp').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top+=40 60%', end: 'max', toggleClass: { targets: el, className: 'reached' } }));
  $$('[data-blob]').forEach(sec => ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && activate(sec.dataset.blob) }));

  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { $('#bar').style.transform = `scaleX(${s.progress})`; } });
  mqSmall.addEventListener('change', () => goScene(activeName));

  if (!reduce) {
   
    ScrollTrigger.create({ trigger: '.xp-wrap', start: 'top 60%', end: 'bottom 60%', onUpdate: s => $('.xp-wrap').style.setProperty('--p', s.progress) });
    $$('.xp').forEach(el => gsap.from(el, { x: -90, rotationY: -35, opacity: 0, transformPerspective: 1200, transformOrigin: '0 50%', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
  
    $$('h2').forEach(h => gsap.from(h, { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
  
    gsap.set('.panel', { opacity: 0, y: 46, scale: .97 });
    ScrollTrigger.batch('.panel', { start: 'top 90%', once: true, onEnter: b => {
      gsap.to(b, { opacity: 1, y: 0, scale: 1, duration: 1.25, ease: 'power3.out', stagger: .14, clearProps: 'transform' });
      b.forEach((p, i) => gsap.from($$('.tags li, .dl li', p), { opacity: 0, y: 12, duration: .7, ease: 'power2.out', stagger: .025, delay: .35 + i * .14 }));
    } });
    
    gsap.set('.svc', { opacity: 0, y: 34 });
    ScrollTrigger.batch('.svc', { start: 'top 92%', once: true, onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .1, clearProps: 'transform' }) });
  }

  const loader = $('.loader');
  if (reduce) { loader.remove(); goScene('hero', true); return; }
  const n = { v: 0 };
  gsap.timeline()
    .to(n, { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate: () => { $('#pct').textContent = Math.round(n.v); } })
    .add(() => goScene('hero', true))
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power4.inOut', onComplete: () => loader.remove() })
    .from('.mask i', { yPercent: 110, rotation: 5, stagger: .12, duration: 1.1, ease: 'power4.out' }, '-=.5')
    .from('.role,.lead,.cta,.who,.hero .tags,.nav,.dots', { y: 30, opacity: 0, stagger: .07, duration: .8 }, '-=.8');
})();
