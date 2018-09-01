describe('test: =====>', () => {
  test({
    title: 'Login button ${selector} text is ${expected}',
    tags: [
      ['widgets', { brands: ['rc', 'att'] }],
      ['salesforce']
    ],
    modes: ['sandbox'],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
    // modes: ['sandbox']
  }, async ({
    option, tag, level
  }) => {
    const text = await browser.text(option.selector);
    expect(text).toBe(option.expected);
  });
  test({
    title: 'Login button ${selector} text is ${expected}',
    // tags: [
    //   ['widgets', { brands: ['rc', 'att'] }],
    //   ['salesforce']
    // ],
    // modes: ['sandbox'],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
    // modes: ['sandbox']
  }, async ({
    option, tag, level
  }) => {
    const text = await browser.text(option.selector);
    expect(text).toBe(option.expected);
  });
  // test({
  //   title: 'Login button ${selector} text is ${expected}',
  //   tags: [
  //     ['widgets', { brands: ['rc', 'att'] }]
  //   ],
  //   level: 'p1',
  //   options: [
  //     { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
  //   ],
  //   // modes: ['sandbox']
  // }, async ({
  //   option, tag, level
  // }) => {
  //   const text = await browser.text(option.selector);
  //   expect(text).toBe(option.expected);
  // });
  // test({
  //   title: 'Login button ${selector} text is ${expected}',
  //   tags: [
  //     ['widgets', { brands: ['rc', 'att'] }]
  //   ],
  //   level: 'p1',
  //   options: [
  //     { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
  //   ],
  //   modes: ['sandbox']
  // }, async ({
  //   option, tag, level
  // }) => {
  //   const text = await browser.text(option.selector);
  //   expect(text).toBe(option.expected);
  // });
  // test({
  //   title: 'Login button ${selector} text is ${expected}',
  //   tags: [
  //     ['widgets', { brands: ['rc', 'att'] }]
  //   ],
  //   level: 'p1',
  //   options: [
  //     { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
  //   ],
  //   // modes: ['sandbox']
  // }, async ({
  //   option, tag, level
  // }) => {
  //   const text = await browser.text(option.selector);
  //   expect(text).toBe(option.expected);
  // });
});
