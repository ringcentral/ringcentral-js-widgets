(() => {
  const storageThemeType = localStorage.getItem('__rc_theme_type');
  const storageThemePrimaryColor = localStorage.getItem(
    '__rc_theme_primary_color',
  );

  const themeType =
    storageThemeType ||
    new URLSearchParams(location.search).get('theme') ||
    'light';

  const themeMap = {
    light: {
      bg: '<%= bgColor %>',
      primary: storageThemePrimaryColor || '<%= primaryColor %>',
      loadingRing: '<%= loadingRing %>',
    },
    dark: {
      bg: '<%= darkBgColor %>',
      primary: '<%= darkPrimaryColor %>',
      loadingRing: '<%= darkLoadingRing %>',
    },
    contrast: {
      bg: '<%= contrastBgColor %>',
      primary: '<%= contrastPrimaryColor %>',
      loadingRing: '<%= contrastLoadingRing %>',
    },
  };

  const updateThemeStyle = (type) => {
    const currentTheme = themeMap[type];

    if (currentTheme) {
      const html = document.querySelector('html');
      html.style.setProperty('--global-bg-color', currentTheme.bg);
      html.style.setProperty('--primary-color', currentTheme.primary);
      html.style.setProperty('--loading-ring', currentTheme.loadingRing);
    }
  };

  updateThemeStyle(themeType);

  document.addEventListener('theme-change', (e) => {
    updateThemeStyle(e.detail);
  });

  document.addEventListener(
    'theme-init',
    (e) => {
      e.detail(themeType);
    },
    {
      once: true,
    },
  );
})();
