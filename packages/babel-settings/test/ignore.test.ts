import { regexp } from '../lib/ignores';

describe('ignore.test', () => {
  it('should ignore node_modules except for specific packages', () => {
    const notIgnorePackages = [
      'node_modules/@rjsf/validator-ajv8',
      'node_modules/@ringcentral/spring',
      'node_modules/@ringcentral/spring-ui',
      'node_modules/@ringcentral/spring-theme',
      'node_modules/culori/css',
    ];

    const ignorePackages = [
      'node_modules/@ringcentral/juno',
      'node_modules/@example/test',
      'node_modules/test',
    ];

    regexp.forEach((i) => {
      ignorePackages.forEach((p) => {
        const result = i.test(p);
        expect(result).toBeTruthy();
      });

      notIgnorePackages.forEach((p) => {
        const result = i.test(p);
        expect(result).toBeFalsy();
      });
    });
  });
});
