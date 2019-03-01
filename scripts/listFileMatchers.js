require('@ringcentral-integration/babel-settings/lib/register');
const listFileMatchers = require('../packages/monorepo-tools/lib/listFileMatchers').default;

(async () => {
  console.log(JSON.stringify(await listFileMatchers(), null, 2));
})();
