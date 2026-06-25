(() => {
  'use strict';

  const config = window.OPEN_LEGENDS_CONFIG || {};
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = [...document.querySelectorAll('.nav-links a')];
  const sections = [...document.querySelectorAll('main section[id]')];

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
    const marker = window.scrollY + window.innerHeight * 0.35;
    let current = 'home';
    for (const section of sections) {
      if (section.offsetTop <= marker) current = section.id;
    }
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navAnchors.forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.11 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 1000;
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: .7 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  document.querySelectorAll('[data-tabs]').forEach(tabs => {
    const buttons = [...tabs.querySelectorAll('[role="tab"]')];
    const panels = [...tabs.querySelectorAll('[role="tabpanel"]')];
    buttons.forEach(button => button.addEventListener('click', () => {
      const key = button.dataset.tab;
      buttons.forEach(b => b.setAttribute('aria-selected', String(b === button)));
      panels.forEach(panel => {
        const active = panel.dataset.panel === key;
        panel.hidden = !active;
        panel.classList.toggle('active', active);
      });
    }));
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = item.dataset.lightbox;
      lightbox.showModal();
    });
  });
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });

  // Fusion embed: use only the URL from Autodesk's generated iframe src attribute.
  const fusionUrl = typeof config.fusionEmbedUrl === 'string' ? config.fusionEmbedUrl.trim() : '';
  const frameWrap = document.getElementById('fusion-frame-wrap');
  if (fusionUrl && /^https:\/\//i.test(fusionUrl) && frameWrap) {
    const iframe = document.createElement('iframe');
    iframe.src = fusionUrl;
    iframe.title = 'Interactive Autodesk Fusion model of the Open Legends robot';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    frameWrap.replaceChildren(iframe);
  }

  // Campaign configuration.
  const campaign = config.campaign || {};
  const raised = Number(campaign.raised);
  const target = Number(campaign.target);
  const validFunding = Number.isFinite(raised) && Number.isFinite(target) && target > 0 && raised >= 0;
  const formatMoney = value => new Intl.NumberFormat('en-AU', {
    style: 'currency', currency: campaign.currency || 'AUD', maximumFractionDigits: 0
  }).format(value);

  if (validFunding) {
    const percent = Math.min(100, Math.round((raised / target) * 100));
    document.getElementById('funding-value').textContent = `${percent}% FUNDED`;
    document.getElementById('raised-label').textContent = `${formatMoney(raised)} raised`;
    document.getElementById('target-label').textContent = `${formatMoney(target)} target`;
    requestAnimationFrame(() => document.getElementById('progress-fill').style.width = `${percent}%`);
  }

  const activateLink = (id, url, text) => {
    const el = document.getElementById(id);
    if (!el || typeof url !== 'string' || !/^https:\/\//i.test(url.trim())) return;
    el.href = url.trim();
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');
    el.querySelector('span').textContent = text;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  };
  activateLink('donate-button', campaign.donateUrl, 'Support the campaign');
  activateLink('contact-button', campaign.contactFormUrl, 'Sponsorship enquiries');

  document.getElementById('year').textContent = new Date().getFullYear();

  // Low-opacity code rain. Disabled for reduced-motion users and small devices.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('code-rain');
  if (!reducedMotion && canvas && window.innerWidth > 720) {
    const ctx = canvas.getContext('2d');
    let columns = [];
    const chars = '01<>/{}[]OPENLEGENDSC++VISION';
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Array(Math.ceil(innerWidth / 22)).fill(0).map(() => Math.random() * -60);
    };
    resize();
    window.addEventListener('resize', resize);
    let last = 0;
    const draw = time => {
      if (time - last > 70) {
        ctx.fillStyle = 'rgba(4, 11, 8, .18)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        ctx.fillStyle = '#20e38b';
        ctx.font = '12px DM Mono, monospace';
        columns.forEach((y, i) => {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * 22, y * 18);
          columns[i] = y * 18 > innerHeight && Math.random() > .985 ? 0 : y + 1;
        });
        last = time;
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }
})();
