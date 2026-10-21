// Shared brand layer: renders every .im-author block in the page language.
// The site's own i18n sets <html lang>; this script follows that attribute.
(() => {
  'use strict';

  // One list for every site. A product does not show itself under "More of my projects".
  const PROJECTS = [
    { id: 'hebrew-live', name: 'Hebrew Live', url: '/hebrew-live/', icon: '/brand/v1/icons/hebrew-live.png' },
    { id: 'live-markdown-preview', name: 'Live Markdown Preview', url: '/live-markdown-preview/', icon: '/brand/v1/icons/live-markdown-preview.svg' },
    { id: 'torhair', name: 'Torhair', url: '/torhair/', icon: '/brand/v1/icons/torhair.svg' },
  ];

  const HOME = '/';
  const CONTACT = '/#contact';
  const EMAIL = 'mailto:9588604@gmail.com';

  const TEXT = {
    en: {
      kicker: 'The author',
      title: 'Built by Igor Markin',
      lead: 'Senior full-stack engineer in Israel. I build LLM-powered products that hold up in production.',
      work: 'Work with me',
      mail: 'Email me',
      also: 'More of my projects',
      photo: 'Igor Markin',
      name: 'Igor Markin',
    },
    ru: {
      kicker: 'Автор',
      title: 'Сделал Игорь Маркин',
      lead: 'Senior full-stack разработчик в Израиле. Делаю продукты на LLM, которые выдерживают production.',
      work: 'Работать со мной',
      mail: 'Написать',
      also: 'Ещё мои проекты',
      photo: 'Игорь Маркин',
      name: 'Игорь Маркин',
    },
    he: {
      kicker: 'היוצר',
      title: 'נבנה על ידי איגור מרקין',
      lead: 'מפתח Full-Stack בכיר בישראל. אני בונה מוצרים מבוססי LLM שעובדים בייצור.',
      work: 'עבודה איתי',
      mail: 'לכתוב לי',
      also: 'עוד פרויקטים שלי',
      photo: 'איגור מרקין',
      name: 'איגור מרקין',
    },
  };

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  };
  const link = (cls, href, text) => {
    const a = el('a', cls, text);
    a.href = href;
    return a;
  };

  function paint(block, t, n) {
    const product = block.dataset.imProduct;
    const id = 'im-author-title-' + n;
    block.setAttribute('aria-labelledby', id);
    block.textContent = '';

    const photoLink = link('im-author-photo', HOME);
    photoLink.tabIndex = -1;
    photoLink.setAttribute('aria-hidden', 'true');
    const img = el('img');
    img.src = '/assets/igor-320.webp';
    img.srcset = '/assets/igor-320.webp 320w, /assets/igor-640.webp 640w';
    img.sizes = '80px';
    img.width = 80; img.height = 80; img.loading = 'lazy'; img.alt = t.photo;
    photoLink.append(img);

    const text = el('div', 'im-author-text');
    const title = el('h2', 'im-author-title');
    title.id = id;
    title.append(link('', HOME, t.title));
    text.append(el('p', 'im-author-kicker', t.kicker), title, el('p', 'im-author-lead', t.lead));

    const actions = el('div', 'im-author-actions');
    actions.append(link('im-author-btn im-author-btn-primary', CONTACT, t.work), link('im-author-btn im-author-btn-secondary', EMAIL, t.mail));

    const also = el('nav', 'im-author-also');
    also.setAttribute('aria-label', t.also);
    also.append(el('span', 'im-author-also-label', t.also + ':'));
    PROJECTS.filter((p) => p.id !== product).forEach((p) => {
      const chip = link('im-author-chip', p.url);
      chip.lang = 'en';
      const icon = el('img');
      icon.src = p.icon; icon.width = 20; icon.height = 20; icon.alt = '';
      chip.append(icon, document.createTextNode(p.name));
      also.append(chip);
    });

    block.append(photoLink, text, actions, also);
  }

  // Footer signature: "© <year> Igor Markin", linked to the main site. data-im-sign="short" keeps only the year.
  function sign(link, t) {
    link.href = HOME;
    link.textContent = '© ' + new Date().getFullYear() + (link.dataset.imSign === 'short' ? '' : ' ' + t.name);
  }

  function render() {
    const lang = (document.documentElement.lang || 'en').slice(0, 2);
    const t = TEXT[lang] || TEXT.en;
    document.querySelectorAll('.im-author').forEach((block, n) => {
      if (block.dataset.imLang === lang) return;
      block.dataset.imLang = lang;
      paint(block, t, n);
    });
    document.querySelectorAll('.im-foot-sign').forEach((link) => sign(link, t));
  }

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
