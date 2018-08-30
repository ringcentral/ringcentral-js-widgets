describe('test: =====>', () => {
  test({
    title: 'Login button ${selector} text is ${expected}',
    tags: [
      ['widgets', { brands: ['rc', 'att'] }]
    ],
    level: 'p1',
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({
    option, context, tag, level
  }) => {
    const text = await context.text(option.selector);
    console.log('ffff');
    expect(text).toBe(option.expected);
  });
  test({
    title: 'Login button ${selector} text is ${expected}',
    tags: [
      ['widgets', { brands: ['rc', 'att'] }]
    ],
    level: 'p1',
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({
    option, context, tag, level
  }) => {
    const text = await context.text(option.selector);
    expect(text).toBe(option.expected);
  });
});
