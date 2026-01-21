import { getScriptsLoadFailTemplate } from '../../src/scriptsLoadFail/getScriptsLoadFailTemplate';

describe('getScriptsLoadFailTemplate', () => {
  it('check output', () => {
    expect(getScriptsLoadFailTemplate()).toMatchSnapshot();
    expect(getScriptsLoadFailTemplate('#viewport', true)).toMatchSnapshot();
    expect(
      getScriptsLoadFailTemplate('#viewport', 'worker|coworker'),
    ).toMatchSnapshot();
  });
});
