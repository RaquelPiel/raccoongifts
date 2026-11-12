/* ============================================================
   Raccoon Gifts — aplicação (renderização, filtros, modal, PWA UI)
   ============================================================ */
(function () {
  'use strict';

  const STORE = window.STORE;
  const { products, categories, themes } = STORE;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ----------------------------- utils ----------------------------- */
  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  const norm = (str) =>
    String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const esc = (str) =>
    String(str).replace(/[&<>"']/g, (ch) => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });

  const themeOf = (id) => themes.find((t) => t.id === id) || themes[0];
  const categoryOf = (id) => categories.find((c) => c.id === id) || categories[0];

  const waLink = (text) => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;

  const generalMessage =
    `Olá! Vim pelo site da ${STORE.name} e queria saber mais sobre os acessórios. 🦝💜`;

  const productMessage = (p) => {
    const t = themeOf(p.theme);
    const c = categoryOf(p.category);
    return (
      `Olá, ${STORE.name}! 🦝\n` +
      `Vi no site e quero pedir:\n\n` +
      `*${p.name}*\n` +
      `${c.label} · ${t.label}\n` +
      `${brl.format(p.price)}\n\n` +
      `Pode me contar sobre disponibilidade e entrega?`
    );
  };

  /* --------------------------- ilustrações --------------------------- */
  const PALETTES = {
    rock: { bg: '#FFE3D7', accent: '#F43F5E', soft: '#FFC2B0', symbol: 'bolt' },
    kpop: { bg: '#FFE1F2', accent: '#EC4899', soft: '#FFC3E5', symbol: 'heart' },
    games: { bg: '#DEF5E5', accent: '#22C55E', soft: '#B4EFC5', symbol: 'plus' },
    animes: { bg: '#E7E2FF', accent: '#7C3AED', soft: '#CFC5FF', symbol: 'star' }
  };
  const INK = '#16121C';

  const SIMPLE_SYMBOLS = {
    bolt: 'M58 6 26 56h20L36 94l38-52H52l18-36Z',
    heart: 'M50 88C20 66 8 48 8 32 8 17 19 8 32 8c8 0 14 5 18 12 4-7 10-12 18-12 13 0 24 9 24 24 0 16-12 34-42 56Z',
    plus: 'M38 8h24v30h30v24H62v30H38V62H8V38h30Z',
    star: 'M50 4c6 28 18 40 46 46-28 6-40 18-46 46-6-28-18-40-46-46 28-6 40-18 46-46Z'
  };

  /* Cada símbolo é desenhado num quadrado de 100x100. */
  function symbolMarkup(name, fill) {
    const stroke = 'stroke-linejoin="round"';

    switch (name) {
      case 'skull':
        return `
          <path d="M50 8C28 8 12 24 12 46c0 13 6 23 16 28v11c0 4 3 7 7 7h30c4 0 7-3 7-7V74c10-5 16-15 16-28C88 24 72 8 50 8Z" fill="${fill}" stroke="${INK}" stroke-width="6" ${stroke}/>
          <circle cx="35" cy="46" r="8" fill="${INK}"/>
          <circle cx="65" cy="46" r="8" fill="${INK}"/>
          <path d="M50 55l-7 11h14Z" fill="${INK}"/>
          <path d="M40 82v9M50 82v9M60 82v9" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
      case 'cat':
        return `
          <path d="M24 40 18 10l28 16Z" fill="${fill}" stroke="${INK}" stroke-width="6" ${stroke}/>
          <path d="M76 40 82 10 54 26Z" fill="${fill}" stroke="${INK}" stroke-width="6" ${stroke}/>
          <circle cx="50" cy="54" r="33" fill="${fill}" stroke="${INK}" stroke-width="6"/>
          <circle cx="38" cy="52" r="5" fill="${INK}"/>
          <circle cx="62" cy="52" r="5" fill="${INK}"/>
          <path d="M50 60l-5 6h10Z" fill="${INK}"/>
          <path d="M50 66c-3 5-8 6-11 3M50 66c3 5 8 6 11 3" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M24 60 6 55M24 68 7 71M76 60l18-5M76 68l17 3" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
      case 'gamepad':
        return `
          <path d="M28 32h44c11 0 18 10 20 26 2 13-3 22-10 22-7 0-10-8-16-8H34c-6 0-9 8-16 8-7 0-12-9-10-22 2-16 9-26 20-26Z" fill="${fill}" stroke="${INK}" stroke-width="6" ${stroke}/>
          <path d="M26 46v14M19 53h14" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
          <circle cx="68" cy="48" r="4.5" fill="${INK}"/>
          <circle cx="80" cy="58" r="4.5" fill="${INK}"/>
          <circle cx="76" cy="70" r="4.5" fill="${INK}"/>`;
      case 'guitar':
        return `
          <path d="M80 4 96 20 58 58 42 42Z" fill="${INK}"/>
          <path d="M80 4 96 20l-8 8-16-16Z" fill="${fill}" stroke="${INK}" stroke-width="5" ${stroke}/>
          <circle cx="30" cy="52" r="18" fill="${fill}" stroke="${INK}" stroke-width="6"/>
          <circle cx="34" cy="70" r="24" fill="${fill}" stroke="${INK}" stroke-width="6"/>
          <circle cx="34" cy="70" r="8" fill="${INK}"/>
          <path d="M24 58h10" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
      case 'lightstick':
        return `
          <g transform="translate(20 0) scale(.6)">
            <path d="M50 88C20 66 8 48 8 32 8 17 19 8 32 8c8 0 14 5 18 12 4-7 10-12 18-12 13 0 24 9 24 24 0 16-12 34-42 56Z" fill="${fill}" stroke="${INK}" stroke-width="7" ${stroke}/>
          </g>
          <rect x="44" y="48" width="12" height="46" rx="6" fill="${fill}" stroke="${INK}" stroke-width="6"/>
          <path d="M50 0v8M14 22l6 6M86 22l-6 6" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
      case 'sword':
        return `
          <path d="M50 4 59 22v36H41V22Z" fill="${fill}" stroke="${INK}" stroke-width="6" ${stroke}/>
          <path d="M28 58h44v9H28Z" fill="${fill}" stroke="${INK}" stroke-width="5" ${stroke}/>
          <path d="M44 67h12v19H44Z" fill="${fill}" stroke="${INK}" stroke-width="5" ${stroke}/>
          <circle cx="50" cy="91" r="5" fill="${INK}"/>
          <path d="M50 22v34" stroke="${INK}" stroke-width="3"/>`;
      case 'coin':
        return `
          <circle cx="50" cy="50" r="35" fill="#FFD43B" stroke="${INK}" stroke-width="6"/>
          <circle cx="50" cy="50" r="26" fill="none" stroke="${INK}" stroke-width="4"/>
          <path d="M50 30c2 10 6 14 16 16-10 2-14 6-16 16-2-10-6-14-16-16 10-2 14-6 16-16Z" fill="${INK}"/>`;
      default:
        return `<path d="${SIMPLE_SYMBOLS[name] || SIMPLE_SYMBOLS.star}" fill="${fill}" stroke="${INK}" stroke-width="6" ${stroke}/>`;
    }
  }

  function symbolArt(t, { fill = '#fff', scale = 0.5, cx = 120, cy = 100, rotate = 0 } = {}) {
    const size = 100 * scale;
    const x = cx - size / 2;
    const y = cy - size / 2;
    return `<g transform="translate(${x} ${y}) scale(${scale})${rotate ? ` rotate(${rotate} 50 50)` : ''}">
      ${symbolMarkup(t.symbol, fill)}
    </g>`;
  }

  function braceletArt(t) {
    const cx = 120;
    const cy = 96;
    const rx = 62;
    const ry = 38;
    let beads = '';
    for (let i = 0; i < 10; i++) {
      const a = (Math.PI * 2 * i) / 10 - Math.PI / 2;
      const x = cx + rx * Math.cos(a);
      const y = cy + ry * Math.sin(a);
      const fill = i % 3 === 0 ? '#fff' : t.accent;
      beads += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" fill="${fill}" stroke="${INK}" stroke-width="4"/>`;
    }
    const charmY = cy + ry + 26;
    return `
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${INK}" stroke-width="18" opacity=".14" transform="translate(4 5)"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${t.soft}" stroke-width="16"/>
      ${beads}
      <line x1="${cx}" y1="${cy + ry + 10}" x2="${cx}" y2="${charmY - 14}" stroke="${INK}" stroke-width="4"/>
      <circle cx="${cx}" cy="${charmY}" r="17" fill="#fff" stroke="${INK}" stroke-width="4"/>
      ${symbolArt(t, { fill: t.accent, scale: 0.2, cx, cy: charmY })}
    `;
  }

  function bottonArt(t) {
    return `
      <circle cx="125" cy="103" r="64" fill="${INK}" opacity=".16"/>
      <circle cx="120" cy="97" r="63" fill="${t.accent}" stroke="${INK}" stroke-width="7"/>
      <circle cx="120" cy="97" r="45" fill="#fff" stroke="${INK}" stroke-width="5"/>
      ${symbolArt(t, { fill: t.accent, scale: 0.54, cx: 120, cy: 97 })}
      <path d="M84 67a50 50 0 0 1 20-13" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".65"/>
    `;
  }

  function keychainArt(t) {
    return `
      <circle cx="120" cy="44" r="15" fill="none" stroke="${INK}" stroke-width="7"/>
      <circle cx="120" cy="44" r="15" fill="none" stroke="${t.soft}" stroke-width="3"/>
      <rect x="112" y="52" width="16" height="15" rx="5" fill="${t.accent}" stroke="${INK}" stroke-width="4"/>
      <rect x="73" y="67" width="104" height="104" rx="22" fill="${INK}" opacity=".16"/>
      <rect x="68" y="62" width="104" height="104" rx="22" fill="${t.accent}" stroke="${INK}" stroke-width="7"/>
      <circle cx="120" cy="80" r="6" fill="${INK}"/>
      ${symbolArt(t, { fill: '#fff', scale: 0.48, cx: 120, cy: 120 })}
    `;
  }

  function artFor(p) {
    if (p.img) {
      return `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" decoding="async">`;
    }
    const baseT = PALETTES[p.theme] || PALETTES.animes;
    const t = p.art ? { ...baseT, symbol: p.art } : baseT;
    const uid = `art-${p.id}`;
    const inner =
      p.category === 'botton' ? bottonArt(t) : p.category === 'chaveiro' ? keychainArt(t) : braceletArt(t);

    return `
      <svg viewBox="0 0 240 210" role="img" aria-label="${esc(p.name)}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="${uid}" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.6" fill="${t.accent}" opacity=".16"/>
          </pattern>
        </defs>
        <rect width="240" height="210" fill="${t.bg}"/>
        <rect width="240" height="210" fill="url(#${uid})"/>
        <circle cx="34" cy="30" r="5" fill="${t.soft}" stroke="${INK}" stroke-width="2.5"/>
        <circle cx="209" cy="176" r="7" fill="${t.soft}" stroke="${INK}" stroke-width="2.5"/>
        <path d="M204 42l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#fff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        ${inner}
      </svg>`;
  }

  /* ------------------------------ estado ------------------------------ */
  const state = { category: 'all', theme: 'all', query: '' };

  /* ------------------------------ filtros ------------------------------ */
  function makeChip({ label, value, active, color, emoji, onPick }) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (active ? ' is-active' : '');
    b.style.setProperty('--chip', color);
    b.setAttribute('aria-pressed', String(active));
    b.innerHTML = `<span class="chip__emoji" aria-hidden="true">${emoji}</span><span>${esc(label)}</span>`;
    b.addEventListener('click', onPick);
    return b;
  }

  function renderChips() {
    const catWrap = $('#categoryChips');
    const themeWrap = $('#themeChips');
    catWrap.innerHTML = '';
    themeWrap.innerHTML = '';

    catWrap.appendChild(
      makeChip({
        label: 'Tudo', value: 'all', active: state.category === 'all', color: '#7C3AED', emoji: '🌈',
        onPick: () => { state.category = 'all'; renderChips(); applyFilters(); }
      })
    );
    categories.forEach((c) => {
      catWrap.appendChild(
        makeChip({
          label: c.label, value: c.id, active: state.category === c.id, color: c.color, emoji: c.emoji,
          onPick: () => { state.category = c.id; renderChips(); applyFilters(); }
        })
      );
    });

    themeWrap.appendChild(
      makeChip({
        label: 'Todos', value: 'all', active: state.theme === 'all', color: '#16121C', emoji: '🎲',
        onPick: () => { state.theme = 'all'; renderChips(); applyFilters(); }
      })
    );
    themes.forEach((t) => {
      themeWrap.appendChild(
        makeChip({
          label: t.label, value: t.id, active: state.theme === t.id, color: t.color, emoji: t.emoji,
          onPick: () => { state.theme = t.id; renderChips(); applyFilters(); }
        })
      );
    });
  }

  /* ------------------------------ catálogo ------------------------------ */
  function cardHTML(p) {
    const t = themeOf(p.theme);
    return `
      <button class="product" type="button" data-id="${esc(p.id)}" aria-label="Ver detalhes de ${esc(p.name)}">
        ${p.badge ? `<span class="product__badge">${esc(p.badge)}</span>` : ''}
        <span class="product__art">${artFor(p)}</span>
        <span class="product__body">
          <span class="product__theme" style="color:${t.color}">${esc(t.label)}</span>
          <span class="product__name">${esc(p.name)}</span>
          <span class="product__foot">
            <span class="product__price">${brl.format(p.price)}</span>
            <span class="product__arrow" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span>
          </span>
        </span>
      </button>`;
  }

  function applyFilters() {
    const q = norm(state.query);
    const list = products.filter((p) => {
      if (state.category !== 'all' && p.category !== state.category) return false;
      if (state.theme !== 'all' && p.theme !== state.theme) return false;
      if (!q) return true;
      const haystack = `${p.name} ${p.description} ${themeOf(p.theme).label} ${categoryOf(p.category).label}`;
      return norm(haystack).includes(q);
    });

    $('#productGrid').innerHTML = list.map(cardHTML).join('');
    $('#emptyState').hidden = list.length > 0;
    $('#resultsCount').textContent = `${list.length} ${list.length === 1 ? 'item' : 'itens'}`;

    const filtered = state.category !== 'all' || state.theme !== 'all' || q;
    $('#resultsTitle').textContent = filtered ? 'Resultados' : 'Nossos acessórios';
  }

  /* ------------------------------- modal ------------------------------- */
  const modal = $('#productModal');
  let lastFocused = null;

  function openProduct(id) {
    const p = products.find((item) => item.id === id);
    if (!p) return;

    const t = themeOf(p.theme);
    const c = categoryOf(p.category);

    $('#modalArt').innerHTML = artFor(p);

    const tag = $('#modalTag');
    tag.textContent = `${t.emoji} ${t.label}`;
    tag.style.color = t.color;

    $('#modalTitle').textContent = p.name;
    $('#modalPrice').textContent = brl.format(p.price);
    $('#modalDesc').textContent = p.description;
    $('#modalMeta').innerHTML = [c.label, t.label, 'Feito à mão']
      .map((label) => `<li>${esc(label)}</li>`)
      .join('');
    $('#modalCta').href = waLink(productMessage(p));

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    $('.modal__close', modal).focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------- views ------------------------------- */
  function showView(name) {
    $('#view-home').hidden = name !== 'home';
    $('#view-about').hidden = name !== 'about';
    $$('[data-nav]').forEach((btn) => {
      if (btn.dataset.nav === name) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------------------- instalação PWA ---------------------------- */
  function setupInstall() {
    const banner = $('#installBanner');
    const topBtn = $('#topInstallBtn');
    const installBtn = $('#installBtn');
    const installText = $('#installText');
    let deferredPrompt = null;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    const dismissed = () => {
      try { return localStorage.getItem('rg-install-dismissed') === '1'; } catch (e) { return false; }
    };
    const dismiss = () => {
      banner.hidden = true;
      try { localStorage.setItem('rg-install-dismissed', '1'); } catch (e) { /* ignora */ }
    };

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredPrompt = event;
      if (standalone || dismissed()) return;
      installText.textContent = 'Acesse rapidinho, até sem internet.';
      installBtn.hidden = false;
      topBtn.hidden = false;
      setTimeout(() => { banner.hidden = false; }, 1400);
    });

    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      try {
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          banner.hidden = true;
          topBtn.hidden = true;
        }
      } catch (e) { /* ignora */ }
      deferredPrompt = null;
    });

    topBtn.addEventListener('click', () => {
      banner.hidden = false;
      if (deferredPrompt) installBtn.click();
    });

    $('#installClose').addEventListener('click', dismiss);

    window.addEventListener('appinstalled', () => {
      banner.hidden = true;
      topBtn.hidden = true;
      deferredPrompt = null;
    });

    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    if (isIOS && !standalone && !dismissed()) {
      installText.textContent = 'Toque em Compartilhar e escolha “Adicionar à Tela de Início”.';
      installBtn.hidden = true;
      setTimeout(() => { banner.hidden = false; }, 3000);
    }
  }

  /* ------------------------------- init ------------------------------- */
  function init() {
    // Links de WhatsApp gerais
    $$('a[data-zap]').forEach((a) => { a.href = waLink(generalMessage); });

    // Instagram
    const insta = `https://instagram.com/${STORE.instagram}`;
    $('#aboutInsta').href = insta;
    $('#aboutInstaLabel').textContent = `@${STORE.instagram}`;

    // Temas na página sobre
    $('#aboutThemes').innerHTML = themes
      .map(
        (t) =>
          `<span class="theme-pill"><span class="dot" style="background:${t.color}"></span>${esc(t.emoji)} ${esc(t.label)}</span>`
      )
      .join('');

    // Ano
    const year = new Date().getFullYear();
    $('#homeYear').textContent = year;
    $('#aboutYear').textContent = year;

    // Chips + produtos
    renderChips();
    applyFilters();

    // Busca
    $('#searchInput').addEventListener('input', (event) => {
      state.query = event.target.value;
      applyFilters();
    });

    // Limpar filtros
    $('#clearFilters').addEventListener('click', () => {
      state.category = 'all';
      state.theme = 'all';
      state.query = '';
      $('#searchInput').value = '';
      renderChips();
      applyFilters();
    });

    // Abrir produto
    $('#productGrid').addEventListener('click', (event) => {
      const card = event.target.closest('.product');
      if (card) openProduct(card.dataset.id);
    });

    // Fechar modal
    $$('[data-close]', modal).forEach((el) => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
    });

    // Navegação
    $$('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        showView(btn.dataset.nav);
        if (btn.dataset.nav === 'home') {
          $('#view-home').hidden = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // Marca volta ao início
    $('.brand').addEventListener('click', (event) => {
      event.preventDefault();
      showView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll para o catálogo
    $$('[data-scroll]').forEach((btn) => {
      btn.addEventListener('click', () => {
        showView('home');
        const target = document.getElementById(btn.dataset.scroll);
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });
    });

    setupInstall();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
