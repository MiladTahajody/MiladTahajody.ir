/* =====================================================================
   Milad Tahajody - dark/light 3D CV + portfolio (static)
   Two visual layers: (1) a 3D mesh-network object that morphs into a new shape (pentagon sphere, then the header icons) and turns
   with the scroll (WebGL, Three.js; shapes in js/shapes.js), (2) a faint mesh texture behind the whole page (2D canvas).
   Globals: THREE, gsap, ScrollTrigger, Lenis, PORTFOLIO (js/data.js), SHAPES (js/shapes.js)
   Parts: 1) helpers + theme toggle  2) portfolio cards (category filter: part 5)  3) smooth scroll  3b) image zoom (lightbox)
          4) 3D morphing object (NET settings)  4b) background mesh (BG settings)
          5) scroll animations (panels, timeline, portfolio strip)  6) loader / intro
   Content lives in index.html (CV text) and js/data.js (portfolio). This file = behaviour only.
   ===================================================================== */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqSmall = matchMedia('(max-width: 899px)'), isSmall = () => mqSmall.matches; // live breakpoint check (follows resize / rotate / DevTools device toggle)
  // Tiny selectors: $('.x') = first match, $$('.x') = array of all matches
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  gsap.registerPlugin(ScrollTrigger); // ScrollTrigger drives every scroll-linked animation
  // After a reload the page always starts at the very top (the browser / ScrollTrigger must not restore the old scroll position)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  ScrollTrigger.clearScrollMemory('manual'); scrollTo(0, 0);

  /* ---------- 1) Helpers ---------- */
  // root = the <html> element; the class 'light' on it switches the colour theme
  const root = document.documentElement, isLight = () => root.classList.contains('light');
  let sceneTheme = () => {}; // filled in by the 3D part: re-colours the object when the theme changes
  let bgTheme = () => {}; // re-reads the colours of the background mesh (set in part 4b)
  // Light / dark toggle (dark is the default; choice is remembered)
  $('#theme').addEventListener('click', () => {
    root.classList.add('theming'); const light = root.classList.toggle('light');
    try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) { /* storage blocked (private mode): the choice is simply not remembered */ }
    sceneTheme(light); bgTheme(); setTimeout(() => root.classList.remove('theming'), 700);
  });
  // Chips: turns data-tags="A|B|C" into <li> items
  $$('[data-tags]').forEach(ul => { ul.innerHTML = ul.dataset.tags.split('|').map(t => `<li>${t}</li>`).join(''); });
  // Footer year and the project total shown next to the portfolio counter
  $('#year').textContent = new Date().getFullYear();
  $('#tot').textContent = $('#cnt-tot').textContent = PORTFOLIO.length;

  /* ---------- 2) Portfolio cards from js/data.js ---------- */
  // Generated placeholder shown when images/portfolio/<name>.webp is missing
  function placeholder(img) {
    if (img.dataset.ph) return; img.dataset.ph = 1;
    const c = document.createElement('canvas'); c.width = 640; c.height = 427; const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 640, 400); g.addColorStop(0, '#1a1c24'); g.addColorStop(1, '#2a1409'); x.fillStyle = g; x.fillRect(0, 0, 640, 400);
    x.fillStyle = 'rgba(255,90,31,.85)';
    const box = (a, b, w, h, r) => { x.beginPath(); x.roundRect ? x.roundRect(a, b, w, h, r) : x.rect(a, b, w, h); x.fill(); };
    const cat = (img.dataset.cat || '').toLowerCase(), k = /mobile|app/.test(cat) ? 'mobile' : /brand|print|logo|sticker|card/.test(cat) ? 'brand' : 'web'; // placeholder shape follows the category
    if (k === 'mobile') [150, 270, 390].forEach((a, n) => box(a - 50, 50 + n % 2 * 20, 100, 230, 16));
    else if (k === 'web') { box(90, 70, 460, 250, 14); x.fillStyle = 'rgba(8,9,12,.55)'; box(110, 95, 120, 205, 8); box(250, 95, 280, 60, 8); box(250, 170, 135, 130, 8); box(395, 170, 135, 130, 8); }
    else { x.beginPath(); x.arc(320, 190, 95, 0, 7); x.fill(); }
    x.fillStyle = 'rgba(241,239,233,.85)'; x.font = '500 20px monospace';
    x.fillText(img.dataset.name + ' · ' + img.getAttribute('src'), 24, 410);
    img.src = c.toDataURL();
  }
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); // data.js text is plain text, never HTML
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); // image file name from the title: "Select Your Villa" -> select-your-villa.webp
  // Build one card per entry of PORTFOLIO (js/data.js). Change this markup to change every card.
  $('#grid').innerHTML = PORTFOLIO.map((p, i) => {
    const [name, tag, cat0, what, tools, url, lang, file0] = p, cat = cat0 || 'Other', nn = String(i + 1).padStart(2, '0'), file = file0 || slug(name);
    return `<article class="card" data-cat="${esc(cat)}"><div class="in">
      <img class="th" src="images/portfolio/${esc(file)}.webp" width="1500" height="1000" alt="${esc(name)} preview" data-cat="${esc(cat)}" data-name="${esc(name)}">
      <div class="tx"><span class="num">${nn}</span><span class="lg">${esc(lang)}</span><h3>${esc(name)}</h3>${tag ? `<p class="tag">${esc(tag)}</p>` : ''}<p>${esc(what)}</p><p>${esc(tools)}</p>
      <a href="${esc(url)}" target="_blank" rel="noopener">View prototype ↗</a></div></div></article>`;
  }).join('');
  // If an image file is missing, show the generated placeholder
  $$('.th').forEach(img => { img.addEventListener('error', () => placeholder(img)); if (img.complete && !img.naturalWidth) placeholder(img); });

  /* ---------- 3) Smooth scroll ---------- */
  // Smooth scrolling. vel = current scroll speed (also used to wobble the 3D object)
  let lenis = null, vel = 0;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', e => { ScrollTrigger.update(); vel = e.velocity; });
    gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  }
  // Links with data-go scroll smoothly to their section
  $$('[data-go]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const t = a.getAttribute('href');
    lenis ? lenis.scrollTo(t, { duration: 1.8, offset: isSmall() ? -96 : 0 }) : $(t).scrollIntoView(); // offset keeps content clear of the 2-row mobile header
  }));

  /* ---------- 3b) Image zoom: click / tap a portfolio image to see it large ---------- */
  const lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('.lb-cap', lb);
  const openLb = img => { // fill the overlay with the clicked image and open it
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; lbCap.textContent = img.dataset.name || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); lenis && lenis.stop(); $('.lb-close', lb).focus();
  };
  const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); lenis && lenis.start(); };
  $$('.th').forEach(img => { img.tabIndex = 0; img.setAttribute('role', 'button'); img.setAttribute('aria-label', 'Zoom image: ' + img.dataset.name); img.title = 'Click or tap to zoom'; });
  $('#grid').addEventListener('click', e => { const img = e.target.closest('.th'); if (img) openLb(img); });
  $('#grid').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('th')) { e.preventDefault(); openLb(e.target); } });
  lb.addEventListener('click', closeLb); // clicking anywhere (image, backdrop or the X) closes it
  addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  lb.addEventListener('wheel', e => e.preventDefault(), { passive: false }); // do not scroll the page behind the overlay

  /* ---------- 4) 3D object: a dot + line network that morphs between shapes ---------- */
  // The shapes live in js/shapes.js (already converted to dots + lines): a sphere made of 12 pentagons in the hero, then the header icons as solid 3D objects.
  // While one shape is on screen it only sways gently (and tilts with the mouse / finger). When you scroll to the next section the
  // dots fly apart, the whole object turns one full circle and the dots settle into the next shape.
  // NET = settings of the 3D object. Change the numbers, save, refresh.
  const NET = {
    radius: 2.2,       // size of the shape (world units)
    nodeSize: .16,     // dot size
    wobble: .04,       // how far each dot drifts around its place (keep small so the shape stays readable)
    pulses: 8,         // how many dots flash in the accent colour
    lineOpacity: .6,   // brightness of the lines (0 - 1)
    sway: .22,         // resting sway left / right (radians; 0 = perfectly still)
    swapTime: 1.7,     // seconds to move, turn and re-form into the next shape
    scatter: .9        // how far the dots fly apart in the middle of a change (0 = they glide straight to the new shape)
  };
  // Placement per section: [x, y, scale, look]. y = 4 is the vertical centre of the screen.
  // look: 'all' = every dot bright, 'acc' = the shape's highlighted dots (list "a" in js/shapes.js) glow orange, 'dim' = faded (sits behind the portfolio cards)
  const T = { hero: [3, 4, .9, 'all'], services: [-3, 4, .85, 'acc'], xp: [3, 4, .85, 'acc'], edu: [-3, 4, .85, 'acc'], cert: [3, 4, .85, 'acc'],
    tools: [-3, 4, .85, 'acc'], skills: [3, 4, .85, 'acc'], work: [0, 4.6, .6, 'dim'], contact: [3.1, 4.5, .65, 'all'] };
  // Sections whose cards sit on one side: the object is scaled and centred in the free column beside these elements, so it never overlaps them (desktop)
  const FIT = { services: '.svc', xp: '.xp-wrap', edu: '.panel', cert: '.panel', tools: '.panel', skills: '.panel' };
  const SC = { spin: 0 };    // spin = extra turn of the object, grows by one full circle (2 x PI) at every change
  let goScene = () => {}, activeName = 'hero';
  const mouse = { x: 0, y: 0 };
  try {
    if (!window.SHAPES) throw new Error('js/shapes.js did not load');
    const canvas = $('#scene');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x08090c, 10, 24);
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 60); camera.position.set(0, 4, 9.5);
    let floor; // grid floor is rebuilt when the theme changes
    const makeFloor = light => { if (floor) { scene.remove(floor); floor.geometry.dispose(); floor.material.dispose(); } floor = new THREE.GridHelper(40, 40, light ? 0xc9c6bd : 0x2c2e36, light ? 0xe0ddd5 : 0x15161b); floor.position.y = -3.4; scene.add(floor); };

    // --- Shapes: unpack js/shapes.js once. key 'd' = desktop set (110 dots), 'm' = phone set (60 dots, width < 900px) ---
    const names = Object.keys(T), SH = window.SHAPES;
    const unpack = s => { const p = new Float32Array(s.p.length), a = new Float32Array(s.p.length / 3); s.p.forEach((v, i) => { p[i] = v / 1000 * NET.radius; }); s.a.forEach(i => { a[i] = 1; }); return { n: a.length, p, a, e: s.e }; };
    const S = {}; names.forEach(nm => { S[nm] = { d: unpack(SH[nm].d), m: unpack(SH[nm].m) }; });
    let key = isSmall() ? 'm' : 'd', n = S.hero[key].n; // key / n = the point set in use and its number of dots
    const NMAX = Math.max(S.hero.d.n, S.hero.m.n), EMAX = Math.max(...['d', 'm'].map(k => names.reduce((s, nm) => s + S[nm][k].e.length / 2, 0)));

    const group = new THREE.Group();
    const pos = new Float32Array(NMAX * 3), col = new Float32Array(NMAX * 3), lPos = new Float32Array(EMAX * 6), lCol = new Float32Array(EMAX * 6);
    const pGeo = new THREE.BufferGeometry(), lGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3)); lGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3));
    // Soft round dot texture drawn with the 2D canvas
    const dotC = document.createElement('canvas'); dotC.width = dotC.height = 64; const dx = dotC.getContext('2d'), gr = dx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, '#fff'); gr.addColorStop(.4, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); dx.fillStyle = gr; dx.fillRect(0, 0, 64, 64);
    const pMat = new THREE.PointsMaterial({ size: NET.nodeSize, map: new THREE.CanvasTexture(dotC), vertexColors: true, transparent: true, depthWrite: false, fog: false });
    const lMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: NET.lineOpacity, depthWrite: false, fog: false });
    const lines = new THREE.LineSegments(lGeo, lMat), dots = new THREE.Points(pGeo, pMat);
    lines.frustumCulled = dots.frustumCulled = false; group.add(lines, dots); scene.add(group);

    // Colours: dark mode glows (additive), light mode uses darker ink on the light background
    const pal = { base: new THREE.Color(), accent: new THREE.Color(), bg: new THREE.Color() }, tmp = new THREE.Color();
    const setPalette = light => {
      pal.base.set(light ? 0x4a4f57 : 0xcfd2d8); pal.accent.set(light ? 0xe24a12 : 0xff5a1f); pal.bg.set(light ? 0xf4f2ed : 0x08090c);
      pMat.blending = lMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending; pMat.needsUpdate = lMat.needsUpdate = true;
    };
    const pulse = new Set(Array.from({ length: NET.pulses }, () => Math.floor(Math.random() * S.hero.m.n))); // flashing dots (indexes valid for both sets)

    // --- Morph state: every dot travels from src (where it was) to the same-numbered dot of the target shape ---
    const src = new Float32Array(NMAX * 3), cur = new Float32Array(NMAX * 3), scat = new Float32Array(NMAX * 3);
    const MP = { v: 1 };                                  // morph progress 0 -> 1 (eased by GSAP)
    const acc = new Float32Array(NMAX), ea = {};          // acc = orange amount per dot, ea = how visible each shape's lines are (0 - 1)
    names.forEach(nm => { ea[nm] = 0; });
    let target = null, bright = 1, spinTo = 0;
    // Start state: the dots form a loose ball (golden-angle spread), the intro then pulls them into the sphere
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NMAX; i++) {
      const y = 1 - (i + .5) / NMAX * 2, rad = Math.sqrt(1 - y * y), th = ga * i, len = NET.radius * (1 - .35 * Math.random());
      src[i * 3] = Math.cos(th) * rad * len; src[i * 3 + 1] = y * len; src[i * 3 + 2] = Math.sin(th) * rad * len;
      let a, b, c; do { a = Math.random() * 2 - 1; b = Math.random() * 2 - 1; c = Math.random() * 2 - 1; } while (a * a + b * b + c * c > 1); // random direction for the "fly apart" step
      scat[i * 3] = a * NET.radius; scat[i * 3 + 1] = b * NET.radius; scat[i * 3 + 2] = c * NET.radius;
    }
    cur.set(src);

    const resize = () => { renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
    addEventListener('resize', resize); resize();
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => goScene(activeName), 200); }); // re-fit the object to the new screen shape
    addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth - .5; mouse.y = e.clientY / innerHeight - .5; });

    let t = 0, mx = 0, my = 0, lookMode = 'all', dimPhone = false;
    gsap.ticker.add(() => {
      t += .01;
      const fr = gsap.ticker.deltaRatio(), fast = 1 - Math.pow(1 - .35, fr), slow = 1 - Math.pow(1 - .08, fr); // frame-rate independent easing steps
      const spread = 1 + Math.min(Math.abs(vel) * .02, .5) * .28;      // scrolling fast spreads the dots a little more
      const tp = target ? S[target][key].p : cur, ta = target ? S[target][key].a : acc;
      mx += (mouse.x - mx) * slow; my += (mouse.y - my) * slow;
      // Resting: gentle sway + tilt that follows the pointer. Changing shape: SC.spin adds one full turn
      group.rotation.y = SC.spin + Math.sin(t * 1.4) * NET.sway + mx * .5; group.rotation.x = Math.sin(t * 1.1 + 1.2) * NET.sway * .25 + my * .18;
      const ry = group.rotation.y, rx = group.rotation.x, sy = Math.sin(ry), cy = Math.cos(ry), sx = Math.sin(rx), cx = Math.cos(rx); // used to find which dots face away from the viewer
      const v = MP.v, burst = reduce ? 0 : Math.pow(Math.sin(Math.PI * v), 3) * NET.scatter, w = NET.wobble;
      bright += ((lookMode === 'dim' ? .4 : dimPhone ? .15 : 1) - bright) * slow;
      for (let i = 0; i < n; i++) {
        const k = i * 3;
        for (let c = 0; c < 3; c++) cur[k + c] = src[k + c] + (tp[k + c] - src[k + c]) * v + scat[k + c] * burst;
        pos[k] = cur[k] * spread + Math.sin(t * 1.3 + i) * w; pos[k + 1] = cur[k + 1] * spread + Math.cos(t * 1.1 + i * 1.7) * w; pos[k + 2] = cur[k + 2] * spread + Math.sin(t * .9 + i * 2.3) * w;
        acc[i] += ((lookMode === 'acc' ? ta[i] : 0) - acc[i]) * slow;
        const mix = pulse.has(i) ? Math.max(acc[i], Math.sin(t * 2.4 + i) * .5 + .5) : acc[i]; // flashing dots
        const zc = pos[k + 1] * sx + (-pos[k] * sy + pos[k + 2] * cy) * cx, depth = Math.min(1, Math.max(0, .5 + .5 * zc / (NET.radius * spread))); // 1 = facing the viewer, 0 = on the far side
        tmp.copy(pal.base).lerp(pal.accent, mix); tmp.lerpColors(pal.bg, tmp, bright * (.42 + .58 * depth)); // far-side dots (and bright < 1) fade towards the background
        col[k] = tmp.r; col[k + 1] = tmp.g; col[k + 2] = tmp.b;
      }
      // Lines: every shape keeps its own list of lines; the new shape's lines fade in once its dots have almost arrived, the old ones fade out at once
      let seg = 0; const bg = pal.bg;
      names.forEach(nm => {
        ea[nm] += ((nm === target && v > .78 ? 1 : 0) - ea[nm]) * (nm === target ? slow : fast);
        const f = ea[nm]; if (f < .004) return;
        const e = S[nm][key].e;
        for (let q = 0; q < e.length; q += 2) {
          const a = e[q] * 3, b = e[q + 1] * 3, d = seg * 6; seg++;
          lPos[d] = pos[a]; lPos[d + 1] = pos[a + 1]; lPos[d + 2] = pos[a + 2]; lPos[d + 3] = pos[b]; lPos[d + 4] = pos[b + 1]; lPos[d + 5] = pos[b + 2];
          lCol[d] = bg.r + (col[a] - bg.r) * f; lCol[d + 1] = bg.g + (col[a + 1] - bg.g) * f; lCol[d + 2] = bg.b + (col[a + 2] - bg.b) * f;
          lCol[d + 3] = bg.r + (col[b] - bg.r) * f; lCol[d + 4] = bg.g + (col[b + 1] - bg.g) * f; lCol[d + 5] = bg.b + (col[b + 2] - bg.b) * f;
        }
      });
      pGeo.setDrawRange(0, n); lGeo.setDrawRange(0, seg * 2);
      pGeo.attributes.position.needsUpdate = pGeo.attributes.color.needsUpdate = lGeo.attributes.position.needsUpdate = lGeo.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    });

    // Re-skin fog, floor and colours for the light / dark theme
    sceneTheme = light => { scene.fog.color.set(light ? 0xf4f2ed : 0x08090c); makeFloor(light); setPalette(light); };
    sceneTheme(isLight());

    // Phone <-> desktop width switch: use the other point set straight away (rare: rotating a tablet, resizing a window)
    mqSmall.addEventListener('change', () => {
      key = isSmall() ? 'm' : 'd'; n = S.hero[key].n;
      if (target) { src.set(S[target][key].p); MP.v = 1; gsap.killTweensOf(MP); }
    });

    // Fly into the next shape: remember where every dot is now, then glide / scatter / settle while the object turns one full circle
    const morphTo = (name, d) => {
      const dir = target === null || names.indexOf(name) >= names.indexOf(target) ? 1 : -1; // scrolling back up turns the other way
      src.set(cur); target = name; MP.v = 0;
      gsap.to(MP, { v: 1, duration: d, ease: 'power2.inOut', overwrite: true });
      if (!reduce) { spinTo += dir * Math.PI * 2; gsap.to(SC, { spin: spinTo, duration: d, ease: 'power3.inOut', overwrite: true }); }
    };

    // Free column beside the cards of a section: returns [world x, scale] so the whole object (with sway / perspective margin) stays inside it
    const fit = (name, x0, s0) => {
      const sec = $('[data-blob="' + name + '"]'); if (!FIT[name] || !sec) return null;
      const rs = $$(FIT[name], sec).map(e => e.getBoundingClientRect()).filter(r => r.width > 0); if (!rs.length) return null;
      const pad = 28, wpp = 6.9156 / innerHeight;                      // wpp = world units per pixel at the object's distance (camera fov 40, z = 9.5)
      const a = x0 < 0 ? pad : Math.max(...rs.map(r => r.right)) + pad, b = x0 < 0 ? Math.min(...rs.map(r => r.left)) - pad : innerWidth - pad;
      if (b - a < 80) return null;
      return [((a + b) / 2 - innerWidth / 2) * wpp, Math.max(.38, Math.min(s0, (b - a) * wpp / 2 / (NET.radius * 1.18)))];
    };

    // Move the object when a section becomes active
    goScene = (name, first) => {
      const [x0, y0, s0, look] = T[name], d = first ? 2.6 : NET.swapTime; let x = x0, y = y0, s = s0;
      const sm = isSmall(); lookMode = look; dimPhone = sm && name === 'contact'; // on phones the object is nearly hidden over the footer
      if (sm) { x = 0; y = 4.8; s *= .6; }
      else { const halfW = 3.46 * innerWidth / innerHeight; x = Math.sign(x) * Math.min(Math.abs(x), Math.max(0, halfW - 2.8 * s - .1)); } // keep it inside narrow windows
      const fb = !sm && fit(name, x0, s0); if (fb) { x = fb[0]; s = fb[1]; } // desktop: stay clear of the cards
      gsap.to(group.position, { x, y, duration: d, ease: 'power3.inOut', overwrite: true });
      gsap.to(group.scale, { x: s, y: s, z: s, duration: d, ease: 'power3.inOut', overwrite: true });
      if (name !== target) morphTo(name, d); // resize / breakpoint calls only re-place the object, they do not restart the morph
    };
  } catch (err) { console.warn('WebGL unavailable, showing the plain layout.', err); }

  /* ---------- 4b) Page background: faint mesh-network texture ---------- */
  // BG = settings. Overall opacity is in css/style.css (--mesh-opacity); 0 turns the texture off.
  const BG = {
    density: 1,        // number of points (0.5 = half, 2 = double)
    linkDist: 150,     // max distance (px) at which two points are joined by a line
    speed: 1,          // drifting speed (0 = still)
    parallax: .12,     // how much the texture moves while scrolling (0 = none)
    lineAlpha: .5,     // line strength (0 - 1)
    dotAlpha: .7,      // dot strength (0 - 1)
    dotSize: 1.6,      // dot radius in px
    pointer: true      // lines also connect to the mouse pointer
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
      pts.forEach(p => { // every point drifts sideways, moves with the scroll and wraps around outside the screen
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
    if (!reduce) gsap.ticker.add(draw); // still image when "reduce motion" is on
  })();

  /* ---------- 5) Scroll animations ---------- */
  // Portfolio layout depends on the screen. gsap.matchMedia rebuilds it live whenever the window crosses the
  // breakpoint (resize, rotate phone, DevTools device toggle): pinned horizontal cover-flow >= 900px, vertical list below.
  const cards = $$('.card'), cur = $('#cur'), workEl = $('.work'), pill = $('#cnt'), pcur = $('#cnt-cur');
  let vis = cards.slice(), workST = null, paintFlow = () => {}, shownNo = ''; // vis = cards that pass the current filter; workST = the pin trigger (desktop only)
  const pad2 = n => String(n).padStart(2, '0');
  const setCount = i => { // updates the "07 / 24" counters: header counter (desktop) and floating pill (phones / small tablets)
    const v = pad2(i + 1); if (v === shownNo) return; shownNo = v;
    cur.textContent = pcur.textContent = v;
    gsap.fromTo([cur, pcur], { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .35, ease: 'power2.out', overwrite: true });
  };
  // Stacked list (phones / small tablets): the card nearest the middle of the screen sets the number; the pill shows while the list is on screen
  const stackCounter = () => {
    cards.forEach(c => ScrollTrigger.create({ trigger: c, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && setCount(vis.indexOf(c)) }));
    ScrollTrigger.create({ trigger: workEl, start: 'top 75%', end: 'bottom 35%', onToggle: s => pill.classList.toggle('show', s.isActive) });
    return () => pill.classList.remove('show');
  };
  // ----- Category filter: chips come from the category (3rd item) of every entry in js/data.js -----
  const filtersEl = $('#filters'), stat = $('#fstat'), nav = $('.nav');
  const setNavH = () => root.style.setProperty('--navh', nav.offsetHeight + 'px'); // on phones the chip row sticks right under the header
  setNavH(); addEventListener('resize', setNavH);
  // Safari can keep stale pill widths when the web fonts finish loading after the first layout: lay the header chips out again once fonts are ready
  if (document.fonts) document.fonts.ready.then(() => { const n = $('.nav nav'); n.style.display = 'none'; void n.offsetHeight; n.style.display = ''; setNavH(); });
  const applyFilter = (label, byUser) => {
    const all = label === 'All';
    vis = cards.filter(c => { const ok = all || c.dataset.cat === label; c.hidden = !ok; return ok; });
    vis.forEach((c, i) => { $('.num', c).textContent = pad2(i + 1); }); // card numbers follow the filtered order
    $$('.fchip', filtersEl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === label)));
    $('#tot').textContent = $('#cnt-tot').textContent = vis.length;
    stat.textContent = `Showing ${vis.length} ${vis.length === 1 ? 'project' : 'projects'}${all ? '' : ' in ' + label}`;
    shownNo = ''; setCount(0);
    if (!byUser) return;
    ScrollTrigger.refresh(); // the strip / list became shorter or longer
    if (workST) { lenis ? lenis.scrollTo(workST.start, { immediate: true }) : scrollTo(0, workST.start); workST.animation.progress(0); paintFlow(); } // desktop: back to the first card, cover-flow recalculated at once
    else { const top = $('#grid').getBoundingClientRect().top + scrollY - nav.offsetHeight - filtersEl.offsetHeight - 12; if (scrollY > top) lenis ? lenis.scrollTo(top, { duration: .8 }) : scrollTo(0, top); } // phones: back to the top of the list
    if (!reduce) gsap.fromTo($('#grid'), { opacity: 0 }, { opacity: 1, duration: .45, ease: 'power2.out', clearProps: 'opacity' });
  };
  ['All', ...new Set(cards.map(c => c.dataset.cat))].forEach(label => { // "All" first, then categories in the order they first appear
    const n = label === 'All' ? cards.length : cards.filter(c => c.dataset.cat === label).length, b = document.createElement('button');
    b.type = 'button'; b.className = 'fchip'; b.dataset.f = label; b.innerHTML = `${esc(label)} <i>${n}</i>`;
    b.addEventListener('click', () => applyFilter(label, true)); filtersEl.appendChild(b);
  });
  applyFilter('All', false); // "All" is the default

  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    if (reduce) { workEl.classList.add('stack'); const off = stackCounter(); return () => { workEl.classList.remove('stack'); off(); }; }
    const track = $('#grid'), dist = () => Math.max(1, track.scrollWidth - innerWidth);
    // Short selection (few cards): centre them instead of leaving the right side empty
    const fit = () => { track.classList.remove('few'); track.classList.toggle('few', track.scrollWidth <= innerWidth + 2); };
    fit(); ScrollTrigger.addEventListener('refreshInit', fit);
    workST = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#work', pin: true, scrub: .6, start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1 } }).scrollTrigger;
    // Cover-flow: rotate / scale / fade each card by its distance from the screen centre. It is recalculated on every frame while the
    // portfolio is on screen (not only while the strip is pinned) and once right after every filter change, so the state is never stale.
    let onScreen = false;
    const io = new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }, { rootMargin: '200px' }); io.observe(workEl);
    const paint = () => {
      const left = track.getBoundingClientRect().left, mid = document.documentElement.clientWidth / 2; let best = 0, bd = 9;
      vis.forEach((c, i) => { // position comes from the layout (offsetLeft), not from the transformed box, so the result is stable
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

  // Section tracking: side dots + scene target
  const navEl = $('.nav nav');
  const activate = name => {
    activeName = name;
    $$('.dots a,.nav nav a').forEach(a => a.classList.toggle('on', a.dataset.s === name));
    const on = $('.nav nav a.on'); // keep the active chip visible in the scrollable mobile nav
    if (on && navEl.scrollWidth > navEl.clientWidth) navEl.scrollTo({ left: on.offsetLeft - navEl.clientWidth / 2 + on.offsetWidth / 2, behavior: 'smooth' });
    goScene(name);
  };
  // Timeline dots: the orange line reaches each dot -> it glows
  $$('.xp').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top+=40 60%', end: 'max', toggleClass: { targets: el, className: 'reached' } }));
  $$('[data-blob]').forEach(sec => ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && activate(sec.dataset.blob) }));
  // Scroll progress bar at the top
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { $('#bar').style.transform = `scaleX(${s.progress})`; } });
  mqSmall.addEventListener('change', () => goScene(activeName)); // re-place the 3D object when the layout switches

  if (!reduce) {
    // Experience timeline: accent line fills, cards swing in from the left in 3D
    ScrollTrigger.create({ trigger: '.xp-wrap', start: 'top 60%', end: 'bottom 60%', onUpdate: s => $('.xp-wrap').style.setProperty('--p', s.progress) });
    $$('.xp').forEach(el => gsap.from(el, { x: -90, rotationY: -35, opacity: 0, transformPerspective: 1200, transformOrigin: '0 50%', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
    // Section titles reveal with a clip + rise
    $$('h2').forEach(h => gsap.from(h, { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
    // Cards (panels) reveal one after another when they enter. Change duration / ease / stagger below.
    gsap.set('.panel', { opacity: 0, y: 46, scale: .97 }); // hidden up front, so there is no flash when they enter
    ScrollTrigger.batch('.panel', { start: 'top 90%', once: true, onEnter: b => {
      gsap.to(b, { opacity: 1, y: 0, scale: 1, duration: 1.25, ease: 'power3.out', stagger: .14, clearProps: 'transform' });
      b.forEach((p, i) => gsap.from($$('.tags li, .dl li', p), { opacity: 0, y: 12, duration: .7, ease: 'power2.out', stagger: .025, delay: .35 + i * .14 }));
    } });
    // Services rows slide up one after another (hidden first, so there is no flash)
    gsap.set('.svc', { opacity: 0, y: 34 });
    ScrollTrigger.batch('.svc', { start: 'top 92%', once: true, onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .1, clearProps: 'transform' }) });
  }

  /* ---------- 6) Loader + intro ---------- */
  // Intro: counter, curtain lift, hero text reveal (skipped when the visitor prefers reduced motion)
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
