describe('test: =====>', () => {
  test({
    title: 'Login button ${selector} text is ${expected}',
    tags: [
      ['widgets'],
      ['salesforce']
    ],
    // drivers: ['seleniumWebdriverFirefox'],
    // modes: ['sandbox'],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({
    option, tag, level
  }) => {
    const text = await browser.text(option.selector);
    expect(text).toBe(option.expected);
  });
});
