require('@ringcentral-integration/babel-settings/lib/register');
const analyzeYarnlock = require('../packages/monorepo-tools/lib/analyzeYarnLock').default;

(async () => {
  console.log(JSON.stringify(await analyzeYarnlock(), null, 2));
})();
