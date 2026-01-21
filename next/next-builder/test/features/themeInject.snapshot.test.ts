import { getThemeInjectTemplate } from '../../src/themeInject/getThemeInjectTemplate';
import { themeMap } from '../../src/themeInject/themeMap';

describe('getThemeInjectTemplate', () => {
  it('check output', () => {
    Object.entries(themeMap).forEach(([code]) => {
      expect({
        code,
        script: getThemeInjectTemplate(code as any),
      }).toMatchSnapshot();
    });
  });
});
