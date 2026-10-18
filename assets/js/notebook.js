/* Optional color switching and figure enlargement; navigation works without JavaScript. */
(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const isChinese = root.lang.toLowerCase().startsWith('zh');
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (error) { /* Optional storage. */ }
  let explicit = saved === 'dark' || saved === 'light';

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (button) {
      const next = theme === 'dark' ? 'light' : 'dark';
      const label = isChinese
        ? `切换为${next === 'dark' ? '深色' : '浅色'}模式（当前为${theme === 'dark' ? '深色' : '浅色'}模式）`
        : `Switch to ${next} mode (currently ${theme} mode)`;
      button.dataset.mode = theme;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.querySelector('.theme-toggle-label').textContent = isChinese
        ? (next === 'dark' ? '深色模式' : '浅色模式')
        : (next === 'dark' ? 'Dark mode' : 'Light mode');
    }
    document.dispatchEvent(new CustomEvent('notebook:themechange'));
  }

  apply(explicit ? saved : (preference.matches ? 'dark' : 'light'));
  if (button) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      explicit = true;
      try { localStorage.setItem('theme', theme); } catch (error) { /* Keep this tab usable. */ }
      apply(theme);
    });
  }
  preference.addEventListener('change', (event) => {
    if (!explicit) apply(event.matches ? 'dark' : 'light');
  });
})();

(() => {
  const links = document.querySelectorAll('[data-paper-illustration]');
  if (!links.length || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  const isChinese = document.documentElement.lang.toLowerCase().startsWith('zh');
  const dialog = document.createElement('dialog');
  dialog.className = 'paper-illustration-dialog';
  dialog.setAttribute('aria-labelledby', 'paper-illustration-dialog-title');
  const header = document.createElement('div');
  header.className = 'paper-illustration-dialog__header';
  const title = document.createElement('span');
  title.id = 'paper-illustration-dialog-title';
  title.textContent = isChinese ? '研究问题与方法示意图 · 原图' : 'Concept illustration · Original size';
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', isChinese ? '关闭图片' : 'Close image');
  header.append(title, close);
  const scroll = document.createElement('div');
  scroll.className = 'paper-illustration-dialog__scroll';
  scroll.tabIndex = 0;
  scroll.setAttribute('role', 'region');
  scroll.setAttribute('aria-label', isChinese ? '原图，可横向滚动' : 'Original image, horizontally scrollable');
  const image = document.createElement('img');
  scroll.append(image);
  dialog.append(header, scroll);
  document.body.append(dialog);
  let opener = null;
  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.showModal();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
