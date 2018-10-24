export const PuppeteerUtils = {
  async waitForNewPage(page) {
    const browser = page.browser();
    return new Promise((resolve) => {
      const listener = (target) => {
        if (target.type() === 'page') {
          browser.removeListener('targetcreated', listener);
          resolve(target.page());
        }
      };
      browser.on('targetcreated', listener);
    });
  }
};
