
describe('test: =====>', () => {
  test({
    title: 'Login button ${selector} text is ${expected}',
    tags: [
      ['widgets', { brands: ['rc', 'att'] }]
    ],
    level: 'p1',
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign1 In' },
    ],
  }, async ({
    option, context, tag, level
  }) => {
    await context.launch();
    const text = await context.text(option.selector);
    expect(text).toBe(option.expected);
    await context.close();
  });
});

