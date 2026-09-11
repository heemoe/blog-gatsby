(() => {
  const key = 'zhong-theme';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const validTheme = (value) => value === 'light' || value === 'dark';
  const readPreference = () => {
    try {
      const stored = localStorage.getItem(key);
      return validTheme(stored) ? stored : null;
    } catch {
      return null;
    }
  };
  let preference = readPreference();

  const applyTheme = () => {
    const theme = preference ?? (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content', theme === 'dark' ? '#141414' : '#f7f5f0',
    );
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  };

  // This script runs in the head, before the first paint and before the button exists.
  applyTheme();

  const setupToggle = () => {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    applyTheme();
    toggle.removeAttribute('hidden');
    toggle.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(key, preference);
      } catch {
        // Storage restrictions should not prevent switching the current page.
      }
      applyTheme();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggle, { once: true });
  } else {
    setupToggle();
  }
  system.addEventListener('change', () => {
    if (!preference) applyTheme();
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = readPreference();
    applyTheme();
  });
})();
