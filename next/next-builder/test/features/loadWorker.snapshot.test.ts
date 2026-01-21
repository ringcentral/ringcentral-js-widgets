import { getLoadWorkerTemplate } from '../../src/scriptsLoadFail';

describe('getLoadWorkerTemplate', () => {
  it('check output', () => {
    expect(
      getLoadWorkerTemplate(undefined, 'example.js', 'worker'),
    ).toMatchSnapshot();

    expect(
      getLoadWorkerTemplate('__rc_coworker__', 'example.js', 'coworker'),
    ).toMatchSnapshot();
  });
});
