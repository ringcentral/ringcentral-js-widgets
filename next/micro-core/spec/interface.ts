export type Interaction = {
  listen: {
    /**
     * get the current theme
     */
    getThemeType: () => string;
    /**
     * set the current theme
     */
    setThemeType: (themeType: string) => string;
    /**
     * get the current locale
     */
    getLocale: () => string;
    /**
     * set the current locale
     */
    setLocale: (locale: string) => string;
  };
  emit: {
    /**
     * change theme
     */
    changeThemeType: (themeType: string) => Promise<void>;
    /**
     * change locale
     */
    changeLocale: (locale: string) => Promise<void>;
  };
};
