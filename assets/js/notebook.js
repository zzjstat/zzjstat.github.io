/* Only the optional color switch needs JavaScript; navigation is ordinary HTML. */
(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (error) { /* Optional storage. */ }
  let explicit = saved === 'dark' || saved === 'light';

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (button) {
      const next = theme === 'dark' ? 'light' : 'dark';
      const label = `Switch to ${next} mode (currently ${theme} mode)`;
      button.dataset.mode = theme;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.querySelector('.theme-toggle-label').textContent = next === 'dark' ? 'Dark mode' : 'Light mode';
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
