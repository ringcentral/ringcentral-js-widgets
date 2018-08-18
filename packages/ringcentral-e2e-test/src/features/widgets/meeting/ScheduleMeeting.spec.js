// beforeAll(() => {
//   console.log('beforeAll=====');
// });

// beforeEach(() => {
//   console.log('beforeEach=====');
// });

// console.log(it, process.env, process.argv);
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
    await context.launch();
    const text = await context.page.$eval(option.selector, node => node.innerText);
    expect(text).toBe(option.expected);
    await context.browser.close();
  });
});

