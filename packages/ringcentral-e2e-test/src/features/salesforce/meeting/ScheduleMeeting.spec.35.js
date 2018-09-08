describe('test: =====>', () => {
  test({
    title: 'button',
    tags: [
      ['widgets'],
    ],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).text(option.selector);
    expect(text).toBe(option.expected);
  });
  test({
    title: 'button',
    tags: [
      ['widgets'],
    ],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).text(option.selector);
    expect(text).toBe(option.expected);
  });
  test({
    title: 'button',
    tags: [
      ['widgets'],
    ],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).text(option.selector);
    expect(text).toBe(option.expected);
  });
  test({
    title: 'button',
    tags: [
      ['widgets'],
    ],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).text(option.selector);
    expect(text).toBe(option.expected);
  });
});
