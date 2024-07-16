import localeLoader from './';

const testFolder = './testData';

class MockBuilder {
  constructor({ input }) {
    this.input = input;
  }

  async run() {
    await localeLoader.call(this, this.input);
  }

  get context() {
    return testFolder;
  }

  async() {
    return (_, newContent) => {
      this.output = newContent;
    };
  }
}

describe('localeLoader', () => {
  test('should transform loader comment to code', async () => {
    const content = '/* loadLocale */';
    const builder = new MockBuilder({
      input: content,
    });
    await builder.run();
    expect(builder.output).not.toBe(content);
  });
  test('should skip non loader files', async () => {
    const content = '/* not a loader */';
    const builder = new MockBuilder({
      input: content,
    });
    await builder.run();
    expect(builder.output).toBe(content);
  });
});
