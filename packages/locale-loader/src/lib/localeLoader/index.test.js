import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import localeLoader from './';
import formatLocale from '../formatLocale';

/* global describe it before after */

const testFolder = './testData';

const files = [
  'en_us.js',
  'FR-FR.JS',
  'aa-AAAA-ZZ.JS',
];

class MockBuilder {
  constructor({
    input,
  }) {
    this.input = input;
  }
  async run() {
    await this::localeLoader(this.input);
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
  before(async () => {
    await Promise.all(files.map(f => (
      fs.ensureFile(path.resolve(testFolder, f))
    )));
  });
  after(async () => {
    await fs.emptyDir(testFolder);
  });
  it('should transform loader comment to code', async () => {
    const content = '/* loadLocale */';
    const builder = new MockBuilder({
      input: content,
    });
    await builder.run();
    expect(builder.output).to.not.equal(content);
  });
  it('should skip non loader files', async () => {
    const content = '/* not a loader */';
    const builder = new MockBuilder({
      input: content,
    });
    await builder.run();
    expect(builder.output).to.equal(content);
  });
});
