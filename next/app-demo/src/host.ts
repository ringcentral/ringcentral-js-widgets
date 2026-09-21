document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('#toggle')!;
  const changeButton = document.querySelector('#change')!;

  const iframe = document.querySelector('iframe')!;
  let isHidden = false;
  let bottom = true;
  let timeoutId: number | null = null;

  toggleButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
  toggleButton.addEventListener('click', () => {
    if (isHidden) {
      // focus page to trigger iframe inner auto focus
      if (document.activeElement === document.body) {
        iframe.focus();
      }

      iframe.style.display = 'block';
      requestAnimationFrame(() => {
        iframe.style.transform = 'translateY(0)';
      });
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      isHidden = false;
    } else {
      iframe.style.transform = 'translateY(100%)';
      timeoutId = window.setTimeout(() => {
        iframe.style.display = 'none';
      }, 100);
      isHidden = true;
    }
  });

  changeButton.addEventListener('click', (e) => {
    if (bottom) {
      iframe.style.top = '0';
      iframe.style.right = '100px';
      iframe.style.bottom = 'unset';
      iframe.style.left = 'unset';

      bottom = false;
    } else {
      iframe.style.top = 'unset';
      iframe.style.right = 'unset';
      iframe.style.bottom = '0';
      iframe.style.left = '30px';

      bottom = true;
    }
  });

  // DEMO for change iframe size dynamically
  // command: app.modules.SpringAppRootView.expand(true)
  window.addEventListener('message', (e) => {
    const expanded = e.data?.['expand'];
    if (typeof expanded === 'boolean') {
      if (expanded) {
        iframe.classList.add('expand');
      } else {
        iframe.classList.remove('expand');
      }
    }
  });
});
